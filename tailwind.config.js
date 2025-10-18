/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
        'creepster': ['Creepster', 'cursive'],
      },
      colors: {
        'sanjeevan-purple': '#6B46C1',
        'sanjeevan-dark-purple': '#553C9A',
        'sanjeevan-blue': '#3B82F6',
        'sanjeevan-green': '#10B981',
        'sanjeevan-orange': '#F59E0B',
        'sanjeevan-red': '#EF4444',
        'sanjeevan-teal': '#14B8A6',
      },
      backgroundImage: {
        'dots': 'radial-gradient(circle, #000000 1px, transparent 1px)',
      },
      backgroundSize: {
        'dots': '20px 20px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
