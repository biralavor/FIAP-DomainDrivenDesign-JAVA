package br.com.fiap.main;

import br.com.fiap.modelo.Cliente;

public class TesteCliente {
    public static void main(String[] args) {
        Cliente objCliente1 = new Cliente(44, "Bira", "rm565463@fiap.com.br", 10);
        Cliente objCliente2 = new Cliente(18, "Lucas", "rm1234@fiap.com.br", 12);

        // Using methods
        objCliente1.displayClientInfo();

        //Modifying attributes
        System.out.println("Updating last client");
        objCliente1.setAge(15);
        objCliente1.setEmail("bira@github.com");
        objCliente1.setIncome(1.305f);
        objCliente1.setName("Bira Lavor");

        objCliente1.displayClientInfo();
        System.out.println("Adding new client");
        objCliente2.displayClientInfo();
    }
}
