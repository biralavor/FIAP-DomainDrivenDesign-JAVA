import java.util.ArrayList;
import java.util.Collections;

public class ArrayListForStrings {
    public static void main(String []args) {
        ArrayList<String> carros = new ArrayList<String>();

        // imprimir a lista. Porém como acabamos de criar o objeto, a lista estará vazia:
        System.out.println(carros);

        // adionar conteúdo na lista
        carros.add("celta");
        carros.add("fusca");
        carros.add("brasilia");
        carros.add("gurgel");
        System.out.println(carros);

        // buscar posição específica, pelo index do array
        System.out.println("Carro posição 1: " + carros.get(1));

        // alterar o valor de uma posição específica
        carros.set(2, "caravan");

        // tentar alterar o valor de uma posição que está fora do range do array
        // carros.set(4, "monza"); // vai gerar um ExceptionError
        System.out.println(carros);

        // obter tamanho da lista
        System.out.println("Tamanho atual da lista: " + carros.size());

        // percorrer a lista usando FOR
        for (int idx = 0; idx < carros.size(); idx++) {
            System.out.printf("# %d -> %s\n", idx + 1, carros.get(idx));
        }

        // percorrer a lista com FOR-EACH, sem ENUMERATE (que gera o index automático. Fizemos aqui o idx na mão)
        int idx = 0;
        for (String carro : carros) {
            System.out.printf("@ %d -> %s\n", idx + 1, carro);
            idx++;
        }

        // obter o index de um elemento, procurando por valor específico
        System.out.println("Indice do elemento = " + carros.indexOf("BMW")); // BWM não existe na lista
        System.out.println("Indice do elemento = " + carros.indexOf("fusca"));

        // o que acontece se houver vários carros do mesmo tipo na lista?
        // o IndexOf só vai conseguir capturar a primeira ocorrência
        carros.add("BMW");
        carros.add("BMW");
        carros.add("Honda-HB20");
        carros.add("BMW");
        System.out.println("Tamanho atual da lista: " + carros.size());
        System.out.println(carros);
        System.out.println("Indice do elemento = " + carros.indexOf("BMW"));

        // verificar se existe elemento específico
        System.out.println("Indice do elemento = " + carros.contains("BMW"));

        // usando ternário para questionar
        // var pergunta ? respostaSeVerdadeiro : respostaSeFalso
        System.out.println("Indice do elemento = " + (carros.contains("BMW") ? "sim" : "não"));

        // ordenar a lista, a partir dos valores
        Collections.sort(carros);
        System.out.println(carros); // observe que a ordenação foi feita a partir da tabela ASCII
    }
}
