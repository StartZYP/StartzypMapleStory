/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    Copyleft (L) 2016 - 2018 RonanLana (HeavenMS)

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

/* Saeko the Assistant
	Showa Random Face & Eye Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_r = Array(20000, 20016, 20019, 20020, 20021, 20024, 20026);
var fface_r = Array(21000, 21002, 21009, 21016, 21022, 21025, 21027);
var facenew = Array();
var colors = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
    cm.sendSimple("��,�Ҳ�����ô��,���� #b#t5152008##k ���� #b#t5152046##k,��������ζ���Ϊ������.��������,���������!\r\n#L1#ʹ��: #i5152008##t5152008##l\r\n#L2#ʹ��:#i5152046##t5152046##l");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 1) {
                beauty = 0;
                facenew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for (var i = 0; i < mface_r.length; i++)
                        pushIfItemExists(facenew, mface_r[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                else
                    for (var i = 0; i < fface_r.length; i++)
                        pushIfItemExists(facenew, fface_r[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                cm.sendYesNo("�����ʹ����ͨ�Ż�ȯ����������ܻ���һ������������ӡ��㻹���� #b#t5152008##k?");
            } else if (selection == 2) {
                beauty = 1;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 21000;
                }
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 200, current + 300, current +400, current + 500, current + 700]);
                cm.sendYesNo("�����ʹ����ͨ�Ż�ȯ������������һ����ױ��Ƭ����Ҫ�� #b#t5152046##k���ı�������۾���");
            }
        }
        else if (status == 2){
            if (beauty == 0) {
                if (cm.haveItem(5152008)){
                    cm.gainItem(5152008, -1);
                    cm.setFace(facenew[Math.floor(Math.random() * facenew.length)]);
                    cm.sendOk("����,���������һ���ϲ�������!");
                } else {
                    cm.sendOk("��...������û������ط����Ż�ȯ.�ܱ�Ǹ��ô˵,����û���Ż�ȯ,��û����������...");
                }
            } else if (beauty == 1) {
                if (cm.haveItem(5152046)){
                    cm.gainItem(5152046, -1);
                    cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                    cm.sendOk("��������µĺ͸Ľ��Ļ�ױ��Ƭ��");
                } else {
                    cm.sendOk("��...������û������ط����Ż�ȯ.�ܱ�Ǹ,û���Ż�ȯ,��û����������..");
                }
            }
            
            cm.dispose();
        }
    }
}
