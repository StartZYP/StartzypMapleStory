package lynfanadded;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class 读取wz {
	public static void main(String[] args) throws IOException {
		File file = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹\\100000005.img.xml");
		FileReader fr = new FileReader(file);
		char[] buf = new char[1024];
		int len;
		String str = "";
		String regex = "(<(.*?)>)";
		String endStr = "</imgdir>";
		while ((len = fr.read(buf))!=-1) {
			str+= new String(buf,0,len);
		}
		fr.close();
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(str);
		ArrayList<String> strs = new ArrayList<String>();
		while(m.find()) {
			strs.add(m.group());
		}
		strs.remove(0);
		ArrayList<MapleData> mds = new ArrayList<MapleData>();
		int level = 0;
		for (String string : strs) {
			if (!string.equals(endStr)&&!string.contains("/>")) {
				level++;
				MapleData md = new MapleData();
				md.setName(string.substring(string.indexOf("\""), string.lastIndexOf("\"")+1));
				System.out.println(md.getName()+"===level:"+level);
			}
			if (string.equals(endStr)) {
				System.out.println("level:"+level+"结束");
				level--;
			}
		}
	}
}
