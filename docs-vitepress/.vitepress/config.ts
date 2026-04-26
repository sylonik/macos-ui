import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@sylonikse/macos-ui',
  description: 'Authentic macOS-style React components for the web',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0071e3' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '@sylonikse/macos-ui' }],
    ['meta', { property: 'og:description', content: 'Authentic macOS-style React components for the web' }],
    ['meta', { property: 'og:url', content: 'https://ui.sylonik.se/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Components', link: '/components/window' },
      { text: 'Guides', link: '/guides/theming' },
      { text: 'API', link: '/api/components' },
      {
        text: '0.2.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' },
        ]
      }
    ],
    
    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started/' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
            { text: 'Configuration', link: '/getting-started/configuration' },
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Window', link: '/components/window' },
            { text: 'Window Manager', link: '/components/window-manager' },
            { text: 'Dock', link: '/components/dock' },
            { text: 'Menu Bar', link: '/components/menu-bar' },
            { text: 'Desktop Icon', link: '/components/desktop-icon' },
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Theming', link: '/guides/theming' },
            { text: 'CLI Usage', link: '/guides/cli-usage' },
            { text: 'Accessibility', link: '/guides/accessibility' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Components', link: '/api/components' },
            { text: 'Hooks', link: '/api/hooks' },
            { text: 'Utilities', link: '/api/utilities' },
            { text: 'Theme', link: '/api/theme' },
            { text: 'Types', link: '/api/types' },
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Dashboard', link: '/examples/dashboard' },
            { text: 'App Launcher', link: '/examples/app-launcher' },
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sylonik/macos-ui' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@sylonikse/macos-ui' },
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2026 Sylonik',
    },
    
    search: {
      provider: 'local',
    },
    
    editLink: {
      pattern: 'https://github.com/sylonik/macos-ui/edit/main/docs-vitepress/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
