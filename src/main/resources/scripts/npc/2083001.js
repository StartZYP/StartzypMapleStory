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
 * @npc: Mark of the Squad
 * @map: Cave of Life - Cave Entrance (240050000)
 * @func: Horntail PQ
*/

var status = 0;
var price = 100000;
var em = null;
var hasPass;

function isRecruitingMap(mapid) {
        return mapid == 240050000;
}

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
                
                if(isRecruitingMap(cm.getMapId())) {
                        if (status == 0) {
                                em = cm.getEventManager("HorntailPQ");
                                if(em == null) {
                                        cm.sendOk("脚本遇到未知的错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务：生命之穴>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这就是通往暗黑龙王巢穴的道路.如果你想面对他,则你和你的队伍将应在未来的审判中接受测试.#b\r\n#L0#让我们开始接受测试.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "参加方式.\r\n#L2#我想了解更详细的信息.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有加入远征队你才能参加这个任务.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你的队伍想要开始这个派对任务需要找我.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("已经有队伍进入了这个频道的 #挑战#k 中. 请尝试其他频道，或等待当前参与方完成.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你的队伍中的队员条件不足，要么你们缺少足够的人员。解决这个问题然后和我谈谈!");
                                                }

                                                cm.dispose();
                                        }
                                } else if(selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的队伍状态为: #b" + (psState ? "启动" : "禁用") + "#k. 想换回来的时候跟我说.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：生命之穴>#k#n\r\n作为生命之穴的守门人，我将准许那些值得他光临的人进入。即使对那些人来说，里面的道路充满了机遇和考验。然而，那些勇敢的冒险家门有更好的机会站在我们的前面带领我们.");
                                        cm.dispose();
                                }
                        }
                } else {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("只有你的准备齐全才能进行任务互动.");
                        } else if(cm.getMapId() == 240050100) {
                                if(cm.haveItem(4001087) && cm.haveItem(4001088) && cm.haveItem(4001089) && cm.haveItem(4001090) && cm.haveItem(4001091)) {
                                        cm.gainItem(4001087, -1);
                                        cm.gainItem(4001088, -1);
                                        cm.gainItem(4001089, -1);
                                        cm.gainItem(4001090, -1);
                                        cm.gainItem(4001091, -1);
                                        
                                        cm.getEventInstance().warpEventTeam(240050200);
                                } else {
                                        cm.sendOk("你没有继续任务所需的所有钥匙。.");
                                }
                        } else if(cm.getMapId() == 240050300) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("检查你是否有6把红色钥匙和1把蓝色钥匙.");
                                }
                        } else if(cm.getMapId() == 240050310) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("检查你是否有6把红色钥匙和1把蓝色钥匙.");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}