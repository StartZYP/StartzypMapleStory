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
/* The Glimmer Man
	Amoria PQ Stg1/exit
 */

var status;
var curMap, stage;
 
function start() {
        curMap = cm.getMapId();
        stage = Math.floor((curMap - 670010200) / 100) + 1; 
    
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
                        if(cm.getMapId() != 670010200) {
                            cm.sendYesNo("那么，你要离开这个地方吗？");
                        } else {
                            if(cm.isEventLeader()) {
                                var eim = cm.getEventInstance();
                                var st = eim.getIntProperty("statusStg" + stage);
                                
                                if(cm.haveItem(4031595, 1)) {
                                    cm.gainItem(4031595, -1);
                                    eim.setIntProperty("statusStg" + stage, 1);

                                    cm.sendOk("你找回了#t4031595#, 壮观的！你可以向阿莫斯汇报你在这项任务上的成功.");
                                } else if(st < 1 && cm.getMap().countMonsters() == 0) {
                                    eim.setIntProperty("statusStg" + stage, 1);
                                    
                                    var mapObj = cm.getMap();
                                    mapObj.toggleDrops();
                                    
                                    var mobObj = Packages.server.life.MapleLifeFactory.getMonster(9400518);
                                    mapObj.spawnMonsterOnGroundBelow(mobObj, new Packages.java.awt.Point(-245, 810));
                                    
                                    cm.sendOk("火焰出现了！打败它，得到 #b#t4031596##k!");
                                } else {
                                    if(st < 1) cm.sendOk("你的任务是找回魔法师镜子的碎片。为此，你需要一个#b#t4031596##k, 当所有其他暴徒被杀死时，火焰就会下降。要访问黑帮所在的房间，请选择与您的性别对应的入口并在那里杀死所有黑帮。女士们从左边走，先生们从右边走。");
                                    else cm.sendOk("你的任务是找回魔法师镜子的碎片。击败火箭筒#b#t4031596##k.");
                                }
                            } else {
                                cm.sendOk("你的任务是找回魔法师镜子的碎片。为此，你需要#b#t4031596##k, 当所有其他暴徒被杀死时，帽子会落在一个火焰上。要访问黑帮所在的房间，请选择与您的性别对应的入口并在那里杀死所有黑帮。女士们从左边走，先生们从右边走。#b你的族长#k必须带着#b#t4031595##k通行证.");
                            }
                            
                            cm.dispose();
                        }
                } else if(status == 1) {
                    cm.warp(670010000, "st00");
                    cm.dispose();
                }
        }
}