/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background-color)',
        surface: '#ffffff',
        foreground: 'var(--text-color)',
        muted: 'var(--muted-color)',
        border: 'var(--border-color)',
        accent: {
          DEFAULT: 'var(--primary-color)',
          foreground: '#ffffff',
          hover: 'var(--secondary-color)',
        },
        danger: {
          DEFAULT: 'var(--danger-color)',
          foreground: '#ffffff',
          subtle: '#f5f5f5',
        },
        success: {
          DEFAULT: 'var(--success-color)',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Be Vietnam Pro',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        panel: '0 4px 12px -4px rgb(0 0 0 / 0.08)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
  plugins: [],
};
