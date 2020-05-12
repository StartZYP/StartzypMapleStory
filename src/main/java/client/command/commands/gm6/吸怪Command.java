package client.command.commands.gm6;

import java.util.Timer;
import java.util.TimerTask;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import server.life.MapleMonster;
import server.maps.MapleMap;
import server.maps.MapleMapObject;

public class 吸怪Command extends Command {

	@Override
	public void execute(MapleClient client, String[] params) {
		MapleCharacter player = client.getPlayer();
		player.setCheating(true);
		for (MapleMapObject mob : player.getMap().getMapObjects()) {
			if (mob.getClass().equals(MapleMonster.class)) {
				MapleMonster monster = (MapleMonster) mob;
				monster.resetMobPosition(player.getPosition());
			}
			player.getMap().setRebornPoint(player.getPosition());
			TimerTask tt = new TimerTask() {
				private MapleMap map = player.getMap();
				private MapleCharacter chr = player;

				@Override
				public void run() {
					if (!map.getPlayers().contains(chr)) {
						map.setRebornPoint(null);
						if (chr != null && chr.isAlive()) {
							player.setCheating(false);
						}
					}
				}
			};
			new Timer().schedule(tt, 1000, 3 * 1000);
		}
	}

	public static void execute(MapleCharacter player) {
		player.setCheating(true);
		for (MapleMapObject mob : player.getMap().getMapObjects()) {
			if (mob.getClass().equals(MapleMonster.class)) {
				MapleMonster monster = (MapleMonster) mob;
				monster.resetMobPosition(player.getPosition());
			}
			player.getMap().setRebornPoint(player.getPosition());
			TimerTask tt = new TimerTask() {
				private MapleMap map = player.getMap();
				private MapleCharacter chr = player;

				@Override
				public void run() {
					if (!map.getPlayers().contains(chr)) {
						map.setRebornPoint(null);
						if (chr != null && chr.isAlive()) {
							player.setCheating(false);
						}
					}
				}
			};
			new Timer().schedule(tt, 1000, 5 * 1000);
		}
		new Timer().schedule(new TimerTask() {
			private MapleMap map = player.getMap();
			private MapleCharacter chr = player;

			@Override
			public void run() {
				if (chr != null && chr.isAlive() && chr.isCheating())
					player.setCheating(false);
				map.setRebornPoint(null);
			}
		}, 2*60*60 * 1000);
	}
}
