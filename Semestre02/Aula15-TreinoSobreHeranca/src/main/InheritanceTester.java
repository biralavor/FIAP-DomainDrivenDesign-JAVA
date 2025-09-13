package main;

import inheritage.Person;

import javax.swing.JOptionPane;
import java.util.ArrayList;
import java.util.List;

public class InheritanceTester {
    // string
    static String inputMethod(String text) {
        return JOptionPane.showInputDialog(text);
        }

    // int
    static int inputAsInt(String text) {
        return Integer.parseInt(JOptionPane.showInputDialog(text));
    }

    static double inputAsRealNbr(String text) {
        return Double.parseDouble(JOptionPane.showInputDialog(text));
    }

    public static void main(String[] args) {
        List<Person> personsList = new ArrayList<Person>();

        Person personObject = null;

        do {
            personObject = new Person();
            personObject.setName(inputMethod("Nome"));
            personObject.setCpf(inputAsInt("cpf"));
            personsList.add(personObject);

        } while (JOptionPane.showConfirmDialog(null, "add more people?",
                "Peoples Registry", JOptionPane.YES_NO_OPTION,
                JOptionPane.QUESTION_MESSAGE) == 0);

        for (Person newPerson : personsList)
        System.out.println(newPerson.getName() + " -> " + newPerson.getCpf());
        }
};
