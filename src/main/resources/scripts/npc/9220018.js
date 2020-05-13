/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @npc: Charles
 * @func: Treasure PQ
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
                        em = cm.getEventManager("TreasurePQ");
                        if(em == null) {
                                cm.sendOk("The Treasure PQ has encountered an error.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                        
                        cm.sendSimple("#e#b<�������: MV's Lair>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�㲻������ǰ���ˣ���Ϊǰ���зǳ�Σ�յ���� �������Ա�������������������볢��һ�£�����#b��Ӷӳ�#k ����˵��.#b\r\n#L0#����μ��������\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "����״̬.\r\n#L2#����֪�������ϸ�ڡ�");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("ֻ��������У�����ܲ����������");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("����鳤�������̸̸�����ܿ�ʼ����������");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��һ���ѽ����Ƶ���� #r���̽��#k�����Ƶ�����볢������Ƶ������ȴ���ǰ���뷽��ɡ�");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("�����޷�������Ⱥ������Ϊ����Ⱥ���ڷ�Χ��С�ڣ�����Ⱥ��Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�������Ҳ�����Ա�������ҡ�");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("�������״̬Ϊ : #b" + (psState ? "����" : "����") + "#k. �뻻������ʱ�����˵��");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<�������: MV's Lair>#k#n\r\n�ٴγ��֣���������Ҷ������ĸ�����������Ҷ�����ֵ������ͻȻϮ��������MV���������º���MV�ı�������ȡ��Ʒ��");
                                cm.dispose();
                        }
                }
        }
}