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
/* Spiruna
Orbis : Old Man's House (200050001)

Refining NPC:
 * Dark Crystal - Half Price compared to Vogen, but must complete quest
 */

var status = 0;

function start() {
    if (cm.isQuestCompleted(3034))
        cm.sendYesNo("你对我帮助很大…如果你有任何黑色的水晶矿石，我可以为你精炼，你只需要付#b500000 金币#k。");
    else {
		cm.sendYesNo("你对我帮助很大…如果你有任何黑色的水晶矿石，我可以为你精炼，你只需要付#b500000 金币#k。");
        //cm.sendOk("走开，我正在冥想。");
        //cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 1)
        cm.sendGetNumber("好的，你想制作多少？", 1, 1, 100);
    else if (status == 2) {
        var complete = true;
        var is =selection;
        if (cm.getMeso() < 500000 * is){
            cm.sendOk("你没有那么多钱.");
            cm.dispose();
            return;
        } else if(!cm.canHold(4005004, is)) {
            cm.sendOk("检查一下你的背包!");
            cm.dispose();
            return;
		} else if (!cm.haveItem(4004004, 10 * is)) {
            complete = false;
        }
        if (!complete)
            cm.sendOk("你没有足够的黑暗水晶母矿。");
		
        else {
            cm.gainItem(4004004, -10 * is);
            cm.gainMeso(-500000 * is);
            cm.gainItem(4005004, is);
            cm.sendOk("做好了.");
        }
        cm.dispose();
    }
}