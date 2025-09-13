package inheritage;

public class Person {
    private String name;
    private int cpf;

    public String hello() {
        return "Hi, my name is " + name;
    };

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCpf() {
        return cpf;
    }

    public void setCpf(int cpf) {
        this.cpf = cpf;
    }
}

