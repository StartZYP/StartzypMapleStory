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
var status = 0;
var selected = -1;
var party = 0;



function start() {
	status = -1;
	var text = "�޷���NPC���н�̸";
	if (cm.getMapId() == 926020001)
		text = "ֹͣǰ�������Ѿ��ɹ���ͨ���˷������Ĳ��ԡ��ڷ������Ķ����£��㽫�л�����뷨�����ķ�Ĺ���������ڽ�����\r\n\r\n#b#L0#�ǵģ������ھ����ȥ��#l\r\n#L1#��������һ����ȥ��#l";
	else if (cm.getMapId() == 926010000)
		text = "���ǶŰ��ء�\r\n\r\n#b#L0#���ʽ��������¡�#l\r\n#e#L1#�����������#l#n\r\n\r\n#L2#Ѱ�����#l\r\n\r\n#L3#���뷨�����ķ�Ĺ��#l\r\n#L4#ѯ�ʷ������ı��ء�#l\r\n#L5##b���<�����ػ���ѫ��>#k#l";
	else 
		text = "���������ս�뿪��\r\n\r\n#b#L0#�ȼ�#l";
		
	cm.sendSimple(text);
}


function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode < 0 || (type == 4 && mode == 0)) {
		cm.dispose();
		return;
	} else status++;
	
	if (cm.getMapId() == 926010000) {
		if (status == 0) {
			if (selection > -1) selected = selection;
			if (selection == 0 || selected == 0) {
				cm.sendNext("����Ƿ������������������븴��֮�񡣺ܳ�һ��ʱ�䣬����������ɳĮ����Ƿ����������ӵ�������������㲻�»��Һ��������������ս������������˯�ڽ���������ܽ����Σ�ѡ��Ȩ���㡣");
			} else if (selection == 1) {
				cm.sendSimple("������Щ�����·������ķ�ŭɵ�ϣ�������ʱ��ѡ�����ǵ������ˣ�\r\n\r\n#b#L0#������ս��#l\r\n#L1#2�˻�2�����ϵĶ��������ս#l");
			} else if (selection == 2) {
				cm.showInfoText("ʹ���������(�ȼ�O)������ʱ�������Ҫ����Ķ��飡");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendSimple("�����ʲô��ʯ��\r\n\r\n#L0##i4001322# #t4001322##l\r\n#L1##i4001323# #t4001323##l\r\n#L2##i4001324# #t4001324##l\r\n#L3##i4001325# #t4001325##l");
			} else if (selection == 4) {
				cm.sendNext("�ڰ�ѩ�˷��ϵķ�Ĺ�����Ի��#e#b#t2022613##k#n֤���Լ����������#b����С��ѩ��#k. ���������һ���ǳ��ر�ı��ء�����#e#b#t1132012##k#n.\r\n#i1132012:# #t1132012#\r\n\r\n�������������ģʽ�����棬�㽫�õ�#e#b#t1132013##k#n.\r\n\r\n#i1132013:# #t1132013#\r\n\r\n��Ȼ, �������������������·�����");
			} else if (selection == 5) {
				var progress = cm.getQuestProgressInt(29932);
				if (progress >= 50000)
					cm.dispose();
				else
					cm.sendNext("");
					
			}
		} else if (status == 1) {
			if (selected == 0) {
				cm.sendNextPrev("һ���������������㽫���ٷ������ķ�ŭ���һ����һЩ���飬�úü�ס���ǡ�#b\r\n\r\n1.С��һ�㲻Ҫ��#e#r������#b#n����.������ĵȼ���Ψһ�������ǲ�ͣ�������ս����\r\n2. ��Щû���������˽���������Ĵ��ۡ�С�Ĳ�Ҫ����κ�#rʧ��#k��\r\n3.С�ķ���С��ѩ�����ϵ�#v04032424#״̬.�����������״̬�¶������й���������ڵġ�\r\n4. ���ǵ�ʹ�ü��ܣ����Ǹ�����Ҹ档");
			} else if (selected == 1) {
				party = selection;
				cm.sendSimple("�������Ĳп�ȱ���־���ˣ�������ľ����ɣ�\r\n#L0##i3994115##l#L1##i3994116##l#L2##i3994117##l#L3##i3994118##l");
			} else if (selected == 3) {
				if (selection == 0) {
					if (cm.haveItem(4001322)) {
						return;
					}
				} else if (selection == 1) {
				    if (cm.haveItem(4001323)) {
						return;
					}
				} else if (selection == 2) {
					if (cm.haveItem(4001324)) {
						return;
					}
				} else if (selection == 3) {
					if (cm.haveItem(4001325)) {
						return;
					}
				}
				cm.sendOk("����Ҫһ�鱦ʯ���ܽ���Ү�ᷨ�ϵķ�Ĺ����ȷ��������");
				cm.dispose();
			} else if (selected == 5) {
			} else {
				cm.dispose();
			}
		} else if (status == 2) {
			if (selected == 0) {
				cm.sendNextPrev("���ֵܵ��������ķ�ŭ���˻�õ�������ս��Ʒ����ʧ�ܵ��˽����������������ܸ����ȫ�����顣ʣ�µĽ������ˡ�");
			} else if (selected == 1) {
				var mode = "EASY";
				//Finish this
				var pqparty = cm.getPlayer().getParty();
				if (party == 1) {
					if (pqparty == null) {
						cm.sendOk("����һ�����");//BE NICE
						cm.dispose();
						return;		
					} else {
						if (pqparty.getMembers().size() < 0) {
							cm.sendOk("��Ҫ����Ķ�Ա���ܽ���...");
							cm.dispose();
							return;								
						} else {
							var i = 0;
							for (var a = 0; a < pqparty.getMembers().size(); a++) {
								var pqchar = pqparty.getMembers().get(a);
								if (i > 1) break;
								if (pqchar != null && pqchar.getMapId() == 926010000) i++;
							}
							if (i < 0) {
								cm.sendOk("��ȷ���Ƿ���2�����ϵĶ�����߶�Ա�ڵ�ͼ��");
								cm.dispose();
								return;								
							}
						}
					}					
				}
				
				if (cm.getPlayer().getLevel() < 40) {
					cm.sendOk("�����Ҫ40�����ϲ��ܽ�����ս");
					cm.dispose();
					return;
				}
				if (selection < 3 && cm.getPlayer().getLevel() > 60) {
					cm.sendOk("ֻ��60�����ϲ�����ս����ģʽ");
					cm.dispose();
					return;
				} 
				if (selection == 1) mode = "NORMAL";
				else if (selection == 2) mode = "HARD";
				else if (selection == 3) mode = "HELL";
	
				if (!cm.start_PyramidSubway(selection)) {
					cm.sendOk("��ģʽ�����з��䶼���������Ժ����Ի�������Ƶ�������ԡ�");
				}
				cm.dispose();
			}
		} else if (status == 3) {
			cm.dispose();
		}
	} else if (cm.getMapId() == 926020001) {
		if (status == 0) {
			if (selection == 0) 
				cm.dispose();//:(
			else if (selection == 1) 
				cm.sendNext("��Ҫ��#b��ѩ�˷��ϵĻ�ˮ��#k���㡣��������ʱ����������鱦ʯ�����ѩ�˷��ϵķ�Ĺ���������������Ƿ�������һ����λ��");
			
		} else if (status == 1) {
			var itemid = 4001325;
			if (cm.getPlayer().getLevel() >= 60) itemid = 4001325;
			if (cm.canHold(itemid)) {
				cm.gainItem(itemid);
				cm.warp(926010000);
			} else 
				cm.showInfoText("����������������������һ����λ���ܻ�ý�����");
			
			cm.dispose();
		}
	} else {
			cm.warp(926010000);
			cm.getPlayer().setPartyQuest(null);
			cm.dispose();
	}
}/*Do you want to forfeit the challenge and leave?

Your allotted time has passed. Do you want to leave now?



*/