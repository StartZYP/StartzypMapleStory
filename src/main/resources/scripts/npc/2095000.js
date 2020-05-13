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
/* Delli
	Looking for Delli 3 (925010200)
	Hypnotize skill quest NPC.
 */

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {
                        if (cm.getMapId() != 925010400) {
                                em = cm.getEventManager("DelliBattle");
                                if(em == null) {
                                        cm.sendOk("德尔利战役遇到了一个错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务: 拯救德丽>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n啊 #r#p1095000##k 派你来的嘛,她担心我吗? ... 听到这个消息我很难过，但我现在还不能回去，一些怪物受到了黑魔法师的影响,我要解放他们!...看来你也不会接受吧?你愿意和队员合作帮助我吗?如果是的话,请让您的#b队长#k跟我谈一谈.#b\r\n#L0#我想参加这次任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "参与的队伍.\r\n#L2#我想听听更多的细节.");
                        } else {
                                cm.sendYesNo("任务成功了，谢谢你护送我！我可以带你去#b#m120000104##k,你准备好了嘛?");
                        }
                } else if (status == 1) {
                        if (cm.getMapId() != 925010400) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有在队伍中你才能参加组队任务.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你的队长一定要跟我谈谈才能开始这个组队任务.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("另一方已进入此频道的“组队任务”。请尝试其他频道，或等待当前参与方完成.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("您还无法开启这个任务，因为您的队伍等级不在进入范围，您的群成员中的某些人没有资格尝试，或者他们不在此地图中。如果你找不到队员，请重新组队.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("您的组队状态为: #b" + (psState ? "启用" : "禁用") + "#k. 想回来的时候跟我说.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务: 拯救德丽>#k#n\r\n 任务正在进行！我必须在战场上坚持6分钟左右才能完成解放，请在此期间保护我，使我的任务完成.");
                                        cm.dispose();
                                }
                        } else {
                                cm.warp(120000104);
                                cm.dispose();
                        }
                }
        }
}