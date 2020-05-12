package lynfanadded;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class 加载怪物地图名称 {

	static HashMap<Integer, String> mapNames;
	static HashMap<Integer, String> mobNames;
	static String lifeEntry = "<imgdir name=\"life\">";
	// 参考：https://freeman983.iteye.com/blog/1153989
	// 过滤 '
	// ORACLE 注解 -- /**/
	// 关键字过滤 update,delete

	static String reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|"
			+ "(\\b(select|update|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";

	static Pattern sqlPattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);// 表示忽略大小写

	/***************************************************************************
	 * 参数校验
	 * 
	 * @param str ep: "or 1=1"
	 */
	public static boolean isSqlValid(String str) {
		Matcher matcher = sqlPattern.matcher(str);
		if (matcher.find()) {
			System.out.println("参数存在非法字符，请确认：" + matcher.group());// 获取非法字符：or
			return false;
		}
		return true;
	}

	public static void main(String[] args) throws IOException, SQLException {

		loadNames();
		insertNames();
		File mapDir = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\Map.wz\\Map\\Map0");
		for (File f : mapDir.listFiles()) {
			if (f.isDirectory()) {
				for (File map : f.listFiles()) {
					loadMap(map);
				}
			}
		}
		loadItems();
	}

	private static void loadItems() throws IOException, SQLException {
		File[] toLoad = new File[3];
		toLoad[0] = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\String.wz\\Consume.img.xml");
		toLoad[1] = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\String.wz\\Eqp.img.xml");
		toLoad[2] = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\String.wz\\Etc.img.xml");
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/chms", "root", "root");
		PreparedStatement ps = null;
		for (File file : toLoad) {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String s;
			String id = null;
			while ((s = br.readLine()) != null) {
				if (s.contains("<imgdir name=\"")) {
					id = s.split("\"")[1];
				} else if (s.contains("<string name=\"name\" value=\"")) {
					String name = s.split("\"")[3];
					ps = con.prepareStatement("insert into wz_item_id_name values(?,?)");
					ps.setString(1, id);
					ps.setString(2, name);
					ps.execute();
				}
			}
		}
		ps.close();
		con.close();
	}

	private static void insertNames() throws SQLException {
		Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/chms", "root", "root");
		PreparedStatement ps = null;
		for (Integer i : mapNames.keySet()) {
			ps = con.prepareStatement("insert into wz_map_id_name values(?,?)");
			ps.setInt(1, i);
			ps.setString(2, mapNames.get(i));
			ps.execute();
		}
		for (Integer i : mobNames.keySet()) {
			ps = con.prepareStatement("insert into wz_mob_id_name values(?,?)");
			ps.setInt(1, i);
			ps.setString(2, mobNames.get(i));
			ps.execute();
		}
		ps.close();
		con.close();
	}

	private static void loadNames() throws IOException {
		mapNames = new HashMap<Integer, String>();
		mobNames = new HashMap<Integer, String>();
		File mapString = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\String.wz\\Map.img.xml");
		File mobString = new File("J:\\网游单机\\冒险岛\\143\\冒险岛v143(带源码)\\chms-master\\wz\\String.wz\\Mob.img.xml");
		BufferedReader br = new BufferedReader(new FileReader(mapString));
		String str = null;
		String parent = null;
		String street = null, map = null;
		while ((str = br.readLine()) != null) {
			if (str.contains("<imgdir name=\""))
				parent = str.split("\"")[1];
			if (str.contains("<string name=\"streetName\" value=\""))
				street = str.split("\"")[3].replaceAll("&lt;", "<").replaceAll("&gt;", ">");
			;
			if (str.contains("<string name=\"mapName\" value=\""))
				map = str.split("\"")[3].replaceAll("&lt;", "<").replaceAll("&gt;", ">");
			;
			if (str.contains("</imgdir>")) {
				if (street != null && map != null && !mapNames.containsKey(Integer.parseInt(parent))) {
					mapNames.put(Integer.parseInt(parent), street + " &gt; " + map);
					street = null;
					map = null;
				}
			}
		}
		br = new BufferedReader(new FileReader(mobString));
		str = null;
		parent = null;
		String mobName = null;
		while ((str = br.readLine()) != null) {
			if (str.contains("<imgdir name=\""))
				parent = str.split("\"")[1];
			if (str.contains("<string name=\"name\" value=\""))
				mobName = str.split("\"")[3];
			if (str.contains("</imgdir>")) {
				if (mobName != null && !mobNames.containsKey(Integer.parseInt(parent))) {
					mobNames.put(Integer.parseInt(parent), mobName);
					mobName = null;
				}
			}
		}
	}

	private static void loadMap(File map) throws IOException, SQLException {
		BufferedReader br = new BufferedReader(new FileReader(map));
		String str;
		boolean inLife = false;
		int mapId = Integer.parseInt(map.getName().replace(".img.xml", ""));
		ArrayList<Integer> mobs = new ArrayList<Integer>();
		while ((str = br.readLine()) != null) {
			if (str.contains(lifeEntry)) {
				inLife = true;
			}
			if (inLife) {
				boolean isMob = false;
				boolean out1 = false, out2 = false;
				while ((str = br.readLine()) != null) {
					if (str.contains("<imgdir name=\"")) {
						out1 = false;
						out2 = false;
					}
					if (str.contains("<string name=\"type\" value=\"m\""))
						isMob = true;
					if (isMob && str.contains("<string name=\"id\" value=\"")) {
						int mobid = Integer.parseInt(str.split("\"")[3]);
						mobs.add(mobid);
						isMob = false;
					}
					if (str.contains("</imgdir>")) {
						if (out1)
							out2 = true;
						else
							out1 = true;
					}
					if (out1 && out2)
						break;
				}
				inLife = false;
				break;
			}
		}
		if (mobs.isEmpty())
			return;
		HashMap<Integer, Integer> mobCount = new HashMap<Integer, Integer>();
		for (Integer integer : mobs) {
			if (mobCount.containsKey(integer))
				mobCount.put(integer, mobCount.get(integer) + 1);
			else
				mobCount.put(integer, 1);
		}
		Connection con = DriverManager
				.getConnection("jdbc:mysql://localhost:3306/chms?user=root&password=root&characterEncoding=utf8");
		for (Integer i : mobCount.keySet()) {
			PreparedStatement ps = con.prepareStatement("insert into wz_mob_in_map values(?,?,?,?,?,?)");
			ps.setInt(1, i);
			ps.setInt(2, mapId);
			ps.setInt(3, mobCount.get(i));
			ps.setString(4, mobNames.get(i));
			try {
				ps.setString(5, mapNames.get(mapId).split(" &gt; ")[1]);
				ps.setString(6, mapNames.get(mapId).split(" &gt; ")[0]);
			} catch (NullPointerException e) {
				ps.setString(5, mapNames.get(mapId));
				ps.setString(6, "");
			}
			ps.execute();
			ps.close();
		}
		con.close();
	}
}
