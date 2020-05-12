/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//lynfan added 自动远程拾取, 网友大力提供代码。
package net.server.task;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author WiseHero
 */
import client.MapleCharacter;
import client.inventory.MaplePet;
import net.server.Server;
import net.server.world.World;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;

public class AutoLootTask implements Runnable {

	@Override
	public void run() {
		for (World w : Server.getInstance().getWorlds()) {// 获取世界
			for (MapleCharacter chr : w.getPlayerStorage().getAllCharacters()) {// 获取玩家
				for (int i = 0; i < 3; i++) {
					MaplePet pet = chr.getPet(i);
					if (pet != null) {
						Map<Integer, Set<Integer>> petExcluded = chr.getExcluded();
						for (Map.Entry<Integer, Set<Integer>> pe : petExcluded.entrySet()) {
							int petIndex = chr.getPetIndex(pe.getKey());
							if (chr.isEquippedItemPouch()) {
								List<MapleMapObject> list = chr.getMap().getMapObjectsInRange(chr.getPosition(),
										Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
								if (chr.getMapId() >= 980000000 && chr.getMapId() <= 980000604) {

								} else {
									for (MapleMapObject item : list) {
										chr.pickupItem(item, petIndex);
									}
								}
							}
						}
					}
				}
			}
		}
	}

}
