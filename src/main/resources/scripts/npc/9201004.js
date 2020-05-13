/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

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
/* Amos the Wise
	Amoria (680000000)
	Wedding info.
 */

importPackage(Packages.net.server.channel.handlers);

var status;

var rings = [1112806, 1112803, 1112807, 1112809];
var divorceFee = 500000;
var ringObj;

function getWeddingRingItemId(player) {
    for (var i = 0; i < rings.length; i++) {
        if (player.haveItemWithId(rings[i], false)) {
            return rings[i];
        }
    }
    
    return null;
}

function hasEquippedWeddingRing(player) {
    for (var i = 0; i < rings.length; i++) {
        if (player.haveItemEquipped(rings[i])) {
            return true;
        }
    }
    
    return false;
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            var questionStr = ["我该如何与某人交往?", "我要怎么结婚?", "我要怎么离婚?"]
            
            if(!(!cm.getPlayer().isMarried() && getWeddingRingItemId(cm.getPlayer()))) questionStr.push("我想离婚。");
            else questionStr.push("我想摘下我的旧结婚戒指...");
            
            cm.sendSimple("你好，欢迎来到#b婚礼村#k，这是一片美丽的土地，可以在这里找到爱，如果受到足够的启发，甚至可以结婚。你对婚礼村有什么问题吗？? 跟我说吧.#b\r\n\r\n" + generateSelectionMenu(questionStr));
        } else if(status == 1) {
            switch(selection) {
                case 0:
                    cm.sendOk("#b参与过程#k非常简单. 从戒指制造商的要求开始, #p9201000##k, 在#k整个冒险世界找到 #b#t4031367#.\r\n\r\n完成后，你就可以制作订婚戒指了. 亲自向你喜欢的人表白，希望他也有同样的感觉.");
                    cm.dispose();
                    break;
                    
                case 1:
                    cm.sendOk("对于 #b结婚过程#k你必须已经订婚了. 这对相爱的夫妇必须选择一个他们想举行婚礼的地点. 婚礼村提供两个 : #r大教堂#k和 #r小教堂#k.\r\n然后，必须购买一张婚礼门票，可通过现金商店购买, 和婚礼助理一起预定婚礼. 每一位合作伙伴都将收到客人的#r门票#k，并分发给他们的熟人。");
                    cm.dispose();
                    break;
                    
                case 2:
                    cm.sendOk("不幸的是，长久以来的爱情可能会消失.好吧，我希望未来的恩爱夫妻不是这种情况. 但是，如果真是这样的话, 我本人将为离婚做准备, 收取 #r" + divorceFee + "#k 金币.");
                    cm.dispose();
                    break;
                    
                case 3:
                    ringObj = cm.getPlayer().getMarriageRing();
                    if(ringObj == null) {
                        var itemid = getWeddingRingItemId(cm.getPlayer());
                        
                        if(itemid != null) {
                            cm.sendOk("好了，我把你的旧结婚戒指摘了。");
                            cm.gainItem(itemid, -1);
                        } else if(hasEquippedWeddingRing(cm.getPlayer())) {
                            cm.sendOk("如果您要删除旧的结婚戒指，请先取消装备，然后再与我交谈.");
                        } else {
                            cm.sendOk("你没有结婚.");
                        }
                        
                        cm.dispose();
                        return;
                    }
                    
                    cm.sendYesNo("那么，你想和你的伴侣离婚吗？ 当然，这个过程无论如何是#b无法反悔#k的,这应该是最后警告，你的戒指会因此被摧毁. 你真的想 #r离婚#k吗?");
                    break;
            }
        } else if(status == 2) {
            if(cm.getMeso() < divorceFee) {
                cm.sendOk("你没有所需数量的#r离婚费#k.");
                cm.dispose();
                return;
            } else if(ringObj.equipped()) {
                cm.sendOk("离婚前请摘下戒指。");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-divorceFee);
            RingActionHandler.breakMarriageRing(cm.getPlayer(), ringObj.getItemId());
            cm.gainItem(ringObj.getItemId(), -1);
            
            cm.sendOk("你和你的伴侣离婚了.");
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
    }
    return menu;
}