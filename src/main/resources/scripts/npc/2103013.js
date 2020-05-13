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
var status = 0;
var selected = -1;
var party = 0;



function start() {
	status = -1;
	var text = "无法与NPC进行交谈";
	if (cm.getMapId() == 926020001)
		text = "停止前进！你已经成功地通过了法老王的测试。在法老王的恩典下，你将有机会进入法老王的坟墓。你想现在进入吗？\r\n\r\n#b#L0#是的，我现在就想进去。#l\r\n#L1#不，我晚一点再去。#l";
	else if (cm.getMapId() == 926010000)
		text = "我是杜阿特。\r\n\r\n#b#L0#问问金字塔的事。#l\r\n#e#L1#进入金字塔。#l#n\r\n\r\n#L2#寻找组队#l\r\n\r\n#L3#进入法老王的坟墓。#l\r\n#L4#询问法老王的宝藏。#l\r\n#L5##b获得<法老守护者勋章>#k#l";
	else 
		text = "你想放弃挑战离开吗？\r\n\r\n#b#L0#等级#l";
		
	cm.sendSimple(text);
}


function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode < 0 || (type == 4 && mode == 0)) {
		cm.dispose();
		return;
	} else status++;
	
	if (cm.getMapId() == 926010000) {
		if (status == 0) {
			if (selection > -1) selected = selection;
			if (selection == 0 || selected == 0) {
				cm.sendNext("这就是法老王金字塔，混乱与复仇之神。很长一段时间，它被深埋在沙漠里，但是法老王让它从地面上升起。如果你不怕混乱和死亡，你可以挑战法老王，它沉睡在金字塔里。不管结果如何，选择权在你。");
			} else if (selection == 1) {
				cm.sendSimple("你们这些不惧怕法老王的愤怒傻瓜，现在是时候选择你们的命运了！\r\n\r\n#b#L0#单人挑战。#l\r\n#L1#2人或2人以上的队伍进行挑战#l");
			} else if (selection == 2) {
				cm.showInfoText("使用组队搜索(热键O)可以随时随地搜索要加入的队伍！");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendSimple("你带了什么宝石？\r\n\r\n#L0##i4001322# #t4001322##l\r\n#L1##i4001323# #t4001323##l\r\n#L2##i4001324# #t4001324##l\r\n#L3##i4001325# #t4001325##l");
			} else if (selection == 4) {
				cm.sendNext("在白雪人法老的坟墓里，你可以获得#e#b#t2022613##k#n证明自己有能力打败#b法老小白雪人#k. 盒子里藏着一个非常特别的宝藏。它是#e#b#t1132012##k#n.\r\n#i1132012:# #t1132012#\r\n\r\n如果你能在困难模式下生存，你将得到#e#b#t1132013##k#n.\r\n\r\n#i1132013:# #t1132013#\r\n\r\n当然, 法老王不会允许这种事发生。");
			} else if (selection == 5) {
				var progress = cm.getQuestProgressInt(29932);
				if (progress >= 50000)
					cm.dispose();
				else
					cm.sendNext("");
					
			}
		} else if (status == 1) {
			if (selected == 0) {
				cm.sendNextPrev("一旦你进入金字塔，你将面临法老王的愤怒。我会给你一些建议，好好记住他们。#b\r\n\r\n1.小心一点不要让#e#r能量条#b#n减少.保持你的等级的唯一方法就是不停地与怪物战斗。\r\n2. 那些没有能力的人将付出昂贵的代价。小心不要造成任何#r失误#k。\r\n3.小心法老小白雪人身上的#v04032424#状态.如果你在这种状态下对他进行攻击，你会后悔的。\r\n4. 明智地使用技能，这是给你的忠告。");
			} else if (selected == 1) {
				party = selection;
				cm.sendSimple("对死亡的残酷缺乏恐惧的人，做出你的决定吧！\r\n#L0##i3994115##l#L1##i3994116##l#L2##i3994117##l#L3##i3994118##l");
			} else if (selected == 3) {
				if (selection == 0) {
					if (cm.haveItem(4001322)) {
						return;
					}
				} else if (selection == 1) {
				    if (cm.haveItem(4001323)) {
						return;
					}
				} else if (selection == 2) {
					if (cm.haveItem(4001324)) {
						return;
					}
				} else if (selection == 3) {
					if (cm.haveItem(4001325)) {
						return;
					}
				}
				cm.sendOk("你需要一块宝石才能进入耶提法老的坟墓。你确定你有吗？");
				cm.dispose();
			} else if (selected == 5) {
			} else {
				cm.dispose();
			}
		} else if (status == 2) {
			if (selected == 0) {
				cm.sendNextPrev("凡能抵挡法老王的愤怒的人会得到荣誉及战利品；凡失败的人将会灭亡。这是我能给你的全部建议。剩下的交给你了。");
			} else if (selected == 1) {
				var mode = "EASY";
				//Finish this
				var pqparty = cm.getPlayer().getParty();
				if (party == 1) {
					if (pqparty == null) {
						cm.sendOk("创建一个组队");//BE NICE
						cm.dispose();
						return;		
					} else {
						if (pqparty.getMembers().size() < 0) {
							cm.sendOk("需要更多的队员才能进入...");
							cm.dispose();
							return;								
						} else {
							var i = 0;
							for (var a = 0; a < pqparty.getMembers().size(); a++) {
								var pqchar = pqparty.getMembers().get(a);
								if (i > 1) break;
								if (pqchar != null && pqchar.getMapId() == 926010000) i++;
							}
							if (i < 0) {
								cm.sendOk("请确认是否有2人以上的队伍或者队员在地图上");
								cm.dispose();
								return;								
							}
						}
					}					
				}
				
				if (cm.getPlayer().getLevel() < 40) {
					cm.sendOk("你必须要40级以上才能进行挑战");
					cm.dispose();
					return;
				}
				if (selection < 3 && cm.getPlayer().getLevel() > 60) {
					cm.sendOk("只有60级以上才能挑战困难模式");
					cm.dispose();
					return;
				} 
				if (selection == 1) mode = "NORMAL";
				else if (selection == 2) mode = "HARD";
				else if (selection == 3) mode = "HELL";
	
				if (!cm.start_PyramidSubway(selection)) {
					cm.sendOk("此模式的所有房间都已满，请稍后再试或在其他频道上重试。");
				}
				cm.dispose();
			}
		} else if (status == 3) {
			cm.dispose();
		}
	} else if (cm.getMapId() == 926020001) {
		if (status == 0) {
			if (selection == 0) 
				cm.dispose();//:(
			else if (selection == 1) 
				cm.sendNext("我要把#b白雪人法老的黄水晶#k给你。这样你随时都可以用这块宝石进入白雪人法老的坟墓。请检查其他栏中是否至少有一个空位。");
			
		} else if (status == 1) {
			var itemid = 4001325;
			if (cm.getPlayer().getLevel() >= 60) itemid = 4001325;
			if (cm.canHold(itemid)) {
				cm.gainItem(itemid);
				cm.warp(926010000);
			} else 
				cm.showInfoText("您必须在其他栏中至少有一个空位才能获得奖励。");
			
			cm.dispose();
		}
	} else {
			cm.warp(926010000);
			cm.getPlayer().setPartyQuest(null);
			cm.dispose();
	}
}/*Do you want to forfeit the challenge and leave?

Your allotted time has passed. Do you want to leave now?



*/