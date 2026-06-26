// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 30%, 12%)', // dark background
        accent: 'hsl(197, 80%, 55%)', // teal accent
        glass: 'rgba(255, 255, 255, 0.08)',
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        xl: '1rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        bounceIn: 'bounceIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
