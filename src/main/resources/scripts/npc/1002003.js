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
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
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
		cm.sendNext("�Ҷ��ˡ�������û���������ô�����ѡ�������������Ц�ɣ������������������ı����⣬����ʱ����������̸���⡣����㽻�˺ܶ����ѣ���ô��֪���������Ǻǡ�����");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("�Ҷ��ˡ������Ҿ�����û�����������ô�����ѡ�������ǵĻ��������ھ�û��24�����΢�ӣ����������������ı����⣬��������̸���⡣��Ȼ��Ҳ����˵��һ����õ���һЩ�����ϵľȼá����Ǻǡ�����");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("��ϣ������׬�ú�����һ���ࡣ�����ðɣ���ã��㲻����չ��ĺ����б����㿴��������кܶ����ѵ��ˡ�����������أ�����Ǯ���ҿ��԰���ʵ�֡����������ס����һ��ֻӦ����һ���ַ�����˲���Ӱ�����ʻ��ϵ��κ������ַ���������չ��ĺ����б���");
	} else if (status == 1) {
		cm.sendYesNo("�õ�,��ʵû��ô��.#b240,000���,�һ�����ĺ����������ټ�5��λ��#k.�����Ҳ��ᵥ������.һ����������,������Զ����ĺ���������.����,���������Щ��Ҫ����ռ����֮һ,��ô��Ҳ������ô��.����ô��Ϊ?��Ứ240,000������?");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("�١�������ȷ������ #b240,000 ���#k? ����ǵĻ������һ����ĺ����б��Ƿ��Ѿ���չ�������ֵ����ʹ�㸶��Ǯ����ĺ����б��������� #b50#k.");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("�ðɣ���ĺ����б����ڽ���5�������λ�á����Լ�ȥ����������㻹��Ҫ����Ŀռ�����ĺ��������ϣ���֪����˭����Ȼ���ⲻ����ѵġ������ðɣ��þá�����");
			cm.dispose();
			}
		}
	}
}