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
-- Odin JavaScript --------------------------------------------------------------------------------
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown & Information & xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var cost = new Array(300,400,5000,5000);
var msg = new Array("治愈被封印和诅咒的状态","治愈一切",",拥有神奇的力量，用于高级技能",",拥有召唤的力量，用于高级技能");
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        cm.sendNext("如果你能接受我的请求,我就把东西卖给你.");
        cm.dispose();
        return;
    }
    if(mode == 0 && status == 2) {
        cm.sendNext("我懂了。我这里有很多不同的东西。四处看看。我只是把这些东西卖给你。");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }
    
    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++){
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (价格:"+cost[i]+"金币)#k#l";
        }
        cm.sendSimple("谢谢你购买#b#t4031056##k.当然，也正因为如此，我用光了我在过去800年左右积累的力量的一半……但现在我可以平静地死去。哦，顺便说一下。。。你在找稀有物品吗？为了表示对你辛勤工作的感谢，我会把一些我有的东西卖给你，只有你。挑一个你想要的!"+selStr);
    }
    else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("#b#t"+item[selected]+"##k真的是你需要的道具吗? 这个道具"+msg[selected]+".这不是容易买到的东西，但我会给你一个好价钱。每件商品的价格是#b"+花费[selected]+"金币#k.你想购买多少", 0, 1, 100);
    }
    else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("如果你不打算买任何东西的话，我也没有什么可卖.");
            cm.dispose();
        }
        cm.sendYesNo("你真的想要买 #r"+amount+" #t"+item[selected]+"##k? 费用是"+cost[selected]+" 金币，每个#t"+item[selected]+"#,总共费用是#r"+totalcost+"金币#k.");
    } else if(status == 3) {
        if(cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("你确定你有足够的金币吗，如果没有至少也要有#r"+totalcost+"#k金币.");
            cm.dispose();
        }
        cm.sendNext("谢谢您。如果你发现自己在路上需要东西，一定要顺路过来。我虽然，但我仍然可以轻松地制作魔法物品.");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}