# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-03-11

### Added

- Official npm publication as `@sylonik/macos-ui`
- Comprehensive VitePress documentation site with interactive playground
- GitHub Pages deployment for documentation
- Automated CI/CD pipelines (testing, publishing, docs deployment)
- Full API reference documentation for all components
- Interactive component playground with live code editing
- Getting started guides (installation, quick start, configuration)
- Theming guide with CSS variable customization
- CLI usage documentation
- Accessibility documentation
- Example pages (dashboard layout, app launcher)
- GitHub issue templates and PR template
- CONTRIBUTING.md with developer guidelines
- CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
- SECURITY.md with vulnerability reporting process
- CHANGELOG.md following Keep a Changelog format

### Changed

- Updated package.json with complete npm publishing metadata
- Improved package exports map for better tree-shaking
- Enhanced README.md with badges, feature showcase, and quick start
- Version bumped to 0.2.0

### Fixed

- Ensured all component exports include proper TypeScript declarations
- Corrected `"use client"` directive preservation in build output

## [0.1.0] - 2025-02-01

### Added

- Initial release
- **Window** component - Draggable, resizable windows with macOS-style traffic light buttons
- **WindowManagerProvider** - React context for managing multiple windows with z-index ordering
- **useWindowManager** hook - Programmatic window management (open, close, focus, minimize, maximize)
- **Dock** component - Application launcher bar with magnification effect
- **MenuBar** component - System-level navigation bar with dropdown menus and keyboard navigation
- **DesktopIcon** component - Clickable desktop application icons with selection states
- CLI tool (`npx macos-ui`) with `init`, `add`, and `diff` commands
- Component registry system for copy-paste distribution
- Tailwind CSS preset with macOS design tokens (colors, radii, blur, shadows, animations)
- CSS theme system with light/dark mode support via custom properties
- Theme utilities (`applyTheme`, `getTheme`, `serializeTheme`, `deserializeTheme`)
- Utility types (`ComponentProps`, `PolymorphicComponentProps`, `DeepPartial`, etc.)
- `cn()` utility for Tailwind class merging
- 76 passing tests (unit, property-based with fast-check, E2E with Playwright)
- 80% code coverage thresholds enforced
- ESLint + Prettier configuration
- Vite library build with ES module output and source maps
- Next.js App Router compatibility via `"use client"` directive preservation

[Unreleased]: https://github.com/Sylonik/macos-ui/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Sylonik/macos-ui/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Sylonik/macos-ui/releases/tag/v0.1.0
