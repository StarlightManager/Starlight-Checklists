/* ── Starlight Ops — Stylesheet ────────────────────────────────────
   Palette: deep navy night + warm amber firelight + sage meadow
   Signature: star (✦) motif, amber glow on active states
   ──────────────────────────────────────────────────────────────── */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --night:    #0F1923;
  --navy:     #1A2E3B;
  --slate:    #2C4A5A;
  --mist:     #C8D9D4;
  --sage:     #7FAF8A;
  --meadow:   #4A8C5C;
  --amber:    #E8A832;
  --ember:    #C97B2A;
  --cream:    #FAF6EE;
  --sand:     #F0E8D8;
  --ink:      #1A1A18;
  --stone:    #7A7A72;
  --white:    #FFFFFF;
  --red:      #B83232;
  --red-bg:   #FDECEA;
  --green:    #2E7D4A;
  --green-bg: #EAF5EE;
  --warn:     #C97B2A;
  --warn-bg:  #FFF4E0;
  --radius:   10px;
  --shadow:   0 1px 4px rgba(0,0,0,0.10);
}

html, body {
  height: 100%;
  background: var(--cream);
  color: var(--ink);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ── Header ── */
.app-header {
  background: var(--night);
  padding: 14px 18px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,0.35);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 640px;
  margin: 0 auto;
}
.header-brand { display: flex; align-items: center; gap: 12px; }
.header-star {
  font-size: 22px;
  color: var(--amber);
  line-height: 1;
  filter: drop-shadow(0 0 6px rgba(232,168,50,0.6));
}
.header-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 0.01em;
  font-family: Georgia, serif;
}
.header-sub {
  font-size: 11px;
  color: var(--mist);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 1px;
}
.header-date {
  font-size: 12px;
  color: var(--mist);
  text-align: right;
  line-height: 1.4;
}

/* ── Tab Bar ── */
.tab-bar {
  display: flex;
  background: var(--navy);
  max-width: 100%;
  position: sticky;
  top: 60px;
  z-index: 99;
}
.tab {
  flex: 1;
  padding: 11px 8px;
  background: transparent;
  border: none;
  color: var(--mist);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.15s;
}
.tab.active {
  color: var(--amber);
  border-bottom-color: var(--amber);
  font-weight: 700;
}

/* ── Views ── */
.view { display: none; }
.view.active { display: block; }

/* ── Page Sections ── */
.page-section {
  max-width: 640px;
  margin: 0 auto;
  padding: 14px 16px 0;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--slate);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 7px;
}
.required { color: var(--red); }

.text-input {
  width: 100%;
  padding: 11px 13px;
  border: 1.5px solid var(--mist);
  border-radius: var(--radius);
  font-size: 16px;
  color: var(--ink);
  background: var(--white);
  outline: none;
  transition: border-color 0.15s;
}
.text-input:focus { border-color: var(--amber); }

.text-area {
  width: 100%;
  padding: 11px 13px;
  border: 1.5px solid var(--mist);
  border-radius: var(--radius);
  font-size: 15px;
  color: var(--ink);
  background: var(--white);
  min-height: 90px;
  resize: vertical;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.text-area:focus { border-color: var(--amber); }

/* ── Checklist Selector Grid ── */
.checklist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.cl-btn {
  padding: 11px 8px;
  border: 1.5px solid var(--mist);
  border-radius: var(--radius);
  background: var(--white);
  color: var(--slate);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
}
.cl-btn.active {
  background: var(--night);
  color: var(--amber);
  border-color: var(--amber);
  box-shadow: 0 0 0 1px var(--amber);
}

/* ── Card ── */
.card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin: 14px 16px 0;
  max-width: 608px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
.card-header {
  background: var(--sand);
  padding: 9px 14px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--slate);
  border-bottom: 1px solid var(--mist);
}
.card-header.amber { background: var(--night); color: var(--amber); }

