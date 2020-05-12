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
*@author 刘通
*@version 时间:2019年5月19日上午9:59:21
*说明:
*/
public class WZReader {

	private static	BufferedReader br;
	private static String regex = "(<(.*?)>)";
	public static void WZ2String(File wzDir,File desDir) throws IOException {
		if (wzDir.isDirectory()) {
			File[] dirs = wzDir.listFiles();
			for (File file : dirs) {
				File desFile = new File(desDir.getPath()+"\\"+file.getName());
				if (file.isDirectory()) {
					desFile.mkdir();
				}
				WZ2String(file, desFile);
			}
		}else {
		FileReader fr = new FileReader(wzDir);
		char[] buf = new char[1024];
		int num = 0;
		String str = "";
		while((num = fr.read(buf))!=-1) {
			str+=new String(buf,0,num);
		}
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(str);
		ArrayList<String> strs = new ArrayList<String>();
		while(m.find()) {
			strs.add(m.group());
		}
		File out = new File(desDir.getPath());
		out.createNewFile();
		FileWriter fw = new FileWriter(out);
		boolean intoLife = false,isNpc = false;
		int childLevelCount = 0;
		String bufString ="";
		for (int i = 0; i < strs.size(); i++) {
			if (strs.get(i).contains("name=\"life\">")) {
				intoLife = true;
			}
			if(intoLife) {
				if(!strs.get(i).contains("/>")&&!strs.get(i).equals("</imgdir>")) {
					childLevelCount++;
				}
				if (childLevelCount == 2) {
					if (strs.get(i).contains("<string name=\"type\" value=\"n\"/>")) {
						isNpc = true;
						bufString = bufString.substring(0, bufString.lastIndexOf("<"));
					}
					if (!isNpc) {
						bufString+=strs.get(i);
					}
				}
				if(strs.get(i).equals("</imgdir>")) {
					childLevelCount--;
					isNpc = false;
				}
				if(childLevelCount==0) {
					strs.set(i, bufString+bufString+bufString+strs.get(i));
					intoLife = false;
				}
			}
		}
		fr.close();
		File outFile = new File(desDir.getPath());
		outFile.createNewFile();
		FileWriter fwFileWriter = new FileWriter(outFile);
		for (String string : strs) {
			fwFileWriter.write(string);
			fwFileWriter.flush();
		}
		fw.close();}
	}
}
