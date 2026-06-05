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
