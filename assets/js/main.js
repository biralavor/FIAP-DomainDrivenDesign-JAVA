// Import modules
import { runJavaFile } from './wasm-jvm.js';
// --- Add: Import Java source code for source view ---
import { javaFiles } from './source.js';

// --- State Machine for Terminal UI ---
const javaFilesList = [
  { key: 'cliente', label: 'Cliente.java', brief: 'Java class for client data and info display.' },
  { key: 'calculator', label: 'Calculator.java', brief: 'Simple calculator with input and operations.' },
  { key: 'breadmaker', label: 'BreadMaker.java', brief: 'Bread maker simulation with menu and timer.' }
];
const javaBaseURL = '';
let terminalState = 'menu'; // menu, running, output, source
let selectedFileIdx = 0;
let lastOutputText = '';

function renderTerminal() {
  const terminal = document.getElementById('terminal');
  let html = '';
  if (terminalState === 'menu') {
    html += '<span style="color:#888">Use ↑/↓ to select, Enter/double-tap to run, → to view code.</span><br>';
    // Terminal printed menu with switch indicator
    html += '<div id="terminal-menu-list" style="margin-top:18px;">';
    javaFilesList.forEach((file, idx) => {
      html += `<div class="terminal-menu-item${idx===selectedFileIdx?' active':''}" data-idx="${idx}" style="display:flex;align-items:center;gap:8px;cursor:pointer;">`;
      html += `<span style="display:inline-block;width:18px;text-align:center;">${idx===selectedFileIdx?'▶':'&nbsp;'}</span>`;
      html += `<span>${file.label}</span>`;
      html += '</div>';
    });
    html += '</div>';
    html += '<br><span style="color:#ffb86c">' + javaFilesList[selectedFileIdx].brief + '</span>';
    // Mobile menu buttons (below for accessibility)
    html += '<div class="mobile-menu-btns" style="margin-top:18px;">';
    javaFilesList.forEach((file, idx) => {
      html += `<button class="mobile-menu-btn${idx===selectedFileIdx?' active':''}" data-idx="${idx}">${file.label}</button>\n`;
    });
    html += '</div>';
  } else if (terminalState === 'output') {
    html += '<pre style="color:#ff5555;">' + lastOutputText + '</pre>';
    html += '<br><span style="color:#888">[→] Check source code  |  [b] Back to menu</span>';
    html += '<div class="mobile-output-btns"><button id="mobile-source-btn">Check Source Code</button> <button id="mobile-back-btn">Back to Menu</button></div>';
  } else if (terminalState === 'source') {
    html += '<pre style="color:#ff5555;">' + javaFiles[javaFilesList[selectedFileIdx].key] + '</pre>';
    html += '<br><span style="color:#888">[←] Back to output  |  [b] Back to menu</span>';
    html += '<div class="mobile-source-btns"><button id="mobile-back-output-btn">Back to Output</button> <button id="mobile-back-menu-btn">Back to Menu</button></div>';
  } else if (terminalState === 'running') {
    html += '<span style="color:#888">Running Java...</span>';
  }
  terminal.innerHTML = html;

  // Terminal menu item click (desktop & mobile)
  document.querySelectorAll('.terminal-menu-item').forEach(item => {
    item.onclick = function() {
      selectedFileIdx = parseInt(item.getAttribute('data-idx'));
      renderTerminal();
    };
    item.ondblclick = function() {
      selectedFileIdx = parseInt(item.getAttribute('data-idx'));
      terminalState = 'running';
      renderTerminal();
      window.runJavaFile(javaFilesList[selectedFileIdx].key, showOutput);
    };
  });
  // Mobile menu button logic
  document.querySelectorAll('.mobile-menu-btn').forEach(btn => {
    btn.onclick = function() {
      selectedFileIdx = parseInt(btn.getAttribute('data-idx'));
      renderTerminal();
    };
    btn.ondblclick = function() {
      selectedFileIdx = parseInt(btn.getAttribute('data-idx'));
      terminalState = 'running';
      renderTerminal();
      window.runJavaFile(javaFilesList[selectedFileIdx].key, showOutput);
    };
  });
  // Mobile output/source navigation
  const srcBtn = document.getElementById('mobile-source-btn');
  if (srcBtn) srcBtn.onclick = showSource;
  const backBtn = document.getElementById('mobile-back-btn');
  if (backBtn) backBtn.onclick = showMenu;
  const backOutputBtn = document.getElementById('mobile-back-output-btn');
  if (backOutputBtn) backOutputBtn.onclick = () => showOutput(lastOutputText);
  const backMenuBtn = document.getElementById('mobile-back-menu-btn');
  if (backMenuBtn) backMenuBtn.onclick = showMenu;
  // Show/hide desktop source button
  const btn = document.getElementById('show-source-btn');
  if (btn) btn.style.display = (terminalState === 'output') ? 'inline-block' : 'none';
}

function showMenu() {
  terminalState = 'menu';
  renderTerminal();
}

function showOutput(text) {
  terminalState = 'output';
  lastOutputText = text;
  renderTerminal();
}

function showSource() {
  terminalState = 'source';
  renderTerminal();
}

// Keyboard navigation
function listenForKeys() {
  document.addEventListener('keydown', function(e) {
    if (terminalState === 'menu') {
      if (e.key === 'ArrowUp') {
        selectedFileIdx = (selectedFileIdx - 1 + javaFilesList.length) % javaFilesList.length;
        renderTerminal();
      } else if (e.key === 'ArrowDown') {
        selectedFileIdx = (selectedFileIdx + 1) % javaFilesList.length;
        renderTerminal();
      } else if (e.key === 'Enter') {
        terminalState = 'running';
        renderTerminal();
        window.runJavaFile(javaFilesList[selectedFileIdx].key, showOutput);
      } else if (e.key === 'ArrowRight') {
        showSource();
      }
    } else if (terminalState === 'output') {
      if (e.key === 'ArrowRight') {
        showSource();
      } else if (e.key.toLowerCase() === 'b') {
        showMenu();
      }
    } else if (terminalState === 'source') {
      if (e.key === 'ArrowLeft') {
        showOutput(lastOutputText);
      } else if (e.key.toLowerCase() === 'b') {
        showMenu();
      }
    }
  });
}

// Mobile source code button
window.addEventListener('DOMContentLoaded', function() {
  let btn = document.getElementById('show-source-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'show-source-btn';
    btn.textContent = 'Check Source Code';
    btn.className = 'terminal-btn';
    btn.style.display = 'none';
    btn.onclick = showSource;
    document.body.appendChild(btn);
  }

  // Initial render and event setup after DOM is ready
  showMenu();
  listenForKeys();
});

// Expose for Java runner
window.showOutput = showOutput;
window.showMenu = showMenu;
window.showSource = showSource;
window.runJavaFile = (key, cb) => runJavaFile(key).then(cb);
