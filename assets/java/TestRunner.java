// This is a test file to demonstrate loading and execution
// of Java class files in the browser

public class TestRunner {
    public static void main(String[] args) {
        System.out.println("Running Java code in the browser...");
        
        // Print class info
        System.out.println("\nClass loading test successful!");
        System.out.println("Java version: " + System.getProperty("java.version"));
        System.out.println("JVM vendor: WebAssembly JVM");
    }
}
