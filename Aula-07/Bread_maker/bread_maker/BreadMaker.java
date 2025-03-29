package bread_maker;

import static java.util.EnumSet.range;

public class BreadMaker {
    private boolean status;
    private boolean start;
    private int menu;
    private String bread;
    private int hour;
    private int minutes;

    public void title() {
        for (int idx = 0; idx < 29; idx++)
            System.out.print("*");
        System.out.println();
        System.out.println("*\t\t BREAD MAKER \t\t*");
        for (int idx = 0; idx < 29; idx++)
            System.out.print("*");
        System.out.println();
    }

    public void setMenu(int recipe) {
        this.menu = recipe;
    }

    public String getMenu() {
        switch (this.menu) {
            case 1:
                setClock(4, 0);
                return "Frances";
            case 2:
                setClock(4, 0);
                return "Integral";
            case 3:
                setClock(0, 15);
                return "Cookies";
            default:
                setClock(0, 0);
                return "Tipo de receita não encontrada.";
        }
    }

    public String getStatus() {
        String updated_status;
        if (this.status)
            updated_status = "ON";
        else
            updated_status = "OFF";
        return updated_status;
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

    public void displayInfo() {
        String result;

        title();
        result = "* Status: " + getStatus() + "\n" +
                "* Start: " + getStart() + "\n" +
                "* Menu: " + this.menu + "\n" +
                "* Clock: " + getTimeClock() + "\n";
        System.out.println(result);
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
