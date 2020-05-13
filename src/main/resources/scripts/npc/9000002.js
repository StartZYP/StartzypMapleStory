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
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendNext("砰，砰，砰，砰!!你已经赢了这场比赛 \r\n#b活动#k. 祝贺你走到这一步!");
        } else if (status == 1) {
            cm.sendNext("你将获得 #b秘密卷轴#k 作为获奖的奖品.在卷轴上,有用古文字写的秘密信息.");
        } else if (status == 2) {
            cm.sendNext("这个秘密卷轴可以破译 #r千吉#k 和 #r基尼#k在玩具城.把它带来,一定会有好事发生.");
        } else if (status == 3) {
        if (cm.canHold(4031019)) {
            cm.gainItem(4031019);
            cm.warp(cm.getPlayer().getSavedLocation("EVENT"));
            cm.dispose();
        } else {
            cm.sendNext("我想你们的等等窗口已经满了。请让出地方，然后跟我说话。");
        }
        } else if (status == 4) {
            cm.dispose();
        }
    }
}  
