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
//First version thanks to Moogra

/**
 * @author: Ronan
 * @npc: Flo
 * @map: Ludibrium - Path of Time (220050300)
 * @func: Elemental Thanatos room
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
                        if(!(cm.isQuestCompleted(6316) && (cm.isQuestStarted(6225) || cm.isQuestStarted(6315)))) {
                                cm.sendOk("你似乎没有理由去见元素为基础的灭那托斯。");
                                cm.dispose();
                                return;
                        }
                    
                        em = cm.getEventManager("ElementalBattle");
                        if(em == null) {
                                cm.sendOk("元素之战遇到了一个错误。");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队 任务: 逆属性（雷、冰）>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你在找元素灭徒，对吧?如果你和另一个和你有相同元素亲和力的法师组队，你们将能够战胜他们。作为一个领导者，当你准备好要走的时候，请告诉我.#b\r\n#L0#我想参加组队任务。\r\n#L1#我想 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + " 组队搜索.\r\n#L2#我想知道更多的细节。");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有当你在一个团队中，你才能参与团队任务。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你们的队长必须和我谈谈才能开始这个任务。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("另一个队伍已经在这个通道中进入了#r组队任务#k。请尝试另一个频道，或等待当前的节目结束。");
                                                }
                                        }
                                        else {
                                                cm.sendOk("你还不能开始这个团队任务，因为要么你的团队不在范围内，要么你的团队成员没有资格尝试，要么他们不在地图上。如果你在寻找队友时遇到困难，试试搜索队友。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你的队伍搜索状态是现在: #b" + (psState ? "启用" : "禁用") + "#k. 你什么时候想换就什么时候跟我说。");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队 任务: 逆属性（雷、冰）>#k#n\r\n 与另一个拥有不同元素亲和力的法师组队#k 在进入舞台之前。团队方面对于克服内部元素是至关重要的。");
                                cm.dispose();
                        }
                }
        }
}
