/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'mobile': {'max': '1024px'},
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      '200screen': { 'min': '200px', 'max': '600px' },
      '600screen': { 'min': '600px', 'max': '900px' },
      '900screen': { 'min': '900px', 'max': '1200px' },
      '1200screen': { 'min': '1200px'},
    },

  },
  plugins: [],
}
