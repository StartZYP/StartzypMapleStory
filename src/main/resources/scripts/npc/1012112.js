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
/**
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
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

        if (cm.getMapId() == 100000200) {
            if (status == 0) {
                em = cm.getEventManager("HenesysPQ");
                if (em == null) {
                    cm.sendOk("活动遇到了一个错误。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队任务: 迎月花山丘>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我是达尔利。这里有一座美丽的小山，迎月花在那里盛开。山上住着一只老虎，格罗利，它似乎在找东西吃。你愿意去迎月花山丘和你的队友们一起帮助达尔利吗?#b\r\n#L0#我想参加组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索.\r\n#L2#我想知道更多的细节。\r\n#L3#我想兑换头顶年糕。");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("嘿，你好！我是达尔利。这个地方笼罩着神秘的满月光环，没有人可以一个人进入。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("请让队长与我交谈。");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("有人已经在开始挑战了,请等待他们完成。");
                            }
                        }
                        else {
                            cm.sendOk("你还不能开始这个组队任务，因为要么你的队伍不在范围内，要么你的队伍成员没有资格，要么他们不在地图上。如果你在寻找队友时遇到困难，试试搜索队友。");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的队伍搜索状态是现在: #b" + (psState ? "启用" : "禁用") + "#k. 你什么时候想换就什么时候跟我说。");
                    cm.dispose();
                } else if (selection == 2) {
                    cm.sendOk("#e#b<组队任务: 迎月花山丘>#k#n\r\n从地图底部的花中收集樱草花的种子，把它们放在舞台上方的平台上。报春花种子的颜色必须与种子的生长相匹配，所以测试直到你找到正确的组合。当所有的种子都种好后，也就是说，开始第二阶段的任务，当月亮兔为饥饿的农民准备米糕时，侦察它。一旦格鲁里满意了，你的任务就完成了。");
                    cm.dispose();
                } else {
                    cm.sendYesNo("你想要用20个#b月妙的年糕#v4001101##k换#b头顶年糕#v1002798##k吗?");
                }
            } else {
                if (cm.hasItem(4001101, 20)) {
                    if (cm.canHold(1002798)) {
                        cm.gainItem(4001101, -20);
                        cm.gainItem(1002798, 1);
                        cm.sendNext("                       #b兑换成功#k!");
                    }
                } else {
                    cm.sendNext("#b月妙的年糕#v4001101##k不够,无法兑换!");
                }

                cm.dispose();
            }
        } else if (cm.getMapId() == 910010100) {
            if (status == 0) {
                cm.sendYesNo("谢谢你在喂养长毛象方面的帮助。事实上，您的团队已经因为走了这么远而得到了回报。这个问题现在解决了，还有另一个问题正在发生，如果你是内部检查，在#b达尔米#k那里有信息。那么，你现在直接回出去地图了吗?");
            } else if (status == 1) {
                if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                }
                else {
                    cm.sendOk("你的物品材料不够,无法进行兑换奖励。");
                }
                cm.dispose();
            }
        } else if (cm.getMapId() == 910010400) {
            if (status == 0) {
                cm.sendYesNo("那么，你现在要回去吗?");
            } else if (status == 1) {
                if (cm.getEventInstance() == null) {
                    cm.warp(100000200);
                } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                    cm.warp(100000200);
                } else {
                    cm.sendOk("似乎你在你的库存之一的空间短缺。请先检查一下以获得适当的奖励。");
                }
                cm.dispose();
            }
        }
    }
}