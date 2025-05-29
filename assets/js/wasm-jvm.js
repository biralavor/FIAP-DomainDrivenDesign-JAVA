// assets/js/wasm-jvm.js
// Handles Wasm JVM integration and running Java class files
import { menuItems } from './source.js';

let jvmReady = false;
let jvmInstance = null;

export async function ensureJvm() {
  if (jvmReady) return jvmInstance;
  if (!window.WasmJvm) {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '<span style="color:red">Error: Wasm JVM not loaded!</span>';
    return null;
  }
  jvmInstance = await WasmJvm.create();
  jvmReady = true;
  return jvmInstance;
}

export async function runJavaFile(key) {
  const terminal = document.getElementById('terminal');
  terminal.innerHTML = '<span style="color:#888">Running Java... (Wasm JVM)</span>';
  const jvm = await ensureJvm();
  if (!jvm) return;
  // Map key to class file path (must be pre-compiled and placed in assets/java/)
  const classMap = {
    'cliente': 'assets/java/Cliente.class',
    'calculator': 'assets/java/Calculator.class',
    'breadmaker': 'assets/java/BreadMaker.class'
  };
  const classPath = classMap[key];
  if (!classPath) {
    terminal.innerHTML = '<span style="color:red">Class file not found for this study.</span>';
    return;
  }
  // Fetch the class file as ArrayBuffer
  const response = await fetch(classPath);
  if (!response.ok) {
    terminal.innerHTML = '<span style="color:red">Failed to load class file: ' + classPath + '</span>';
    return;
  }
  const classBytes = await response.arrayBuffer();
  // Load class into JVM
  await jvm.fs.writeFile('/tmp/RunClass.class', new Uint8Array(classBytes));
  // Redirect output
  let output = '';
  jvm.setStdout({
    write: (s) => {
      output += s;
      terminal.innerHTML = '<pre style="color:#ff5555;">' + output + '</pre>';
    }
  });
  jvm.setStderr({
    write: (s) => {
      output += s;
      terminal.innerHTML = '<pre style="color:#ff5555;">' + output + '</pre>';
    }
  });
  // Handle input
  jvm.setStdin({
    async read() {
      // Show a prompt for user input
      const userInput = await new Promise(resolve => {
        const dialog = document.createElement('div');
        dialog.style = 'position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);background:#222;padding:24px 32px;border-radius:8px;z-index:9999;color:#fff;box-shadow:0 0 16px #ff5555cc;';
        dialog.innerHTML = '<div style="margin-bottom:12px;">Java program requests input:</div>' +
          '<input id="java-input" style="width:220px;padding:8px;font-size:1em;" autofocus />' +
          '<button id="java-input-ok" style="margin-left:12px;padding:8px 16px;">OK</button>';
        document.body.appendChild(dialog);
        document.getElementById('java-input').focus();
        document.getElementById('java-input-ok').onclick = () => {
          const val = document.getElementById('java-input').value + '\n';
          document.body.removeChild(dialog);
          resolve(val);
        };
        document.getElementById('java-input').onkeydown = (e) => {
          if (e.key === 'Enter') {
            document.getElementById('java-input-ok').click();
          }
        };
      });
      return userInput;
    }
  });
  // Run the class (assumes main method)
  try {
    await jvm.exec({
      className: 'RunClass',
      classPath: ['/tmp'],
      args: []
    });
  } catch (err) {
    output += '\n[Java Error] ' + err;
    terminal.innerHTML = '<pre style="color:#ff5555;">' + output + '</pre>';
  }
}
