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

var list = "你想做什么？#b\r\n\r\n#L1#查看当前探险队员#l\r\n#L2#开始战斗!#l\r\n#L3#取消探险状态.#l";

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
                cm.sendOk("你不符合战斗的标准 " + expedBoss + "!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<探险任务: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想组建一支队伍 #r" + expedBoss + "#k探险队?\r\n#b#L1#让我们开始吧!#l\r\n\#L2#不，我想我要等一会儿...#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("你的探险已经在进行中了，为了那些仍在战斗的人们，让我们为那些勇敢的灵魂祈祷吧.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经登记参加探险队了。请等待 #r" + expedition.getLeader().getName() + "#k 开始.");
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
                        cm.sendOk("你的探险队已经开始与" + expedBoss + "战斗了. 让我们为那些勇敢的灵魂祈祷.");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("另一支探险队主动挑战" + expedBoss + ", 让我们为那些勇敢的灵魂祈祷.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("有人已经主动成为探险队的领队。试着加入他们!");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + " 探险队已经成立.\r\n\r\n再和我谈谈，看看现在的队伍，或者开始战斗!");
                } else if (res > 0) {
                    cm.sendOk("对不起，你已经达到这次探险的限额了！改天再试一次...");
                } else {
                    cm.sendOk("开始探险时发生意外错误，请稍后再试.");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("当然，不是每个人都能挑战" + expedBoss + ".");
                cm.dispose();
                return;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("探险队无法加入.");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("你是探险队的唯一成员.");
                    cm.dispose();
                    return;
                }
                var text = "以下成员组成你的探险队（点击他们驱逐他们):\r\n";
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
                    cm.sendOk("你至少需要 " + min + " p名在您的探险队队伍中的玩家.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("探险队将开始，你现在将被护送到 #b" + expedMap + "#k.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " has ended the expedition."));
                cm.endExpedition(expedition);
                cm.sendOk("探险队现在已经结束了。有时候最好的策略是逃跑.");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("事件无法初始化，请在联系管理员.");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("另一支探险队主动挑战" + expedBoss + ", 让我们为那些勇敢的灵魂祈祷.");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你已经被" + banned.getValue() + " 从探险队请离了.");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}