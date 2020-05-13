/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

/**
 * @author: Ronan
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
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
                        em = cm.getEventManager("PiratePQ");
                        if(em == null) {
                                cm.sendOk("˽�е�PQ��������.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<�������: ������>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����ң��Һ��ӱ�����ˣ������µ�#r�Ϻ���#kץ����.����Ҫ��İ��������㴴�������һ����������������? ����#b�ӳ�#k���ҽ�̸�������Լ�����һ������.#b\r\n#L0#����μ���ӡ�\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "�ر�" : "����") + "�������.\r\n#L2#�������������ϸ��.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("ֻ�������������ܲμ�����.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("������Ķӳ�������̸��.");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("�Ѿ��ж����ڽ�����.�뻻һ��Ƶ��,���ߵȴ��������.");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("�㻹���ܿ�ʼ��Ӷ����Ϊ��Ķ�Ա���ڵ�ͼ���У���������û���ʸ�μ�.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("����������״̬Ϊ��#b" + (psState ? "����" : "�ر�") + "#k. �뻻������ʱ�����˵.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<�������: ������>#k#n\r\n�ڸ�����, �����������ͨ��������, ��ǰ�еĵ�·�϶Ը����еĺ����ͻ���������#r�Ϻ���#k����,ȡ����������˼����׶δ��˶��ٴ����ӣ����Ž׶εı仯�ϰ����ֵø���ǿ�����Ա��־��衣�׶�Խǿ������Ķ�Ա�ܶ����Ľ�����ֵ��һ�ԣ�ף����ˡ�");
                                cm.dispose();
                        }
                }
        }
}