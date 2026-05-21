import { useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react'

const BOOKS = [
  {
    id: 1,
    title: 'The Magic Forest Adventure',
    ages: '3–6',
    price: 24.99,
    rating: 4.9,
    reviews: 312,
    emoji: '🌲',
    bg: 'from-[#C8F5E4] to-[#72D4A8]',
    badge: 'Bestseller',
    badgeColor: 'bg-rose',
    desc: 'Journey through an enchanted forest filled with talking animals and sparkling magic.',
  },
  {
    id: 2,
    title: 'My Space Explorer Journey',
    ages: '4–8',
    price: 27.99,
    rating: 4.8,
    reviews: 204,
    emoji: '🚀',
    bg: 'from-[#D8ECFF] to-[#7EB2F0]',
    badge: 'New',
    badgeColor: 'bg-periwinkle',
    desc: 'Blast off to the stars, meet alien friends, and discover new galaxies!',
  },
  {
    id: 3,
    title: 'Under the Sea Kingdom',
    ages: '3–6',
    price: 24.99,
    rating: 4.9,
    reviews: 189,
    emoji: '🐠',
    bg: 'from-[#C8EDFF] to-[#7CC8F5]',
    badge: null,
    badgeColor: '',
    desc: 'Dive deep into a magical ocean world with mermaids, sea horses, and treasure!',
  },
  {
    id: 4,
    title: 'Superhero Academy',
    ages: '5–9',
    price: 27.99,
    rating: 4.7,
    reviews: 275,
    emoji: '🦸',
    bg: 'from-[#FFEEDD] to-[#FFAA66]',
    badge: 'Popular',
    badgeColor: 'bg-marigold',
    desc: "Train at the world's most amazing superhero school and save the day!",
  },
  {
    id: 5,
    title: 'Bedtime on Bunny Farm',
    ages: '2–5',
    price: 22.99,
    rating: 5.0,
    reviews: 421,
    emoji: '🐰',
    bg: 'from-[#FFD8EE] to-[#FF8FB5]',
    badge: 'Bestseller',
    badgeColor: 'bg-rose',
    desc: 'A cozy bedtime story about friendship and sweet dreams.',
  },
  {
    id: 6,
    title: 'Princess of the Rainbow',
    ages: '3–7',
    price: 24.99,
    rating: 4.8,
    reviews: 156,
    emoji: '🌈',
    bg: 'from-[#F0E8FF] to-[#B899D4]',
    badge: null,
    badgeColor: '',
    desc: 'A dazzling tale of a rainbow hero who brings color and joy to the world.',
  },
  {
    id: 7,
    title: 'Dinosaur Detective',
    ages: '4–8',
    price: 27.99,
    rating: 4.9,
    reviews: 143,
    emoji: '🦕',
    bg: 'from-[#D4FFE9] to-[#72D4A8]',
    badge: 'New',
    badgeColor: 'bg-sage',
    desc: 'Solve mysteries with your dino friends in this prehistoric adventure!',
  },
  {
    id: 8,
    title: 'The Kindness Fairy',
    ages: '3–6',
    price: 24.99,
    rating: 5.0,
    reviews: 368,
    emoji: '🧚',
    bg: 'from-[#FFF8CC] to-[#FFAA66]',
    badge: 'Award Winner',
    badgeColor: 'bg-marigold',
    desc: 'A heartwarming story about spreading kindness, one magical act at a time.',
  },
]

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={13}
          className={i <= Math.floor(rating) ? 'fill-marigold text-marigold' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}

export default function Shop({ onAddToCart }) {
  const [added, setAdded] = useState({})

  function handleAdd(book) {
    onAddToCart({ id: book.id, title: book.title, price: book.price, format: 'Hardcover', type: 'ready' })
    setAdded(prev => ({ ...prev, [book.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [book.id]: false })), 2000)
  }

  return (
    <section id="shop" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <span className="section-pill bg-periwinkle">📚 Ready to go</span>
        </div>
        <h2 className="section-title">Browse Our Books</h2>
        <p className="section-subtitle">
          Beautiful ready-made stories — each one can also be personalized with your child's name!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOOKS.map(book => (
            <div key={book.id}
              className="bg-white rounded-4xl shadow-card overflow-hidden hover:shadow-pop hover:-translate-y-1.5 transition-all duration-200 flex flex-col"
            >
              {/* Cover */}
              <div className={`relative bg-gradient-to-br ${book.bg} h-48 flex items-center justify-center`}>
                <span className="text-8xl animate-float" style={{ animationDelay: `${book.id * 0.3}s` }}>
                  {book.emoji}
                </span>
                {book.badge && (
                  <span className={`absolute top-3 right-3 ${book.badgeColor} text-white font-round font-bold text-xs px-3 py-1 rounded-full shadow-soft`}>
                    {book.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-round font-bold text-[#7A5A40]">
                  Ages {book.ages}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-round font-bold text-[#2C1A0E] text-sm leading-tight mb-1">{book.title}</h3>
                <p className="font-round text-xs text-[#7A5A40] mb-3 flex-1 leading-relaxed">{book.desc}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Stars rating={book.rating} />
                  <span className="font-round text-xs text-[#7A5A40]">{book.rating} ({book.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl text-rose">${book.price}</span>
                  <button
                    onClick={() => handleAdd(book)}
                    className={`flex items-center gap-1.5 font-round font-bold text-xs py-2 px-3 rounded-2xl transition-all duration-200 ${
                      added[book.id]
                        ? 'bg-sage text-white'
                        : 'bg-rose text-white hover:brightness-110 hover:-translate-y-0.5 hover:shadow-soft'
                    }`}
                  >
                    {added[book.id] ? <>✓ Added!</> : <><ShoppingCart size={12} /> Add to Cart</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personalize CTA */}
        <div className="mt-14 bg-gradient-to-r from-blush to-lavender rounded-4xl p-10 text-center shadow-card">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="font-display text-4xl text-[#2C1A0E] mb-3">Want it personalized?</h3>
          <p className="font-round font-bold text-[#7A5A40] mb-6 max-w-md mx-auto text-lg">
            Any book can be customized with your child's name and character. Just click Create!
          </p>
          <a href="#create" className="btn-primary text-xl py-4 px-10">
            <span>✨</span> Personalize Any Book
          </a>
        </div>
      </div>
    </section>
  )
}
