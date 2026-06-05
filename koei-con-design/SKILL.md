---
name: koei-con-design
description: Design system skill for koei-con. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# koei-con Design System

You are building UI for **koei-con**. Light-themed, neutral palette, sans-serif typography (Zen Kaku Gothic Antique), compact density on a 4px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![koei-con Homepage](screenshots/homepage.png)

> Read `references/DESIGN.md` for full token details.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Zen Kaku Gothic Antique for body/UI text, Lexend for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **neutral palette** — the color temperature runs neutral, matching the sans-serif typography.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#ffffff` | Page/app background |
| Surface | `--surface` | `#e9f3f2` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#000000` | Headings, body text |
| Text Muted | `--text-muted` | `#6870a8` | Captions, placeholders |
| Border | `--border` | `#2f303a` | Dividers, card borders |

### Status Colors

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#219884` | Confirmations, positive trends |
| Warning | `#c6b47a` | Caution states, pending items |

### Extended Palette

- **clr-primary-default:** `#4cac9c`
- `#222222`
- `#82d7f1`
- `#096b89`
- `#8f5f8b`
- `#dddddd`
- **clr-primary-dark:** `#1c8774`
- **clr-primary-light:** `#5dcfbc`

### CSS Variable Tokens

```css
--clr-primary-default: #4cac9c;
--clr-primary-dark: #1c8774;
--clr-primary-light: #5dcfbc;
--clr-secondary-default: #6870a8;
--clr-secondary-default-2: #616aa0;
--clr-secondary-dark: #56609f;
--clr-secondary-dark-2: #4b5387;
--clr-secondary-light: #7a84c6;
--clr-text-primary: #2f303a;
--clr-text-secondary: #7a7a81;
--radius-primary: 16;
--radius-primary-sp: 8;
--radius-secondary: 8;
--radius-secondary-sp: 4;
--border-radius-max: calc(var(--radius-max)*var(--rem-pc));
--clr-primary-default: #4cac9c;
--clr-primary-dark: #1c8774;
--clr-primary-light: #5dcfbc;
--clr-secondary-default: #6870a8;
--clr-secondary-default-2: #616aa0;
```

## Typography

### Font Stack

- **Zen Kaku Gothic Antique** — Heading 1, Heading 2, Heading 3
- **Lexend** — Body, Caption

### Font Sources

```css
@font-face {
  font-family: "Lexend";
  src: url("fonts/Lexend-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Lexend";
  src: url("fonts/Lexend-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Zen Kaku Gothic Antique";
  src: url("fonts/ZenKakuGothicAntique-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Zen Kaku Gothic Antique";
  src: url("fonts/ZenKakuGothicAntique-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Zen Kaku Gothic Antique | 18.75rem | 700 |
| Heading 2 | Zen Kaku Gothic Antique | 17.5rem | 700 |
| Heading 3 | Zen Kaku Gothic Antique | 12.5rem | 700 |
| Body | Lexend | 1rem | 400 |
| Caption | Lexend | max(16px,1.125rem) | 400 |

### Typography Rules

- Body/UI: **Zen Kaku Gothic Antique**, Headings: **Lexend** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `0.1875rem, 0.25rem, 0.2857142857rem, 0.3571428571rem, 0.5rem, 1rem, 1.1428571429rem, 1.4285714286rem, 1.5rem, 2rem, 2.2857142857rem, 2.5rem, 2.8571428571rem, 3.125rem, 3.5rem, 4rem, 5rem, 8px`
Default: `2rem`

### Container

Max-width: `75rem`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| md | 47.9375em |
| md | 48em |
| xl | 67.5em |
| xl | 67.5625em |
| xl | 70em |
| 2xl | 85.375em |
| 2xl | 92.5em |
| 2xl | 120.0625em |
| md | 768px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #e9f3f2;
  border: 1px solid #2f303a;
  border-radius: 2rem;
  padding: 16px;
  box-shadow: 0;
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #cccccc;
  color: #000000;
  border-radius: 2rem;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #2f303a;
  color: #000000;
  border-radius: 2rem;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #ffffff;
  border: 1px solid #2f303a;
  border-radius: 2rem;
  padding: 8px 12px;
  color: #000000;
  font-size: 14px;
}
.input:focus { border-color: var(--accent); outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #e9f3f2;
  color: #6870a8;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #e9f3f2;
  border: 1px solid #2f303a;
  border-radius: 8px;
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: var(--box-shadow-default);
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #6870a8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #2f303a;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #2f303a;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #2f303a;
}
.nav-link {
  color: #6870a8;
  padding: 8px 12px;
  border-radius: 2rem;
  transition: color 150ms;
}
.nav-link:hover { color: #000000; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)

**Modal** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (37 items)
- **Hero** — Hero/banner section with headline and CTAs
- **Faq** — FAQ/accordion section
- **Footer** — Page footer with links and info (37 items)
- **Cta** — Call-to-action section

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `loop_1st`
- `loop_2nd`
- `loop_y_1st`
- `loop_y_2nd`
- `spin`

### Motion Tokens

- **Duration scale:** `192s`, `200ms`, `300ms`, `500ms`, `750ms`, `800ms`, `1000ms`, `1200ms`, `1500ms`, `2000ms`
- **Easing functions:** `ease-out`, `ease`, `cubic-bezier(0.25,1,0.5,1)`, `cubic-bezier(0.25,1.8,0.5,1)`, `cubic-bezier(0,0,0,1)`, `cubic-bezier(0.22,1,0.36,1)`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (192s) for micro-interactions, long (2000ms) for page transitions
- **Easing:** Use `ease-out` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Raised (cards, buttons): `0`
- Raised (cards, buttons): `0 0 2rem rgba(0,0,0,.1)`
- Raised (cards, buttons): `var(--box-shadow-default)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 50, 75, 99, 100, 200, 300, 999, 9999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Zen Kaku Gothic Antique and Lexend are allowed
- **No arbitrary border-radius** — use the scale: 0.1875rem, 0.25rem, 0.2857142857rem, 0.3571428571rem, 0.5rem, 1rem, 1.1428571429rem, 1.4285714286rem, 1.5rem, 2rem
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Zen Kaku Gothic Antique, Lexend only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://www.koei-con.co.jp/`
- **Brand typeface:** Zen Kaku Gothic Antique

