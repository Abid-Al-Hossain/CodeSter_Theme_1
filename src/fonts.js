// fonts.js — 65+ Curated Google Fonts manifest

export const FONTS = {
  'Sans-Serif': [
    'DM Sans', 'Exo 2', 'Figtree', 'Geist', 'Inter', 'Josefin Sans', 'Karla',
    'Lexend', 'Manrope', 'Mulish', 'Nunito', 'Outfit', 'Plus Jakarta Sans',
    'Poppins', 'Public Sans', 'Raleway', 'Rubik', 'Sora', 'Space Grotesk', 'Work Sans'
  ],
  'Serif': [
    'Bitter', 'Cormorant Garamond', 'Crimson Pro', 'Domine', 'EB Garamond',
    'Libre Baskerville', 'Lora', 'Merriweather', 'Noto Serif', 'Playfair Display',
    'Source Serif 4', 'Spectral'
  ],
  'Display': [
    'Anton', 'Archivo Black', 'Barlow Condensed', 'Bebas Neue', 'Big Shoulders Display',
    'Changa', 'Exo', 'Oswald', 'Readex Pro', 'Syne', 'Teko', 'Unbounded'
  ],
  'Gothic / Historic': [
    'Almendra', 'Cinzel', 'MedievalSharp', 'Uncial Antiqua', 'UnifrakturMaguntia'
  ],
  'Futuristic / Tech': [
    'Audiowide', 'Electrolize', 'Iceland', 'Orbitron', 'Rajdhani', 'Space Mono', 'Tektur'
  ],
  'Monospace': [
    'Courier Prime', 'DM Mono', 'Fira Code', 'IBM Plex Mono', 'Inconsolata',
    'JetBrains Mono', 'Roboto Mono', 'Source Code Pro', 'Space Mono'
  ],
  'Handwriting': [
    'Caveat', 'Dancing Script', 'Pacifico', 'Sacramento'
  ]
}

// Track which fonts are already loaded
const loadedFonts = new Set()

/**
 * Dynamically loads a Google Font if not already loaded.
 */
export function loadGoogleFont(name) {
  if (loadedFonts.has(name)) return Promise.resolve()

  const encoded = name.replace(/ /g, '+')
  const href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800;900&display=swap`

  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => { loadedFonts.add(name); resolve() }
    link.onerror = () => resolve() // Fail silently
    document.head.appendChild(link)
  })
}

/**
 * Preload fonts for the active era
 */
export const ERA_DEFAULT_FONTS = {
  modern:     { heading: 'Outfit', body: 'Inter', mono: 'JetBrains Mono', accent: 'Syne' },
  gothic:     { heading: 'Cinzel', body: 'Crimson Pro', mono: 'UnifrakturMaguntia', accent: 'UnifrakturMaguntia' },
  futuristic: { heading: 'Space Grotesk', body: 'Plus Jakarta Sans', mono: 'Space Mono', accent: 'Orbitron' },
  retro:      { heading: 'Playfair Display', body: 'Crimson Pro', mono: 'Inconsolata', accent: 'EB Garamond' },
  cyberpunk:  { heading: 'Orbitron', body: 'Tektur', mono: 'Space Mono', accent: 'Audiowide' },
  brutalist:  { heading: 'Archivo Black', body: 'Barlow Condensed', mono: 'Fira Code', accent: 'Oswald' },
  minimalist: { heading: 'Outfit', body: 'Inter', mono: 'DM Mono', accent: 'Syne' },
  eco:        { heading: 'Sora', body: 'DM Sans', mono: 'Source Code Pro', accent: 'Nunito' },
  corporate:  { heading: 'Manrope', body: 'Inter', mono: 'IBM Plex Mono', accent: 'Work Sans' },
  artistic:   { heading: 'Unbounded', body: 'Syne', mono: 'Fira Code', accent: 'Anton' },
}
