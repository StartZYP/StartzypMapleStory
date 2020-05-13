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

/* Mino the Owner
	Orbis VIP Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30230, 30260, 30280, 30340, 30490);
var fhair_v = Array(31110, 31220, 31230, 31630, 31790);
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
            cm.sendSimple("���,������Ŭ.�������#b#t5150005##k��#b#t5151005##k,�һ�Ϊ���������.��ѡ��һ�ַ���.\r\n#L1#ʹ��#b#i5150005##t5150005##l#k\r\n#L2#ʹ��#b#i5151005##t5151005##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendStyle("ʹ��#b#t5150005##kѡ����ϲ���ķ���!", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("ʹ��#b#t5151005##kѡ����ϲ���ķ�����ɫ!", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420004)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�������»��ķ��Ͱ�!");
                } else if (cm.haveItem(5150005) == true){
                    cm.gainItem(5150005, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�������»��ķ��Ͱ�!");
                } else {
                    cm.sendOk("��...�ܱ�Ǹ��û��#b#t5151005##k�޷����и���");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151005) == true){
                    cm.gainItem(5151005, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("�������»��ķ��Ͱ�!");
                } else {
                    cm.sendOk("��...�ܱ�Ǹ��û��#b#t5151005##k�޷����и���");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150005, 1);
                    cm.sendOk("��ÿ�!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151005, 1);
                    cm.sendOk("��ÿ�!");
                } else {
                    cm.sendOk("��û���㹻�ĵ���ȯ!");
                }
            }
        }
    }
}