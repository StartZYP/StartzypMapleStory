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
/* Bomack
	NLC Random Eye Color Change.
*/
var status = 0;
var price = 1000000;
var colors = Array();

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("嗨，那里~！我是波马克。如果你有 #b#t5152035##k, 我可以给你合适的化妆品镜片。现在，你想做什么？\r\n#L2#化妆镜: #i5152035##t5152035##l");
        } else if (status == 1) {
            if (selection == 2) {
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace() % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                }
                colors = Array();
                pushIfItemsExists(colors, [current + 100, current + 200, current + 300, current +400, current + 500, current + 600, current + 700]);
                cm.sendYesNo("如果你使用普通优惠券，你将随机获得一副化妆镜片 #b#t5152035##k 你的眼睛真的变了吗？");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152035) == true){
                cm.gainItem(5152035, -1);
                cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                cm.sendOk("享受你的新的和改进的化妆镜片！");
            } else {
                cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。如果没有优惠券，恐怕我不能帮你。。");
            }
        }
    }
}
