package client.command.commands.gm0;

import client.MapleClient;
import client.command.Command;

import java.util.Timer;

public class 复活Command extends Command {

	@Override
	public void execute(MapleClient c, String[] params) {
		if (c.getPlayer().canHeal()) {

			if (c.getPlayer().getMeso()>10*c.getPlayer().getLevel()*c.getPlayer().getLevel()) {
				c.getPlayer().gainMeso(-10*c.getPlayer().getLevel()*c.getPlayer().getLevel());//复活消耗金币。
				c.getPlayer().useHeal();

				c.getPlayer().yellowMessage("快速复活消耗"+10*c.getPlayer().getLevel()*c.getPlayer().getLevel()+"金币。");
			} else {
				c.getPlayer().yellowMessage("你的金币不够，无法快速复活");
			}

		} else {
			c.getPlayer().dropMessage("今天复活次数已用完");
		}
	}

}
