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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
*/

var status = 0;
var state;
var em = null;

function start() {
	status = -1;
        state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
                        if(state == 1) {
                                cm.sendYesNo("你想放弃这个地区吗?");
                        }
                        else {
                                em = cm.getEventManager("KerningPQ");
                                if(em == null) {
                                        cm.sendOk("副本遇到了一个错误。");
                                        cm.dispose();
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                            
                                cm.sendSimple("#e#b<组队任务: 废弃都市>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你和你的队友一起完成一个任务怎么样?在这里，你会遇到一些障碍和问题，如果没有良好的团队合作，你是无法战胜它的。如果你想尝试一下，请让 #b组队队长#k 和我说话.#b\r\n#L0#我想参加组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "搜索状态.\r\n#L2#我想知道更多的细节。");
                        }
                } else if (status == 1) {
                        if(state == 1) {
                                cm.warp(103000000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有当你在一个队伍中，你才能参与组队任务。");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你们的队长必须和我谈谈才能开始这个任务。");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("另一方已经进入了 #r组队任务#k 在这个频道。请尝试另一个频道，或等待当前的节目结束。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你还不能开始这个组队任务，因为要么你的队伍不在范围内，要么你的队伍成员没有资格尝试，要么他们不在地图上。如果你在寻找队友时遇到困难，试试搜索队友。");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的队伍搜索状态是现在: #b" + (psState ? "启用" : "禁用") + "#k. 你什么时候想换就什么时候跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务: 废弃都市>#k#n\r\n你的队伍必须通过许多关卡和谜题，同时通过所有任务的子目标。与你的团队协调，以进一步推进和击败最终的BOSS和收集掉落的项目，以便进入奖励阶段。");
                                        cm.dispose();
                                }
                        }
                }
        }
}