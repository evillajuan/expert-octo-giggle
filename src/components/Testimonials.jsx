import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Sarah M.',
    kid: 'Mom of Lily, age 5',
    text: 'Lily burst into happy tears when she saw herself as the hero! Best birthday gift ever. She asks us to read it every single night.',
    avatar: '👩',
    rating: 5,
    color: 'bg-blush',
  },
  {
    name: 'James K.',
    kid: 'Dad of Noah, age 7',
    text: "Noah couldn't believe he was a real superhero in a book! He's shown it to every kid in his class. The quality is absolutely stunning.",
    avatar: '👨',
    rating: 5,
    color: 'bg-sky',
  },
  {
    name: 'Priya R.',
    kid: 'Mom of twins, ages 4',
    text: 'I made one for each twin with different adventures. They love comparing their stories. Such a creative and thoughtful gift idea!',
    avatar: '👩‍🦱',
    rating: 5,
    color: 'bg-lavender',
  },
  {
    name: 'Tom & Amy W.',
    kid: 'Parents of Zoe, age 6',
    text: 'The customization options are incredible. We matched her exact skin tone and hair — she looked in the mirror and then at the book and giggled for 10 minutes.',
    avatar: '👨‍👩',
    rating: 5,
    color: 'bg-mint',
  },
]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={14} className="fill-marigold text-marigold" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="inline-block bg-sunny rounded-full px-4 py-1 font-round font-semibold text-sm text-[#8B6E5A] mb-4">
            💛 Real families, real magic
          </span>
        </div>
        <h2 className="section-title">Parents Love It</h2>
        <p className="section-subtitle">Join thousands of families creating memories that last a lifetime.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`${r.color} rounded-4xl p-5 flex flex-col`}>
              <Stars n={r.rating} />
              <p className="font-round text-sm text-[#4A3728] leading-relaxed mt-3 flex-1 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/50">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-soft">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-round font-bold text-sm text-[#4A3728]">{r.name}</div>
                  <div className="font-round text-xs text-[#8B6E5A]">{r.kid}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { icon: '🔒', label: 'Secure Checkout' },
            { icon: '🚚', label: 'Free Shipping $50+' },
            { icon: '💝', label: '100% Satisfaction' },
            { icon: '🎨', label: 'Premium Quality' },
            { icon: '⚡', label: 'Fast Printing' },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-soft">
              <span className="text-xl">{b.icon}</span>
              <span className="font-round font-semibold text-sm text-[#8B6E5A]">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
