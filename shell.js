/* ==========================================================================
   HOME PAGE: boot sequence + interactive shell
   ========================================================================== */

const bootLines = [
  { text: "initializing secure session...", type: "plain" },
  { text: "loading identity profile", type: "ok" },
  { text: "checking credentials  ", type: "okpath", path: "[verified]" },
  { text: "mounting /portfolio", type: "plain" },
  { text: "access granted. type 'help' to begin.", type: "ok" }
];

const PROMPT_USER = "youssef@sec";
const PROMPT_PATH = "~$";

const commands = {
  help() {
    return [
      "available commands:",
      "&nbsp;&nbsp;whoami        — short bio",
      "&nbsp;&nbsp;projects      — open the case files page",
      "&nbsp;&nbsp;skills        — open the capability matrix",
      "&nbsp;&nbsp;contact       — open the contact page",
      "&nbsp;&nbsp;github        — open my GitHub profile",
      "&nbsp;&nbsp;ls            — list site sections",
      "&nbsp;&nbsp;clear         — clear the terminal",
    ];
  },
  whoami() {
    return [
      "Youssef Kharrata — cybersecurity engineer.",
      "Defensive security, threat research, and building systems that hold up under pressure.",
      "Based in Casablanca, MA. Open to remote &amp; onsite work."
    ];
  },
  ls() {
    return ["index.html&nbsp;&nbsp;projects.html&nbsp;&nbsp;skills.html&nbsp;&nbsp;contact.html"];
  },
  projects() {
    navigateAfter("projects.html");
    return ["opening projects.html ..."];
  },
  skills() {
    navigateAfter("skills.html");
    return ["opening skills.html ..."];
  },
  contact() {
    navigateAfter("contact.html");
    return ["opening contact.html ..."];
  },
  github() {
    return [
      'opening <a href="https://github.com/YoussefKharrata" target="_blank" rel="noopener">github.com/YoussefKharrata</a> in a new tab ...',
    ];
  },
  sudo(arg) {
    if (arg && arg.includes("rm")) {
      return ["nice try. this terminal has no filesystem to destroy — and neither should you run that for real."];
    }
    return ["permission denied: nice try."];
  },
  date() {
    return [new Date().toString()];
  },
  hack() {
    return [
      "initiating mainframe breach...",
      "&nbsp;&nbsp;[██████████████████████████] 100%",
      "just kidding. want to see my <a href=\"projects.html\">actual work</a> instead?"
    ];
  },
  matrix() {
    return ["wake up, Youssef...", "the projects page has you. 👁"];
  },
  coffee() {
    return ["☕ brewing... this may take longer than most CVEs get patched."];
  },
  clear() {
    clearTerminal();
    return null;
  }
};

function navigateAfter(url) {
  setTimeout(() => { window.location.href = url; }, 550);
}

function clearTerminal() {
  const body = document.getElementById("terminalBody");
  const inputRow = document.getElementById("terminalInputRow");
  body.innerHTML = "";
  if (inputRow) body.appendChild(inputRow);
}

function appendLine(html, extraClass) {
  const body = document.getElementById("terminalBody");
  const inputRow = document.getElementById("terminalInputRow");
  const line = document.createElement("div");
  line.className = "line" + (extraClass ? " " + extraClass : "");
  line.innerHTML = html;
  if (inputRow) {
    body.insertBefore(line, inputRow);
  } else {
    body.appendChild(line);
  }
  body.scrollTop = body.scrollHeight;
}

function runCommand(raw) {
  const trimmed = raw.trim();
  appendLine(
    `<span class="prompt-tag">${PROMPT_USER}</span><span class="prompt-sep2">${PROMPT_PATH}</span> ${escapeHtml(trimmed)}`,
    "echoed"
  );

  if (trimmed === "") return;

  const [cmd, ...rest] = trimmed.split(/\s+/);
  const key = cmd.toLowerCase();

  if (key === "github") {
    window.open("https://github.com/YoussefKharrata", "_blank", "noopener");
  }

  if (Object.prototype.hasOwnProperty.call(commands, key)) {
    const output = commands[key](rest.join(" "));
    if (output) output.forEach(l => appendLine(l));
  } else {
    appendLine(`command not found: ${escapeHtml(key)} — type <em style="font-style:normal;color:var(--blue)">help</em> for a list of commands`, "error");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function buildInputRow() {
  const row = document.createElement("div");
  row.className = "terminal-input-row";
  row.id = "terminalInputRow";
  row.innerHTML = `
    <span class="prompt-tag">${PROMPT_USER}</span><span class="prompt-sep2">${PROMPT_PATH}</span>
    <input type="text" class="terminal-input" id="terminalInput" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command input">
  `;
  return row;
}

const commandHistory = [];
let historyPointer = -1;

function initShell() {
  const body = document.getElementById("terminalBody");
  if (!body) return;

  body.addEventListener("click", () => {
    const input = document.getElementById("terminalInput");
    if (input) input.focus();
  });

  body.appendChild(buildInputRow());
  const input = document.getElementById("terminalInput");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      if (value.trim() !== "") {
        commandHistory.push(value);
      }
      historyPointer = commandHistory.length;
      input.value = "";
      runCommand(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyPointer = Math.max(0, historyPointer - 1);
      input.value = commandHistory[historyPointer] ?? "";
      requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyPointer = Math.min(commandHistory.length, historyPointer + 1);
      input.value = commandHistory[historyPointer] ?? "";
    }
  });

  input.focus();
}

function typeBootSequence() {
  const body = document.getElementById("terminalBody");
  const profile = document.getElementById("heroProfile");
  if (!body) return;

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;

  function nextChar() {
    if (lineIndex >= bootLines.length) {
      if (profile) profile.classList.add("is-visible");
      initShell();
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

document.addEventListener("DOMContentLoaded", () => {
  typeBootSequence();
});
