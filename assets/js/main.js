// Import modules
import { renderPromptMenu, showCode, showMenu, setupTerminalNavigation, setupMenuButtons } from './terminal.js';
import { runJavaFile } from './wasm-jvm.js';

// State
let menuIndex = 0;
let inMenu = true;

// Initial render
showMenu();
renderPromptMenu();
setupTerminalNavigation(runJavaFile);
setupMenuButtons(runJavaFile);

// Ensure terminal is focusable and focused
const terminal = document.getElementById('terminal');
terminal.setAttribute('tabindex', '0');
terminal.addEventListener('click', () => terminal.focus());
terminal.focus();
