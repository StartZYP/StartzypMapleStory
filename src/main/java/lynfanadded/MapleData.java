package lynfanadded;

import java.util.ArrayList;

public class MapleData {
	private String name;
	private String data;
	private ArrayList<MapleData> child;

	public MapleData(ArrayList<String> strs) {
		for (String string : strs) {
			if (!string.contains("/>")) {
				setName(string.substring(string.indexOf("\""), string.lastIndexOf("\"")+1));
			}
		}
	}

	public MapleData() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public ArrayList<MapleData> getChild() {
		return child;
	}

	public void setChild(ArrayList<MapleData> child) {
		this.child = child;
	}
}
