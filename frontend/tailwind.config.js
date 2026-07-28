/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        sage: {
          DEFAULT: '#6B8E6E',
          dark: '#557358',
          light: '#8DAA8F',
          50: '#F4F7F4',
          100: '#E6ECE6',
        },
        olive: {
          DEFAULT: '#A7B98A',
          dark: '#8C9E6E',
          light: '#C1CFAB',
        },
        terracotta: {
          DEFAULT: '#C47E5A',
          dark: '#AB6643',
          light: '#D89B7A',
          50: '#FDF7F4',
        },
        beige: {
          DEFAULT: '#E7D8C1',
          dark: '#D4C0A5',
          light: '#F3EBDD',
        },
        cream: {
          DEFAULT: '#F8F6F0',
          card: '#FAF8F3',
          dark: '#EFEBE0',
        },
        earth: {
          DEFAULT: '#2E2823',
          muted: '#5C5248',
          light: '#857769',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(46, 40, 35, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(46, 40, 35, 0.09), 0 4px 8px -2px rgba(46, 40, 35, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(46, 40, 35, 0.12), 0 6px 12px -3px rgba(46, 40, 35, 0.06)',
        'inner-warm': 'inset 0 2px 4px 0 rgba(46, 40, 35, 0.05)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.05)' },
        }
      }

    },
  },
  plugins: [],
}
