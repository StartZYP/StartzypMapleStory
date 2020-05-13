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
/* Delli
	Looking for Delli 3 (925010200)
	Hypnotize skill quest NPC.
 */

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {
                        if (cm.getMapId() != 925010400) {
                                em = cm.getEventManager("DelliBattle");
                                if(em == null) {
                                        cm.sendOk("�¶���ս��������һ������.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<�������: ���ȵ���>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�� #r#p1095000##k ����������,����������? ... ���������Ϣ�Һ��ѹ����������ڻ����ܻ�ȥ��һЩ�����ܵ��˺�ħ��ʦ��Ӱ��,��Ҫ�������!...������Ҳ������ܰ�?��Ը��Ͷ�Ա������������?����ǵĻ�,��������#b�ӳ�#k����̸һ̸.#b\r\n#L0#����μ��������.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "����Ķ���.\r\n#L2#�������������ϸ��.");
                        } else {
                                cm.sendYesNo("����ɹ��ˣ�лл�㻤���ң��ҿ��Դ���ȥ#b#m120000104##k,��׼��������?");
                        }
                } else if (status == 1) {
                        if (cm.getMapId() != 925010400) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("ֻ���ڶ���������ܲμ��������.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("��Ķӳ�һ��Ҫ����̸̸���ܿ�ʼ����������.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("��һ���ѽ����Ƶ���ġ�������񡱡��볢������Ƶ������ȴ���ǰ���뷽���.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�����޷��������������Ϊ���Ķ���ȼ����ڽ��뷶Χ������Ⱥ��Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�������Ҳ�����Ա�����������.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("�������״̬Ϊ: #b" + (psState ? "����" : "����") + "#k. �������ʱ�����˵.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<�������: ���ȵ���>#k#n\r\n �������ڽ��У��ұ�����ս���ϼ��6�������Ҳ�����ɽ�ţ����ڴ��ڼ䱣���ң�ʹ�ҵ��������.");
                                        cm.dispose();
                                }
                        } else {
                                cm.warp(120000104);
                                cm.dispose();
                        }
                }
        }
}