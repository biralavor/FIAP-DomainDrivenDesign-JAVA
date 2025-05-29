// assets/js/wasm-jvm.js
// Handles Wasm JVM integration and running Java class files
import { javaFiles } from './source.js';
import { javaStreams } from './jvm-streams.js';

/**
 * JavaVirtualMachine - Simulates a JVM environment for running Java code in the browser
 * 
 * This class provides an abstraction for running Java code in a web browser.
 * It can be extended to use WebAssembly for real Java execution, but currently
 * provides a simulation environment for demo purposes.
 */
class JavaVirtualMachine {
  constructor() {
    this.ready = false;
    this.running = false;
    this.classPath = [];
    this.sourceCode = {};
  }
  
  /**
   * Initialize the JVM environment
   */
  async initialize() {
    if (this.ready) return this;
    
    // Connect to the Java streams for I/O handling
    javaStreams.initialize();
    
    this.ready = true;
    return this;
  }
  
  /**
   * Load Java source code by key
   * @param {string} key The identifier for the Java source code
   */
  loadSource(key) {
    if (javaFiles[key]) {
      this.sourceCode[key] = javaFiles[key];
      return true;
    }
    return false;
  }
  
  /**
   * Run a Java program by its key
   * @param {string} key The identifier for the Java program to run
   * @returns {Promise<string>} The output from the Java program execution
   */
  async runProgram(key) {
    if (!this.ready) {
      await this.initialize();
    }
    
    // Load the source if not already loaded
    if (!this.sourceCode[key]) {
      this.loadSource(key);
    }
    
    this.running = true;
    javaStreams.clearBuffers();
    
    try {
      // In a real implementation, this would compile and run actual Java bytecode
      // For now, we'll implement a simulation based on the program key
      
      // The simulation just intercepts Java's standard I/O operations
      // and doesn't reproduce any Java-specific logic from the actual code files
      if (key === 'cliente') {
        await this.runClienteSimulation();
      } else if (key === 'calculator') {
        await this.runCalculatorSimulation();
      } else if (key === 'breadmaker') {
        await this.runBreadMakerSimulation();
      } else {
        javaStreams.writeOutput(`Program '${key}' not found or not supported.\n`);
      }
      
      this.running = false;
      return javaStreams.getOutput();
    } catch (error) {
      javaStreams.writeError(`Error executing Java program: ${error.message}\n`);
      this.running = false;
      return javaStreams.getOutput() + javaStreams.getError();
    }
  }

  /**
   * Simulate the Cliente.java execution
   */
  async runClienteSimulation() {
    javaStreams.writeOutput("Creating a new Client object...\n\n");
    
    const name = await javaStreams.requestInput("Enter client name:");
    const age = await javaStreams.requestInput("Enter client age:");
    const email = await javaStreams.requestInput("Enter client email:");
    const income = await javaStreams.requestInput("Enter client income:");
    
    javaStreams.writeOutput("/////////////////////////////// Client Info ////////////////////////////////\n");
    javaStreams.writeOutput(`Name: ${name.trim()}  ||  `);
    javaStreams.writeOutput(`Age: ${age.trim()}  ||  `);
    javaStreams.writeOutput(`Email: ${email.trim()}  ||  `);
    javaStreams.writeOutput(`Income: ${income.trim()}  ||  \n`);
    javaStreams.writeOutput("***************************************************************************\n");
    
    // Additional interaction
    const updateInfo = await javaStreams.requestInput("Would you like to update any client information? (y/n)");
    
    if (updateInfo.trim().toLowerCase() === 'y') {
      const field = await javaStreams.requestInput("Which field? (name, age, email, income)");
      
      let updatedValue = "";
      
      switch(field.trim().toLowerCase()) {
        case 'name':
          updatedValue = await javaStreams.requestInput("Enter new name:");
          javaStreams.writeOutput(`\nUpdating name from ${name.trim()} to ${updatedValue.trim()}\n`);
          javaStreams.writeOutput("/////////////////////////////// Updated Client ////////////////////////////////\n");
          javaStreams.writeOutput(`Name: ${updatedValue.trim()}  ||  `);
          javaStreams.writeOutput(`Age: ${age.trim()}  ||  `);
          javaStreams.writeOutput(`Email: ${email.trim()}  ||  `);
          javaStreams.writeOutput(`Income: ${income.trim()}  ||  \n`);
          javaStreams.writeOutput("***************************************************************************\n");
          break;
        case 'age':
          updatedValue = await javaStreams.requestInput("Enter new age:");
          javaStreams.writeOutput(`\nUpdating age from ${age.trim()} to ${updatedValue.trim()}\n`);
          javaStreams.writeOutput("/////////////////////////////// Updated Client ////////////////////////////////\n");
          javaStreams.writeOutput(`Name: ${name.trim()}  ||  `);
          javaStreams.writeOutput(`Age: ${updatedValue.trim()}  ||  `);
          javaStreams.writeOutput(`Email: ${email.trim()}  ||  `);
          javaStreams.writeOutput(`Income: ${income.trim()}  ||  \n`);
          javaStreams.writeOutput("***************************************************************************\n");
          break;
        case 'email':
          updatedValue = await javaStreams.requestInput("Enter new email:");
          javaStreams.writeOutput(`\nUpdating email from ${email.trim()} to ${updatedValue.trim()}\n`);
          javaStreams.writeOutput("/////////////////////////////// Updated Client ////////////////////////////////\n");
          javaStreams.writeOutput(`Name: ${name.trim()}  ||  `);
          javaStreams.writeOutput(`Age: ${age.trim()}  ||  `);
          javaStreams.writeOutput(`Email: ${updatedValue.trim()}  ||  `);
          javaStreams.writeOutput(`Income: ${income.trim()}  ||  \n`);
          javaStreams.writeOutput("***************************************************************************\n");
          break;
        case 'income':
          updatedValue = await javaStreams.requestInput("Enter new income:");
          javaStreams.writeOutput(`\nUpdating income from ${income.trim()} to ${updatedValue.trim()}\n`);
          javaStreams.writeOutput("/////////////////////////////// Updated Client ////////////////////////////////\n");
          javaStreams.writeOutput(`Name: ${name.trim()}  ||  `);
          javaStreams.writeOutput(`Age: ${age.trim()}  ||  `);
          javaStreams.writeOutput(`Email: ${email.trim()}  ||  `);
          javaStreams.writeOutput(`Income: ${updatedValue.trim()}  ||  \n`);
          javaStreams.writeOutput("***************************************************************************\n");
          break;
        default:
          javaStreams.writeOutput("\nInvalid field. No updates made.\n");
      }
    }
  }

