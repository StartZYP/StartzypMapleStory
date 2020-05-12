package lynfanadded;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class 箱子 {
	public static void main(String[] args) {
		String regex = "(<(.*?)>)";
		String reward = "";
		
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(reward);
		ArrayList<String> strs = new ArrayList<String>();
		while (m.find()) {
			strs.add(m.group());
		}
		boolean flag = false;
		ArrayList<Reward> rewards = new ArrayList<Reward>();
		for (String string : strs) {
			if (!string.contains("/")) {
				flag = true;
				rewards.add(new Reward());
			}
			if (flag) {
				if (string.contains("item")) {
					rewards.get(rewards.size()-1).item = string.substring(string.lastIndexOf("=\"")+2, string.lastIndexOf("\""));
				}else if (string.contains("prob")) {
					rewards.get(rewards.size()-1).prob = string.substring(string.lastIndexOf("=\"")+2, string.lastIndexOf("\""));
					if (rewards.size()<2) {
						rewards.get(rewards.size()-1).chance = Integer.parseInt(rewards.get(rewards.size()-1).prob);
					}else {
						rewards.get(rewards.size()-1).chance = Integer.parseInt(rewards.get(rewards.size()-1).prob)+rewards.get(rewards.size()-2).chance;
					}
				}else if (string.contains("count")) {
					rewards.get(rewards.size()-1).count = string.substring(string.lastIndexOf("=\"")+2, string.lastIndexOf("\""));
				}
			}
			if (string.equals("</imgdir>")) {
				flag = false;
			}
		}
		for (Reward rew : rewards) {
			System.out.println("Array("+rew.item+","+rew.chance+","+rew.count+"),");
			//System.out.println("{"+rew.item+","+rew.chance+","+rew.count+"},");
		}
	}
}
class Reward{
	String item;
	String prob;
	String count;
	int chance;
}
