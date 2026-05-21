const STEPS = [
  {
    emoji: '🎨',
    title: 'Design Your Hero',
    desc:  'Pick skin tone, hair style, outfit color, and give your character a name. Watch them come to life!',
    bg:    'bg-blush',
    ring:  'ring-rose',
    num:   '1',
  },
  {
    emoji: '📖',
    title: 'Choose the Story',
    desc:  'From enchanted forests to outer space — pick a theme and customize the adventure.',
    bg:    'bg-[#D0E8FF]',
    ring:  'ring-periwinkle',
    num:   '2',
  },
  {
    emoji: '✨',
    title: 'Preview Your Book',
    desc:  'See a full preview of your personalized masterpiece before ordering.',
    bg:    'bg-lavender',
    ring:  'ring-plum',
    num:   '3',
  },
  {
    emoji: '📦',
    title: 'Print & Deliver',
    desc:  'We print your book in premium quality and ship it right to your door — or download instantly!',
    bg:    'bg-mint',
    ring:  'ring-sage',
    num:   '4',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <span className="section-pill bg-marigold">🪄 Simple as magic</span>
        </div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Create a book your child will treasure forever — in just a few minutes!
        </p>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-1.5 bg-gradient-to-r from-rose via-plum to-sage rounded-full opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="relative z-10 mb-5">
                  <div className={`w-20 h-20 ${step.bg} rounded-4xl flex items-center justify-center text-5xl
                                   shadow-card group-hover:shadow-pop group-hover:-translate-y-1 transition-all duration-200`}>
                    {step.emoji}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose text-white font-display text-lg
                                   rounded-full flex items-center justify-center shadow-soft">
                    {step.num}
                  </div>
                </div>
                <h3 className="font-display text-2xl mb-2 text-[#2C1A0E]">{step.title}</h3>
                <p className="font-round font-bold text-sm text-[#7A5A40] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="#create" className="btn-primary text-xl py-4 px-10">
            <span>🚀</span> Start Your Story
          </a>
        </div>
      </div>
    </section>
  )
}
