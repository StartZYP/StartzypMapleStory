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
		cm.sendNext("����㲻�������Ժ����������������������кܶ๤��Ҫ�����Ҳ��������Ͻ�����.");
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
		cm.sendYesNo("������������ʯ�����鱦�ģ��������ж��ٿ�ʯ�������û�����������Ĵ�ʦ����������ô���ǾͿ�����������������أ���������Ľ�һ����?");
	if (status == 1 && mode == 1) {
		var selStr = "��ϲ�����̬�ȣ��������ھ��������������������ֿ�ʯ? #b";
		var options = new Array("�ϳɿ�ʯ","���ƻƽ�����","����ˮ����");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
		cm.sendSimple(selStr);
	}
	else if (status == 2 && mode == 1) {
		selectedType = selection;
                
		if (selectedType == 0){ //mineral refine
			var selStr = "�����������ֿ���?#b";
			var minerals = new Array ("ͭ��","������","������","�������Ͻ��","����","����������","���","﮿�");
			for (var i = 0; i < minerals.length; i++){
				selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 1){ //jewel refine
			var selStr = "����������һ�ű�ʯ?#b";
			var jewels = new Array ("ʯ��ʯ","��ˮ��","������ʯ","��ĸ��","����ʯ","����ʯ","����","��ʯ","��ˮ��");
			for (var i = 0; i < jewels.length; i++){
				selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 2){ //Crystal refine
			var selStr = "ˮ������ȷʵ�Ǽ������Ķ��������ģ��ҿ�����������һ���Ľ�����������������ˮ��? #b";
			var crystals = new Array("����ˮ��","�ǻ�ˮ��","����ˮ��","����ˮ��");
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
		
                var prompt = "���ԣ�����������һЩ #t" + item + "#? �����Ļ�����Ҫ��������?";
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

            var prompt = "������������";
            if (qty == 1)
                prompt += "#t" + item + "#?";
            else
                prompt += qty + " #t" + item + "#?";

            prompt += "����������£�����Ҫ��ľ�������������������������Ҫȷ����Ŀ�������㹻�Ŀռ�!#b";

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
                cm.sendOk("�������ⷽ��Ŀ�治��");
            }
            else if (cm.getMeso() < cost * qty)
            {
                cm.sendOk("�����㸺��������ζ���ļ�Ǯ.");
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
                    cm.sendOk("����һ�£������Ƿ�����Я�������б������Ʒ������ǣ����������������������Ƿ��п�λ.");
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
                    cm.sendOk("���ˣ������ˡ����������һ������Ʒ�����𣿺ðɣ�����㻹��Ҫʲô����֪�����������ҵ���.");
                }
            }
            
            cm.dispose();
        }
}