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
//@Author Moogra, Ronan
//Fixed grammar, javascript syntax

importPackage(Packages.client);

var status = 0;
var price = 100000;

function isTransformed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210003;
}

function start() {
    if(!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))) {
        cm.sendOk("#r���ˣ����࣡�κ��˲���Խ���˴�!#k");
        cm.dispose();
        return;
    }
    
    cm.sendSimple("��ӭ��������֮����ڣ������ȥ�ͺڰ�����ս��������������ս��������Ҫ#b#v2000005#��#k����㱻���У�����Իָ�һЩ����#rHorntail#k.\r\n#L1#������#b100��000#k��ҹ���10��#l\r\n\#L2#����лл���������ҽ�ȥ��#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (selection == 1) {
        if(cm.getMeso() >= price) {
            if(!cm.canHold(2000005)) {
                cm.sendOk("�Բ�����ı�����û�н�������Ҫ����Ʒ!");
            } else {
                cm.gainMeso(-price);
                cm.gainItem(2000005, 10);
                cm.sendOk("лл���򣬼ǵ�ʹ��!");
            }
        } else {
            cm.sendOk("�Բ�����û���㹻�Ľ��");
        }
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99)
            cm.warp(240050000, 0);
        else
            cm.sendOk("�ܱ�Ǹ������Ҫ����100�������ϲ��ܽ��롣");
        cm.dispose();
    }
}