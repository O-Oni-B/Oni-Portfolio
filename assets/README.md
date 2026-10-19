# Media naming rules

The website finds videos by folder and file name. Put a correctly named video in the
right folder and it shows up on the site. No code changes, no thumbnails, no titles to write.

## 1. One folder per project

```
assets/<project-slug>/
```

The slug is the project's page name in `projects/`. Current slugs, in site order:

| Project | Folder |
|---|---|
| Doodle Jump | `assets/doodle-jump/` |
| Metallic Odyssey | `assets/unreal-3d-platformer/` |
| Tactical Skirmish | `assets/unreal-tps-skirmish/` |
| Zombie Horde Survival | `assets/unreal-topdown-shooter-survival/` |
| TFPS | `assets/true-first-person-shooter/` |
| Urban Reign | `assets/urban-reign/` (versions: `v1/`, `v2/`) |
| Elemental Katana | `assets/elemental-katana/` |
| Warrior's Way | `assets/warriors-way/` (versions: `v1/`, `v2/`) |
| Limitless Monster Slaughter | `assets/limitless-monster-slaughter/` |
| Eye of the Divine | `assets/eye-of-the-divine/` |
| DeadZone V1 (Playable Builds) | `assets/deadzone-v1/` |
| DeadZone V2 (Playable Builds) | `assets/deadzone-v2/` |

Folder names are lowercase, with hyphens instead of spaces.

## 2. Videos are numbered

```
01.mp4  02.mp4  03.mp4  ...
```

- Always two digits, starting at `01`.
- **No gaps.** The site stops looking at the first missing number. If `02.mp4` is missing, `03.mp4` is never found.
- The number is the play order. `01` opens first on the project page and is the card preview on the home page.
- `.mp4` (H.264) is preferred. `.webm` also works. If both exist for the same number, `.mp4` wins.
- Up to `50` per folder.

To reorder videos, rename the files. To remove one, delete it and renumber the rest so there's no gap.

## 3. Images work the same way

```
01.jpg  02.png  03.webp  ...
```

- Images are their own numbered sequence, separate from videos: `01.mp4` and `01.jpg` can sit side by side.
- Same rules: two digits, start at `01`, no gaps. `.jpg`, `.jpeg`, `.png` and `.webp` all work.
- They appear after the videos in the picker, named "Image 1", "Image 2"... Clicking an image opens it full size.
- If a project has no videos, image `01` becomes its home page card.

## 4. Everything else is automatic

- **Empty folder:** the card and page show "Videos coming soon" until `01.mp4` (or `01.jpg`) is added.

- **Names:** videos are always shown as "Video 1", "Video 2"... and images as "Image 1", "Image 2"... in number order, on every project.
- **Lengths:** read from the file.
- **Thumbnails and previews:** always a frame of the video itself (or image `01` when there are no videos). No separate thumbnail files.

## 5. Versions use subfolders

Only for projects that really have versions, like Urban Reign and Warrior's Way:

```
assets/urban-reign/v1/01.mp4
assets/urban-reign/v1/02.mp4   <- a second video inside V1 ("Video 2")
assets/urban-reign/v2/01.mp4
```

Each version folder follows rule 2. A new version (for example `v3/`) also needs an entry in
the project's `versions` list in `js/projects/`, because the version name and text live there.

A project made at different times but shown as one post (like Limitless Monster Slaughter)
doesn't use versions. All its videos go straight into its folder as `01`, `02`, `03`...

## 6. Keep each file under 15 MB

The hosted site rejects files over 15 MB. Run big recordings through `tools/compress-video.html`
(open it in Chrome or Edge) and set the clip number to the next free number, for example `04`.
It saves `04.mp4`, ready to drop into the folder.

## Quick checklist for a new video

1. Compress it: `tools/compress-video.html`, clip number `04`.
2. Drop `04.mp4` into the project's folder.
3. Refresh the page. It appears as "Video 4".
