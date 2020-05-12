package lynfanadded;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class 物品堆叠 {

	static String regex = "(<(.*?)>)";
	static FileReader fr;
	static FileWriter fw;
	static File srcDir;
	static File desDir;

	public static void main(String[] args) {
		srcDir = new File("M:\\Item.wz\\Consume");
		desDir = new File("M:\\Item.wz\\Consume2");
		try {
			load(srcDir);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void load(File file) throws Exception {
		if (file.exists()) {
			if (file.isDirectory()) {
				File des = new File(file.getPath().replace(file.getPath(), 物品堆叠.desDir.getPath()));
				des.mkdir();
				File[] files = file.listFiles();
				for (File file2 : files) {
					load(file2);
				}
			} else {
				File desFile = new File(file.getPath().replace(srcDir.getPath(), 物品堆叠.desDir.getPath()));
				desFile.createNewFile();

				fr = new FileReader(file);
				char[] buf = new char[1024];
				int len = -1;
				String s = "";
				while ((len = fr.read(buf)) != -1) {
					s += new String(buf, 0, len);
				}
				Pattern p = Pattern.compile(regex);
				Matcher m = p.matcher(s);
				ArrayList<String> strs = new ArrayList<String>();
				while (m.find()) {
					strs.add(m.group());
				}
				fw = new FileWriter(desFile);
				boolean inTo = false;
				boolean slotAdded = false;
				for (String string : strs) {
					if (string.contains("<imgdir name=\"info\">")) {
						inTo = true;
					} else if (string.contains("\"slotMax\"")) {
						string = string.substring(0, string.lastIndexOf("=")) + "=\"30000\"/>";
						slotAdded = true;
					} else if (string.contains("</imgdir>")) {
						if (inTo && !slotAdded) {
							string = "<int name=\"slotMax\" value=\"30000\"/>" + string;
						}
						slotAdded = false;
						inTo = false;
					}
					fw.write(string);
				}
				fw.flush();
				fw.close();
				fr.close();
			}
		}
	}
}
