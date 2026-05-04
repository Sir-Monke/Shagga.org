# Shagga Audio

Drop your audio files here, named `1.mp3`, `2.mp3`, etc.

Update `components/imageManifest.ts`:
- `audioCount` to the number you have
- `audioExt` to the file extension (`mp3`, `wav`, `ogg`)

Shagga-fy will play these when you press Play. If `audioCount` is 0,
the player falls back to a simulated progress bar (no actual sound).

Round-robin: if you have fewer audio files than tracks, they cycle
(e.g. 3 audio files = track 1 plays 1.mp3, track 4 plays 1.mp3 again).
Even one file makes every track playable.

## Tips
- mp3 works in every browser
- Keep files under ~5MB
- 10-60 second clips are perfect
- Free clips: pixabay.com/music, freesound.org, your own recordings
