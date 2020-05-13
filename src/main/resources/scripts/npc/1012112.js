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
/**
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
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

        if (cm.getMapId() == 100000200) {
            if (status == 0) {
                em = cm.getEventManager("HenesysPQ");
                if (em == null) {
                    cm.sendOk("�������һ������");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<�������: ӭ�»�ɽ��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n���Ǵ������������һ��������Сɽ��ӭ�»�������ʢ����ɽ��ס��һֻ�ϻ��������������ƺ����Ҷ����ԡ���Ը��ȥӭ�»�ɽ�����Ķ�����һ������������?#b\r\n#L0#����μ��������\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "�������.\r\n#L2#����֪�������ϸ�ڡ�\r\n#L3#����һ�ͷ����⡣");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("�٣���ã����Ǵ����������ط����������ص����¹⻷��û���˿���һ���˽��롣");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("���öӳ����ҽ�̸��");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("�����Ѿ��ڿ�ʼ��ս��,��ȴ�������ɡ�");
                            }
                        }
                        else {
                            cm.sendOk("�㻹���ܿ�ʼ������������ΪҪô��Ķ��鲻�ڷ�Χ�ڣ�Ҫô��Ķ����Աû���ʸ�Ҫô���ǲ��ڵ�ͼ�ϡ��������Ѱ�Ҷ���ʱ�������ѣ������������ѡ�");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("��Ķ�������״̬������: #b" + (psState ? "����" : "����") + "#k. ��ʲôʱ���뻻��ʲôʱ�����˵��");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<�������: ӭ�»�ɽ��>#k#n\r\n�ӵ�ͼ�ײ��Ļ����ռ�ӣ�ݻ������ӣ������Ƿ�����̨�Ϸ���ƽ̨�ϡ����������ӵ���ɫ���������ӵ�������ƥ�䣬���Բ���ֱ�����ҵ���ȷ����ϡ������е����Ӷ��ֺú�Ҳ����˵����ʼ�ڶ��׶ε����񣬵�������Ϊ������ũ��׼���׸�ʱ���������һ����³�������ˣ�������������ˡ�");
                    cm.dispose();
                } else {
                    cm.sendYesNo("����Ҫ��20��#b��������#v4001101##k��#bͷ�����#v1002798##k��?");
                }
            } else {
                if (cm.hasItem(4001101, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001101, -20);
                        cm.gainItem(1002798, 1);
                        cm.sendNext("                       #b�һ��ɹ�#k!");
                    }
                } else {
                    cm.sendNext("#b��������#v4001101##k����,�޷��һ�!");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("лл����ι����ë����İ�������ʵ�ϣ������Ŷ��Ѿ���Ϊ������ôԶ���õ��˻ر�������������ڽ���ˣ�������һ���������ڷ�������������ڲ���飬��#b�����#k��������Ϣ����ô��������ֱ�ӻس�ȥ��ͼ����?");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("�����Ʒ���ϲ���,�޷����жһ�������");
                }
                cm.dispose();
            }
        } else if (cm.getMapId() == 910010400) {
            if (status == 0) {
                cm.sendYesNo("��ô��������Ҫ��ȥ��?");
            } else if (status == 1) {
                if (cm.getEventInstance() == null) {
                    cm.warp(100000200);
                } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("�ƺ�������Ŀ��֮һ�Ŀռ��ȱ�����ȼ��һ���Ի���ʵ��Ľ�����");
                }
                cm.dispose();
            }
        }
    }
}