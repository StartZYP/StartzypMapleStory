/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* Jack - Refining NPC
	@author ronancpl (Ronan)
 */

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.sendOk("很好，回头见.");
        cm.dispose();
        return;
    }

    if (status == 0) {
        var selStr = "嘿，你知道现在克里森伍德要塞的探险队吗？所以，有一个很好的机会，一个人可以提高自己，积累经验相当快。";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "所以说，我认为使用一些强力的药水可能会在正面产生一些差异, 我的意思是开始制作 #b#t2022284##k's 帮助他们的努力。所以，现在开始谈生意，我正在追求这些东西中的 #r大量的#k 那些物品中的: #r#t4032010##k, #r#t4032011##k, #r#t4032012##k, 以及一些支持事业的资金。 您想获得其中一些物品吗？";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2022284, 7777777);
        var matSet = new Array(new Array(4032010, 4032011, 4032012));
        var matQtySet = new Array(new Array(60, 60, 45));
        var costSet = new Array(75000, 7777777);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "好吧，我会做一些 #t" + item + "#. 那样的话，你要我做多少?";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "所以，你想让我 ";
        if (qty == 1)
            prompt += "a #t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
                        
        prompt += " 在这种情况下，我将需要您提供一些特定的物品来制造它。 并确保您的背包中有足够的空间!#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " meso";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("嗯，我说过我需要一些资金来制作它，不是吗？");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("在制作之前，你没有检查是否有空余的库存，对吧？");
        }
        else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * qty == 1) {
                        complete = cm.haveItem(mats[i]);
                    } else {
                        complete = cm.haveItem(mats[i], matQty[i] * qty);
                    }
                }
            } else {
                complete = cm.haveItem(mats, matQty * qty);
            }
            
            if (!complete)
                cm.sendOk("你的背包中没有足够的资源。请再检查一遍。");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendOk("就在那儿！谢谢合作。");
            }
        }
        cm.dispose();
    }
}