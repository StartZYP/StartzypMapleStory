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
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("你好！欢迎来到我们玩具城护肤中心。您想试试黑黑的皮肤吗？或者白皙的皮肤怎么样啊？只要有了#b#t5153002##k，我们就会给您想要的皮肤。请相信我们，我们一定会让您满意的！ \r\n#L2##b使用#i5153002##t5153002##l#k");
                } else if (status == 1) {
			if (selection == 2) {
				cm.sendStyle("通过本店特殊开发的机器可以查看护肤后的样子，你想要哪种皮肤呢？请选择吧~", skin);
			}
		}
		else if (status == 2){
			cm.dispose();
			if (cm.haveItem(5153002) == true){
				cm.gainItem(5153002, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("享受你的新皮肤吧！");
			} else {
				cm.sendOk("嗯......你好像没有护肤券啊。对不起，没有护肤券的话，我就不能帮你护理皮肤。");
			}
		}
	}
}
