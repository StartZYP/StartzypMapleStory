package lynfanadded;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author 刘通
 * @version 时间:2019年5月19日上午9:59:21 说明:
 */
public class WZReader2 {

	private static BufferedReader br;
	private static String regex = "(<(.*?)>)";

	public static void WZ2String(File wzDir, File desDir) throws IOException {
		if (wzDir.isDirectory()) {
			File[] dirs = wzDir.listFiles();
			for (File file : dirs) {
				File desFile = new File(desDir.getPath() + "\\" + file.getName());
				if (file.isDirectory()) {
					desFile.mkdir();
				}
				WZ2String(file, desFile);
			}
		} else {
			FileReader fr = new FileReader(wzDir);
			char[] buf = new char[1024];
			int num = 0;
			String str = "";
			while ((num = fr.read(buf)) != -1) {
				str += new String(buf, 0, num);
			}
			fr.close();
			Pattern p = Pattern.compile(regex);
			Matcher m = p.matcher(str);
			ArrayList<String> strs = new ArrayList<String>();
			while (m.find()) {
				strs.add(m.group());
			}
			boolean intoLife = false;
			int childLevelCount = 0;
			ArrayList<MapLife> lives = new ArrayList<MapLife>();
			for (int i = 0; i < strs.size(); i++) {
				if (strs.get(i).contains("name=\"life\">")) {
					intoLife = true;
				}
				if (intoLife) {
					if (!strs.get(i).contains("/>") && !strs.get(i).equals("</imgdir>")) {
						childLevelCount++;
						lives.add(new MapLife());
						lives.get(lives.size() - 1).fileName = wzDir.getName();
					}
					if (childLevelCount == 2) {
						if (strs.get(i).contains("name=\"type\"")) {
							lives.get(lives.size() - 1).type = strs.get(i).substring(strs.get(i).lastIndexOf("=\"") + 2,
									strs.get(i).lastIndexOf("\""));
						} else if (strs.get(i).contains("name=\"id\"")) {
							lives.get(lives.size() - 1).id = strs.get(i).substring(strs.get(i).lastIndexOf("=\"") + 2,
									strs.get(i).lastIndexOf("\""));
						} else if (strs.get(i).contains("name=\"x\"")) {
							lives.get(lives.size() - 1).x = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"y\"")) {
							lives.get(lives.size() - 1).y = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"mobTime\"")) {
							lives.get(lives.size() - 1).mobTime = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"f\"")) {
							lives.get(lives.size() - 1).f = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"hide\"")) {
							lives.get(lives.size() - 1).hide = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"fh\"")) {
							lives.get(lives.size() - 1).fh = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"cy\"")) {
							lives.get(lives.size() - 1).cy = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"rx0\"")) {
							lives.get(lives.size() - 1).rx0 = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"rx1\"")) {
							lives.get(lives.size() - 1).rx1 = Integer.parseInt(strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\"")));
						} else if (strs.get(i).contains("name=\"limitedname\"")) {
							lives.get(lives.size() - 1).limitedname = strs.get(i)
									.substring(strs.get(i).lastIndexOf("=\"") + 2, strs.get(i).lastIndexOf("\""));
						}
					}
					if (strs.get(i).equals("</imgdir>")) {
						childLevelCount--;
					}
					if (childLevelCount == 0) {
						intoLife = false;
					}
				}
			}
		}
	}

}

class MapLife {
	String fileName;
	String type;
	String id;
	String limitedname;
	int x, y, mobTime, f, fh, cy, rx0, rx1, hide = -10;

