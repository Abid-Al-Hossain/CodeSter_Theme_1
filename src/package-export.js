import JSZip from 'jszip'

import packageJsonRaw from '../package.json?raw'
import styleRaw from './style.css?raw'
import mainRaw from './main.js?raw'
import customizerRaw from './customizer.js?raw'
import customizerHtmlRaw from './customizer-html.js?raw'
import fontsRaw from './fonts.js?raw'
import transitionsRaw from './transitions.js?raw'
import packageNameUtilsRaw from './package-name-utils.js?raw'
import faviconRaw from './export-assets/favicon.svg?raw'
import iconsRaw from './export-assets/icons.svg?raw'
import themeBootRaw from '../public/theme-boot.js?raw'
import { sanitizePackageName, sanitizeArchiveName } from './package-name-utils.js'
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
import layout16Raw from '../layout-16.html?raw'
import layout17Raw from '../layout-17.html?raw'
import layout18Raw from '../layout-18.html?raw'
import layout19Raw from '../layout-19.html?raw'
import layout20Raw from '../layout-20.html?raw'

const EXPORT_GITIGNORE = `node_modules
dist
dist-ssr
*.local
*.log
.DS_Store
`

export const LAYOUT_PACKAGE_OPTIONS = [
  { file: 'layout-01.html', short: 'L01', label: 'Modern SaaS Landing' },
  { file: 'layout-02.html', short: 'L02', label: 'Creative Portfolio' },
  { file: 'layout-03.html', short: 'L03', label: 'Editorial Feed' },
  { file: 'layout-04.html', short: 'L04', label: 'Text Manuscript' },
  { file: 'layout-05.html', short: 'L05', label: 'Web App Dashboard' },
  { file: 'layout-06.html', short: 'L06', label: 'Artistic Showcase' },
  { file: 'layout-07.html', short: 'L07', label: 'Futuristic Launch' },
  { file: 'layout-08.html', short: 'L08', label: 'Minimal Journal' },
  { file: 'layout-09.html', short: 'L09', label: 'Cyberpunk Agency' },
  { file: 'layout-10.html', short: 'L10', label: 'Gothic Archive' },
  { file: 'layout-11.html', short: 'L11', label: 'Enterprise Business' },
  { file: 'layout-12.html', short: 'L12', label: 'Medical Care' },
  { file: 'layout-13.html', short: 'L13', label: 'Education Campus' },
  { file: 'layout-14.html', short: 'L14', label: 'Travel Explorer' },
  { file: 'layout-15.html', short: 'L15', label: 'Social Community' },
  { file: 'layout-16.html', short: 'L16', label: 'Jurassic Museum' },
  { file: 'layout-17.html', short: 'L17', label: 'Pixelated Desktop' },
  { file: 'layout-18.html', short: 'L18', label: 'Glacier Expeditions' },
  { file: 'layout-19.html', short: 'L19', label: 'Geothermic Console' },
  { file: 'layout-20.html', short: 'L20', label: 'The Grand Library' },
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
  'layout-16.html': layout16Raw,
  'layout-17.html': layout17Raw,
  'layout-18.html': layout18Raw,
  'layout-19.html': layout19Raw,
  'layout-20.html': layout20Raw,
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

function buildThemeBootScript({ storageKey, theme, useStorage }) {
  return `<script>(function(){
var base=${JSON.stringify(theme)};
var key='${storageKey}';
var useStorage=${useStorage ? 'true' : 'false'};
var setVar=function(name,value){document.documentElement.style.setProperty(name,value)};
var normalizeHex=function(value,fallback){var raw=String(value||'').trim();if(/^#[0-9a-f]{6}$/i.test(raw))return raw.toLowerCase();if(/^#[0-9a-f]{3}$/i.test(raw))return'#'+raw[1]+raw[1]+raw[2]+raw[2]+raw[3]+raw[3];return fallback};
var hexToRgb=function(value,fallback){var hex=normalizeHex(value,fallback);return{r:parseInt(hex.slice(1,3),16),g:parseInt(hex.slice(3,5),16),b:parseInt(hex.slice(5,7),16)}};
var rgbToHex=function(rgb){return'#'+[rgb.r,rgb.g,rgb.b].map(function(channel){return Math.max(0,Math.min(255,Math.round(channel))).toString(16).padStart(2,'0')}).join('')};
var mixHex=function(baseColor,targetColor,weight){var a=hexToRgb(baseColor,baseColor);var b=hexToRgb(targetColor,targetColor);return rgbToHex({r:a.r+((b.r-a.r)*weight),g:a.g+((b.g-a.g)*weight),b:a.b+((b.b-a.b)*weight)})};
var withAlpha=function(color,alpha){var rgb=hexToRgb(color,color);return'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')'};
var isDarkColor=function(color){var rgb=hexToRgb(color,color);return((rgb.r*299)+(rgb.g*587)+(rgb.b*114))/1000<150};
var clamp=function(value,min,max){return Math.min(max,Math.max(min,value))};
var wrapHue=function(hue){return((hue%360)+360)%360};
var hueDistance=function(a,b){var distance=Math.abs(wrapHue(a)-wrapHue(b));return Math.min(distance,360-distance)};
var hslToHex=function(h,s,l){var hue=wrapHue(h);var sat=clamp(s,0,100)/100;var light=clamp(l,0,100)/100;var c=(1-Math.abs((2*light)-1))*sat;var x=c*(1-Math.abs(((hue/60)%2)-1));var m=light-(c/2);var r=0;var g=0;var b=0;if(hue<60){r=c;g=x;b=0}else if(hue<120){r=x;g=c;b=0}else if(hue<180){r=0;g=c;b=x}else if(hue<240){r=0;g=x;b=c}else if(hue<300){r=x;g=0;b=c}else{r=c;g=0;b=x}return'#'+[r,g,b].map(function(channel){return clamp(Math.round((channel+m)*255),0,255).toString(16).padStart(2,'0')}).join('')};
var hexToHsl=function(color){var rgb=hexToRgb(color,color);var rr=rgb.r/255;var gg=rgb.g/255;var bb=rgb.b/255;var max=Math.max(rr,gg,bb);var min=Math.min(rr,gg,bb);var delta=max-min;var h=0;if(delta!==0){if(max===rr)h=60*(((gg-bb)/delta)%6);else if(max===gg)h=60*(((bb-rr)/delta)+2);else h=60*(((rr-gg)/delta)+4)}var light=(max+min)/2;var saturation=delta===0?0:delta/(1-Math.abs((2*light)-1));return{h:wrapHue(h),s:saturation*100,l:light*100}};
var tuneBackgroundTone=function(color,primary,darkTheme,limits){var tone=hexToHsl(color);var primaryTone=hexToHsl(primary);var neutralRest=tone.s<14;var hue=!neutralRest&&hueDistance(tone.h,primaryTone.h)<24?wrapHue(primaryTone.h+(darkTheme?-56:56)):tone.h;var saturation=neutralRest?clamp(tone.s*0.5,darkTheme?5:4,darkTheme?12:10):clamp(tone.s*0.42,darkTheme?7:5,darkTheme?22:18);var lightness=darkTheme?clamp(tone.l,limits.darkMin,limits.darkMax):clamp(tone.l,limits.lightMin,limits.lightMax);return hslToHex(hue,saturation,lightness)};
var relativeLuminance=function(color){var rgb=hexToRgb(color,color);var normalize=function(channel){var value=channel/255;return value<=0.03928?value/12.92:Math.pow((value+0.055)/1.055,2.4)};return(0.2126*normalize(rgb.r))+(0.7152*normalize(rgb.g))+(0.0722*normalize(rgb.b))};
var contrastRatio=function(colorA,colorB){var l1=relativeLuminance(colorA);var l2=relativeLuminance(colorB);var lighter=Math.max(l1,l2);var darker=Math.min(l1,l2);return(lighter+0.05)/(darker+0.05)};
var getReadableOnColor=function(background){return contrastRatio(background,'#ffffff')>=contrastRatio(background,'#0b0b0b')?'#ffffff':'#0b0b0b'};
var improveContrast=function(color,background,minRatio){if(contrastRatio(color,background)>=minRatio)return color;var target=isDarkColor(background)?'#ffffff':'#000000';var candidate=color;for(var step=1;step<=10;step+=1){candidate=mixHex(color,target,step*0.1);if(contrastRatio(candidate,background)>=minRatio)return candidate}return target};
var improveContrastAcross=function(color,backgrounds,minRatio){var candidate=color;for(var attempt=0;attempt<4;attempt+=1){candidate=backgrounds.reduce(function(next,background){return improveContrast(next,background,minRatio)},candidate);if(backgrounds.every(function(background){return contrastRatio(candidate,background)>=minRatio}))return candidate}return backgrounds.some(function(background){return isDarkColor(background)})?'#ffffff':'#0b0b0b'};
var mixReadableText=function(text,background,weight,minRatio){for(var step=weight;step>=0;step-=0.06){var candidate=mixHex(text,background,step);if(contrastRatio(candidate,background)>=minRatio)return candidate}return improveContrast(text,background,minRatio)};
var state=base;
if(useStorage){try{var saved=JSON.parse(localStorage.getItem(key));if(saved){state={...base,...saved,fonts:{...base.fonts,...saved.fonts},colors:{...base.colors,...saved.colors}}}}catch(error){}}
if(state.era)document.documentElement.setAttribute('data-era',state.era);
if(state.hasCustomFonts&&state.fonts){var families=[...new Set(Object.values(state.fonts).filter(Boolean))];if(families.length){var link=document.createElement('link');link.rel='stylesheet';link.dataset.chronosPreloadFonts='true';link.href='https://fonts.googleapis.com/css2?display=swap&family='+families.map(function(font){return encodeURIComponent(font).replace(/%20/g,'+')}).join('&family=');document.head.appendChild(link)}Object.entries(state.fonts).forEach(function(entry){setVar('--font-'+entry[0],"'"+entry[1]+"', sans-serif")})}
if(state.hasCustomColors&&state.colors){var colors={...base.colors,...state.colors,surface:(state.colors&&state.colors.surface)||(state.colors&&state.colors.bg2)||base.colors.surface};var rawPrimary=normalizeHex(colors.primary,base.colors.primary);var rawBg=normalizeHex(colors.bg,base.colors.bg);var dark=isDarkColor(rawBg);var bg=tuneBackgroundTone(rawBg,rawPrimary,dark,{darkMin:30,darkMax:40,lightMin:78,lightMax:88});var bg2=tuneBackgroundTone(normalizeHex(colors.bg2,base.colors.bg2),rawPrimary,dark,{darkMin:38,darkMax:48,lightMin:70,lightMax:80});var surface=tuneBackgroundTone(normalizeHex(colors.surface,bg2),rawPrimary,dark,{darkMin:42,darkMax:54,lightMin:74,lightMax:86});var primary=improveContrastAcross(rawPrimary,[bg,bg2,surface],4.5);var secondary=improveContrastAcross(normalizeHex(colors.secondary,base.colors.secondary),[bg,bg2,surface],3.5);var accent=improveContrastAcross(normalizeHex(colors.accent,base.colors.accent),[bg,bg2,surface],3.5);var text=improveContrastAcross(normalizeHex(colors.text,base.colors.text),[bg,bg2,surface],7);var secondaryText=mixReadableText(text,bg,dark?0.16:0.22,5.2);var tertiaryText=mixReadableText(text,bg,dark?0.32:0.42,4.5);[['--color-bg',bg],['--color-bg-2',bg2],['--color-bg-3',mixHex(bg2,text,dark?0.08:0.06)],['--color-surface',withAlpha(surface,dark?0.82:0.78)],['--color-primary',primary],['--color-primary-2',mixHex(primary,dark?'#ffffff':'#000000',0.12)],['--color-on-primary',getReadableOnColor(primary)],['--color-secondary',secondary],['--color-accent',accent],['--color-text',text],['--color-text-2',secondaryText],['--color-text-3',tertiaryText],['--color-border',mixHex(bg2,text,dark?0.22:0.14)],['--color-border-2',mixHex(bg2,primary,0.28)],['--shadow-glow','0 0 52px '+withAlpha(primary,dark?0.32:0.2)]].forEach(function(pair){setVar(pair[0],pair[1])})}
})()</script>`
}

function rewriteCustomizerSource(theme, { keepCustomizer, storageKey }) {
  let source = customizerRaw

  source = stripMarkedBlocks(source, '// DOWNLOAD_FEATURE_START', '// DOWNLOAD_FEATURE_END')
  source = source.replace(
    /\/\/ CUSTOMIZER_ENABLED_START[\s\S]*?\/\/ CUSTOMIZER_ENABLED_END/,
    `// CUSTOMIZER_ENABLED_START\nconst CUSTOMIZER_ENABLED = ${keepCustomizer ? 'true' : 'false'}\n// CUSTOMIZER_ENABLED_END`
  )
  source = source.replace(
    /\/\/ EXPORT_DEFAULT_THEME_START[\s\S]*?\/\/ EXPORT_DEFAULT_THEME_END/,
    `// EXPORT_DEFAULT_THEME_START\n${buildThemeLiteral(theme)}\n// EXPORT_DEFAULT_THEME_END`
  )
  source = source.replace(
    /getAvailableTabs\(\)\s*\{\s*return\s*\[\s*'era',\s*'colors',\s*'fonts',\s*\.\.\.\(this\.downloadAvailable \? \['download'\] : \[\]\),\s*'layouts',\s*\]\s*\}/,
    `getAvailableTabs() {\n    return [\n      'era',\n      'colors',\n      'fonts',\n      ...(this.downloadAvailable ? ['download'] : []),\n    ]\n  }`
  )

  return source
}

function rewriteCustomizerHtml() {
  let source = customizerHtmlRaw

  source = source.replace(/\s*<!-- DOWNLOAD_TAB_START -->[\s\S]*?<!-- DOWNLOAD_TAB_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- DOWNLOAD_PANEL_START -->[\s\S]*?<!-- DOWNLOAD_PANEL_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- LAYOUTS_TAB_START -->[\s\S]*?<!-- LAYOUTS_TAB_END -->\s*/g, '\n')
  source = source.replace(/\s*<!-- LAYOUTS_PANEL_START -->[\s\S]*?<!-- LAYOUTS_PANEL_END -->\s*/g, '\n')
  source = source.replace(
    'Preview styles here. Download the current layout as a ready-to-run package from any layout page.',
    'Live theme controls for this exported layout.'
  )

  return source
}

function rewriteMainSource(keepCustomizer) {
  if (keepCustomizer) return mainRaw
  return mainRaw.replace(/^\s*import\s+['"]\.\/customizer\.js['"];?\r?\n/m, '')
}

function rewriteRootHtml(html, { keepCustomizer, storageKey, theme }) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const currentLayoutMessage = 'This export includes only the current layout.'
  const currentLayoutTarget = doc.getElementById('page-top') ? '#page-top' : doc.getElementById('main-content') ? '#main-content' : '#'
  const singleLayoutTexts = new Map([
    ['home', 'Back to top'],
    ['view all layouts', 'Current layout'],
    ['open layout directory', 'Current layout'],
    ['view index', 'Current layout'],
    ['browse all layouts', 'Current layout'],
    ['view other layouts', 'Current layout'],
    ['layout directory', 'Current layout'],
    ['layouts', 'Current layout'],
    ['all layouts', 'Current layout'],
    ['return to layout directory', 'Back to top'],
    ['return to surface directory', 'Back to top'],
    ['access terminal', 'Back to top'],
    ['run: index.bat', 'Back to top'],
  ])

  doc.documentElement.setAttribute('data-era', theme.era)
  doc.documentElement.setAttribute('data-prefs-key', storageKey)

  const bootScript = Array.from(doc.head.querySelectorAll('script'))
    .find((script) => {
      const src = script.getAttribute('src') || ''
      return src.includes('theme-boot.js') || script.textContent?.includes("localStorage.getItem('chronos-prefs')")
    })
  if (bootScript) {
    const replacement = parser.parseFromString(buildThemeBootScript({ storageKey, theme, useStorage: keepCustomizer }), 'text/html').head.firstElementChild
    if (replacement) {
      bootScript.replaceWith(replacement)
    }
  }

  doc.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href') || ''
    const label = link.textContent?.trim().replace(/\s+/g, ' ').toLowerCase() || ''

    if (/^layout-\d{2}\.html$/i.test(href)) {
      link.setAttribute('href', '#')
      link.setAttribute('data-demo-message', currentLayoutMessage)
      return
    }

    if (href === 'index.html') {
      link.setAttribute('href', currentLayoutTarget)
      if (currentLayoutTarget === '#') {
        link.setAttribute('data-demo-message', currentLayoutMessage)
      }
      if (singleLayoutTexts.has(label)) {
        link.textContent = singleLayoutTexts.get(label)
      }
    }
  })

  if (keepCustomizer) {
    doc.querySelectorAll('script').forEach((script) => {
      if (script.src) return
      script.textContent = script.textContent?.replace(/localStorage\.getItem\('chronos-prefs'\)/g, `localStorage.getItem('${storageKey}')`) || ''
    })
  } else {
    doc.getElementById('chr-customizer-mount')?.remove()
  }

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`
}

function rewritePackageJson(name) {
  const json = JSON.parse(packageJsonRaw)
  json.name = name
  if (json.dependencies?.jszip) {
    delete json.dependencies.jszip
  }
  return `${JSON.stringify(json, null, 2)}\n`
}

function buildViteConfig() {
  return `import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [tailwindcss()],
})
`
}

function buildReadme({ packageTitle, layoutLabel, keepCustomizer }) {
  return `# ${packageTitle}

