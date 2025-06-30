import java.util.Random;
import java.util.Scanner;

public class GuessTheNumber {
    private int actual_tryout = 1;
    private int max_tryout;
    private int actual_nbr_guess;
    private int random_nbr = randomNbrGenerator();

    public int userInput() {
        Scanner input = new Scanner(System.in);
        int user_input = input.nextInt();
        return user_input;
    }

    public int actualNbrGuessGetter() {
        return this.actual_nbr_guess;
    }

    public void actualNbrGuessSetter(int nbr) {
        this.actual_nbr_guess = nbr;
    }

    public int maxTryoutGetter() {
        return this.max_tryout;
    }

    public int actualTryoutGetter() {
        return this.actual_tryout;
    }

    public int actualTryoutIncremet() {
        this.actual_tryout += 1;
        return this.actual_tryout;
    }

    public void gameStart() {
        System.out.println("///// WELCOME TO THE GUESS GAME /////");
        System.out.print("Please, choose a max tryout guess for this session (min:1 max:9) = ");
    }

    public void maxGuessSetter(int max) {
        if (max >= 1 && max <= 9) {
            this.max_tryout = max;
        }
        else {
            System.out.println("Error at max guess");
            System.exit(1);
        }
    }

    public void gameStatusPrinter() {
        System.out.printf("##### GAME STATUS #####\n");
        System.out.printf("Game Max Tryout: %d\n", maxTryoutGetter());
        System.out.printf("Your Actual Try: %d\n", actualTryoutGetter());
    }

    public int randomNbrGenerator() {
        Random rand = new Random();
        return rand.nextInt(100);
    }

    public int askForUserGuess(int actual_tryout, int max_tryout) {
        System.out.print("Now, try a number: ");
        actualNbrGuessSetter(userInput());
        return actualTryoutGetter();
    }

    public boolean guessChecker(int actual_nbr_guess, int random_nbr) {
        if (actual_nbr_guess == random_nbr) {
            System.out.println("YES! This is my number!!! :D");
            return true;
        }
        else if (actual_nbr_guess >= random_nbr) {
            System.out.println();
            System.out.println("It's LOWER! :/");
            System.out.println();
            actualTryoutIncremet();
        }
        else if (actual_nbr_guess <= random_nbr) {
            System.out.println();
            System.out.println("It's HIGHER! O.o");
            System.out.println();
            actualTryoutIncremet();
        }
        if (actualTryoutGetter() == maxTryoutGetter()) {
            System.out.println(">>>>>>>>>> THIS IS YOUR LAST CHANCE!");
        }
        return false;
    }

    public void gameManager() {
        int user_number;
        boolean game_status = false;
        gameStart();
        maxGuessSetter(userInput());
        while ((actualTryoutGetter() <= maxTryoutGetter())) {
            gameStatusPrinter();
            user_number = askForUserGuess(actualTryoutGetter(), maxTryoutGetter());
            game_status = guessChecker(actualNbrGuessGetter(), this.random_nbr);
            if (game_status) {
                System.out.println("You WON!  <3 <3 <3");
                System.exit(0);
            }
        }
        System.out.println("You LOSE the Guess Game! T.T");
        System.out.printf("My number was %d!", this.random_nbr);
    }
}
