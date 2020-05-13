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

function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�ⲻ�Ƕ�;���У��������Ҫ����һЩ���飬�ҽ������ڵǻ�ǰ��ȥ��ɡ��㻹����Ͼ������?");
        } else {
            cm.sendOk("�����������׼����ɡ��Բ�����ô���һ�˳����˳�ʱ��������Ʊ��ͨ�����β�ѯ.");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ������һ����������������еĳ�Ʊ�������ı���.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı��������˵!");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(260000110);
        cm.gainItem(4031045, -1);
    }
    else {
        cm.sendOk("�����������׼����ɡ��Բ�����ô���һ�˳����˳�ʱ��������Ʊ��ͨ�����β�ѯ.");
    }
    
    cm.dispose();
}