/* ── Task Rows ── */
.task-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 14px;
  border-bottom: 1px solid #F0F0EC;
  cursor: pointer;
  transition: background 0.1s;
  -webkit-tap-highlight-color: transparent;
}
.task-row:last-child { border-bottom: none; }
.task-row.checked { background: #F4FBF6; }
.task-row:active { background: #F0F8FF; }

.task-check {
  width: 23px;
  height: 23px;
  border-radius: 6px;
  border: 2px solid var(--mist);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  transition: all 0.15s;
}
.task-row.checked .task-check {
  background: var(--meadow);
  border-color: var(--meadow);
}
.task-check svg { display: none; }
.task-row.checked .task-check svg { display: block; }

.task-label {
  font-size: 14px;
  color: var(--ink);
  line-height: 1.45;
  flex: 1;
}
.task-row.checked .task-label {
  color: var(--stone);
  text-decoration: line-through;
}

/* instruction text (collapsible) */
.task-instruction {
  font-size: 12px;
  color: var(--stone);
  margin-top: 3px;
  line-height: 1.4;
  font-style: italic;
}

/* ── Info box (for role-specific instructions) ── */
.info-box {
  margin: 14px 16px 0;
  max-width: 608px;
  margin-left: auto;
  margin-right: auto;
  background: var(--warn-bg);
  border: 1px solid var(--warn);
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 13px;
  color: var(--ink);
  line-height: 1.5;
}
.info-box strong { color: var(--ember); }

/* ── Tent grid (bear spray / heater) ── */
.tent-form { padding: 10px 14px 14px; }
.tent-row {
  display: grid;
  grid-template-columns: 52px 1fr 1fr;
  gap: 6px;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F0F0EC;
  font-size: 13px;
}
.tent-row:last-child { border-bottom: none; }
.tent-id { font-weight: 700; color: var(--slate); font-size: 13px; }
.tent-input {
  padding: 5px 8px;
  border: 1.5px solid var(--mist);
  border-radius: 6px;
  font-size: 13px;
  background: var(--cream);
  outline: none;
  width: 100%;
}
.tent-input:focus { border-color: var(--amber); }
.tent-select {
  padding: 5px 4px;
  border: 1.5px solid var(--mist);
  border-radius: 6px;
  font-size: 12px;
  background: var(--cream);
  outline: none;
  width: 100%;
}
.tent-header {
  display: grid;
  grid-template-columns: 52px 1fr 1fr;
  gap: 6px;
  padding: 6px 0 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--stone);
  border-bottom: 2px solid var(--mist);
  margin-bottom: 4px;
}

/* ── Project items (optional) ── */
.optional-badge {
  font-size: 10px;
  font-weight: 700;
  background: #EEF4FF;
  color: #4A6FA8;
  border-radius: 4px;
  padding: 2px 6px;
  margin-left: 6px;
  vertical-align: middle;
}

/* ── Submit button ── */
.btn-primary {
  display: block;
  width: 100%;
  padding: 15px;
  background: var(--night);
  color: var(--amber);
  font-size: 16px;
  font-weight: 700;
  border-radius: var(--radius);
  border: 2px solid var(--amber);
  cursor: pointer;
  letter-spacing: 0.04em;
  margin-top: 6px;
  transition: all 0.15s;
  box-shadow: 0 0 0 0 rgba(232,168,50,0);
}
.btn-primary:active {
  background: var(--amber);
  color: var(--night);
}

/* ── Success banner ── */
.success-banner {
  text-align: center;
  background: var(--night);
  border-radius: var(--radius);
  padding: 32px 20px;
  margin: 14px 16px 40px;
  max-width: 608px;
  margin-left: auto;
  margin-right: auto;
}
.success-icon { font-size: 36px; color: var(--amber); margin-bottom: 12px; filter: drop-shadow(0 0 8px rgba(232,168,50,0.7)); }
.success-text { font-size: 18px; font-weight: 700; color: var(--cream); font-family: Georgia, serif; }
.success-sub { font-size: 13px; color: var(--mist); margin-top: 6px; }
.hidden { display: none !important; }

/* ── Manager Dashboard ── */
.section-heading {
  font-size: 18px;
  font-weight: 700;
  color: var(--night);
  font-family: Georgia, serif;
  margin-bottom: 4px;
}

.stat-row {
  display: flex;
  gap: 10px;
  margin: 14px 16px 0;
  max-width: 608px;
  margin-left: auto;
  margin-right: auto;
}
.stat-box {
  flex: 1;
  background: var(--white);
  border-radius: var(--radius);
  padding: 13px 10px;
  text-align: center;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--sage);
}
.stat-box.amber-top { border-top-color: var(--amber); }
.stat-box.green-top { border-top-color: var(--meadow); }
.stat-num { font-size: 26px; font-weight: 700; color: var(--ink); line-height: 1; }
.stat-label { font-size: 11px; color: var(--stone); margin-top: 3px; text-transform: uppercase; letter-spacing: 0.05em; }

.log-row {
  padding: 11px 14px;
  border-bottom: 1px solid #F0F0EC;
  font-size: 14px;
}
.log-row:last-child { border-bottom: none; }
.log-who { font-weight: 700; color: var(--night); }
.log-meta { font-size: 12px; color: var(--stone); margin-top: 2px; }
.log-notes { font-size: 12px; color: var(--slate); margin-top: 3px; font-style: italic; }

.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  padding: 2px 7px;
  margin-left: 5px;
  vertical-align: middle;
}
.badge-am   { background: #FFF8E8; color: var(--ember); border: 1px solid var(--amber); }
.badge-pm   { background: #EEF0FF; color: #4A5DA8; border: 1px solid #9AA8D8; }
.badge-week { background: #EAF5EE; color: var(--green); border: 1px solid var(--sage); }
.badge-month{ background: #F0EAF8; color: #6A4A98; border: 1px solid #B89AD8; }
.badge-fire { background: #FFF0E8; color: var(--red); border: 1px solid #D8856A; }
.badge-maint{ background: #E8F4F8; color: #2A6878; border: 1px solid #6AAAC8; }
.badge-bear { background: #F8F0E8; color: #7A4A28; border: 1px solid #C8986A; }
.badge-heat { background: #F8E8E8; color: var(--red); border: 1px solid #D87A7A; }

/* ── Empty state ── */
.empty-state {
  text-align: center;
  padding: 50px 20px;
  color: var(--stone);
}
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.empty-title { font-size: 16px; font-weight: 700; color: var(--slate); margin-bottom: 4px; }
.empty-sub { font-size: 14px; }

/* ── Misc ── */
.spacer { height: 24px; }
.divider {
  height: 1px;
  background: var(--mist);
  margin: 14px 16px 0;
  max-width: 608px;
  margin-left: auto;
  margin-right: auto;
}
