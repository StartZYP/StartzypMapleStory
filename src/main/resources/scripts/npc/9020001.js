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

/**
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
*/

importPackage(Packages.tools);
importPackage(java.awt);

var stage1Questions = Array(
    "第一个问题：转职成战士的最低等级是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成战士的最低力量值(SEX)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成魔法师的最低智力值(INT)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)",
    "第一个问题：转职成弓箭手的最低敏捷值(DEX)是多少？#b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：转职成飞侠的最低敏捷值(DEX)是多少？#b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：第二次转职最低需要的等级(LEVEL)是多少? #b\r\n(打倒怪物，获取相应数量的证书。)",
    "第一个问题：转职成魔法师的最低等级(LEVEL)是多少?#b\r\n(打倒怪物，获取相应数量的证书.)");
var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);

var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
    
var stage2Combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3Combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4Combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);
    
    eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
}

function rectangleStages(eim, property, areaCombos, areaRects) {
    var c = eim.getProperty(property);
    if(c == null) {
        c = Math.floor(Math.random() * areaCombos.length);
        eim.setProperty(property, c.toString());
    }
    else c = parseInt(c);
    
    // get player placement
    var players = eim.getPlayers();
    var playerPlacement = new Array(0, 0, 0, 0, 0, 0);

    for(var i = 0; i < eim.getPlayerCount(); i++) {
        for(var j = 0; j < areaRects.length; j++) {
            if(areaRects[j].contains(players.get(i).getPosition())) {
                playerPlacement[j] += 1;
                break;
            }
        }
    }

    var curCombo = areaCombos[c];
    var accept = true;
    for(var j = 0; j < curCombo.length; j++) {
        if(curCombo[j] != playerPlacement[j]) {
            accept = false;
            break;
        }
    }
    
    return accept;
}

