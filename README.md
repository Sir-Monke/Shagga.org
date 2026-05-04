# shagga.org

Goofy as hell. Built like Windows XP. Made for laptops and iPads — phones get a Blue Screen of Shagga.

## Features

### Auto-spawning popups (every 4–9 seconds, indefinitely)
- **Top Shagga's In Your Area!** — pulls your real city from your IP
- **Shagga Item For Sale!** — random items, random prices, fake BUY NOW
- **h4ck4_5h4gg4.exe** — black terminal showing your browser/OS info
- **Norton AntiShagga 2003** — fake AV scan finding shaggas in system32
- **LimeShagga** — downloading shagga.exe, 47 hours remaining at 0.2KB/s
- **MSN Messenger** — random shagga harassing you with NUDGEs
- **CONGRATULATIONS!!!** — you're the 1,000,000th visitor
- **ShaggaOS Update** — installing critical update, will restart 14 times
- **Chain email** — forward to 10 mates or your nan dies

### Mini-apps (open from the Start menu)
- **Shaggapad** — opens shagga.txt with the top-10 list
- **Calculator** — fully working XP-style 4-function calculator
- **Punt Sweeper** — playable Minesweeper, right-click to flag
- **Internet Shagga** — fake browser opening a Geocities-style page
- **Shagga-Paint** — pencil, eraser, sizes, 18-color palette
- **Punt the Magpie** — 30s clicker game
- **Goon Bag Calculator** — input weight, get goon capacity
- **Shagga Weather** — always says "scorcher mate"

### Desktop & OS chrome
- Working **Start menu** with two-column layout and Turn Off / Log Off
- **Right-click context menu** on desktop (Refresh, Properties, Crash, Rave Mode, Show Clippy)
- **Movable, resizable, maximisable** windows (drag title, 8 edge handles, double-click to maximise)
- Working **taskbar** with start button, minimised windows, live clock
- Desktop icons: **shagga.txt, My Shagga, Internet Shagga, tax_returns, Recycle Bin**
- Folder windows: My Shagga (with drives), Recycle Bin (with deleted shaggas), tax_returns
- **Days Since Last Snag** desktop widget
- **Clippy** floats in with tips, draggable, dismissible

### Easter eggs
- **Type `shagga`** anywhere → 5 popups + rave mode
- **Konami code** (↑↑↓↓←→←→ b a) → rave mode (raining emoji + flashing)
- **Random BSOD** every 4–8 minutes — full-screen, dismisses after a few seconds
- **Asteroids-style window wrap** — drag a window fully off the left edge, it reappears from the right
- **Noon snag** — every day from 12:00–12:59, a giant ghostly snag appears on the desktop
- **Crash Computer** in the right-click menu triggers BSOD on demand
- **Engage Rave Mode** in the right-click menu

### Phone block
Phones get a BSOD-style screen telling them to use a real device. iPad portrait works fine.

## Deliberately skipped

- **Solitaire** — too complex to do properly in one pass
- **XP startup chime** — no good free audio source
- **Defrag / Pipes screensavers** — would each need their own animation engine; the rave mode + BSOD already cover the chaos quota
- **Bunnings sausage sizzle locator** — niche even by shagga standards

## Running it

Need Node.js 18+:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a laptop browser. For production: `npm run build && npm start`.

## Adding your real images

Currently uses placeholders. To use your photos:

1. Drop "for sale" pics into `public/images/products/` named `1.jpg`, `2.jpg`, ...
2. Drop "shagga" pics into `public/images/shaggas/` same way
3. Open `components/imageManifest.ts`:
   - Set `usePlaceholder: false`
   - Set `productsCount` and `shaggasCount` to your actual counts
   - Change `.jpg` → `.png` in `productsExt` / `shaggasExt` if needed

## Editing the top-10 list

`public/shagga.txt` — edit and reload.

## Deploying

Easiest: push to GitHub → import at vercel.com → point your `shagga.org` domain at the Vercel deployment. Zero config required.

— G'day, mate. Send it.
