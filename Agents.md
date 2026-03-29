# AGENTS.MD

Abhi owns this. Start: say hi + 1 motivating line.


## Agent Protocol
- Keep files <~600 LOC; split/refactor as needed.
- “Make a note” => edit AGENTS.md (shortcut; not a blocker).
- Style: telegraph. Drop filler/grammar. Min tokens (global AGENTS + replies).

## Git
- Safe by default: `git status/diff/log`. Push only when user asks.
- `git checkout` ok for PR review / explicit request.
- Branch changes require user consent.
- Destructive ops forbidden unless explicit (`reset --hard`, `clean`, `restore`, `rm`, …).
- Don’t delete/rename unexpected stuff; stop + ask.
- No repo-wide S/R scripts; keep edits small/reviewable.
- Avoid manual `git stash`; if Git auto-stashes during pull/rebase, that’s fine (hint, not hard guardrail).
- If user types a command (“pull and push”), that’s consent for that command.
- If a user types commit that means commit all changes with detailed message.
- No amend unless asked.
- Big review: `git --no-pager diff --color=never`.
- Multi-agent: check `git status/diff` before edits; ship small commits.

## Critical Thinking
- Fix root cause (not band-aid).
- Unsure: read more code; if still stuck, ask w/ short options.
- Conflicts: call out; pick safer path.
- Unrecognized changes: assume other agent; keep going; focus your changes. If it causes issues, stop + ask user.
- Leave breadcrumb notes in thread.

Leave the Frontend Folder, that is old UI, just there for reference, unless i explicitly ask or reference files there dont use it, the new frontend is in VueFrontend

<frontend_aesthetics>
Avoid “AI slop” UI. Be opinionated + distinctive.

Read `VueFrontend/docs/ui-style-guide.md` before any UI work.

Do:
- Typography: pick a real font; avoid Inter/Roboto/Arial/system defaults.
- Theme: commit to a palette; use CSS vars; bold accents > timid gradients.
- Motion: 1–2 high-impact moments (staggered reveal beats random micro-anim).
- Background: add depth (gradients/patterns), not flat default.

Avoid: purple-on-white clichés, generic component grids, predictable layouts.
</frontend_aesthetics>

## UI Design System

Source of truth: `VueFrontend/docs/ui-style-guide.md`
Audit/migration map: `VueFrontend/docs/ui-audit.md`

Rules:
- Read `docs/ui-style-guide.md` before any visual/CSS change.
- If a new visual pattern is needed, update the style guide in the same change.
- No ad hoc tokens, one-off shadows/radii, or undocumented primitives.
- No new surface classes — use `surface-card`, `surface-input`, `surface-dark`, `overlay-backdrop`.
- No new chip/badge variants — use `label-upper` or `chip`.
- Syne only for h1/h2 (display). Manrope for everything else.
- Orange = action. Mint = status. Sun = rare highlight. Don’t invent accent uses.
- Validate after changes: `npm run validate:rooms && npm run build`

To generate assets/images or edit it for the frontend use the nano-banana-pro skill. Keys in .env file



for frontend design use Frontend skill

Focus on mobile first experience then on bigger screens