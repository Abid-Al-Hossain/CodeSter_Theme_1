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
  </div>

  <!-- Body -->
  <div class="cust-body">

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
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('electric')">⚡ Electric</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('sunset')">🌅 Sunset</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('forest')">🌲 Forest</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('lavender')">💜 Lavender</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('rose')">🌹 Rose</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('midnight')">🌙 Midnight</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('ocean')">🌊 Ocean</button>
        <button class="chr-btn-ghost" style="font-size:0.72rem;padding:6px 12px" @click="$store.chr.applyPalette('ember')">🔥 Ember</button>
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
      <datalist id="chr-all-fonts"></datalist>

      <span class="cust-label">Heading Font</span>
      <input type="text" class="font-select chr-font-select" data-role="heading" style="font-family:var(--font-heading)" list="chr-all-fonts" autocomplete="off">

      <span class="cust-label">Body Font</span>
      <input type="text" class="font-select chr-font-select" data-role="body" style="font-family:var(--font-body)" list="chr-all-fonts" autocomplete="off">

      <span class="cust-label">Accent / Display Font</span>
      <input type="text" class="font-select chr-font-select" data-role="accent" style="font-family:var(--font-accent)" list="chr-all-fonts" autocomplete="off">

      <span class="cust-label">Monospace Font</span>
      <input type="text" class="font-select chr-font-select" data-role="mono" style="font-family:var(--font-mono)" list="chr-all-fonts" autocomplete="off">

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
    <a href="index.html" class="chr-btn-primary" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center; text-decoration:none;">
      ← View All Layouts
    </a>
    <button class="chr-btn-ghost" style="font-size:0.75rem;padding:10px 16px;width:100%;justify-content:center"
      @click="$store.chr.reset()">
      ↺ Reset Theme to Defaults
    </button>
  </div>
</aside>
`
