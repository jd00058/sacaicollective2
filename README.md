# sacaicollective.com

The homepage for AI Collective Sacramento. Next.js 16 + Tailwind 4 + Motion + Lenis, hosted on Netlify.

```bash
npm install
npm run dev
```

## Editing

- **Copy:** every word on the page lives in `app/content.ts`.
- **Events:** pulled from the Luma calendar (luma.com/sacaic) and refreshed every 30 minutes. Post an event on Luma and it appears on the site. With nothing upcoming, the section shows a "next one is being planned" card.
- **Photos:** event photos live in `public/photos/` (web-sized JPGs, about 1800px on the long edge, 2560px for `room.jpg`). Each one is listed in `photos` in `app/content.ts` with its alt text, the event it came from (shown as a caption), whether it's wide (`3/2`) or tall (`2/3`), and an optional crop anchor. To swap a photo, replace the file under the same name. If a file goes missing, a labeled placeholder shows in its spot.

  | File | Where it shows |
  | --- | --- |
  | `room.jpg` | The full-bleed "Every dot is a person" reveal after the scroll story |
  | `workshop.jpg`, `meetup.jpg`, `talk.jpg`, `build.jpg` | What we do: hover previews (desktop) and inline photos (mobile) |
  | `laughing.jpg`, `conversation.jpg`, `smiles.jpg`, `building.jpg`, `pair.jpg`, `notes.jpg`, `table.jpg`, `contacts.jpg`, `applause.jpg`, `laptops.jpg`, `audience.jpg`, `focus.jpg` | Inside the room: the masonry wall, in the order set by `gallery.shots` |

- **Partner logos:** drop logo files (SVG or transparent PNG) into `public/partners/`. They're shown as white silhouettes, so anything that isn't transparent shows up as solid white: knock the background out first. Each logo is sized by its aspect ratio so square marks and long wordmarks carry similar weight, and "Open seat" cells top up the last row of the wall. The file name becomes the alt text (`city-of-rancho-cordova.png` → "City of Rancho Cordova").
- **Sac Tech Week card:** the "Official Managing Partner of Sac Tech Week" card next to the partners heading. Copy is in `partners.managing` in `app/content.ts`; the logo is `public/brand/stw-rabbit.png` + `stw-letters.png` (split from STW's official white stack logo so the rabbit can hop on hover).

`scripts/assets.mjs` runs before `dev` and `build` and records which photos and logos exist.

## Design context

`PRODUCT.md` holds the audience, voice and design principles. The brand source of truth is `../AIC/ai_collective_sacramento_brand_context.md`.
