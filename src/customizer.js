import Alpine from 'alpinejs'
import { FONTS, loadGoogleFont, ERA_DEFAULT_FONTS } from './fonts.js'
import {
  initScrollReveal,
  revealAboveFold,
  initCounters,
  initNavHighlight,
  initFAQ,
  initMobileNav,
} from './transitions.js'
import { CUSTOMIZER_HTML } from './customizer-html.js'

const PALETTES = {
  electric:  { primary: '#2563ff', secondary: '#0ea5e9', accent: '#7dd3fc', bg: '#f4f8ff', bg2: '#e8f0ff', text: '#0b1735' },
  sunset:    { primary: '#f97316', secondary: '#dc2626', accent: '#fbbf24', bg: '#1b0f0a', bg2: '#2a160f', text: '#fff4ea' },
  forest:    { primary: '#15803d', secondary: '#166534', accent: '#86efac', bg: '#effaf1', bg2: '#dff3e4', text: '#163622' },
  lavender:  { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ddd6fe', bg: '#faf7ff', bg2: '#f1ebff', text: '#4c1d95' },
  rose:      { primary: '#e11d48', secondary: '#be185d', accent: '#fda4af', bg: '#fff1f2', bg2: '#ffe4e6', text: '#4c0519' },
  midnight:  { primary: '#3b82f6', secondary: '#6366f1', accent: '#93c5fd', bg: '#020617', bg2: '#0b1120', text: '#dbeafe' },
  ocean:     { primary: '#0284c7', secondary: '#0f766e', accent: '#67e8f9', bg: '#ecfeff', bg2: '#d7f4fb', text: '#083344' },
  ember:     { primary: '#fb923c', secondary: '#f97316', accent: '#fdba74', bg: '#1f130f', bg2: '#2b1d16', text: '#fff7ed' },
  mint:      { primary: '#14b8a6', secondary: '#10b981', accent: '#99f6e4', bg: '#f0fdfa', bg2: '#ccfbf1', text: '#134e4a' },
  grayscale: { primary: '#475569', secondary: '#334155', accent: '#94a3b8', bg: '#f8fafc', bg2: '#f1f5f9', text: '#0f172a' },
  obsidian:  { primary: '#cbd5e1', secondary: '#475569', accent: '#93c5fd', bg: '#020202', bg2: '#0b0b0f', text: '#e5e7eb' },
  gold:      { primary: '#ca8a04', secondary: '#a16207', accent: '#facc15', bg: '#fff8e1', bg2: '#fef3c7', text: '#422006' },
  toxic:     { primary: '#a3e635', secondary: '#65a30d', accent: '#d9f99d', bg: '#0a1200', bg2: '#132500', text: '#f7fee7' },
  bubblegum: { primary: '#f472b6', secondary: '#ec4899', accent: '#f9a8d4', bg: '#fff1f8', bg2: '#ffe4f1', text: '#6b2148' },
  clay:      { primary: '#b4533d', secondary: '#92400e', accent: '#e7a98d', bg: '#f8ede3', bg2: '#ecd7c3', text: '#4b2e2b' },
  abyss:     { primary: '#0891b2', secondary: '#1d4ed8', accent: '#67e8f9', bg: '#020617', bg2: '#071329', text: '#c4f1ff' },
}

const DEFAULT_COLORS = {
  primary: '#2563eb',
  secondary: '#14b8a6',
  accent: '#60a5fa',
  bg: '#fbfdff',
  bg2: '#f3f7fb',
  surface: '#f3f7fb',
  text: '#0f172a',
}

const PALETTE_OPTIONS = [
  { id: 'electric', label: 'Electric', mode: 'Bright' },
  { id: 'sunset', label: 'Sunset', mode: 'Warm' },
  { id: 'forest', label: 'Forest', mode: 'Organic' },
  { id: 'lavender', label: 'Lavender', mode: 'Soft' },
  { id: 'rose', label: 'Rose', mode: 'Editorial' },
  { id: 'midnight', label: 'Midnight', mode: 'Dark' },
  { id: 'ocean', label: 'Ocean', mode: 'Fresh' },
  { id: 'ember', label: 'Ember', mode: 'Dark' },
  { id: 'mint', label: 'Mint', mode: 'Clean' },
  { id: 'grayscale', label: 'Grayscale', mode: 'Neutral' },
  { id: 'obsidian', label: 'Obsidian', mode: 'Dark' },
  { id: 'gold', label: 'Gold', mode: 'Classic' },
  { id: 'toxic', label: 'Toxic', mode: 'Acid' },
  { id: 'bubblegum', label: 'Bubblegum', mode: 'Pop' },
  { id: 'clay', label: 'Clay', mode: 'Earth' },
  { id: 'abyss', label: 'Abyss', mode: 'Deep' },
].map((option) => ({
  ...option,
  colors: {
    ...PALETTES[option.id],
    surface: PALETTES[option.id].bg2,
  },
}))

const CUSTOM_COLOR_VARS = [
  'color-bg',
  'color-bg-2',
  'color-bg-3',
  'color-surface',
  'color-primary',
  'color-primary-2',
  'color-secondary',
  'color-accent',
  'color-text',
  'color-text-2',
  'color-text-3',
  'color-border',
  'color-border-2',
]

function setVar(name, value) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function normalizeHex(value, fallback = '#000000') {
  const raw = String(value || '').trim()
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toLowerCase()
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    const [, a, b, c] = raw
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase()
  }
  return fallback
}

