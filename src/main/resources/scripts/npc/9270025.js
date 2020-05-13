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
/* 	Xan
	Lian Hua Hua Skin Care
        @author Moogra
*/
var skin = Array(0, 1, 2, 3, 4);
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
                status++;
        else
                status--;
        
        if (status == 0) {
            cm.sendSimple("好吧，你好！欢迎来到中心商业区护肤品！你想拥有像我一样结实、紧致、健康的皮肤吗？你可以让我们照顾好其他人,拥有你一直想要的那种皮肤！\r\n\#L1#使用：#i5153010# #t5153010#");
        }
        else if (status == 1) {
            if (!cm.haveItem(5153010)) {
                cm.sendOk("看起来你没有接受治疗所需的优惠券。我很抱歉，但看来我们不能帮你。");
                cm.dispose();
                return;
            }
            cm.sendStyle("通过我们的专业服务，您可以提前看到您对治疗的照顾方式。你想做什么样的皮肤护理？去选择你喜欢的风格吧。。。", skin);
        }
        else {
            cm.gainItem(5153010, -1);
            cm.setSkin(selection);
            cm.sendOk("享受你新的和改善的皮肤！");
            
            cm.dispose();
        }
    }
}
