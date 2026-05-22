import { useState, useRef, useCallback } from 'react'
import { ChevronRight, ChevronLeft, Check, Upload, Sparkles, RefreshCw, Loader2 } from 'lucide-react'
import CharacterSVG from './CharacterSVG'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

const SKIN_TONES = [
  { id: 'fair',   color: '#FEDDBC', label: 'Fair'   },
  { id: 'light',  color: '#F5C5A3', label: 'Light'  },
  { id: 'medium', color: '#D4915A', label: 'Medium' },
  { id: 'tan',    color: '#C68642', label: 'Tan'    },
  { id: 'brown',  color: '#8D5524', label: 'Brown'  },
  { id: 'dark',   color: '#3D2B1F', label: 'Deep'   },
]

const HAIR_COLORS = [
  { id: 'blonde', color: '#F7DC6F', label: 'Blonde' },
  { id: 'brown',  color: '#5C2E00', label: 'Brown'  },
  { id: 'black',  color: '#151515', label: 'Black'  },
  { id: 'red',    color: '#D62828', label: 'Red'    },
  { id: 'auburn', color: '#6B2D0F', label: 'Auburn' },
  { id: 'pink',   color: '#FF6EB4', label: 'Pink'   },
]

const HAIR_STYLES = [
  { id: 'tufts',  emoji: '🌱', label: 'Tufty'  },
  { id: 'wavy',   emoji: '〰️', label: 'Wavy'   },
  { id: 'curly',  emoji: '🌀', label: 'Curly'  },
  { id: 'long',   emoji: '🌊', label: 'Long'   },
  { id: 'bun',    emoji: '⭕', label: 'Bun'    },
  { id: 'spiky',  emoji: '⚡', label: 'Spiky'  },
]

const OUTFIT_COLORS = [
  { id: '#4D7FFF', color: '#4D7FFF', label: 'Blue'   },
  { id: '#FF2D78', color: '#FF2D78', label: 'Pink'   },
  { id: '#00C896', color: '#00C896', label: 'Mint'   },
  { id: '#9B3FE8', color: '#9B3FE8', label: 'Purple' },
  { id: '#FFE030', color: '#FFE030', label: 'Yellow' },
  { id: '#FF9500', color: '#FF9500', label: 'Orange' },
  { id: '#FF4B4B', color: '#FF4B4B', label: 'Red'    },
  { id: '#00AAFF', color: '#00AAFF', label: 'Sky'    },
]

const THEMES = [
  { id: 'forest',    emoji: '🌲', title: 'Enchanted Forest', desc: 'Talking animals & magic',    bg: 'bg-mint'      },
  { id: 'space',     emoji: '🚀', title: 'Space Explorer',   desc: 'Journey through the stars',  bg: 'bg-[#D0E8FF]' },
  { id: 'ocean',     emoji: '🐠', title: 'Under the Sea',    desc: 'Mermaids & sea creatures',   bg: 'bg-sky/30'    },
  { id: 'superhero', emoji: '🦸', title: 'Superhero City',   desc: 'Discover your superpower',   bg: 'bg-peach'     },
  { id: 'magic',     emoji: '🦄', title: 'Magic Kingdom',    desc: 'Dragons, fairies & castles', bg: 'bg-lavender'  },
  { id: 'dino',      emoji: '🦕', title: 'Dino World',       desc: 'Adventure with dinosaurs',   bg: 'bg-mint'      },
]

const SIDEKICKS = [
  { id: 'puppy',  emoji: '🐶', label: 'Puppy'       },
  { id: 'kitten', emoji: '🐱', label: 'Kitten'      },
  { id: 'dragon', emoji: '🐲', label: 'Baby Dragon' },
  { id: 'bunny',  emoji: '🐰', label: 'Bunny'       },
  { id: 'robot',  emoji: '🤖', label: 'Robot'       },
  { id: 'fairy',  emoji: '🧚', label: 'Fairy'       },
]

