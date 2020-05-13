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
 * @npc: Romeo
 * @map: Magatia - Zenumist - Hidden Room (261000011)
 * @func: Magatia PQ (Zenumist)
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
                    
                if(cm.getMapId() != 261000011) {
                        if(status == 0) {
                                cm.sendYesNo("我们必须继续战斗来拯救朱丽叶，请保持你的步伐。如果你不想继续下去，你的同伴和我会理解。。。所以，你要撤退吗?");
                        } else if(status == 1) {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_Z");
                                if(em == null) {
                                        cm.sendOk("发生了未知的错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务: 罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我亲爱的朱丽叶被绑架了！但我不能袖手旁观，就因为这场愚蠢的冲突而看着她受苦。我需要你和你的同事帮忙救她！求你了，帮帮我们！！请你的队长跟我谈谈.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想查看" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启动") + "状态.\r\n#L2#我想了解更详细的信息.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有在队伍中你才能参加组队任务.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("只有你的队长来跟我对话才能开始任务.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("另一方已进入此频道的“组队任务”。请尝试其他频道，或等待当前参与方完成.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("您还无法参加这次任务，因为您的群不在范围大小内，您的群成员中的某些人没有资格尝试，或者他们不在此地图中。如果你找不到队员，试试重新找.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("您的队伍状态为: #b" + (psState ? "启动" : "禁用") + "#k. 想回来的时候跟我说.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务: 罗密欧与朱丽叶>#k#n\r\n不久前，一位名叫尤利特的科学家因为研究阿尔卡多和泽努米斯特的结合炼金术而被逐出了这个小镇，由于这种结合所产生的巨大力量，法律禁止对两者进行研究。然而，他忽视了这一规律，在两项研究中都获得了成功。结果，他被流放了。\r\n他现在正在报复，已经带走了我心爱的一个，他的下一个目标是我，因为我们是两个社会的继承人马加蒂的大照片。但我不害怕。我们必须不惜一切代价找到她!\r\n");
                                        cm.dispose();
                                }
                        }
                }
        }
}