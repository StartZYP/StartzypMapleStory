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
//First version thanks to Moogra

/**
 * @author: Ronan
 * @npc: Flo
 * @map: Ludibrium - Path of Time (220050300)
 * @func: Elemental Thanatos room
*/

var status = 0;
var em = null;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        if(!(cm.isQuestCompleted(6316) && (cm.isQuestStarted(6225) || cm.isQuestStarted(6315)))) {
                                cm.sendOk("���ƺ�û������ȥ��Ԫ��Ϊ������������˹��");
                                cm.dispose();
                                return;
                        }
                    
                        em = cm.getEventManager("ElementalBattle");
                        if(em == null) {
                                cm.sendOk("Ԫ��֮ս������һ������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<��� ����: �����ԣ��ס�����>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n������Ԫ����ͽ���԰�?��������һ����������ͬԪ���׺����ķ�ʦ��ӣ����ǽ��ܹ�սʤ���ǡ���Ϊһ���쵼�ߣ�����׼����Ҫ�ߵ�ʱ���������.#b\r\n#L0#����μ��������\r\n#L1#���� " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + " �������.\r\n#L2#����֪�������ϸ�ڡ�");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("ֻ�е�����һ���Ŷ��У�����ܲ����Ŷ�����");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("���ǵĶӳ��������̸̸���ܿ�ʼ�������");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��һ�������Ѿ������ͨ���н�����#r�������#k���볢����һ��Ƶ������ȴ���ǰ�Ľ�Ŀ������");
                                                }
                                        }
                                        else {
                                                cm.sendOk("�㻹���ܿ�ʼ����Ŷ�������ΪҪô����ŶӲ��ڷ�Χ�ڣ�Ҫô����Ŷӳ�Աû���ʸ��ԣ�Ҫô���ǲ��ڵ�ͼ�ϡ��������Ѱ�Ҷ���ʱ�������ѣ������������ѡ�");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("��Ķ�������״̬������: #b" + (psState ? "����" : "����") + "#k. ��ʲôʱ���뻻��ʲôʱ�����˵��");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<��� ����: �����ԣ��ס�����>#k#n\r\n ����һ��ӵ�в�ͬԪ���׺����ķ�ʦ���#k �ڽ�����̨֮ǰ���Ŷӷ�����ڿ˷��ڲ�Ԫ����������Ҫ�ġ�");
                                cm.dispose();
                        }
                }
        }
}
