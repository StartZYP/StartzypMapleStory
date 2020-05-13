/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
                        var mapid = cm.getMapId();
                        if(mapid == 674030100) {
                                cm.sendNext("嗨，我是 #p9220019#.");
                                cm.dispose();
                                return;
                        } else if(mapid == 674030300) {
                                cm.sendNext("嗨，那里, #h0#. 这是MV的宝库。利用你在这里的时间做你想做的任何事，这里有很多事情要揭露，实际上. 你可以从这里#r返回k#k。");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendYesNo("你确定要回来吗？现在回来，你就要丢下你的搭档，你真的想这么做吗？");
                } else if(status == 1) {
                        cm.warp(674030100);
                        cm.dispose();
                }
        }
}