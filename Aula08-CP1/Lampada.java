package lampada;

// Nicholas e Bira
public class Lampada {

	private boolean status;
	private int		power;
	
	public boolean getstatus(){
		return status;		
	}
	
	public void setstatus(boolean status) {
		this.status = status;
	}
	
	public void switchstatus() {
		if(this.status)
			this.status = false;
		else {
			this.status = true;
		}
	}
	
	public int getpower() {
		return this.power;
	}
	
	public int setpower(int power) {
		if (this.power + power < 100)
			this.power += power;
		return this.power;
	}
	
	
	public void dimmerUp() {
		if (power < 100)
			this.power++;
	}
	
	public void dimmerDown() {
		if (power > 0)
			this.power--;
	}
	
	public Lampada() {
	}
}
