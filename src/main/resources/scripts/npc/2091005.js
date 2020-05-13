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
* @Author: Moogra, XxOsirisxX
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);

/* var belt_points = Array(200, 1800, 4000, 9200, 17000); */
var belt_points = Array(5, 45, 100, 230, 425); /* Watered down version */

var status = -1;
var selectedMenu = -1;

function start() {
	if(disabled) {
		cm.sendOk("我的师傅要求#r关闭#k道场，所以我不能让你进来.");
		cm.dispose();
		return;
	}
	
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        var text = "我很惊讶你能走这么远！但从现在开始就不容易了。你还是想要挑战?\r\n\r\n#b#L0#我想继续#l\r\n#L1#我想离开#l\r\n";
        if (!GameConstants.isDojoPartyArea(cm.getPlayer().getMapId())) {
            text += "#L2#我想记录现在的分数#l";
        }
        cm.sendSimple(text);
    } else if (cm.getPlayer().getLevel() >= 25) {
        if (cm.getPlayer().getMap().getId() == 925020001) {
            cm.sendSimple("我师父可是武陵最厉害的人，你居然要对他进行挑战？日后可别后悔了.\r\n\r\n#b#L0#个人进行挑战.#l\r\n#L1#组队进行挑战.#l\r\n#L2#我想要获取腰带.#l\r\n#L3#我想重置我的训练点.#l\r\n#L4#我想要勋章.#l\r\n#L5#武陵道场是什么?#l");
        } else {
            cm.sendYesNo("你真的想离开吗?");
        }
    } else {
        cm.sendOk("嘿！你在嘲笑我的师傅吗？你认为你要挑战谁？这是个笑话！你至少需要#b25#k.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001) {
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("这是你第一次挑战武陵道场吗，嗯？好吧，我的师傅他很忙。如果你能打败我，我就让你见见我的师傅?");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("哈哈，失败了吧?\r\n请回去吧!");
                        } else {
                           if(cm.getClient().getChannelServer().getMapFactory().getMap(925020010).getCharacters().size() > 0) {
                                cm.sendOk("其他人正在使用道场.请稍后进入.");
                                cm.dispose();
                                return;
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("上一次你独自接受挑战时" + cm.getPlayer().getDojoStage() + ". 我现在可以带你去那里。你想去那里吗?");
                    } else {
                        cm.warp(mode == 1 ? 925020000 + cm.getPlayer().getDojoStage() * 100 : 925020100, 0);
                        cm.dispose();
                    }
                } else {
					for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
						if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
							cm.sendOk("已经有人在挑战了." + i);
							cm.dispose();
							return;
						}
					}
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
                if (party == null) {
                    cm.sendNext("请让你的队长与我交谈.");
                    cm.dispose();
                    return;
                }
                var lowest = cm.getPlayer().getLevel();
                var highest = lowest;
                for (var x = 0; x < party.getMembers().size(); x++) {
                    var lvl = party.getMembers().get(x).getLevel();
                    if (lvl > highest)
                        highest = lvl;
                    else if (lvl < lowest)
                        lowest = lvl;
                }
                var isBetween30 = highest - lowest < 30;
                if (party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("请让你的队长与我交谈.");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendNext("请确认你在队伍中？");
                } else if (!isBetween30) {
                    cm.sendNext("你的等级太低或者你的队员不在同一地图.");
                } else {
                    for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
                            if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("已经有人在挑战了.");
                                    cm.dispose();
                                    return;
                            }
                    }
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "你的训练点为 #b" + cm.getPlayer().getDojoPoints() + "#k.师傅喜欢有实力的人。如果你获得的足够的训练点，你可以根据你的训练点购买一条腰带.\r\n";
                    for (var i = 0; i < belts.length; i++) {
                        if (cm.haveItemWithId(belts[i], true)) {
                            selStr += "\r\n     #i" + belts[i] + "# #t" + belts[i] + "#(Obtain)";
                        } else
                            selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                    }
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    if (cm.getPlayer().getDojoPoints() > points) {
                        if (cm.getPlayer().getLevel() > level)
                            cm.gainItem(belt, 1);
                        else
                            cm.sendNext("有一个#i" + belt + "# #b#t" + belt + "##k,你至少超过#b" + level + "#k你最少应该有#b" + points + "训练点#k.\r\n\r\n如果你想得到这条腰带，你需要#r" + (points - cm.getPlayer().getDojoPoints()) + "#k更多的训练点.");
                    } else
                        cm.sendNext("在领取之前#i" + belt + "# #b#t" + belt + "##k,你至少超过#b" + level + "#k你最少应该有#b" + points + "训练点#k.\r\n\r\n如果你想得到这条腰带，你需要#r" + (points - cm.getPlayer().getDojoPoints()) + "#k更多的训练点.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("你确定要重置训练点吗?不过，这并不总是件坏事。重置后可以重新开始获得训练点，然后可以再次获得腰带。现在要重置训练点吗?");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("#r重置以后训练点会清零,确定吗?#k.");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("训练点已经重置!");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0 && cm.getPlayer().getVanquisherStage() <= 0) {
                    cm.sendYesNo("你还没有勋章吗?如果你在一定时间内击败怪物,你可以获得#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k.看来你连#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k嗯...,你想试试吗？#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k?");
                } else if (status == 1 || cm.getPlayer().getVanquisherStage() > 0) {
                    if (mode == 0) {
                        cm.sendNext("如果你不想，也没关系.");
                        cm.dispose();
                    } else {
                        if (cm.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("你已经完成了挑战.");
                        } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                            cm.sendNext("你还需要#b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k为了获得#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k请继续努力！请击败怪物后离开!#r如果你在击败怪物后没有进入下一层，那就不算胜利#k.");
                        else if (cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.getPlayer().setVanquisherStage(1);
                        } else {
                            cm.sendNext("恭喜你已经获得了#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                            cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                            cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                            cm.getPlayer().setVanquisherKills(0);
                        }
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                cm.sendNext("我的师傅武公是最强的人. 他建的地方叫武陵道场, 武陵道场是一座共计38层的建筑物,由37层建筑再加上师傅的单独楼层所构成,一层一层的逐渐往上走,就可以修炼自己,当然凭你的实力,估计是很难走到最后的.");
                cm.dispose();
            }
        } else
            cm.dispose();
    } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        if (selectedMenu == -1)
            selectedMenu = selection;
        status++;
        if (selectedMenu == 0) {
            cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
            cm.dispose();
        } else if (selectedMenu == 1) { //I want to leave
            if (status == 0) {
                cm.sendAcceptDecline("你确定要离开吗?");
            } else {
                if (mode == 1) {
                    cm.warp(925020002, "st00");
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //I want to record my score up to this point
            if (status == 0) {
                cm.sendYesNo("如果你记下你的分数，你可以从下一次结束的地方开始。你想记录你现在的分数吗?");
            } else {
                if (mode == 0) {
                    cm.sendNext("你觉得你能走得更远吗？祝你好运！");
                } else if (925020000 + cm.getPlayer().getDojoStage() * 100 == cm.getMapId()) {
                    cm.sendOk("你的分数已经被记录了。下次你挑战道场时，你将从这里开始.");
                } else {
                    cm.sendNext("你的分数已经记录.下次要从这里开始的时候，请与我对话");
                    cm.getPlayer().setDojoStage((cm.getMapId() - 925020000) / 100);
                }
                cm.dispose();
            }
        }
    } else {
        if (mode == 0) {
            cm.sendNext("祝你挑战顺利.");
        } else if (mode == 1) {
            cm.warp(925020002, 0);
            cm.getPlayer().message("考虑好以后再与我对话。");
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
