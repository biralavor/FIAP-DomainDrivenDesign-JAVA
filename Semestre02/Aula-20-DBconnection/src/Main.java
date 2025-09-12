import mvc.model.dao.ClientConnection;
import mvc.model.vo.ClientVO;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        ClientConnection clientConn = new ClientConnection();
        ClientVO client = new ClientVO("Bira", "Lavor");

        List<String> tableNames = clientConn.getOracleTableNames();

        if (tableNames.isEmpty()) {
            System.out.println("No tables were found.");
        } else {
            System.out.println("Found " + tableNames.size() + "tables");
            for (String actualTableName : tableNames) {
                System.out.println("- " + actualTableName);
            }
        }
    }
}