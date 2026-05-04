# Shagga Videos

Drop your video files in this folder, named `1.mp4`, `2.mp4`, ..., up to `videosCount`.

In `components/imageManifest.ts`, set:
- `videosCount` to how many videos you have
- `videosExt` to the file extension (`mp4`, `webm`, etc.)

The ShaggaTube player will play these when you click any video card.
If `videosCount` is 0 or there's no matching file, the emoji thumbnail shows instead.

## Tips
- mp4 with H.264 codec works in every browser
- Keep files under ~10MB each — Vercel's free tier has bandwidth limits
- Filename = video ID. Video #1 in the list plays `1.mp4`, video #5 plays `5.mp4`