## Quick Reference

```
Background:     #ffffff
Surface:        #e9f3f2
Text:           #000000 / #6870a8
Accent:         (not extracted)
Border:         #2f303a
Font:           Zen Kaku Gothic Antique
Spacing:        4px grid
Radius:         2rem
Components:     8 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for koei-con
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "koei-con" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# koei-con DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 8
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![koei-con Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a neutral, approachable feel. The light background emphasizes content clarity. Typography pairs **Lexend** for display/headings with **Zen Kaku Gothic Antique** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| clr-text-light | `#ffffff` | background | Page background, darkest surface |
| surface | `#e9f3f2` | surface | Card and panel backgrounds |
| swiper-preloader-color | `#000000` | text-primary | Headings and body text |
| clr-secondary-default | `#6870a8` | text-muted | Captions, placeholders, secondary info |
| clr-text-secondary | `#7a7a81` | text-muted | Captions, placeholders, secondary info |
| clr-text-placeholder | `#cccccc` | text-muted | Captions, placeholders, secondary info |
| clr-text-primary | `#2f303a` | border | Dividers, card borders, outlines |
| success | `#219884` | success | Success states, positive indicators |
| warning | `#c6b47a` | warning | Warning states, caution indicators |
| info | `#82d7f1` | info | Informational highlights |
| clr-primary-default | `#4cac9c` | unknown | Palette color |
| unknown | `#222222` | unknown | Palette color |
| unknown | `#096b89` | unknown | Palette color |
| unknown | `#8f5f8b` | unknown | Palette color |
| unknown | `#dddddd` | unknown | Palette color |
| clr-primary-dark | `#1c8774` | unknown | Palette color |
| clr-primary-light | `#5dcfbc` | unknown | Palette color |
| clr-secondary-dark | `#56609f` | unknown | Palette color |
| clr-secondary-dark-2 | `#4b5387` | unknown | Palette color |
| clr-secondary-light | `#7a84c6` | unknown | Palette color |

### CSS Variable Tokens

```css
--clr-primary-default: #4cac9c;
--clr-primary-dark: #1c8774;
--clr-primary-light: #5dcfbc;
--clr-secondary-default: #6870a8;
--clr-secondary-default-2: #616aa0;
--clr-secondary-dark: #56609f;
--clr-secondary-dark-2: #4b5387;
--clr-secondary-light: #7a84c6;
--clr-text-primary: #2f303a;
--clr-text-secondary: #7a7a81;
--radius-primary: 16;
--radius-primary-sp: 8;
--radius-secondary: 8;
--radius-secondary-sp: 4;
--border-radius-max: calc(var(--radius-max)*var(--rem-pc));
--clr-primary-default: #4cac9c;
--clr-primary-dark: #1c8774;
--clr-primary-light: #5dcfbc;
--clr-secondary-default: #6870a8;
--clr-secondary-default-2: #616aa0;
```


