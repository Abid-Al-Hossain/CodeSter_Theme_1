// customizer.js — Chronos v2 Real-Time Customizer Engine
import Alpine from 'alpinejs'
import { FONTS, loadGoogleFont, ERA_DEFAULT_FONTS } from './fonts.js'
import { initScrollReveal, revealAboveFold, initCounters, initNavHighlight, initFAQ, initMobileNav } from './transitions.js'
import { CUSTOMIZER_HTML } from './customizer-html.js'


// ── Preset Color Palettes ──────────────────────────────────
const PALETTES = {
  electric:   { primary: '#2563eb', secondary: '#4f46e5', accent: '#38bdf8', bg: '#ffffff', bg2: '#f8fafc', text: '#0f172a' },
  sunset:     { primary: '#ea580c', secondary: '#dc2626', accent: '#fbbf24', bg: '#0f0a05', bg2: '#1a100a', text: '#fff7ed' },
  forest:     { primary: '#16a34a', secondary: '#15803d', accent: '#86efac', bg: '#f0fdf4', bg2: '#dcfce7', text: '#14532d' },
  lavender:   { primary: '#7c3aed', secondary: '#9333ea', accent: '#c4b5fd', bg: '#faf5ff', bg2: '#f3e8ff', text: '#3b0764' },
  rose:       { primary: '#e11d48', secondary: '#be185d', accent: '#fda4af', bg: '#fff1f2', bg2: '#ffe4e6', text: '#4c0519' },
  midnight:   { primary: '#818cf8', secondary: '#a5b4fc', accent: '#c7d2fe', bg: '#020617', bg2: '#0f172a', text: '#e0e7ff' },
  ocean:      { primary: '#0ea5e9', secondary: '#0284c7', accent: '#38bdf8', bg: '#f0f9ff', bg2: '#e0f2fe', text: '#0c4a6e' },
  ember:      { primary: '#f59e0b', secondary: '#ea580c', accent: '#fcd34d', bg: '#1c1917', bg2: '#292524', text: '#fffbeb' },
  mint:       { primary: '#10b981', secondary: '#059669', accent: '#34d399', bg: '#ffffff', bg2: '#ecfdf5', text: '#064e3b' },
  grayscale:  { primary: '#475569', secondary: '#334155', accent: '#94a3b8', bg: '#f8fafc', bg2: '#f1f5f9', text: '#0f172a' },
  obsidian:   { primary: '#94a3b8', secondary: '#64748b', accent: '#cbd5e1', bg: '#050505', bg2: '#111111', text: '#f1f5f9' },
  gold:       { primary: '#d97706', secondary: '#b45309', accent: '#fcd34d', bg: '#fffbeb', bg2: '#fef3c7', text: '#451a03' },
  toxic:      { primary: '#84cc16', secondary: '#65a30d', accent: '#bef264', bg: '#052e16', bg2: '#064e3b', text: '#f7fee7' },
  bubblegum:  { primary: '#d946ef', secondary: '#c026d3', accent: '#f0abfc', bg: '#fdf4ff', bg2: '#fae8ff', text: '#4a044e' },
  clay:       { primary: '#8a3a2b', secondary: '#702d22', accent: '#cd5c5c', bg: '#f5ebe0', bg2: '#edddcd', text: '#3b2f2f' },
  abyss:      { primary: '#22d3ee', secondary: '#06b6d4', accent: '#67e8f9', bg: '#000814', bg2: '#001d3d', text: '#cffafe' }
}

// ── Build font <select> options HTML ──────────────────────
function buildFontOptions(selected = '') {
  return Object.entries(FONTS).map(([group, fonts]) =>
    `<optgroup label="${group}">` +
    fonts.map(f =>
      `<option value="${f}"${f === selected ? ' selected' : ''}>${f}</option>`
    ).join('') +
    '</optgroup>'
  ).join('')
}

// ── Apply a CSS variable to :root ────────────────────────
function setVar(name, value) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

// ── Read all current :root custom properties ──────────────
function getComputedTokens() {
  const style = getComputedStyle(document.documentElement)
  const vars = [
    'color-bg', 'color-bg-2', 'color-bg-3',
    'color-primary', 'color-primary-2', 'color-secondary', 'color-accent',
    'color-text', 'color-text-2', 'color-text-3', 'color-border',
    'font-heading', 'font-body', 'font-mono', 'font-accent',
    'radius-sm', 'radius-md', 'radius-lg', 'radius-xl',
    'border-w', 'blur-glass', 'dur'
  ]
  const result = {}
  vars.forEach(v => {
    result[v] = style.getPropertyValue(`--${v}`).trim()
  })
  return result
}

