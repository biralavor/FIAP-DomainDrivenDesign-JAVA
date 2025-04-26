import java.util.Scanner;

public class Menu {
    public void exemploMenu(){
        Scanner input = new Scanner(System.in);
        int user_input = 0;
        do{
            System.out.println("1.Whole Bread");
            System.out.println("2.White Bread");
            System.out.println("3.Australian Bread");
            System.out.println("4.French Bread");
            System.out.println("Escolha uma opcao: ");
            user_input = input.nextInt();
        }while(user_input < 1 || user_input > 4);

        int quant = 0;
        do{
            System.out.println("")
        }
    }
}
