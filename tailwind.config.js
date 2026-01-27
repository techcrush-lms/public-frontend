/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-light':
          'linear-gradient(57deg, #edeefc 50%, #e7fdf2 91.95%, #f7f8f8 91.95%)',
      },
      colors: {
        black: {
          1: '#00214F',
          2: '#344054',
        },
        primary: {
          main: '#FE4A55',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          faded: '#9a9df0',
          grad: {
            main: 'linear-gradient(57deg, #EDEEFC 50%, #E7FDF2 91.95%, #F7F8F8 91.95%))',
          },
          light: 'rgba(64, 69, 225, 0.04)',
        },
        secondary: {
          main: '#0D2352',
          'main-hover': '#163B8D',
          'main-active': '#112D6A',
        },
        muted: '#C7C7C7',
        neutral: 'var(--Neutral-color-600, #686976)',
        'neutral-2': 'var(--Neutral-color-50, #F7F8F8)',
        'neutral-3': 'var(--Neutral-color-200, #D4D5D8)',
        'neutral-4': 'var(--Neutral-Bg-color, #FAFAFB)',
        'neutral-5': 'var(--Neutral-light-grey, #F1F1F4)',
      },
    },
  },
  plugins: [require('flowbite')],
};
