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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
*/

var status = 0;
var state;
var em = null;

function start() {
	status = -1;
        state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
                        if(state == 1) {
                                cm.sendYesNo("����������������?");
                        }
                        else {
                                em = cm.getEventManager("KerningPQ");
                                if(em == null) {
                                        cm.sendOk("����������һ������");
                                        cm.dispose();
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                            
                                cm.sendSimple("#e#b<�������: ��������>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����Ķ���һ�����һ��������ô��?������������һЩ�ϰ������⣬���û�����õ��ŶӺ����������޷�սʤ���ġ�������볢��һ�£����� #b��Ӷӳ�#k ����˵��.#b\r\n#L0#����μ��������\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "����״̬.\r\n#L2#����֪�������ϸ�ڡ�");
                        }
                } else if (status == 1) {
                        if(state == 1) {
                                cm.warp(103000000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("ֻ�е�����һ�������У�����ܲ����������");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("���ǵĶӳ��������̸̸���ܿ�ʼ�������");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("��һ���Ѿ������� #r�������#k �����Ƶ�����볢����һ��Ƶ������ȴ���ǰ�Ľ�Ŀ������");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�㻹���ܿ�ʼ������������ΪҪô��Ķ��鲻�ڷ�Χ�ڣ�Ҫô��Ķ����Աû���ʸ��ԣ�Ҫô���ǲ��ڵ�ͼ�ϡ��������Ѱ�Ҷ���ʱ�������ѣ������������ѡ�");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("��Ķ�������״̬������: #b" + (psState ? "����" : "����") + "#k. ��ʲôʱ���뻻��ʲôʱ�����˵��");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<�������: ��������>#k#n\r\n��Ķ������ͨ�����ؿ������⣬ͬʱͨ�������������Ŀ�ꡣ������Ŷ�Э�����Խ�һ���ƽ��ͻ������յ�BOSS���ռ��������Ŀ���Ա���뽱���׶Ρ�");
                                        cm.dispose();
                                }
                        }
                }
        }
}