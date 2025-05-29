// Import modules
import { runJavaFile } from './wasm-jvm.js';

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
    html += '<span style="color:#888">Use ↑/↓ to select, Enter to run, → to view code.</span><br>';
    javaFilesList.forEach((file, idx) => {
      html += (idx === selectedFileIdx ? '<b style="color:#ff5555">▶ ' : '&nbsp;&nbsp;') + file.label + (idx === selectedFileIdx ? '</b>' : '') + '<br>';
    });
    html += '<br><span style="color:#ffb86c">' + javaFilesList[selectedFileIdx].brief + '</span>';
  } else if (terminalState === 'output') {
    html += '<pre style="color:#ff5555;">' + lastOutputText + '</pre>';
    html += '<br><span style="color:#888">[→] Check source code  |  [b] Back to menu</span>';
  } else if (terminalState === 'source') {
    html += '<pre style="color:#ff5555;">' + javaFiles[javaFilesList[selectedFileIdx].key] + '</pre>';
    html += '<br><span style="color:#888">[←] Back to output  |  [b] Back to menu</span>';
  } else if (terminalState === 'running') {
    html += '<span style="color:#888">Running Java...</span>';
  }
  terminal.innerHTML = html;
  // Show/hide mobile source button
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
function listenForKeys(runJavaFile) {
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
        runJavaFile(javaFilesList[selectedFileIdx].key, showOutput);
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
});

// Initial render
showMenu();
listenForKeys(runJavaFile);

// Expose for Java runner
window.showOutput = showOutput;
window.showMenu = showMenu;
window.showSource = showSource;
