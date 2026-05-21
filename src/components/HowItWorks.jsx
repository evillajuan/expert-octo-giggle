const STEPS = [
  {
    emoji: '🎨',
    title: 'Design Your Hero',
    desc: 'Pick skin tone, hair, clothes color, and give your character a name. Watch them come to life!',
    color: 'bg-blush',
    num: '1',
  },
  {
    emoji: '📖',
    title: 'Choose the Story',
    desc: 'From enchanted forests to outer space — pick a theme and customize the adventure details.',
    color: 'bg-sky',
    num: '2',
  },
  {
    emoji: '✨',
    title: 'Preview Your Book',
    desc: 'See a full preview of your personalized masterpiece before ordering.',
    color: 'bg-lavender',
    num: '3',
  },
  {
    emoji: '📦',
    title: 'Print & Deliver',
    desc: 'We print your book with premium quality and ship it right to your door — or download instantly!',
    color: 'bg-mint',
    num: '4',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="inline-block bg-sunny rounded-full px-4 py-1 font-round font-semibold text-sm text-[#8B6E5A] mb-4">
            🪄 Simple as magic
          </span>
        </div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Create a book your child will treasure forever — in just a few minutes!
        </p>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blush via-lavender to-mint rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative z-10 mb-4">
                  <div className={`w-16 h-16 ${step.color} rounded-3xl flex items-center justify-center shadow-soft text-4xl`}>
                    {step.emoji}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose text-white text-xs font-bold rounded-full flex items-center justify-center font-round shadow-soft">
                    {step.num}
                  </div>
                </div>

                <h3 className="font-display text-xl mb-2 text-[#4A3728]">{step.title}</h3>
                <p className="font-round text-sm text-[#8B6E5A] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a href="#create" className="btn-primary text-base inline-flex items-center gap-2">
            <span>🚀</span>
            <span>Start Your Story</span>
          </a>
        </div>
      </div>
    </section>
  )
}
