package mvc.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

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

    public boolean insertIntoTable(ClientVO newClient, String tableName) {
        String query = "INSERT INTO" + tableName + "VALUES (?, ?, ?)";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, newClient.getId());
            ps.setString(2, newClient.getFirstName());
            ps.setString(3, newClient.getLastName());
            ps.execute();
        } catch (Exception e) {
            if (conn == null)
                System.out.println("Error. Connection is Null.");
            else
                System.out.println("Error in PreparedStatement.");
            e.fillInStackTrace();
            return false;
        } finally {
            System.out.println("Closing connection...");
            try {
                assert conn != null;
                conn.close();
            } catch (SQLException e) {
                System.out.println("Error while closing connection");
                e.fillInStackTrace();
            }
        }
        return true;
    }

    public boolean deleteIntoTable(int idx, String tableName, String column) {
        String query = "DELETE FROM " + tableName + "WHERE " + column + " = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setInt(1, idx);
            ps.execute();
        } catch (SQLException e) {
            if (conn == null)
                System.out.println("Error. Connection is Null.");
            System.out.println("Error while deleting " + column + " at " + tableName + " table.");
            e.fillInStackTrace();
            return false;
        } finally {
            System.out.println("Closing connection");
            try {
                assert conn != null;
                conn.close();
            } catch (Exception e) {
                e.fillInStackTrace();
            }
        }
        return true;
    }

    public boolean updateIntoTable(int idx, String tableName, String column, String newString ) {
        String query = "";
        return true;
    }

    public List<ClientVO> readFromTable (String tableName) {
        List<ClientVO> clientList = new ArrayList<ClientVO>();
        String query = "SELECT * FROM " + tableName;
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                int id = rs.getInt(1);
                String firstName = rs.getString(2);
                String lastName = rs.getString(3);
                clientList.add(new ClientVO(id, firstName, lastName));
            }
        } catch (SQLException e) {
            System.out.println("Error. Read from table error.");
            e.fillInStackTrace();
        }

        return clientList;
    }

    public Connection getConnection() {
        return this.conn;
    }
}