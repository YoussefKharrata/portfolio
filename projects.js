/* ==========================================================================
   EDIT YOUR PROJECTS HERE
   status is a visual tag: "done" | "in-progress"
   ========================================================================== */
const projects = [
  {
    id: "CASE-001",
    title: "ZKP Authentication Demo",
    category: "Cryptography",
    status: "done",
    description: "Interactive app demonstrating password-less login via Zero-Knowledge Proofs : full Schnorr protocol, the Fiat-Shamir heuristic for non-interactive proofs, a simulated PKI for certificate issuance, and live simulations of four classic cryptographic attacks.",
    stack: ["Python", "Flask", "JavaScript", "HTML/CSS"],
    github: "https://github.com/YoussefKharrata/Cryptography_ZKP",
    demo: ""
  },
  {
    id: "CASE-002",
    title: "A2F Smart Card Access Control",
    category: "Identity & Access",
    status: "done",
    description: "Two-factor access control system built on JavaCard smart cards : a PIN as the first factor and a private key stored on-card as the second. Includes AES-128 encryption, brute-force lockout after 3 attempts, and full session/access logging.",
    stack: ["Java", "JavaCard", "APDU / ISO 7816"],
    github: "https://github.com/YoussefKharrata/AccessControlA2F",
    demo: ""
  },
  {
    id: "CASE-003",
    title: "SmartParking — IoT Access & Occupancy System",
    category: "IoT Security",
    status: "done",
    description: "Raspberry Pi + Arduino system that senses parking-spot occupancy with an ultrasonic sensor, gates entry with RFID badges, and only opens a motorized barrier when a spot is free. ML models forecast occupancy 12 hours out and flag anomalous badge behavior in real time.",
    stack: ["Python", "Arduino / C++", "MQTT", "Machine Learning"],
    github: "https://github.com/YoussefKharrata/SmartParking",
    demo: ""
  },
  {
    id: "CASE-004",
    title: "Internal Network Pentest Toolkit",
    category: "Network Security",
    status: "in-progress",
    description: "A modular toolkit for internal network assessments host discovery, service fingerprinting, and automated privilege-escalation checks with a clean reporting layer.",
    stack: ["Python", "Nmap", "Impacket", "Scapy"],
    github: "https://github.com/YoussefKharrata/network-pentest-toolkit",
    demo: ""
  },
  {
    id: "CASE-005",
    title: "Web App Vulnerability Scanner",
    category: "Web Exploitation",
    status: "in-progress",
    description: "Automated scanner that crawls target applications and tests for injection flaws, auth bypasses, and misconfigurations, with severity-ranked output.",
    stack: ["Python", "Burp Suite API", "SQLi", "XSS"],
    github: "https://github.com/YoussefKharrata/webapp-scanner",
    demo: ""
  },
  {
    id: "CASE-006",
    title: "Malware Behavior Sandbox",
    category: "Malware Analysis",
    status: "in-progress",
    description: "Isolated sandbox environment for detonating and observing suspicious binaries — syscall tracing, network capture, and automated IOC extraction.",
    stack: ["C", "YARA", "Cuckoo", "Wireshark"],
    github: "https://github.com/YoussefKharrata/malware-sandbox",
    demo: ""
  },
  {
    id: "CASE-007",
    title: "SOC Alert Triage Dashboard",
    category: "Defensive Security",
    status: "in-progress",
    description: "Real-time dashboard that ingests SIEM alerts, deduplicates noise, and prioritizes incidents using a lightweight scoring model.",
    stack: ["TypeScript", "Elastic Stack", "React"],
    github: "https://github.com/YoussefKharrata/soc-dashboard",
    demo: ""
  },
  {
    id: "CASE-008",
    title: "Password Policy Auditor",
    category: "Identity & Access",
    status: "in-progress",
    description: "CLI tool that audits Active Directory password policies against NIST and CIS benchmarks and flags weak configurations.",
    stack: ["PowerShell", "Active Directory", "CIS Benchmarks"],
    github: "https://github.com/YoussefKharrata/password-policy-auditor",
    demo: ""
  },
  {
    id: "CASE-009",
    title: "CTF Writeups & Exploit Library",
    category: "Research",
    status: "in-progress",
    description: "A growing collection of CTF writeups and reusable exploit primitives, organized by vulnerability class for quick reference.",
    stack: ["Python", "pwntools", "Reverse Engineering"],
    github: "https://github.com/YoussefKharrata/ctf-writeups",
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

const STATUS_LABEL = {
  "done": "done",
  "in-progress": "in progress"
};

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
        <span class="case-status status-${p.status}">${STATUS_LABEL[p.status] || p.status}</span>
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
