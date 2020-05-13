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
	VIP Cab - Victoria Road : Lith Harbor (104000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("��Һ�!�������⳵ֻ��VIP�ͻ�ʹ�á����ǲ�����ͨ�ĳ��⳵����ֻ�Ǵ���ȥ��ͬ�ĳ���֧��#b10,000#k���, ���ǻ���㰲ȫ���͵�#b���Ϲ㳡#k.");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("���С��Ҳ�кܶණ�������ṩ�����������б�Ҫȥ���Ϲ㳡���Ǿ������ǡ�");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "���ǶԳ�ѧ���о����Żݡ����Ϲ㳡λ�ڵ��³�������³�λ�ڽ����������ģ�������24Сʱ�ŵ�������ȥ������?" : "����������������зǳ�ѧ�ߡ����Ϲ㳡λ�ڵ��³����λ�ڽ����������ģ�������24Сʱ�ŵ�������ȥ������?");
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost)
            cm.sendNext("��������û���㹻�Ľ�ҡ��Բ���û�����㲻������VIP����")
        else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}