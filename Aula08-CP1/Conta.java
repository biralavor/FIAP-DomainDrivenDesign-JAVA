package conta;

//Nicholas e Bira
public class Conta {
	private String nome;
	private String nbr_conta;
	private float saldo;
	
	public Conta(String nome, String nbr, float saldo) {
		this.nome = nome;
		this.nbr_conta = nbr;
		this.saldo = saldo;
	}
	
	public String getnome() {
		return this.nome;
	}
	
	public void setnome(String nome) {
		this.nome = nome;
	}
	
	public String getnbr_conta(){
		return this.nbr_conta;
	}
	
	public void setnbr_conta(String nbr_conta) {
		this.nbr_conta = nbr_conta;
	}
	
	public float getsaldo() {
		return this.saldo;
	}
	
	public void setsaldo(float saldo) {
		this.saldo = saldo;
	}
	
	public void depositar(float income) {
		this.saldo += income;
	}
	
	public void sacar(float outcome) {
		if (this.saldo > outcome)
			this.saldo -= outcome;
		else {
			System.out.println("Saldo insuficiente para operação.");
			System.out.println("Seu saldo atual é: " + getsaldo());
		}
	}
	
	public void displayInfo() {
		String displaydata = ":::: Dados da Conta ::::" + "\n" +
					"Cliente: " + getnome()  + "\n" + 
					"Conta: " + getnbr_conta()  + "\n" +
					"Saldo: " + getsaldo() + "\n";
		System.out.println(displaydata);
	}
	
	public void transfer(Conta account_todebit, float value, Conta account_todeposit) {
		account_todebit.sacar(value);
		account_todeposit.depositar(value);
	}
}
