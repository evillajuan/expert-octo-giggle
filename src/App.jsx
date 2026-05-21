import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BookCreator from './components/BookCreator'
import Shop from './components/Shop'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import { ShoppingCart, X, ExternalLink } from 'lucide-react'

const STRIPE_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || null

function CartDrawer({ items, onRemove, onClose }) {
  const total = items.reduce((sum, i) => sum + i.price, 0)
  const freeShipping = total >= 50

  function handleCheckout() {
    if (STRIPE_LINK) {
      // Pass item count as a URL param so Stripe receipt looks right
      window.open(`${STRIPE_LINK}?prefilled_quantity=${items.length}`, '_blank')
    } else {
      alert('Add your Stripe Payment Link to .env (VITE_STRIPE_PAYMENT_LINK) to enable checkout.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-display text-2xl text-[#4A3728]">Your Cart 🛒</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-round text-[#8B6E5A]">Your cart is empty!</p>
              <button onClick={onClose} className="btn-primary mt-4 text-sm py-2.5 px-6">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-cream rounded-3xl p-4">
                  <div className="text-3xl">
                    {item.type === 'custom' ? '✨' : '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-round font-bold text-sm text-[#4A3728] leading-tight">{item.title}</p>
                    <p className="font-round text-xs text-[#8B6E5A]">{item.format}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-display text-lg text-rose">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => onRemove(i)}
                      className="text-gray-300 hover:text-rose transition-colors text-xs font-round"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100">
            <div className="flex justify-between font-round font-bold text-[#4A3728] mb-1">
              <span>Total</span>
              <span className="text-rose text-xl">${total.toFixed(2)}</span>
            </div>
            <p className={`font-round text-xs mb-4 ${freeShipping ? 'text-sage font-semibold' : 'text-[#C4A882]'}`}>
              {freeShipping ? '🎉 Free shipping included!' : `🚚 Add $${(50 - total).toFixed(2)} more for free shipping`}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2"
            >
              <span>Checkout Securely</span>
              <ExternalLink size={16} />
            </button>
            <p className="font-round text-xs text-center text-[#C4A882] mt-3">
              🔒 Powered by Stripe — safe &amp; secure
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('storymagic-cart') || '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('storymagic-cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    setCart(prev => [...prev, item])
    setCartOpen(true)
  }

  function removeFromCart(index) {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen font-round">
      <Navbar cartCount={cart.length} onCartClick={() => setCartOpen(true)} />

      {/* Floating cart button (mobile) */}
      {cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-rose text-white rounded-full shadow-pop flex items-center justify-center md:hidden animate-bounce-soft"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-periwinkle text-white text-xs font-bold rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      )}

      <Hero />
      <HowItWorks />

      <section id="create" className="py-24 bg-gradient-to-b from-[#FFFEF5] to-[#FFF0F8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="inline-block bg-lavender rounded-full px-4 py-1 font-round font-semibold text-sm text-[#8B6E5A] mb-4">
              🎨 Make it yours
            </span>
          </div>
          <h2 className="section-title">Create Your Book</h2>
          <p className="section-subtitle">
            Design a character that looks just like your child and build the perfect adventure in minutes!
          </p>
          <BookCreator onAddToCart={addToCart} />
        </div>
      </section>

      <Shop onAddToCart={addToCart} />
      <Testimonials />
      <Footer />

      {cartOpen && (
        <CartDrawer
          items={cart}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  )
}
