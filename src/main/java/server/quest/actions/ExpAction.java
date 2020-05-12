/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation version 3 as published by
 the Free Software Foundation. You may not use, modify or distribute
 this program under any other version of the GNU Affero General Public
 License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package server.quest.actions;

import client.MapleCharacter;
import config.YamlConfig;
import provider.MapleData;
import provider.MapleDataTool;
import server.quest.MapleQuest;
import server.quest.MapleQuestActionType;

/**
 *
 * @author Tyler (Twdtwd)
 */
public class ExpAction extends MapleQuestAction {
	int exp;
	
	public ExpAction(MapleQuest quest, MapleData data) {
		super(MapleQuestActionType.EXP, quest);
		processData(data);
	}
	
	
	@Override
	public void processData(MapleData data) {
		exp = MapleDataTool.getInt(data);
	}
	
	@Override
	public void run(MapleCharacter chr, Integer extSelection) {
		runAction(chr, exp);
	}
        
        public static void runAction(MapleCharacter chr, int gain) {
                if (!YamlConfig.config.server.USE_QUEST_RATE) {//lynfan如果ServerConstants里的USE_QUEST_RATE为false，则任务经验和exprate有关。
                        //chr.gainExp(gain * chr.getExpRate(), true, true);//原始经验倍率设置
                        if (chr.getLevel()<= 10){
                        chr.gainExp(gain, true, true);
                        } else {
                        //chr.gainExp(gain * chr.getExpRate()*((chr.getLevel()+10) / 10), true, true);//lynfan修改，根据等级设置任务经验:10级以前1倍，10~19级2倍，20-29级3倍，30-39级4倍等等。
                        chr.gainExp(gain * chr.getExpRate(), true, true);//原始经验倍率设置
                        }
                        
                        } else {
                        if (chr.getLevel()<= 10){
                        chr.gainExp(gain, true, true);  
                        } else {
                        //chr.gainExp(gain * chr.getQuestExpRate()*((chr.getLevel()+10) / 10), true, true);//lynfan修改，根据等级设置任务经验:10级以前1倍，10~19级2倍，20-29级3倍，30-39级4倍等等。
                        chr.gainExp(gain * chr.getQuestExpRate(), true, true);//原始经验倍率设置
                        }
                        //chr.gainExp(gain * chr.getQuestExpRate(), true, true);//原始经验倍率设置
                       
                }
        }
} 
