// assets/js/terminal.js
// Handles terminal UI, menu, and navigation
import { javaFiles, menuItems } from './source.js';

export let menuIndex = 0;
export let inMenu = true;

export function renderPromptMenu() {
  const menu = menuItems.map((item, idx) =>
    `<div class="prompt-item${idx===menuIndex?' active':''}" data-idx="${idx}">${idx===menuIndex?'▶ ':'&nbsp;&nbsp;'}${item.label}</div>`
  ).join('');
  document.getElementById('prompt-menu').innerHTML = menu;
}

export function showCode(key) {
  inMenu = false;
  document.getElementById('prompt-menu').innerHTML = '';
  document.getElementById('terminal').innerHTML = `<pre style="color:#ff5555;">${javaFiles[key]}</pre>`;
  document.querySelectorAll('.menu button').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById('btn-' + key);
  if (btn) btn.classList.add('active');
  // Sync menuIndex with button
  const idx = menuItems.findIndex(item => item.key === key);
  if (idx !== -1) menuIndex = idx;
}

export function showMenu() {
  inMenu = true;
  document.getElementById('terminal').innerHTML = '<span style="color:#888">Use ↑/↓ to select, → to view code, ← to return.</span><div id="prompt-menu" style="margin-top:16px;"></div>';
  renderPromptMenu();
}

export function setupTerminalNavigation(runJavaFile) {
  const terminal = document.getElementById('terminal');
  terminal.setAttribute('tabindex', '0');
  terminal.addEventListener('click', () => terminal.focus());
  terminal.focus();

  terminal.addEventListener('keydown', function(e) {
    if (!inMenu && (e.key === 'ArrowLeft' || e.key === 'Enter')) {
      showMenu();
      e.preventDefault();
      return;
    }
    if (inMenu) {
      if (e.key === 'ArrowDown') {
        menuIndex = (menuIndex + 1) % menuItems.length;
        renderPromptMenu();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        menuIndex = (menuIndex - 1 + menuItems.length) % menuItems.length;
        renderPromptMenu();
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        showCode(menuItems[menuIndex].key);
        e.preventDefault();
      } else if (e.key === 'r' || e.key === 'R') {
        runJavaFile(menuItems[menuIndex].key);
        e.preventDefault();
      }
    }
  });
  // Allow clicking prompt items
  document.getElementById('terminal').addEventListener('click', function(e) {
    if (e.target.classList.contains('prompt-item')) {
      const idx = parseInt(e.target.getAttribute('data-idx'));
      if (!isNaN(idx)) {
        menuIndex = idx;
        showCode(menuItems[menuIndex].key);
      }
    }
  });
}

export function setupMenuButtons(runJavaFile) {
  menuItems.forEach((item, idx) => {
    const btn = document.getElementById('btn-' + item.key);
    if (btn) {
      btn.onclick = () => {
        menuIndex = idx;
        showCode(item.key);
      };
    }
  });
  // Add Run button
  let runBtn = document.querySelector('.run-btn');
  if (!runBtn) {
    runBtn = document.createElement('button');
    runBtn.textContent = '▶ Run';
    runBtn.className = 'run-btn';
    document.querySelector('.menu').appendChild(runBtn);
  }
  runBtn.onclick = () => {
    let idx = menuIndex;
    runJavaFile(menuItems[idx].key);
  };
}
