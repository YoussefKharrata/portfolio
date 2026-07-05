/* ==========================================================================
   EDIT YOUR SKILLS HERE — level is 1–5, renders as signal bars
   ========================================================================== */
const skillGroups = [
  {
    category: "Offensive Security",
    skills: [
      { name: "Penetration Testing", level: 2 },
      { name: "Web Exploitation", level: 3 },
      { name: "Social Engineering", level: 3 },
      { name: "Red Team Ops", level: 2 }
    ]
  },
  {
    category: "Defensive Security",
    skills: [
      { name: "Incident Response", level: 3 },
      { name: "SIEM & Log Analysis", level: 3 },
      { name: "Threat Hunting", level: 2 },
      { name: "Network Monitoring", level: 4 }
    ]
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Burp Suite", level: 3 },
      { name: "Metasploit", level: 3 },
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

document.addEventListener("DOMContentLoaded", renderSkills);
