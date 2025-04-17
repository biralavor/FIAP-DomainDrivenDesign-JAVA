package calc_lession;

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

