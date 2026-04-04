import JSZip from 'jszip'

import packageJsonRaw from '../package.json?raw'
import packageLockRaw from '../package-lock.json?raw'
import gitignoreRaw from '../.gitignore?raw'
import styleRaw from './style.css?raw'
import mainRaw from './main.js?raw'
import customizerRaw from './customizer.js?raw'
import customizerHtmlRaw from './customizer-html.js?raw'
import fontsRaw from './fonts.js?raw'
import transitionsRaw from './transitions.js?raw'
import faviconRaw from '../public/favicon.svg?raw'
import iconsRaw from '../public/icons.svg?raw'
import layout01Raw from '../layout-01.html?raw'
import layout02Raw from '../layout-02.html?raw'
import layout03Raw from '../layout-03.html?raw'
import layout04Raw from '../layout-04.html?raw'
import layout05Raw from '../layout-05.html?raw'
import layout06Raw from '../layout-06.html?raw'
import layout07Raw from '../layout-07.html?raw'
import layout08Raw from '../layout-08.html?raw'
import layout09Raw from '../layout-09.html?raw'
import layout10Raw from '../layout-10.html?raw'
import layout11Raw from '../layout-11.html?raw'
import layout12Raw from '../layout-12.html?raw'
import layout13Raw from '../layout-13.html?raw'
import layout14Raw from '../layout-14.html?raw'
import layout15Raw from '../layout-15.html?raw'

export const LAYOUT_PACKAGE_OPTIONS = [
  { file: 'layout-01.html', short: 'L01', label: 'SaaS Landing Page' },
  { file: 'layout-02.html', short: 'L02', label: 'Creative Portfolio' },
  { file: 'layout-03.html', short: 'L03', label: 'Editorial Feed' },
  { file: 'layout-04.html', short: 'L04', label: 'Text Manuscript' },
  { file: 'layout-05.html', short: 'L05', label: 'Web App Dashboard' },
  { file: 'layout-06.html', short: 'L06', label: 'Artistic Showcase' },
  { file: 'layout-07.html', short: 'L07', label: 'Launch Page' },
  { file: 'layout-08.html', short: 'L08', label: 'Minimal Journal' },
  { file: 'layout-09.html', short: 'L09', label: 'Cyberpunk Agency' },
  { file: 'layout-10.html', short: 'L10', label: 'Institutional Archive' },
  { file: 'layout-11.html', short: 'L11', label: 'Enterprise Business' },
  { file: 'layout-12.html', short: 'L12', label: 'Medical Care' },
  { file: 'layout-13.html', short: 'L13', label: 'Education Campus' },
  { file: 'layout-14.html', short: 'L14', label: 'Travel Explorer' },
  { file: 'layout-15.html', short: 'L15', label: 'Social Community' },
]

const LAYOUT_HTML = {
  'layout-01.html': layout01Raw,
  'layout-02.html': layout02Raw,
  'layout-03.html': layout03Raw,
  'layout-04.html': layout04Raw,
  'layout-05.html': layout05Raw,
  'layout-06.html': layout06Raw,
  'layout-07.html': layout07Raw,
  'layout-08.html': layout08Raw,
  'layout-09.html': layout09Raw,
  'layout-10.html': layout10Raw,
  'layout-11.html': layout11Raw,
  'layout-12.html': layout12Raw,
  'layout-13.html': layout13Raw,
  'layout-14.html': layout14Raw,
  'layout-15.html': layout15Raw,
}

const DEFAULT_FALLBACK_PACKAGE = 'chronos-custom-site'

export function sanitizePackageName(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
    || DEFAULT_FALLBACK_PACKAGE
}

export function sanitizeArchiveName(value) {
  return String(value || '')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    || DEFAULT_FALLBACK_PACKAGE
}

export function getCurrentLayoutFile() {
  const current = window.location.pathname.split('/').pop()?.toLowerCase() || ''
  return LAYOUT_HTML[current] ? current : ''
}

