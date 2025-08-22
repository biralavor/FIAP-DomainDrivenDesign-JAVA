

public class Professor extends Pessoa implements Comunicador {
    public String disciplina;

    public Professor(String nome) {
        super(nome); //ativa constructor
    }


    public void falar() {
        System.out.println("O Prof. " + getNome() + "está na aula de " + disciplina);
    }
}
