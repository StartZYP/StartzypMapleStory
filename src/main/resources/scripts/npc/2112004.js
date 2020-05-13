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
 * @npc: Romeo
 * @map: Magatia - Zenumist - Hidden Room (261000011)
 * @func: Magatia PQ (Zenumist)
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
                    
                if(cm.getMapId() != 261000011) {
                        if(status == 0) {
                                cm.sendYesNo("���Ǳ������ս������������Ҷ���뱣����Ĳ���������㲻�������ȥ�����ͬ����һ���⡣�������ԣ���Ҫ������?");
                        } else if(status == 1) {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_Z");
                                if(em == null) {
                                        cm.sendOk("������δ֪�Ĵ���.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�������: ����ŷ������Ҷ>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n���װ�������Ҷ������ˣ����Ҳ��������Թۣ�����Ϊ�ⳡ�޴��ĳ�ͻ���������ܿࡣ����Ҫ������ͬ�°�æ�����������ˣ�������ǣ�������Ķӳ�����̸̸.#b\r\n#L0#����μ��������.\r\n#L1#����鿴" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "״̬.\r\n#L2#�����˽����ϸ����Ϣ.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("ֻ���ڶ���������ܲμ��������.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("ֻ����Ķӳ������ҶԻ����ܿ�ʼ����.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("��һ���ѽ����Ƶ���ġ�������񡱡��볢������Ƶ������ȴ���ǰ���뷽���.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�����޷��μ����������Ϊ����Ⱥ���ڷ�Χ��С�ڣ�����Ⱥ��Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�������Ҳ�����Ա������������.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("���Ķ���״̬Ϊ: #b" + (psState ? "����" : "����") + "#k. �������ʱ�����˵.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<�������: ����ŷ������Ҷ>#k#n\r\n����ǰ��һλ���������صĿ�ѧ����Ϊ�о������������Ŭ��˹�صĽ��������������������С���������ֽ���������ľ޴����������ɽ�ֹ�����߽����о���Ȼ��������������һ���ɣ��������о��ж�����˳ɹ�����������������ˡ�\r\n���������ڱ������Ѿ����������İ���һ����������һ��Ŀ�����ң���Ϊ�������������ļ̳�����ӵٵĴ���Ƭ�����Ҳ����¡����Ǳ��벻ϧһ�д����ҵ���!\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}