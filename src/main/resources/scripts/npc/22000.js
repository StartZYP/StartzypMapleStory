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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("��������뿪�������Ҫ֧��#b150���#k���һ����ȥ#b�����#k�����ؼ����ǣ���һ���뿪������Ҳ���ܻص��������ˡ����ǲ�����Ҫȥ#b�����#k��");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("�š����Ҳ��㻹��ʲô�������Ҫ���������ɣ�");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("�ã����ڸ���#b150���#k�����ţ�����ʲô����·��˹��#b�Ƽ���#k���٣���Ӧ�ø����ҡ�ΰ���ð�ռң����ƺ��Ѿ�������Ľ�����");
        else
            cm.sendNext("ȷ��Ҫ�뿪����ô�����ȸ���#b150���#k�ɡ���");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("��Ȼ����#b�Ƽ���#k����Ҳ����������ȡ�κη��õġ����ˣ��������ھ���#b�����#k�����������ܻ��е㶯���������ˡ���");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("ʲô������ȥ#b�����#k����û��Ǯ������һ�����ˡ���");
                cm.dispose();
            } else
                cm.sendNext("�ܺã�#b150���#k����ô���������ھ���#b�����#k�����ɣ�");
        } else {
            cm.sendOk("���ҿ���������Ϊ�㻹û���㹻���ʸ�ȥ#b�����#k����ĵȼ�Ӧ��������7������7�����ϡ�");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}
