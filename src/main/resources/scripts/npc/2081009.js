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
//Moose, Warps to exit

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
	cm.dispose();
        return;
    }
    
    status++;
    if(status == 0) {
        if(cm.isQuestStarted(6180) && cm.getQuestProgressInt(6180, 9300096) < 200) {
            cm.sendYesNo("注意: 在你呆在训练场的时候，确保你已经#b 装备了 #t1092041##k, 这十分重要. 你准备好出发到训练场了吗?");
        }
        
        else {
            cm.sendOk("只有指定人员才能进入训练场.");
            cm.dispose();
        }
    }
    
    else if(status == 1) {
        if (cm.getPlayer().haveItemEquipped(1092041)) {
            cm.sendNext("在任务结束前装备好你的盾牌，否则你需要重新开始!");
        } else {
            cm.sendOk("进入训练场前请装备#r#t1092041#k.");
            cm.dispose();
        }
    }
    else {
        cm.warp(924000001, 0);
        cm.dispose();
    }
}