---

## 3. Typography Rules

**Font Stack:**
- **Zen Kaku Gothic Antique** — Heading 1, Heading 2, Heading 3
- **Lexend** — Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "Lexend";
  src: url("fonts/Lexend-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Lexend";
  src: url("fonts/Lexend-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Zen Kaku Gothic Antique";
  src: url("fonts/ZenKakuGothicAntique-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Zen Kaku Gothic Antique";
  src: url("fonts/ZenKakuGothicAntique-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Zen Kaku Gothic Antique | 18.75rem | 700 |
| Heading 2 | Zen Kaku Gothic Antique | 17.5rem | 700 |
| Heading 3 | Zen Kaku Gothic Antique | 12.5rem | 700 |
| Body | Lexend | 1rem | 400 |
| Caption | Lexend | max(16px,1.125rem) | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **Zen Kaku Gothic Antique** for body/UI text, **Lexend** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (2)

**Badge** — `html`

**List** — `html`

### Data Input (1)

**Button** — `html`
- Animation: 

### Overlay (1)

**Modal** — `html`

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** 0.1875rem, 0.25rem, 0.2857142857rem, 0.3571428571rem, 0.5rem, 1rem, 1.1428571429rem, 1.4285714286rem, 1.5rem, 2rem, 2.2857142857rem, 2.5rem, 2.8571428571rem, 3.125rem, 3.5rem, 4rem, 5rem, 8px
- **Max content width:** 75rem

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Raised — cards, buttons, interactive elements

- `0`
- `0 0 2rem rgba(0,0,0,.1)`
- `var(--box-shadow-default)`

### Z-Index Scale

`0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 50, 75, 99, 100, 200, 300, 999, 9999`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes loop_1st`
- `@keyframes loop_2nd`
- `@keyframes loop_y_1st`
- `@keyframes loop_y_2nd`
- `@keyframes spin`
- `@keyframes slide_idling`
- `@keyframes slide_idling_sp`
- `@keyframes cloudFlow01`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#ffffff` as the primary page background
- Pair **Zen Kaku Gothic Antique** (body) with **Lexend** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: 0.1875rem, 0.25rem, 0.2857142857rem, 0.3571428571rem, 0.5rem
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Zen Kaku Gothic Antique and Lexend
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| md | 47.9375em | css |
| md | 48em | css |
| xl | 67.5em | css |
| xl | 67.5625em | css |
| xl | 70em | css |
| 2xl | 85.375em | css |
| 2xl | 92.5em | css |
| 2xl | 120.0625em | css |
| md | 768px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #e9f3f2
Border: 1px solid #2f303a
Radius: 2rem
Padding: 16px
Font: Zen Kaku Gothic Antique
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg var(--accent), text white
Ghost: bg transparent, border #2f303a
Padding: 8px 16px
Radius: 2rem
Hover: opacity 0.9 or lighter shade
Focus: ring with var(--accent)
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 75rem, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #e9f3f2
Label: #6870a8 (muted, 12px, uppercase)
Value: #000000 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #2f303a
Focus: border-color var(--accent)
Label: #6870a8 12px
Spacing: 16px between fields
Radius: 2rem
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Zen Kaku Gothic Antique, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Lexend-Black.ttf`
- `fonts/Lexend-Bold.ttf`
- `fonts/Lexend-ExtraBold.ttf`
- `fonts/Lexend-ExtraLight.ttf`
- `fonts/Lexend-Light.ttf`
- `fonts/Lexend-Medium.ttf`
- `fonts/Lexend-Regular.ttf`
- `fonts/Lexend-SemiBold.ttf`
- `fonts/Lexend-Thin.ttf`
- `fonts/ZenKakuGothicAntique-Black.ttf`
- `fonts/ZenKakuGothicAntique-Bold.ttf`
- `fonts/ZenKakuGothicAntique-Light.ttf`
- `fonts/ZenKakuGothicAntique-Medium.ttf`
- `fonts/ZenKakuGothicAntique-Regular.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

