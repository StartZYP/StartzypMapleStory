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
	Shalon - Ticketing Usher
-- By ---------------------------------------------------------------------------------------------
	Whoever written this script
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Whoever written this script
	2.0 - Second Version by Jayd
---------------------------------------------------------------------------------------------------
**/

status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("��ã������¼��»�����ɳ¡���ҿ��԰������ڶ�ʱ���ڵ�������С�����ȥ����������?\r\n#b#L0#������һ��ȥ�����еĻ�Ʊ\r\n#b#L1#����ȥ�����㡣");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("����ƱҪ����5000��ҡ������Ʊ��");
		}else if(selection == 1){
			cm.sendYesNo("���������ȥ��Ʊ����������ȡ����л��ѡ�������ǡ�");
		}
		oldSelection = selection;
	}else if(status == 1){
		if(oldSelection == 0){
			if (cm.getPlayer().getMeso() > 4999 && !cm.getPlayer().haveItem(4031732)) {
                                if(cm.getPlayer().canHold(4031732, 1)) {
                                        cm.gainMeso(-5000);
                                        cm.gainItem(4031732);
                                        cm.sendOk("��л��ѡ�����ǣ�ף�������죡");
                                        cm.dispose();
                                }
				else {
                                        cm.sendOk("��ı�����û����ѵ�Ʊλ������ǰԤ����Ʊ��");
                                        cm.dispose();
                                }
			} else {
				cm.sendOk("��û���㹻�Ľ�һ������Ѿ�����һ��Ʊ��");
				cm.dispose();
			}
		}else if(oldSelection == 1){
			if(cm.itemQuantity(4031732) > 0){
				var em = cm.getEventManager("AirPlane");
				if(em.getProperty("entry") == "true"){
					cm.warp(540010001);
					cm.gainItem(4031732, -1);
				}else{
					cm.sendOk("�Բ��𣬷ɻ�����ˣ���ȼ����ӡ�");
				}
			}else{
				cm.sendOk("����Ҫһ�� #b#t4031732##k �����Ϸɻ�!");
			}
		}
		cm.dispose();
	}
}