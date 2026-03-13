import { spawn } from 'node:child_process'
import { access, constants, mkdir, writeFile } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { roomCatalog } from '../src/data/rooms.js'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const cacheDir = resolve(rootDir, 'scripts/.cache/originals')
const mediaDir = resolve(rootDir, 'public/media/rooms')
const remoteBase = process.env.ROOM_MEDIA_REMOTE_BASE || 'https://divyendra-gahlot.github.io/hostel-rooms/'
const imageWidths = [480, 960, 1440]
const videoScaleFilter = "scale=w='min(1280,iw)':h=-2"

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

async function downloadIfMissing(sourcePath) {
  const targetPath = resolve(cacheDir, basename(sourcePath))

  if (await exists(targetPath)) {
    return targetPath
  }

  await ensureDir(cacheDir)

  const response = await fetch(new URL(sourcePath, remoteBase))

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourcePath}: ${response.status}`)
  }

  await writeFile(targetPath, Buffer.from(await response.arrayBuffer()))
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

  const ready = (await Promise.all(outputFiles.map(exists))).every(Boolean)

  if (ready) {
    return
  }

  const sourceFile = await downloadIfMissing(media.source)
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
    const child = spawn('ffmpeg', args, { stdio: 'ignore' })

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

function probeVideo(filePath) {
  return new Promise((resolveProbe) => {
    const child = spawn('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=nokey=1:noprint_wrappers=1',
      filePath,
    ])

    let output = ''
    child.stdout.on('data', (chunk) => {
      output += chunk.toString()
    })

    child.on('close', (code) => {
      resolveProbe(code === 0 && Number.parseFloat(output) > 0)
    })
  })
}

async function buildVideoAssets(room, video) {
  const roomDir = resolve(mediaDir, room.slug)
  const videoTarget = resolve(roomDir, `${video.key}.mp4`)
  const posterTarget = resolve(roomDir, `${video.key}-poster-1280.jpg`)

  await ensureDir(roomDir)

  const sourceFile = await downloadIfMissing(video.source)
  const playableVideo = (await exists(videoTarget)) && (await probeVideo(videoTarget))

  if (!playableVideo) {
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

  if (!(await exists(posterTarget))) {
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
  for (const room of roomCatalog) {
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
