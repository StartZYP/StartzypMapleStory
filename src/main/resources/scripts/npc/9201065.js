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
/* Miranda
        NLC Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    cm.sendSimple("好吧，你好！欢迎来到护肤中心！你想要像我这样精致、健康的皮肤吗？ 使用 #b#t5153009##k, 你可以让我们照顾好其他人，拥有你一直想要的那种皮肤~！\r\n#L2#护肤用品: #i5153009##t5153009##l");
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 2) 
                cm.sendStyle("使用我们的专用机器，您可以在手术前看到处理的方法。你在找什么样的造型？去选择你喜欢的风格吧~！", skin);
        }
        else if (status == 2){
            if (cm.haveItem(5153009)){
                cm.gainItem(5153009, -1);
                cm.setSkin(skin[selection]);
                cm.sendOk("享受你新的和改善的皮肤！");
            } else {
                cm.sendOk("嗯…你没有接受治疗所需的护肤券。对不起，恐怕我们帮不了你。。。");
            }
            
            cm.dispose();
        }
    }
}