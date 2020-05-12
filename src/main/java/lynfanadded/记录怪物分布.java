package lynfanadded;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public class 记录怪物分布 {
	static String lifeEntry = "<imgdir name=\"life\">";
	static HashMap<Integer, String> mapNames;
	static HashMap<Integer, String> mobNames;

	public static void main(String[] args) throws Exception {
		//加更多怪();
		loadNames();
		File mapDir = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹");
		for (File f : mapDir.listFiles()) {
			if (f.isDirectory()) {
				for (File map : f.listFiles()) {
					loadMap(map);
				}
			}
		}

	}

	private static void loadNames() throws IOException {
		mapNames = new HashMap<Integer, String>();
		mobNames = new HashMap<Integer, String>();
		File mapString = new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Map.img.xml");
		File mobString = new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\String.wz\\Mob.img.xml");
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

	private static void 加更多怪() throws Exception {
		int mobArrays[][] = new int[][] { { 100101, 100124, 100133, 130100, 1210102, 210100 },
				{ 1110100, 1120100, 1140100, 1210101, 1130100 },
				{ 2100102, 2110301, 2130100, 2220100, 2230100, 2230102, 2230111 },
				{ 3100101, 3110100, 3110102, 3210200, 3210207, 3230100, 3230101, 3230102, 3230305 },
				{ 4230104, 4230113, 4230116, 4230125, 4230400, 4230503, 4230115 },
				{ 5100000, 5100004, 5110300, 5120003, 5120503, 5130102, 5130103, 5130107, 5250002, 5300100 },
				{ 6130103, 6130100, 6110300, 6130208, 6230100, 6230200, 6230601, 6230602 },
				{ 7130000, 7130003, 7130002, 7130004, 7130101, 7130103, 7130601 },
				{ 7140000, 7160000, 8140002, 8140102, 8140103, 8140101, 8140110, 8140111 },
				{ 8140700, 8140701, 8142000, 8143000, 8150300, 8200002, 8200003 },
				{ 8150101, 8150302, 8190001, 8150301, 8190000, 8150100, 8150200, 8150201, 8200004, 8200005, 8200006 },
				{ 8190003, 8190004, 8190005, 8200007, 8200008 }, { 8200009, 8200010, 8200011, 8200012 } };
		Connection con = DriverManager
				.getConnection("jdbc:mysql://localhost:3306/heavenms?user=root&password=root&characterEncoding=utf8");
		String sql = "select * from lt_mob_in_map where mobid = ? order by count desc";
		PreparedStatement ps;
		ResultSet rs;
		for (int i = 0; i < mobArrays.length; i++) {
			for (int j = 0; j < mobArrays[i].length; j++) {
				ps = con.prepareStatement(sql);
				ps.setInt(1, mobArrays[i][j]);
				rs = ps.executeQuery();
				HashMap<String, String> map = new HashMap<String, String>();
				while (rs.next()) {
					String mapid = rs.getInt("mapid") + "";
					while (mapid.length() != 9)
						mapid = "0" + mapid;
					map.put(mapid, mapid);
//					File f = new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\Map.wz\\Map\\Map"
//							+ mapid.substring(0, 1) + "\\" + mapid + ".img.xml");
//					BufferedReader br = new BufferedReader(new FileReader(f));
//					String s = null;
//					StringBuffer sb = new StringBuffer();
//					int count = 0;
//					boolean inLife = false;
//					while ((s = br.readLine()) != null) {
//						sb.append(s + "\r\n");
//						if (s.contains("<imgdir name=\"life\">"))
//							inLife = true;
//						boolean inMapObj = false;
//						ArrayList<StringBuffer> sbs = new ArrayList<StringBuffer>();
//						while (inLife && (s = br.readLine()) != null) {
//							if (s.contains("<imgdir name=\""))
//								inMapObj = true;
//							if (inMapObj) {
//								StringBuffer s2 = new StringBuffer();
//								s2.append(s + "\r\n");
//								boolean isTar = false, isMob = false;
//								while (inMapObj && (s = br.readLine()) != null) {
//									s2.append(s + "\r\n");
//									if (s.contains("<string name=\"type\" value=\"m\"/>"))
//										isMob = true;
//									else if (s.contains("<string name=\"id\" value=\"")) {
//										int fileId = Integer.parseInt(s.split("\"")[3]);
//										if (fileId == mobArrays[i][j])
//											isTar = true;
//										else
//											isTar = false;
//									} else if (s.contains("</imgdir>")) {
//										if (isTar && isMob) {
//											sbs.add(s2);
//											count++;
//										}
//										sb.append(s2.toString());
//										s2 = new StringBuffer();
//										inMapObj = false;
//									}
//								}
//							} else {
//								if (s.contains("</imgdir>")) {
//									inLife = false;
//									for (int k = count; sbs.size() > 0 && k < 50; k++) {
//										sb.append(sbs.get(k % sbs.size()));
//									}
//									sb.append("\r\n" + s);
//								}
//							}
//						}
//					}
//					br.close();
//					BufferedWriter bw = new BufferedWriter(new FileWriter(f));
//					bw.write(sb.toString());
//					bw.close();
				}
				for (String s : map.keySet())
					System.out.println(s);
				ps.close();
				rs.close();
			}
		}
		System.exit(0);
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
				.getConnection("jdbc:mysql://localhost:3306/heavenms?user=root&password=root&characterEncoding=utf8");
		for (Integer i : mobCount.keySet()) {
			PreparedStatement ps = con.prepareStatement("insert into lt_mob_in_map values(?,?,?,?,?,?)");
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
