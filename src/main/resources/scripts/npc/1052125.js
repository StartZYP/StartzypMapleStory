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
/*
	NPC Name: 		June
	Map(s): 		Kerning Square : 7th Floor 
	Description: 	Entrance to Spirit of Rock
	Depart_topFloorEnter
	request for a new song (block the portal before the spirit)
	composition fee (block the portal before the spirit)
	Say "NO" to Plagiarism (now we can open the portal)
*/
var status = -1;

function start() {
    cm.sendSimple("�ȵȣ����ڸĽ������������ĵ�·�ܵ����ơ���ֻ����������ĳЩ�������˽������#b\n\r\n#L0#����#e������#n.#l\r\n#L1#���ǹ������ĵ�#rVIP#b!#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
    	if (selection == 0) {
    		if (cm.isQuestStarted(2286) || cm.isQuestStarted(2287) || cm.isQuestStarted(2288)) {
        		var em = cm.getEventManager("RockSpirit");
                        if (!em.startInstance(cm.getPlayer())) {
                            cm.sendOk("��...ǰ��ķ������ڿ������е�ӵ�������������һ���������");
                        }
    			cm.dispose();
    			return;
    		} else {
    			cm.sendOk("��û������������˵���ڰ�������");  
       		}
    	} else {
    		if (cm.isQuestCompleted(2290)) {
                        if(cm.getPlayer().getLevel() > 50) {
                                cm.sendOk("VIPֻ��#r50��#k���ϵ���ҿ���.");
                        } else {
                                cm.sendOk("VIP��ͼֻ��ֻ�����VIP�����Ժ����ʹ��.");
                        }
                } else {
                        cm.sendOk("#rVIP#k?�ǵģ��ܸ���#rMr. VIP#k,��������ܰ�ȫ"); 
                }
    	}
    	cm.dispose();
    }
}