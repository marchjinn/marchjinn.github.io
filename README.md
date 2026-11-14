# March Jinn — Website Foundation

Initial Astro + TypeScript foundation for the March Jinn Digital Platform.

## Current scope

- Astro static site foundation
- Shared site layout and global design tokens
- Persistent bottom navigation for the currently active domains: Music and Media
- Initial route shells for `/music/` and `/media/`
- Separate `/zillion/` route
- Temporary Cloudflare Pages redirect from `/` to `/zillion/` (HTTP 302)
- No legacy GECƏ content, MIRAGE⁶ public branding, analytics, authentication, or third-party embeds

This is a technical foundation, not the completed website. The visual system is intentionally restrained while unresolved design details and source assets are reviewed.

## Requirements

- Node.js 22+
- npm

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

## Validate and build

```bash
npm run check
npm run build
npm run preview
```

The production build is written to `dist/`.

## Cloudflare Pages

For a static Astro project, use:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`

Keep the existing custom-domain configuration for `marchjinn.com`. The root redirect is implemented through `public/_redirects` and is temporary. Remove that rule only when the root-entry experience is ready to replace it.

## Typography and assets

The design tokens reserve `MONOLOG BLACK` for display typography and use an Inter/system stack for interface and body text. The actual licensed font files are not bundled. Add the approved font files only after confirming the correct font files and web-use license.

The existing repository image assets have not been replaced or reinterpreted in this foundation. Review the current artwork and Fire Jinn symbol files before integrating them.

## Important implementation notes

- Astro Client Router is enabled for client-side navigation enhancements.
- No persistent audio player is implemented yet.
- No search index or search UI is implemented yet.
- Music and Media are route shells; their content architecture will be implemented in subsequent stages.
- The `/` → `/zillion/` redirect is an HTTP 302, not a permanent redirect.
