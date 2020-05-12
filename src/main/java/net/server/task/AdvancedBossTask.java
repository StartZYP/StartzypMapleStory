package net.server.task;

import java.awt.Point;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ScheduledFuture;

import client.MapleCharacter;
import client.MapleDisease;
import client.MapleJob;
import net.server.Server;
import net.server.channel.Channel;
import net.server.world.World;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.life.MonsterListener;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

public class AdvancedBossTask implements Runnable {
	/**
	 * <9223372036854775807> <蜗牛王血量> < 【虚弱】 【封锁】 【诅咒】 【黑暗】 【诱导】 【贫血】 【颓废】 【处死】 【退散】>
	 */
	public static ScheduledFuture<?> 进阶BOSS线程 = null;
	public static ScheduledFuture<?> 进阶BOSS线程伤害 = null;
	public static ScheduledFuture<?> 全图掉HP = null;
	public static ScheduledFuture<?> 全图掉MP = null;
	public static ScheduledFuture<?> 全图封锁 = null;
	public static int 皮亚奴斯 = 9500173;
	public static int 蝙蝠魔 = 8150000;
	public static int 地图 = 910000020;
	public static int 频道 = 1;
	public static Point 坐标 = new Point(585, -146);
	public static HashMap<MapleCharacter, Long> playerDamage = new HashMap<MapleCharacter, Long>();
	public static ArrayList<MapleMap> spawnedMaps = new ArrayList<MapleMap>();

	@Override
	public void run() {
		开启进阶BOSS线程();
	}

