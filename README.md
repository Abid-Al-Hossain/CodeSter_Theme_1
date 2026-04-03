# Chronos — Multi-Era HTML5 Theme Bundle

Chronos is a premium, ultra-modern HTML5 template bundle architected around **10 distinct design eras**. Instead of boxing you into a single aesthetic, Chronos lets you seamlessly transition between radically different design languages instantly — from clean Modernism to dark Gothic, neon Cyperpunk, and brutalist layouts.

Built specifically for the Codester marketplace, Chronos includes a **live interactive customizer** that allows users to test design variations, pick fonts, adjust color palettes, and export their unique CSS instantly.

## 🌟 Key Features

- **10 Unique Design Eras:** Switch aesthetic styles on the fly via a simple HTML data attribute (`data-era`).
  - *Eras Included:* Modern, Gothic, Futuristic, Retro, Cyberpunk, Brutalist, Minimalist, Eco, Corporate, Artistic.
- **10 Pre-Built Layouts:** Fully responsive landing pages spanning portfolios, SaaS dashboards, creative agencies, and editorial portals.
- **Live Theme Customizer:** Built-in Alpine.js engine allowing users to toggle eras, experiment with 8 predefined color palettes (or custom colors), and visually test changes in real-time.
- **Dynamic Font Engine:** 65+ curated Google Fonts, alphabetically sorted, categorized, and searchable. Fonts are lazy-loaded dynamically for exceptional performance.
- **CSS Architecture:** Zero bloated frameworks in the final build. Built with Tailwind CSS v4, compiled down to optimized, raw CSS variable tokens for unparalleled developer flexibility.
- **Export to CSS:** Users can generate and copy a `:root` block of their customizations safely into their own projects with one click.
- **Scroll Reveals & Micro-interactions:** Fluid IntersectionObserver animations to bring the layouts to life.

## 🛠️ Technology Stack

- **Build Pipeline:** Vite 8.0
- **CSS Framework:** Tailwind CSS v4 (CSS-first architecture)
- **Reactivity:** Alpine.js (for the customizer engine and mobile interactions)
- **Icons & Fonts:** Google Fonts (loaded dynamically)

## 🚀 Getting Started (Development)

To run the project locally and make modifications during development:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local server:**
   ```bash
   npm run dev
   ```
   The site will be available on `http://localhost:5173/`.
   
   *Note: Because the theme relies heavily on dynamic fonts and the Alpine JS customizer, it must be run on a local server. Opening the raw `.html` files directly in your browser (`file:///`) may trigger CORS blocking on the dynamic module imports.*

3. **Build for Production:**
   ```bash
   npm run build
   ```
   This compiles all CSS and assets into the `dist/` directory, ready to be bundled into the final `.zip` file for customers.

## 🎨 Modifying the Eras

Eras are controlled exclusively by CSS Custom Properties (Variables). The global state is managed by the data attribute on the root html element:
```html
<html lang="en" data-era="cyberpunk">
```

To modify or add an era, edit `src/style.css` and define the root overrides:
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

- `/layout-01.html - /layout-10.html`: The 10 main HTML layout templates.
- `/src/style.css`: The master PostCSS file containing era definitions, Tailwind imports, and core utility classes.
- `/src/main.js`: The global entrypoint script.
- `/src/customizer.js /*.js`: The logic and HTML template for the floating customization sidebar.
- `/src/fonts.js`: The master list of searchable Google Fonts.

## 📄 License & Credits

Designed and developed by Abid Al Hossain for submission to Codester.
