package bread_maker;

import java.util.Scanner;

import static java.util.EnumSet.range;

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
        if (getStart() == "ON")
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
            case 1 -> setClock(3, 10);
            case 2 -> setClock(4, 0);
            case 3 -> setClock(0, 10);
            default -> setClock(0, 0);
        }
        setStatus(true);
    }

    public String getMenu() {
        return switch (this.menu) {
            case 1 -> "Frances";
            case 2 -> "Integral";
            case 3 -> "Cookies";
            default -> "Tipo de receita não encontrada.";
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
            System.out.print("Cooking the Recipe. Please wait.");
            while (timeleft-- > 1)
                System.out.print(".");
            System.out.println("BIIIIIP");
            System.out.println("* Clock: " + timeleft);
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
        time = String.valueOf(this.hour) + ":" + String.valueOf(this.minutes);
        return time;
    }

    public void idleMode() {
        String result;

        title();
        result = "* Status: " + getStatus() + "\n" +
                "* Start: " + getStart() + "\n" +
                "* Menu: \t1.Frances \t2.Integral \t3.Cookies" + "\n" +
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
