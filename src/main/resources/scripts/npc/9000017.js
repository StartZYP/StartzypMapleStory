/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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
/* Coco
        Refining NPC: 
	* Chaos scroll SYNTHETIZER (rofl)
        * 
        * @author RonanLana
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
        cm.sendOk("哦,好的…如果你想做生意，就跟我们聊聊。");
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("Hi, I'm #b#p" + cm.getNpc() + "##k.");
            cm.dispose();
            return;
        }
        
        var selStr = "嘿,旅行者!来,过来……我们将为您提供一个巨大的商机。如果你想知道它是什么，请继续听……";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "想要制新春冰糖葫芦串吗?! 当然，做一个并不容易……但不要担心!只要给我收集一些材料和一些费用  为我们的服务提供保障。你想做吗?";
        cm.sendYesNo(selStr);
    }

    else if (status == 2) {
        //selectedItem = selection;
        selectedItem = 0;

        var itemSet = new Array(2022475, 2022475);
        var matSet = new Array(new Array(4001243,4032218));
        var matQtySet = new Array(new Array(1,4));
        var costSet = new Array(50000, 50000);
        item = itemSet[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
                
        var prompt = "所以，你想让我们做一些 #t" + item + "#? 那样的话，你想要我们做多少呢?";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "你想让我们做 ";
        if (qty == 1)
            prompt += "#t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
                        
        prompt += " 那样的话，我们需要你们提供特殊的产品才能生产。不过，要确保你的库存中有足够的空间!#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " 金币";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("来吧!我们不是来帮你的!我们都需要钱来维持正常的生活，所以带着钱去交易，开始合成。");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("在我们开始之前，你没有检查过你的背包是否有空位，不是吗?");
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
                cm.sendOk("你在开玩笑,对吧?如果没有所有的原料，我们就无法开始这个过程。把他们都找来，然后和我们谈谈!");
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
                cm.sendOk("哇……真不敢相信居然成功了!想一想，它可能会……嗯哼。当然有用，我们所有的工作都很有效率!很高兴和你做生意。");
            }
        }
        cm.dispose();
    }
}