import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, Star } from 'lucide-react'
import CharacterSVG from './CharacterSVG'

const SKIN_TONES = [
  { id: 'fair', color: '#FEDDBC', label: 'Fair' },
  { id: 'light', color: '#F5C5A3', label: 'Light' },
  { id: 'medium', color: '#D4915A', label: 'Medium' },
  { id: 'tan', color: '#C68642', label: 'Tan' },
  { id: 'brown', color: '#8D5524', label: 'Brown' },
  { id: 'dark', color: '#3D2B1F', label: 'Deep' },
]

const HAIR_COLORS = [
  { id: 'blonde', color: '#F7DC6F', label: 'Blonde' },
  { id: 'brown', color: '#6E2C00', label: 'Brown' },
  { id: 'black', color: '#212121', label: 'Black' },
  { id: 'red', color: '#E74C3C', label: 'Red' },
  { id: 'auburn', color: '#784212', label: 'Auburn' },
  { id: 'pink', color: '#F48FB1', label: 'Pink' },
]

const OUTFIT_COLORS = [
  { id: '#74B9FF', color: '#74B9FF', label: 'Sky Blue' },
  { id: '#FFA3C4', color: '#FFA3C4', label: 'Pink' },
  { id: '#95E1A0', color: '#95E1A0', label: 'Mint' },
  { id: '#C39BD3', color: '#C39BD3', label: 'Lavender' },
  { id: '#F9CA24', color: '#F9CA24', label: 'Sunny' },
  { id: '#FFA95A', color: '#FFA95A', label: 'Peach' },
  { id: '#FF7675', color: '#FF7675', label: 'Coral' },
  { id: '#81ECEC', color: '#81ECEC', label: 'Teal' },
]

const THEMES = [
  { id: 'forest', emoji: '🌲', title: 'Enchanted Forest', desc: 'Talking animals & hidden magic', bg: 'bg-mint' },
  { id: 'space', emoji: '🚀', title: 'Space Explorer', desc: 'Journey through the stars', bg: 'bg-sky' },
  { id: 'ocean', emoji: '🐠', title: 'Under the Sea', desc: 'Mermaids & sea creatures', bg: 'bg-[#C8E6F5]' },
  { id: 'superhero', emoji: '🦸', title: 'Superhero City', desc: 'Discover your superpower', bg: 'bg-[#FFE5CC]' },
  { id: 'magic', emoji: '🦄', title: 'Magic Kingdom', desc: 'Dragons, fairies & castles', bg: 'bg-lavender' },
  { id: 'dino', emoji: '🦕', title: 'Dino World', desc: 'Adventure with dinosaurs', bg: 'bg-[#D4F5C8]' },
]

const SIDEKICKS = [
  { id: 'puppy', emoji: '🐶', label: 'Puppy' },
  { id: 'kitten', emoji: '🐱', label: 'Kitten' },
  { id: 'dragon', emoji: '🐲', label: 'Baby Dragon' },
  { id: 'bunny', emoji: '🐰', label: 'Bunny' },
  { id: 'robot', emoji: '🤖', label: 'Robot' },
  { id: 'fairy', emoji: '🧚', label: 'Fairy' },
]

const MAGIC_ITEMS = [
  { id: 'wand', emoji: '🪄', label: 'Magic Wand' },
  { id: 'cape', emoji: '🦸', label: 'Super Cape' },
  { id: 'map', emoji: '🗺️', label: 'Treasure Map' },
  { id: 'crown', emoji: '👑', label: 'Crown' },
  { id: 'rocket', emoji: '🚀', label: 'Mini Rocket' },
  { id: 'shield', emoji: '🛡️', label: 'Magic Shield' },
]

const FORMATS = [
  { id: 'hardcover', label: 'Hardcover', price: 34.99, desc: 'Premium quality, 32 pages', icon: '📕' },
  { id: 'softcover', label: 'Softcover', price: 24.99, desc: 'Great value, 32 pages', icon: '📗' },
  { id: 'digital', label: 'Digital PDF', price: 9.99, desc: 'Instant download', icon: '💻' },
]

const STEP_LABELS = ['Your Hero', 'The Adventure', 'Story Magic', 'Your Book']