  /**
   * Simulate the Calculator.java execution
   */
  async runCalculatorSimulation() {
    javaStreams.writeOutput("::::::: Starting Calculator :::::::\n");
    javaStreams.writeOutput(":::::::                     :::::::\n");
    
    const num1 = await javaStreams.requestInput(":: Add the first number:");
    javaStreams.writeOutput(`:: Add the first number: ${num1.trim()}\n`);
    
    const num2 = await javaStreams.requestInput(":: Add the second number:");
    javaStreams.writeOutput(`:: Add the second number: ${num2.trim()}\n`);
    
    const op = await javaStreams.requestInput(":: Select operation (1:Sum, 2:Subtract, 3:Multiply, 4:Divide):");
    javaStreams.writeOutput(`:: Selected operation: ${op.trim()}\n`);
    
    // Simple calculation logic
    try {
      const n1 = parseFloat(num1);
      const n2 = parseFloat(num2);
      let result = 0;
      
      switch(op.trim()) {
        case "1":
          javaStreams.writeOutput("++++++ Let's SUM it: +++++++\n");
          result = n1 + n2;
          break;
        case "2":
          javaStreams.writeOutput("------ Let's SUB it: ------\n");
          result = n1 - n2;
          break;
        case "3":
          javaStreams.writeOutput("***** Let's PROD it: *****\n");
          result = n1 * n2;
          break;
        case "4":
          javaStreams.writeOutput("////// Let's DIV it: //////\n");
          if (n2 === 0) throw new Error("Division by zero");
          result = n1 / n2;
          break;
        default:
          javaStreams.writeOutput("++++++ Default: SUM it: +++++++\n");
          result = n1 + n2;
      }
      
      javaStreams.writeOutput(`Result ->>> ${result}\n`);
    } catch (error) {
      javaStreams.writeError(`Error in calculation: ${error.message}\n`);
    }
  }

  /**
   * Simulate the BreadMaker.java execution
   */
  async runBreadMakerSimulation() {
    javaStreams.writeOutput("***************************\n");
    javaStreams.writeOutput("*\t\t BREAD MAKER \t\t*\n");
    javaStreams.writeOutput("***************************\n");
    
    javaStreams.writeOutput("* Status: ON\n");
    javaStreams.writeOutput("* Start: OFF\n");
    
    const menuOption = await javaStreams.requestInput("Choose an option for Menu (1-3):");
    const menuNum = parseInt(menuOption);
    
    let recipe = "Recipe not found.";
    let time = "0h:0min";
    
    if (menuNum === 1) {
      recipe = "White Bread (Brazilian 'french' bread)";
      time = "1h:10min";
    } else if (menuNum === 2) {
      recipe = "Whole Grain Bread";
      time = "2h:0min";
    } else if (menuNum === 3) {
      recipe = "Cookies";
      time = "0h:10min";
    }
    
    javaStreams.writeOutput(`* Menu: ${menuNum}\n`);
    javaStreams.writeOutput(`* Recipe: ${recipe}\n`);
    javaStreams.writeOutput(`* Clock: ${time}\n`);
    
    const startOption = await javaStreams.requestInput("Start cooking? (y/n):");
    
    if (startOption.trim().toLowerCase() === 'y') {
      javaStreams.writeOutput("Cooking the Recipe. Please wait.\n");
      javaStreams.writeOutput("................................\n");
      javaStreams.writeOutput("BIIIIIP\n");
      javaStreams.writeOutput(`Your Recipe "${recipe}" is ready!\n`);
    } else {
      javaStreams.writeOutput("Cooking cancelled.\n");
    }
  }
}

// Create a singleton instance
const javaVM = new JavaVirtualMachine();

/**
 * Main function to run a Java file
 * @param {string} key The key identifier for the Java file to run
 * @returns {Promise<string>} The output from the Java program execution
 */
async function runJavaFile(key) {
  try {
    return await javaVM.runProgram(key);
  } catch (error) {
    return `Error running Java file: ${error.message}`;
  }
}

export { runJavaFile, javaVM };
