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
 * @npc: Amos
 * @map: Entrance of Amorian Challenge (670010100)
 * @func: Amoria PQ
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
                        em = cm.getEventManager("AmoriaPQ");
                        if(em == null) {
                                cm.sendOk("The Amoria PQ has encountered an error.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务: 阿莫西亚挑战赛>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n如果你有足够的勇气去尝试阿莫西亚人的挑战，和你这样的人一起，让你的 #b族长跟我说.如果一个满是已婚夫妇的派对报名参加挑战，会有更好的奖品等着你.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "搜索状态。\r\n#L2#我想听听更多的细节。");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("只有在派对中，你才能参与派对任务。");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你的族长必须和我谈谈，才能开始这个组队任务。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("另一方已进入此频道的组队任务。请尝试其他频道，或等待当前参与方完成。");
                                                }
                                        }
                                        else {
                                                cm.sendOk("您还无法启动此群任务，因为您的群不在范围大小内，您的群成员中的某些人没有资格尝试，或者他们不在此地图中。如果你找不到党员，试试找。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的群搜索状态为: #b" + (psState ? "enabled" : "disabled") + "#k. Talk to me whenever you want to change it back.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务: 阿莫西亚挑战赛>#k#n\r\n我是阿莫斯，著名的阿莫西亚挑战赛的主持人。这个例子包括许多团队难题，其中合作是进步的根本关键。与其他玩家合作，尝试进入奖励阶段，在该阶段结束时可以获得许多好处。如果一个全夫妻派对成立，他们可以在额外的奖金舞台上获得更好的奖品。");
                                cm.dispose();
                        }
                }
        }
}
