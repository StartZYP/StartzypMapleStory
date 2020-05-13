/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Muhammad
	Map(s): 		Ariant:The Town of Ariant(260000200)
	Description: 	Jewel Refiner
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

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0 && status == 0) {
		cm.sendNext("如果你不急，请稍后再来。如你所见，现在有很多工作要做，我不可能马上交给你.");
		cm.dispose();
		return;
	}
	if (mode <= 0 && status >= 1){
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;

	if(status == 0)
		cm.sendYesNo("你是来提炼矿石还是珠宝的？不管你有多少矿石，如果你没有像我这样的大师来提炼，那么他们就看不到光明。你觉得呢，你现在想改进一下吗?");
	if (status == 1 && mode == 1) {
		var selStr = "我喜欢你的态度！我们现在就来处理。你想提炼哪种矿石? #b";
		var options = new Array("合成矿石","精制黄金首饰","提炼水晶矿");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
		cm.sendSimple(selStr);
	}
	else if (status == 2 && mode == 1) {
		selectedType = selection;
                
		if (selectedType == 0){ //mineral refine
			var selStr = "你想提炼哪种矿物?#b";
			var minerals = new Array ("铜矿","钢铁矿","秘银矿","艾德曼合金矿","银矿","奥利哈康矿","金矿","锂矿");
			for (var i = 0; i < minerals.length; i++){
				selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 1){ //jewel refine
			var selStr = "你想提炼哪一颗宝石?#b";
			var jewels = new Array ("石榴石","紫水晶","海蓝宝石","祖母绿","蛋白石","蓝宝石","黄玉","钻石","黑水晶");
			for (var i = 0; i < jewels.length; i++){
				selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 2){ //Crystal refine
			var selStr = "水晶？那确实是件罕见的东西。别担心，我可以像其他人一样改进它。你想提炼哪种水晶? #b";
			var crystals = new Array("力量水晶","智慧水晶","敏捷水晶","幸运水晶");
			for (var i = 0; i < crystals.length; i++){
				selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
	}
	else if (status == 3 && mode == 1) {
		selectedItem = selection;
			
		if (selectedType == 0){ //mineral refine
			var itemSet = new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006,4011008);
			var matSet = new Array(4010000,4010001,4010002,4010003,4010004,4010005,4010006,4010007);
			var matQtySet = new Array(10,10,10,10,10,10,10,10);
			var costSet = new Array(270,270,270,450,450,450,720,270);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 1){ //jewel refine
			var itemSet = new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008);
			var matSet = new Array(4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008);
			var matQtySet = new Array(10,10,10,10,10,10,10,10,10);
			var costSet = new Array (450,450,450,450,450,450,450,900,2700);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 2){ //Crystal refine
			var itemSet = new Array(4005000,4005001,4005002,4005003);
			var matSet = new Array(4004000,4004001,4004002,4004003);
			var matQtySet = new Array(10,10,10,10);
			var costSet = new Array (4500,4500,4500,4500);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		
                var prompt = "所以，你想让我做一些 #t" + item + "#? 那样的话，你要我做多少?";
		cm.sendGetNumber(prompt,1,1,100)
	}
        
        else if (status == 4 && mode == 1) {
            if (equip)
            {
                selectedItem = selection;
                qty = 1;
            }
            else
                qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

            var prompt = "你想让我制作";
            if (qty == 1)
                prompt += "#t" + item + "#?";
            else
                prompt += qty + " #t" + item + "#?";

            prompt += "在这种情况下，我需要你的具体数量，来制作他。不过，要确保你的库存中有足够的空间!#b";

            if (mats instanceof Array){
                for(var i = 0; i < mats.length; i++){
                    prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
                }
            }
            else {
                prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
            }

            if (cost > 0)
                prompt += "\r\n#i4031138# " + cost * qty + " meso";

            cm.sendYesNo(prompt);
        }
        else if (status == 5 && mode == 1) {
            var complete = true;
            var recvItem = item, recvQty;
            
            if (item >= 2060000 && item <= 2060002) //bow arrows
                recvQty = 1000 - (item - 2060000) * 100;
            else if (item >= 2061000 && item <= 2061002) //xbow arrows
                recvQty = 1000 - (item - 2061000) * 100;
            else if (item == 4003000)//screws
                recvQty = 15 * qty;
            else
                recvQty = qty;

            if(!cm.canHold(recvItem, recvQty)) {
                cm.sendOk("恐怕你这方面的库存不足");
            }
            else if (cm.getMeso() < cost * qty)
            {
                cm.sendOk("恐怕你负担不起这次锻造的价钱.");
            }
            else
            {
                if (mats instanceof Array) {
                    for(var i = 0; complete && i < mats.length; i++)
                    {
                        if (matQty[i] * qty == 1)	{
                            if (!cm.haveItem(mats[i]))
                            {
                                complete = false;
                            }
                        }
                        else {

                            if (cm.haveItem(mats[i],matQty[i]*qty))complete=false;
                        }
                    }
                }
                else {
                    if (!cm.haveItem(mats, matQty * qty))complete=false;
                }
                
                if (!complete)
                    cm.sendOk("请检查一下，看你是否随身携带了所有必需的物品。如果是，请检查您的其他栏，看看是否有空位.");
                else {
                    if (mats instanceof Array) {
                        for (var i = 0; i < mats.length; i++){
                            cm.gainItem(mats[i], -matQty[i] * qty);
                        }
                    }
                    else
                        cm.gainItem(mats, -matQty * qty);

                    if (cost > 0)
                        cm.gainMeso(-cost * qty);

                    cm.gainItem(recvItem, recvQty);
                    cm.sendOk("好了，结束了。你觉得这是一件艺术品，是吗？好吧，如果你还需要什么，你知道在哪里能找到我.");
                }
            }
            
            cm.dispose();
        }
}