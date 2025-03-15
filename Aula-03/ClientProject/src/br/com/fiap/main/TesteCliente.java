package br.com.fiap.main;

import br.com.fiap.modelo.Cliente;

public class TesteCliente {
    public static void main(String[] args) {
        Cliente objCliente = new Cliente(44, "Bira", "rm565463@fiap.com.br", 10);

        // Using methods
        objCliente.displayClientInfo();

        //Modifying attributes
        objCliente.setAge(15);
        objCliente.setEmail("bira@github.com");
        objCliente.setIncome(1.305f);
        objCliente.setName("Aluno");

        objCliente.displayClientInfo();
    }
}
