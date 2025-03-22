package calc_lession;


public class TestCalculator {
    public static void main(String[] args){
        Calculator calc = new Calculator();
        calc.calcTitle();
        float nbr1 = calc.getNbr("1st");
        float nbr2 = calc.getNbr("2nd");
        float sum_result = calc.sum(nbr1, nbr2);
        calc.showResult(sum_result);
    }
}
