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
/* Dr. Roberts
	Amoria Random/VIP Eye Color Change.
 */
var status = 0;
var beauty = 0;
var regprice = 1000000;
var vipprice = 1000000;
var colors = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

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
            cm.sendSimple("嗨，那里~！我是罗伯茨医生，负责阿莫里亚整形手术店的美容镜片！ 使用 #b#t5152025##k 或者 #b#t5152026##k, 你可以让我们照顾好其他人，拥有你一直渴望的那种美丽的外表~！记住，每个人首先注意到的是你的眼睛，我们可以帮你找到最适合你的化妆镜！现在，你想用什么？\r\n#L1#使用: #i5152025##t5152025##l\r\n#L2#使用: #i5152026##t5152026##l\r\n#L3#使用: #i5152106# (任何颜色)#l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace() % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                }
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 300, current +400, current + 500, current + 700]);
                cm.sendYesNo("如果您使用普通优惠券，您将随机获得一副化妆镜片。你要用 #b#t5152025##k 来改变你的眼睛吗？");
            } else if (selection == 2) {
                beauty = 2;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace() % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                }
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 300, current +400, current + 500, current + 700]);
                cm.sendStyle("使用我们的专用机器，您可以在治疗后提前看到自己。你想戴什么样的镜片？选择你喜欢的风格.", colors);
            } else if (selection == 3) {
                beauty = 3;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 21000;
                }
                
                colors = Array();
                for (var i = 0; i < 8; i++) {
                    if (cm.haveItem(5152100 + i)) {
                        pushIfItemExists(colors, current + 100 * i);
                    }
                }
                
                if (colors.length == 0) {
                    cm.sendOk("享受你的新的和改进的化妆镜片！");
                    cm.dispose();
                    return;
                }
                
                cm.sendStyle("对不起，我想你现在没有带我们的化妆镜优惠券。如果没有优惠券，恐怕我不能帮你。。", colors);
            }
        }
        else if (status == 2){
            if (beauty == 1){
                if (cm.haveItem(5152025)){
                    cm.gainItem(5152025, -1);
                    cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                    cm.sendOk("享受你的新的和改进的化妆镜片！");
                } else {
                    cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。如果没有优惠券，恐怕我不能帮你。。");
                    cm.dispose();
                }
            } else if (beauty == 2){
                if (cm.haveItem(5152026)){
                    cm.gainItem(5152026, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("享受你的新的和改进的化妆镜片！");
                } else {
                    cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。如果没有优惠券，恐怕我不能帮你。。");
                    cm.dispose();
                }
            } else if (beauty == 3){
                var color = (colors[selection] / 100) % 100 | 0;
                
                if (cm.haveItem(5152100 + color)){
                    cm.gainItem(5152100 + color, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("享受你的新的和改进的化妆镜片！");
                } else {
                    cm.sendOk("对不起，我想你现在没有带我们的化妆镜优惠券。如果没有优惠券，恐怕我不能帮你。。");
                }
            } else if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= regprice) {
                    cm.gainMeso(-regprice);
                    cm.gainItem(5152025, 1);
                    cm.sendOk("Enjoy!");
                    cm.dispose();
                } else if (selection == 1 && cm.getMeso() >= vipprice) {
                    cm.gainMeso(-vipprice);
                    cm.gainItem(5152026, 1);
                    cm.sendOk("Enjoy!");
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的金币来买优惠券！");
                }
            }
        }
    }
}