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

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        cm.sendNext("#b#p1104002##k... 黑女巫。。。把我困在这里。。。现在没时间了，她已经在去的路上了#r埃雷奥诺尔#k!");
                } else if (status == 1) {
                        cm.sendYesNo("尊敬的骑士，你现在必须马上去#r圣地#k。 #r女皇有危险#k!! 即使在这种情况下，我仍然可以魔法扭曲你。当你准备好和我说话的时候。#b你准备好面对埃雷奥诺尔了吗?#k");
                } else if (status == 2) {
                        if(cm.getWarpMap(913030000).countPlayers() == 0) {
                                cm.warp(913030000, 0);
                        } else {
                                cm.sendOk("已经有人在挑战她了。请稍等。");
                        }
                        
                        cm.dispose();
                }
        }
}