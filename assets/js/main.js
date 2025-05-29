// Java code snippets
const javaFiles = {
  'cliente': `package br.com.fiap.modelo;

public class Cliente {
    /**
     * multiple line comments
     */
    private int  age;
    private String  name;
    private String  email;
    private float   income;

    // Constructor Parameterization
    public Cliente(int age, String name, String email, float income) {
        this.age = age;
        this.name = name;
        this.email = email;
        this.income = income;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setIncome(float income) {
        this.income = income;
    }

    public float getIncome() {
        return income;
    }

    public void displayClientInfo() {
        System.out.println("/////////////////////////////// Client Info ////////////////////////////////");
        System.out.print("Name: " + getName() + "  ||  ");
        System.out.print("Age: " + getAge() + "  ||  ");
        System.out.print("Email: " + getEmail() + "  ||  ");
        System.out.println("Income: " + getIncome() + "  ||  ");
        System.out.println("***************************************************************************");
    }
}
`,
  'calculator': `package calc_lession;

import java.util.Scanner;

public class Calculator {
    private float nbr1;
    private float nbr2;
    private String operator;

    public void setNbr1(float nbr) {
        this.nbr1 = nbr;
    }

    public void calcTitle() {
        System.out.println("::::::: Starting Calculator :::::::");
        System.out.println(":::::::                     :::::::");
    }
    public float getNbr(String nbr_position) {
        Scanner user_input = new Scanner(System.in);
        System.out.print(":: Add the " + nbr_position + " number: ");
        float num = user_input.nextFloat();
        return num;
    }

    public float sum(float nbr1, float nbr2) {
        System.out.println("++++++ Let's SUM it: +++++++");
        float result = nbr1 + nbr2;
        return result;
    }

    public float sub(float nbr1, float nbr2) {
        System.out.println("------ Let's SUB it: ------");
        float result = nbr1 - nbr2;
        return result;
    }

    public float div(float nbr1, float nbr2) {
        System.out.println("////// Let's DIV it: //////");
        float result = nbr1 / nbr2;
        return result;
    }

    public float multi(float nbr1, float nbr2) {
        System.out.println("***** Let's PROD it: *****");
        float result = nbr1 * nbr2;
        return result;
    }

    public void showResult(float result) {
        System.out.println("Result ->>> " + result);
    }
}
`,
  'breadmaker': `package bread_maker;

import java.util.Scanner;
import java.awt.Toolkit;

public class BreadMaker {
    private boolean status;
    private boolean start;
    private int menu;
    private String bread;
    private int hour;
    private int minutes;
    private Scanner input;
    private int userInput;

    public void title() {
        char design;
        design = '*';
        if (getStart().equals("ON"))
            design = '\\';
        for (int idx = 0; idx < 29; idx++)
            System.out.print(design);
        System.out.println();
        System.out.println("*\t\t BREAD MAKER \t\t*");
        for (int idx = 0; idx < 29; idx++)
            System.out.print(design);
        System.out.println();
    }

    public void setMenu(int recipe) {
        this.menu = recipe;
        switch (recipe) {
            case 1 -> setClock(1, 10);
            case 2 -> setClock(2, 0);
            case 3 -> setClock(0, 10);
            default -> setClock(0, 0);
        }
        setStatus(true);
    }

    public String getMenu() {
        return switch (this.menu) {
            case 1 -> getRecipe(1);
            case 2 -> getRecipe(2);
            case 3 -> getRecipe(3);
            default -> getRecipe(0);
        };
    }

    private String getRecipe(int recipe) {
        return switch (recipe) {
            case 1 -> "White Bread (Brazilian 'french' bread)";
            case 2 -> "Whole Grain Bread";
            case 3 -> "Cookies";
            default -> "Recipe not found.";
        };
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getStatus() {
        String updated_status;
        if (this.status)
            updated_status = "ON";
        else
            updated_status = "OFF";
        return updated_status;
    }

    public void setStartRecipe(boolean start) {
        this.start = start;
        int timeleft = (this.hour * 60) + this.minutes;
        if (start){
            displayInfoAll();
            System.out.print("Cooking the Recipe. Please wait.\n");
            while (timeleft-- > 1)
                System.out.print(".");
            System.out.println("BIIIIIP");
            Toolkit.getDefaultToolkit().beep();
            System.out.println("Your Recipe \"" + getMenu() + "\" is ready!");
        }
    }

    public String getStart() {
        String updated_start;
        if (this.start)
            updated_start = "ON";
        else
            updated_start = "OFF";
        return updated_start;
    }

    public void setClock(int hour, int minutes) {
        this.hour = hour;
        this.minutes = minutes;
    }

    public String getTimeClock() {
        String time;
        time = String.valueOf(this.hour) + "h" +  ":" + String.valueOf(this.minutes) + "min";
        return time;
    }

    public void idleMode() {
        String result;

        title();
        result = "* Status: " + getStatus() + "\n" +
                "* Start: " + getStart() + "\n" +
                "* Menu Options:\n" +
                "--->>>\t1." + getRecipe(1) + "\n" +
                "--->>>\t2." + getRecipe(2) + "\n" +
                "--->>>\t3." + getRecipe(3) + "\n" +
                "* Clock: " + getTimeClock() + "\n";
        System.out.println(result);
        setUserInput();
    }

    public void setUserInput() {
        input = new Scanner(System.in);
        System.out.println("Choose an option for Menu: ");
        int under_validation = input.nextInt();
        if (under_validation > 0 && under_validation < 4)
            this.userInput = under_validation;
    }

    public int getUserInput() {
        return this.userInput;
    }

    public void displayInfoAll() {
        String result;

        title();
        result = "* Status: " + getStatus() + "\n" +
                "* Start: " + getStart() + "\n" +
                "* Menu: " + this.menu + "\n" +
                "* Recipe: " + getMenu() + "\n" +
                "* Clock: " + getTimeClock() + "\n";
        System.out.println(result);
    }

    // Parametrized Constructor
    public BreadMaker(boolean status, int menu, int hour, int minutes) {
        this.status = status;
        this.start = false;
        this.menu = 0;
        this.hour = 0;
        this.minutes = 0;
    }
}
`
};

