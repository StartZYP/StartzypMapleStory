package client.command.commands.gm0;

import java.util.ArrayList;
import java.util.List;

import client.MapleBuffStat;
import client.MapleClient;
import client.command.Command;
import tools.MaplePacketCreator;
import tools.Pair;

public class SuperBuffCommand extends Command {

	@Override
	public void execute(MapleClient c, String[] params) {
		List<Pair<MapleBuffStat, Integer>> stats = new ArrayList<Pair<MapleBuffStat, Integer>>();
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.RECOVERY, c.getPlayer().getMaxHp() / 5));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.MAPLE_WARRIOR, 100));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.STANCE, 100));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.SHARP_EYES, 70 << 8 | 300));// 70%几率出现300%暴击
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.INFINITY, 100));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.HOLY_SHIELD, 24 * 60 * 60 * 1000));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.ECHO_OF_HERO, 100));
		stats.add(new Pair<MapleBuffStat, Integer>(MapleBuffStat.MESO_UP_BY_ITEM, 100));
		c.announce(MaplePacketCreator.giveBuff(11111, 20 * 1000, stats));
	}

}
