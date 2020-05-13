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
/* Salon Seamus
	Amoria Random Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_e = Array(30000, 30020, 30110, 30130, 30160, 30190, 30240, 30270, 30430);
var fhair_e = Array(31000, 31030, 31050, 31070, 31090, 31150, 31310, 31910, 34010);
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
            cm.sendSimple("����ɳ��лĬ˹���������#b#t5150019##k��#b#t5151016##k�������Ҹ��㻻��������ô����\r\n#L1#���ͣ�#i5150019##t5150019##l\r\n#L2#Ⱦ����#i5151016##t5151016##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_e.length; i++) {
                        pushIfItemExists(hairnew, mhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_e.length; i++) {
                        pushIfItemExists(hairnew, fhair_e[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendYesNo("�����ʹ�þ����Ż�ȯ�����ͷ��������仯���л�����һ���µ�ʵ���񣬼�ʹ����Ϊ�����ܡ���Ҫ��#b#t5150019##k ���Ҫ�ı���ķ�����");
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()
                    /10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendYesNo("�����ʹ����ͨ�Ż�ȯ�����ͷ��������ı䡣�Ƿ���Ҫʹ��#b#t5150016##k�����и��ģ�");
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5150019) == true){
                    cm.gainItem(5150019, -1);
                    cm.setHair(hairnew[Math.floor(Math.random() * hairnew.length)]);
                    cm.sendOk("�������µĺ͸Ľ��ķ��ͣ�");
                } else {
                    cm.sendOk("�š���������û������ָ�����Ż�ȯ��������û�����Ҳ��ܸ����������Һܱ�Ǹ..");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151016) == true){
                    cm.gainItem(5151016, -1);
                    cm.setHair(haircolor[Math.floor(Math.random() * haircolor.length)]);
                    cm.sendOk("�������µĺ͸Ľ��ķ��ͣ�");
                } else {
                    cm.sendOk("�š�������û������ָ�����Ż�ȯ������û�����Ҳ���Ⱦ���ͷ�����Һܱ�Ǹ...");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150019, 1);
                    cm.sendOk("���ܰ�!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151016, 1);
                    cm.sendOk("���ܰ�!");
                } else {
                    cm.sendOk("��û���㹻�Ľ��������Ż�ȯ��");
                }
            }
        }
    }
}