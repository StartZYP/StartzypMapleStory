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

/* Claudia
	Amoria Quest Hair Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/

var status = 0;
var mhair_q = Array(30270, 30240, 30020, 30000, 30132, 30192, 30032, 30112, 30162);
var fhair_q = Array(31150, 31250, 31310, 31050, 31050, 31030, 31070, 31091, 31001);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    if (cm.isQuestCompleted(8860) && !cm.haveItem(4031528)) {
        cm.sendNext("我已经做过一次你的头发作为服务的交换，运动。如果你想再换一次的话，你得从现金商店买一张经验发优惠券!");
        cm.dispose();
    } else
        cm.sendYesNo("准备好做一个很棒的发型了吗？我想你是！只要说一句话，我们就开始！");
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        if (type == 7) {
            cm.sendNext("好的，我给你一分钟.");
        }
        
        cm.dispose();
    }
    status++;
    if (status == 1) {
        hairnew = Array();
        if (cm.getPlayer().getGender() == 0)
            for(var i = 0; i < mhair_q.length; i++)
                pushIfItemExists(hairnew, mhair_q[i]);
        else
            for(var j = 0; j < fhair_q.length; j++)
                pushIfItemExists(hairnew, fhair_q[j]);
        cm.sendNext("我们走！");
    } else {
        if (cm.haveItem(4031528)) {
            cm.gainItem(4031528, -1);
            cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
            cm.sendNextPrev("不错，如果我自己说的话！我知道我学的那些书会派上用场的...");
            cm.dispose();
        } else {
            cm.sendNext("嗯…你确定你有我们指定的免费优惠券吗？对不起，没有它就不能理发.");
            cm.dispose();
        }
    }
}
