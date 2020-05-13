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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Hotel Receptionist - Sleepywood Hotel(105040400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.3 - More Cleanup by Moogra (12/17/09)
        1.2 - Cleanup and Statement fix by Moogra
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var regcost = 499;
var vipcost = 999;
var iwantreg = 0;

function start() {
    cm.sendNext("��ӭ�㣬����������֮�Ǳ��ݡ����ǾƵ�һֱŬ��Ϊ���ṩ��õķ������������Զ�ƣ�������������ǾƵ���Ϣһ����ô��?");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 1))
        cm.dispose();
    else {
        if (mode == 0 && status == 2) {
            cm.sendNext("����Ҳ�ṩ��������ķ�����������ϸ���Ǻ�����������");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1) {
            cm.sendSimple("�����ṩ���ַ���ķ�����ѡ��һ����ϲ����.\r\n#b#L0#��ͨɣ��(" + regcost + "���)#l\r\n#L1#VIPɣ�� (" + vipcost + "���)#l");
            iwantreg = 1;
        } else if (status == 2) {
            if (selection == 0)
                cm.sendYesNo("��ѡ���˳����ɣ�á����HP��MP��ܿ�ָ������������������ﹺ��һЩ��Ʒ����ȷ��Ҫ��ȥ��?");
            else if (selection == 1) {
                cm.sendYesNo("��ѡ����VIPɣ�á����HP��MP�����ͨɣ�ûָ��ø��죬�����������������ҵ�һ���������Ʒ����ȷ��Ҫ��ȥ��?");
		iwantreg = 0;
            }
        } else if (status == 3) {
            if (iwantreg == 1) {
                if (cm.getMeso() >= regcost) {
                    cm.warp(105040401);
                    cm.gainMeso(-regcost);
                } else
                    cm.sendNext("�Һܱ�Ǹ����������û���㹻�Ľ�ҡ�����Ҫ֧��" + regcost + "���.");
            } else {
                if (cm.getMeso() >= vipcost) {
                    cm.warp(105040402);
                    cm.gainMeso(-vipcost);
                } else
                    cm.sendNext("�Һܱ�Ǹ����������û���㹻�Ľ�ҡ�����Ҫ֧��" + vipcost + "���.");
            }
            cm.dispose();
        }
    }
}