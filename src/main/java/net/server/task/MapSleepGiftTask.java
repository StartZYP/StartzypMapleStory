package net.server.task;

import client.MapleCharacter;
import constants.game.ExpTable;
import net.server.Server;
import net.server.world.World;

public class MapSleepGiftTask implements Runnable  {

    @Override
    public void run() {
        for (World world : Server.getInstance().getWorlds()) {
            for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
                if (chr.getMapId()==910000000){
                    chr.getCashShop().gainCash(1,10);
                    int level = chr.getLevel();
                    if (level>=200){
                        return;
                    }else {
                        int expNeededForLevel = ExpTable.getExpNeededForLevel(level);
                        int gainexp = expNeededForLevel / 200;
                        chr.gainExp(gainexp);
                    }
                    chr.message("[系统奖励]你在市场泡点获得了点券（+10）");
                }
            }
        }
    }
}
