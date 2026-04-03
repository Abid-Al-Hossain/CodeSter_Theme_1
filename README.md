# Chronos — The Multi-Era HTML5 Ecosystem

Chronos is a premium, ultra-modern HTML5 template bundle architected around **12 distinct design eras**. Instead of boxing you into a single aesthetic, Chronos lets you seamlessly transition between radically different design languages instantly — from clean Modernism to dark Gothic, neon Cyperpunk, fluid Liquid, and abrasive Apocalyptic layouts.

Built specifically for the Codester marketplace, Chronos includes a **live interactive customizer** that allows users to test design variations, pick fonts, adjust color palettes, navigate seamlessly between templates, and export their unique CSS instantly.

## 🌟 Key Features

- **12 Unique Design Eras:** Switch aesthetic styles on the fly via a simple HTML data attribute (`data-era`).
  - *Eras Included:* Modern, Gothic, Futuristic, Retro, Cyberpunk, Brutalist, Minimalist, Eco, Corporate, Artistic, Apocalyptic, Liquid.
- **10 Immersive Layouts:** Fully responsive, production-ready landing pages spanning SaaS portals, creative portfolios, dashboard UIs, digital agencies, and editorial manuscripts.
- **Zero-Jump Navigation:** Browse the 10 included layouts directly from the Customizer Panel. Your chosen aesthetic and fonts persist seamlessly as you move from layout to layout.
- **Live Theme Customizer:** Built-in Alpine.js engine allowing users to toggle eras, experiment with predefined color palettes (or custom colors), and visually test changes in real-time.
- **Dynamic Font Engine:** 65+ curated Google Fonts, alphabetically sorted, categorized, and searchable inside a gorgeous dropdown UI. Fonts are lazy-loaded dynamically for exceptional performance.
- **CSS-First Architecture:** Zero bloated CSS frameworks in the final build. Built with Tailwind CSS v4, compiled down to optimized, raw CSS variable tokens for unparalleled developer flexibility.
- **Immediate CSS Export:** Users can generate and copy a `:root` block of their customizations safely into their own projects with one click.
- **Scroll Reveals & Micro-interactions:** Fluid IntersectionObserver animations to bring the layouts to life.

## 🛠️ Technology Stack

- **Build Pipeline:** Vite 8.0
- **CSS Engine:** Tailwind CSS v4 (CSS-first architecture)
- **Reactivity:** Alpine.js (for the customizer engine and mobile interactions)
- **Icons & Fonts:** Google Fonts (loaded dynamically)

## 🚀 Getting Started

To run the project locally and interact with the customizer:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local server:**
   ```bash
   npm run dev
   ```
   The site will be available on `http://localhost:5173/`.
   
   *Note: Because the theme relies heavily on dynamic module imports and Alpine.js, it must be run on a local server. Opening the raw `.html` files directly in your browser (`file:///`) may trigger CORS blocking.*

3. **Build for Production:**
   ```bash
   npm run build
   ```
   This compiles all CSS and assets into the `dist/` directory, ready to be deployed.

## 🎨 Modifying the Eras

Eras are controlled exclusively by CSS Custom Properties (Variables). The global state is managed by the data attribute on the root html element:
```html
<html lang="en" data-era="cyberpunk">
```

To modify or add an era, open `src/style.css` and define the root overrides:
```css
[data-era="cyberpunk"] {
  --color-bg: #030303;
  --color-primary: #ff0080;
  --font-heading: 'Orbitron', sans-serif;
  --radius-sm: 0px;
  /* ... add your variables here */
}
```

## 📁 File Structure

- `index.html`: The master Layout Directory Hub.
- `/layout-01.html - /layout-10.html`: The 10 main, immersive HTML layout templates.
- `/src/style.css`: The master CSS file containing era definitions, animations, and typography tokens.
- `/src/main.js`: The global entrypoint script.
- `/src/customizer.js & customizer-html.js`: The persistent Alpine.js state engine and UI components.
- `/src/fonts.js`: The master list of searchable Google Fonts.

## 📄 License & Credits

Designed and developed by Abid Al Hossain for submission to Codester.
