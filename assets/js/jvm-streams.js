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
    this.stdout = "";      // Output buffer
    this.stderr = "";      // Error buffer
    
    // Event listeners
    this.inputListeners = [];    // Listeners for input requests
    this.outputListeners = [];   // Listeners for output events
    this.errorListeners = [];    // Listeners for error events
    
    // Input request state
    this.inputRequested = false;
    this.inputResolver = null;
    this.inputPrompt = "";
    
    // Flags
    this.isInitialized = false;
  }
  
  /**
   * Initialize the stream manager and register event handlers
   * @param {Object} options Configuration options
   */
  initialize(options = {}) {
    if (this.isInitialized) return this;
    
    // Register event handlers if provided
    if (options.onInputRequest && typeof options.onInputRequest === 'function') {
      this.addInputListener(options.onInputRequest);
    }
    
    if (options.onOutput && typeof options.onOutput === 'function') {
      this.addOutputListener(options.onOutput);
    }
    
    if (options.onError && typeof options.onError === 'function') {
      this.addErrorListener(options.onError);
    }
    
    this.isInitialized = true;
    return this;
  }
  
  /**
   * Add a listener for input requests (when Java code needs user input)
   * @param {Function} listener Callback function that handles input requests
   */
  addInputListener(listener) {
    if (typeof listener === 'function') {
      this.inputListeners.push(listener);
    }
    return this;
  }
  
  /**
   * Add a listener for output events (when Java code writes to stdout)
   * @param {Function} listener Callback function that handles output
   */
  addOutputListener(listener) {
    if (typeof listener === 'function') {
      this.outputListeners.push(listener);
    }
    return this;
  }
  
  /**
   * Add a listener for error events (when Java code writes to stderr)
   * @param {Function} listener Callback function that handles errors
   */
  addErrorListener(listener) {
    if (typeof listener === 'function') {
      this.errorListeners.push(listener);
    }
    return this;
  }
  
  /**
   * Write to the standard output stream (simulates System.out.print in Java)
   * @param {string} text Text to write to stdout
   */
  writeOutput(text) {
    this.stdout += text;
    
    // Notify all output listeners
    for (const listener of this.outputListeners) {
      listener(text);
    }
    
    return this;
  }
  
  /**
   * Write to the error output stream (simulates System.err.print in Java)
   * @param {string} text Text to write to stderr
   */
  writeError(text) {
    this.stderr += text;
    
    // Notify all error listeners
    for (const listener of this.errorListeners) {
      listener(text);
    }
    
    return this;
  }
  
  /**
   * Request input from the user (simulates Scanner.nextLine() in Java)
   * @param {string} prompt Prompt to display to the user
   * @returns {Promise<string>} Promise that resolves with user input
   */
  requestInput(prompt = "") {
    this.inputRequested = true;
    this.inputPrompt = prompt;
    
    return new Promise((resolve) => {
      this.inputResolver = resolve;
      
      // Notify all input request listeners
      const promises = this.inputListeners.map(listener => listener(prompt));
      
      // If we have listeners, use their response
      if (promises.length > 0) {
        Promise.all(promises)
          .then(results => {
            // Use the first non-undefined result
            const input = results.find(result => result !== undefined);
            if (input !== undefined) {
              this.inputRequested = false;
              this.inputResolver = null;
              resolve(input);
            }
          });
      } else if (window.requestJavaInput) {
        // Fallback to global requestJavaInput if available
        window.requestJavaInput(prompt)
          .then(input => {
            this.inputRequested = false;
            this.inputResolver = null;
            resolve(input);
          });
      } else {
        // If no input handlers are available, log an error and return a default
        console.error("No input handlers registered and no global requestJavaInput function found");
        this.inputRequested = false;
        this.inputResolver = null;
        resolve("default\n");
      }
    });
  }
  
  /**
   * Provide input to resolve a pending input request
   * @param {string} input Input text from the user
   */
  provideInput(input) {
    if (this.inputRequested && this.inputResolver) {
      const resolver = this.inputResolver;
      this.inputRequested = false;
      this.inputResolver = null;
      resolver(input);
    }
    return this;
  }
  
  /**
   * Get the current contents of the standard output buffer
   * @returns {string} Current stdout content
   */
  getOutput() {
    return this.stdout;
  }
  
  /**
   * Get the current contents of the error output buffer
   * @returns {string} Current stderr content
   */
  getError() {
    return this.stderr;
  }
  
  /**
   * Clear all stream buffers
   */
  clearBuffers() {
    this.stdout = "";
    this.stderr = "";
    return this;
  }
  
  /**
   * Reset the stream manager to its initial state
   */
  reset() {
    this.clearBuffers();
    this.inputRequested = false;
    this.inputResolver = null;
    this.inputPrompt = "";
    return this;
  }
}

// Create a singleton instance
const javaStreams = new JavaStreamManager();

export { javaStreams };
