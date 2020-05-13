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

var status = -1;

function start() {
	action(1, 0, 0);	
}

function action(mode, type, selection) {  
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("��K������...!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("...�㣿", 2);
		} else if (status == 2) {
			cm.sendNextPrev("������ڵ����ˡ���...�ͺ�ħ�������Y��Ӣ���K����...��", 8);
		} else if (status == 3) {
			cm.sendNextPrev("...�������fʲô�������l...��", 2);
		} else if (status == 4) {
			cm.sendNextPrev("��...�ҵ������l...��ʲô���벻������...��...���ҵ��^ʹ�������_�ˣ�", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("��߀�Æ᣿", 8);
		} else if (status == 1) {
			cm.sendNextPrev("��...ʲô����ӛ����...�@�Y�����Y��߀�������l��", 2);
		} else if (status == 2) {
			cm.sendNextPrev("Ո�����o����ħ�������{��h�������ӛ��...�]�б�Ҫ����ʲ�ᶼ�벻������������֪�����£��ҕ������������f�� ��", 8);
		} else if (status == 3) {
			cm.sendNextPrev("����Ӣ�ۡ�������ǰ�ͺ�ħ�������Y������ð�U�u������������һ�̱���ħ�����{�䣬�L�r�g���i�ڱ�ѩ�Y�档ͬ�rҲʧȥ��ӛ����", 8);
		} else if (status == 4) {
			cm.sendNextPrev("�@��������u����ħ�������������ڴ˵ء��{�������y�����긲�w��˪��ѩ�������ڱ�֮�ߵ���̎���l�F�ġ�", 8);
		} else if (status == 5) {
			cm.sendNextPrev("�ҵ����ֽ����ա��������ĳɆT���Y����������ϵ��A�ԏĺܾ���ǰ���ڵȴ�Ӣ�ۻ؁�߀��...�K���ҵ����ˡ��F�ڡ������@�Y...", 8);
		} else if (status == 6) {
			cm.sendNextPrev("����һ���f̫���ˡ������㲻���R���˽�Ҳ�]�Pϵ���������֪��������... #b�҂���ȥ���f��#k���ڵ��_���f֮ǰ�����߀��ʲ����֪���ģ��ҕ���һ�����f����", 8);
		} else if (status == 7) {
			cm.spawnGuide();
			cm.warp(140090100, 0);
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("�㻹��ʲô�������������������һᾡ�����͵ø��� #b#l\r\n#L0#����˭��#l #l\r\n#L1#�������#l #l\r\n#L2#����˭��#l#l\r\n#L3#�����Ҹ���ô����#l #l\r\n#L4#�������ҵ���Ʒ#l #l\r\n#L5#���������ҵļ��ܣ�#l #l\r\n#L6#����֪�����װ����Ʒ��#l #l\r\n#L7#�����ʹ�ÿ������#l #l\r\n#L8#���������ܴ�����ı��䣿#l #l\r\n#L9#�������������ϣ�����������ô���ˡ�#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("���Ǽ�����ǰ�Ӻ�ɫ��ʦ�������ȷ��������Ӣ��֮һ����Ϊ�ڷ�ʦ��������ʧȥ�˼��䡣");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("������������,����Ǻ�ħ��ʦ�����������˯�ĵط�����һ����ѩ���ǵ�С�����������������졣");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("�������գ�������һ�������Ա����һֱ�ڵȴ���Ĺ���������Ԥ������˵������������ʱ������򵼡�");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("���Ǳ����˷�ʱ���ˣ��Ͽ���ǰɡ����������һ������ϸ�ڵġ�");
					cm.dispose();
				} else if(selection == 4) {
					cm.guideHint(14);
					cm.dispose();
				} else if(selection == 5) {
					cm.guideHint(15);
					cm.dispose();
				} else if(selection == 6) {
					cm.guideHint(16);
					cm.dispose();
				} else if(selection == 7) {
					cm.guideHint(17);
					cm.dispose();
				} else if(selection == 8) {
					cm.guideHint(18);
					cm.dispose();
				} else if(selection == 9) {
					cm.guideHint(19);
					cm.dispose();
				}									
		}
	}
}
}