/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1B2A4A',
        'light-blue': '#69B7E3',
        'electric-blue': '#7B4DFF',
        'neon-pink': '#FF2EC4',
        'gold': '#FFD700',
        'silver': '#C0C0C0',
        'menu-active': '#69B7E3',
        'menu-hover': '#1B2A4A'
      },
      animation: {
        'liquid': 'liquid 1.5s ease-in-out infinite',
      },
      keyframes: {
        liquid: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}
