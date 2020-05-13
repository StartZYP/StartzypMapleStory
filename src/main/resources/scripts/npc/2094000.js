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
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
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
                        em = cm.getEventManager("PiratePQ");
                        if(em == null) {
                                cm.sendOk("私有的PQ遇到错误.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务: 海盗船>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n请帮帮我！我孩子被绑架了，被可怕的#r老海盗#k抓走了.我需要你的帮助。请你创建或加入一个队伍来救他好吗? 请让#b队长#k与我交谈或者你自己创建一个队伍.#b\r\n#L0#我想参加组队。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "搜索组队.\r\n#L2#我想听听更多的细节.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在组队中你才能参加任务.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("请让你的队长来跟我谈话.");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("已经有队伍在进行了.请换一个频道,或者等待他们完成.");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("你还不能开始组队恩物，因为你的队员不在地图当中，或者他们没有资格参加.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你的组队搜索状态为：#b" + (psState ? "开启" : "关闭") + "#k. 想换回来的时候跟我说.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务: 海盗船>#k#n\r\n在副本中, 你的任务是逐步通过海盗船, 在前行的道路上对付所有的海盗和坏蛋。到达#r老海盗#k那里,取决于你进行了几个阶段打开了多少大箱子，随着阶段的变化老板会表现得更加强大，所以保持警惕。阶段越强，给你的队员很多额外的奖励，值得一试！祝你好运。");
                                cm.dispose();
                        }
                }
        }
}