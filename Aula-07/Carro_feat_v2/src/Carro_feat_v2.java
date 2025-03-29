public class Carro_feat_v2 {
    private boolean status;
    private float fuel;
    private int speed;
    private String brand;
    private String model;

    // Parameter Constructor
    public Carro_feat_v2(boolean status, float fuel, int speed, String brand, String model){
        this.status = status;
        this.fuel = fuel;
        this.speed = speed;
        this.brand = model;
    }

    public String getStatus() {
        String updated_status;
        if (status)
            updated_status = "ON";
        else
            updated_status = "OFF";
        return updated_status;
    }

    public String toString () {

        String result;

        result = "Status: " + getStatus() + "\n" +
                "Fuel: " + fuel + "\n" +
                "Speed: " + speed + "\n" +
                "Brand: " + brand + "\n" +
                "Model: " + model + "\n";
        return result;
    }
}
