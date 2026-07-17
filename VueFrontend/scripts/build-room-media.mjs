import { spawn } from 'node:child_process'
import { constants } from 'node:fs'
import { access, mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'
import { loadRoomSourceCatalog } from './lib/load-room-content.mjs'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const mediaDir = resolve(rootDir, 'public/media/rooms')
const imageWidths = [480, 960, 1440]
const videoScaleFilter = "scale=w='min(1280,iw)':h=-2"
const ffmpegCommand = ffmpegPath

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK)
    return true
  }
  catch {
    return false
  }
}

async function ensureDir(filePath) {
  await mkdir(filePath, { recursive: true })
}

async function isFresh(filePath, sourceModifiedAt) {
  try {
    const outputStats = await stat(filePath)
    return outputStats.mtimeMs >= sourceModifiedAt
  }
  catch {
    return false
  }
}

async function resolveSourcePath(sourcePath) {
  const targetPath = resolve(rootDir, sourcePath)

  if (!(await exists(targetPath))) {
    throw new Error(`Missing local source asset: ${sourcePath}`)
  }

  return targetPath
}

async function buildImageVariants(room, media) {
  const roomDir = resolve(mediaDir, room.slug)
  await ensureDir(roomDir)

  const outputFiles = imageWidths.flatMap((width) => [
    resolve(roomDir, `${media.key}-${width}.avif`),
    resolve(roomDir, `${media.key}-${width}.webp`),
    resolve(roomDir, `${media.key}-${width}.jpg`),
  ])

  const sourceFile = await resolveSourcePath(media.source)
  const sourceStats = await stat(sourceFile)
  const ready = (await Promise.all(outputFiles.map((filePath) => isFresh(filePath, sourceStats.mtimeMs)))).every(Boolean)

  if (ready) {
    return
  }

  const baseImage = sharp(sourceFile).rotate()

  for (const width of imageWidths) {
    const resized = baseImage.clone().resize({
      width,
      fit: 'inside',
      withoutEnlargement: true,
    })

    await Promise.all([
      resized.clone().avif({ quality: 52 }).toFile(resolve(roomDir, `${media.key}-${width}.avif`)),
      resized.clone().webp({ quality: 72 }).toFile(resolve(roomDir, `${media.key}-${width}.webp`)),
      resized.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(resolve(roomDir, `${media.key}-${width}.jpg`)),
    ])
  }
}

function runFfmpeg(args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(ffmpegCommand, args, { stdio: 'ignore' })

    child.on('error', rejectRun)
    child.on('close', (code) => {
      if (code === 0) {
        resolveRun()
        return
      }

      rejectRun(new Error(`ffmpeg exited with code ${code}`))
    })
  })
}

function hasCommand(command) {
  return new Promise((resolveCommand) => {
    const child = spawn(command, ['-version'], { stdio: 'ignore' })

    child.on('error', () => {
      resolveCommand(false)
    })

    child.on('close', () => {
      resolveCommand(true)
    })
  })
}

async function ensureCommand(command) {
  if (await hasCommand(command)) {
    return
  }

  throw new Error(`Missing required binary: ${command}`)
}

async function buildVideoAssets(room, video) {
  const roomDir = resolve(mediaDir, room.slug)
  const videoTarget = resolve(roomDir, `${video.key}.mp4`)
  const posterTarget = resolve(roomDir, `${video.key}-poster-1280.jpg`)

  await ensureDir(roomDir)

  const sourceFile = await resolveSourcePath(video.source)
  const sourceStats = await stat(sourceFile)
  const videoReady = await isFresh(videoTarget, sourceStats.mtimeMs)
  const videoStats = videoReady ? await stat(videoTarget) : null
  const posterReady = videoReady && await isFresh(posterTarget, videoStats.mtimeMs)

  if (!videoReady || !posterReady) {
    await ensureCommand(ffmpegCommand)
  }

  if (!videoReady) {
    await runFfmpeg([
      '-y',
      '-i',
      sourceFile,
      '-map',
      '0:v:0',
      '-map',
      '0:a?',
      '-vf',
      videoScaleFilter,
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-crf',
      '28',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-movflags',
      '+faststart',
      videoTarget,
    ])
  }

  if (!posterReady) {
    await runFfmpeg([
      '-y',
      '-ss',
      '00:00:01.000',
      '-i',
      videoTarget,
      '-frames:v',
      '1',
      '-vf',
      videoScaleFilter,
      posterTarget,
    ])
  }
}

async function main() {
  const roomSourceCatalog = await loadRoomSourceCatalog()

  for (const room of roomSourceCatalog) {
    for (const media of room.gallery) {
      await buildImageVariants(room, media)
    }

    if (room.video) {
      await buildVideoAssets(room, room.video)
    }
  }

  console.log('media sync complete')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
