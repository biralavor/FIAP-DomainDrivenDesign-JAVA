package bread_maker;

public class TestBreadMaker {
    public static void main(String[] args){
        BreadMaker bread = new BreadMaker(false, 0, 0, 0);
        bread.idleMode();

        bread.setMenu(bread.getUserInput());
        bread.displayInfoAll();
        System.out.println("Starting recipe now");
        bread.setStartRecipe(true);
    }
}
