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
        background: '#fafafa',
        surface: '#ffffff',
        foreground: '#171717',
        muted: '#737373',
        border: '#e5e5e5',
        accent: {
          DEFAULT: '#171717',
          foreground: '#ffffff',
          hover: '#404040',
        },
        danger: {
          DEFAULT: '#525252',
          foreground: '#ffffff',
          subtle: '#f5f5f5',
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
