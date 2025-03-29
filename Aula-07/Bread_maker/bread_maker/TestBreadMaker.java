package bread_maker;

public class TestBreadMaker {
    public static void main(String[] args){
        BreadMaker bread = new BreadMaker(false, 0, 0, 0);
        bread.displayInfo();

        bread.setMenu(3);
        System.out.println("Setting Break Maker to recipe: 3");
        bread.displayInfoAll();
        System.out.println("Starting recipe now");
        bread.setStartRecipe(true);
    }
}
