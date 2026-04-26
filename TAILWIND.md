# Tailwind CSS Preset for macOS UI

This preset provides Tailwind CSS utilities for building macOS-style interfaces.

## Installation

The preset is included with `@sylonik/macos-ui`. To use it, add it to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@sylonik/macos-ui/tailwind.preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Include the library components if you're using them
    './node_modules/@sylonik/macos-ui/dist/**/*.js',
  ],
  // ... your other config
}
```

## Features

### Colors

The preset includes macOS-themed colors that reference CSS variables:

- `macos-background` - Main background color
- `macos-foreground` - Main text color
- `macos-primary` - Primary accent color
- `macos-secondary` - Secondary color
- `macos-accent` - Accent color
- `macos-muted` - Muted color
- `macos-border` - Border color
- `macos-window-background` - Window background (with transparency)
- `macos-window-border` - Window border color
- `macos-dock-background` - Dock background (with transparency)
- `macos-menubar-background` - Menu bar background (with transparency)

**Usage:**
```jsx
<div className="bg-macos-background text-macos-foreground">
  <div className="bg-macos-window-background border border-macos-window-border">
    Window content
  </div>
</div>
```

### Border Radius

Custom border radius values for macOS components:

- `macos-sm` - Small radius
- `macos-md` - Medium radius
- `macos-lg` - Large radius
- `macos-window` - Window border radius
- `macos-dock` - Dock border radius

**Usage:**
```jsx
<div className="rounded-macos-window">Window</div>
<div className="rounded-macos-dock">Dock</div>
```

### Backdrop Blur

Blur effects for glass morphism:

- `macos-window` - Window blur effect
- `macos-dock` - Dock blur effect
- `macos-menubar` - Menu bar blur effect

**Usage:**
```jsx
<div className="backdrop-blur-macos-window">Blurred window</div>
```

### Box Shadows

macOS-style shadows:

- `macos-window` - Default window shadow
- `macos-window-active` - Active window shadow (more prominent)
- `macos-dock` - Dock shadow

**Usage:**
```jsx
<div className="shadow-macos-window">Window</div>
<div className="shadow-macos-window-active">Active window</div>
```

### Animations

#### Window Animations

- `animate-window-appear` - Window fade in and scale up
- `animate-window-disappear` - Window fade out and scale down
- `animate-window-minimize` - Window minimize to dock
- `animate-window-restore` - Window restore from dock

#### Dock Animations

- `animate-dock-bounce` - Dock item bounce effect
- `animate-dock-item-appear` - Dock item appear animation
- `animate-dock-magnify` - Dock magnification effect

#### Menu Animations

- `animate-menu-slide-down` - Menu dropdown slide down
- `animate-menu-slide-up` - Menu dropdown slide up

#### Desktop Icon Animations

- `animate-icon-bounce` - Icon bounce effect
- `animate-icon-wiggle` - Icon wiggle effect

**Usage:**
```jsx
<div className="animate-window-appear">Appearing window</div>
<button className="hover:animate-dock-bounce">Dock item</button>
```

### Spacing

Custom spacing values:

- `window-padding` - Standard window padding
- `dock-padding` - Dock padding
- `menubar-height` - Menu bar height

**Usage:**
```jsx
<div className="p-window-padding">Window content</div>
<div className="h-menubar-height">Menu bar</div>
```

### Timing Functions

macOS-style easing functions:

- `macos-ease` - Standard easing
- `macos-ease-in` - Ease in
- `macos-ease-out` - Ease out
- `macos-ease-in-out` - Ease in-out

**Usage:**
```jsx
<div className="transition-all ease-macos-ease">Smooth transition</div>
```

## Customization

You can override any of the CSS variables in your own CSS:

```css
:root {
  --macos-primary: hsl(210 100% 50%);
  --macos-radius-window: 1rem;
  /* ... other variables */
}
```

Or use the theme system programmatically:

```ts
import { applyTheme } from '@sylonik/macos-ui/lib/theme'

applyTheme({
  colors: {
    primary: 'hsl(210 100% 50%)',
    // ... other colors
  },
  // ... other theme properties
})
```
