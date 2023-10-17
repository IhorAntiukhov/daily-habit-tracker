/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#3A4874',
      'secondary': '#91CA62',
      'accent': '#478077',
      'neutral': {
        1: '#FAFFF5',
        2: '#C8CCC4',
        3: '#A2A69F'
      }
    },
    animation: {
      'open-nav-drawer': 'openNavDrawer 0.3s ease-out 0s 1 normal forwards',
      'close-nav-drawer': 'closeNavDrawer 0.3s ease-out 0s 1 normal forwards',
      'show-darkening-area': 'showDarkeningArea 0.3s ease-out 0s 1 normal forwards',
      'hide-darkening-area': 'hideDarkeningArea 0.3s ease-out 0s 1 normal forwards'
    },
    extend: {
      keyframes: {
        'openNavDrawer': {
          '0%': {
            transform: 'translate(-100%)'
          },
          '100%': {
            transform: 'translate(0%)'
          }
        },
        'closeNavDrawer': {
          '0%': {
            transform: 'translate(0%)'
          },
          '100%': {
            transform: 'translate(-100%)',
            display: 'none'
          }
        },
        'showDarkeningArea': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'hideDarkeningArea': {
          '0%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        }
      }
    },
  },
  plugins: [],
}