This package contains the exported ${layoutLabel} layout from Chronos.

## Getting started

Run these commands in your terminal:

    npm install
    npm run dev

## Included

- Single exported layout as \`index.html\`
- Shared Chronos source files required for the layout
- Theme defaults baked into the project from the customizer state
- ${keepCustomizer ? 'Live customizer included for further adjustments' : 'Customizer UI and runtime removed from the exported package'}

## Notes

- The downloaded package runs through Vite.
- Links to other Chronos layouts are stripped or converted because this export contains one layout only.
- Update the exported content, links, and preview actions as needed for your own project.
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

  zip.file('index.html', rewriteRootHtml(html, { keepCustomizer, storageKey, theme }))
  zip.file('package.json', rewritePackageJson(slug))
  zip.file('vite.config.js', buildViteConfig())
  zip.file('.gitignore', EXPORT_GITIGNORE)
  zip.file('README.md', buildReadme({ packageTitle: archiveName, layoutLabel: selectedLayout.label, keepCustomizer }))
  zip.file('src/style.css', styleRaw)
  zip.file('src/main.js', rewriteMainSource(keepCustomizer))
  zip.file('src/fonts.js', fontsRaw)
  zip.file('src/transitions.js', transitionsRaw)
  if (keepCustomizer) {
    zip.file('src/customizer.js', rewriteCustomizerSource(theme, { keepCustomizer, storageKey }))
    zip.file('src/customizer-html.js', rewriteCustomizerHtml())
    zip.file('src/package-name-utils.js', packageNameUtilsRaw)
  }
  zip.file('public/favicon.svg', faviconRaw)
  zip.file('public/icons.svg', iconsRaw)
  zip.file('public/theme-boot.js', themeBootRaw)

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, `${archiveName}.zip`)
}
