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
@	Author : Twdtwd
@       Author : Ronan
@
@	NPC = Blue Balloon
@	Map = Hidden-Street <Stage 8>
@	NPC MapId = 922010800
@	Function = LPQ - 8 Stage
@
@	Description: Used to find the combo to unlock the next door. Players stand on 5 different crates to guess the combo.
*/

function generateCombo() {
	var countPicked = 0;
	var positions = Array(0,0,0,0,0,0,0,0,0);
	while(countPicked < 5) {
		var picked = Math.floor(Math.random() * positions.length);
		if(positions[picked] == 1) // Don't let it pick one its already picked.
			continue;
			
		positions[picked] = 1;
		countPicked++;
	}
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
		returnString += ",";
	}
	
	return returnString;
	
}

var debug = false;
var status = 0;
var curMap, stage;

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);
    
    eim.linkToNextStage(stage, "lpq", curMap);  //opens the portal to the next map
}

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;
    
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
                        cm.sendNext("快点，进入下一阶段，入口打开了！");
                }
                else {
                        if (eim.isEventLeader(cm.getPlayer())) {
                                var state = eim.getIntProperty("statusStg" + stage);

                                if(state == -1) {           // preamble
                                        cm.sendOk("你好。欢迎来到#b" + stage + "#k. 在这个阶段,在这些盒子上面排列出5名队员，以便形成正确的组合，打开下一个阶段。只有一个玩家应该停留在一个与组合相关的盒子上面。");
                                        
                                        var st = (debug) ? 2 : 0;
                                        eim.setProperty("statusStg" + stage, st);
                                }
                                else {       // check stage completion
                                        if(state == 2) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                                return;
                                        }
                                    
                                        objset = [0,0,0,0,0,0,0,0,0];
                                        var playersOnCombo = 0;
                                        var map = cm.getPlayer().getMap();
                                        var party = cm.getEventInstance().getPlayers();
                                        for (var i = 0; i < party.size(); i++) {
                                            for (var y = 0; y < map.getAreas().size(); y++) {
                                                if (map.getArea(y).contains(party.get(i).getPosition())) {
                                                    playersOnCombo++;
                                                    objset[y] = 1;
                                                    //cm.mapMessage(5, "Player found on " + (y + 1));
                                                    break;
                                                }
                                            }
                                        }

                                        if (playersOnCombo == 5 || cm.getPlayer().gmLevel() > 1) {
                                            var comboStr = eim.getProperty("stage" + stage + "combo");
                                            if(comboStr == null) {
                                                comboStr = generateCombo();
                                                eim.setProperty("stage" + stage + "combo", comboStr);
                                            }
                                            
                                            var combo = comboStr.split(',');
                                            var correctCombo = true;
                                            for (i = 0; i < objset.length && correctCombo; i++)
                                                if (parseInt(combo[i]) != objset[i]) {
                                                    //cm.mapMessage(5, "Combo failed on " + (i + 1));
                                                    correctCombo = false;
                                                }
                                            if (correctCombo || cm.getPlayer().gmLevel() > 1) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                            } else {
                                                eim.showWrongEffect();
                                                cm.dispose();
                                            }
                                        } else {
                                            cm.sendNext("看来你还没找到5个盒子的正确组合。请考虑不同的盒子组合。 只允许5个人站在盒子上，请调整正确的盒子顺序然后通过关卡！");
                                            cm.dispose();
                                        }
                                }
                        } else {
                                cm.sendNext("请让你的#b队长#k与我交谈.");
                        }
                }
                
                cm.dispose();
        }
}