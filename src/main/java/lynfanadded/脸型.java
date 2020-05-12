package lynfanadded;

import java.io.File;
import java.util.ArrayList;

public class 脸型 {
	public static void main(String[] args) {
		File faceDir = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹 (2)\\face\\face.wz\\Face\\Face");
		File d2[] = faceDir.listFiles();
		int count1 = 0, count2 = 0;
		ArrayList<Integer> m_face = new ArrayList<Integer>();
		ArrayList<Integer> f_face = new ArrayList<Integer>();
		for (File file : d2) {
			if (file.listFiles()[0].listFiles().length == 0) {

			} else {
				int id = Integer.parseInt(file.getName().replace(".img", ""));
				switch (id / 1000) {
				case 20:
				case 23:
				case 25:
					m_face.add(id);
					break;
				case 21:
				case 24:
				case 26:
				case 27:
				case 28:
					f_face.add(id);
					break;
				}
			}
		}
		String s = "var m_face = Array(";
		for (int i = 0; i < m_face.size(); i++) {
			s += m_face.get(i) + ",";
			if (i % 20 == 19)
				s += "\r\n";
		}
		s += ");\r\nvar f_face = Array(";
		for (int i = 0; i < f_face.size(); i++) {
			s += f_face.get(i) + ",";
			if (i % 20 == 19)
				s += "\r\n";
		}
		s += ");";
		System.out.println(s);
		System.out.println(m_face.size() + "==>" + f_face.size());
	}

	private static void deleteFile(File file) {
		if (file.isFile()) {
			file.delete();
		} else {
			for (File f : file.listFiles()) {
				deleteFile(f);
			}
		}
	}

	private static boolean canUse(File file) {
		if (file.getAbsolutePath().contains("26524")) {
			boolean canUse = true;
			for (File f : file.listFiles()) {
				if (f.length() == 120) {
					canUse = false;
					break;
				}
			}
			return canUse;
		}
		boolean canUse = true;
		for (File f : file.listFiles()) {
			if (f.length() == 120) {
				canUse = false;
				break;
			}
		}
		return canUse;
	}
}
