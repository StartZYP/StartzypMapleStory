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
 * @npc: Amos
 * @map: Entrance of Amorian Challenge (670010100)
 * @func: Amoria PQ
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
                        em = cm.getEventManager("AmoriaPQ");
                        if(em == null) {
                                cm.sendOk("The Amoria PQ has encountered an error.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<�������: ��Ī������ս��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n��������㹻������ȥ���԰�Ī�����˵���ս��������������һ������� #b�峤����˵.���һ�������ѻ�򸾵��ɶԱ����μ���ս�����и��õĽ�Ʒ������.#b\r\n#L0#����μ��������.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "�ر�" : "����") + "����״̬��\r\n#L2#�������������ϸ�ڡ�");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("ֻ�����ɶ��У�����ܲ����ɶ�����");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("����峤�������̸̸�����ܿ�ʼ����������");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��һ���ѽ����Ƶ������������볢������Ƶ������ȴ���ǰ���뷽��ɡ�");
                                                }
                                        }
                                        else {
                                                cm.sendOk("�����޷�������Ⱥ������Ϊ����Ⱥ���ڷ�Χ��С�ڣ�����Ⱥ��Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�������Ҳ�����Ա�������ҡ�");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("����Ⱥ����״̬Ϊ: #b" + (psState ? "enabled" : "disabled") + "#k. Talk to me whenever you want to change it back.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<�������: ��Ī������ս��>#k#n\r\n���ǰ�Ī˹�������İ�Ī������ս���������ˡ�������Ӱ�������Ŷ����⣬���к����ǽ����ĸ����ؼ�����������Һ��������Խ��뽱���׶Σ��ڸý׶ν���ʱ���Ի�����ô������һ��ȫ�����ɶԳ��������ǿ����ڶ���Ľ�����̨�ϻ�ø��õĽ�Ʒ��");
                                cm.dispose();
                        }
                }
        }
}
