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
 * @npc: Wonky
 * @map: 200080101 - Orbis - The Unknown Tower
 * @func: Orbis PQ
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

                if(cm.getMapId() == 200080101) {
                        if (status == 0) {
                                em = cm.getEventManager("OrbisPQ");
                                if(em == null) {
                                        cm.sendOk("发生了错误");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务: 女神塔>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想进入#b女神塔#k吗?请让队长与我对话。#b\r\n#L0#我想开始任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想听听更多的细节。\r\n#L3#我想获得物品.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("请确认你是否在组队中.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("请你的队长来跟我进行对话.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("已经有人在此频道进行任务#rParty Quest#k.请尝试更换其他频道，或等待他们完成任务.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("无法开始组队任务，请确认你的队伍中有人是否未完成前置任务.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的组队状态是#b"+(psState ? "开启":"关闭")+"#k.想换回来的时候跟我说.");
                                        cm.dispose();
                                } else if (selection == 2) {
                                        cm.sendOk("#e#b<组队任务: 女神塔>#k#n\r\n我们的女神很久以前就失踪了，传闻说她上一次出现在女神塔里面。此外，我们的避难所被强大的精灵力量占领了,那些最近在奥比斯郊区游荡的生物. 他们的首领爸爸精灵，目前掌握着王位，可能知道她的下落，所以我们敦促寻找一个勇敢的英雄组成，冲进并收回我们的避难所并营救她。如果你的团队能够成为每个职位的组合（战士，魔术师，弓箭手，盗贼和海盗），你们将得到我的祝福，帮助你们在战斗中。你能帮助我们吗？\r\n");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendSimple("你想获得奖励吗?\r\n\r\n#b#L0#女神的手镯\r\n");
                                }
                        } else if (status == 2) {
                                if (selection == 0) {
                                        if (!cm.haveItem(1082232) && cm.haveItem(4001158, 10)) {
                                                cm.gainItem(1082232, 1);
                                                cm.gainItem(4001158, -10);
                                                cm.dispose();
                                        } else {
                                                cm.sendOk("你已经拥有#b女神的手镯#k,或者你没有10个#b#t4001158##k。");
                                                cm.dispose();
                                        }
                                }
                        }
                } else {
                        if(status == 0) {
                                cm.sendYesNo("你要退出这次营救任务吗?");
                        } else if(status == 1) {
                                cm.warp(920011200);
                                cm.dispose();
                        }
                }
        }
}