function hexToRgb(value) {
  const hex = normalizeHex(value)
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  }
}

function rgbToHex({ r, g, b }) {
  const toHex = (channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixHex(base, target, weight) {
  const baseRgb = hexToRgb(base)
  const targetRgb = hexToRgb(target)
  const mix = clamp(weight, 0, 1)
  return rgbToHex({
    r: baseRgb.r + ((targetRgb.r - baseRgb.r) * mix),
    g: baseRgb.g + ((targetRgb.g - baseRgb.g) * mix),
    b: baseRgb.b + ((targetRgb.b - baseRgb.b) * mix),
  })
}

function withAlpha(color, alpha) {
  const { r, g, b } = hexToRgb(color)
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`
}

function isDarkColor(color) {
  const { r, g, b } = hexToRgb(color)
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return brightness < 150
}

function colorValueToHex(value, fallback) {
  const raw = String(value || '').trim()
  if (!raw) return fallback
  if (raw.startsWith('#')) return normalizeHex(raw, fallback)

  const match = raw.match(/rgba?\(([^)]+)\)/i)
  if (!match) return fallback

  const channels = match[1].split(',').slice(0, 3).map((channel) => Number.parseFloat(channel.trim()))
  if (channels.some((channel) => Number.isNaN(channel))) return fallback

  return rgbToHex({ r: channels[0], g: channels[1], b: channels[2] })
}

function buildDerivedColorTokens(colors) {
  const bg = normalizeHex(colors.bg, DEFAULT_COLORS.bg)
  const bg2 = normalizeHex(colors.bg2, DEFAULT_COLORS.bg2)
  const surface = normalizeHex(colors.surface || colors.bg2, bg2)
  const primary = normalizeHex(colors.primary, DEFAULT_COLORS.primary)
  const secondary = normalizeHex(colors.secondary, DEFAULT_COLORS.secondary)
  const accent = normalizeHex(colors.accent, DEFAULT_COLORS.accent)
  const text = normalizeHex(colors.text, DEFAULT_COLORS.text)
  const darkTheme = isDarkColor(bg)
  const shadeTarget = darkTheme ? '#ffffff' : '#000000'

  return {
    'color-bg': bg,
    'color-bg-2': bg2,
    'color-bg-3': mixHex(bg2, text, darkTheme ? 0.08 : 0.06),
    'color-surface': withAlpha(surface, darkTheme ? 0.82 : 0.78),
    'color-primary': primary,
    'color-primary-2': mixHex(primary, shadeTarget, 0.12),
    'color-secondary': secondary,
    'color-accent': accent,
    'color-text': text,
    'color-text-2': mixHex(text, bg, 0.28),
    'color-text-3': mixHex(text, bg, 0.5),
    'color-border': mixHex(bg2, text, darkTheme ? 0.22 : 0.14),
    'color-border-2': mixHex(bg2, primary, 0.28),
  }
}

function getComputedTokens() {
  const style = getComputedStyle(document.documentElement)
  const vars = [
    'color-bg', 'color-bg-2', 'color-bg-3',
    'color-surface',
    'color-primary', 'color-primary-2', 'color-secondary', 'color-accent',
    'color-text', 'color-text-2', 'color-text-3', 'color-border', 'color-border-2',
    'font-heading', 'font-body', 'font-mono', 'font-accent',
    'radius-sm', 'radius-md', 'radius-lg', 'radius-xl',
    'border-w', 'blur-glass', 'dur',
  ]
  const result = {}

  vars.forEach((token) => {
    result[token] = style.getPropertyValue(`--${token}`).trim()
  })

  return result
}

function generateExportCSS(era, tokens) {
  const lines = Object.entries(tokens).map(([key, value]) => `  --${key}: ${value};`)
  return `:root { /* era: ${era} */\n${lines.join('\n')}\n}`
}

function savePrefs(prefs) {
  try {
    localStorage.setItem('chronos-prefs', JSON.stringify(prefs))
  } catch {}
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem('chronos-prefs')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

async function applyEra(era) {
  document.documentElement.setAttribute('data-era', era)
  const eraFonts = ERA_DEFAULT_FONTS[era]
  if (eraFonts) {
    await Promise.all(Object.values(eraFonts).map(loadGoogleFont))
  }
}

async function applyFont(role, fontName) {
  await loadGoogleFont(fontName)
  setVar(`font-${role}`, `'${fontName}', sans-serif`)
}

function syncCustomizerToggle(open) {
  const toggleBtn = document.getElementById('chr-customizer-toggle')
  if (!toggleBtn) return

  toggleBtn.classList.toggle('panel-open', open)
  toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false')
}

function clearCustomColorVars() {
  CUSTOM_COLOR_VARS.forEach((token) => {
    document.documentElement.style.removeProperty(`--${token}`)
  })
}

Alpine.store('chr', {
  open: false,
  activeTab: 'era',
  era: 'modern',
  fonts: { heading: 'Plus Jakarta Sans', body: 'Inter', mono: 'JetBrains Mono', accent: 'Space Grotesk' },
  colors: { ...DEFAULT_COLORS },
  hasCustomFonts: false,
  hasCustomColors: false,
  activePalette: '',
  exportCSS: '',
  exportCopied: false,
  paletteOptions: PALETTE_OPTIONS,

  async init() {
    const saved = loadPrefs()
    if (saved) {
      if (saved.era) {
        this.era = saved.era
        await applyEra(saved.era)
      }

      if (saved.fonts && saved.hasCustomFonts) {
        this.hasCustomFonts = true
        for (const [role, font] of Object.entries(saved.fonts)) {
          this.fonts[role] = font
          await applyFont(role, font)
        }
      }

      if (saved.colors && saved.hasCustomColors) {
        this.hasCustomColors = true
        this.colors = { ...DEFAULT_COLORS, ...saved.colors, surface: saved.colors.surface || saved.colors.bg2 || DEFAULT_COLORS.surface }
        this.applyColorTheme()
      }

      if (saved.activePalette) {
        this.activePalette = saved.activePalette
      }
    }

    this.syncColorInputsFromComputed()
    this.syncToggle()
  },

  setActiveTab(tab) {
    this.activeTab = tab
    if (tab === 'export') this.generateExport()
  },

  async setEra(era) {
    this.era = era
    await applyEra(era)

    clearCustomColorVars()

    ;['heading', 'body', 'mono', 'accent'].forEach((role) => {
      document.documentElement.style.removeProperty(`--font-${role}`)
    })

    const defaults = ERA_DEFAULT_FONTS[era]
    if (defaults) this.fonts = { ...defaults }

    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    this.save()

    window.setTimeout(() => {
      this.syncColorInputsFromComputed()
    }, 50)
  },

  syncColorInputsFromComputed() {
    const style = getComputedStyle(document.documentElement)
    this.colors = {
      primary: colorValueToHex(style.getPropertyValue('--color-primary'), this.colors.primary),
      secondary: colorValueToHex(style.getPropertyValue('--color-secondary'), this.colors.secondary),
      accent: colorValueToHex(style.getPropertyValue('--color-accent'), this.colors.accent),
      bg: colorValueToHex(style.getPropertyValue('--color-bg'), this.colors.bg),
      bg2: colorValueToHex(style.getPropertyValue('--color-bg-2'), this.colors.bg2),
      surface: colorValueToHex(style.getPropertyValue('--color-surface'), this.colors.surface || this.colors.bg2),
      text: colorValueToHex(style.getPropertyValue('--color-text'), this.colors.text),
    }
  },

  applyColorTheme() {
    const tokens = buildDerivedColorTokens(this.colors)
    Object.entries(tokens).forEach(([token, value]) => {
      setVar(token, value)
    })
  },

  setColor(token, value) {
    this.hasCustomColors = true
    this.activePalette = 'custom'
    this.colors[token] = value
    this.applyColorTheme()
    this.save()
  },

  applyPalette(name) {
    const palette = PALETTES[name]
    if (!palette) return

    this.hasCustomColors = true
    this.activePalette = name
    this.colors = { ...this.colors, ...palette, surface: palette.bg2 }
    this.applyColorTheme()
    this.save()
  },

  async setFont(role, fontName) {
    this.hasCustomFonts = true
    this.fonts[role] = fontName
    await applyFont(role, fontName)
    this.save()
  },

  toggle() {
    this.open = !this.open
    this.syncToggle()
  },

  close() {
    this.open = false
    this.syncToggle()
  },

  syncToggle() {
    syncCustomizerToggle(this.open)
  },

  generateExport() {
    this.exportCSS = generateExportCSS(this.era, getComputedTokens())
  },

  async copyExport() {
    this.generateExport()
    try {
      await navigator.clipboard.writeText(this.exportCSS)
      this.exportCopied = true
      window.setTimeout(() => {
        this.exportCopied = false
      }, 2500)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = this.exportCSS
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.exportCopied = true
      window.setTimeout(() => {
        this.exportCopied = false
      }, 2500)
    }
  },

  save() {
    savePrefs({
      era: this.era,
      fonts: this.fonts,
      colors: this.colors,
      hasCustomFonts: this.hasCustomFonts,
      hasCustomColors: this.hasCustomColors,
      activePalette: this.activePalette,
    })
  },

  async reset() {
    this.era = 'modern'
    this.activeTab = 'era'
    this.hasCustomFonts = false
    this.hasCustomColors = false
    this.activePalette = ''
    this.colors = { ...DEFAULT_COLORS }
    this.fonts = { heading: 'Plus Jakarta Sans', body: 'Inter', mono: 'JetBrains Mono', accent: 'Space Grotesk' }

    document.documentElement.removeAttribute('style')
    document.documentElement.setAttribute('data-era', 'modern')
    await applyEra('modern')
    this.syncColorInputsFromComputed()
    localStorage.removeItem('chronos-prefs')
    this.generateExport()
  },
})

const ALL_FONTS_FLAT = Object.values(FONTS).flat().sort()

Alpine.data('chrFontDropdown', (role) => ({
  open: false,
  search: '',
  get filtered() {
    if (!this.search) return ALL_FONTS_FLAT
    const query = this.search.toLowerCase()
    return ALL_FONTS_FLAT.filter((font) => font.toLowerCase().includes(query))
  },
  selectFont(font) {
    this.$store.chr.setFont(role, font)
    this.open = false
    this.search = ''
  },
  toggle() {
    this.open = !this.open
    if (this.open) {
      window.setTimeout(() => this.$refs.search.focus(), 50)
    }
  },
}))

window.Alpine = Alpine

document.addEventListener('DOMContentLoaded', () => {
  const prefs = loadPrefs()
  if (prefs?.era) {
    document.documentElement.setAttribute('data-era', prefs.era)
  }

  const mount = document.getElementById('chr-customizer-mount')
  if (mount) {
    mount.innerHTML = CUSTOMIZER_HTML
  }

  Alpine.start()
  syncCustomizerToggle(false)
  initScrollReveal()
  revealAboveFold()
  initCounters()
  initNavHighlight()
  initFAQ()
  initMobileNav()
})
