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
/* Author: Xterminator
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("我懂了。。。你没有我想的那么多朋友。哈哈哈，开玩笑吧！不管怎样，如果你想改变主意，请随时回来，我们谈生意。如果你交了很多朋友，那么你知道。。。呵呵。。。");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("我懂了。。。我觉得你没有我想象的那么多朋友。如果不是的话，你现在就没有24万个中微子？不管怎样，如果你改变主意，回来我们谈生意。当然，也就是说，一旦你得到了一些经济上的救济。。呵呵。。。");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("我希望我能赚得和昨天一样多。。。好吧，你好！你不想扩展你的好友列表吗？你看起来像个有很多朋友的人。。。你觉得呢？有了钱，我可以帮你实现。不过，请记住，它一次只应用于一个字符，因此不会影响您帐户上的任何其他字符。你想扩展你的好友列表吗？");
	} else if (status == 1) {
		cm.sendYesNo("好的,其实没那么贵.#b240,000金币,我会在你的好友名单上再加5个位置#k.不，我不会单独出售.一旦你买了它,它将永远在你的好友名单上.所以,如果你是那些需要更多空间的人之一,那么你也可以这么做.你怎么认为?你会花240,000万金币吗?");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("嘿。。。你确定你有 #b240,000 金币#k? 如果是的话，检查一下你的好友列表是否已经扩展到了最大值。即使你付了钱，你的好友列表中最多的是 #b50#k.");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("好吧！你的好友列表现在将有5个额外的位置。你自己去看看。如果你还需要更多的空间在你的好友名单上，你知道找谁。当然，这不是免费的。。。好吧，好久。。。");
			cm.dispose();
			}
		}
	}
}