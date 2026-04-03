export const CUSTOMIZER_HTML = /* html */ `
<button
  id="chr-customizer-toggle"
  onclick="Alpine.store('chr').toggle()"
  aria-label="Open theme customizer"
  aria-expanded="false"
>
  CUSTOMIZE
</button>

<aside
  id="chr-customizer"
  role="complementary"
  aria-label="Theme Customizer"
  x-data
  :class="$store.chr.open ? 'open' : ''"
>
  <div class="cust-header">
    <div>
      <div style="font-family:var(--font-accent);font-weight:800;font-size:1.1rem;color:var(--color-primary)">CHRONOS</div>
      <div style="font-size:0.7rem;color:var(--color-text-3);margin-top:2px">Style Customizer</div>
    </div>
    <button
      @click="$store.chr.close()"
      style="color:var(--color-text-3);font-size:1rem;line-height:1;padding:6px 10px;border-radius:var(--radius-sm);border:1px solid var(--color-border)"
      aria-label="Close customizer"
    >X</button>
  </div>

  <div class="cust-tabs" role="tablist">
    <button class="cust-tab" :class="$store.chr.activeTab==='era'?'active':''" @click="$store.chr.setActiveTab('era')" role="tab" id="chr-tab-era" :aria-selected="$store.chr.activeTab==='era' ? 'true' : 'false'" aria-controls="chr-panel-era">Eras</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='colors'?'active':''" @click="$store.chr.setActiveTab('colors')" role="tab" id="chr-tab-colors" :aria-selected="$store.chr.activeTab==='colors' ? 'true' : 'false'" aria-controls="chr-panel-colors">Colors</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='fonts'?'active':''" @click="$store.chr.setActiveTab('fonts')" role="tab" id="chr-tab-fonts" :aria-selected="$store.chr.activeTab==='fonts' ? 'true' : 'false'" aria-controls="chr-panel-fonts">Fonts</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='export'?'active':''" @click="$store.chr.setActiveTab('export')" role="tab" id="chr-tab-export" :aria-selected="$store.chr.activeTab==='export' ? 'true' : 'false'" aria-controls="chr-panel-export">Export</button>
    <button class="cust-tab" :class="$store.chr.activeTab==='layouts'?'active':''" @click="$store.chr.setActiveTab('layouts')" role="tab" id="chr-tab-layouts" :aria-selected="$store.chr.activeTab==='layouts' ? 'true' : 'false'" aria-controls="chr-panel-layouts">Layouts</button>
  </div>

  <div class="cust-body">
    <div x-show="$store.chr.activeTab==='layouts'" x-cloak role="tabpanel" id="chr-panel-layouts" aria-labelledby="chr-tab-layouts">
      <span class="cust-label" style="display:flex;justify-content:space-between;align-items:center">
        Theme Layouts
        <a href="index.html" style="font-size:0.7rem;font-weight:normal;color:var(--color-primary);text-decoration:underline">View Index</a>
      </span>
      <div style="display:flex;flex-direction:column;gap:8px;max-height:450px;overflow-y:auto;padding-right:4px">
        <a href="layout-01.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,var(--color-primary),var(--color-secondary));color:#fff;flex-shrink:0">L01</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">SaaS Landing Page</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 01</div>
          </div>
        </a>
        <a href="layout-02.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#3b82f6,#10b981);color:#fff;flex-shrink:0">L02</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Creative Portfolio</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 02</div>
          </div>
        </a>
        <a href="layout-03.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#ef4444,#f59e0b);color:#fff;flex-shrink:0">L03</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Editorial Feed</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 03</div>
          </div>
        </a>
        <a href="layout-04.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;flex-shrink:0">L04</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Text Manuscript</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 04</div>
          </div>
        </a>
        <a href="layout-05.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#14b8a6,#06b6d4);color:#fff;flex-shrink:0">L05</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Web App Dashboard</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 05</div>
          </div>
        </a>
        <a href="layout-06.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#f43f5e,#8b5cf6);color:#fff;flex-shrink:0">L06</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Artistic Showcase</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 06</div>
          </div>
        </a>
        <a href="layout-07.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#0ea5e9,#38bdf8);color:#fff;flex-shrink:0">L07</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Launch Page</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 07</div>
          </div>
        </a>
        <a href="layout-08.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#64748b,#94a3b8);color:#fff;flex-shrink:0">L08</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Minimal Journal</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 08</div>
          </div>
        </a>
        <a href="layout-09.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#10b981,#3b82f6);color:#fff;flex-shrink:0">L09</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Digital Agency</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 09</div>
          </div>
        </a>
        <a href="layout-10.html" style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;transition:border-color 0.2s,transform 0.2s" onmouseover="this.style.borderColor='var(--color-primary)';this.style.transform='translateX(4px)'" onmouseout="this.style.borderColor='';this.style.transform=''">
          <div style="width:44px;height:44px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;background:linear-gradient(135deg,#b91c1c,#dc2626);color:#fff;flex-shrink:0">L10</div>
          <div style="display:flex;flex-direction:column;gap:2px">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-text);line-height:1.2">Institutional Archive</div>
            <div style="font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-3)">Layout 10</div>
          </div>
        </a>
      </div>
      <div style="margin-top:20px;padding:12px;background:var(--color-bg-2);border-radius:var(--radius-md);border:1px solid var(--color-border)">
        <p style="font-size:0.75rem;color:var(--color-text-2);margin:0;line-height:1.5">
          <strong>Tip:</strong> Era, font, and palette choices stay with you while moving between layouts.
        </p>
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='era'" x-cloak role="tabpanel" id="chr-panel-era" aria-labelledby="chr-tab-era">
      <span class="cust-label">Select Era</span>
      <div class="era-grid">
        <button class="era-card" :class="$store.chr.era==='modern'?'active':''" @click="$store.chr.setEra('modern')">Modern</button>
        <button class="era-card" :class="$store.chr.era==='gothic'?'active':''" @click="$store.chr.setEra('gothic')">Gothic</button>
        <button class="era-card" :class="$store.chr.era==='futuristic'?'active':''" @click="$store.chr.setEra('futuristic')">Futuristic</button>
        <button class="era-card" :class="$store.chr.era==='retro'?'active':''" @click="$store.chr.setEra('retro')">Retro</button>
        <button class="era-card" :class="$store.chr.era==='cyberpunk'?'active':''" @click="$store.chr.setEra('cyberpunk')">Cyberpunk</button>
        <button class="era-card" :class="$store.chr.era==='brutalist'?'active':''" @click="$store.chr.setEra('brutalist')">Brutalist</button>
        <button class="era-card" :class="$store.chr.era==='minimalist'?'active':''" @click="$store.chr.setEra('minimalist')">Minimalist</button>
        <button class="era-card" :class="$store.chr.era==='eco'?'active':''" @click="$store.chr.setEra('eco')">Eco</button>
        <button class="era-card" :class="$store.chr.era==='corporate'?'active':''" @click="$store.chr.setEra('corporate')">Corporate</button>
        <button class="era-card" :class="$store.chr.era==='artistic'?'active':''" @click="$store.chr.setEra('artistic')">Artistic</button>
        <button class="era-card" :class="$store.chr.era==='apocalyptic'?'active':''" @click="$store.chr.setEra('apocalyptic')">Apocalyptic</button>
        <button class="era-card" :class="$store.chr.era==='liquid'?'active':''" @click="$store.chr.setEra('liquid')">Liquid</button>
      </div>

      <span class="cust-label" style="margin-top:20px">Era Status</span>
      <div style="font-size:0.78rem;color:var(--color-text-2);background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:12px;line-height:1.6">
        <span x-text="$store.chr.era.charAt(0).toUpperCase()+$store.chr.era.slice(1)"></span> is active.
        The same layout structure now reflects a new era token set.
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='colors'" x-cloak role="tabpanel" id="chr-panel-colors" aria-labelledby="chr-tab-colors">
      <span class="cust-label">Preset Palettes</span>
      <div class="palette-grid" style="margin-bottom:18px">
        <template x-for="palette in $store.chr.paletteOptions" :key="palette.id">
          <button
            class="palette-card"
            :class="$store.chr.activePalette === palette.id ? 'active' : ''"
            @click="$store.chr.applyPalette(palette.id)"
            :aria-pressed="$store.chr.activePalette === palette.id ? 'true' : 'false'"
          >
            <span class="palette-swatch-stack" aria-hidden="true">
              <span class="palette-swatch" :style="'background:' + palette.colors.primary"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.secondary"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.accent"></span>
              <span class="palette-swatch" :style="'background:' + palette.colors.surface"></span>
            </span>
            <span class="palette-meta">
              <span class="palette-name" x-text="palette.label"></span>
              <span class="palette-sub" x-text="palette.mode"></span>
            </span>
          </button>
        </template>
      </div>

      <span class="cust-label">Fine Tune Colors</span>
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
          <label>Section</label>
          <input type="color" :value="$store.chr.colors.bg2" @input="$store.chr.setColor('bg2',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Surface</label>
          <input type="color" :value="$store.chr.colors.surface" @input="$store.chr.setColor('surface',$event.target.value)">
        </div>
        <div class="color-row">
          <label>Text</label>
          <input type="color" :value="$store.chr.colors.text" @input="$store.chr.setColor('text',$event.target.value)">
        </div>
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='fonts'" x-cloak role="tabpanel" id="chr-panel-fonts" aria-labelledby="chr-tab-fonts">
      <template x-for="f in [{id:'heading', label:'Heading'}, {id:'body', label:'Body'}, {id:'accent', label:'Accent / Display'}, {id:'mono', label:'Monospace'}]" :key="f.id">
        <div style="margin-bottom:16px;">
          <span class="cust-label" x-text="f.label + ' Font'"></span>

          <div x-data="chrFontDropdown(f.id)" @click.outside="open = false" style="position:relative">
            <button @click="toggle()" style="width:100%;display:flex;justify-content:space-between;align-items:center;background:var(--color-bg);border:1px solid var(--color-border);padding:10px 14px;border-radius:var(--radius-sm);color:var(--color-text);font-size:0.85rem;cursor:pointer;" aria-label="Select font">
              <span x-text="$store.chr.fonts[f.id]" :style="'font-family:' + $store.chr.fonts[f.id]"></span>
              <span style="font-size:0.6rem;opacity:0.5">v</span>
            </button>

            <div x-show="open" style="position:absolute;top:calc(100% + 4px);left:0;width:100%;background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-sm);z-index:100;box-shadow:0 10px 25px rgba(0,0,0,0.2)" x-transition x-cloak>
              <div style="padding:8px">
                <input type="text" x-model="search" x-ref="search" placeholder="Search fonts..." style="width:100%;padding:8px 12px;background:var(--color-bg-2);border:1px solid var(--color-border);border-radius:4px;color:var(--color-text);font-size:0.8rem;outline:none">
              </div>
              <div style="max-height:220px;overflow-y:auto;padding-bottom:8px">
                <template x-for="font in filtered" :key="font">
                  <div
                    @click="selectFont(font)"
                    style="padding:8px 16px;font-size:0.9rem;cursor:pointer"
                    :style="\`font-family:\${font};\` + ($store.chr.fonts[f.id] === font ? 'background:var(--color-primary);color:#fff' : 'color:var(--color-text)')"
                    x-text="font"
                    onmouseover="if(this.style.background==='')this.style.background='var(--color-bg-2)'"
                    onmouseout="if(this.style.color==='var(--color-text)')this.style.background=''"
                  ></div>
                </template>
                <div x-show="filtered.length===0" style="padding:16px;text-align:center;color:var(--color-text-3);font-size:0.8rem">No fonts found</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div style="margin-top:16px;font-size:0.75rem;color:var(--color-text-3)">
        65+ fonts available. Loaded on demand to keep performance fast.
      </div>
    </div>

    <div x-show="$store.chr.activeTab==='export'" x-cloak role="tabpanel" id="chr-panel-export" aria-labelledby="chr-tab-export">
      <span class="cust-label">Your Theme CSS</span>
      <p style="font-size:0.78rem;color:var(--color-text-2);margin-bottom:12px">
        Copy these CSS variables into your own <code style="font-family:var(--font-mono)">:root</code> block to reuse the current setup.
      </p>
      <pre class="export-code" x-text="$store.chr.exportCSS || 'Select Refresh to generate CSS.'"></pre>

      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="chr-btn-primary" style="flex:1;justify-content:center;font-size:0.82rem;padding:10px" @click="$store.chr.copyExport()">
          <span x-text="$store.chr.exportCopied ? 'Copied' : 'Copy CSS'"></span>
        </button>
        <button class="chr-btn-ghost" style="font-size:0.82rem;padding:10px 16px" @click="$store.chr.generateExport()">Refresh</button>
      </div>
    </div>
  </div>

  <div class="cust-footer" style="padding:16px;border-top:1px solid var(--color-border);background:var(--color-bg);flex-shrink:0;display:flex;flex-direction:column;gap:8px;">
    <button class="chr-btn-ghost" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center" @click="$store.chr.reset()">
      Reset Theme
    </button>
  </div>
</aside>
`
