/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mocha: {
          DEFAULT: '#6B4F3A',
          dark: '#523B2A',
          light: '#85644C',
        },
        sage: {
          DEFAULT: '#7A8B5B',
          dark: '#627147',
          light: '#94A573',
          subtle: '#E8EFE2',
        },
        beige: {
          DEFAULT: '#D8B88C',
          dark: '#C29F71',
          light: '#EED9BD',
          subtle: '#FAF4EC',
        },
        cream: {
          DEFAULT: '#F7F1E3',
          dark: '#EFE5CE',
          light: '#FCFAF5',
        },
        charcoal: {
          DEFAULT: '#3A3A3A',
          light: '#5A5A5A',
          dark: '#222222',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(107, 79, 58, 0.08)',
        'warm-md': '0 8px 24px -4px rgba(107, 79, 58, 0.12)',
        'warm-lg': '0 16px 36px -6px rgba(107, 79, 58, 0.16)',
      },
    },
  },
  plugins: [],
}
