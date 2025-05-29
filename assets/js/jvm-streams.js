// assets/js/jvm-streams.js
// Handles Java VM standard input/output interception

/**
 * JavaStreamManager - Manages Java standard input/output streams
 * 
 * This class creates a virtual implementation of Java's standard I/O streams
 * to allow web applications to interact with Java programs that use
 * System.in, System.out, and Scanner for console I/O.
 */
class JavaStreamManager {
  constructor() {
    // Stream buffers
    this.stdout = "";      // Standard output buffer
    this.stderr = "";      // Standard error buffer
    this.stdin = "";       // Standard input buffer
    
    // Event listeners
    this.inputListeners = [];    // Listeners for input requests 
    this.outputListeners = [];   // Listeners for output events
    this.errorListeners = [];    // Listeners for error events
    
    // Input request state
    this.inputRequested = false;
    this.inputResolver = null;
    this.inputPrompt = "";
    
    // Stream state
    this.isInitialized = false;
    this.isClosed = false;
  }

  // Initialize stream manager
  initialize(options = {}) {
    if (this.isInitialized) return this;
    
    // Register handlers
    if (options.onInputRequest) this.addInputListener(options.onInputRequest);
    if (options.onOutput) this.addOutputListener(options.onOutput);
    if (options.onError) this.addErrorListener(options.onError);
    
    this.isInitialized = true;
    return this;
  }

  // Add input request listener
  addInputListener(listener) {
    if (typeof listener === 'function') {
      this.inputListeners.push(listener);
    }
    return this;
  }

  // Add output listener
  addOutputListener(listener) {
    if (typeof listener === 'function') {
      this.outputListeners.push(listener);
    }
    return this;
  }

  // Add error listener
  addErrorListener(listener) {
    if (typeof listener === 'function') {
      this.errorListeners.push(listener);
    }
    return this;
  }

  // Write to stdout
  writeOutput(text) {
    if (this.isClosed) return this;
    
    this.stdout += text;
    // Notify listeners
    this.outputListeners.forEach(listener => listener(text));
    return this;
  }

  // Write to stderr
  writeError(text) {
    if (this.isClosed) return this;
    
    this.stderr += text;
    // Notify listeners
    this.errorListeners.forEach(listener => listener(text));
    return this;
  }

  // Request user input
  async requestInput(prompt = "") {
    if (this.isClosed) throw new Error("Stream is closed");
    
    this.inputRequested = true;
    this.inputPrompt = prompt;
    
    try {
      // Get input from listeners or global handler
      if (this.inputListeners.length > 0) {
        const promises = this.inputListeners.map(listener => listener(prompt));
        const results = await Promise.all(promises);
        const input = results.find(result => result !== undefined);
        
        if (input !== undefined) {
          this.inputRequested = false;
          this.inputResolver = null;
          return input;
        }
      }
      
      // Fallback to global handler
      if (window.requestJavaInput) {
        const input = await window.requestJavaInput(prompt);
        this.inputRequested = false;
        this.inputResolver = null;
        return input;
      }
      
      throw new Error("No input handler available");
    } catch (error) {
      this.inputRequested = false;
      this.inputResolver = null;
      throw error;
    }
  }

  // Provide input directly
  provideInput(input) {
    if (!this.inputRequested || !this.inputResolver) return this;
    
    const resolver = this.inputResolver;
    this.inputRequested = false;
    this.inputResolver = null;
    resolver(input);
    return this;
  }

  // Get stdout contents
  getOutput() {
    return this.stdout;
  }

  // Get stderr contents  
  getError() {
    return this.stderr;
  }

  // Clear all buffers
  clearBuffers() {
    this.stdout = "";
    this.stderr = "";
    this.stdin = "";
    return this;
  }

  // Reset to initial state
  reset() {
    this.clearBuffers();
    this.inputRequested = false;
    this.inputResolver = null;
    this.inputPrompt = "";
    this.isClosed = false;
    return this;
  }

  // Close streams
  close() {
    this.isClosed = true;
    this.inputRequested = false;
    this.inputResolver = null;
    return this;
  }
}

// Create singleton instance
const javaStreams = new JavaStreamManager();

export { javaStreams };
