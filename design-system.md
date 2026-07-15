# Casa Design System

## 1. Design philosophy

Casa is a private thinking environment: quiet enough for long-form focus, dense enough to feel capable, and slightly mysterious without becoming theatrical. A single dark theme reduces context switching and makes the knowledge graph and Casa orb feel luminous by contrast. Young Serif gives titles a personal, manuscript-like voice; Instrument Sans keeps navigation, metadata, and long notes precise and highly readable.

**Design read:** dark-editorial productivity application for a technical personal user.

**Dials:** `DESIGN_VARIANCE: 6`, `MOTION_INTENSITY: 7`, `VISUAL_DENSITY: 6`. Layouts may be asymmetric, but navigation remains predictable. Motion is concentrated in the Casa orb; the rest of the product uses restrained functional transitions.

## 2. Color tokens

### Core interface palette

The primary UI uses five colors total. Field colors are data-visualization exceptions used only in the graph and field indicators.

| Token | Value | Purpose |
|---|---:|---|
| `--color-bg-base` | `#0D0C0D` | App and HTML background; off-black, never pure black |
| `--color-bg-raised` | `#171416` | Sidebar, panels, editor controls |
| `--color-border` | `#30272A` | Dividers, input outlines, structural borders |
| `--color-text-primary` | `#F3EEE9` | Primary text; warm off-white, never pure white |
| `--color-text-muted` | `#A89FA1` | Secondary labels and metadata |
| `--color-accent-casa` | `#730A13` | Casa identity, active controls, focus rings |
| `--color-accent-casa-hover` | `#8D1822` | Hover/active accent |
| `--color-accent-casa-soft` | `#3A1116` | Selected navigation and subtle accent surfaces |
| `--color-accent-casa-light` | `#D7787F` | Orb highlights and accessible small accent text |

Contrast policy: body copy must meet WCAG AA 4.5:1; large display text must meet 3:1. Dark maroon is not used as small text over the base background; use `--color-accent-casa-light` instead.

### Knowledge-field visualization palette

These tokens appear only in graph nodes, field-score bars, and their legends. They never become general UI accents.

| Token | Value | Field |
|---|---:|---|
| `--color-field-backend` | `#2563EB` | Backend Engineer |
| `--color-field-frontend` | `#06B6D4` | Frontend Engineer |
| `--color-field-ai` | `#8B5CF6` | AI Engineer |
| `--color-field-ml` | `#EC4899` | ML Engineer |
| `--color-field-devops` | `#F97316` | DevOps Engineer |
| `--color-field-iot` | `#22C55E` | IoT Engineer |
| `--color-field-network` | `#EAB308` | Network Engineer |
| `--color-field-automation` | `#EF4444` | Instrumentation & Automation |
| `--color-field-neutral` | `#9CA3AF` | Personal / uncategorized |

For multi-field notes, interpolate weighted field colors in HSL using normalized `fieldScores`. Add a subtle off-white outline for nodes whose resulting color does not reach sufficient contrast against `--color-bg-base`.

## 3. Typography tokens

### Families

- `--font-display`: **Young Serif**, serif fallback. Headings only.
- `--font-sans`: **Instrument Sans**, system sans fallback. Body, labels, controls, and note content.

### Modular scale

Base size is 16px with an approximately 1.25 ratio.

| Token | Size | Line height | Weight | Use |
|---|---:|---:|---:|---|
| `--text-h1` | `2.75rem` | `1.08` | `400` | Main page title |
| `--text-h2` | `2rem` | `1.15` | `400` | Note/editor title |
| `--text-h3` | `1.5rem` | `1.25` | `400` | Section title |
| `--text-h4` | `1.25rem` | `1.35` | `400` | Panel title |
| `--text-body-lg` | `1.125rem` | `1.55` | `400` | Lead and editor content |
| `--text-body` | `1rem` | `1.55` | `400` | Standard body |
| `--text-body-sm` | `0.875rem` | `1.5` | `450` | Navigation and metadata |
| `--text-label` | `0.75rem` | `1.4` | `600` | Uppercase labels, tracking `0.08em` |

Headings use balanced wrapping. Body copy is limited to approximately 70 characters per line in the editor.

## 4. Spacing scale

Use a 4px base grid. Prefer layout `gap` over sibling margins.

| Token | Value |
|---|---:|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `2.5rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |

Primary app gutters: 16px mobile, 24px tablet, 32px desktop. Interactive targets are at least 44px on touch devices.

## 5. Radius, borders, and shadows

Shape rule: controls use `8px`, structural panels use `12px`, and circular controls use full radius. Avoid decorative mixtures.

| Token | Value | Use |
|---|---:|---|
| `--radius-control` | `0.5rem` | Buttons, fields, tags |
| `--radius-panel` | `0.75rem` | Panels and preview surfaces |
| `--radius-round` | `999px` | Orb and icon-only controls |
| `--border-subtle` | `1px solid #30272A` | Structural separation |
| `--shadow-panel` | `0 18px 48px rgba(40, 8, 12, 0.18)` | Floating panel only |
| `--shadow-orb` | `0 0 44px rgba(115, 10, 19, 0.34)` | Casa orb only |

Cards are not the default grouping device. Prefer separators, tonal planes, and whitespace. Glow belongs only to Casa and is kept below 40% opacity in idle state.

## 6. Motion

| Token | Value | Use |
|---|---:|---|
| `--duration-fast` | `140ms` | Hover, press, focus |
| `--duration-standard` | `220ms` | Navigation and panel transitions |
| `--duration-slow` | `480ms` | Orb state interpolation |
| `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Product UI |
| `--ease-orb` | `cubic-bezier(0.16, 1, 0.3, 1)` | Casa state changes |

Idle orb breathing uses a 4–6 second rhythm. Listening responds directly to microphone amplitude. Processing uses faster procedural noise without fake audio. Speaking uses outward displacement and output-level sampling where available. Done performs one 480ms confirmation pulse before returning to idle.

Honor `prefers-reduced-motion`: freeze continuous rotation/noise at a calm static state, remove bloom pulsing, and preserve state changes through color, labels, and status text.

## 7. Layout and component rules

- Mobile-first. On narrow screens, the sidebar becomes a compact top rail and Casa remains reachable in a dedicated bottom/right region without covering editor actions.
- Desktop uses three purposeful zones: 240px navigation, flexible workspace, and a 280–320px Casa rail.
- Main workspace may use asymmetric columns; content hierarchy must not depend on symmetry.
- Casa is globally visible and has a textual state label for non-visual feedback.
- Icons come from the project-wide Lucide family at a consistent 18–20px optical size.
- All ad-hoc raw colors are prohibited in components. Components consume semantic Tailwind tokens backed by the CSS variables above.
