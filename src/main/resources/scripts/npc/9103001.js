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
/*
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103001 - Rolly
*	Map =  Ludibrium - <Ludibrium>
*	NPC MapId = 220000000
*	Function = Start LMPQ
*
*/

var status = 0;

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
                        em = cm.getEventManager("LudiMazePQ");
                        if(em == null) {
                                cm.sendOk("��߳��Թ���������");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<�������:��߳��Թ�>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n������߳��Թ�!\r\n#b#L0#���������߳��Թ�#l\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "�ر�" : "����") + "����״̬\r\n#L2#ʲô����߳��Թ���");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("���ź�������һ��ȥ�Թ�̽��.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("�������ľ���Ҫ���������⣬������鳤֪ͨ�ң�");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("#r��������#k�ѽ����Ƶ�����볢�Ը�������Ƶ������ȴ���ǰ���뷽��ɡ�");
                                                }
                                        }
                                        else {
                                                cm.sendOk("Ϊ�˽��������⣬������������Ҫ��3����Ա���.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("�����������״̬Ϊ: #b" + (״̬? "����" : "�ر�") + "#k. �뻻������ʱ�����˵.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<Party Quest: Ludibrium Maze>#k#n\r\n���Թ�������3�˻�3�����ϵ���ӣ���Ա������51~70��֮��. �㽫��15���ӵ�ʱ�������Թ�.  �ڷ�������ģ�������һ�������ţ��������͵���һ������.  ��Щ��ڻ�����͵��������䣬��������ᣨϣ�����ҵ�����.  �����򵼻��ڳ��ڵ��㣬������ֻҪ����̸̸�����ͻ�����ȥ.  ���Ʒ��������е����ӣ�������Ĺ�����һ���Ż�ȯ�������Թ������������ռ������Ż�ȯ��þ���ֵ�����⣬����峤������30���Ż�ȯ����ô�����������һ���ر������.  ����㲻���ڹ涨��15�����������Թ��������Թ��е�ʱ�佫���0����ֵ.  �����������Թ����˳���ӣ��㽫���Զ��߳��Թ�.  ��ʹ��Ա����������;�뿪��ʣ�µĶ�Ա��Ҳ�ܼ������񣬳����������Թ�������������޶ȵĶ�Ա.  ��������Σ�����޷�׷�����������Աܿ������������Լ�,��Ķ�־���ǻ۽��ܵ�����!ף�����!");
                                cm.dispose();
                        }
                }
        }
}