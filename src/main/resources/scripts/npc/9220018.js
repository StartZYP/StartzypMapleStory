/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @npc: Charles
 * @func: Treasure PQ
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
                        em = cm.getEventManager("TreasurePQ");
                        if(em == null) {
                                cm.sendOk("The Treasure PQ has encountered an error.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                        
                        cm.sendSimple("#e#b<组队任务: MV's Lair>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你不能再往前走了，因为前面有非常危险的生物。 你想和组员合作完成任务吗？如果你想尝试一下，请让#b组队队长#k 和我说话.#b\r\n#L0#我想参加组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "搜索状态.\r\n#L2#我想知道更多的细节。");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在组队中，你才能参与组队任务。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你的组长必须和我谈谈，才能开始这个组队任务。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("另一方已进入此频道的 #r组队探索#k在这个频道。请尝试其他频道，或等待当前参与方完成。");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("您还无法启动此群任务，因为您的群不在范围大小内，您的群成员中的某些人没有资格尝试，或者他们不在此地图中。如果你找不到党员，试试找。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你的搜索状态为 : #b" + (psState ? "启用" : "禁用") + "#k. 想换回来的时候跟我说。");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务: MV's Lair>#k#n\r\n再次出现，扰乱了新叶市人民的福祉。与其他枫叶人联手抵御这次突然袭击。击败MV和他的手下后，在MV的宝藏室领取奖品。");
                                cm.dispose();
                        }
                }
        }
}