function stripMarkedBlocks(source, startMarker, endMarker) {
  const pattern = new RegExp(`\\s*.*${escapeRegExp(startMarker)}[\\s\\S]*?${escapeRegExp(endMarker)}.*\\n?`, 'g')
  return source.replace(pattern, '')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildThemeLiteral(theme) {
  return `const DEFAULT_THEME = ${JSON.stringify(theme, null, 2)}`
}

function buildStorageKey(slug) {
  return `${slug}-prefs`
}

function rewriteCustomizerSource(theme, { keepCustomizer, storageKey }) {
  let source = customizerRaw

  source = stripMarkedBlocks(source, '// DOWNLOAD_FEATURE_START', '// DOWNLOAD_FEATURE_END')
  source = source.replace(/const PREFS_KEY = 'chronos-prefs'/, `const PREFS_KEY = '${storageKey}'`)
  source = source.replace(/const CUSTOMIZER_ENABLED = true/, `const CUSTOMIZER_ENABLED = ${keepCustomizer ? 'true' : 'false'}`)
  source = source.replace(
    /\/\/ EXPORT_DEFAULT_THEME_START[\s\S]*?\/\/ EXPORT_DEFAULT_THEME_END/,
    `// EXPORT_DEFAULT_THEME_START\n${buildThemeLiteral(theme)}\n// EXPORT_DEFAULT_THEME_END`
  )

  return source
}

function rewriteCustomizerHtml() {
  let source = customizerHtmlRaw

  source = stripMarkedBlocks(source, '<!-- DOWNLOAD_TAB_START -->', '<!-- DOWNLOAD_TAB_END -->')
  source = stripMarkedBlocks(source, '<!-- DOWNLOAD_PANEL_START -->', '<!-- DOWNLOAD_PANEL_END -->')
  source = stripMarkedBlocks(source, '<!-- LAYOUTS_TAB_START -->', '<!-- LAYOUTS_TAB_END -->')
  source = stripMarkedBlocks(source, '<!-- LAYOUTS_PANEL_START -->', '<!-- LAYOUTS_PANEL_END -->')
  source = source.replace(
    'Preview styles, then download a ready-to-run layout package.',
    'Live theme controls for this exported layout.'
  )

  return source
}

function rewriteRootHtml(html, { era, keepCustomizer, storageKey }) {
  let result = html

  result = result.replace(/data-era="[^"]+"/, `data-era="${era}"`)
  result = result.replace(/href=(["'])layout-\d{2}\.html\1/g, 'href="index.html"')

  if (keepCustomizer) {
    result = result.replace(/localStorage\.getItem\('chronos-prefs'\)/g, `localStorage.getItem('${storageKey}')`)
  } else {
    result = result.replace(/<script>[\s\S]*?localStorage\.getItem\('chronos-prefs'\)[\s\S]*?<\/script>\s*/i, '')
    result = result.replace(/\s*<div id="chr-customizer-mount"><\/div>\s*/g, '\n')
  }

  return result
}

function rewritePackageJson(name) {
  const json = JSON.parse(packageJsonRaw)
  json.name = name
  if (json.dependencies?.jszip) {
    delete json.dependencies.jszip
  }
  return `${JSON.stringify(json, null, 2)}\n`
}

function rewritePackageLock(name) {
  const json = JSON.parse(packageLockRaw)
  json.name = name
  if (json.packages?.['']) {
    json.packages[''].name = name
    if (json.packages[''].dependencies?.jszip) {
      delete json.packages[''].dependencies.jszip
    }
  }
  return `${JSON.stringify(json, null, 2)}\n`
}

function buildViteConfig() {
  return `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
`
}

function buildReadme({ packageTitle, layoutLabel, keepCustomizer }) {
  return `# ${packageTitle}

This package contains the exported ${layoutLabel} layout from Chronos v2.

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Included

- Single exported layout as \`index.html\`
- Shared Chronos source files required for the layout
- Theme defaults baked into the project from the customizer state
- ${keepCustomizer ? 'Live customizer included for further adjustments' : 'Customizer removed for a cleaner final package'}

## Notes

- The downloaded package is source-first and runs through Vite.
- Update the exported content, links, and demo actions as needed for your own project.
`
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function downloadCustomizedPackage({ packageName, layoutFile, keepCustomizer, theme }) {
  const slug = sanitizePackageName(packageName)
  const archiveName = sanitizeArchiveName(packageName)
  const selectedLayout = LAYOUT_PACKAGE_OPTIONS.find((option) => option.file === layoutFile) || LAYOUT_PACKAGE_OPTIONS[0]
  const html = LAYOUT_HTML[selectedLayout.file]

  if (!html) {
    throw new Error('The selected layout could not be packaged.')
  }

  const storageKey = buildStorageKey(slug)
  const zip = new JSZip()

  zip.file('index.html', rewriteRootHtml(html, { era: theme.era, keepCustomizer, storageKey }))
  zip.file('package.json', rewritePackageJson(slug))
  zip.file('package-lock.json', rewritePackageLock(slug))
  zip.file('vite.config.js', buildViteConfig())
  zip.file('.gitignore', gitignoreRaw)
  zip.file('README.md', buildReadme({ packageTitle: archiveName, layoutLabel: selectedLayout.label, keepCustomizer }))
  zip.file('src/style.css', styleRaw)
  zip.file('src/main.js', mainRaw)
  zip.file('src/fonts.js', fontsRaw)
  zip.file('src/transitions.js', transitionsRaw)
  zip.file('src/customizer.js', rewriteCustomizerSource(theme, { keepCustomizer, storageKey }))
  zip.file('src/customizer-html.js', rewriteCustomizerHtml())
  zip.file('public/favicon.svg', faviconRaw)
  zip.file('public/icons.svg', iconsRaw)

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, `${archiveName}.zip`)
}
