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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Robert Holly - Ludibrium: Ludibrium (220000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("�������ˡ���û���������ô�����ѡ�������,����Ц��!������Σ��������ı����⣬����ʱ������������̸���¡�����㽻�˺ܶ����ѣ���ô���֪�������ٺ١���");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("�������ˡ�����Ϊ�㲢û�����������ô�����ѡ����û�У�������û��240,000��� ?���������������ı������ˣ�����������̸���¡���Ȼ�������������㹻�Ľ�Һ󡣺ٺ١���");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("��ϣ����������������һ�����Ǯ����,���!�㲻��������ĺ���������?�㿴������һ���кܶ����ѵ��ˡ����������ô��?����Ǯ���ҿ���Ϊ��ʵ�������������ס����һ��ֻ������һ���ַ�������������Ӱ�����ʻ��ϵ��κ������ַ�������Ҫ��չ���ĺ����б���?");
	} else if (status == 1) {
		cm.sendYesNo("�ðɣ��Ⲣ����˵��ʵ�ʡ�#b����240,000��ң��һ����5��������������ĺ����б�#k�С��Ҳ��ᵥ����������һ���㹺�������⽫��Զ����ĺ����б��ϡ����������Ҫ����ĺ���λ����ô�㻹����ȥ��������ô������Ứ240��000�����");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("�� ��ȷ������#b240,000���#k? �����ǲ�����ĺ����б��Ѿ�����..");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("�ð�!���Ѿ�����ĺ������������5��λ�á�����һ�¡������ĺ��������ϻ���Ҫ����ռ䣬��֪������˭����Ȼ���ⲻ����ѵġ����ðɣ��´��ټ�����");
			cm.dispose();
			}
		}
	}
}