package lynfanadded;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import tools.DatabaseConnection;

public class 抽奖相关 {
	static Connection con;

	public static void main(String[] args) throws SQLException {
		con = DatabaseConnection.getConnection();
		打印卷轴列表();
	}

	private static void 打印卷轴列表() throws SQLException {
		PreparedStatement ps = con.prepareStatement("SELECT * FROM `lt_wz_item_information` WHERE `type` LIKE '%椅子%'");
		ResultSet rs = ps.executeQuery();
		String s = "";
		while (rs.next()) {
			s = s + (rs.getInt("id") + ",");
		}
		System.out.println(s);
	}

}
