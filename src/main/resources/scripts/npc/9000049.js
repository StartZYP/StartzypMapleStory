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
/* Fairytail Crackers
	Witch Tower Entrance (980040000)
	Used to warp into the Jump Quest. Currently only used for GM events.
	
	First revision by Twdtwd.
 */

var status;
var stage = 1; 
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
			if(cm.getPlayer().isGM()) {
				var event = "已关闭";
				var stage = cm.getClient().getChannelServer().getStoredVar(9000049);
				if(stage == 1) event = "简单";
				if(stage == 2) event = "中等";
				if(stage == 3) event = "困难";
				cm.sendSimple("你好.事件当前: #r" + event + "#k\ 你想做什么？\r\n#b#L0#输入事件#l\r\n#L1#结束活动#l\r\n#L2#让事情变得简单#l\r\n#L3#将事件设为中等#l\r\n#L4#将事件设置为困难#l");
			} else {
				var stage = cm.getClient().getChannelServer().getStoredVar(9000049);
				if(stage == 0) {
					cm.sendOk("看起来功能还没开启。请等待解锁!");
				} else {
					cm.warp(980040000 + stage * 1000, 0);
				}
				cm.dispose();
			}
		} else if(status == 1 && cm.getPlayer().isGM()) {
			if(selection == 0) {
				var stage = cm.getClient().getChannelServer().getStoredVar(9000049);
				if(stage == 0) {
					cm.sendOk("看起来功能还没开启。请等待解锁!");
				} else {
					cm.warp(980040000 + stage * 1000, 0);
				}
				cm.dispose();
				return;
			}
			cm.getClient().getChannelServer().setStoredVar(9000049, selection - 1);
			cm.dispose();
		} else {
			cm.dispose();
		}
    }
}