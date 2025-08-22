

public class Pessoa {
    private String nome;

    public Pessoa(String nome) {

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void andar() {
        System.out.println(this.nome + " está andando.");
    }

}
