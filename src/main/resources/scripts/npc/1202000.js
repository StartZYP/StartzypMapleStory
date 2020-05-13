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

var status = -1;

function start() {
	action(1, 0, 0);	
}

function action(mode, type, selection) {  
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("你終于醒了...!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("...你？", 2);
		} else if (status == 2) {
			cm.sendNextPrev("我早就在等你了。你...和黑魔法師戰鬥的英雄蘇醒了...！", 8);
		} else if (status == 3) {
			cm.sendNextPrev("...到底在說什么？你是誰...？", 2);
		} else if (status == 4) {
			cm.sendNextPrev("不...我到底是誰...？什么都想不起來了...呃...！我的頭痛到快裂開了！", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("你還好嗎？", 8);
		} else if (status == 1) {
			cm.sendNextPrev("我...什么都不記得了...這裏是哪裏？還有你是誰？", 2);
		} else if (status == 2) {
			cm.sendNextPrev("請你冷靜。黑魔法師的詛咒刪除了你的記憶...沒有必要擔心什麽都想不起來。所有你想知道的事，我會慢慢的向你說明 。", 8);
		} else if (status == 3) {
			cm.sendNextPrev("你是英雄。數百年前和黑魔法師戰鬥拯救了冒險島。可是在最後一刻被黑魔法師詛咒，長時間封鎖在冰雪裏面。同時也失去了記憶。", 8);
		} else if (status == 4) {
			cm.sendNextPrev("這里是里恩島。黑魔法師將你囚禁在此地。詛咒後氣候混亂，常年覆蓋冰霜和雪。你是在冰之窟的深處被發現的。", 8);
		} else if (status == 5) {
			cm.sendNextPrev("我的名字叫利琳。是里恩族的成員。裏恩族根據古老的預言從很久以前就在等待英雄回來。還有...終于找到你了。現在。就是這裏...", 8);
		} else if (status == 6) {
			cm.sendNextPrev("好像一下說太多了。就算你不能馬上了解也沒關系。你會慢慢知道所有事... #b我們先去村莊吧#k。在抵達村莊之前，如果還有什麽想知道的，我會逐一向你說明。", 8);
		} else if (status == 7) {
			cm.spawnGuide();
			cm.warp(140090100, 0);
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("你还有什么好奇的吗？如果是这样，我会尽量解释得更好 #b#l\r\n#L0#我是谁？#l #l\r\n#L1#我在哪里？#l #l\r\n#L2#你是谁？#l#l\r\n#L3#告诉我该怎么做。#l #l\r\n#L4#告诉我我的物品#l #l\r\n#L5#我如何提高我的技能？#l #l\r\n#L6#我想知道如何装备物品。#l #l\r\n#L7#我如何使用快捷栏？#l #l\r\n#L8#我怎样才能打开易碎的宝箱？#l #l\r\n#L9#我想坐在椅子上，但我忘了怎么坐了。#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("你是几百年前从黑色法师手中拯救枫树世界的英雄之一。因为黑法师的诅咒你失去了记忆。");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("这个岛叫做瑞恩,这就是黑魔法师的诅咒让你沉睡的地方这是一个冰雪覆盖的小岛，大多数居民都是企鹅。");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("我是丽琳，丽安的一个氏族成员，我一直在等待你的归来，就像预言中所说的那样。我暂时当你的向导。");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("我们别再浪费时间了，赶快进城吧。到了那里我会告诉你细节的。");
					cm.dispose();
				} else if(selection == 4) {
					cm.guideHint(14);
					cm.dispose();
				} else if(selection == 5) {
					cm.guideHint(15);
					cm.dispose();
				} else if(selection == 6) {
					cm.guideHint(16);
					cm.dispose();
				} else if(selection == 7) {
					cm.guideHint(17);
					cm.dispose();
				} else if(selection == 8) {
					cm.guideHint(18);
					cm.dispose();
				} else if(selection == 9) {
					cm.guideHint(19);
					cm.dispose();
				}									
		}
	}
}
}