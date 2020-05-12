package lynfanadded;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class 汉化 {
	static String endStr = "</imgdir>";
	static String headStr = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";

	public static void main(String[] args) throws IOException {
		File file083 = new File("C:\\Users\\Administrator\\Desktop\\汉化\\083\\String.wz");
		File file105 = new File("C:\\Users\\Administrator\\Desktop\\汉化\\143\\String.wz");
		for (File f : file083.listFiles()) {
			BufferedReader br = new BufferedReader(new FileReader(f));
			String s, str = "";
			while ((s = br.readLine()) != null) {
				str += s;
			}
			String[] bufs = str.split(">");
			List<Data> datas = new ArrayList<Data>();
			Data parent = null;
			for (String a : bufs) {
				a += ">";
				if (a.contains("name")) {
					if (parent == null) {
						parent = new Data(a);
					} else {
						Data c = new Data(a);
						parent.child.put(c.name, c);
					}
				} else if (a.equals(endStr)) {
					datas.add(parent.copy());
					parent = null;
				}
			}
			System.out.println();
			break;
		}
	}
}

class Data {
	String value;
	String name;
	String dataType;
	Map<String, Data> child;

	public Data(String s) {
		name = s.substring(s.indexOf("name=\"") + "name=\"".length(), s.lastIndexOf("\">"));
		if (s.contains("<imgdir")) {
			dataType = "OBJ";
			child = new HashMap<String, Data>();
		} else {
			dataType = s.split(" ")[0].replace("<", "");
			child = new HashMap<String, Data>();
			value = s.substring(s.indexOf("value=\"") + "value=\"".length(), s.lastIndexOf("\"/>"));
		}
	}

	public Data() {
		child = new HashMap<String, Data>();
	}

	public Data copy() {
		Data d = new Data();
		d.name = name;
		d.dataType = dataType;
		d.value = value;
		for (String s : child.keySet()) {
			d.child.put(s, child.get(s).copy());
		}
		return d;
	}
}
