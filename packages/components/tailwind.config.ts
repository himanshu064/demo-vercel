import { type Config } from 'tailwindcss';
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#F5F7FA',
          300: '#E5EDFF',
          500: '#0047FF1F',
          900: '#002993',
        },
        secondary: {
          500: '#FFA756',
        },
        muted: {
          300: '#E2E7EE',
          400: '#D5D9E1',
          500: '#CCCCCC',
          600: '#717D90',
          900: '#6C717E',
        },
        success: {
          400: '#20D152',
          500: '#00A32E',
          blue: {
            500: '#0066FF',
            700: '#0047FF',
          },
        },
        warning: {
          500: '#FF8E26',
          700: '#EE722D',
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
