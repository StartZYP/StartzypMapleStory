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

/* Riza the Assistant
	Orbis Random Eye Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_r = Array(20003, 20011, 20021, 20022, 20023, 20027, 20031);
var fface_r = Array(21004, 21007, 21010, 21012, 21020, 21021, 21030);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("��ã�����ҽʦ��������.ʹ��#b#t5152004##k����������һ������!\r\n#L2#ʹ��#b#i5152004##t5152004##l");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 2) {
                facenew = Array();
                if (cm.getPlayer().getGender() == 0)
                    for (var i = 0; i < mface_r.length; i++)
                        pushIfItemExists(facenew, mface_r[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                else
                    for (var i = 0; i < fface_r.length; i++)
                        pushIfItemExists(facenew, fface_r[i] + cm.getPlayer().getFace() % 1000 - (cm.getPlayer().getFace() % 100));
                cm.sendYesNo("�����ʹ����ͨ�Ż�ȯ�����������ܻ���һ�����������ò��������ʹ��#b#t5152004#k��?");
            }
        }
        else if (status == 2){
            if (cm.haveItem(5152004)){
                cm.gainItem(5152004, -1);
                cm.setFace(facenew[Math.floor(Math.random() * facenew.length)]);
                cm.sendOk("�ú��������������!");
            } else {
                cm.sendOk("��... ������û������ط����Ż�ȯ���ܱ�Ǹ���޷������������...");
            }
            
            cm.dispose();
        }
    }
}
