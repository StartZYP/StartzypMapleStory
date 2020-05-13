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
/*Adobis
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
var exped = MapleExpeditionType.ZAKUM;
var expedName = "扎昆";
var expedBoss = "扎昆";
var expedMap = "扎昆的祭坛";
var expedItem = 4001017;

var list = "你想做什么？#b\r\n\r\n#L1#查看当前远征队成员#l\r\n#L2#开始战斗!#l\r\n#L3#停止远征#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("ZakumBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("你不符合挑战" + expedBoss + "的标准!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<远征队: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想创建队伍挑战#b" + expedBoss + "#k吗?\r\n#b#L1#申请远征队#l\r\n\#L2#我还有其他事情要做#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {    // thanks Conrad for noticing exped leaders being able to still manage in-progress expeds
                    cm.sendOk("你们的远征已经在准备中了，为了那些仍在战斗的人们，让我们为他们加油吧！");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经登记在远征了。请等待#r" + expedition.getLeader().getName() + "#k开始.");
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
                        cm.sendOk("你的远征队已经开始与" + expedBoss + "战斗了.");
                    }
                    
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("已经有远征队在挑战" + expedBoss + "了.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                if (!cm.haveItem(expedItem)) {
                    cm.sendOk("作为远征队的队长，请确认你的背包有#b#t" + expedItem + "!");
                    cm.dispose();
                    return;
                }
                
                expedition = cm.getExpedition(exped);
                if(expedition != null) {
                    cm.sendOk("已经有人申请了远征队队长，请尝试加入远征队!");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + "远征队#k已经创建成功。\r\n\r\n请与我交谈，确认目前的远征队成员!");
                } else if (res > 0) {
                    cm.sendOk("对不起，你今天的挑战已经达到上限了。");
                } else {
                    cm.sendOk("开始远征时发现意外，请稍后再试！");
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
                    cm.sendOk("远征队无法进入");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("目前为止，远征队只有你一个人.");
                    cm.dispose();
                    return;
                }
                var text = "你的远征队有以下成员(点击并移除):\r\n";
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
                    cm.sendOk("你至少需要" + min + "人才能进行远征.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("远征即将开始，你现在将被传送到#b" + expedMap + "#k.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + "结束了远征。"));
                cm.endExpedition(expedition);
                cm.sendOk("远征队已经解散");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("无法初始化事件");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("已经有远征队在挑战" + expedBoss + "了.");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你在远程名单上移除了" + banned.getValue() + "。");    // getValue, thanks MedicOP for finding this issue
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}