	public static void 开启进阶BOSS线程() {
		for (World world : Server.getInstance().getWorlds()) {
			Server.getInstance().broadcastMessage(world.getId(),
					MaplePacketCreator.serverMessage(频道 + "频道进阶boss开启了,勇士们赶快去自由市场20洞杀敌吧"));
		}
		召唤怪物();
		开启进阶BOSS线程伤害();
		if (进阶BOSS线程 == null) {
			进阶BOSS线程 = TimerManager.getInstance().register(new Runnable() {
				@Override
				public void run() {
					double 随机 = Math.ceil(Math.random() * 100);
					if (随机 < 15) {
						全图掉HP();
						全图掉MP();
					} else if (随机 < 20) {
						全图掉HP();
					} else if (随机 < 25) {
						全图虚弱();
					} else if (随机 < 28) {
						全图封锁();
					} else if (随机 < 45) {
						召唤小弟();
					} else if (随机 < 48) {
						全图黑暗();
					} else if (随机 < 65) {
						减少血量();
					} else if (随机 < 68) {
						减少蓝量();
					} else if (随机 < 85) {
						for (World world : Server.getInstance().getWorlds()) {
							for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
								if (chr == null) {
									continue;
								}
								if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
									chr.startMapEffect("【进阶BOSS】 : 使用出黑暗魔法，3秒后将驱散在场所有人。不要站在地面哟。", 5120027, 3000);
								}
							}
						}
						new Thread() {
							@Override
							public void run() {
								try {
									Thread.sleep(1000 * 3);
									直接驱散();
								} catch (InterruptedException e) {
								}
							}
						}.start();
					} else if (随机 < 95) {
						for (World world : Server.getInstance().getWorlds()) {
							for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
								if (chr == null) {
									continue;
								}
								if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
									chr.startMapEffect("【进阶BOSS】 : 使用出黑暗魔法，3秒后将吞噬在场所有人。不要站在地面哟。", 5120027, 3000);
								}
							}
						}
						new Thread() {
							@Override
							public void run() {
								try {
									Thread.sleep(1000 * 3);
									直接死亡();
								} catch (InterruptedException e) {
								}
							}
						}.start();
					} else if (随机 < 98) {
						全图虚弱();
						全图封锁();
						全图黑暗();
					} else {
						减少血量();
						减少蓝量();
					}
				}
			}, 1000 * 20);
		}
	}

	public static void 关闭进阶BOSS线程() {
		if (进阶BOSS线程 != null) {
			关闭进阶BOSS线程伤害();
			进阶BOSS线程.cancel(false);
			进阶BOSS线程 = null;
		}
	}

	public static void 开启进阶BOSS线程伤害() {
		if (进阶BOSS线程伤害 == null) {
			进阶BOSS线程伤害 = TimerManager.getInstance().register(new Runnable() {
				@Override
				public void run() {
					double 随机 = Math.random() * 3;
					if (随机 < 1) {
						减少血量();
					} else if (随机 < 2) {
						减少蓝量();
					} else {
						减少血量();
						减少蓝量();
					}
				}
			}, 1000 * 4);
		}
	}

	public static void 关闭进阶BOSS线程伤害() {
		if (进阶BOSS线程伤害 != null) {
			进阶BOSS线程伤害.cancel(false);
			进阶BOSS线程伤害 = null;
		}
	}

	public static void 直接驱散() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					double y = chr.getPosition().getY();
					if (y == -386 || y == -146 || y == 94) {
						chr.changeMap(chr.getMap().getReturnMap());
						chr.dropMessage(5, "直接驱散");
					} else {
						chr.dropMessage(5, "躲避了直接驱散");
					}
				}
			}
		}
	}

	public static void 直接死亡() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					double y = chr.getPosition().getY();
					if (y == -386 || y == -146 || y == 94) {
						chr.addHP(-30000);
						chr.dropMessage(5, "直接死亡 HP - 999999999");
					} else {
						chr.dropMessage(5, "躲避了直接死亡");
					}
				}
			}
		}
	}

	public static void 减少血量() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					double y = chr.getPosition().getY();
					if (y == -386 || y == -146 || y == 94) {
						int 血量 = (int) Math.ceil(Math.random() * chr.getMaxHp() / 2);
						chr.addHP(-血量);
						chr.dropMessage(5, "HP - " + 血量);
					} else {
						int 血量 = (int) Math.ceil(Math.random() * chr.getMaxHp() / 2);
						chr.addHP(-血量 / 2);
						chr.dropMessage(5, "HP - " + 血量 / 2);
					}
				}
			}
		}
	}

	public static void 减少蓝量() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					double y = chr.getPosition().getY();
					int 蓝量 = (int) Math.ceil(Math.random() * chr.getMaxMp() / 2);
					if (y == -386 || y == -146 || y == 94) {
						chr.addMP(-蓝量);
						chr.dropMessage(5, "MP - " + 蓝量);
					} else {
						chr.addMP(-蓝量 / 2);
						chr.dropMessage(5, "MP - " + 蓝量 / 2);
					}
				}
			}
		}
	}

	public static void 全图诱导() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					if (chr.getJob() != MapleJob.CLERIC || chr.getJob() != MapleJob.PRIEST
							|| chr.getJob() != MapleJob.BISHOP) {
						MobSkill mobSkill = MobSkillFactory.getMobSkill(128, 1);
						MapleDisease disease = null;
						disease = MapleDisease.getBySkill(128);
						chr.giveDebuff(disease, mobSkill);
						chr.dropMessage(5, "被诱导");
					} else {
						chr.dropMessage(5, "主教职业群，免疫被诱导");
					}
				}
			}
		}
	}

	public static void 全图诅咒() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					MobSkill mobSkill = MobSkillFactory.getMobSkill(124, 1);
					MapleDisease disease = null;
					disease = MapleDisease.getBySkill(124);
					chr.giveDebuff(disease, mobSkill);
					chr.dropMessage(5, "被诅咒");
				}
			}
		}
	}

	public static void 全图虚弱() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					MobSkill mobSkill = MobSkillFactory.getMobSkill(122, 1);
					MapleDisease disease = null;
					disease = MapleDisease.getBySkill(122);
					chr.giveDebuff(disease, mobSkill);
					chr.dropMessage(5, "被虚弱");
				}
			}
		}
	}

	public static void 全图黑暗() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					MobSkill mobSkill = MobSkillFactory.getMobSkill(121, 1);
					MapleDisease disease = null;
					disease = MapleDisease.getBySkill(121);
					chr.giveDebuff(disease, mobSkill);
					chr.dropMessage(5, "被黑暗");
				}
			}
		}
	}

	public static void 全图封锁() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					MobSkill mobSkill = MobSkillFactory.getMobSkill(120, 1);
					MapleDisease disease = null;
					disease = MapleDisease.getBySkill(120);
					chr.giveDebuff(disease, mobSkill);
					chr.dropMessage(5, "被封锁");
				}
			}
		}

	}

	public static void 全图掉HP() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					chr.addHP(-chr.getHp() + 1);
				}
			}
		}
	}

	public static void 全图掉MP() {
		for (World world : Server.getInstance().getWorlds()) {
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				if (chr == null) {
					continue;
				}
				if (chr.getMapId() == 地图 && chr.getClient().getChannel() == 频道) {
					chr.addMP(-chr.getMp() + 1);
				}
			}
		}
	}

	public static void 召唤小弟() {
		for (World world : Server.getInstance().getWorlds()) {
			Channel channel = world.getChannel(频道);
			int ran = (int) (Math.random() * 6 + 1);
			for (int i = 0; i < ran; i++) {
				MapleMap map = channel.getMapFactory().getMap(地图);
				MapleMonster mob = MapleLifeFactory.getMonster(蝙蝠魔);
				mob.setPosition(坐标);
				map.spawnMonster(mob, 6, true);
			}
		}
	}

	public static void 召唤怪物() {
		for (World world : Server.getInstance().getWorlds()) {
			Channel channel = world.getChannel(频道);
			MapleMap map = channel.getMapFactory().getMap(地图);
			for (MapleMonster mobs : map.getAllMonsters()) {
				map.removeMapObject(mobs);
			}
			MapleMonster mob = MapleLifeFactory.getMonster(皮亚奴斯);
			MapleMonsterStats stats = mob.getStats().copy();
			stats.hp = Integer.MAX_VALUE;
			stats.boss = true;
			stats.PDDamage = 3000;
			stats.PADamage = 5000;
			stats.MDDamage = 3000;
			stats.MADamage = 5000;
			stats.level = 220;
			final MapleMonster mob1 = new MapleMonster(皮亚奴斯, stats);
			mob1.setPosition(坐标);
			mob1.addListener(new MonsterListener() {

				@Override
				public void monsterKilled(int aniTime) {
					Pair<MapleCharacter, Long> pair = new Pair<MapleCharacter, Long>(null, 0L);
					for (MapleCharacter chr : playerDamage.keySet()) {
						chr.dropMessage("皮亚奴斯已被击杀");
						if (playerDamage.get(chr) > pair.right)
							pair = new Pair<MapleCharacter, Long>(chr, playerDamage.get(chr));
					}
					for (MapleCharacter chr : playerDamage.keySet()) {
						chr.dropMessage(
								"玩家" + pair.left.getName() + "经过不懈努力,对BOSS造成总计" + pair.right + "伤害,成为榜首,获得大量奖励");
					}
					关闭进阶BOSS线程();
					playerDamage.clear();
					spawnedMaps.remove(mob1.getMap());
				}

				@Override
				public void monsterHealed(int trueHeal) {
				}

				@Override
				public void monsterDamaged(MapleCharacter from, int trueDmg) {
					if (playerDamage.containsKey(from)) {
						long damage = playerDamage.get(from) + trueDmg;
						playerDamage.put(from, damage);
						mob1.heal(trueDmg / 2, 0);
					} else {
						playerDamage.put(from, (long) trueDmg);
						mob1.heal(trueDmg / 2, 0);
					}
				}
			});
			map.spawnMonster(mob1, 6, true);
			spawnedMaps.add(map);
		}
	}
}
