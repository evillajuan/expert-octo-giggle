import CharacterSVG from './CharacterSVG'

const CHARACTERS = [
  { skinTone: 'fair',   hairColor: 'blonde', outfitColor: '#FF2D78', hairStyle: 'curly'  },
  { skinTone: 'medium', hairColor: 'brown',  outfitColor: '#4D7FFF', hairStyle: 'wavy'   },
  { skinTone: 'dark',   hairColor: 'black',  outfitColor: '#00C896', hairStyle: 'spiky'  },
]

function Deco({ style, children }) {
  return (
    <div className="absolute pointer-events-none select-none animate-float" style={style}>
      {children}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-cream">

      {/* Big blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blush  rounded-full opacity-50 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-lavender rounded-full opacity-50 blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sunny rounded-full opacity-30 blur-3xl" />

      {/* Floating decorations */}
      <Deco style={{ top: '12%', left:  '6%',  fontSize: '2.5rem', animationDelay: '0s'   }}>⭐</Deco>
      <Deco style={{ top: '18%', right: '10%', fontSize: '2.8rem', animationDelay: '1s'   }}>🌟</Deco>
      <Deco style={{ top: '60%', left:  '4%',  fontSize: '2rem',   animationDelay: '2s'   }}>✨</Deco>
      <Deco style={{ bottom:'18%', right:'7%', fontSize: '2.5rem', animationDelay: '0.5s' }}>🌈</Deco>
      <Deco style={{ top: '40%', right: '4%',  fontSize: '2rem',   animationDelay: '1.5s' }}>🦋</Deco>
      <Deco style={{ bottom:'28%', left:'8%',  fontSize: '2.2rem', animationDelay: '2.5s' }}>🌸</Deco>
      <Deco style={{ top:  '8%',  left: '42%', fontSize: '1.6rem', animationDelay: '0.8s' }}>💫</Deco>
      <Deco style={{ bottom:'10%',left: '36%', fontSize: '2rem',   animationDelay: '3s'   }}>🎈</Deco>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: text ── */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-soft mb-6">
              <span className="text-xl">📚</span>
              <span className="font-round font-bold text-sm text-[#7A5A40]">
                The most magical gift for your little one
              </span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-[#2C1A0E] leading-[1.05] mb-6">
              Every&nbsp;Kid
              <br />
              <span className="gradient-text">Deserves to be</span>
              <br />
              the&nbsp;
              <span className="relative inline-block">
                Hero
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M 4 8 Q 100 2 196 8" stroke="#FF2D78" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>! 🌟
            </h1>

            <p className="font-round font-bold text-xl text-[#7A5A40] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Build a one-of-a-kind storybook starring your child.
              Customize their look, pick the adventure, and watch
              their face light up when they see{' '}
              <strong className="text-rose">themselves</strong> as the hero!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#create" className="btn-primary text-xl py-4 px-10">
                <span>✨</span> Start Creating — Free!
              </a>
              <a href="#shop" className="btn-secondary text-xl py-4 px-10">
                <span>📖</span> Browse Books
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 justify-center lg:justify-start">
              {[
                { num: '50,000+', label: 'Happy Families' },
                { num: '200+',    label: 'Story Options'  },
                { num: '4.9 ⭐',  label: 'Average Rating' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl text-rose">{s.num}</div>
                  <div className="font-round font-bold text-sm text-[#7A5A40]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: characters on open book ── */}
          <div className="relative flex justify-center items-end gap-2 h-80 lg:h-96">
            {/* Open book */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="relative w-80 h-52">
                <div className="absolute left-0 top-0 w-[47%] h-full bg-gradient-to-br from-sunny to-[#FFE87A] rounded-l-2xl shadow-card border border-yellow-200 flex items-center justify-center">
                  <div className="text-center px-3">
                    <div className="text-5xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>🏰</div>
                    <div className="font-round font-bold text-xs text-[#7A5A40] leading-tight">
                      Once upon a time in a land full of magic…
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-gradient-to-b from-rose to-periwinkle z-10 shadow-md" />
                <div className="absolute right-0 top-0 w-[47%] h-full bg-gradient-to-bl from-[#D0E8FF] to-[#B8D8FF] rounded-r-2xl shadow-card border border-blue-200 flex items-center justify-center">
                  <div className="text-center px-3">
                    <div className="text-5xl mb-2 animate-float" style={{ animationDelay: '1.2s' }}>🌟</div>
                    <div className="font-round font-bold text-xs text-[#7A5A40] leading-tight">
                      …a brave hero set off on an amazing adventure!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Characters */}
            {CHARACTERS.map((char, i) => {
              const sizes   = ['w-24 h-32', 'w-36 h-48', 'w-24 h-32']
              const delays  = ['0s', '0.8s', '1.6s']
              const offsets = ['-translate-y-2', 'translate-y-0', '-translate-y-4']
              const zIndexes = [10, 20, 10]
              return (
                <div key={i}
                  className={`relative ${sizes[i]} animate-float ${offsets[i]}`}
                  style={{ animationDelay: delays[i], zIndex: zIndexes[i] }}
                >
                  <CharacterSVG {...char} />
                  {i === 1 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-3 py-1.5 shadow-soft whitespace-nowrap">
                      <span className="font-round font-bold text-sm text-rose">That's me! 🎉</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-soft">
          <span className="font-round font-bold text-xs text-[#C4A882]">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M 5 7 L 10 13 L 15 7" stroke="#C4A882" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
