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
        cm.sendOk("Ŷ,�õġ�������������⣬�͸��������ġ�");
        cm.dispose();
        return;
    }

    if (status == 0) {
        if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            cm.sendOk("Hi, I'm #b#p" + cm.getNpc() + "##k.");
            cm.dispose();
            return;
        }
        
        var selStr = "��,������!��,�����������ǽ�Ϊ���ṩһ���޴���̻����������֪������ʲô�������������";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "��Ҫ���´����Ǻ�«����?! ��Ȼ����һ���������ס�������Ҫ����!ֻҪ�����ռ�һЩ���Ϻ�һЩ����  Ϊ���ǵķ����ṩ���ϡ���������?";
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
                
        var prompt = "���ԣ�������������һЩ #t" + item + "#? �����Ļ�������Ҫ������������?";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "������������ ";
        if (qty == 1)
            prompt += "#t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
                        
        prompt += " �����Ļ���������Ҫ�����ṩ����Ĳ�Ʒ����������������Ҫȷ����Ŀ�������㹻�Ŀռ�!#b";
                
        if (mats instanceof Array){
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
        }
                
        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + " ���";
        }
        cm.sendYesNo(prompt);
    }
    
    else if (status == 4) {
        var complete = true;
                
        if (cm.getMeso() < cost * qty) {
            cm.sendOk("����!���ǲ����������!���Ƕ���ҪǮ��ά��������������Դ���Ǯȥ���ף���ʼ�ϳɡ�");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("�����ǿ�ʼ֮ǰ����û�м�����ı����Ƿ��п�λ��������?");
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
                cm.sendOk("���ڿ���Ц,�԰�?���û�����е�ԭ�ϣ����Ǿ��޷���ʼ������̡������Ƕ�������Ȼ�������̸̸!");
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
                cm.sendOk("�ۡ����治�����ž�Ȼ�ɹ���!��һ�룬�����ܻᡭ���źߡ���Ȼ���ã��������еĹ���������Ч��!�ܸ��˺��������⡣");
            }
        }
        cm.dispose();
    }
}