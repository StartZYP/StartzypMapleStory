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
	Author: Traitor, XxOsirisxX, Moogra
*/

/**
 * Dojo Entrance NPC
 */
var status = -2;
var readNotice = 0;

function start() {
    cm.sendSimple("#e< 通知 >#n\r\n如果有谁有勇气挑战我，就来武陵道场吧！- 武公\r\n\r\n\r\n#b#L0#挑战武陵道场.#l\r\n#L1#更详细地阅读通知.#l");
}

function action(mode, type, selection) {
    status++;
    if(mode == 0 && type == 0)
        status -= 2;
	                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
    if (mode >= 0) {
        if (selection == 1 || readNotice == 1) {
            if (status == -1) {
                readNotice = 1;
                cm.sendNext("#b<公告: 发行挑战>#k#n\r\n我是武陵道场的主人名叫武公。很久以前我是在武陵山开始修练仙术，现在我的内功已达到快超越极限的阶段。以前武陵道场的主人懦弱到不像样的程度。所以今天开始以我接管武陵道场。只有强者可以拥有武陵道场的资格。想要得到武术指点的人尽管来挑战！或着想要挑战我的人也无妨。我会让你知道你的无知！");
            } else if (status == 0)
                cm.sendPrev("你可以自己挑战我。也可以组队与你的好友一起前往挑战。");
            else
                cm.dispose();
        } else {
            if (status == -1 && mode == 1) {
                cm.sendYesNo("(当我把手放在公告牌上时，一股神秘的能量开始笼罩着我。)\r\n\r\n你想去武陵道场吗？");
            } else if (status == 0) {
                if (mode == 0) {
                    cm.sendNext("#b(当我把手从公告牌上拿开时，覆盖着我的神秘能量也消失了.)");
                } else {
                    cm.getPlayer().saveLocation("MIRROR");
                    cm.warp(925020000, 4);
                }
                cm.dispose();
            }
        }
    } else
        cm.dispose();
}