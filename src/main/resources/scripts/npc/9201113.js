/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*Jack
 *
 *@author Alan (SharpAceX)
 *@author Ronan
 */
importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
var cwkpq = MapleExpeditionType.CWKPQ;
var list = "������ʲô?#b\r\n\r\n#L1#�鿴��ǰԶ���ӳ�Ա#l\r\n#L2#��ʼս��!#l\r\n#L3#ֹͣð��.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(cwkpq);
    em = cm.getEventManager("CWKPQ");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < cwkpq.getMinLevel() || player.getLevel() > cwkpq.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("�㲻���ϲμ�糺�Ҫ���Ŷ������������");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<�������: 糺�Ҫ���Ŷ�����>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����齨һ��С�������� #r糺�Ҫ���Ŷ�������#k?\r\n#b#L1#�����ǿ�ʼ��!#l\r\n\#L2#���������һ��һ���#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("���ǵ�Զ���Ѿ��ڽ������ˣ�Ϊ����Щ����ս�������ǣ�������Ϊ��Щ�¸ҵ�������ɡ�");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("���Ѿ��Ǽǲμ�ð�ն���. ��ȴ�#r" + expedition.getLeader().getName() + "#k ��ʼ�ɡ� ");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    em.getInstance("CWKPQ" + player.getClient().getChannel()).registerPlayer(player);
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("��һ֧ð�ն����������糺�Ҫ���Ŷ�����������Ϊ��Щ�¸ҵ��������");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(cwkpq);
                if(expedition != null) {
                    cm.sendOk("�����Ѿ�������Ϊð�նӵ���ӡ����ż������ǣ�");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(cwkpq);
                if (res == 0) {
                    cm.sendOk("#r糺�Ҫ���Ŷ�#k�Ѿ�����.\r\n\r\n�ٺ���̸̸���������ڵĶ��飬���߿�ʼս����");
                } else if (res > 0) {
                    cm.sendOk("�Բ������Ѿ��ﵽ��ν���������������ԡ�����");
                } else {
                    cm.sendOk("��ʼð��ʱ��������������Ժ����ԡ�");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("��Ȼ������ÿ���˶��볢�Զ�糺�Ҫ���Ŷӵ�׷��");
                cm.dispose();
                return;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("ð�ն��޷�װ�ء�");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("����ð�նӵ�Ψһ��Ա��");
                    cm.dispose();
                    return;
                }
                var text = "���³�Ա������ð�նӣ����ɾ�����ǣ�:\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = cwkpq.getMinSize();
                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("��������Ҫ " + min + " �����ð�ն�ע��Ķ�Ա.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("ð�ռ�����ʼ�������ڽ������͵�#bCWKPQ��̳�����#k��");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " has ended the expedition."));
                cm.endExpedition(expedition);
                cm.sendOk("ð�ն������Ѿ������ˡ���ʱ����õĲ��������ܡ�");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("�޷���ʼ���¼�������ϵð�յ�����Ա��");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("��һ֧ð�ն����������糺�Ҫ���Ŷ�����������Ϊ��Щ�¸ҵ��������");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("���Ѿ���ֹ�� " + banned.getValue() + " ��ð�նӡ�");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}