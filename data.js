// ── Starlight Glamping — App Logic ───────────────────────────────

// ── Storage helpers ──
function storageGet(key) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
  catch { return null; }
}
function storageSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ── State ──
let currentCL = "daily-am";
let checkState = {};       // { taskId: true/false }
let tentState  = {};       // { tentId: { field: value } }
let allReports = storageGet("sl_reports") || [];

// ── Date helpers ──
function todayStr() {
  return new Date().toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" });
}
function nowStr() {
  return new Date().toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit" });
}
function todayKey() { return new Date().toISOString().split("T")[0]; }

// ── Init ──
document.getElementById("headerDate").innerHTML =
  new Date().toLocaleDateString("en-US", { weekday:"long" }) + "<br>" +
  new Date().toLocaleDateString("en-US", { month:"short", day:"numeric" });

// ── Tab switching ──
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("view-" + tab.dataset.tab).classList.add("active");
    if (tab.dataset.tab === "manager") renderManager();
  });
});

// ── Checklist selector ──
document.querySelectorAll(".cl-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cl-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCL = btn.dataset.cl;
    checkState = {};
    tentState  = {};
    renderChecklist();
    // hide success if switching
    document.getElementById("successBanner").classList.add("hidden");
    document.getElementById("submitBtn").classList.remove("hidden");
    document.querySelector(".page-section:last-of-type").style.display = "";
  });
});

// ── Render checklist area ──
function renderChecklist() {
  const area = document.getElementById("checklist-area");
  const cl = CHECKLISTS[currentCL];
  if (!cl) { area.innerHTML = ""; return; }

  let html = "";

  // Info box for role-specific notes
  if (cl.info) {
    html += `<div class="info-box">⚠️ <strong>Shift reminder:</strong> ${cl.info}</div>`;
  }

  if (cl.type === "tasks") {
    cl.sections.forEach(sec => {
      html += `<div class="card">`;
      html += `<div class="card-header${sec.optional ? '' : ''}">${sec.title}</div>`;
      sec.tasks.forEach(task => {
        const imp = task.important ? ' style="font-weight:600;"' : "";
        const opt = task.optional ? `<span class="optional-badge">Optional</span>` : "";
        html += `
          <div class="task-row" data-id="${task.id}" onclick="toggleTask('${task.id}')">
            <div class="task-check">
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path d="M1 5L5 9L12 1" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="task-label">
              <span${imp}>${task.text}</span>${opt}
              ${task.note ? `<div class="task-instruction">${task.note}</div>` : ""}
            </div>
          </div>`;
      });
      html += `</div>`;
    });

  } else if (cl.type === "tent-tracker") {
    html += renderTentTracker(cl);
  }

  area.innerHTML = html;
}

function toggleTask(id) {
  checkState[id] = !checkState[id];
  const row = document.querySelector(`.task-row[data-id="${id}"]`);
  if (row) row.classList.toggle("checked", !!checkState[id]);
}

// ── Tent tracker renderer ──
function renderTentTracker(cl) {
  let html = `<div class="card">`;

  if (cl.trackingType === "bearspray") {
    html += `<div class="card-header amber">🐻 Bear Spray — Guest Return Tracker</div>`;
    html += `<div class="tent-form">`;
    html += `<div class="tent-header"><span>Tent</span><span>Check-in</span><span>Check-out / Returned?</span></div>`;
    cl.tents.forEach(tent => {
      html += `
        <div class="tent-row">
          <span class="tent-id">${tent}</span>
          <input class="tent-input" type="date" data-tent="${tent}" data-field="checkin"
            onchange="updateTent('${tent}','checkin',this.value)" />
          <select class="tent-select" data-tent="${tent}" data-field="returned"
            onchange="updateTent('${tent}','returned',this.value)">
            <option value="">—</option>
            <option value="returned">Returned ✓</option>
            <option value="missing">Missing ✗</option>
            <option value="na">N/A</option>
          </select>
        </div>`;
    });
    html += `</div></div>`;

  } else if (cl.trackingType === "heater") {
    html += `<div class="card-header amber">♨️ Heater Tracker — Per Tent</div>`;
    html += `<div class="tent-form">`;
    html += `<div class="tent-header"><span>Tent</span><span>Paid?</span><span>Size / # Tanks</span></div>`;
    cl.tents.forEach(tent => {
      html += `
        <div class="tent-row">
          <span class="tent-id">${tent}</span>
          <select class="tent-select" data-tent="${tent}" data-field="paid"
            onchange="updateTent('${tent}','paid',this.value)">
            <option value="">—</option>
            <option value="yes">Paid ✓</option>
            <option value="no">Not paid</option>
            <option value="na">N/A</option>
          </select>
          <select class="tent-select" data-tent="${tent}" data-field="size"
            onchange="updateTent('${tent}','size',this.value)">
            <option value="">—</option>
            <option value="big-1">Big — 1 tank</option>
            <option value="big-2">Big — 2 tanks</option>
            <option value="little-1">Little — 1 tank</option>
            <option value="little-2">Little — 2 tanks</option>
            <option value="na">N/A</option>
          </select>
        </div>`;
    });
    html += `</div></div>`;
  }

  return html;
}

