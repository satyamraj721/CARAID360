# AUTOAID 360 Brand Assets

Colors:
- Primary Blue: #007BFF
- Accent Green: #00C897
- Neutral Dark: #0F172A

Files:
- `autoaid360_logo.svg` — primary gradient logo (wheel + plug emblem, wordmark)
- `autoaid360_logo_mono.svg` — monochrome version for single-color prints
- `logo-regular.png` — 1024x1024 square
- `logo-horizontal.png` — 1200x400 horizontal
- `favicon-32.png`, `favicon-16.png` — favicons

Generating PNGs:
Run this to generate PNG files from SVG:
```
npm run generate:assets
```

Usage:
- App header/footer: use `autoaid360_logo.svg`
- Social/OG images: use `logo-horizontal.png`
- Favicon: include both pngs in `client/index.html`

