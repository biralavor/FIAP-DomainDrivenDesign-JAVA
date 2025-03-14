package aula02;

/**
 * multiple line comments
 */

public class Aluno {
	
	// Attributes definitions
	private String	registration;
	private String	name;
	private String	email;
	private int		birthDate;
	private int		cpf;
	private int		courseTime;
	private float	grade;
	
	
	// constructors methods
	
	
	
	// getters & setters methods
	public String getRegistration()	{
		return registration;
	}

	public void setRegistration(String registration) {
		this.registration = registration;
	}
	
	public String getName()	{
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public int getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(int birthDate) {
		this.birthDate = birthDate;
	}
	
	public int getCpf() {
		return cpf;
	}

	public void setCpf(int cpf) {
		this.cpf = cpf;
	}
	
	public int getCourseTime() {
		return courseTime;
	}

	public void setCourseTime(int courseTime) {
		this.courseTime = courseTime;
	}
	
	public float getGrade() {
		return grade;
	}

	public void setGrade(float grade) {
		this.grade = grade;
	}
}
