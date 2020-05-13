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
 * @Name         Tangyoon
 * @Author       xXOsirisXx (BubblesDev)
 */

var status;

function start() {
	status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
	if (mode == -1 || !cm.isQuestStarted(2180)){
		cm.dispose();
		return;
	}
	else{
		if (mode == 1) status++;
		else status --;

		if (status == 0){
			cm.sendNext("好吧，我现在送你去我奶牛的马厩。小心那些喝光所有牛奶的小牛。你不想浪费你的努力。");
		}
		else if (status == 1){
			cm.sendNextPrev("一眼就能看出牛犊之间的差别是不容易的。这些小牛可能只有一两个月大，但它们已经长到了它们母亲的大小。他们甚至长得很像…甚至有时我也会感到困惑！祝你好运！");
		}
		else if (status == 2){
			if (cm.canHold(4031847)){
				cm.gainItem(4031847, 1);
				cm.warp(912000100, 0);
			}
			else{
				cm.sendOk("我不能把空瓶子给你，因为你的背包已经满了。请在你的其他栏留出一些空间。");
			}
			cm.dispose();
		}
	}
}