const menuItems = [
  { key: 'cliente', label: 'Cliente.java' },
  { key: 'calculator', label: 'Calculator.java' },
  { key: 'breadmaker', label: 'BreadMaker.java' }
];
let menuIndex = 0;
let inMenu = true;

function renderPromptMenu() {
  const menu = menuItems.map((item, idx) =>
    `<div class="prompt-item${idx===menuIndex?' active':''}">${idx===menuIndex?'▶ ':'&nbsp;&nbsp;'}${item.label}</div>`
  ).join('');
  document.getElementById('prompt-menu').innerHTML = menu;
  // Only update the prompt-menu, not the whole terminal
}

function showCode(key) {
  inMenu = false;
  document.getElementById('prompt-menu').innerHTML = '';
  document.getElementById('terminal').innerHTML = `<pre style="color:#ff5555;">${javaFiles[key]}</pre>`;
  document.querySelectorAll('.menu button').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById('btn-' + key);
  if (btn) btn.classList.add('active');
}

function showMenu() {
  inMenu = true;
  document.getElementById('terminal').innerHTML = '<span style="color:#888">Use ↑/↓ to select, → to view code, ← to return.</span><div id="prompt-menu" style="margin-top:16px;"></div>';
  renderPromptMenu();
}

// Ensure terminal is focusable and focused
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
    }
  }
});

// Initial render
showMenu();

// Button click support for mobile/touch
menuItems.forEach(item => {
  const btn = document.getElementById('btn-' + item.key);
  if (btn) btn.onclick = () => showCode(item.key);
});