const MAGIC_ITEMS = [
  { id: 'wand',   emoji: '🪄', label: 'Magic Wand'   },
  { id: 'cape',   emoji: '🦸', label: 'Super Cape'   },
  { id: 'map',    emoji: '🗺️', label: 'Treasure Map' },
  { id: 'crown',  emoji: '👑', label: 'Crown'        },
  { id: 'rocket', emoji: '🚀', label: 'Mini Rocket'  },
  { id: 'shield', emoji: '🛡️', label: 'Magic Shield' },
]

const FORMATS = [
  { id: 'hardcover', label: 'Hardcover',   price: 34.99, desc: 'Premium quality, 32 pages', icon: '📕' },
  { id: 'softcover', label: 'Softcover',   price: 24.99, desc: 'Great value, 32 pages',     icon: '📗' },
  { id: 'digital',   label: 'Digital PDF', price: 9.99,  desc: 'Instant download',          icon: '💻' },
]

const STEP_LABELS = ['Your Hero', 'The Adventure', 'Story Magic', 'Your Book']

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 1024
      let w = img.width, h = img.height
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX }
        else       { w = Math.round(w * MAX / h); h = MAX }
      }
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      canvas.toBlob(blob => {
        if (!blob) { reject(new Error('Compression failed')); return }
        const reader = new FileReader()
        reader.onload  = e => resolve(e.target.result.split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }, 'image/jpeg', 0.85)
    }
    img.onerror = () => reject(new Error('Could not load image'))
    img.src = url
  })
}

