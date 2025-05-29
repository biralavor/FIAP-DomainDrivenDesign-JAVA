package contador;

//Nicholas e Bira
public class Contador {
	
	private int numb;
	
	public int getnumb() {
		return numb;
	}
	
	public void setnumb(int numero) {
		this.numb = numero;
	}
	
	public void clearnumb() {
		this.numb = 0;
	}
	
	public void increasenumb() {
		this.numb += 1;
	}
	
	public Contador(int numb){
	}
}
