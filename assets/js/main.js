// Import modules
import { runJavaFile, javaVM } from './wasm-jvm.js';
import { javaStreams } from './jvm-streams.js';
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
    html += '<span class="terminal-instruction">Use <span class="kbd">↑</span><span class="kbd">↓</span> to select, <span class="kbd">Enter</span>/double-tap to run, <span class="kbd">→</span> to view code.</span><br>';
    // Terminal printed menu with switch indicator
    html += '<div id="terminal-menu-list">';
    javaFilesList.forEach((file, idx) => {
      html += `<div class="terminal-menu-item${idx===selectedFileIdx?' active':''}" data-idx="${idx}">`;
      html += `<span class="switch-indicator">${idx===selectedFileIdx?'▶':'&nbsp;'}</span>`;
      html += `<span>${file.label}</span>`;
      html += '</div>';
    });
    html += '</div>';
    html += '<br><span class="file-description">' + javaFilesList[selectedFileIdx].brief + '</span>';
    // Mobile menu buttons (below for accessibility)
    html += '<div class="mobile-menu-btns">';
    javaFilesList.forEach((file, idx) => {
      html += `<button class="mobile-menu-btn${idx===selectedFileIdx?' active':''}" data-idx="${idx}">${file.label}</button>\n`;
    });
    html += '</div>';
  } else if (terminalState === 'output') {
    html += '<pre class="terminal-output">' + lastOutputText + '</pre>';
    html += '<br><span class="terminal-instruction"><span class="kbd">→</span> Check source code  |  <span class="kbd">b</span> Back to menu</span>';
    html += '<div class="mobile-output-btns"><button id="mobile-source-btn">Check Source Code</button> <button id="mobile-back-btn">Back to Menu</button></div>';
  } else if (terminalState === 'source') {
    html += '<pre class="terminal-output">' + javaFiles[javaFilesList[selectedFileIdx].key] + '</pre>';
    html += '<br><span class="terminal-instruction"><span class="kbd">←</span> Back to output  |  <span class="kbd">b</span> Back to menu</span>';
    html += '<div class="mobile-source-btns"><button id="mobile-back-output-btn">Back to Output</button> <button id="mobile-back-menu-btn">Back to Menu</button></div>';
  } else if (terminalState === 'running') {
    html += '<span class="terminal-instruction">Running Java<span class="loading-dots"></span></span>';
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
}

// Handle Java input requests for simulations
function requestJavaInput(promptText) {
  // Show input prompt state on terminal
  if (terminalState === 'running') {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = `
      <span class="terminal-instruction">Java program is waiting for input:</span>
      <pre class="terminal-output">${promptText || 'Enter input:'}</pre>
      <span class="input-indicator">▌</span>
    `;
  }
  
  return new Promise(resolve => {
    const dialog = document.createElement('div');
    dialog.className = 'java-input-dialog';
    dialog.innerHTML = `<div class="java-input-prompt">${promptText || 'Java program requests input:'}</div>
      <input id="java-input" class="java-input-field" autofocus />
      <button id="java-input-ok" class="java-input-btn">OK</button>`;
    document.body.appendChild(dialog);
    document.getElementById('java-input').focus();
    document.getElementById('java-input-ok').onclick = () => {
      const val = document.getElementById('java-input').value + '\n';
      document.body.removeChild(dialog);
      
      // Update terminal to show the input being processed
      if (terminalState === 'running') {
        const terminal = document.getElementById('terminal');
        terminal.innerHTML = `
          <span class="terminal-instruction">Processing input...</span>
          <span class="loading-dots"></span>
        `;
      }
      
      resolve(val);
    };
    document.getElementById('java-input').onkeydown = (e) => {
      if (e.key === 'Enter') {
        document.getElementById('java-input-ok').click();
      }
    };
  });
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

  // Initialize Java streams manager with our input handler
  javaStreams.initialize({
    onInputRequest: promptText => window.requestJavaInput(promptText)
  });

  // Initial render and event setup after DOM is ready
  showMenu();
  listenForKeys();
});

// Expose for Java runner
window.showOutput = showOutput;
window.showMenu = showMenu;
window.showSource = showSource;
window.requestJavaInput = requestJavaInput;
window.runJavaFile = (key, cb) => runJavaFile(key).then(cb);
