/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Konpei - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Fixed by Moogra
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
function start() {
    cm.sendSimple ("What do you want from me?\r #L0##b收集一些关于藏身处的信息.#l\r\n#L1#带我去的藏身之处。#l\r\n#L2#没有。#l#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendNext("我可以带你去藏身处，但那里到处都是找麻烦的暴徒。你需要非常强大和勇敢才能进入. 在隐蔽处，你会找到控制这个区域所有其他老板的老板.到藏身处很容易，但这个地方顶层的房间每天只能进入一次。老板的房间不是乱七八糟的地方。我建议你不要在那儿呆太久，你一进去就得迅速处理这件事。老板本身是个很难对付的敌人，但在去见老板的路上你会遇到一些强大无比的敌人！这不容易。");
                cm.dispose();
            } else if (selection == 1)
                cm.sendNext("哦，勇敢的那个。我一直在等你的到来. 如果让这些暴徒逍遥法外，就不知道这附近会发生什么. 在那之前,我希望你能照顾好他们。你需要时刻保持警惕，因为老板太强硬了，连智者都无法应付。但是，看着你的眼睛，我可以看到老板的眼睛，告诉我你可以做到的事情。走吧！");
            else {
                cm.sendOk("我是一个忙碌的人！离我远一点！");
                cm.dispose();
            }
        } else {
            cm.warp(801040000, "in00");
            cm.dispose();
        }
    }
}