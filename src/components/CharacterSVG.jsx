const SKIN_MAP = {
  fair: '#FEDDBC',
  light: '#F5C5A3',
  medium: '#D4915A',
  tan: '#C68642',
  brown: '#8D5524',
  dark: '#3D2B1F',
}

const HAIR_MAP = {
  blonde: '#F7DC6F',
  brown: '#6E2C00',
  black: '#212121',
  red: '#E74C3C',
  auburn: '#784212',
  pink: '#F48FB1',
}

export default function CharacterSVG({ skinTone = 'fair', hairColor = 'brown', outfitColor = '#74B9FF', gender = 'girl' }) {
  const skin = SKIN_MAP[skinTone] || SKIN_MAP.fair
  const hair = HAIR_MAP[hairColor] || HAIR_MAP.brown
  const outfit = outfitColor || '#74B9FF'
  const isGirl = gender === 'girl'

  return (
    <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
      {/* Ground shadow */}
      <ellipse cx="60" cy="156" rx="32" ry="6" fill="rgba(0,0,0,0.08)" />

      {/* Legs */}
      <rect x="36" y="108" width="18" height="30" rx="8" fill="#A0C4E8" />
      <rect x="66" y="108" width="18" height="30" rx="8" fill="#A0C4E8" />

      {/* Shoes */}
      <ellipse cx="45" cy="140" rx="12" ry="7" fill="#E74C3C" />
      <ellipse cx="75" cy="140" rx="12" ry="7" fill="#E74C3C" />

      {/* Skirt / Pants bottom */}
      {isGirl ? (
        <path d="M 28 102 Q 35 130 60 128 Q 85 130 92 102 Z" fill={outfit} opacity="0.85" />
      ) : null}

      {/* Body / Shirt */}
      <path d="M 30 72 Q 26 90 28 108 L 92 108 Q 94 90 90 72 Q 75 84 60 84 Q 45 84 30 72 Z" fill={outfit} />

      {/* Collar area */}
      <path d="M 46 72 Q 60 80 74 72 L 68 68 Q 60 74 52 68 Z" fill="white" opacity="0.4" />

      {/* Left arm */}
      <path d="M 30 75 Q 14 88 18 106 Q 21 112 26 110 Q 23 98 32 88 Z" fill={outfit} />
      {/* Right arm */}
      <path d="M 90 75 Q 106 88 102 106 Q 99 112 94 110 Q 97 98 88 88 Z" fill={outfit} />

      {/* Left hand */}
      <circle cx="19" cy="111" r="7" fill={skin} />
      {/* Right hand */}
      <circle cx="101" cy="111" r="7" fill={skin} />

      {/* Neck */}
      <rect x="50" y="64" width="20" height="16" rx="6" fill={skin} />

      {/* Hair back (long for girl) */}
      {isGirl ? (
        <ellipse cx="60" cy="50" rx="30" ry="32" fill={hair} />
      ) : (
        <ellipse cx="60" cy="44" rx="28" ry="22" fill={hair} />
      )}

      {/* Head */}
      <ellipse cx="60" cy="46" rx="26" ry="28" fill={skin} />

      {/* Ears */}
      <ellipse cx="33" cy="48" rx="5" ry="7" fill={skin} />
      <ellipse cx="87" cy="48" rx="5" ry="7" fill={skin} />
      <ellipse cx="33" cy="48" rx="3" ry="5" fill={skin} style={{ filter: 'brightness(0.9)' }} />
      <ellipse cx="87" cy="48" rx="3" ry="5" fill={skin} style={{ filter: 'brightness(0.9)' }} />

      {/* Eyes whites */}
      <ellipse cx="50" cy="44" rx="5" ry="5.5" fill="white" />
      <ellipse cx="70" cy="44" rx="5" ry="5.5" fill="white" />

      {/* Iris */}
      <circle cx="51" cy="45" r="3.2" fill="#4A3728" />
      <circle cx="71" cy="45" r="3.2" fill="#4A3728" />

      {/* Pupils */}
      <circle cx="51.5" cy="45" r="1.8" fill="#1a1a1a" />
      <circle cx="71.5" cy="45" r="1.8" fill="#1a1a1a" />

      {/* Eye shine */}
      <circle cx="52.5" cy="43.5" r="1" fill="white" />
      <circle cx="72.5" cy="43.5" r="1" fill="white" />

      {/* Eyebrows */}
      <path d="M 46 38 Q 50 36 54 38" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 66 38 Q 70 36 74 38" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M 58 52 Q 60 56 62 52" stroke={skin} strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ filter: 'brightness(0.82)' }} />

      {/* Smile */}
      <path d="M 51 58 Q 60 66 69 58" stroke="#C0705A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <circle cx="38" cy="55" r="6" fill="#FFB3BA" opacity="0.55" />
      <circle cx="82" cy="55" r="6" fill="#FFB3BA" opacity="0.55" />

      {/* Hair front / bangs */}
      {isGirl ? (
        <>
          <path d="M 34 38 Q 40 18 60 16 Q 80 18 86 38" fill={hair} />
          <path d="M 34 38 Q 32 50 35 56" fill={hair} />
          <path d="M 86 38 Q 88 50 85 56" fill={hair} />
        </>
      ) : (
        <path d="M 34 36 Q 40 16 60 14 Q 80 16 86 36 Q 80 28 60 26 Q 40 28 34 36 Z" fill={hair} />
      )}

      {/* Hair accessory for girl */}
      {isGirl && (
        <circle cx="78" cy="28" r="5" fill="#FF6B9D" />
      )}

      {/* Small heart on shirt */}
      <path d="M 57 90 Q 60 86 63 90 Q 66 94 60 98 Q 54 94 57 90 Z" fill="white" opacity="0.5" />
    </svg>
  )
}
