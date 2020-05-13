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
var temp;
var cost;

var status = 0;

function start() {
    cm.sendSimple("你找我有事吗？\r\n\r\n#L0##b魔法种子#k#l\r\n#L1##b为了神木村的行动#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("请慎重考虑。一旦你做出了决定，让我知道.");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("需要我帮助你？？\r\n#L0##b我想买#t4031346#.#k#l");
        } else {
            cm.sendNext("正在开发中.");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4031346##k是一件珍贵的东西，我不能就这样给你。帮我个小忙怎么样？那我就给你。你要买#b#t4031346##k它将花费你#b30000金币#k.你确定要购买吗?",0,0,99);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("我不能卖给你.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30000;
            cm.sendYesNo("你要买#b"+temp+"个#t4031346#吗?#k它将花费#b"+cost+"金币#k.你确定要购买吗?");
        }
    } else if(status == 4) {
        if(cm.getMeso() < cost || !cm.canHold(4031346)) {
            cm.sendOk("请确认是否有足够的金币和道具栏位");
        } else {
            cm.sendOk("感谢你赞助~");
            cm.gainItem(4031346, temp);
            cm.gainMeso(-cost);
        }
        cm.dispose();
    }
}