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
 * @npc: Wonky
 * @map: 200080101 - Orbis - The Unknown Tower
 * @func: Orbis PQ
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

                if(cm.getMapId() == 200080101) {
                        if (status == 0) {
                                em = cm.getEventManager("OrbisPQ");
                                if(em == null) {
                                        cm.sendOk("�����˴���");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�������: Ů����>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�������#bŮ����#k��?���öӳ����ҶԻ���#b\r\n#L0#���뿪ʼ����.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "�ر�" : "����") + "��������.\r\n#L2#�������������ϸ�ڡ�\r\n#L3#��������Ʒ.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("��ȷ�����Ƿ��������.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("����Ķӳ������ҽ��жԻ�.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("�Ѿ������ڴ�Ƶ����������#rParty Quest#k.�볢�Ը�������Ƶ������ȴ������������.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�޷���ʼ���������ȷ����Ķ����������Ƿ�δ���ǰ������.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("������״̬��#b"+(psState ? "����":"�ر�")+"#k.�뻻������ʱ�����˵.");
                                        cm.dispose();
                                } else if (selection == 2) {
                                        cm.sendOk("#e#b<�������: Ů����>#k#n\r\n���ǵ�Ů��ܾ���ǰ��ʧ���ˣ�����˵����һ�γ�����Ů�������档���⣬���ǵı�������ǿ��ľ�������ռ����,��Щ����ڰ±�˹�����ε�������. ���ǵ�����ְ־��飬Ŀǰ��������λ������֪���������䣬�������Ƕش�Ѱ��һ���¸ҵ�Ӣ����ɣ�������ջ����ǵı�������Ӫ�������������Ŷ��ܹ���Ϊÿ��ְλ����ϣ�սʿ��ħ��ʦ�������֣������ͺ����������ǽ��õ��ҵ�ף��������������ս���С����ܰ���������\r\n");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendSimple("�����ý�����?\r\n\r\n#b#L0#Ů�������\r\n");
                                }
                        } else if (status == 2) {
                                if (selection == 0) {
                                        if (!cm.haveItem(1082232) && cm.haveItem(4001158, 10)) {
                                                cm.gainItem(1082232, 1);
                                                cm.gainItem(4001158, -10);
                                                cm.dispose();
                                        } else {
                                                cm.sendOk("���Ѿ�ӵ��#bŮ�������#k,������û��10��#b#t4001158##k��");
                                                cm.dispose();
                                        }
                                }
                        }
                } else {
                        if(status == 0) {
                                cm.sendYesNo("��Ҫ�˳����Ӫ��������?");
                        } else if(status == 1) {
                                cm.warp(920011200);
                                cm.dispose();
                        }
                }
        }
}
