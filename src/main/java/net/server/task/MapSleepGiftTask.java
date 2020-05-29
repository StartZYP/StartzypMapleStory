package net.server.task;

import client.MapleCharacter;
import constants.game.ExpTable;
import net.server.Server;
import net.server.channel.Channel;

public class MapSleepGiftTask implements Runnable  {

    @Override
    public void run() {
        for (Channel channel:Server.getInstance().getAllChannels()){
            for (MapleCharacter chr : channel.getPlayerStorage().getAllCharacters()) {
                //System.out.println(chr.getName()+"周期泡点");
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
