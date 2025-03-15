package br.com.fiap.modelo;

public class Cliente {
    /**
     * multiple line comments
     */
    private int  age;
    private String  name;
    private String  email;
    private float   income;

    // Constructor Parameterization
    public Cliente(int age, String name, String email, float income) {
        this.age = age;
        this.name = name;
        this.email = email;
        this.income = income;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setIncome(float income) {
        this.income = income;
    }

    public float getIncome() {
        return income;
    }

    public void displayClientInfo() {
        System.out.println("/////////////////////////////// Client Info ////////////////////////////////");
        System.out.print("Name: " + getName() + "  ||  ");
        System.out.print("Age: " + getAge() + "  ||  ");
        System.out.print("Email: " + getEmail() + "  ||  ");
        System.out.println("Income: " + getIncome() + "  ||  ");
        System.out.println("***************************************************************************");
    }
}