function updateTent(tent, field, value) {
  if (!tentState[tent]) tentState[tent] = {};
  tentState[tent][field] = value;
}

// ── Submit ──
document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("staffName").value.trim();
  if (!name) {
    alert("Please enter your name before submitting.");
    document.getElementById("staffName").focus();
    return;
  }

  const cl = CHECKLISTS[currentCL];
  let taskSummary = {};
  let completedCount = 0;
  let totalCount = 0;

  if (cl.type === "tasks") {
    cl.sections.forEach(sec => {
      sec.tasks.forEach(task => {
        if (!task.optional) totalCount++;
        taskSummary[task.id] = !!checkState[task.id];
        if (checkState[task.id]) completedCount++;
      });
    });
  }

  const report = {
    id: Date.now(),
    date: todayKey(),
    dateLabel: todayStr(),
    time: nowStr(),
    staff: name,
    checklist: currentCL,
    checklistLabel: cl.label,
    tasks: taskSummary,
    tents: { ...tentState },
    notes: document.getElementById("staffNotes").value.trim(),
    completedCount,
    totalCount,
  };

  allReports.push(report);
  storageSet("sl_reports", allReports);

  // Show success
  document.getElementById("submitBtn").classList.add("hidden");
  document.getElementById("staffNotes").value = "";
  document.getElementById("successBanner").classList.remove("hidden");

  // Reset after 4s so they can submit another checklist
  setTimeout(() => {
    checkState = {};
    tentState  = {};
    renderChecklist();
    document.getElementById("successBanner").classList.add("hidden");
    document.getElementById("submitBtn").classList.remove("hidden");
  }, 4000);
});

// ── Manager Dashboard ──
function renderManager() {
  const el = document.getElementById("manager-content");
  if (!allReports.length) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div class="empty-title">No submissions yet</div>
        <div class="empty-sub">Staff submissions will appear here once the daily checklist is completed.</div>
      </div>`;
    return;
  }

  // Stats
  const today = allReports.filter(r => r.date === todayKey());
  const total = allReports.length;
  const staffSet = new Set(allReports.map(r => r.staff));

  // Sort recent first
  const recent = [...allReports].reverse().slice(0, 30);

  const badgeMap = {
    "daily-am": "badge-am", "daily-pm": "badge-pm",
    "weekly": "badge-week", "monthly": "badge-month",
    "campfire": "badge-fire", "maintenance": "badge-maint",
    "bearspray": "badge-bear", "heater": "badge-heat"
  };

  let html = `
    <div class="stat-row">
      <div class="stat-box amber-top">
        <div class="stat-num">${today.length}</div>
        <div class="stat-label">Today</div>
      </div>
      <div class="stat-box green-top">
        <div class="stat-num">${total}</div>
        <div class="stat-label">All time</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">${staffSet.size}</div>
        <div class="stat-label">Staff</div>
      </div>
    </div>`;

  // Today's submissions highlighted
  if (today.length) {
    html += `<div class="card" style="margin-top:14px;">`;
    html += `<div class="card-header">✅ Today's Submissions</div>`;
    today.forEach(r => {
      const pct = r.totalCount ? Math.round((r.completedCount / r.totalCount) * 100) : null;
      html += `
        <div class="log-row">
          <div class="log-who">${r.staff}
            <span class="badge ${badgeMap[r.checklist] || ''}">${r.checklistLabel}</span>
          </div>
          <div class="log-meta">${r.time}${pct !== null ? ` · ${r.completedCount}/${r.totalCount} tasks (${pct}%)` : ''}</div>
          ${r.notes ? `<div class="log-notes">"${r.notes}"</div>` : ""}
        </div>`;
    });
    html += `</div>`;
  }

  // Full history
  html += `<div class="card" style="margin-top:14px; margin-bottom: 40px;">`;
  html += `<div class="card-header">Recent Submissions</div>`;
  recent.forEach(r => {
    const pct = r.totalCount ? Math.round((r.completedCount / r.totalCount) * 100) : null;
    html += `
      <div class="log-row">
        <div class="log-who">${r.staff}
          <span class="badge ${badgeMap[r.checklist] || ''}">${r.checklistLabel}</span>
        </div>
        <div class="log-meta">${r.dateLabel} · ${r.time}${pct !== null ? ` · ${r.completedCount}/${r.totalCount} tasks` : ''}</div>
        ${r.notes ? `<div class="log-notes">"${r.notes}"</div>` : ""}
      </div>`;
  });
  html += `</div>`;

  el.innerHTML = html;
}

// ── Initial render ──
renderChecklist();
