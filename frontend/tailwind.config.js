/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global Artful Stitches Color System
        cream: {
          DEFAULT: '#FAF8F3',
          card: '#FAF8F3',
          dark: '#F0ECE1',
        },
        ivory: {
          DEFAULT: '#F5F1E8',
          dark: '#EBE5D8',
        },
        beige: {
          DEFAULT: '#E8DDCC',
          dark: '#D8C7B0',
          light: '#F3EBDD',
        },
        sand: {
          DEFAULT: '#D8C7B0',
          dark: '#C7B399',
        },
        sage: {
          DEFAULT: '#6B705C',
          dark: '#556052',
          soft: '#A5A58D',
          light: '#A5A58D',
          50: '#F4F6F3',
          100: '#E6EAE4',
        },
        terracotta: {
          DEFAULT: '#C47F5A',
          dark: '#A96845',
          light: '#D99673',
          50: '#FDF7F4',
        },
        rose: {
          DEFAULT: '#D9A89E',
          soft: '#E8C5BE',
        },
        peach: {
          DEFAULT: '#E6B8A2',
          soft: '#F2D3C4',
        },
        gold: {
          DEFAULT: '#C9A45C',
          light: '#DFC07E',
        },
        earth: {
          DEFAULT: '#3F4335',
          dark: '#2A2E23',
          muted: '#777568',
        },
        charcoal: {
          DEFAULT: '#4A4A42',
          dark: '#33332D',
        },
        muted: {
          DEFAULT: '#777568',
          light: '#A09E93',
        },
        // Utility state colors
        success: '#6B705C',
        error: '#B65F5F',
        warning: '#C49A55',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(63, 67, 53, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(63, 67, 53, 0.09), 0 4px 8px -2px rgba(63, 67, 53, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(63, 67, 53, 0.12), 0 6px 12px -3px rgba(63, 67, 53, 0.06)',
        'inner-warm': 'inset 0 2px 4px 0 rgba(63, 67, 53, 0.05)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
