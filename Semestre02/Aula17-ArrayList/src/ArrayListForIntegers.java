import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;

public class ArrayListForIntegers {
    public static void main(String []args) {
        ArrayList<Integer> numeros = new ArrayList<Integer>();

        // preencher array
        numeros.add(42);
        numeros.add(77);
        numeros.add(11);
        numeros.add(88);
        numeros.add(13);
        numeros.add(66);
        System.out.println(numeros);

        // iterando a lista com FOR-EACH
        for (Integer nbr : numeros) {
            System.out.println("Numero: " + nbr);
        }

        // adicionando a posição do index
        int idx = 0;
        for (Integer nbr : numeros) {
            System.out.printf("Numero na posição # %d: %d\n", idx, nbr);
            idx++;
        }

        // ordenar a lista, a partir dos valores
        Collections.sort(numeros);
        System.out.println(numeros);
    }
}
