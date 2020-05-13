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

    Author: Ronan Lana
*/
/* Chico
	Lidibrium : Ludibrium Village (2040014)
	
	Refining NPC: 
	* Omok sets - Set 2
	* Match of cards
*/

var status = -1;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;

var items = [4080100,4080006,4080007,4080008,4080009,4080010,4080011];
var matSet = [[4030012],[4030009,4030013,4030014],[4030009,4030013,4030016],[4030009,4030014,4030016],[4030009,4030015,4030013],[4030009,4030015,4030014],[4030009,4030015,4030016]];
var matQtySet = [[99],[1,99,99],[1,99,99],[1,99,99],[1,99,99],[1,99,99],[1,99,99]];
var costSet = [10000,25000,25000,25000,25000,25000,25000];

function start() {
    cm.getPlayer().setCS(true);
    var selStr = "你好，我是#p2040014#,我是迷你游戏的专家。你要我做什么样的迷你游戏？#b"
    var options = ["#i4080100# #t4080100#","#i4080006# #t4080006#","#i4080007# #t4080007#","#i4080008# #t4080008#","#i4080009# #t4080009#","#i4080010# #t4080010#","#i4080011# #t4080011#"];
    for (var i = 0; i < options.length; i++)
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        cm.dispose();
        return;
    }
    if (status == 0) {        
        selectedItem = selection;
        
        item = items[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
        qty = 1;
        
        var prompt = "所以你想去";
        if (qty == 1)
            prompt += "a #t" + item + "#";
        else
            prompt += qty + " #t" + item + "#";
        prompt += ",正确的？在这种情况下，我需要你的具体项目，以使它。不过，要确保你的背包中有足够的空间！#b";
        if (mats instanceof Array)
            for(var i = 0; i < mats.length; i++)
                prompt += "\r\n#i" + mats[i] + "#" + (matQty[i] * qty) + "#t" + mats[i] + "#";
        else
            prompt += "\r\n#i" + mats + "#" + (matQty * qty) + "#t" + mats + "#";
        if (cost > 0)
            prompt += "\r\n#i4031138#" + (cost * qty) + "金币";
        cm.sendYesNo(prompt);
    }else if (status == 1) {
        var complete = true;
        
        if (cm.getMeso() < (cost * qty)) {
            cm.sendOk("你看，我需要指定我的工资来支持我的事业，这是不可忽视的。一旦你拿到钱，我很乐意帮助你。");
            cm.dispose();
            return;
        }
        else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                        complete = false;
            }else if (!cm.haveItem(mats, matQty * qty))
                complete = false;
        }	
        if (!complete)
            cm.sendOk("你缺少一些你想做的东西。请提供它们，以便我合成迷你游戏。");
        else {
            if (cm.canHold(item,qty)) {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++)
                        cm.gainItem(mats[i], -(matQty[i] * qty));
                }else
                    cm.gainItem(mats, -(matQty * qty));
                cm.gainMeso(-(cost * qty));
                
                cm.gainItem(item, qty);
                cm.sendOk("这是你的迷你游戏。玩得高兴！");
            }else {
                cm.sendOk("如果你的其他栏中没有足够的空间，我就不能给你做一套。请先腾出一个地方，然后和我谈谈。");
            }
        }
        
        cm.dispose();
    }
}