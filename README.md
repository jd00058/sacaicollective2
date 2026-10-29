# sacaicollective.com

The homepage for AI Collective Sacramento. Next.js 16 + Tailwind 4 + Motion + Lenis, hosted on Netlify.

```bash
npm install
npm run dev
```

## Editing

- **Copy:** every word on the page lives in `app/content.ts`.
- **Events:** pulled from the Luma calendar (luma.com/sacaic) and refreshed every 30 minutes. Post an event on Luma and it appears on the site. With nothing upcoming, the section shows a "next one is being planned" card.
- **Photos:** drop JPGs into `public/photos/` using these names, then rebuild. Until a file exists, a labeled placeholder shows in its spot.

  | File | Where it shows | Ideal shot |
  | --- | --- | --- |
  | `workshop.jpg` | What we do: Workshops | Hands on laptops, mid-workshop |
  | `meetup.jpg` | What we do: Builder meetups | A builder demoing to the room |
  | `talk.jpg` | What we do: Talks & panels | Speaker at the front, full room |
  | `build.jpg` | What we do: Build days | Small group building at a table |
  | `room.jpg` | Inside the room (large) | Wide shot of a packed room |
  | `conversation.jpg` | Inside the room | Two people mid-conversation |
  | `laughing.jpg` | Inside the room | Candid laugh during a session |
  | `group.jpg` | Inside the room (wide) | Group photo at the end of the night |

- **Partner logos:** drop logo files (SVG or transparent PNG) into `public/partners/`. They're shown as white silhouettes; the file name becomes the alt text (`city-of-sacramento.svg` → "city of sacramento").

`scripts/assets.mjs` runs before `dev` and `build` and records which photos and logos exist.

## Design context

`PRODUCT.md` holds the audience, voice and design principles. The brand source of truth is `../AIC/ai_collective_sacramento_brand_context.md`.
