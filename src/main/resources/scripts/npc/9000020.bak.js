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
status = -1;


var travelFrom = [777777777,541000000];
var travelFee = [3000,10000];

var travelMap = [800000000,550000000];
var travelPlace = ["古代神社","马来西亚"];
var travelPlaceShort = ["古代神社","马来西亚"];
var travelPlaceCountry = ["Japan","Malaysia"];
var travelAgent = ["","#r#p9201135##k"];

var travelDescription = ["如果你想感受日本的精髓，蘑菇神殿是一个神话般的地方，供奉着自古以来无与伦比的蘑菇神。",
                        "如果你想在一个美妙的环境中感受热带的炎热，马来西亚的居民会热情欢迎你。此外，马来西亚本身是当地经济的中心，众所周知，这个地方总是提供一些事情做或参观。"];

var travelDescription2 = ["看看那个为蘑菇神服务的女萨满，我强烈建议你尝尝日本街头出售的美味食品。现在，让我们去古代神社，一个神话般的地方，如果有一个。",
                        "一到那里，我强烈建议你安排一次去甘榜村的旅行。为什么？你一定已经了解了梦幻主题公园的诡异世界？不？它只是把最棒的主题公园放在那里，值得一游！现在，让我们去马来西亚的趋势区."];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1,0,0);
}

function getTravelingStatus(mapid) {
    for(var i = 0; i < travelMap.length; i++) {
        if(mapid == travelMap[i]) {
            return i;
        }
    }
    
    return -1;
}

function getTravelType(mapid) {
    for(var i = 0; i < travelFrom.length; i++) {
        if(mapid == travelFrom[i]) {
            return i;
        }
    }
    
    return 0;
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    
    if (travelStatus != -1) {
        if (status == 0) 
            cm.sendSimple("旅行怎么样？你喜欢吗?#b\r\n#L0#是的，我旅行完了。我能回到#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#吗?\r\n#L1#不，我想继续探索这个地方。");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("好吧。我带你回到去日本之前的地方。如果你想再去旅行，请告诉我！");
            } else if (selection == 1) {
                cm.sendOk("好啊。如果你改变主意，请告诉我。");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) map = 104000000;
            
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("如果你厌倦了单调的日常生活，不如出去换个环境吧？没有什么比沉浸在一种新的文化中，一分一秒地学习新的东西更好的了！你该出去旅行了。我们，枫树旅行社推荐你去世界旅游！你担心旅行费用吗？你不应该！我们，枫叶旅行社，已经仔细地想出了一个计划，让你只花 #b" + cm.numberWithCommas(travelFee[travelType]) + " 金币#k!");
        } else if (status == 1) {
            cm.sendSimple("我们现在为您提供这个地方: #b" + travelPlace[travelType] + "#k" + travelAgent[travelType] +"我会在那儿给你当导游。请放心，目的地的数量会随着时间的推移而增加。现在，你想去" + travelPlaceShort[travelType] + "?#b\r\n#L0#" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            cm.sendNext("你想去旅行吗#b" + travelPlace[travelType] + "#k?" + travelDescription[travelType]);
        } else if (status == 3) {
            if(cm.getMeso() < travelFee[travelType]){
                cm.sendNext("你没有足够的金币去旅行。");
                cm.dispose();
                return;
            }
            cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 4) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}