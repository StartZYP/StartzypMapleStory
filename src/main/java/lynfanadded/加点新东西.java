package lynfanadded;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class 加点新东西 {
	public static void main(String[] args) throws IOException {
		File f = new File("C:\\Users\\Administrator\\Desktop\\新建文件夹\\发型贴图\\character.wz\\Hair");
		String saveDir = "C:\\Users\\Administrator\\Desktop\\新建文件夹\\发型贴图\\hair\\";
		File[] files = f.listFiles();
		for (File file : files) {
			if (file.exists()) {
				if (file.isDirectory()) {
					File hairBelowBody = new File(file.getAbsolutePath() + "\\default\\hairBelowBody.png");
					File hair = new File(file.getAbsolutePath() + "\\default\\hair.png");
					File hairOverHead = new File(file.getAbsolutePath() + "\\default\\hairOverHead.png");
					File backHair = new File(file.getAbsolutePath() + "\\backDefault\\backHair.png");
					File backHairBelowCap = new File(file.getAbsolutePath() + "\\backDefault\\backHairBelowCap.png");
					File[] childs = file.listFiles();
					for (File c : childs) {
						if (!c.getName().equals("default") && !c.getName().equals("backDefault")) {
							delAllFile(c);
						} else {
							if (hairBelowBody.exists() && hair.exists() && hairOverHead.exists() && backHair.exists()
									&& backHairBelowCap.exists()) {
								FileInputStream fis = new FileInputStream(backHairBelowCap);
								File out = new File(saveDir + "backHairBelowCap.png");
								new File(saveDir + file.getName().replace(".img", "")).mkdir();
								File f2 = new File(
										saveDir + file.getName().replace(".img", "\\") + "backHairBelowCap.png");
								f2.createNewFile();
								FileOutputStream fos = new FileOutputStream(f2);
								byte[] buf = new byte[1024];
								int len = 0;
								while ((len = fis.read(buf)) != -1) {
									fos.write(buf, 0, len);
									fos.flush();
								}
								fis.close();
								fos.close();
								fis = new FileInputStream(hairBelowBody);
								out = new File(saveDir + "hairBelowBody.png");
								f2 = new File(saveDir + file.getName().replace(".img", "\\") + "hairBelowBody.png");
								f2.createNewFile();
								fos = new FileOutputStream(f2);
								buf = new byte[1024];
								len = 0;
								while ((len = fis.read(buf)) != -1) {
									fos.write(buf, 0, len);
									fos.flush();
								}
								fis.close();
								fos.close();
								fis = new FileInputStream(hair);
								out = new File(saveDir + "hair.png");
								f2 = new File(saveDir + file.getName().replace(".img", "\\") + "hair.png");
								f2.createNewFile();
								fos = new FileOutputStream(f2);
								buf = new byte[1024];
								len = 0;
								while ((len = fis.read(buf)) != -1) {
									fos.write(buf, 0, len);
									fos.flush();
								}
								fis.close();
								fos.close();
								fis = new FileInputStream(hairOverHead);
								out = new File(saveDir + "hairOverHead.png");
								f2 = new File(saveDir + file.getName().replace(".img", "\\") + "hairOverHead.png");
								f2.createNewFile();
								fos = new FileOutputStream(f2);
								buf = new byte[1024];
								len = 0;
								while ((len = fis.read(buf)) != -1) {
									fos.write(buf, 0, len);
									fos.flush();
								}
								fis.close();
								fos.close();
								fis = new FileInputStream(backHair);
								out = new File(saveDir + "backHair.png");
								f2 = new File(saveDir + file.getName().replace(".img", "\\") + "backHair.png");
								f2.createNewFile();
								fos = new FileOutputStream(f2);
								buf = new byte[1024];
								len = 0;
								while ((len = fis.read(buf)) != -1) {
									fos.write(buf, 0, len);
									fos.flush();
								}
								fis.close();
								fos.close();
							}
						}
					}

					if (!hairBelowBody.exists() || !hair.exists() || !hairOverHead.exists() || !backHair.exists()
							|| !backHairBelowCap.exists()) {
						String s = file.getName().replace(".img", "");
						s = s.substring(0, s.length() - 1);
						for (int i = 0; i < 8; i++) {
							File fileToDelete = new File(
									file.getParentFile().getAbsolutePath() + "\\" + s + i + ".img");
							if (fileToDelete.exists())
								delAllFile(fileToDelete);
						}
						continue;
					}
				}
			}
		}
	}

	public static void delAllFile(File directory) {
		if (!directory.isDirectory()) {
			directory.delete();
		} else {
			File[] files = directory.listFiles();

			// 空文件夹
			if (files.length == 0) {
				directory.delete();
				return;
			}

			// 删除子文件夹和子文件
			for (File file : files) {
				if (file.isDirectory()) {
					delAllFile(file);
				} else {
					file.delete();
				}
			}

			// 删除文件夹本身
			directory.delete();
		}
	}
}
