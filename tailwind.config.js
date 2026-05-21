/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFBF0',
        // Bright, saturated accent palette
        rose:       '#FF2D78',
        periwinkle: '#4D7FFF',
        sage:       '#00C896',
        marigold:   '#FF9500',
        plum:       '#9B3FE8',
        coral:      '#FF4B4B',
        sky:        '#00AAFF',
        lemon:      '#FFE030',
        // Section tint backgrounds
        blush:      '#FFE0EE',
        lavender:   '#EDE0FF',
        mint:       '#CCFFE8',
        sunny:      '#FFF5B0',
        peach:      '#FFE8CC',
      },
      fontFamily: {
        display: ['"Boogaloo"', 'cursive'],
        round:   ['"Nunito"', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem',  { lineHeight: '1' }],
        '9xl':  ['8rem',   { lineHeight: '1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.07)',
        card: '0 8px 30px rgba(0,0,0,0.09)',
        pop:  '0 14px 40px rgba(0,0,0,0.14)',
      },
      animation: {
        float:        'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 2.8s ease-in-out infinite',
        'bounce-soft':'bounceSoft 2s ease-in-out infinite',
        wiggle:       'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        bounceSoft: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-7px)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-4deg)' },
          '50%':     { transform: 'rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
}
