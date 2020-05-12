package lynfanadded;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;

public class 汉化3 {
	static String endStr = "</imgdir>";
	static String headStr = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>";
	static String startStr = "<imgdir name=\"";
	static String 分隔符 = "\\";
	static String filename;

	public static void main(String[] args) throws Exception {
		File file083 = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹 (2)\\Quest.wz");
		File file105 = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹 (3)\\Quest.wz");
		//汉化(file083, file105);
		 reName(file083);
	}

	private static void reName(File file) {
		if (file.isFile()) {
			file.renameTo(new File(file.getAbsolutePath().replace(".bak", "")));
		} else {
			for (File f : file.listFiles())
				reName(f);
		}
	}

	/**
	 * !!一定要先格式化
	 */
	@SuppressWarnings("resource")
	private static void 汉化(File tar, File src) throws IOException {
		if (tar.isDirectory()) {
			for (File f : tar.listFiles()) {
				File srcF = new File(src.getAbsolutePath() + "\\" + f.getName());
				if (srcF.exists())
					汉化(f, srcF);
			}
		} else {
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(tar), "UTF-8"));
			String str = null;
			ArrayList<String> tabs083 = new ArrayList<String>();
			while ((str = br.readLine()) != null) {
				if (!str.trim().equals(""))
					tabs083.add(str);
			}
			br = new BufferedReader(new InputStreamReader(new FileInputStream(src), "UTF-8"));
			ArrayList<String> tabs105 = new ArrayList<String>();
			while ((str = br.readLine()) != null) {
				if (!str.trim().equals(""))
					tabs105.add(str);
			}
			String curPath = null;
			HashMap<String, Triple<String, String, String>> map083 = new HashMap<String, Triple<String, String, String>>();
			HashMap<String, Triple<String, String, String>> map105 = new HashMap<String, Triple<String, String, String>>();
			// 存放083原始数据
			filename = tar.getAbsolutePath();
			for (int i = 1; i < tabs083.size(); i++) {
				if (tabs083.get(i).contains(endStr)) {// 退一级目录
					if (curPath.contains(分隔符))
						curPath = curPath.substring(0, curPath.lastIndexOf(分隔符));
				} else if (tabs083.get(i).contains(startStr)) {// 进一级目录
					Triple<String, String, String> t = getTriple(tabs083.get(i));
					if (tabs083.get(i).endsWith("/>")) {
					} else {
						if (curPath == null)
							curPath = t.mid;
						else
							curPath += (分隔符 + t.mid);
					}
				} else {
					Triple<String, String, String> t = getTriple(tabs083.get(i));
					String key = curPath + 分隔符 + t.mid;
					map083.put(key, t);
				}
			}
			curPath = null;
			// 存放105数据
			filename = src.getAbsolutePath();
			for (int i = 1; i < tabs105.size(); i++) {
				if (tabs105.get(i).trim().equals(""))
					continue;
				if (tabs105.get(i).contains(endStr)) {// 退一级目录
					if (curPath != null && curPath.contains(分隔符))
						curPath = curPath.substring(0, curPath.lastIndexOf(分隔符));
				} else if (tabs105.get(i).contains(startStr)) {// 进一级目录
					Triple<String, String, String> t = getTriple(tabs105.get(i));
					if (tabs105.get(i).endsWith("/>")) {
					} else {
						if (curPath == null)
							curPath = t.mid;
						else
							curPath += (分隔符 + t.mid);
					}
				} else {
					Triple<String, String, String> t = getTriple(tabs105.get(i));
					String key = curPath + 分隔符 + t.mid;
					map105.put(key, t);
				}
			}
			// 根据105现有资源替换083数据
			for (String key : map083.keySet()) {
				if (map105.containsKey(key)) {
					map083.get(key).right = map105.get(key).right;
				}
			}
			File tarFile = new File(tar.getAbsolutePath() + ".bak");
			tarFile.createNewFile();
			BufferedWriter bw = new BufferedWriter(new FileWriter(tarFile));
			bw.write(headStr);
			bw.newLine();
			curPath = null;
			// 按顺序写入文件
			for (int i = 1; i < tabs083.size(); i++) {
				if (tabs083.get(i).contains(endStr)) {// 退一级目录
					if (curPath.contains(分隔符))
						curPath = curPath.substring(0, curPath.lastIndexOf(分隔符));
					bw.write(endStr);
				} else if (tabs083.get(i).contains(startStr)) {// 进一级目录
					Triple<String, String, String> t = getTriple(tabs083.get(i));
					if (tabs083.get(i).endsWith("/>")) {
						bw.write(startStr + t.mid + "\"/>");
					} else {
						if (curPath == null)
							curPath = t.mid;
						else
							curPath += (分隔符 + t.mid);
						bw.write(startStr + t.mid + "\">");
					}
				} else {
					Triple<String, String, String> t = getTriple(tabs083.get(i));
					Triple<String, String, String> temp = map083.get(curPath + 分隔符 + t.mid);
					bw.write("<" + temp.left + " name=\"" + temp.mid + "\"");
					if (temp.right != null)
						bw.write(" value=\"" + temp.right);
					bw.write("\"/>");
				}
				bw.newLine();
			}
			bw.close();
			br.close();
		}
	}

	public static Triple<String, String, String> getTriple(String str) {
		Triple<String, String, String> t = new Triple<String, String, String>(null, null, null);
		System.out.println(str);
		System.out.println(filename);
		if (str.contains(endStr) || str.contains("</canvas>")) {
			return t;
		}
		if (str.startsWith("<")) {
			t.left = str.substring(1, str.indexOf(" "));
			if (str.contains("name=\""))
				t.mid = str.substring(str.indexOf("name=\"") + "name=\"".length()).substring(0,
						str.substring(str.indexOf("name=\"") + "name=\"".length()).indexOf("\""));
			if (str.contains("value=\"")) {
				try {
					t.right = str.substring(str.indexOf("value=\"") + "value=\"".length()).substring(0,
							str.substring(str.indexOf("value=\"") + "value=\"".length()).indexOf("\""));
				} catch (Exception e) {
					System.out.println();
				}
			}
		} else {
			try {
				str = str.substring(1);
				t = getTriple(str);
			} catch (Exception e) {
				System.out.println();
			}
		}
		return t;
	}
}
