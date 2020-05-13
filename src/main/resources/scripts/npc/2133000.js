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
 * @npc: Ellin
 * @map: 300030100 - Deep Fairy Forest
 * @func: Ellin PQ
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
                        em = cm.getEventManager("EllinPQ");
                        if(em == null) {
                                cm.sendOk("������δ֪�Ĵ���.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<�������: ����ɭ��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n���뼯�ϻ����һ���Ŷ����������ɭ�ֵ�������#k? ӵ����� #b����#k �������Ļ��߽��������.#b\r\n#L0#����μ����.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "����״̬.\r\n#L2#������������ϸ��.\r\n#L3#������ȡ��Ʒ.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("ֻ���ڶ����У�����ܲ����������");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("��Ķӳ��������̸̸�����ܿ�ʼ�����ӵ�����");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��һ���ѽ���#r���Ƶ�����ɶ�����#k�볢������Ƶ������ȴ���ǰ���뷽���.");
                                                }
                                        }
                                        else {
                                                cm.sendOk("�����޷�������Ⱥ������Ϊ����Ⱥ���ڷ�Χ��С�ڣ�����Ⱥ��Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�������Ҳ������飬���Դ����µĶ���.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("����Ⱥ����״̬Ϊ: #b" + (psState ? "����" : "����") + "#k. �������ʱ�����˵.");
                                cm.dispose();
                        } else if (selection == 2) {
                                cm.sendOk("#e#b<�������:����ɭ��>#k#n\r\n����������У�����������𲽵ش������֣�ӭս���·�ϵ����л����������������������⣬���Ž��Լ�����ȡ��õ��ŶӺ������˷�ʱ�����ƺ�ǿ�������������һ���ϰ壬����Ŷ��л�����һ������ʯ�������ڳ��ڵ�ͼ����Ȫ�Ե���ʱ������֤�Ŷӻ�ö���Ľ�Ʒ��ף�����.");
                                cm.dispose();
                        }
                        else {
                                cm.sendSimple("��ô��������ʲô��Ʒ��?\r\n#b#L0#�Ѱ���̩��������.\r\n#L1#���������İ���̩����.\r\n#L2#������ҫ�İ���̩����");
                        }
                } else if (status == 2) {
                        if (selection == 0) {
                                if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("Ҫô�Ѿ��а���̩������Ҫô��û��10������̩��Ƭ.");
                                        cm.dispose();
                                }
                        } else if (selection == 1){
                                if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,-1);
                                        cm.gainItem(1032061, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                       cm.sendOk("��Ҫô�Ѿ�û�а���̩������Ҫô��û��10������̩��Ƭ.");
                                       cm.dispose();
                                }
                        } else if (selection == 2){
                                if (cm.haveItem(1032061) && !cm.haveItem(1032072) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032061,-1);
                                        cm.gainItem(1032072, 1);    // thanks yuxaij for noticing unexpected itemid here
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("��Ҫô�Ѿ�û�������İ���̩������Ҫô��û��10������̩��Ƭ.");
                                        cm.dispose();
                                }
                        }
                }
        }
}