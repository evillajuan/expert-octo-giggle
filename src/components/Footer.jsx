import { useState } from 'react'
import { BookOpen, Heart } from 'lucide-react'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || null

const LINKS = {
  Shop: ['Ready Books', 'Custom Books', 'Gift Cards', 'Bundles'],
  Help: ['FAQ', 'Shipping Info', 'Returns', 'Contact Us'],
  About: ['Our Story', 'Blog', 'Press', 'Careers'],
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return

    if (!FORMSPREE_ID) {
      alert('Add your Formspree form ID to .env (VITE_FORMSPREE_ID) to enable the newsletter.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-2">
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-round font-bold text-white">You're in! Check your inbox for magic.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2 max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-full px-5 py-3 font-round text-[#4A3728] outline-none text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-rose font-round font-bold px-5 py-3 rounded-full hover:bg-sunny transition-colors text-sm whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? '…' : 'Subscribe ✨'}
        </button>
      </div>
      {status === 'error' && (
        <p className="font-round text-sm text-white/70 mt-2 text-center">Something went wrong — please try again.</p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#4A3728] text-white">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-rose to-periwinkle py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-4xl mb-3">💌</div>
          <h3 className="font-display text-3xl mb-2">Get Magical Ideas</h3>
          <p className="font-round text-white/80 mb-6 text-sm">
            Join our newsletter for reading tips, new book launches, and exclusive discounts!
          </p>
          <Newsletter />
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose to-periwinkle rounded-2xl flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="font-display text-2xl">
                Story<span className="text-rose">Magic</span>
              </span>
            </div>
            <p className="font-round text-sm text-white/60 leading-relaxed mb-4">
              Making every child the hero of their own story — one book at a time.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '🎵', '▶️'].map((icon, i) => (
                <button key={i} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors text-sm">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-lg mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="font-round text-sm text-white/60 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-round text-sm text-white/40">
            © 2025 StoryMagic. All rights reserved.
          </p>
          <p className="font-round text-sm text-white/40 flex items-center gap-1">
            Made with <Heart size={14} className="fill-rose text-rose" /> for little readers everywhere
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" className="font-round text-xs text-white/40 hover:text-white/70 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
