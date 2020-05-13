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
//@Author Moogra, Ronan
//Fixed grammar, javascript syntax

importPackage(Packages.client);

var status = 0;
var price = 100000;

function isTransformed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210003;
}

function start() {
    if(!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))) {
        cm.sendOk("#r够了，人类！任何人不许越过此处!#k");
        cm.dispose();
        return;
    }
    
    cm.sendSimple("欢迎来到生命之洞入口！你想进去和黑暗龙王战斗吗？如果你想和他战斗，你需要#b#v2000005#吗？#k如果你被击中，你可以恢复一些生命#rHorntail#k.\r\n#L1#我想用#b100，000#k金币购买10个#l\r\n\#L2#不，谢谢，现在让我进去！#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (selection == 1) {
        if(cm.getMeso() >= price) {
            if(!cm.canHold(2000005)) {
                cm.sendOk("对不起，你的背包中没有进入所需要的物品!");
            } else {
                cm.gainMeso(-price);
                cm.gainItem(2000005, 10);
                cm.sendOk("谢谢购买，记得使用!");
            }
        } else {
            cm.sendOk("对不起，你没有足够的金币");
        }
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99)
            cm.warp(240050000, 0);
        else
            cm.sendOk("很抱歉。你需要至少100级或以上才能进入。");
        cm.dispose();
    }
}