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

// Base cap shape that sits on top of the Peanuts-style round head
const CAP = 'M 14 44 Q 16 4 50 2 Q 84 4 86 44 Q 80 24 50 20 Q 20 24 14 44 Z'

function Hair({ style, color }) {
  switch (style) {
    case 'tufts': // Charlie Brown — sparse tufts
      return (
        <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">
          <path d="M 42 10 Q 46 2 50 10" />
          <path d="M 50 8 Q 54 0 58 8" />
        </g>
      )
    case 'wavy':
      return <path d={CAP} fill={color} />
    case 'curly':
      return (
        <>
          <path d={CAP} fill={color} />
          <circle cx="30" cy="18" r="9" fill={color} />
          <circle cx="46" cy="9"  r="10" fill={color} />
          <circle cx="64" cy="9"  r="10" fill={color} />
          <circle cx="78" cy="18" r="9"  fill={color} />
        </>
      )
    case 'long':
      return (
        <>
          <path d={CAP} fill={color} />
          {/* Long curtains */}
          <path d="M 14 44 Q 6 70 8 105 Q 11 112 16 106 Q 14 76 16 50 Z" fill={color} />
          <path d="M 86 44 Q 94 70 92 105 Q 89 112 84 106 Q 86 76 84 50 Z" fill={color} />
        </>
      )
    case 'bun':
      return (
        <>
          <path d={CAP} fill={color} />
          <circle cx="50" cy="6" r="14" fill={color} />
          <circle cx="46" cy="2" r="4" fill="white" opacity="0.25" />
        </>
      )
    case 'spiky':
      return (
        <>
          {/* Base */}
          <path d="M 20 40 Q 22 16 50 12 Q 78 16 80 40 Q 74 26 50 22 Q 26 26 20 40 Z" fill={color} />
          {/* Spikes */}
          <polygon points="34,14 30,-1 42,12" fill={color} />
          <polygon points="50,10 47,-4 57,9"  fill={color} />
          <polygon points="66,14 58,-1 70,12" fill={color} />
        </>
      )
    default:
      return null
  }
}

export default function CharacterSVG({
  skinTone   = 'fair',
  hairColor  = 'brown',
  outfitColor = '#4D7FFF',
  hairStyle  = 'wavy',
}) {
  const skin   = SKIN_MAP[skinTone]   || SKIN_MAP.fair
  const hair   = HAIR_MAP[hairColor]  || HAIR_MAP.brown
  const outfit = outfitColor

  return (
    <svg viewBox="0 0 100 145" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">

      {/* Ground shadow */}
      <ellipse cx="50" cy="142" rx="26" ry="5" fill="rgba(0,0,0,0.09)" />

      {/* ── Legs ─────────────────────────────── */}
      <rect x="33" y="110" width="14" height="24" rx="7" fill="#5B9BD5" />
      <rect x="53" y="110" width="14" height="24" rx="7" fill="#5B9BD5" />

      {/* Shoes — big Peanuts ovals */}
      <ellipse cx="40" cy="136" rx="13" ry="7" fill="#2C1A0E" />
      <ellipse cx="60" cy="136" rx="13" ry="7" fill="#2C1A0E" />

      {/* ── Body ─────────────────────────────── */}
      <ellipse cx="50" cy="100" rx="22" ry="18" fill={outfit} />

      {/* Collar arc */}
      <path d="M 36 90 Q 50 98 64 90" stroke="rgba(255,255,255,0.45)" strokeWidth="3"
            fill="none" strokeLinecap="round" />

      {/* Arms */}
      <path d="M 30 96 Q 16 106 14 118" stroke={outfit} strokeWidth="11"
            strokeLinecap="round" fill="none" />
      <path d="M 70 96 Q 84 106 86 118" stroke={outfit} strokeWidth="11"
            strokeLinecap="round" fill="none" />

      {/* Hands */}
      <circle cx="12" cy="121" r="8" fill={skin} />
      <circle cx="88" cy="121" r="8" fill={skin} />

      {/* ── Big Peanuts Head ─────────────────── */}
      <circle cx="50" cy="44" r="38" fill={skin} />

      {/* Hair (drawn on top of head) */}
      <Hair style={hairStyle} color={hair} />

      {/* Ears */}
      <ellipse cx="12" cy="44" rx="4" ry="7" fill={skin} />
      <ellipse cx="88" cy="44" rx="4" ry="7" fill={skin} />

      {/* ── Face ─────────────────────────────── */}

      {/* Eyes — Peanuts: solid ovals */}
      <ellipse cx="38" cy="42" rx="5" ry="6" fill="#111" />
      <ellipse cx="62" cy="42" rx="5" ry="6" fill="#111" />

      {/* Eye shine */}
      <circle cx="40.5" cy="39.5" r="2" fill="white" />
      <circle cx="64.5" cy="39.5" r="2" fill="white" />

      {/* Nose — tiny Peanuts button nose */}
      <ellipse cx="50" cy="53" rx="3" ry="2.2" fill="rgba(0,0,0,0.13)" />

      {/* Smile */}
      <path d="M 36 64 Q 50 78 64 64"
            stroke="#1a0a00" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <circle cx="24" cy="56" r="9" fill="#FF6B9D" opacity="0.35" />
      <circle cx="76" cy="56" r="9" fill="#FF6B9D" opacity="0.35" />

    </svg>
  )
}
