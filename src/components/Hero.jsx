import CharacterSVG from './CharacterSVG'

const CHARACTERS = [
  { skinTone: 'fair', hairColor: 'blonde', outfitColor: '#FFA3C4', gender: 'girl' },
  { skinTone: 'medium', hairColor: 'brown', outfitColor: '#74B9FF', gender: 'boy' },
  { skinTone: 'dark', hairColor: 'black', outfitColor: '#95E1A0', gender: 'girl' },
]

function FloatingStar({ style, children }) {
  return (
    <div className="absolute pointer-events-none select-none text-2xl animate-float opacity-70" style={style}>
      {children}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-[#FFF0F8] to-[#FFFEF5]">
      {/* Background blobs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-blush rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-sky rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender rounded-full opacity-20 blur-3xl" />

      {/* Floating decorations */}
      <FloatingStar style={{ top: '12%', left: '8%', animationDelay: '0s' }}>⭐</FloatingStar>
      <FloatingStar style={{ top: '20%', right: '12%', animationDelay: '1s' }}>🌟</FloatingStar>
      <FloatingStar style={{ top: '60%', left: '5%', animationDelay: '2s' }}>✨</FloatingStar>
      <FloatingStar style={{ bottom: '20%', right: '8%', animationDelay: '0.5s' }}>🌈</FloatingStar>
      <FloatingStar style={{ top: '35%', right: '5%', animationDelay: '1.5s' }}>🦋</FloatingStar>
      <FloatingStar style={{ bottom: '30%', left: '10%', animationDelay: '2.5s' }}>🌸</FloatingStar>
      <FloatingStar style={{ top: '8%', left: '40%', animationDelay: '0.8s', fontSize: '1rem' }}>💫</FloatingStar>
      <FloatingStar style={{ bottom: '12%', left: '35%', animationDelay: '3s', fontSize: '1.5rem' }}>🎈</FloatingStar>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-soft mb-6">
              <span className="text-lg">📚</span>
              <span className="font-round font-semibold text-sm text-[#8B6E5A]">
                The most magical gift for your little one
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#4A3728] leading-tight mb-6">
              Every Child
              <br />
              <span className="gradient-text">Deserves to be</span>
              <br />
              the{' '}
              <span className="relative inline-block">
                Hero
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M 4 8 Q 100 2 196 8" stroke="#FF6B9D" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              ! 🌟
            </h1>

            <p className="font-round text-lg text-[#8B6E5A] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              Create a one-of-a-kind storybook starring your child. Customize their look,
              choose the adventure, and watch their eyes light up when they see
              <strong className="text-rose"> themselves</strong> as the hero!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#create" className="btn-primary text-base py-4 px-8 flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Start Creating — Free!</span>
              </a>
              <a href="#shop" className="btn-secondary text-base py-4 px-8 flex items-center justify-center gap-2">
                <span>📖</span>
                <span>Browse Ready Books</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              {[
                { num: '50,000+', label: 'Happy Families' },
                { num: '200+', label: 'Story Options' },
                { num: '4.9 ⭐', label: 'Average Rating' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl text-rose">{s.num}</div>
                  <div className="font-round text-sm text-[#8B6E5A]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — character showcase */}
          <div className="relative flex justify-center items-end gap-4 h-80 lg:h-96">
            {/* Big open book behind characters */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="relative w-80 h-52">
                {/* Book left page */}
                <div className="absolute left-0 top-0 w-36 h-full bg-gradient-to-br from-[#FFF3B0] to-[#FFFACD] rounded-l-2xl shadow-card border border-yellow-100 flex items-center justify-center">
                  <div className="text-center px-3">
                    <div className="text-4xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>🏰</div>
                    <div className="font-round text-xs text-[#8B6E5A] leading-tight">Once upon a time in a land of magic…</div>
                  </div>
                </div>
                {/* Book spine */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-full bg-gradient-to-b from-rose to-periwinkle z-10 shadow-md" />
                {/* Book right page */}
                <div className="absolute right-0 top-0 w-36 h-full bg-gradient-to-bl from-[#E8F4FD] to-[#EAF6FF] rounded-r-2xl shadow-card border border-blue-100 flex items-center justify-center">
                  <div className="text-center px-3">
                    <div className="text-4xl mb-2 animate-float" style={{ animationDelay: '1.2s' }}>🌟</div>
                    <div className="font-round text-xs text-[#8B6E5A] leading-tight">…a brave little hero went on an adventure!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Characters standing in front of book */}
            {CHARACTERS.map((char, i) => {
              const sizes = ['w-24 h-32', 'w-32 h-44', 'w-24 h-32']
              const delays = ['0s', '0.8s', '1.6s']
              const zIndexes = [10, 20, 10]
              const offsets = ['-translate-y-2', 'translate-y-0', '-translate-y-2']
              return (
                <div
                  key={i}
                  className={`relative ${sizes[i]} animate-float ${offsets[i]} z-${zIndexes[i]}`}
                  style={{ animationDelay: delays[i], zIndex: zIndexes[i] }}
                >
                  <CharacterSVG {...char} />
                  {i === 1 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-3 py-1 shadow-soft whitespace-nowrap">
                      <span className="font-round font-bold text-sm text-rose">That's me! 🎉</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-soft">
          <span className="font-round text-xs text-[#C4A882]">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M 5 7 L 10 13 L 15 7" stroke="#C4A882" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
