package lynfanadded;

import java.io.File;
import java.io.IOException;

/**
*@author 刘通
*@version 时间:2019年5月19日上午9:59:10
*说明:
*/
public class 读取地图 {
	public static void main(String[] args) throws IOException {
		//File wzDir = new File("E:\\MapleStory\\MS079\\wz\\Map.wz.bak");
		File wzDir = new File("E:\\MapleStory\\server\\MS079\\wz\\Map.wz");
		File desDir = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹\\Map.wz");
		desDir.mkdir();
		WZReader.WZ2String(wzDir,desDir);
	}
}
