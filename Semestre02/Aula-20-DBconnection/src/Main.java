import mvc.model.dao.ClientConnection;
import mvc.model.vo.ClientVO;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        ClientConnection clientConn = new ClientConnection();
        ClientVO client = new ClientVO("Bira", "Lavor");
    }
}