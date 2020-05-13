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
@       Author : Ronan
@
@	NPC = Amos (PQ)
@	Map = AmoriaPQ maps
@	Function = AmoriaPQ Host
@
@	Description: Last stages of the Amorian Challenge
*/

var debug = false;
var status = 0;
var curMap, stage;

function isAllGatesOpen() {
    var map = cm.getPlayer().getMap();
    
    for(var i = 0; i < 7; i++) {
        var gate = map.getReactorByName("gate0" + i);
        if(gate.getState() != 4) {
            return false;
        }
    }
    
    return true;
}

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    
    eim.showClearEffect(true);
    eim.linkToNextStage(stage, "apq", curMap);  //opens the portal to the next map
}

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 670010200) / 100) + 1;
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else if (mode == 0){
            cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getPlayer().getEventInstance();
                if(eim.getProperty(stage.toString() + "stageclear") != null) {
                        if(stage < 5) cm.sendNext("入口已经打开了，准备在那里等待你的审判.");
                        else if(stage == 5) eim.warpEventTeamToMapSpawnPoint(670010700, 0);
                        else {
                                if(cm.isEventLeader()) {
                                        if(eim.getIntProperty("marriedGroup") == 0) {
                                                eim.restartEventTimer(1 * 60 * 1000);
                                                eim.warpEventTeam(670010800);
                                        } else {
                                                eim.setIntProperty("marriedGroup", 0);

                                                eim.restartEventTimer(2 * 60 * 1000);
                                                eim.warpEventTeamToMapSpawnPoint(670010750, 1);
                                        }
                                } else {
                                        cm.sendNext("等待领队命令启动奖励阶段.");
                                }
                        }
                }
                else {
                        if(stage != 6) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        var state = eim.getIntProperty("statusStg" + stage);

                                        if(state == -1) {           // preamble
                                                if(stage == 4) cm.sendOk("你好。欢迎来到 #b阶段 " + stage + "#k 阿摩利人的挑战。 在这个阶段，从这里的暴徒那里收集我的 #b50 #t4031597##k.");
                                                else if(stage == 5) cm.sendOk("你好。欢迎来到 #b阶段 " + stage + "#k 阿摩利人的挑战。这真是太难了，嗯？好吧，不管怎样，这是你这个阶段的任务：生存! 首先，在挑战老板之前，有没有活着的人聚集在这里.");

                                                var st = (debug) ? 2 : 0;
                                                eim.setProperty("statusStg" + stage, st);
                                        }
                                        else {       // check stage completion
                                                if(stage == 4) {
                                                        if(cm.haveItem(4031597, 50)) {
                                                            cm.gainItem(4031597, -50);

                                                            var tl = eim.getTimeLeft();
                                                            if(tl >= 5 * 60 * 1000) {
                                                                eim.setProperty("timeLeft", tl.toString());
                                                                eim.restartEventTimer(4 * 60 * 1000);
                                                            }

                                                            cm.sendNext("做得好！我现在帮你开门.");
                                                            cm.mapMessage(5, "阿莫斯：现在时间不多了。你的目标是打开大门，聚集在下一张地图的另一边。祝你好运!");
                                                            clearStage(stage, eim, curMap);
                                                        } else {
                                                            cm.sendNext("嘿，你没注意吗？我要求 #r50 #t4031597##k来保证这次试验的成功.");
                                                        }

                                                } else if(stage == 5) {
                                                        var pass = true;

                                                        if(eim.isEventTeamTogether()) {
                                                            var party = cm.getEventInstance().getPlayers();
                                                            var area = cm.getMap().getArea(2);

                                                            for (var i = 0; i < party.size(); i++) {
                                                                    var chr = party.get(i);

                                                                    if (chr.isAlive() && !area.contains(chr.getPosition())) {
                                                                        pass = false;
                                                                        break;
                                                                    }
                                                            }
                                                        } else {
                                                            pass = false;
                                                        }

                                                        if(pass) {
                                                                if(isAllGatesOpen()) {
                                                                    var tl = eim.getProperty("timeLeft");
                                                                    if(tl != null) {
                                                                        var tr = eim.getTimeLeft();

                                                                        var tl = parseFloat(tl);
                                                                        eim.restartEventTimer(tl - (4 * 60 * 1000 - tr));
                                                                    }

                                                                    cm.sendNext("好吧，你的队伍已经集合了。当你们准备好反抗 #r盖斯巴尔罗格#k.");

                                                                    cm.mapMessage(5, "阿莫斯：现在只剩下老大的战斗了！一进屋，只要你想加入老板的战斗，就和我谈谈，你马上就会被送去行动.");
                                                                    clearStage(stage, eim, curMap);
                                                                } else {
                                                                    cm.sendNext("你们是通过传送来的，嗯？我看得出来。这真是可惜，所有的大门都需要打开才能完成这一阶段。如果你还有时间，退后一步，把那些门取下来.");
                                                                }
                                                        } else {
                                                                cm.sendNext("你的团队还没有聚集在附近。给他们点时间到这里.");
                                                        }
                                                }
                                        }
                                } else {
                                        cm.sendNext("请告诉你的部门领导来和我谈谈.");
                                }
                        } else {
                                var area = cm.getMap().getArea(0);
                                if (area.contains(cm.getPlayer().getPosition())) {
                                        if(cm.getPlayer().isAlive()) {
                                                cm.warp(670010700, "st01");
                                        } else {
                                                cm.sendNext("站在后面..你已经死了.");
                                        }
                                } else {
                                        if(cm.isEventLeader()) {
                                                if(cm.haveItem(4031594, 1)) {
                                                        cm.gainItem(4031594, -1);
                                                        cm.sendNext("祝贺 你！你的政党打败了盖斯特·巴尔罗格，从而完成了阿摩利挑战！再跟我谈谈开始奖金阶段.");

                                                        clearStage(stage, eim, curMap);
                                                        eim.clearPQ();
                                                } else {
                                                        cm.sendNext("怎么样？你要帮我取回#b#t4031594##k卡吗？这是你最后一次审判了，等等！")
                                                }
                                        } else {
                                                cm.sendNext("请告诉你的部门领导来和我谈谈.");
                                        }
                                }
                        }
                }
                
                cm.dispose();
        }
}