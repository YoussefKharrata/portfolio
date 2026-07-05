/* ==========================================================================
   EDIT YOUR CONTENT HERE
   ========================================================================== */

// Add, remove, or edit projects freely. Each one renders as a case-file card.
// severity is just a visual tag: "high" | "medium" | "low"
const projects = [
  {
    id: "CASE-001",
    title: "Internal Network Pentest Toolkit",
    category: "Network Security",
    severity: "high",
    description: "A modular toolkit for internal network assessments — host discovery, service fingerprinting, and automated privilege-escalation checks with a clean reporting layer.",
    stack: ["Python", "Nmap", "Impacket", "Scapy"],
    github: "https://github.com/yourusername/network-pentest-toolkit",
    demo: ""
  },
  {
    id: "CASE-002",
    title: "Web App Vulnerability Scanner",
    category: "Web Exploitation",
    severity: "high",
    description: "Automated scanner that crawls target applications and tests for injection flaws, auth bypasses, and misconfigurations, with severity-ranked output.",
    stack: ["Python", "Burp Suite API", "SQLi", "XSS"],
    github: "https://github.com/yourusername/webapp-scanner",
    demo: ""
  },
  {
    id: "CASE-003",
    title: "Malware Behavior Sandbox",
    category: "Malware Analysis",
    severity: "medium",
    description: "Isolated sandbox environment for detonating and observing suspicious binaries — syscall tracing, network capture, and automated IOC extraction.",
    stack: ["C", "YARA", "Cuckoo", "Wireshark"],
    github: "https://github.com/yourusername/malware-sandbox",
    demo: ""
  },
  {
    id: "CASE-004",
    title: "SOC Alert Triage Dashboard",
    category: "Defensive Security",
    severity: "medium",
    description: "Real-time dashboard that ingests SIEM alerts, deduplicates noise, and prioritizes incidents using a lightweight scoring model.",
    stack: ["TypeScript", "Elastic Stack", "React"],
    github: "https://github.com/yourusername/soc-dashboard",
    demo: ""
  },
  {
    id: "CASE-005",
    title: "Password Policy Auditor",
    category: "Identity & Access",
    severity: "low",
    description: "CLI tool that audits Active Directory password policies against NIST and CIS benchmarks and flags weak configurations.",
    stack: ["PowerShell", "Active Directory", "CIS Benchmarks"],
    github: "https://github.com/yourusername/password-policy-auditor",
    demo: ""
  },
  {
    id: "CASE-006",
    title: "CTF Writeups & Exploit Library",
    category: "Research",
    severity: "low",
    description: "A growing collection of CTF writeups and reusable exploit primitives, organized by vulnerability class for quick reference.",
    stack: ["Python", "pwntools", "Reverse Engineering"],
    github: "https://github.com/yourusername/ctf-writeups",
    demo: ""
  }
];

// Add, remove, or edit skill groups. Level is 1–5 and renders as signal bars.
const skillGroups = [
  {
    category: "Offensive Security",
    skills: [
      { name: "Penetration Testing", level: 5 },
      { name: "Web Exploitation", level: 5 },
      { name: "Social Engineering", level: 3 },
      { name: "Red Team Ops", level: 4 }
    ]
  },
  {
    category: "Defensive Security",
    skills: [
      { name: "Incident Response", level: 4 },
      { name: "SIEM & Log Analysis", level: 4 },
      { name: "Threat Hunting", level: 3 },
      { name: "Network Monitoring", level: 4 }
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Burp Suite", level: 5 },
      { name: "Metasploit", level: 4 },
      { name: "Wireshark", level: 4 },
      { name: "Nmap", level: 5 }
    ]
  },
  {
    category: "Languages & Scripting",
    skills: [
      { name: "Python", level: 5 },
      { name: "Bash", level: 4 },
      { name: "PowerShell", level: 3 },
      { name: "C", level: 3 }
    ]
  }
];

/* ==========================================================================
   BOOT SEQUENCE (hero terminal)
   ========================================================================== */
const bootLines = [
  { text: "initializing secure session...", type: "plain" },
  { text: "loading identity profile", type: "ok" },
  { text: "checking credentials  ", type: "okpath", path: "[verified]" },
  { text: "mounting /portfolio/case-files", type: "plain" },
  { text: "access granted.", type: "ok" }
];

function typeBootSequence() {
  const body = document.getElementById("terminalBody");
  const profile = document.getElementById("heroProfile");
  if (!body) return;

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  function nextChar() {
    if (lineIndex >= bootLines.length) {
      const cursor = document.createElement("span");
      cursor.className = "term-cursor";
      body.appendChild(cursor);
      if (profile) profile.classList.add("is-visible");
      return;
    }

    const line = bootLines[lineIndex];
    if (charIndex === 0) {
      currentLineEl = document.createElement("div");
      currentLineEl.className = "line";
      body.appendChild(currentLineEl);
    }

    if (charIndex < line.text.length) {
      currentLineEl.textContent += line.text[charIndex];
      charIndex++;
      setTimeout(nextChar, 14 + Math.random() * 18);
    } else {
      if (line.type === "ok") {
        currentLineEl.innerHTML = line.text + ' <span class="ok">[ok]</span>';
      } else if (line.type === "okpath" && line.path) {
        currentLineEl.innerHTML = line.text + ' <span class="path">' + line.path + "</span>";
      }
      lineIndex++;
      charIndex = 0;
      setTimeout(nextChar, 220);
    }
  }
  nextChar();
}

/* ==========================================================================
   RENDER: PROJECTS
   ========================================================================== */
function renderFilters() {
  const row = document.getElementById("filterRow");
  const categories = [...new Set(projects.map(p => p.category))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-chip";
    btn.dataset.filter = cat;
    btn.textContent = cat.toLowerCase();
    row.appendChild(btn);
  });

  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    row.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderCases(btn.dataset.filter);
  });
}

function renderCases(filter = "all") {
  const grid = document.getElementById("caseGrid");
  grid.innerHTML = "";

  const list = filter === "all" ? projects : projects.filter(p => p.category === filter);

  if (list.length === 0) {
    grid.innerHTML = '<div class="case-empty">// no case files match this filter</div>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "case-card";
    card.innerHTML = `
      <div class="case-top">
        <span class="case-id">${p.id}</span>
        <span class="case-severity sev-${p.severity}">${p.severity}</span>
      </div>
      <div>
        <p class="case-category">${p.category}</p>
        <h3 class="case-title">${p.title}</h3>
      </div>
      <p class="case-desc">${p.description}</p>
      <div class="case-stack">
        ${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join("")}
      </div>
      <div class="case-links">
        <a href="${p.github}" target="_blank" rel="noopener">&gt;&gt; view_source</a>
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">&gt;&gt; live_demo</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   RENDER: SKILLS
   ========================================================================== */
function renderSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";

  skillGroups.forEach(group => {
    const groupEl = document.createElement("div");
    groupEl.className = "skill-group";

    const rows = group.skills.map(skill => {
      const bars = Array.from({ length: 5 }, (_, i) =>
        `<span class="skill-bar ${i < skill.level ? "is-filled" : ""}"></span>`
      ).join("");
      return `
        <div class="skill-row">
          <span class="skill-name">${skill.name}</span>
          <div class="skill-bars">${bars}</div>
        </div>
      `;
    }).join("");

    groupEl.innerHTML = `<p class="skill-group-title">${group.category}</p>${rows}`;
    grid.appendChild(groupEl);
  });
}

/* ==========================================================================
   NAV: mobile toggle
   ========================================================================== */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderCases();
  renderSkills();
  initNavToggle();
  typeBootSequence();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
