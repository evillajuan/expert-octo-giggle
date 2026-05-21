const SKIN_MAP = {
  fair:   '#FEDDBC',
  light:  '#F5C5A3',
  medium: '#D4915A',
  tan:    '#C68642',
  brown:  '#8D5524',
  dark:   '#3D2B1F',
}

const HAIR_MAP = {
  blonde:  '#F7DC6F',
  brown:   '#5C2E00',
  black:   '#151515',
  red:     '#D62828',
  auburn:  '#6B2D0F',
  pink:    '#FF6EB4',
}

// Base cap that fits the oval Curious George head
const CAP = 'M 18 46 Q 20 6 50 4 Q 80 6 82 46 Q 76 20 50 16 Q 24 20 18 46 Z'

function Hair({ style, color }) {
  switch (style) {
    case 'tufts':
      return (
        <g fill="none" stroke={color} strokeWidth="5.5" strokeLinecap="round">
          <path d="M 42 12 Q 46 3 50 12" />
          <path d="M 50 10 Q 54 1 58 10" />
        </g>
      )
    case 'wavy':
      return <path d={CAP} fill={color} />
    case 'curly':
      return (
        <>
          <path d={CAP} fill={color} />
          <circle cx="28" cy="18" r="10" fill={color} />
          <circle cx="46" cy="9"  r="11" fill={color} />
          <circle cx="66" cy="9"  r="11" fill={color} />
          <circle cx="80" cy="18" r="10" fill={color} />
        </>
      )
    case 'long':
      return (
        <>
          <path d={CAP} fill={color} />
          {/* Side curtains */}
          <path d="M 18 46 Q 10 74 12 110 Q 15 118 20 110 Q 18 80 20 52 Z" fill={color} />
          <path d="M 82 46 Q 90 74 88 110 Q 85 118 80 110 Q 82 80 80 52 Z" fill={color} />
        </>
      )
    case 'bun':
      return (
        <>
          <path d={CAP} fill={color} />
          <circle cx="50" cy="6" r="14" fill={color} />
          {/* Bun highlight */}
          <circle cx="46" cy="2" r="3.5" fill="white" opacity="0.3" />
        </>
      )
    case 'spiky':
      return (
        <>
          <path d="M 22 42 Q 24 16 50 12 Q 76 16 78 42 Q 72 24 50 20 Q 28 24 22 42 Z" fill={color} />
          <polygon points="33,16 29,-1 41,13"  fill={color} />
          <polygon points="50,12 47,-3 57,10"  fill={color} />
          <polygon points="67,16 59,-1 71,13"  fill={color} />
        </>
      )
    default:
      return null
  }
}

export default function CharacterSVG({
  skinTone    = 'fair',
  hairColor   = 'brown',
  outfitColor = '#7EB2F0',
  hairStyle   = 'wavy',
}) {
  const skin   = SKIN_MAP[skinTone]  || SKIN_MAP.fair
  const hair   = HAIR_MAP[hairColor] || HAIR_MAP.brown
  const outfit = outfitColor

  // Derive a slightly darker shade for the shirt bottom edge
  const outfitShadow = outfit + 'CC'

  return (
    <svg viewBox="0 0 100 148" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">

      {/* Ground shadow */}
      <ellipse cx="50" cy="145" rx="26" ry="5" fill="rgba(0,0,0,0.07)" />

      {/* ── Legs ───────────────────────────────── */}
      <rect x="32" y="112" width="14" height="25" rx="7" fill="#A8CEEA" />
      <rect x="54" y="112" width="14" height="25" rx="7" fill="#A8CEEA" />

      {/* Shoes — rounded storybook ovals */}
      <ellipse cx="39" cy="138" rx="13" ry="7.5" fill="#E8A070" />
      <ellipse cx="61" cy="138" rx="13" ry="7.5" fill="#E8A070" />
      {/* Shoe highlight */}
      <ellipse cx="35" cy="134" rx="5" ry="2.5" fill="white" opacity="0.25" />
      <ellipse cx="57" cy="134" rx="5" ry="2.5" fill="white" opacity="0.25" />

      {/* ── Body — round tummy ──────────────────── */}
      <ellipse cx="50" cy="100" rx="23" ry="20" fill={outfit} />
      {/* Tummy highlight (soft inner glow) */}
      <ellipse cx="48" cy="96" rx="13" ry="11" fill="white" opacity="0.18" />
      {/* Collar arc */}
      <path d="M 36 88 Q 50 97 64 88" stroke="white" strokeWidth="2.5"
            fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Arms */}
      <path d="M 29 96 Q 15 107 13 120" stroke={outfit} strokeWidth="13"
            strokeLinecap="round" fill="none" />
      <path d="M 71 96 Q 85 107 87 120" stroke={outfit} strokeWidth="13"
            strokeLinecap="round" fill="none" />

      {/* Hands — soft circles */}
      <circle cx="12" cy="123" r="8.5" fill={skin} />
      <circle cx="88" cy="123" r="8.5" fill={skin} />

      {/* ── HEAD — Curious George: tall oval ───── */}
      <ellipse cx="50" cy="46" rx="32" ry="37" fill={skin} />

      {/* Hair (on top of head) */}
      <Hair style={hairStyle} color={hair} />

      {/* Ears — round, simple */}
      <circle cx="17" cy="50" r="6.5" fill={skin} />
      <circle cx="83" cy="50" r="6.5" fill={skin} />
      {/* Ear inner */}
      <circle cx="17" cy="50" r="4"   fill={skin} style={{ filter: 'brightness(0.88)' }} />
      <circle cx="83" cy="50" r="4"   fill={skin} style={{ filter: 'brightness(0.88)' }} />

      {/* ── FACE ───────────────────────────────── */}

      {/* Eyes — Curious George: full sclera + iris + pupil + shine */}
      {/* Left eye */}
      <circle cx="37" cy="44" r="8"   fill="white" />
      <circle cx="37" cy="44.5" r="5.8" fill="#7B5A3A" />
      <circle cx="37" cy="44.5" r="3.4" fill="#1a0800" />
      <circle cx="39.5" cy="42" r="2"   fill="white" />

      {/* Right eye */}
      <circle cx="63" cy="44" r="8"   fill="white" />
      <circle cx="63" cy="44.5" r="5.8" fill="#7B5A3A" />
      <circle cx="63" cy="44.5" r="3.4" fill="#1a0800" />
      <circle cx="65.5" cy="42" r="2"   fill="white" />

      {/* Eyebrows — friendly soft arches */}
      <path d="M 30 35 Q 37 31 44 35" stroke={hair} strokeWidth="2.5"
            fill="none" strokeLinecap="round" />
      <path d="M 56 35 Q 63 31 70 35" stroke={hair} strokeWidth="2.5"
            fill="none" strokeLinecap="round" />

      {/* Nose — small storybook button */}
      <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill={skin}
               style={{ filter: 'brightness(0.82)' }} />

      {/* Smile — wide and joyful */}
      <path d="M 36 65 Q 50 80 64 65"
            stroke="#6B3A1F" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <circle cx="24" cy="58" r="9" fill="#FFAABD" opacity="0.45" />
      <circle cx="76" cy="58" r="9" fill="#FFAABD" opacity="0.45" />

    </svg>
  )
}
