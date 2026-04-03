// customizer-html.js — Reusable customizer panel HTML string
// Included by each layout page inline

export const CUSTOMIZER_HTML = /* html */`
<!-- ═══ CHRONOS CUSTOMIZER ═══════════════════════════════ -->
<button
  id="chr-customizer-toggle"
  onclick="Alpine.store('chr').toggle()"
  aria-label="Open theme customizer"
  aria-expanded="false"
>
  ✦ CUSTOMIZE
</button>

<aside
  id="chr-customizer"
  role="complementary"
  aria-label="Theme Customizer"
  x-data
  :class="$store.chr.open ? 'open' : ''"
>
  <!-- Header -->
  <div class="cust-header">
    <div>
      <div style="font-family:var(--font-accent);font-weight:800;font-size:1.1rem;color:var(--color-primary)">CHRONOS</div>
      <div style="font-size:0.7rem;color:var(--color-text-3);margin-top:2px">Style Customizer</div>
    </div>
    <button
      @click="$store.chr.close()"
      style="color:var(--color-text-3);font-size:1.4rem;line-height:1;padding:4px 8px;border-radius:var(--radius-sm);border:1px solid var(--color-border)"
      aria-label="Close customizer"
    >×</button>
  </div>

  <!-- Tabs -->
  <div class="cust-tabs" role="tablist">
    <button class="cust-tab" :class="$store.chr.activeTab==='era'?'active':''" @click="$store.chr.activeTab='era'" role="tab">Eras</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='colors'?'active':''" @click="$store.chr.activeTab='colors'" role="tab">Colors</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='fonts'?'active':''" @click="$store.chr.activeTab='fonts'" role="tab">Fonts</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='export'?'active':''" @click="$store.chr.activeTab='export';$store.chr.generateExport()" role="tab">Export</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='layouts'?'active':''" @click="$store.chr.activeTab='layouts'" role="tab">Layouts</button>
  </div>

  <!-- Body -->
  <div class="cust-body">

    <!-- ── LAYOUTS TAB ─────────────────────────────── -->
    <div x-show="$store.chr.activeTab==='layouts'" x-cloak>
      <span class="cust-label" style="display:flex;justify-content:space-between;align-items:center">
        Theme Templates
        <a href="index.html" style="font-size:0.7rem;font-weight:normal;color:var(--color-primary);text-decoration:underline">View Index</a>
      </span>
      <div style="display:flex;flex-direction:column;gap:8px;max-height:450px;overflow-y:auto;padding-right:4px">
        <a href="layout-01.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));flex-shrink:0">🏢</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">SaaS Landing Page</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 01</div>
          </div>
        </a>
        <a href="layout-02.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#3b82f6,#10b981);flex-shrink:0">🎨</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Creative Portfolio</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 02</div>
          </div>
        </a>
        <a href="layout-03.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#ef4444,#f59e0b);flex-shrink:0">🧱</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Editorial Feed</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 03</div>
          </div>
        </a>
        <a href="layout-04.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#8b5cf6,#ec4899);flex-shrink:0">📜</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Text Manuscript</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 04</div>
          </div>
        </a>
        <a href="layout-05.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#14b8a6,#06b6d4);flex-shrink:0">💻</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Web App Dashboard</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 05</div>
          </div>
        </a>
        <a href="layout-06.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#f43f5e,#8b5cf6);flex-shrink:0">✨</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Artistic Showcase</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 06</div>
          </div>
        </a>
        <a href="layout-07.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#0ea5e9,#38bdf8);flex-shrink:0">🚀</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Launch Page</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 07</div>
          </div>
        </a>
        <a href="layout-08.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#64748b,#94a3b8);flex-shrink:0">📓</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Minimal Journal</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 08</div>
          </div>
        </a>
        <a href="layout-09.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#10b981,#3b82f6);flex-shrink:0">⚡</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Digital Agency</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 09</div>
          </div>
        </a>
        <a href="layout-10.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:linear-gradient(135deg,#b91c1c,#dc2626);flex-shrink:0">🏰</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Institutional Archive</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 10</div>
          </div>
        </a>
      </div>
      <div style="margin-top:20px;padding:12px;background:var(--color-bg-2);border-radius:var(--radius-md);border:1px solid var(--color-border)">
        <p style="font-size:0.75rem;color:var(--color-text-2);margin:0;line-height:1.5">
          <strong>Tip:</strong> Your Era and Customizations persist seamlessly when navigating between layouts!
        </p>
      </div>
    </div>

    <!-- ── ERA TAB ─────────────────────────────────── -->
    <div x-show="$store.chr.activeTab==='era'" x-cloak>
      <span class="cust-label">Select Era</span>
      <div class="era-grid">
        <button class="era-card" :class="$store.chr.era==='modern'?'active':''" @click="$store.chr.setEra('modern')">🏙️ Modern</button>
        <button class="era-card" :class="$store.chr.era==='gothic'?'active':''" @click="$store.chr.setEra('gothic')">⚔️ Gothic</button>
        <button class="era-card" :class="$store.chr.era==='futuristic'?'active':''" @click="$store.chr.setEra('futuristic')">🚀 Futuristic</button>
        <button class="era-card" :class="$store.chr.era==='retro'?'active':''" @click="$store.chr.setEra('retro')">📜 Retro</button>
        <button class="era-card" :class="$store.chr.era==='cyberpunk'?'active':''" @click="$store.chr.setEra('cyberpunk')">⚡ Cyberpunk</button>
        <button class="era-card" :class="$store.chr.era==='brutalist'?'active':''" @click="$store.chr.setEra('brutalist')">🧱 Brutalist</button>
        <button class="era-card" :class="$store.chr.era==='minimalist'?'active':''" @click="$store.chr.setEra('minimalist')">◯ Minimal</button>
        <button class="era-card" :class="$store.chr.era==='eco'?'active':''" @click="$store.chr.setEra('eco')">🌿 Eco</button>
        <button class="era-card" :class="$store.chr.era==='corporate'?'active':''" @click="$store.chr.setEra('corporate')">💼 Corporate</button>
        <button class="era-card" :class="$store.chr.era==='artistic'?'active':''" @click="$store.chr.setEra('artistic')">🎨 Artistic</button>
        <button class="era-card" :class="$store.chr.era==='apocalyptic'?'active':''" @click="$store.chr.setEra('apocalyptic')">🩸 Apocalyptic</button>
        <button class="era-card" :class="$store.chr.era==='liquid'?'active':''" @click="$store.chr.setEra('liquid')">💧 Liquid</button>
      </div>

      <span class="cust-label" style="margin-top:20px">Era Info</span>
      <div style="font-size:0.78rem;color:var(--color-text-2);background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:12px;line-height:1.6">
        <span x-text="$store.chr.era.charAt(0).toUpperCase()+$store.chr.era.slice(1)"></span> era active.
        Switch freely — all transitions are live and simultaneous.
      </div>
    </div>

    <!-- ── COLORS TAB ──────────────────────────────── -->
    <div x-show="$store.chr.activeTab==='colors'" x-cloak>
      <span class="cust-label">Preset Palettes</span>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
        <button :class="$store.chr.activePalette === 'electric' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('electric')">⚡ Electric</button>
        <button :class="$store.chr.activePalette === 'sunset' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('sunset')">🌅 Sunset</button>
        <button :class="$store.chr.activePalette === 'forest' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('forest')">🌲 Forest</button>
        <button :class="$store.chr.activePalette === 'lavender' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('lavender')">💜 Lavender</button>
        <button :class="$store.chr.activePalette === 'rose' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('rose')">🌹 Rose</button>
        <button :class="$store.chr.activePalette === 'midnight' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('midnight')">🌙 Midnight</button>
        <button :class="$store.chr.activePalette === 'ocean' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('ocean')">🌊 Ocean</button>
        <button :class="$store.chr.activePalette === 'ember' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('ember')">🔥 Ember</button>
        <button :class="$store.chr.activePalette === 'mint' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('mint')">🌿 Mint</button>
        <button :class="$store.chr.activePalette === 'grayscale' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('grayscale')">💿 Chrome</button>
        <button :class="$store.chr.activePalette === 'obsidian' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('obsidian')">🪨 Obsidian</button>
        <button :class="$store.chr.activePalette === 'gold' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('gold')">👑 Gold</button>
        <button :class="$store.chr.activePalette === 'toxic' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('toxic')">☢️ Toxic</button>
        <button :class="$store.chr.activePalette === 'bubblegum' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('bubblegum')">🍬 Bubblegum</button>
        <button :class="$store.chr.activePalette === 'clay' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('clay')">🏺 Clay</button>
        <button :class="$store.chr.activePalette === 'abyss' ? 'chr-btn-primary' : 'chr-btn-ghost'" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('abyss')">🌌 Abyss</button>
      </div>

      <span class="cust-label">Fine-Tune Colors</span>
      <div>
        <div class="color-row">
          <label>Primary</label>
          <input type="color" :value="$store.chr.colors.primary" @input="$store.chr.setColor('primary',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Secondary</label>
          <input type="color" :value="$store.chr.colors.secondary" @input="$store.chr.setColor('secondary',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Accent</label>
          <input type="color" :value="$store.chr.colors.accent" @input="$store.chr.setColor('accent',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Background</label>
          <input type="color" :value="$store.chr.colors.bg" @input="$store.chr.setColor('bg',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Surface</label>
          <input type="color" :value="$store.chr.colors.bg2" @input="$store.chr.setColor('bg2',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Text</label>
          <input type="color" :value="$store.chr.colors.text" @input="$store.chr.setColor('text',$event.target.value)">
        </div>
      </div>
    </div>

    <!-- ── FONTS TAB ───────────────────────────────── -->
    <div x-show="$store.chr.activeTab==='fonts'" x-cloak>
      <template x-for="f in [{id:'heading', label:'Heading'}, {id:'body', label:'Body'}, {id:'accent', label:'Accent / Display'}, {id:'mono', label:'Monospace'}]" :key="f.id">
        <div style="margin-bottom:16px;">
          <span class="cust-label" x-text="f.label + ' Font'"></span>
          
          <div x-data="chrFontDropdown(f.id)" @click.outside="open = false" style="position:relative">
             <button @click="toggle()" style="width:100%; display:flex; justify-content:space-between; align-items:center; background:var(--color-bg); border:1px solid var(--color-border); padding:10px 14px; border-radius:var(--radius-sm); color:var(--color-text); font-size:0.85rem; cursor:pointer;" aria-label="Select Font">
                <span x-text="$store.chr.fonts[f.id]" :style="'font-family:' + $store.chr.fonts[f.id]"></span>
                <span style="font-size:0.6rem; opacity:0.5">▼</span>
             </button>
             
             <div x-show="open" style="position:absolute; top:calc(100% + 4px); left:0; width:100%; background:var(--color-bg); border:1px solid var(--color-border); border-radius:var(--radius-sm); z-index:100; box-shadow:0 10px 25px rgba(0,0,0,0.2)" x-transition x-cloak>
                <div style="padding:8px">
                   <input type="text" x-model="search" x-ref="search" placeholder="Search fonts..." style="width:100%; padding:8px 12px; background:var(--color-bg-2); border:1px solid var(--color-border); border-radius:4px; color:var(--color-text); font-size:0.8rem; outline:none">
                </div>
                <div style="max-height:220px; overflow-y:auto; padding-bottom:8px">
                   <template x-for="font in filtered" :key="font">
                      <div @click="selectFont(font)" style="padding:8px 16px; font-size:0.9rem; cursor:pointer" 
                           :style="\`font-family:\${font};\` + ($store.chr.fonts[f.id] === font ? 'background:var(--color-primary);color:#fff' : 'color:var(--color-text)')"
                           x-text="font"
                           onmouseover="if(this.style.background==='')this.style.background='var(--color-bg-2)'"
                           onmouseout="if(this.style.color==='var(--color-text)')this.style.background=''">
                      </div>
                   </template>
                   <div x-show="filtered.length===0" style="padding:16px; text-align:center; color:var(--color-text-3); font-size:0.8rem">No fonts found</div>
                </div>
             </div>
          </div>

        </div>
      </template>

      <div style="margin-top:16px;font-size:0.75rem;color:var(--color-text-3)">
        65+ fonts available. Loaded on-demand to keep performance optimal.
      </div>
    </div>

    <!-- ── EXPORT TAB ─────────────────────────────── -->
    <div x-show="$store.chr.activeTab==='export'" x-cloak>
      <span class="cust-label">Your Custom Theme CSS</span>
      <p style="font-size:0.78rem;color:var(--color-text-2);margin-bottom:12px">
        Copy these CSS variables into your project's <code style="font-family:var(--font-mono)">:root</code> block to apply your customization.
      </p>
      <pre class="export-code" x-text="$store.chr.exportCSS || 'Click Refresh to generate...'"></pre>

      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="chr-btn-primary" style="flex:1;justify-content:center;font-size:0.82rem;padding:10px"
          @click="$store.chr.copyExport()">
          <span x-text="$store.chr.exportCopied ? '✓ Copied!' : '📋 Copy CSS'"></span>
        </button>
        <button class="chr-btn-ghost" style="font-size:0.82rem;padding:10px 16px"
          @click="$store.chr.generateExport()">↻</button>
      </div>

    </div>

  </div><!-- /cust-body -->

  <!-- Footer -->
  <div class="cust-footer" style="padding:16px; border-top:1px solid var(--color-border); background:var(--color-bg); flex-shrink:0; display:flex; flex-direction:column; gap:8px;">
    <button class="chr-btn-ghost" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center"
      @click="$store.chr.reset()">
      ↺ Reset Theme to Defaults
    </button>
  </div>
</aside>
`
