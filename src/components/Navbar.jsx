import { useState } from 'react'
import { ShoppingCart, Menu, X, BookOpen } from 'lucide-react'

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home',         href: '#home'         },
    { label: 'How It Works', href: '#how-it-works'  },
    { label: 'Create',       href: '#create'        },
    { label: 'Shop',         href: '#shop'          },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-rose to-periwinkle rounded-2xl flex items-center justify-center shadow-soft group-hover:shadow-pop group-hover:scale-105 transition-all duration-200">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-display text-2xl text-[#2C1A0E]">
              Story<span className="text-rose">Magic</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="font-round font-bold text-[#7A5A40] hover:text-rose transition-colors duration-150 text-[15px]">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button onClick={onCartClick}
              className="relative p-2 rounded-2xl hover:bg-blush transition-colors duration-150">
              <ShoppingCart size={22} className="text-[#7A5A40]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a href="#create" className="hidden md:flex btn-primary text-base py-2 px-5">
              ✨ Create Your Book
            </a>
            <button onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-2xl hover:bg-blush transition-colors">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-blush/50">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 px-2 font-round font-bold text-[#7A5A40] hover:text-rose transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#create" className="btn-primary justify-center mt-3">
              ✨ Create Your Book
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