	public void show(int index) {
		System.out.println("<imgdir name=\"" + index + "\">");
		System.out.println("<string name=\"type\" value=\"" + type + "\"/>");
		System.out.println("<string name=\"id\" value=\"" + id + "\"/>");
		System.out.println("<int name=\"x\" value=\"" + x + "\"/>");
		System.out.println("<int name=\"y\" value=\"" + y + "\"/>");
		System.out.println("<int name=\"mobTime\" value=\"" + mobTime + "\"/>");
		System.out.println("<int name=\"f\" value=\"" + f + "\"/>");
		if (hide!=-10) {
			System.out.println("<int name=\"hide\" value=\"" + hide + "\"/>");
		}
		System.out.println("<int name=\"fh\" value=\"" + fh + "\"/>");
		System.out.println("<int name=\"cy\" value=\"" + cy + "\"/>");
		System.out.println("<int name=\"rx0\" value=\"" + rx0 + "\"/>");
		System.out.println("<int name=\"rx1\" value=\"" + rx1 + "\"/>");
		if (limitedname != null) {
			System.out.println("<string name=\"limitedname\" value=\"" + limitedname + "\"/>");
		}
		System.out.println("</imgdir>");
	}

	public static String getString(ArrayList<MapLife> lives, int times) {
		String string = "";
		int index = 0;
		for (int i = 0; i < times; i++) {
			for (int j = 0; j < lives.size(); j++) {
				if (lives.get(j).type == null) {
					string = lives.get(j).fileName;
					continue;
				}
				if (i == 0) {
					string += "<imgdir name=\"" + index++ + "\">";
					string += "<string name=\"type\" value=\"" + lives.get(j).type + "\"/>";
					string += "<string name=\"id\" value=\"" + lives.get(j).id + "\"/>";
					string += "<int name=\"x\" value=\"" + lives.get(j).x + "\"/>";
					string += "<int name=\"y\" value=\"" + lives.get(j).y + "\"/>";
					string += "<int name=\"mobTime\" value=\"" + lives.get(j).mobTime + "\"/>";
					string += "<int name=\"f\" value=\"" + lives.get(j).f + "\"/>";
					if (lives.get(j).hide!=-10) {
						string += "<int name=\"hide\" value=\"" + lives.get(j).hide + "\"/>";
					}
					string += "<int name=\"fh\" value=\"" + lives.get(j).fh + "\"/>";
					string += "<int name=\"cy\" value=\"" + lives.get(j).cy + "\"/>";
					string += "<int name=\"rx0\" value=\"" + lives.get(j).rx0 + "\"/>";
					string += "<int name=\"rx1\" value=\"" + lives.get(j).rx1 + "\"/>";
					if (lives.get(j).limitedname != null) {
						string += "<string name=\"limitedname\" value=\"" + lives.get(j).limitedname + "\"/>";
					}
					string += "</imgdir>";
				}else {
					if (lives.get(j).type.equals("m")) {
						string += "<imgdir name=\"" + index++ + "\">";
						string += "<string name=\"type\" value=\"" + lives.get(j).type + "\"/>";
						string += "<string name=\"id\" value=\"" + lives.get(j).id + "\"/>";
						string += "<int name=\"x\" value=\"" + lives.get(j).x + "\"/>";
						string += "<int name=\"y\" value=\"" + lives.get(j).y + "\"/>";
						string += "<int name=\"mobTime\" value=\"" + lives.get(j).mobTime + "\"/>";
						string += "<int name=\"f\" value=\"" + lives.get(j).f + "\"/>";
						if (lives.get(j).hide!=-10) {
							string += "<int name=\"hide\" value=\"" + lives.get(j).hide + "\"/>";
						}
						string += "<int name=\"fh\" value=\"" + lives.get(j).fh + "\"/>";
						string += "<int name=\"cy\" value=\"" + lives.get(j).cy + "\"/>";
						string += "<int name=\"rx0\" value=\"" + lives.get(j).rx0 + "\"/>";
						string += "<int name=\"rx1\" value=\"" + lives.get(j).rx1 + "\"/>";
						if (lives.get(j).limitedname != null) {
							string += "<string name=\"limitedname\" value=\"" + lives.get(j).limitedname + "\"/>";
						}
						string += "</imgdir>";
					}
				}
			}
		}
		return string;
	}
}