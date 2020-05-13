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
        cm.sendOk("�ܺã���ͷ��.");
        cm.dispose();
        return;
    }

    if (status == 0) {
        var selStr = "�٣���֪�����ڿ���ɭ���Ҫ����̽�ն������ԣ���һ���ܺõĻ��ᣬһ���˿�������Լ������۾����൱�졣";
        cm.sendNext(selStr);
    }
    else if (status == 1) {
	var selStr = "����˵������Ϊʹ��һЩǿ����ҩˮ���ܻ����������һЩ����, �ҵ���˼�ǿ�ʼ���� #b#t2022284##k's �������ǵ�Ŭ�������ԣ����ڿ�ʼ̸���⣬������׷����Щ�����е� #r������#k ��Щ��Ʒ�е�: #r#t4032010##k, #r#t4032011##k, #r#t4032012##k, �Լ�һЩ֧����ҵ���ʽ� ����������һЩ��Ʒ��";
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
                
        var prompt = "�ðɣ��һ���һЩ #t" + item + "#. �����Ļ�����Ҫ��������?";
        cm.sendGetNumber(prompt,1,1,100)
    }
        
    else if (status == 3) {
        qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        last_use = false;
                
        var prompt = "���ԣ��������� ";
        if (qty == 1)
            prompt += "a #t" + item + "#?";
        else
            prompt += qty + " #t" + item + "#?";
                        
        prompt += " ����������£��ҽ���Ҫ���ṩһЩ�ض�����Ʒ���������� ��ȷ�����ı��������㹻�Ŀռ�!#b";
                
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
            cm.sendOk("�ţ���˵������ҪһЩ�ʽ�����������������");
        }
        else if(!cm.canHold(item, qty)) {
            cm.sendOk("������֮ǰ����û�м���Ƿ��п���Ŀ�棬�԰ɣ�");
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
                cm.sendOk("��ı�����û���㹻����Դ�����ټ��һ�顣");
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
                cm.sendOk("�����Ƕ���лл������");
            }
        }
        cm.dispose();
    }
}