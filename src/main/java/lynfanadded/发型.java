package lynfanadded;

import java.io.File;
import java.util.ArrayList;

public class 发型 {
	public static void main(String[] args) {
		File hairDir = new File("E:\\MXD\\server\\HeavenMS-master-v398\\wz\\Character.wz\\Hair");
		File[] hairs = hairDir.listFiles();
		ArrayList<Integer> m_hair = new ArrayList<Integer>();
		ArrayList<Integer> f_hair = new ArrayList<Integer>();
		for (int i = 0; i < hairs.length;) {
			boolean right = false;
			int j = 0, k = getNum(hairs[i]);
			for (; j < 8;) {
				if (k / 10 != getNum(hairs[i + j]) / 10) {
					right = false;
					break;
				} else {
					j++;
				}
				right = true;
			}
			if (right) {
				switch (getNum(hairs[i]) / 1000) {
				case 30:
				case 33:
				case 35:
				case 36:
				case 39:
				case 40:
				case 43:
				case 45:
				case 46:
					m_hair.add(getNum(hairs[i]));
					break;
				case 31:
				case 32:
				case 34:
				case 37:
				case 38:
				case 41:
				case 42:
				case 44:
				case 47:
				case 48:
					f_hair.add(getNum(hairs[i]));
					break;
				}
			}
			i += j;
		}
		String s = "var mhair_r = Array(";
		for (int i = 0; i < m_hair.size(); i++) {
			s += m_hair.get(i) + ",";
			if (i % 20 == 19)
				s += "\r\n";
		}
		s += ");\r\nvar fhair_r = Array(";
		for (int i = 0; i < f_hair.size(); i++) {
			s += f_hair.get(i) + ",";
			if (i % 20 == 19)
				s += "\r\n";
		}
		s += ");";
		System.out.println(s);
	}

	private static int getNum(File file) {
		return Integer.parseInt(file.getName().replace(".img.xml", ""));
	}
}
