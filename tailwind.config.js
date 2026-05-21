/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFEF5',
        blush: '#FFD6E0',
        lavender: '#E8D5F5',
        mint: '#C8F0C0',
        sky: '#C8E6F5',
        sunny: '#FFF3B0',
        peach: '#FFE5CC',
        lilac: '#DDD6F3',
        rose: '#FF6B9D',
        periwinkle: '#7B9FF0',
        sage: '#72C472',
        marigold: '#FFB347',
        coral: '#FF7675',
        plum: '#A855C8',
      },
      fontFamily: {
        round: ['Nunito', 'sans-serif'],
        display: ['"Fredoka One"', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.06)',
        card: '0 8px 30px rgba(0,0,0,0.08)',
        pop: '0 12px 40px rgba(0,0,0,0.12)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
