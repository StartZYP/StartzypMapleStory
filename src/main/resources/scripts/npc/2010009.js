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
var status;
var choice;
var guildName;

var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("你好!我# 雷那丽 # k。只有公会会长可以尝试成立公会。");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("   我是雷娜里欧！ 很高兴为您服务～#k\r\n\r\n#b#L0#我想要知道公会联盟是什么#l\r\n#L1#我要怎么建立公会联盟呢#l\r\n#L2#我想要建立公会联盟#l\r\n#L3#我想要新增更多的公会到联盟#l\r\n#L4#我想要解散公会联盟#l");
    }
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("公会联盟就像它说的那样，由许多公会组成一个超级团体。我负责管理这些工会。");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("为了建立一个公会联盟，两个且仅有两个btwo的公会会长必须在同一个频道的同一个房间里。这个团队的领导人将被任命为工会会长。最初，只有两个公会可以组成新的工会，但随着时间的推移，你可以通过与我交谈来确定工会的能力，并投资一笔提成费。");
            cm.dispose();
        } else if(selection == 2) {
            if(!cm.isLeader()) {
                cm.sendNext("如果你想成立工会，请告诉你的政党领袖和我谈谈。他/她将被任命为工会的领导人。");
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("当你的公会已经在另一个公会注册时，你不能创建公会联盟。");
                cm.dispose();
                return;
            }
            
            cm.sendYesNo("哦，你有兴趣成立工会吗?这个操作的当前费用是#b" + allianceCost + " 金币#k.");
        } else if (selection == 3) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("如果你没有工会，你就不能扩展工会.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("你想通过#rone工会#k来增加你的联盟吗?这个程序的费用是 #b" + increaseCost + " 金币#k.");
            else {
                cm.sendNext("只有工会会长才能扩大工会的数量.");
                cm.dispose();
            }
        } else if(selection == 4) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("如果你没有工会，你就不能解散工会.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("你确定要解散工会吗?");
            else {
                cm.sendNext("只有公会会长可以解散公会。");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            if(cm.getMeso() < allianceCost) {
                cm.sendOk("你没有足够的金币来满足这个要求。");
                cm.dispose();
                return;
            }
            cm.sendGetText("现在请输入您的新工会的名称。(限制。12个字母)");
        } else if (choice == 3) {
            if(cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("你的联盟已经达到公会的最大容量。");
                cm.dispose();
                return;
            }
            if(cm.getMeso() < increaseCost) {
                cm.sendOk("你没有足够的金币来满足这个要求。");
                cm.dispose();
                return;
            }
            
            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("你的联盟现在可以多接纳一个工会。");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("你不能解散一个不存在的工会。");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("你的工会已经解散。");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("将 '"+ guildName + "'你的公会名称是什么?");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("此名称不可用，请选择其他名称."); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null)
                cm.sendOk("请检查你和你队伍里的另一个工会领袖现在是否都在这个房间里，并确保这两个工会目前都没有在工会注册。在这个过程中，其他的公会领袖不应该和你2在一起.");
            else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("你已经成功地建立了一个工会。");
            }
            cm.dispose();
        }
    }
}