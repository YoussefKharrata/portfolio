/* ==========================================================================
   EDIT YOUR PROJECTS HERE
   severity is just a visual tag: "high" | "medium" | "low"
   ========================================================================== */
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

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderCases();
});
