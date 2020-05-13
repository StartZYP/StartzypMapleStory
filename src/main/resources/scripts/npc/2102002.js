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
var cost = 6000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
    } else {
        if(mode == 1) {
            status++;
        }
        if(mode == 0) {
            cm.sendNext("你一定有点事要处理，对吧?");
            cm.dispose();
            return;
        }
        if(status == 0) {
            cm.sendYesNo("你好，我负责销售去天空之城的船票。从一小时开始，到天空之城的行程每10分钟起飞一次，您需要花费 #b"+cost+" 金币#k. 你确定要购买#b#t4031045##k吗?");
        } else if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else {
                cm.sendOk("你确定你有#b"+cost+" 金币吗#k? 如果是的话，我建议你检查一下你的背包，看看是否满了.");
            }
            cm.dispose();
        }
    }
}
