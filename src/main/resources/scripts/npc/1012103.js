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
/* Natalie
	Henesys VIP Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30060, 30140, 30200, 30210, 30310, 33040, 33100);
var fhair_v = Array(31150, 31300, 31350, 31700, 31740, 34050, 34110);
var hairnew = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 0) 
            cm.sendSimple("��ã������������ϰ���������. �������#b#t5150001##k����#b#t5151001##k���ҿ���Ϊ��ı䷢�ͻ��߷�ɫ. ��ѡ��ɣ�.\r\n#L1##bʹ��#i5150001##t5150001##l\r\n#L2##bʹ��#i5151001##t5151001##l");
        else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for(var i = 0; i < mhair_v.length; i++)
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
                if (cm.getPlayer().getGender() == 1)
                    for(var i = 0; i < fhair_v.length; i++)
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                cm.sendStyle("����ȫ���Ըı���ķ��ͣ������������ܺÿ�������Գ��Ըı�һ�¡��������#b#t5150001##k�һ�ı���ķ���. ��ѡ��ϲ���ķ��Ͱɣ�", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++)
                    pushIfItemExists(haircolor, current + i);
                cm.sendStyle("����ȫ���Ըı���ķ�ɫ�������������ܺÿ�������Գ��Ըı�һ�¡� ʹ��#b#t51051001##k�һ�ı���ķ�ɫ.��ѡ��ϲ������ɫ�ɣ�", haircolor);
            }
        } else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420002)){  // thanks MedicOP for noticing uncoded functionality for Hair Membership coupons
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�쿴������·��Ͱ�!");
                } else if (cm.haveItem(5150001)){
                    cm.gainItem(5150001, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�쿴������·��Ͱ�!");
                } else
                    cm.sendOk("��Ǹ����û�����ǵĻ�Ա���������޷�����ķ��ͽ��и���");
            }
            if (beauty == 2){
                if (cm.haveItem(5151001)){
                    cm.gainItem(5151001, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("�쿴������·�ɫ��!");
                } else
                    cm.sendOk("��Ǹ����û�����ǵĻ�Ա���������޷�����ķ�ɫ���и���");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150001, 1);
                    cm.sendOk("Enjoy!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151001, 1);
                    cm.sendOk("Enjoy!");
                } else
                    cm.sendOk("��û���㹻�ĵ���ȯ�����Ա��!");
            }
        }
    }
}