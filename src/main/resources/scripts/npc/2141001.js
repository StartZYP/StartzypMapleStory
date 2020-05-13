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
/* The Forgotten Temple Manager
 * 
 * Deep Place of Temple - Forgotten Twilight (270050000)
 * Vs Pink Bean Recruiter NPC
 * 
 * @author Ronan
 */
importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
var exped = MapleExpeditionType.PINKBEAN;
var expedName = "Twilight of the Gods";
var expedBoss = "Pink Bean";
var expedMap = "Twilight of Gods";

var list = "������ʲô��#b\r\n\r\n#L1#�鿴��ǰ̽�ն�Ա#l\r\n#L2#��ʼս��!#l\r\n#L3#ȡ��̽��״̬.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("PinkBeanBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("�㲻����ս���ı�׼ " + expedBoss + "!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<̽������: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����齨һ֧���� #r" + expedBoss + "#k̽�ն�?\r\n#b#L1#�����ǿ�ʼ��!#l\r\n\#L2#����������Ҫ��һ���...#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("���̽���Ѿ��ڽ������ˣ�Ϊ����Щ����ս�������ǣ�������Ϊ��Щ�¸ҵ��������.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("���Ѿ��Ǽǲμ�̽�ն��ˡ���ȴ� #r" + expedition.getLeader().getName() + "#k ��ʼ.");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if(eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("���̽�ն��Ѿ���ʼ��" + expedBoss + "ս����. ������Ϊ��Щ�¸ҵ������.");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("��һ֧̽�ն�������ս" + expedBoss + ", ������Ϊ��Щ�¸ҵ������.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("�����Ѿ�������Ϊ̽�նӵ���ӡ����ż�������!");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + " ̽�ն��Ѿ�����.\r\n\r\n�ٺ���̸̸���������ڵĶ��飬���߿�ʼս��!");
                } else if (res > 0) {
                    cm.sendOk("�Բ������Ѿ��ﵽ���̽�յ��޶��ˣ���������һ��...");
                } else {
                    cm.sendOk("��ʼ̽��ʱ��������������Ժ�����.");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("��Ȼ������ÿ���˶�����ս" + expedBoss + ".");
                cm.dispose();
                return;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("̽�ն��޷�����.");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("����̽�նӵ�Ψһ��Ա.");
                    cm.dispose();
                    return;
                }
                var text = "���³�Ա������̽�նӣ����������������):\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();
                
                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("��������Ҫ " + min + " p��������̽�նӶ����е����.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("̽�նӽ���ʼ�������ڽ������͵� #b" + expedMap + "#k.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " has ended the expedition."));
                cm.endExpedition(expedition);
                cm.sendOk("̽�ն������Ѿ������ˡ���ʱ����õĲ���������.");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("�¼��޷���ʼ����������ϵ����Ա.");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("��һ֧̽�ն�������ս" + expedBoss + ", ������Ϊ��Щ�¸ҵ������.");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("���Ѿ���" + banned.getValue() + " ��̽�ն�������.");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}