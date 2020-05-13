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
/*Amos the Strong - Entrance
**9201043
**@author Jvlaple
*/

var status = 0;
var MySelection = -1;

function start() {
    cm.sendSimple("�ҽа�Ī˹ǿ�ߡ�������ʲô?\r\n#b#L0#���밢Ī������ս��#l\r\n#L1#��10��Կ�׻�һ��Ʊ��#l\r\n#k");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("�õģ�׼����������.");
            cm.dispose();
            return;
        }
        if (mode == 1) 
            status++;
        else
            status--;
        if (status == 1 && selection == 0) {
            if (cm.haveItem(4031592, 1)) {
                cm.sendYesNo("����������� #b���#k?");
                MySelection = selection;
            } else {
                cm.sendOk("��������볡ȯ���ܽ�ȥ.");
                cm.dispose();
            }
        } else if (status == 1 && selection == 1) {
            if (cm.haveItem(4031592)) {
                cm.sendOk("���Ѿ����볡ȯ��!");
                cm.dispose();
            }
            else if (cm.haveItem(4031593, 10)) {
                cm.sendYesNo("��������Ҫһ��Ʊ?");
                MySelection = selection;
            } else {
                cm.sendOk("���ȸ�����10��Կ��!");
                cm.dispose();
            }
        } else if (status == 2 && MySelection == 0) {
            cm.warp(670010100, 0);
            cm.gainItem(4031592, -1)
            cm.dispose();
        } else if (status == 2 && MySelection == 1) {
            cm.gainItem(4031593, -10);
            cm.gainItem(4031592, 1);
            cm.dispose();
        }
    }
}