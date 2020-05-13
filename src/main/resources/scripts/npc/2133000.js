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
 * @npc: Ellin
 * @map: 300030100 - Deep Fairy Forest
 * @func: Ellin PQ
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

                if (status == 0) {
                        em = cm.getEventManager("EllinPQ");
                        if(em == null) {
                                cm.sendOk("发现了未知的错误.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务: 毒雾森林>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想集合或加入一个团队来解决毒雾森林的难题吗#k? 拥有你的 #b队伍#k 跟我聊聊或者进入个队伍.#b\r\n#L0#我想参加组队.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "队伍状态.\r\n#L2#我想听听更多细节.\r\n#L3#我想领取奖品.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在队伍中，你才能参与组队任务");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你的队长必须和我谈谈，才能开始这个组队的任务");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("另一方已进入#r这个频道的派对任务。#k请尝试其他频道，或等待当前参与方完成.");
                                                }
                                        }
                                        else {
                                                cm.sendOk("您还无法启动此群任务，因为您的群不在范围大小内，您的群成员中的某些人没有资格尝试，或者他们不在此地图中。如果你找不到队伍，试试创建新的队伍.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的群搜索状态为: #b" + (psState ? "启动" : "禁用") + "#k. 想回来的时候跟我说.");
                                cm.dispose();
                        } else if (selection == 2) {
                                cm.sendOk("#e#b<组队任务:毒雾森林>#k#n\r\n在这个副本中，你的任务是逐步地穿过树林，迎战你道路上的所有坏蛋，解决你遇到的许多难题，并团结自己，采取最好的团队合作，克服时间限制和强大的生物。清理最后一个老板，你的团队有机会获得一个大理石，当它在出口地图的喷泉旁掉落时，将保证团队获得额外的奖品。祝你好运.");
                                cm.dispose();
                        }
                        else {
                                cm.sendSimple("那么，你想获得什么奖品呢?\r\n#b#L0#把阿尔泰耳环给我.\r\n#L1#给我闪亮的阿尔泰耳环.\r\n#L2#给我闪耀的阿尔泰耳环");
                        }
                } else if (status == 2) {
                        if (selection == 0) {
                                if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("要么已经有阿尔泰耳环，要么你没有10个阿尔泰碎片.");
                                        cm.dispose();
                                }
                        } else if (selection == 1){
                                if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060,-1);
                                        cm.gainItem(1032061, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                       cm.sendOk("你要么已经没有阿尔泰耳环，要么你没有10个阿尔泰碎片.");
                                       cm.dispose();
                                }
                        } else if (selection == 2){
                                if (cm.haveItem(1032061) && !cm.haveItem(1032072) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032061,-1);
                                        cm.gainItem(1032072, 1);    // thanks yuxaij for noticing unexpected itemid here
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你要么已经没有闪亮的阿尔泰耳环，要么你没有10个阿尔泰碎片.");
                                        cm.dispose();
                                }
                        }
                }
        }
}