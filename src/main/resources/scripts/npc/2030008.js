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
/* Adobis
 * 
 * El Nath - The Door to Zakum (211042300)
 * 
 * Vs Zakum Recruiter NPC
 * 
 * Custom Quest 100200 = Whether you can start Zakum PQ
 * Custom Quest 100201 = Whether you have done the trials
*/

var status;
var em;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if(cm.haveItem(4001109, 1)) {
            cm.warp(921100000, "out00");
            cm.dispose();
            return;
        }
        
        if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) {   // thanks Vcoc for finding out a need of reapproval from the masters for Zakum expeditions
            if (cm.getPlayer().getLevel() >= 50) {  // thanks Z1peR for noticing not-so-clear unmet requirements message here.
                cm.sendOk("���ģ����ϵ�������û�б�����...���������ĳһ�����������Ǿ���ȥ#b���Ϲ���#k���׼����ٽ�����ս,ֻ������������ʸ�ս����");
            } else {
                cm.sendOk("���ģ����ϵ�������û�б�����...");
            }
            
            cm.dispose();
            return;
        }
        
        em = cm.getEventManager("ZakumPQ");
        if(em == null) {
            cm.sendOk("�����ű����ִ���");
            cm.dispose();
            return;
        }
        
        if (status == 0) {
            cm.sendSimple("�ܺ�...�㿴�����߱�������.������ս��һ���׶Σ�#b\r\n#L0#����ȥ����Ͽ�Ѩ.����һ�׶Σ�#l\r\n#L1#̽������ѵ����.���ڶ��׶Σ�#l\r\n#L2#�ϳɻ������.�������׶Σ�#l");
        }
        else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("ֻ��������У�����ܲ����������");
                    cm.dispose();
                } else if(!cm.isLeader()) {
                    cm.sendOk("���öӳ����ҽ�̸");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if(eli.size() > 0) {
                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("�Ѿ����˽����˴�Ƶ��.�����¸���Ƶ���ٳ���");
                        }
                    }
                    else {
                        cm.sendOk("�����޷��������������Ϊ���Ķ��鲻�ڷ�Χ��С�ڣ�������ӳ�Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�");
                    }

                    cm.dispose();
                }
            } else if(selection == 1) {
                if (cm.haveItem(4031061) && !cm.haveItem(4031062))
                    cm.sendYesNo("�ã�������һ�����������ĵص㣬����п��ܻ�����");
                else {
                    if (cm.haveItem(4031062)) cm.sendNext("���Ѿ�����#b��ɽ�ĺ���#k,�㲻��Ҫ��������׶�.");
                    else cm.sendNext("�������֮ǰ����ս.");
                    
                    cm.dispose();
                }
            } else {
                if(cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    if(!cm.haveItem(4000082, 30)) {
                        cm.sendOk("���Ѿ������������������Ȼ��Ҫ#b30��#t4000082##k��5��#t4001017#.");
                    } else {
                        cm.completeQuest(100201);
                        cm.gainItem(4031061, -1);
                        cm.gainItem(4031062, -1);
                        cm.gainItem(4000082, -30);

                        cm.gainItem(4001017, 5);
                        cm.sendNext("���Ѿ����������#k,�������ս�����ˣ�");
                    }
                    
                    cm.dispose();
                } else {
                    cm.sendOk("��......��Ҫ�Ķ����������������ȫ�������ˣ�������ȷ��һ�����������ǲ���û�пո��ˡ�");
                    cm.dispose();
                }
            }
        }
        else if (status == 2) {
            cm.warp(280020000, 0);
            cm.dispose();
        }
    }
}
