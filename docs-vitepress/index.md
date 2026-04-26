---
layout: home

hero:
  name: "@sylonikse/macos-ui"
  text: "Authentic macOS Components for React"
  tagline: "Beautiful, accessible, copy-paste macOS-style components built with TypeScript and Tailwind CSS."
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/sylonik/macos-ui
    - theme: alt
      text: View Components
      link: /components/window

features:
  - icon: "&#x1F3A8;"
    title: Pixel-Perfect macOS Design
    details: Faithfully recreated macOS components including Window, Dock, MenuBar, and DesktopIcon with authentic styling and animations.
  - icon: "&#x1F4CB;"
    title: Copy & Paste
    details: Install individual components into your project using the CLI. Own the code, customize freely, no runtime dependency lock-in.
  - icon: "&#x1F527;"
    title: TypeScript First
    details: Built with TypeScript in strict mode. Full type safety with exported interfaces for all component props and configurations.
  - icon: "&#x1F3A8;"
    title: Themeable with Tailwind
    details: Comprehensive theming system using CSS custom properties and a Tailwind CSS preset. Light and dark mode out of the box.
  - icon: "&#x267F;"
    title: Accessible
    details: WCAG 2.1 compliant with proper ARIA attributes, keyboard navigation, focus management, and screen reader support.
  - icon: "&#x1F9EA;"
    title: Thoroughly Tested
    details: 76+ tests including unit, property-based (fast-check), and E2E (Playwright). 80% code coverage enforced.
---

<div style="text-align: center; margin-top: 2rem;">

## Quick Install

</div>

```bash
npx macos-ui init
npx macos-ui add window dock menu-bar desktop-icon
```
