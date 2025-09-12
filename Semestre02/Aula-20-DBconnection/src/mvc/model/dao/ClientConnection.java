package mvc.model.dao;

import mvc.model.vo.ClientVO;
import mvc.model.vo.Credentials;

import oracle.jdbc.pool.OracleDataSource;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

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

    public List<String> getOracleTableNames() {
        List<String> tables = new ArrayList<>();
        String query = "SELECT table_name FROM user_tables ORDER BY table_name";

        try {
            Statement stmt = this.conn.createStatement();
            ResultSet resultSet = stmt.executeQuery(query);
            while (resultSet.next()) {
                tables.add(resultSet.getString("table_name"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tables;
    }

    private void tableDDLPrinter(String tableName) {
        System.out.println("\n---- " + tableName + " DDL ----\n");

    }

    public Connection getConnection() {
        return this.conn;
    }
}