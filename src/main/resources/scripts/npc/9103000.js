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
/*
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103000 - Pierre
*	Map =  Ludibrium - Ludibrium Maze 16
*	NPC MapId = 809050015
*	Function = Gives LMPQ EXP reward
*
*/

var status = 0;
var qty = 0;

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
                        if(cm.isEventLeader()) {
                                if(!cm.getEventInstance().isEventTeamTogether()) {
                                        cm.sendOk("一个或多个组队成员丢失，请等待他们首先到达此处。");
                                        cm.dispose();
                                }
                                else if(cm.hasItem(4001106, 30)) {
                                        qty = cm.getItemQuantity(4001106);
                                        cm.sendYesNo("您已经从这次运行中检索到“+qty+” #t4001106# ，现在您的团队将从该操作中获得相当数量的EXP。你准备好离开了吗？");
                                }
                                else {
                                        cm.sendOk("你们的队伍还不能完成这次资格预审, 因为您还没有达到手头至少 30 #t4001106#'的数量.");
                                        cm.dispose();
                                }
                        }
                        else {
                                cm.sendOk("让你的族长和我谈谈结束这项任务.");
                                cm.dispose();
                        }
                } else if(status == 1) {
                        cm.removeAll(4001106);
                        cm.getEventInstance().giveEventPlayersExp(50 * qty);
                        cm.getEventInstance().clearPQ();
                        cm.dispose();
                }
        }
}