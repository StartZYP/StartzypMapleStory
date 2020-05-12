package lynfanadded;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

public class 商城物品 {
	static Connection con;
	static PreparedStatement ps;
	static ResultSet rs;
	static HashMap<Integer, String> names;

	public static void main(String[] args) throws SQLException, IOException {
		//加载现金装备();
		con = DriverManager.getConnection("jdbc:mysql://localhost:3306/heavenms", "root", "root");
		writeXml("C:\\Users\\Administrator\\Desktop\\Commodity.img.xml");
		System.exit(0);
		ps = con.prepareStatement("select * from lt_wz_items");
		rs = ps.executeQuery();
		names = new HashMap<Integer, String>();
		while (rs.next()) {
			int id = rs.getInt("itemId");
			String name = rs.getString("itemName");
			names.put(id, name);
		}
		rs.close();
		ps.close();
		File commodity = new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\Etc.wz\\Commodity.img.xml");
		BufferedReader br = new BufferedReader(new FileReader(commodity));
		String s;
		int id = 0;
		int sn = 0, itemId = 0, count = 0, price = 0, period = 0, priority = 0, gender = 0, onsale = 0;
		boolean in = false;
		while ((s = br.readLine()) != null) {
			if (s.contains("<imgdir name=")) {
				in = true;
				try {
					id = Integer.parseInt(s.split("\"")[1]);
				} catch (Exception e) {
					in = false;
				}
			} else {
				if (s.contains("<int name=\"SN\"")) {
					sn = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"ItemId\"")) {
					itemId = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"Count\"")) {
					count = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"Price\"")) {
					price = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"Period\"")) {
					period = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"Priority\"")) {
					priority = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"Gender\"")) {
					gender = Integer.parseInt(s.split("\"")[3]);
				} else if (s.contains("<int name=\"OnSale\"")) {
					onsale = Integer.parseInt(s.split("\"")[3]);
				} else if (in && s.contains("</imgdir>")) {
					in = false;
					String name = names.get(itemId);
					ps = con.prepareStatement("insert into lt_wz_cashshop values(?,?,?,?,?,?,?,?,?,?)");
					ps.setInt(1, id);
					ps.setInt(2, sn);
					ps.setInt(3, itemId);
					ps.setInt(4, count);
					ps.setInt(5, price);
					ps.setInt(6, period);
					ps.setInt(7, priority);
					ps.setInt(8, gender);
					ps.setInt(9, name == null ? 0 : onsale);
					ps.setString(10, name);
					ps.execute();
				}
			}
		}
		ps.close();
		con.close();

	}

	private static void 加载现金装备() throws IOException, SQLException {
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/heavenms", "root", "root");
		PreparedStatement ps = con.prepareStatement("select * from lt_cash_item");
		ResultSet rs = ps.executeQuery();
		int 帽子 = 20000000;
		int 脸 = 20100000;
		int 眼 = 20200000;
		int 长袍 = 20300000;
		int 上衣 = 20400000;
		int 裤子 = 20500000;
		int 鞋子 = 20600000;
		int 手套 = 20700000;
		int 武器 = 20800000;
		int 戒指 = 20900000;
		int 未知 = 21000000;
		int 披风 = 21100000;
		int id = 8947;
		while (rs.next()) {
			int itemId = rs.getInt(1);
			String itemName = rs.getString(2);
			String type = rs.getString(3);
			int sn = 0;
			switch (itemId / 10000) {
			case 100:
				sn = 帽子++;
				break;
			case 101:
			case 194:
				sn = 脸++;
				break;
			case 102:
				sn = 眼++;
				break;
			case 103:
				sn = 眼++;
				break;
			case 104:
				sn = 上衣++;
				break;
			case 105:
				sn = 长袍++;
				break;
			case 106:
				sn = 裤子++;
				break;
			case 107:
				sn = 鞋子++;
				break;
			case 108:
				sn = 手套++;
				break;
			case 109:
				sn = 武器++;
				break;
			case 110:
				sn = 披风++;
				break;
			case 111:
				sn = 戒指++;
				break;
			case 112:
			case 195:
			case 113:
			case 114:
				sn = 未知++;
				break;
			case 130:
			case 131:
			case 132:
			case 133:
			case 137:
			case 138:
			case 140:
			case 141:
			case 142:
			case 143:
			case 144:
			case 145:
			case 146:
			case 147:
			case 148:
			case 149:
			case 170:
				sn = 武器++;
				break;
			case 190:
			case 193:
			case 199:
			case 191:
				sn = 未知++;
				break;
			case 502:
				sn = 武器++;
				break;
			}
			if (sn != 0) {
				ps = con.prepareStatement("insert into lt_wz_cashshop values(?,?,?,1,?,0,0,2,1,?)");
				ps.setInt(1, id++);
				ps.setInt(2, sn);
				ps.setInt(3, itemId);
				ps.setInt(4, (((int) (Math.random() * 30)) * 100 + 1000));
				ps.setString(5, itemName);
				ps.execute();
			}
		}
		ps.close();
		con.close();
		System.exit(0);
	}

	private static void writeXml(String path) throws IOException, SQLException {
		File file = new File(path);
		file.createNewFile();
		BufferedWriter bw = new BufferedWriter(new FileWriter(file));
		bw.write("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>");
		bw.newLine();
		bw.write("<imgdir name=\"Commodity.img\">");
		bw.newLine();
		ps = con.prepareStatement("select * from lt_wz_cashshop");
		ResultSet rs = ps.executeQuery();
		HashMap<Integer, Integer> inserted = new HashMap<Integer, Integer>();
		while (rs.next()) {
			bw.write(" <imgdir name=\"" + rs.getInt("id") + "\">");
			bw.newLine();
			bw.write("<int name=\"SN\" value=\"" + rs.getInt("sn") + "\" />");
			bw.newLine();
			bw.write("<int name=\"ItemId\" value=\"" + rs.getInt("itemid") + "\" />");
			bw.newLine();
			bw.write("<int name=\"Count\" value=\"" + rs.getInt("count") + "\" />");
			bw.newLine();
			bw.write("<int name=\"Price\" value=\"" + rs.getInt("price") + "\" />");
			bw.newLine();
			bw.write("<int name=\"Period\" value=\"" + rs.getInt("period") + "\" />");
			bw.newLine();
			bw.write("<int name=\"Priority\" value=\"" + rs.getInt("priority") + "\" />");
			bw.newLine();
			bw.write("<int name=\"Gender\" value=\"" + rs.getInt("gender") + "\" />");
			bw.newLine();
			// if (!inserted.containsKey(rs.getInt("itemid"))) {
			// inserted.put(rs.getInt("itemid"), rs.getInt("itemid"));
			// bw.write("<int name=\"OnSale\" value=\"" + 1 + "\" />");
			// } else {
			bw.write("<int name=\"OnSale\" value=\"" + rs.getInt("onsale") + "\" />");
			// }
			bw.newLine();
			bw.write("</imgdir>");
			bw.newLine();
		}
		rs.close();
		ps.close();
		con.close();
		bw.write("</imgdir>");
		bw.flush();
		bw.close();
	}

	private static void loadName() throws IOException, SQLException {
		File[] toLoad = new File[] { new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Cash.img.xml"),
				new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Consume.img.xml"),
				new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Eqp.img.xml"),
				new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Etc.img.xml"),
				new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Ins.img.xml"),
				new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Pet.img.xml"), };
		for (File file : toLoad) {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String s;
			while ((s = br.readLine()) != null) {
				String id = null;
				while ((s = br.readLine()) != null) {
					if (s.contains("<imgdir name=\"")) {
						id = s.split("\"")[1];
					} else if (s.contains("<string name=\"name\" value=\"")) {
						String name = s.split("\"")[3];
						ps = con.prepareStatement("insert into lt_wz_items values(?,?)");
						ps.setString(1, id);
						ps.setString(2, name);
						ps.execute();
					}
				}
			}
		}
	}
}
