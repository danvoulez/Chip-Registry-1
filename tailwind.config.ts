import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        'surface-hover': 'var(--bg-surface-hover)',
        border: 'var(--border-proof)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        verify: 'var(--accent-verify)',
        proof: 'var(--accent-proof)',
        warn: 'var(--accent-warn)',
        fail: 'var(--accent-fail)'
      },
      borderRadius: {
        card: '14px',
        panel: '16px',
        button: '12px',
        pill: '999px'
      },
      boxShadow: {
        surface: '0 8px 30px rgba(0,0,0,0.45)',
        hover: '0 10px 36px rgba(0,0,0,0.55)'
      },
      fontFamily: {
        ui: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Roboto Mono', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
