//此类lynfan add，网友大力提供的反盾挂机代码
package client.command.commands.gm0;

import java.awt.Point;
import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import client.MapleCharacter;
import client.MapleClient;
import client.SkillFactory;
import client.command.Command;
import constants.skills.Aran;
import server.TimerManager;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

public class 抗压Command extends Command {

	@Override
	public void execute(MapleClient client, String[] params) {
		MapleCharacter chr = client.getPlayer();
		if (!chr.isGM()){
			chr.yellowMessage("你不是GM不能用");
			return;
		}
		if (chr.get反盾Timer() == null) {
			chr.set反盾Timer(new Timer());
			chr.yellowMessage("反盾功能已开启");
		} else {
			chr.get反盾Timer().cancel();
			chr.yellowMessage("反盾功能已关闭");
			chr.set反盾Timer(null);
			return;
		}
		Timer timer = chr.get反盾Timer();
		TimerTask tt = new TimerTask() {
			private MapleMap curMap;
			private MapleMonster curMob;
			private Pair<Integer, Integer> range = chr.normalAtk();

			@Override
			public void run() {
				curMap = chr.getMap();
				if (!curMap.getPlayers().contains(chr)) {
					timer.cancel();
					chr.yellowMessage("反盾功能已关闭");
					chr.set反盾Timer(null);
				}
				//if (curMob != null && curMob.isAlive()) {
				//} else {
				List<MapleMonster> mobs = curMap.getAllMonsters();
				Point p = chr.getPosition();
				double distance = Double.MAX_VALUE;
				for (MapleMonster mob : mobs) {
						Point p2 = mob.getPosition();
						double d = getDistance(p, p2);
						if (d < distance) {
							distance = d;
							curMob = mob;
						}
						range = chr.normalAtk();
					
				//}
				
                                    if (curMob != null && curMob.isAlive()) {
					curMap.broadcastMessage(MaplePacketCreator.damageMonster(curMob.getObjectId(),
							Math.max(1, (int) (Math.random() * (range.right - range.left) + range.left
									- curMob.getStats().PDDamage))));
					curMap.damageMonster(chr, curMob, Math.max(1, (int) (Math.random() * (range.right - range.left)
							+ range.left - curMob.getStats().PDDamage)));
                                    }
                                }
			}
		};
		timer.schedule(tt, 0, 250);
	}

	protected double getDistance(Point p, Point p2) {
		// TODO Auto-generated method stub
		return (p.x - p2.x) * (p.x - p2.x) + (p.y - p2.y) * (p.y - p2.y);
	}

}
