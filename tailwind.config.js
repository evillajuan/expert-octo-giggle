/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:      '#FFFEF5',
        // Pastel accent palette
        rose:       '#FF8FB5',
        periwinkle: '#7EB2F0',
        sage:       '#72D4A8',
        marigold:   '#FFAA66',
        plum:       '#B899D4',
        coral:      '#FF9898',
        sky:        '#7CC8F5',
        lemon:      '#FFE566',
        // Section tint backgrounds
        blush:      '#FFF0F5',
        lavender:   '#F5EEFF',
        mint:       '#E8FAF2',
        sunny:      '#FFFDE0',
        peach:      '#FFF4EA',
      },
      fontFamily: {
        display: ['"Boogaloo"', 'cursive'],
        round:   ['"Nunito"', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '1' }],
        '9xl':  ['8rem',  { lineHeight: '1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.07)',
        card: '0 8px 30px rgba(0,0,0,0.08)',
        pop:  '0 14px 40px rgba(0,0,0,0.12)',
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
