package mvc.model.dao;

import mvc.model.vo.Credentials;
import oracle.jdbc.pool.OracleDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ClientConnection {
    private String url = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl";
    private Connection conn;

    public ClientConnection() {
        try {
            OracleDataSource ods = new OracleDataSource();
            ods.setURL(url);
            ods.setUser(Credentials.userName);
            ods.setPassword(Credentials.userPwd);
            conn = ods.getConnection();
        } catch (SQLException error) {
            throw new RuntimeException(error);
        }
        try {
            System.out.println("Connected!");
            System.out.println(conn.getClass());
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