export default function BookCreator({ onAddToCart }) {
  const [step,    setStep]    = useState(0)
  const [char,    setChar]    = useState({ name: '', skinTone: 'fair', hairColor: 'blonde', hairStyle: 'wavy', outfitColor: '#4D7FFF' })
  const [story,   setStory]   = useState({ theme: '' })
  const [details, setDetails] = useState({ sidekick: '', magicItem: '' })
  const [format,  setFormat]  = useState('hardcover')
  const [ordered, setOrdered] = useState(false)

  // Step 0 — photo upload
  const [charTab,  setCharTab]  = useState('manual')
  const [dragging, setDragging] = useState(false)
  const [photo,    setPhoto]    = useState({ file: null, preview: null, loading: false, error: null, analyzed: false })
  const fileInputRef = useRef(null)

  // Step 2 — AI plot
  const [plotMode, setPlotMode] = useState('manual')
  const [plotText, setPlotText] = useState('')
  const [aiPlot,   setAiPlot]   = useState({ loading: false, error: null, data: null })

  const selectedFormat = FORMATS.find(f => f.id === format)
  const setCharField   = (k, v) => setChar(prev => ({ ...prev, [k]: v }))

  function canProceed() {
    if (step === 0) return char.name.trim().length > 0
    if (step === 1) return story.theme !== ''
    if (step === 2) {
      if (plotMode === 'ai') return aiPlot.data !== null
      return details.sidekick !== '' && details.magicItem !== ''
    }
    return true
  }

  // ── Photo handlers ────────────────────────────────────────────────────────

  const handleDragOver  = useCallback(e => { e.preventDefault(); setDragging(true) }, [])
  const handleDragLeave = useCallback(() => setDragging(false), [])
  const handleDrop      = useCallback(e => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handlePhotoSelect(file)
  }, [])

  function handlePhotoSelect(file) {
    const preview = URL.createObjectURL(file)
    setPhoto({ file, preview, loading: false, error: null, analyzed: false })
  }

  async function handleCartoonize() {
    if (!photo.file) return
    setPhoto(p => ({ ...p, loading: true, error: null }))
    try {
      const b64 = await compressImage(photo.file)
      const res = await fetch(`${API_BASE}/api/analyze-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: b64, mediaType: 'image/jpeg' }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `Error ${res.status}`)
      }
      const { skinTone, hairColor, hairStyle, error } = await res.json()
      if (error) throw new Error(error)
      setChar(p => ({
        ...p,
        skinTone:  skinTone  || p.skinTone,
        hairColor: hairColor || p.hairColor,
        hairStyle: hairStyle || p.hairStyle,
      }))
      setPhoto(p => ({ ...p, loading: false, analyzed: true }))
    } catch (err) {
      setPhoto(p => ({ ...p, loading: false, error: err.message || 'Could not analyze photo. Please adjust manually.' }))
    }
  }

  // ── AI plot handler ───────────────────────────────────────────────────────

  async function handleGeneratePlot() {
    setAiPlot({ loading: true, error: null, data: null })
    try {
      const res = await fetch(`${API_BASE}/api/generate-plot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterName: char.name, theme: story.theme }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `Error ${res.status}`)
      }
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setAiPlot({ loading: false, error: null, data })
      setDetails({ sidekick: data.sidekick || '', magicItem: data.magicItem || '' })
    } catch (err) {
      setAiPlot({ loading: false, error: err.message || 'Could not generate story. Please try again.', data: null })
    }
  }

  // ── Order & reset ─────────────────────────────────────────────────────────

  function handleOrder() {
    const themeName = THEMES.find(t => t.id === story.theme)?.title || 'Adventure'
    const bookTitle = aiPlot.data?.title || `${char.name}'s ${themeName}`
    onAddToCart({ id: Date.now(), title: bookTitle, price: selectedFormat.price, format: selectedFormat.label, type: 'custom' })
    setOrdered(true)
  }

  function resetAll() {
    setOrdered(false); setStep(0)
    setChar({ name: '', skinTone: 'fair', hairColor: 'blonde', hairStyle: 'wavy', outfitColor: '#4D7FFF' })
    setStory({ theme: '' })
    setDetails({ sidekick: '', magicItem: '' })
    setFormat('hardcover')
    setCharTab('manual')
    setPhoto({ file: null, preview: null, loading: false, error: null, analyzed: false })
    setPlotMode('manual')
    setPlotText('')
    setAiPlot({ loading: false, error: null, data: null })
  }

  // ─────────────────────────────────────────────────────────────────────────

  if (ordered) {
    return (
      <div className="text-center py-20 px-4">
        <div className="text-8xl mb-6 animate-bounce-soft">🎉</div>
        <h3 className="font-display text-5xl text-[#2C1A0E] mb-3">Woohoo!</h3>
        <p className="font-round font-bold text-xl text-[#7A5A40] mb-8 max-w-sm mx-auto">
          <strong className="text-rose">{char.name}'s</strong> magical book is in your cart!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={resetAll} className="btn-secondary">Create Another ✨</button>
          <a href="#shop" className="btn-primary">View Cart 🛒</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Progress steps */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg transition-all duration-300 ${
                i < step   ? 'bg-rose text-white shadow-soft' :
                i === step ? 'bg-white border-[3px] border-rose text-rose shadow-soft scale-110' :
                             'bg-white border-2 border-gray-200 text-gray-300'
              }`}>
                {i < step ? <Check size={18} /> : i + 1}
              </div>
              <span className={`font-round font-bold text-xs mt-1.5 hidden sm:block ${i === step ? 'text-rose' : 'text-[#C4A882]'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-1.5 mx-2 rounded-full transition-all duration-500 ${i < step ? 'bg-rose' : 'bg-gray-100'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-6 items-start">

        {/* Character preview */}
        <div className="md:col-span-2 bg-gradient-to-b from-blush/50 to-lavender/50 rounded-4xl p-6 flex flex-col items-center">
          <div className="w-52 h-64">
            <CharacterSVG skinTone={char.skinTone} hairColor={char.hairColor} hairStyle={char.hairStyle} outfitColor={char.outfitColor} />
          </div>
          {char.name && (
            <div className="mt-3 bg-white rounded-2xl px-5 py-2 shadow-soft text-center">
              <p className="font-display text-2xl text-rose">{char.name}</p>
              {story.theme && (
                <p className="font-round text-xs font-bold text-[#7A5A40]">
                  {THEMES.find(t => t.id === story.theme)?.emoji}&nbsp;
                  {THEMES.find(t => t.id === story.theme)?.title}
                </p>
              )}
            </div>
          )}
          {step === 3 && selectedFormat && (
            <div className="mt-3 w-full bg-white rounded-2xl p-3 shadow-soft text-center">
              <div className="font-round text-xs text-[#7A5A40] mb-0.5">Format</div>
              <div className="font-round font-bold text-[#2C1A0E]">{selectedFormat.icon} {selectedFormat.label}</div>
              <div className="font-display text-3xl text-rose">${selectedFormat.price}</div>
            </div>
          )}
        </div>

        {/* Form content */}
        <div className="md:col-span-3 bg-white rounded-4xl shadow-card p-6">

          {/* ── Step 0: Character ── */}
          {step === 0 && (
            <div>
              <h3 className="font-display text-3xl text-[#2C1A0E] mb-4">🎨 Design Your Hero</h3>

              {/* Tab: Manual / From Photo */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-2xl mb-5">
                {[
                  { id: 'manual', label: '✏️ Design Manually' },
                  { id: 'photo',  label: '📸 From Photo'      },
                ].map(tab => (
                  <button key={tab.id}
                    onClick={() => setCharTab(tab.id)}
                    className={`flex-1 py-2 rounded-xl font-round font-bold text-sm transition-all duration-200 ${
                      charTab === tab.id ? 'bg-white text-rose shadow-soft' : 'text-[#7A5A40] hover:text-rose'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Photo upload zone */}
              {charTab === 'photo' && (
                <div className="mb-5">
                  {!photo.preview ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                        dragging ? 'border-rose bg-blush/20' : 'border-gray-200 hover:border-rose hover:bg-blush/10'
                      }`}
                    >
                      <Upload size={32} className="text-rose mb-2" />
                      <p className="font-round font-bold text-sm text-[#7A5A40]">Drop a photo here</p>
                      <p className="font-round text-xs text-[#C4A882] mt-1">or click to browse — JPG, PNG, HEIC</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => e.target.files[0] && handlePhotoSelect(e.target.files[0])}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <img src={photo.preview} alt="Uploaded" className="w-28 h-28 rounded-2xl object-cover shadow-card" />
                        <button
                          onClick={() => setPhoto({ file: null, preview: null, loading: false, error: null, analyzed: false })}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-rose text-white rounded-full text-sm font-bold flex items-center justify-center shadow-soft"
                        >
                          ×
                        </button>
                      </div>

                      {!photo.analyzed && (
                        <button
                          onClick={handleCartoonize}
                          disabled={photo.loading}
                          className="btn-primary py-2.5 px-6 gap-2 disabled:opacity-60"
                        >
                          {photo.loading
                            ? <><Loader2 size={16} className="animate-spin" /> Analyzing…</>
                            : <><Sparkles size={16} /> Cartoonize ✨</>}
                        </button>
                      )}

                      {photo.analyzed && (
                        <div className="flex items-center gap-2 bg-mint/60 border border-sage/40 rounded-2xl px-4 py-2">
                          <span className="text-sage font-bold">✓</span>
                          <span className="font-round font-bold text-sm text-[#2C1A0E]">Character matched! Adjust below.</span>
                        </div>
                      )}

                      {photo.error && (
                        <div className="bg-blush rounded-2xl px-4 py-2.5 text-rose font-round text-xs font-bold text-center max-w-xs">
                          {photo.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Name field */}
              <div className="mb-5">
                <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">What's their name?</label>
                <input
                  type="text"
                  value={char.name}
                  onChange={e => setCharField('name', e.target.value)}
                  placeholder="e.g. Alex, Sam, Jordan…"
                  maxLength={20}
                  className="w-full rounded-2xl border-2 border-blush focus:border-rose outline-none px-4 py-3 font-round font-bold text-[#2C1A0E] placeholder:text-gray-300 transition-colors text-base"
                />
              </div>

              {/* Skin tone */}
              <div className="mb-5">
                <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">Skin tone</label>
                <div className="flex gap-2 flex-wrap">
                  {SKIN_TONES.map(s => (
                    <button key={s.id} title={s.label}
                      onClick={() => setCharField('skinTone', s.id)}
                      className={`color-swatch ${char.skinTone === s.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: s.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Hair color */}
              <div className="mb-5">
                <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">Hair color</label>
                <div className="flex gap-2 flex-wrap">
                  {HAIR_COLORS.map(h => (
                    <button key={h.id} title={h.label}
                      onClick={() => setCharField('hairColor', h.id)}
                      className={`color-swatch ${char.hairColor === h.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: h.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Hair style */}
              <div className="mb-5">
                <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">Hair style</label>
                <div className="grid grid-cols-3 gap-2">
                  {HAIR_STYLES.map(s => (
                    <button key={s.id}
                      onClick={() => setCharField('hairStyle', s.id)}
                      className={`rounded-2xl py-2 px-3 flex items-center gap-2 border-2 transition-all duration-150 font-round font-bold text-sm ${
                        char.hairStyle === s.id
                          ? 'border-rose bg-blush/40 text-rose shadow-soft'
                          : 'border-gray-100 bg-gray-50 text-[#7A5A40] hover:border-blush'
                      }`}
                    >
                      <span>{s.emoji}</span>{s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit color */}
              <div>
                <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">Outfit color</label>
                <div className="flex gap-2 flex-wrap">
                  {OUTFIT_COLORS.map(o => (
                    <button key={o.id} title={o.label}
                      onClick={() => setCharField('outfitColor', o.id)}
                      className={`color-swatch ${char.outfitColor === o.id ? 'color-swatch-active' : ''}`}
                      style={{ backgroundColor: o.color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Theme ── */}
          {step === 1 && (
            <div>
              <h3 className="font-display text-3xl text-[#2C1A0E] mb-5">📖 Choose the Adventure</h3>
              <div className="grid grid-cols-2 gap-3">
                {THEMES.map(t => (
                  <button key={t.id}
                    onClick={() => setStory({ theme: t.id })}
                    className={`${t.bg} rounded-3xl p-4 text-left transition-all duration-200 border-2 hover:-translate-y-0.5 hover:shadow-soft ${
                      story.theme === t.id ? 'border-rose shadow-soft scale-[1.02]' : 'border-transparent'
                    }`}
                  >
                    <div className="text-4xl mb-1">{t.emoji}</div>
                    <div className="font-round font-bold text-sm text-[#2C1A0E]">{t.title}</div>
                    <div className="font-round text-xs text-[#7A5A40]">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Story Magic ── */}
          {step === 2 && (
            <div>
              <h3 className="font-display text-3xl text-[#2C1A0E] mb-4">✨ Story Magic</h3>

              {/* Mode toggle */}
              <div className="flex gap-1 p-1 bg-gray-50 rounded-2xl mb-5">
                {[
                  { id: 'manual', label: '🎲 Pick Your Own' },
                  { id: 'ai',     label: '✨ AI Magic'      },
                ].map(m => (
                  <button key={m.id}
                    onClick={() => setPlotMode(m.id)}
                    className={`flex-1 py-2 rounded-xl font-round font-bold text-sm transition-all duration-200 ${
                      plotMode === m.id ? 'bg-white text-rose shadow-soft' : 'text-[#7A5A40] hover:text-rose'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* AI mode */}
              {plotMode === 'ai' && (
                <div>
                  {!aiPlot.data && !aiPlot.loading && (
                    <div className="text-center py-6">
                      <div className="text-5xl mb-3">🪄</div>
                      <p className="font-round font-bold text-sm text-[#7A5A40] mb-4">
                        Let AI craft a magical story for {char.name || 'your hero'}!
                      </p>
                      <button onClick={handleGeneratePlot} className="btn-primary gap-2">
                        <Sparkles size={16} /> Generate Story ✨
                      </button>
                      {aiPlot.error && (
                        <div className="mt-3 bg-blush rounded-2xl px-4 py-2.5 text-rose font-round text-xs font-bold">
                          {aiPlot.error}
                        </div>
                      )}
                    </div>
                  )}

                  {aiPlot.loading && (
                    <div className="text-center py-10">
                      <Loader2 size={36} className="animate-spin text-rose mx-auto mb-3" />
                      <p className="font-round font-bold text-sm text-[#7A5A40]">Crafting your magical story…</p>
                    </div>
                  )}

                  {aiPlot.data && (
                    <div>
                      <div className="bg-gradient-to-br from-blush/30 to-lavender/30 rounded-3xl p-4 mb-4 border border-blush/60">
                        <div className="font-display text-xl text-[#2C1A0E] mb-2">{aiPlot.data.title}</div>
                        <p className="font-round text-sm text-[#7A5A40] leading-relaxed mb-3">{aiPlot.data.summary}</p>
                        <div className="bg-white/70 rounded-2xl px-3 py-2">
                          <span className="font-round font-bold text-xs text-rose">Plot twist: </span>
                          <span className="font-round text-xs text-[#7A5A40]">{aiPlot.data.twist}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mb-3">
                        <div className="flex-1 bg-blush/20 rounded-2xl p-3 text-center">
                          <div className="font-round text-xs text-[#C4A882] mb-0.5">Sidekick</div>
                          <div className="text-2xl">{SIDEKICKS.find(s => s.id === details.sidekick)?.emoji || '❓'}</div>
                          <div className="font-round font-bold text-xs text-[#2C1A0E]">{SIDEKICKS.find(s => s.id === details.sidekick)?.label || '—'}</div>
                        </div>
                        <div className="flex-1 bg-lavender/30 rounded-2xl p-3 text-center">
                          <div className="font-round text-xs text-[#C4A882] mb-0.5">Magic Item</div>
                          <div className="text-2xl">{MAGIC_ITEMS.find(m => m.id === details.magicItem)?.emoji || '❓'}</div>
                          <div className="font-round font-bold text-xs text-[#2C1A0E]">{MAGIC_ITEMS.find(m => m.id === details.magicItem)?.label || '—'}</div>
                        </div>
                      </div>

                      <button
                        onClick={handleGeneratePlot}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 border-blush text-[#7A5A40] font-round font-bold text-sm hover:border-rose hover:text-rose transition-colors"
                      >
                        <RefreshCw size={14} /> Try a different story
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Manual mode */}
              {plotMode === 'manual' && (
                <div>
                  <div className="mb-5">
                    <label className="font-round font-bold text-sm text-[#7A5A40] block mb-3">
                      Choose {char.name || 'your hero'}'s sidekick!
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SIDEKICKS.map(s => (
                        <button key={s.id}
                          onClick={() => setDetails(p => ({ ...p, sidekick: s.id }))}
                          className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition-all duration-150 ${
                            details.sidekick === s.id
                              ? 'border-rose bg-blush/30 shadow-soft'
                              : 'border-transparent bg-gray-50 hover:border-blush'
                          }`}
                        >
                          <span className="text-2xl">{s.emoji}</span>
                          <span className="font-round font-bold text-xs text-[#7A5A40]">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="font-round font-bold text-sm text-[#7A5A40] block mb-3">Pick a magical item!</label>
                    <div className="grid grid-cols-3 gap-2">
                      {MAGIC_ITEMS.map(m => (
                        <button key={m.id}
                          onClick={() => setDetails(p => ({ ...p, magicItem: m.id }))}
                          className={`rounded-2xl p-3 flex flex-col items-center gap-1 border-2 transition-all duration-150 ${
                            details.magicItem === m.id
                              ? 'border-periwinkle bg-sky/20 shadow-soft'
                              : 'border-transparent bg-gray-50 hover:border-sky'
                          }`}
                        >
                          <span className="text-2xl">{m.emoji}</span>
                          <span className="font-round font-bold text-xs text-[#7A5A40]">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-round font-bold text-sm text-[#7A5A40] block mb-2">
                      ✏️ Custom plot outline{' '}
                      <span className="font-normal text-[#C4A882]">(optional)</span>
                    </label>
                    <textarea
                      value={plotText}
                      onChange={e => setPlotText(e.target.value)}
                      placeholder="e.g. The hero discovers a hidden door that leads to a secret world…"
                      maxLength={300}
                      rows={3}
                      className="w-full rounded-2xl border-2 border-blush focus:border-rose outline-none px-4 py-3 font-round text-sm text-[#2C1A0E] placeholder:text-gray-300 transition-colors resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 3: Preview & Order ── */}
          {step === 3 && (
            <div>
              <h3 className="font-display text-3xl text-[#2C1A0E] mb-2">📦 Your Book is Ready!</h3>
              <p className="font-round font-bold text-sm text-[#7A5A40] mb-5">Choose your format and order.</p>

              <div className="bg-gradient-to-br from-blush/20 to-sky/20 rounded-3xl p-4 mb-5">
                <div className="font-round font-bold text-[#2C1A0E] mb-2">✏️ Story summary</div>
                <ul className="font-round text-sm text-[#7A5A40] space-y-1">
                  <li>🌟 Hero: <strong>{char.name}</strong></li>
                  {aiPlot.data?.title && (
                    <li>📖 Title: <strong>{aiPlot.data.title}</strong></li>
                  )}
                  <li>🎭 Adventure: <strong>{THEMES.find(t => t.id === story.theme)?.title}</strong></li>
                  <li>🤝 Sidekick: <strong>{SIDEKICKS.find(s => s.id === details.sidekick)?.emoji} {SIDEKICKS.find(s => s.id === details.sidekick)?.label}</strong></li>
                  <li>🪄 Magic item: <strong>{MAGIC_ITEMS.find(m => m.id === details.magicItem)?.emoji} {MAGIC_ITEMS.find(m => m.id === details.magicItem)?.label}</strong></li>
                  {aiPlot.data?.summary && (
                    <li className="pt-1 text-xs leading-relaxed italic text-[#9A7A60]">"{aiPlot.data.summary}"</li>
                  )}
                  {plotText && !aiPlot.data && (
                    <li className="pt-1 text-xs leading-relaxed italic text-[#9A7A60]">"{plotText}"</li>
                  )}
                </ul>
              </div>

              <div className="space-y-3 mb-6">
                {FORMATS.map(f => (
                  <button key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`w-full rounded-2xl p-4 flex items-center gap-4 border-2 transition-all duration-150 text-left ${
                      format === f.id ? 'border-rose bg-blush/20 shadow-soft' : 'border-gray-100 hover:border-blush bg-white'
                    }`}
                  >
                    <span className="text-3xl">{f.icon}</span>
                    <div className="flex-1">
                      <div className="font-round font-bold text-[#2C1A0E] text-sm">{f.label}</div>
                      <div className="font-round text-xs text-[#7A5A40]">{f.desc}</div>
                    </div>
                    <div className="font-display text-2xl text-rose">${f.price}</div>
                    {format === f.id && <Check size={18} className="text-rose shrink-0" />}
                  </button>
                ))}
              </div>

              <button onClick={handleOrder} className="w-full btn-primary justify-center py-4 text-lg">
                🛒 Add to Cart — ${selectedFormat?.price}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 font-round font-bold text-sm text-[#7A5A40] hover:text-rose transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 3 && (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-1 font-display text-base py-2.5 px-7 rounded-full transition-all duration-150 ${
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
