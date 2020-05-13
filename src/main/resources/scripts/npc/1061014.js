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
/*
 *
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
var exped = MapleExpeditionType.BALROG_NORMAL;
var expedName = "Balrog";
var expedBoss = "Balrog";
var expedMap = "Balrog's Tomb";

var list = "������ʲô��#b\r\n\r\n#L1#�鿴��ǰԶ���ӳ�Ա#l\r\n#L2#��ʼս����#l\r\n#L3#ֹͣԶ��#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("BalrogBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("�㲻����ս���ı�׼" + expedBoss + "!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<Զ����:" + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����齨һ֧�������#r" + expedBoss + "#k��?\r\n#b#L1#�����ǿ�ʼ�ɣ�#l\r\n\#L2#���������һ��һ�����#l\r\n\#L3#���뿴���������Զ���ӵ���Ϣ��#l");
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
                    cm.sendOk("���Ѿ��Ǽǲμ�Զ�����ˡ���ȴ�#r" + expedition.getLeader().getName() + "#k����.");
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
                        cm.sendOk("���Զ�����Ѿ���ʼ��" + expedBoss + ".������Ϊ��Щ�¸ҵ������.");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("��һ֧Զ����������ս" + expedBoss + ",������Ϊ��Щ�¸ҵ������.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("�Ѿ�����������Զ���ӵĶӳ������ż������ǣ�");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + "Զ����#k����ɹ���\r\n\r\n���ҽ�̸����ʼս���ɣ�");
                } else if (res > 0) {
                    cm.sendOk("�Բ������Ѿ��ﵽԶ�������ޣ��������ԡ�����");
                } else {
                    cm.sendOk("��ʼԶ��ʱ��������������Ժ����ԡ�");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("��Ȼ������ÿ���˶�����ս" + expedBoss + ".");
                cm.dispose();
                return;
            } else {
                cm.sendSimple("��á�����#b#n��Ӱ#n#k������Ŀ����ˡ���������Ŀǰ��������ְ�Χ������Ŀǰ��֪����˭�µ����" +
                            "������������#e#b����˹̹#n#kһֱ��ǲ��Ӷ����ֹ����ָ����ÿ�ζ�������������ˡ�" +
                            "���ԣ�ð���ߣ������������������սʤ���޷����ݵĿֲ���\r\n  #L1#ʲô��#e����˹̹?");
                    
                status = 10;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("Զ�����޷����ء�");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("����Զ���ӵ�Ψһ��Ա��");
                    cm.dispose();
                    return;
                }
                var text = "���Զ������������Щ��Ա(������Ƴ���Ա):\r\n";
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
                    cm.sendOk("��������Ҫ" + min + "��Զ���ӳ�Ա");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("Զ���ӽ���ʼ���㽫�����͵�#b" + expedMap + "#k.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + "������Զ��"));
                cm.endExpedition(expedition);
                cm.sendOk("Զ���������Ѿ������ˡ�");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("�޷���ʼ���¼����뱨�����");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("�Ѿ���Զ��������ս" + expedBoss + ".");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("����Ҫ�Ƴ�" + banned.getValue() + "��");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        } else if (status == 10) {
            cm.sendOk("����˹̹����ල���羭�ú���ս�ж�����������40��ǰ�����ں�ħ��ʦ�����ܺ�");
            cm.dispose();
        }
    }
}
