package clientecarro;

public class Carro {
    private String marca;
    private String modelo;
    private String cor;
    private int ano;
    private float km;
    private String placa;

    //Parametrizer Constructor
    public Carro(String marca, String modelo, String cor, int ano, float km, String placa) {
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.km = km;
        this.placa = placa;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public float getKm() {
        return km;
    }

    public void setKm(float km) {
        this.km = km;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String toString() {
        return "Marca: " + getMarca() + "\n" +
                "Modelo: " + getModelo() + "\n" +
                "Cor: " + getCor() + "\n" +
                "Ano: " + getAno() + "\n" +
                "Km: " + getKm()  + "\n" +
                "Placa: " + getPlaca() + "\n";
    }
}
