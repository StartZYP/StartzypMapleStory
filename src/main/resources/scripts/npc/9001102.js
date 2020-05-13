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
/**
* @Author : iAkira, Kevintjuh93
**/
var status = 0; 
var selected = 0;

function start() {
	if (cm.getPlayer().getMapId() == 100000000) {
		cm.sendNext("在那里！你看到了吗？你没有？一个不明飞行物刚刚经过。。。在那里！！听着，有人被拖进了不明飞行物。。。啊，是嘎嘎！#r刚被不明飞行物绑架!#k");
	}
}

function action(m,t,s) { 
	if (m > 0) {
		status++; 
		if (cm.getPlayer().getMapId() == 100000000) { // warper completed
			if (status == 1) {
				if (cm.getPlayer().getLevel() >= 12) 
					cm.sendYesNo("我们现在该怎么办？只是谣言，但是。。。我听说如果你被外星人绑架的话会有可怕的事情发生在你身上。。。也许这就是加加现在的处境！求求你，救救嘎嘎！\布加加可能有点不确定和不清楚，但是他有一颗非常好的心。我不能让他出事。正确的！从月球来的爷爷可能知道怎么救他！我要送你去月球，所以请你去见爷爷，去救嘎嘎!!!");
				else 
					cm.sendOk("哦！看来你还没有达到拯救嘎嘎的水平。12级或以上请回来.");
          
			} else if (status == 2)
				cm.sendNext("非常感谢。请救出嘎嘎！月亮爷爷会帮你的.");
			else if (status == 3) {
				cm.warp(922240200, 0); 
				cm.dispose();
			}
		}
	} else if (m < 1) {
		cm.dispose();
	}
}