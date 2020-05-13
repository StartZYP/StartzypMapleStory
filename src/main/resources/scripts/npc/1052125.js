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
/*
	NPC Name: 		June
	Map(s): 		Kerning Square : 7th Floor 
	Description: 	Entrance to Spirit of Rock
	Depart_topFloorEnter
	request for a new song (block the portal before the spirit)
	composition fee (block the portal before the spirit)
	Say "NO" to Plagiarism (now we can open the portal)
*/
var status = -1;

function start() {
    cm.sendSimple("等等！由于改建，进入该区域的道路受到限制。我只能允许符合某些条件的人进入这里。#b\n\r\n#L0#帮助#e布莱克#n.#l\r\n#L1#我是购物中心的#rVIP#b!#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
    	if (selection == 0) {
    		if (cm.isQuestStarted(2286) || cm.isQuestStarted(2287) || cm.isQuestStarted(2288)) {
        		var em = cm.getEventManager("RockSpirit");
                        if (!em.startInstance(cm.getPlayer())) {
                            cm.sendOk("额...前面的房间现在看起来有点拥挤。请在这儿等一会儿，好吗？");
                        }
    			cm.dispose();
    			return;
    		} else {
    			cm.sendOk("我没有听到布莱克说你在帮助他。");  
       		}
    	} else {
    		if (cm.isQuestCompleted(2290)) {
                        if(cm.getPlayer().getLevel() > 50) {
                                cm.sendOk("VIP只对#r50级#k以上的玩家开放.");
                        } else {
                                cm.sendOk("VIP地图只有只有完成VIP任务以后才能使用.");
                        }
                } else {
                        cm.sendOk("#rVIP#k?是的，很高兴#rMr. VIP#k,现在这里很安全"); 
                }
    	}
    	cm.dispose();
    }
}