var status = -1;
var eim;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
        eim = cm.getEventInstance();
    
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                if(status == 0) {
                        var curMap = cm.getMapId();
                        var stage = curMap - 103000800 + 1;
                        if(eim.getProperty(stage.toString() + "stageclear") != null) {
                                if(stage < 5) {
                                        cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendNext("不敢相信！你和你的组队员们终于完成了所有挑战！做为奖励，我将送你一些东西，请确保你的消耗栏、其它栏、装备栏是否有一个栏目以上的空格？");
                                }
                        }
                        else if(curMap == 103000800) {   // stage 1
                                if(cm.isEventLeader()) {
                                        var numpasses = eim.getPlayerCount() - 1;     // minus leader

                                        if(cm.hasItem(4001008, numpasses)) {
                                                cm.sendNext("恭喜你们成功收集了 " + numpasses + " 个通行证书! 旁边的通道可以送你们去下一个关卡，时间不多了请抓紧时间.祝你们好运!");
                                                clearStage(stage, eim, curMap);
                                                eim.gridClear();
                                                cm.gainItem(4001008, -numpasses);
                                        }
                                        else {
                                                cm.sendNext("你需要收集#b相应数目#k的证书给我 请把通行证交给队长之后，帮助其它队友吧！");
                                        }
                                }
                                else {
                                        var data = eim.gridCheck(cm.getPlayer());

                                        if(data == 0) {
                                                cm.sendNext("祝贺你，请把通行证交给队长之后，帮助其它队友吧！");
                                        } else if(data == -1) {
                                                data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                                                eim.gridInsert(cm.getPlayer(), data);

                                                var question = stage1Questions[data - 1];
                                                cm.sendNext(question);
                                        } else {
                                                var answer = stage1Answers[data - 1];

                                                if(cm.itemQuantity(4001007) == answer) {
                                                        cm.sendNext("回答正确! 我已经给你了通行证，请把通行证交给队长之后，帮助其它队友吧！");
                                                        cm.gainItem(4001007, -answer);
                                                        cm.gainItem(4001008, 1);
                                                        eim.gridInsert(cm.getPlayer(), 0);
                                                }
                                                else {
                                                        var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                                                        cm.sendNext("回答错误!\r\n" + question);
                                                }
                                        }
                                }
                                
                                cm.dispose();
                        } else if(curMap == 103000801) {   // stage 2
                                var stgProperty = "stg2Property";
                                var stgCombos = stage2Combos;
                                var stgAreas = stage2Rects;

                                var nthtext = "二", nthobj = "绳子", nthverb = "攀爬", nthpos = "攀爬的位置太低";
                                var nextStgId = 103000802;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请遵守你们队长的指示一起，共同完成本关.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("欢迎来到第 " + nthtext + " 关. 看到旁边的 " + nthobj + "了吧？, #b3 攀爬到正确的绳子上就可以进入下一关#k. 当然你需要有 #b3 队员去寻找到正确的 " + nthobj + " 并 " + nthverb + " 上去.#k\r\n如果你不知道答案是什么， 请尽量靠近中间的 " + nthobj + " 去感受正确的答案. 当然，只有3个成员可以攀爬 " + nthobj + ". 一旦队员 " + nthverb + "了上去,队长需要 #b双击 我 去检查是否回答正确#k. 现在，去寻找攀爬正确的 " + nthobj + " 吧!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到那 3 个正确的 " + nthobj + " 请尝试不同的组合，只能有3位成员攀爬上去, 当然如果攀爬的位置太低了也不算数,所以请尽量靠近中间位置. 继续前进!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000802) {
                                var stgProperty = "stg3Property";
                                var stgCombos = stage3Combos;
                                var stgAreas = stage3Rects;

                                var nthtext = "三", nthobj = "箱子", nthverb = "站立";
                                var nextStgId = 103000803;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请遵守你们队长的指示一起，共同完成本关.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("欢迎来到第 " + nthtext + " 关. 看到旁边的 " + nthobj + "了吧, #b3 站立到正确的箱子上面就可以进入下一关#k. 当然你需要有 #b3 队员去寻找到正确的 " + nthobj + " 并 " + nthverb + " 上去。#k\r\n如果你不知道答案是什么， 请尽量靠近中间的 " + nthobj + " 去感受正确的答案. 当然，只有3个成员可以站立到 " + nthobj + " 上面.一旦" + nthverb + "了上去, 队长需要 #b双击 我 去检查是否回答正确#k. 现在，去寻找正确的 " + nthobj + " 吧!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到那 3 个正确的 " + nthobj + " 请尝试不同的组合，只能有3位成员站立上去, 当然如果站立的位置太远了也不算数,所以请尽量靠近中间位置. 继续前进!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000803) {
                                var stgProperty = "stg4Property";
                                var stgCombos = stage4Combos;
                                var stgAreas = stage4Rects;

                                var nthtext = "四", nthobj = "木桶", nthverb = "站立";
                                var nextStgId = 103000804;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请遵守你们队长的指示一起，共同完成本关.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("欢迎来到第 " + nthtext + " 关. 看到旁边的 " + nthobj + ". 了吧, #b3 站立到正确的木桶上面就可以进入下一关#k. 当然你需要有 #b3 队员去寻找到正确的 " + nthobj + " 并 " + nthverb + " 上去。#k\r\n如果你不知道答案是什么， 请尽量靠近中间的 " + nthobj + " 去感受正确的答案. 当然，只有3个成员可以站立到 " + nthobj + " 上面.一旦" + nthverb + "了上去, 队长需要 #b双击 我 去检查是否回答正确#k. 现在，去寻找正确的 " + nthobj + " 吧!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("现在可以到下一个关卡了，如果不快点的话，门可能就关闭了。");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("看起来你们还没有找到那 3 个正确的 " + nthobj + " 请尝试不同的组合，只能有3位成员站立上去, 当然如果站立的位置太远了也不算数,所以请尽量靠近中间位置. 继续前进!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000804) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        if (cm.haveItem(4001008, 10)) {
                                                cm.sendNext("这里可以通过最后一个关卡，这里有很多凶猛的怪物，我衷心祝福你和你的组队能通过这项挑战。");
                                                cm.gainItem(4001008, -10);

                                                clearStage(stage, eim, curMap);
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("你好，欢迎来到第5阶段，到处走走，可能会发现很多凶猛的怪物，打败它们，获取通行证，再把他们交给我。记住，怪物可能比你强大很多，请小心一点，祝你通过这一关。");
                                        }
                                } else {
                                        cm.sendNext("欢迎来到第5阶段，在地图上走走，你就会看见许多凶猛的怪物，打败他们获取他们身上的通行证，交给你们的组队长。");
                                }
                                
                                cm.dispose();
                        }
                }
                else if (status == 1) {
                        if(!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("做为奖励，我将送你一些东西，请确保你的消耗栏、其它栏、装备栏是否有一个栏目以上的空格？");
                        } else {
                                cm.warp(103000805, "st00");
                        }
                        
                        cm.dispose();
                }
        }
}
