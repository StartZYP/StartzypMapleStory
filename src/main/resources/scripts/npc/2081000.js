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
var temp;
var cost;

var status = 0;

function start() {
    cm.sendSimple("������������\r\n\r\n#L0##bħ������#k#l\r\n#L1##bΪ����ľ����ж�#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("�����ؿ��ǡ�һ���������˾���������֪��.");
        cm.dispose();
        return;
    }
    status++;
    if(status == 1) {
        if(selection == 0) {
            cm.sendSimple("��Ҫ�Ұ����㣿��\r\n#L0##b������#t4031346#.#k#l");
        } else {
            cm.sendNext("���ڿ�����.");
            cm.dispose();
        }
    } else if(status == 2) {
        cm.sendGetNumber("#b#t4031346##k��һ�����Ķ������Ҳ��ܾ��������㡣���Ҹ�Сæ��ô�������Ҿ͸��㡣��Ҫ��#b#t4031346##k����������#b30000���#k.��ȷ��Ҫ������?",0,0,99);
    } else if(status == 3) {
        if(selection == 0) {
            cm.sendOk("�Ҳ���������.");
            cm.dispose();
        } else {
            temp = selection;
            cost = temp * 30000;
            cm.sendYesNo("��Ҫ��#b"+temp+"��#t4031346#��?#k��������#b"+cost+"���#k.��ȷ��Ҫ������?");
        }
    } else if(status == 4) {
        if(cm.getMeso() < cost || !cm.canHold(4031346)) {
            cm.sendOk("��ȷ���Ƿ����㹻�Ľ�Һ͵�����λ");
        } else {
            cm.sendOk("��л������~");
            cm.gainItem(4031346, temp);
            cm.gainMeso(-cost);
        }
        cm.dispose();
    }
}