export default function BookCreator({ onAddToCart }) {
  const [step, setStep] = useState(0)
  const [char, setChar] = useState({
    name: '',
    gender: 'girl',
    skinTone: 'fair',
    hairColor: 'blonde',
    outfitColor: '#74B9FF',
  })
  const [story, setStory] = useState({ theme: '' })
  const [details, setDetails] = useState({ sidekick: '', magicItem: '' })
  const [format, setFormat] = useState('hardcover')
  const [ordered, setOrdered] = useState(false)

  const selectedFormat = FORMATS.find(f => f.id === format)

  function setCharField(key, val) {
    setChar(prev => ({ ...prev, [key]: val }))
  }

  function canProceed() {
    if (step === 0) return char.name.trim().length > 0
    if (step === 1) return story.theme !== ''
    if (step === 2) return details.sidekick !== '' && details.magicItem !== ''
    return true
  }

  function handleOrder() {
    onAddToCart({
      id: Date.now(),
      title: `${char.name}'s ${THEMES.find(t => t.id === story.theme)?.title || 'Adventure'}`,
      price: selectedFormat.price,
      format: selectedFormat.label,
      type: 'custom',
    })
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-7xl mb-6 animate-bounce-soft">🎉</div>
        <h3 className="font-display text-4xl text-[#4A3728] mb-3">Woohoo!</h3>
        <p className="font-round text-lg text-[#8B6E5A] mb-8 max-w-sm mx-auto">
          <strong className="text-rose">{char.name}'s</strong> magical book has been added to your cart!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => { setOrdered(false); setStep(0); setChar({ name: '', gender: 'girl', skinTone: 'fair', hairColor: 'blonde', outfitColor: '#74B9FF' }); setStory({ theme: '' }); setDetails({ sidekick: '', magicItem: '' }) }}
            className="btn-secondary">
            Create Another Book
          </button>
          <a href="#shop" className="btn-primary">View Cart &amp; Checkout</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step progress */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                i < step ? 'bg-rose text-white shadow-soft' :
                i === step ? 'bg-white border-2 border-rose text-rose shadow-soft' :
                'bg-white border-2 border-gray-200 text-gray-300'
              }`}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className={`font-round text-xs mt-1 font-semibold hidden sm:block ${i === step ? 'text-rose' : 'text-[#C4A882]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${i < step ? 'bg-rose' : 'bg-gray-100'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6 items-start">
        {/* Character preview (always visible) */}
        <div className="md:col-span-2 bg-gradient-to-b from-blush/30 to-sky/30 rounded-4xl p-6 flex flex-col items-center">
          <div className="w-48 h-56">
            <CharacterSVG
              skinTone={char.skinTone}
              hairColor={char.hairColor}
              outfitColor={char.outfitColor}
              gender={char.gender}
            />
          </div>
          {char.name && (
            <div className="mt-3 bg-white rounded-2xl px-4 py-2 shadow-soft text-center">
              <p className="font-display text-xl text-rose">{char.name}</p>
              {story.theme && (
                <p className="font-round text-xs text-[#8B6E5A]">
                  {THEMES.find(t => t.id === story.theme)?.emoji} {THEMES.find(t => t.id === story.theme)?.title}
                </p>
              )}
            </div>
          )}
          {step === 3 && selectedFormat && (
            <div className="mt-3 w-full bg-white rounded-2xl p-3 shadow-soft">
              <div className="font-round text-xs text-[#8B6E5A] mb-1">Selected format:</div>
              <div className="font-round font-bold text-[#4A3728]">{selectedFormat.icon} {selectedFormat.label}</div>
              <div className="font-display text-2xl text-rose">${selectedFormat.price}</div>
            </div>
          )}
        </div>

        {/* Form content */}
        <div className="md:col-span-3 bg-white rounded-4xl shadow-card p-6">

          {/* Step 0 — Character */}
          {step === 0 && (
            <div>
              <h3 className="font-display text-2xl text-[#4A3728] mb-5">🎨 Design Your Hero</h3>

              {/* Name */}
              <div className="mb-5">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-2">What's their name?</label>
                <input
                  type="text"
                  value={char.name}
                  onChange={e => setCharField('name', e.target.value)}
                  placeholder="e.g. Emma, Liam, Zara…"
                  className="w-full rounded-2xl border-2 border-blush focus:border-rose outline-none px-4 py-3 font-round text-[#4A3728] placeholder:text-gray-300 transition-colors"
                  maxLength={20}
                />
              </div>

              {/* Gender */}
              <div className="mb-5">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-2">Character style</label>
                <div className="flex gap-3">
                  {['girl', 'boy'].map(g => (
                    <button
                      key={g}
                      onClick={() => setCharField('gender', g)}
                      className={`flex-1 py-2.5 rounded-2xl font-round font-bold text-sm transition-all duration-150 border-2 ${
                        char.gender === g
                          ? 'bg-rose border-rose text-white shadow-soft'
                          : 'bg-white border-blush text-[#8B6E5A] hover:border-rose'
                      }`}
                    >
                      {g === 'girl' ? '👧 Girl' : '👦 Boy'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin tone */}
              <div className="mb-5">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-2">Skin tone</label>
                <div className="flex gap-2 flex-wrap">
                  {SKIN_TONES.map(s => (
                    <button
                      key={s.id}
                      title={s.label}
                      onClick={() => setCharField('skinTone', s.id)}
                      className={`color-swatch ${char.skinTone === s.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Hair color */}
              <div className="mb-5">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-2">Hair color</label>
                <div className="flex gap-2 flex-wrap">
                  {HAIR_COLORS.map(h => (
                    <button
                      key={h.id}
                      title={h.label}
                      onClick={() => setCharField('hairColor', h.id)}
                      className={`color-swatch ${char.hairColor === h.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: h.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Outfit color */}
              <div className="mb-5">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-2">Outfit color</label>
                <div className="flex gap-2 flex-wrap">
                  {OUTFIT_COLORS.map(o => (
                    <button
                      key={o.id}
                      title={o.label}
                      onClick={() => setCharField('outfitColor', o.id)}
                      className={`color-swatch ${char.outfitColor === o.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: o.color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Theme */}
          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl text-[#4A3728] mb-5">📖 Choose the Adventure</h3>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setStory({ theme: t.id })}
                    className={`${t.bg} rounded-3xl p-4 text-left transition-all duration-200 border-2 hover:-translate-y-0.5 hover:shadow-soft ${
                      story.theme === t.id ? 'border-rose shadow-soft scale-[1.02]' : 'border-transparent'
                    }`}
                  >
                    <div className="text-3xl mb-1">{t.emoji}</div>
                    <div className="font-round font-bold text-sm text-[#4A3728]">{t.title}</div>
                    <div className="font-round text-xs text-[#8B6E5A]">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Story details */}
          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl text-[#4A3728] mb-5">✨ Story Magic</h3>

              <div className="mb-6">
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-3">
                  Choose a sidekick for {char.name || 'your hero'}!
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIDEKICKS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setDetails(prev => ({ ...prev, sidekick: s.id }))}
                      className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition-all duration-150 ${
                        details.sidekick === s.id
                          ? 'border-rose bg-blush/30 shadow-soft'
                          : 'border-transparent bg-gray-50 hover:border-blush'
                      }`}
                    >
                      <span className="text-2xl">{s.emoji}</span>
                      <span className="font-round text-xs font-semibold text-[#8B6E5A]">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-round font-semibold text-sm text-[#8B6E5A] block mb-3">
                  Pick a magical item!
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MAGIC_ITEMS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setDetails(prev => ({ ...prev, magicItem: m.id }))}
                      className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition-all duration-150 ${
                        details.magicItem === m.id
                          ? 'border-periwinkle bg-sky/30 shadow-soft'
                          : 'border-transparent bg-gray-50 hover:border-sky'
                      }`}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="font-round text-xs font-semibold text-[#8B6E5A]">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Preview & Order */}
          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl text-[#4A3728] mb-2">📦 Your Book is Ready!</h3>
              <p className="font-round text-sm text-[#8B6E5A] mb-5">Choose your format and order!</p>

              {/* Book summary */}
              <div className="bg-gradient-to-br from-blush/20 to-sky/20 rounded-3xl p-4 mb-5">
                <div className="font-round font-bold text-[#4A3728] mb-2">
                  ✏️ Your story summary:
                </div>
                <ul className="font-round text-sm text-[#8B6E5A] space-y-1">
                  <li>🌟 Hero: <strong>{char.name}</strong></li>
                  <li>🎭 Adventure: <strong>{THEMES.find(t => t.id === story.theme)?.title}</strong></li>
                  <li>🤝 Sidekick: <strong>{SIDEKICKS.find(s => s.id === details.sidekick)?.emoji} {SIDEKICKS.find(s => s.id === details.sidekick)?.label}</strong></li>
                  <li>🪄 Magic item: <strong>{MAGIC_ITEMS.find(m => m.id === details.magicItem)?.emoji} {MAGIC_ITEMS.find(m => m.id === details.magicItem)?.label}</strong></li>
                </ul>
              </div>

              {/* Format selection */}
              <div className="space-y-3 mb-6">
                {FORMATS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`w-full rounded-2xl p-4 flex items-center gap-4 border-2 transition-all duration-150 text-left ${
                      format === f.id
                        ? 'border-rose bg-blush/20 shadow-soft'
                        : 'border-gray-100 hover:border-blush bg-white'
                    }`}
                  >
                    <span className="text-2xl">{f.icon}</span>
                    <div className="flex-1">
                      <div className="font-round font-bold text-[#4A3728] text-sm">{f.label}</div>
                      <div className="font-round text-xs text-[#8B6E5A]">{f.desc}</div>
                    </div>
                    <div className="font-display text-xl text-rose">${f.price}</div>
                    {format === f.id && <Check size={18} className="text-rose" />}
                  </button>
                ))}
              </div>

              <button
                onClick={handleOrder}
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                <span>Add to Cart — ${selectedFormat?.price}</span>
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 font-round font-semibold text-sm text-[#8B6E5A] hover:text-rose transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 3 && (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-1 font-round font-bold text-sm py-2.5 px-6 rounded-full transition-all duration-150 ${
                  canProceed()
                    ? 'bg-rose text-white shadow-soft hover:shadow-pop hover:-translate-y-0.5'
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
