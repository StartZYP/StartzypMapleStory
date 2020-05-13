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
@	Description: Used to find the combo to unlock the next door. Players stand on 5 different crates to guess the combo.
*/

importPackage(Packages.server.life);

var debug = false;
var autopass = false;

function spawnMobs(maxSpawn) {
    var spawnPosX;
    var spawnPosY;

    var mapObj = cm.getMap();
    if (stage == 2) {
        spawnPosX = [619, 299, 47, -140, -471];
        spawnPosY = [-840, -840, -840, -840, -840];

        for(var i = 0; i < 5; i++) {
            for(var j = 0; j < 2; j++) {
                var mobObj1 = MapleLifeFactory.getMonster(9400515);
                var mobObj2 = MapleLifeFactory.getMonster(9400516);
                var mobObj3 = MapleLifeFactory.getMonster(9400517);

                mapObj.spawnMonsterOnGroundBelow(mobObj1, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
                mapObj.spawnMonsterOnGroundBelow(mobObj2, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
                mapObj.spawnMonsterOnGroundBelow(mobObj3, new Packages.java.awt.Point(spawnPosX[i], spawnPosY[i]));
            }
        }
    } else {
        spawnPosX = [2303, 1832, 1656, 1379, 1171];
        spawnPosY = [240, 150, 300, 150, 240];

        for(var i = 0; i < maxSpawn; i++) {
            var rndMob = 9400519 + Math.floor(Math.random() * 4);
            var rndPos = Math.floor(Math.random() * 5);

            var mobObj = MapleLifeFactory.getMonster(rndMob);
            mapObj.spawnMonsterOnGroundBelow(mobObj, new Packages.java.awt.Point(spawnPosX[rndPos], spawnPosY[rndPos]));
        }
    }
}

function generateCombo1() {
	var positions = Array(0,0,0,0,0,0,0,0,0);
        var rndPicked = Math.floor(Math.random() * Math.pow(3, 5));
        
        while(rndPicked > 0) {
            (positions[rndPicked % 3])++;
            
            rndPicked = Math.floor(rndPicked / 3);
        }
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
                        returnString += ",";
	}
	
	return returnString;
}

function generateCombo2() {
	var toPick = 5, rndPicked;
	var positions = Array(0,0,0,0,0,0,0,0,0);
	while(toPick > 0) {
		rndPicked = Math.floor(Math.random() * 9);
                
                if(positions[rndPicked] == 0) {
                        positions[rndPicked] = 1;
                        toPick--;
                }
	}
	
	var returnString = "";
	for(var i = 0; i < positions.length; i++) {
		returnString += positions[i];
		if(i != positions.length - 1)
                        returnString += ",";
	}
	
	return returnString;
}

var status = 0;
var curMap, stage;

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    if(stage > 1) {
        eim.showClearEffect(true);
        eim.linkToNextStage(stage, "apq", curMap);  //opens the portal to the next map
    }
    else {
        cm.getMap().getPortal("go01").setPortalState(false);
        
        var val = Math.floor(Math.random() * 3);
        eim.showClearEffect(670010200, "gate" + val, 2);
        
        cm.getMap().getPortal("go0" + val).setPortalState(true);
        eim.linkPortalToScript(stage, "go0" + val, "apq0" + val, curMap);
    }
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
                        cm.sendNext("入口已经打开了，准备在那里等待你的审判.");
                }
                else {
                        if (eim.isEventLeader(cm.getPlayer())) {
                                var state = eim.getIntProperty("statusStg" + stage);

                                if(state == -1) {           // preamble
                                        if(stage == 1) cm.sendOk("你好。欢迎来到 #b阶段 " + stage + "#k 阿摩利人的挑战。在此阶段，与 #p9201047#, 他会把任务的更多细节告诉你。在粉碎了魔法师的镜子之后，把碎片放回#p9201047#，然后来到这里进入下一个阶段.");
                                        else if(stage == 2) cm.sendOk("你好。欢迎来到 #b阶段 " + stage + "#k 阿摩利人的挑战。在这个阶段，让你的5名党员爬上讲台，尝试一个组合来打开下一个级别的门户。等你准备好了，跟我说，我会告诉你情况的。但是，要做好准备，因为在几次尝试后，入口没有被解锁，怪物会大量繁殖.");
                                        else if(stage == 3) cm.sendOk("你好。欢迎来到 #b阶段 " + stage + "#k 阿摩利人的挑战。在这个阶段，让你的5名党员爬上讲台，每人一个，这样就可以尝试一种组合方式，将门户打开到下一个层次。等你准备好了，跟我说，我会告诉你情况的。注意：失败时，数一数出现在现场的粘液数量，这将告诉你们中有多少人的位置正确.");

                                        var st = (autopass) ? 2 : 0;
                                        eim.setProperty("statusStg" + stage, st);
                                }
                                else {       // check stage completion
                                        if(state == 2) {
                                                eim.setProperty("statusStg" + stage, 1);
                                                clearStage(stage, eim, curMap);
                                                cm.dispose();
                                                return;
                                        }

                                        var map = cm.getPlayer().getMap();
                                        if(stage == 1) {
                                                if(eim.getIntProperty("statusStg" + stage) == 1) {
                                                    clearStage(stage, eim, curMap);
                                                } else {
                                                    cm.sendOk("有关此阶段的详细信息，请与#p9201047#联系.");
                                                }
                                        } else if(stage == 2 || stage == 3) {
                                                if(map.countMonsters() == 0) {
                                                        objset = [0,0,0,0,0,0,0,0,0];
                                                        var playersOnCombo = 0;
                                                        var party = cm.getEventInstance().getPlayers();
                                                        for (var i = 0; i < party.size(); i++) {
                                                            for (var y = 0; y < map.getAreas().size(); y++) {
                                                                if (map.getArea(y).contains(party.get(i).getPosition())) {
                                                                    playersOnCombo++;
                                                                    objset[y] += 1;
                                                                    break;
                                                                }
                                                            }
                                                        }

                                                        if (playersOnCombo == 5/* || cm.getPlayer().gmLevel() > 1*/ || debug) {
                                                            var comboStr = eim.getProperty("stage" + stage + "combo");
                                                            if (comboStr == null || comboStr == "") {
                                                                if (stage == 2) {
                                                                    comboStr = generateCombo1();
                                                                } else {
                                                                    comboStr = generateCombo2();
                                                                }

                                                                eim.setProperty("stage" + stage + "combo", comboStr);
                                                                if(debug) print("generated " + comboStr + " for stg" + stage + "\n");
                                                            }

                                                            var combo = comboStr.split(',');
                                                            var correctCombo = true;
                                                            var guessedRight = objset.length;
                                                            var playersRight = 0;

                                                            if(!debug) {
                                                                for (i = 0; i < objset.length; i++) {
                                                                    if (parseInt(combo[i]) != objset[i]) {
                                                                        correctCombo = false;
                                                                        guessedRight--;
                                                                    } else {
                                                                        if(objset[i] > 0) playersRight++;
                                                                    }
                                                                }
                                                            } else {
                                                                for (i = 0; i < objset.length; i++) {
                                                                    var ci = cm.getPlayer().countItem(4000000 + i);

                                                                    if (ci != parseInt(combo[i])) {
                                                                        correctCombo = false;
                                                                        guessedRight--;
                                                                    } else {
                                                                        if(ci > 0) playersRight++;
                                                                    }
                                                                }
                                                            }


                                                            if (correctCombo/* || cm.getPlayer().gmLevel() > 1*/) {
                                                                eim.setProperty("statusStg" + stage, 1);
                                                                clearStage(stage, eim, curMap);
                                                                cm.dispose();
                                                            } else {
                                                                var miss = eim.getIntProperty("missCount") + 1;
                                                                var maxMiss = (stage == 2) ? 7 : 1;

                                                                if (miss < maxMiss) {   //already implies stage 2
                                                                    eim.setIntProperty("missCount", miss);

                                                                    if(guessedRight == 6) { //6 unused slots on this stage
                                                                        cm.sendNext("所有绳子的重量都不一样。考虑下一步行动，然后再试一次.");
                                                                        cm.mapMessage(5, "阿莫斯：嗯..所有绳子的重量都不一样.");
                                                                    }
                                                                    else {
                                                                        cm.sendNext("一根绳子重一样。考虑下一步行动，然后再试一次.");
                                                                        cm.mapMessage(5, "阿莫斯：嗯..一根绳子重一样.");
                                                                    }
                                                                } else {
                                                                    spawnMobs(playersRight);
                                                                    eim.setIntProperty("missCount", 0);
                                                                    if(stage == 2) {
                                                                        eim.setProperty("stage2combo", "");

                                                                        cm.sendNext("您没有找到正确的组合，现在它将被重置。重新开始!");
                                                                        cm.mapMessage(5, "阿莫斯：你没有找到正确的组合，现在应该重置。重新开始!");
                                                                    }
                                                                }

                                                                eim.showWrongEffect();
                                                                cm.dispose();
                                                            }
                                                        } else {
                                                            if(stage == 2) cm.sendNext("看来你们还没找到审判的方法。考虑在平台上安排5名成员。记住，只有5个人可以站在讲台上，如果你移动它可能不算作回答，所以请记住这一点。继续前进!");
                                                            else cm.sendNext("看来你们还没找到审判的方法。思考不同平台上的党员安排。记住，只有5个人可以站在讲台上，如果你移动它可能不算作回答，所以请记住这一点。继续前进!");

                                                            cm.dispose();
                                                        }
                                                } else {
                                                        cm.sendNext("在尝试组合之前击败所有暴徒.");
                                                }
                                        }
                                }
                        } else {
                                cm.sendNext("请告诉你的部门领导来和我谈谈.");
                        }
                }
                
                cm.dispose();
        }
}