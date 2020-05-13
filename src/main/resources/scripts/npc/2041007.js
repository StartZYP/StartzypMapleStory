/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Miyu
	Ludibrium VIP Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30030, 30020, 30000, 30250, 30190, 30150, 30050, 30280, 30240, 30300, 30160);
var fhair_v = Array(31040, 31000, 31150, 31280, 31160, 31120, 31290, 31270, 31030, 31230, 31010);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
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
            cm.sendSimple("��ӭ������߳�����Ժ~�������#b#t5150007##k����#b#t5151007##k? ��������Ϊ������µ�����ɣ��������������ѡ���.\r\n#L1##bʹ��:#i5150007##t5150007##l\r\n#L2#ʹ��:#i5151007##t5151007##l#k");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                    }
                }
                cm.sendStyle("��ǰ�ķ��Ϳ��Ի���ȫ�µġ������ڻ�û������#b#t5150007##k���ܻ����͡�������ѡ������ķ��Ͱɣ�", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("���Գ��׸ı䵱ǰ�ķ�ɫ�����ѵ���û���ᷳ���ڵķ�ɫ��ֻҪ��#b#t5151007##k, �ҾͰ�����Ⱦɫ�������������ѡ��Ҫ�ķ�ɫ��", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420005)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("��������·��Ͱ�!");
                } else if (cm.haveItem(5150007) == true){
                    cm.gainItem(5150007, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("��������·��Ͱ�!");
                } else {
                    cm.sendOk("��......�����û�������������ר����ȯŶ���ܱ�Ǹ��û����ȯ�Ļ����Ҳ��ܸ�����ͷ����");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151007) == true){
                    cm.gainItem(5151007, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("�������µĺ͸Ľ���ͷ����ɫ!");
                } else {
                    cm.sendOk("��......�����û�������������ר��Ⱦɫ�������ܱ�Ǹ��û��Ⱦɫ���Ļ����Ҳ��ܸ���Ⱦɫ");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150007, 1);
                    cm.sendOk("���ܰ�!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151007, 1);
                    cm.sendOk("���ܰ�!");
                } else {
                    cm.sendOk("��û�ĵ���ȯ������");
                }
            }
        }
    }
}