// ── Generate export CSS string ─────────────────────────────
function generateExportCSS(era, tokens) {
  const lines = Object.entries(tokens).map(([k, v]) => `  --${k}: ${v};`)
  return `:root { /* era: ${era} */\n${lines.join('\n')}\n}`
}

// ── Save preferences to localStorage ─────────────────────
function savePrefs(prefs) {
  try { localStorage.setItem('chronos-prefs', JSON.stringify(prefs)) } catch {}
}

// ── Load preferences from localStorage ───────────────────
function loadPrefs() {
  try {
    const raw = localStorage.getItem('chronos-prefs')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

// ── Apply era (sets data-era on html) ─────────────────────
async function applyEra(era) {
  document.documentElement.setAttribute('data-era', era)
  // Preload era fonts
  const eraFonts = ERA_DEFAULT_FONTS[era]
  if (eraFonts) {
    await Promise.all(Object.values(eraFonts).map(loadGoogleFont))
  }
}

// ── Apply font to a token ─────────────────────────────────
async function applyFont(role, fontName) {
  await loadGoogleFont(fontName)
  setVar(`font-${role}`, `'${fontName}', sans-serif`)
}

// ── Alpine store setup ────────────────────────────────────
Alpine.store('chr', {
  // State
  open: false,
  activeTab: 'era',
  era: 'modern',
  fonts: { heading: 'Outfit', body: 'Inter', mono: 'JetBrains Mono', accent: 'Syne' },
  colors: { primary: '#2563eb', secondary: '#6366f1', accent: '#38bdf8', bg: '#ffffff', bg2: '#f8fafc', text: '#0f172a' },
  hasCustomFonts: false,
  hasCustomColors: false,
  activePalette: '',
  exportCSS: '',
  exportCopied: false,

  async init() {
    // Restore saved preferences (FOUC prevention already handled in <head>)
    const saved = loadPrefs()
    if (saved) {
      if (saved.era) { this.era = saved.era; await applyEra(saved.era) }
      if (saved.fonts && saved.hasCustomFonts) {
        this.hasCustomFonts = true
        for (const [role, font] of Object.entries(saved.fonts)) {
          this.fonts[role] = font
          await applyFont(role, font)
        }
      }
      if (saved.colors && saved.hasCustomColors) {
        this.hasCustomColors = true
        for (const [token, value] of Object.entries(saved.colors)) {
          this.colors[token] = value
          this.applyColorToken(token, value)
        }
      }
      if (saved.activePalette) {
        this.activePalette = saved.activePalette
      }
    }
  },

  // ── Era switch ──────────────────────────────────────────
  async setEra(era) {
    this.era = era
    await applyEra(era)
    
    // Clear inline custom tokens on :root so the raw era CSS applies
    Object.values(this.colorTokenMap).forEach(vars => {
      vars.forEach(v => document.documentElement.style.removeProperty(`--${v}`))
    })
    ['heading', 'body', 'mono', 'accent'].forEach(role => {
      document.documentElement.style.removeProperty(`--font-${role}`)
    })

    // Sync font pickers to era defaults
    const defaults = ERA_DEFAULT_FONTS[era]
    if (defaults) {
      this.fonts = { ...defaults }
      // Update selects
      document.querySelectorAll('.chr-font-select').forEach(sel => {
        const role = sel.dataset.role
        if (defaults[role]) sel.value = defaults[role]
      })
    }
    
    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    this.save()

    // Read computed colors after a small delay to sync color pickers
    setTimeout(() => {
      const style = getComputedStyle(document.documentElement)
      this.colors.primary   = style.getPropertyValue('--color-primary').trim()
      this.colors.secondary = style.getPropertyValue('--color-secondary').trim()
      this.colors.accent    = style.getPropertyValue('--color-accent').trim()
      this.colors.bg        = style.getPropertyValue('--color-bg').trim()
      this.colors.bg2       = style.getPropertyValue('--color-bg-2').trim()
      this.colors.text      = style.getPropertyValue('--color-text').trim()
    }, 50)
  },

  // ── Color change token map ───────────────────────────────
  colorTokenMap: {
    primary:   ['color-primary'],
    secondary: ['color-secondary'],
    accent:    ['color-accent'],
    bg:        ['color-bg'],
    bg2:       ['color-bg-2'],
    text:      ['color-text'],
  },

  applyColorToken(token, value) {
    const vars = this.colorTokenMap[token]
    if (vars) vars.forEach(v => setVar(v, value))
  },

  setColor(token, value) {
    this.hasCustomColors = true
    this.activePalette = 'custom'
    this.colors[token] = value
    this.applyColorToken(token, value)
    this.save()
  },

  // ── Apply a preset palette ───────────────────────────────
  applyPalette(name) {
    const palette = PALETTES[name]
    if (!palette) return
    this.hasCustomColors = true
    this.activePalette = name
    Object.entries(palette).forEach(([token, value]) => {
      this.colors[token] = value
      this.applyColorToken(token, value)
    })
    this.save()
  },

  // ── Font change ─────────────────────────────────────────
  async setFont(role, fontName) {
    this.hasCustomFonts = true
    this.fonts[role] = fontName
    await applyFont(role, fontName)
    this.save()
  },

  // ── Toggle panel ────────────────────────────────────────
  toggle() {
    this.open = !this.open
    const toggleBtn = document.getElementById('chr-customizer-toggle')
    if (toggleBtn) toggleBtn.classList.toggle('panel-open', this.open)
  },

  close() {
    this.open = false
    document.getElementById('chr-customizer-toggle')?.classList.remove('panel-open')
  },

  // ── Export ──────────────────────────────────────────────
  generateExport() {
    const tokens = getComputedTokens()
    this.exportCSS = generateExportCSS(this.era, tokens)
  },

  async copyExport() {
    this.generateExport()
    try {
      await navigator.clipboard.writeText(this.exportCSS)
      this.exportCopied = true
      setTimeout(() => { this.exportCopied = false }, 2500)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = this.exportCSS
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      this.exportCopied = true
      setTimeout(() => { this.exportCopied = false }, 2500)
    }
  },

  // ── Save to localStorage ─────────────────────────────────
  save() {
    savePrefs({ 
      era: this.era, 
      fonts: this.fonts, 
      colors: this.colors,
      hasCustomFonts: this.hasCustomFonts,
      hasCustomColors: this.hasCustomColors,
      activePalette: this.activePalette
    })
  },

  // ── Reset to defaults ────────────────────────────────────
  async reset() {
    this.era = 'modern'
    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    this.colors = { primary: '#2563eb', secondary: '#6366f1', accent: '#38bdf8', bg: '#ffffff', bg2: '#f8fafc', text: '#0f172a' }
    this.fonts = { heading: 'Outfit', body: 'Inter', mono: 'JetBrains Mono', accent: 'Syne' }
    await applyEra('modern')
    Object.entries(this.colors).forEach(([t, v]) => this.applyColorToken(t, v))
    Object.entries(this.fonts).forEach(([r, f]) => applyFont(r, f))
    document.documentElement.removeAttribute('style')
    document.documentElement.setAttribute('data-era', 'modern')
    localStorage.removeItem('chronos-prefs')
  }
})

// ── Font Dropdown Alpine Component ──────────────────────────
const ALL_FONTS_FLAT = Object.values(FONTS).flat().sort()

Alpine.data('chrFontDropdown', (role) => ({
  open: false,
  search: '',
  get filtered() {
    if (!this.search) return ALL_FONTS_FLAT
    const s = this.search.toLowerCase()
    return ALL_FONTS_FLAT.filter(f => f.toLowerCase().includes(s))
  },
  selectFont(font) {
    this.$store.chr.setFont(role, font)
    this.open = false
    this.search = ''
  },
  toggle() {
    this.open = !this.open
    if (this.open) {
      setTimeout(() => this.$refs.search.focus(), 50)
    }
  }
}))

// ── Main init ─────────────────────────────────────────────
window.Alpine = Alpine

document.addEventListener('DOMContentLoaded', () => {
  // FOUC: restore era before paint
  const prefs = loadPrefs()
  if (prefs?.era) {
    document.documentElement.setAttribute('data-era', prefs.era)
  }

  // Inject customizer panel HTML into mount point
  const mount = document.getElementById('chr-customizer-mount')
  if (mount) {
    mount.innerHTML = CUSTOMIZER_HTML
  }

  Alpine.start()
  initScrollReveal()
  revealAboveFold()
  initCounters()
  initNavHighlight()
  initFAQ()
  initMobileNav()
})
