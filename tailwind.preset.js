/**
 * Tailwind CSS preset for macOS UI components
 * 
 * Usage:
 * In your tailwind.config.js:
 * 
 * module.exports = {
 *   presets: [require('@sylonik/macos-ui/tailwind.preset')],
 *   // ... your config
 * }
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        macos: {
          background: 'var(--macos-background)',
          foreground: 'var(--macos-foreground)',
          primary: 'var(--macos-primary)',
          secondary: 'var(--macos-secondary)',
          accent: 'var(--macos-accent)',
          muted: 'var(--macos-muted)',
          border: 'var(--macos-border)',
          window: {
            background: 'var(--macos-windowBackground)',
            border: 'var(--macos-windowBorder)',
          },
          dock: {
            background: 'var(--macos-dockBackground)',
          },
          menubar: {
            background: 'var(--macos-menuBarBackground)',
          },
        },
      },
      borderRadius: {
        'macos-sm': 'var(--macos-radius-sm)',
        'macos-md': 'var(--macos-radius-md)',
        'macos-lg': 'var(--macos-radius-lg)',
        'macos-window': 'var(--macos-radius-window)',
        'macos-dock': 'var(--macos-radius-dock)',
      },
      backdropBlur: {
        'macos-window': 'var(--macos-blur-window)',
        'macos-dock': 'var(--macos-blur-dock)',
        'macos-menubar': 'var(--macos-blur-menuBar)',
      },
      boxShadow: {
        'macos-window': 'var(--macos-shadow-window)',
        'macos-window-active': 'var(--macos-shadow-windowActive)',
        'macos-dock': 'var(--macos-shadow-dock)',
      },
      keyframes: {
        // Window animations
        'window-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'window-disappear': {
          '0%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
          },
        },
        'window-minimize': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.1) translateY(100vh)',
          },
        },
        'window-restore': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.1) translateY(100vh)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        // Dock animations
        'dock-bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'dock-item-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'dock-magnify': {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(1.5)',
          },
        },
        // Menu animations
        'menu-slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'menu-slide-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
        // Desktop icon animations
        'icon-bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        'icon-wiggle': {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(-2deg)',
          },
          '75%': {
            transform: 'rotate(2deg)',
          },
        },
      },
      animation: {
        // Window animations
        'window-appear': 'window-appear 0.2s ease-out',
        'window-disappear': 'window-disappear 0.2s ease-in',
        'window-minimize': 'window-minimize 0.3s ease-in',
        'window-restore': 'window-restore 0.3s ease-out',
        // Dock animations
        'dock-bounce': 'dock-bounce 0.5s ease-in-out',
        'dock-item-appear': 'dock-item-appear 0.2s ease-out',
        'dock-magnify': 'dock-magnify 0.2s ease-out forwards',
        // Menu animations
        'menu-slide-down': 'menu-slide-down 0.15s ease-out',
        'menu-slide-up': 'menu-slide-up 0.15s ease-in',
        // Desktop icon animations
        'icon-bounce': 'icon-bounce 0.3s ease-in-out',
        'icon-wiggle': 'icon-wiggle 0.3s ease-in-out',
      },
      spacing: {
        'window-padding': '1rem',
        'dock-padding': '0.5rem',
        'menubar-height': '1.75rem',
      },
      transitionTimingFunction: {
        'macos-ease': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'macos-ease-in': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'macos-ease-out': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'macos-ease-in-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
