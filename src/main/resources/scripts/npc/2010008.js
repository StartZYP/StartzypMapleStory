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
/* guild emblem npc */

var status = 0;
var sel;

function start() {
    cm.sendSimple("��~#b#h ##k��һ��Ư����΢�¸�������һ��������ص㣬��Ҫ��Ҫѡһ����\r\n\r\n#b#L0#����/���Ļ���#l#k");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            sel = selection;
            if (sel == 0) {
                if (cm.getPlayer().getGuildRank() == 1)
                    cm.sendYesNo("���´���һ��������Ҫ #b5,000,000���#k����ȷ��Ҫ������");
                else
                    cm.sendOk("������Ǽ����峤���ܸ��Ļ�ա������ǵ��峤���ҽ�����");
            }
        }
        else if (status == 2 && sel == 0) {
            cm.getPlayer().genericGuildMessage(17);
            cm.dispose();
        } else
            cm.dispose();
    }
}
