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

status = -1;
var job;
var sel;
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 2;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("你好。");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
	    actionx["Mental"] = true;
	else if (cm.haveItem(4031057))
	    actionx["Physical"] = true;
    cm.sendSimple("需要帮助吗？#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想要进行第三次转职。" : "") + "\r\n#L1#我想进行扎昆任务。");
}

function action(mode, type, selection){
    status++;
	if (mode == 0 && type == 0) {
	    status -= 2;
	} else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
	    if (mode == 0 && type == 1)
		    cm.sendNext("下定决心");
	    cm.dispose();
		return;
	}
	if (actionx["Mental"]){
	    if (status == 0)
		    cm.sendNext("很好的完成了测试的心理部分。你明智地回答了所有的问题。我必须说，你在那里表现出的智慧水平给我留下了深刻的印象。请先把项链递给我，然后我们再走下一步。");
		else if (status == 1)
			cm.sendYesNo("可以！现在，你将通过我变成一个更强大的冒险家。不过，在做这件事之前，请确保你的技能点已经被彻底使用，你至少需要用尽所有技能点，直到70级，才能进行第三次转职。哦，既然你已经选择了第二次转职的职业，你就不必再为第三转职的职业进行选择了。你想现在就第三次转职吗？");
		else if (status == 2) {
		    if (cm.getPlayer().getRemainingSp() > 0)
			    if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
				    cm.sendNext("请在继续之前使用所有技能点。");
					cm.dispose();
					return;
				}
		    if (cm.getJobId() % 10 == 0) {
		        cm.gainItem(4031058, -1);
		        cm.changeJobById(cm.getJobId() + 1);
				cm.getPlayer().removePartyQuestItem("JBQ");
			}
                        
			if(Math.floor(cm.getJobId() / 10) == 21) cm.sendNext("恭喜你，你现在是一名#b火毒法师#k了.新技能书以新的和改进的基于火和毒药的法术为特色，以及诸如#b魔力激化#k(改进的基于元素的法术)和#b魔法狂暴#k(提高攻击法术的整体速度)会让你快速有效的攻击怪物。防御法术，如#b自然力重置#k(使你在某些基于元素的攻击中变得更强)和#b封印术#k(封住怪物)有助于消除法师的一个弱点：生命值不足。");
                        else if(Math.floor(cm.getJobId() / 10) == 22) cm.sendNext("恭喜你，你现在是一名#b冰雷法师#k了.新技能书的特色是新的和改进的冰和闪电法术，以及诸如#b魔力激化#k(改进的基于元素的法术)和#b魔法狂暴#k(提高攻击法术的整体速度)会让你快速有效的攻击怪物。防御法术，如#b自然力重置#k(使你在某些基于元素的攻击中变得更强)和#b封印术#k(封住怪物)有助于消除法师的一个弱点：生命值不足。");
                        else cm.sendNext("恭喜你，你现在是一名#b祭司#k了.新技能书的特点是新的和改进的神圣咒语，如#b圣光#k和#b圣龙召唤#k,以及诸如#b时空门#k(制造通向最近村落的时空门)和#b神圣祈祷#k(得到更多的经验值)可能对组队至关重要。还有如#b巫毒术#k(把怪物变成蜗牛)等。对比其他职业，牧师魔法师中比较特殊的职业。");
		} else if (status == 3) {
		    cm.sendNextPrev("我也给了你一些技能点和能力值，这将帮助你开始。你现在真的成了一个强大的魔法师。不过，请记住，现实世界将等待你的到来，还有更艰难的障碍要克服。一旦你觉得你不能训练自己去更高的地方，那么，只有这样，来见我。我会在这里等你。");
		}
	}else if (actionx["Physical"]){
	    if (status == 0)
	        cm.sendNext("很好的完成了测试的物理部分。我就知道你能做到。既然你已经通过了上半部分的考试，下面是下半部分。请先把项链给我。");
		else if (status == 1){
		    if (cm.haveItem(4031057)){
		        cm.gainItem(4031057, -1);
				cm.getPlayer().setPartyQuestItemObtained("JBQ");
			}
			cm.sendNextPrev("这是考试的后半部分。这项测试将决定你是否足够聪明，能够迈出迈向成功的下一步。在冰封雪域的雪原上有一个被雪覆盖的黑暗区域，叫做圣地，连怪物都无法到达。在这个区域的中心有一块巨大的石头，叫做圣石。你需要提供一个特殊的项目作为祭品，然后圣石将测试你的智慧。");
		} else if (status == 2)
		    cm.sendNextPrev("你需要诚实而坚定地回答每一个问题。如果你正确回答了所有的问题，那么圣石会正式接受你并把你交给你#b#t4031058##k.把项链拿回来，我会帮你走到下一步。祝你好运。");
	} else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0){
	    cm.sendNext("去跟#b#p1032001##k对话，并把#b#t4031057##k带回来给我.");
		cm.dispose();
	} else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0){
	    cm.sendNext("去跟#b#p2030006##k对话，并把#b#t4031058##k带回来给我.");
		cm.dispose();
	} else {
	    if (sel == undefined)
		    sel = selection;
	    if (sel == 0){
	        if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0){
	            if (status == 0)
	                cm.sendYesNo("欢迎你，我是#b#p2020009##k,魔法师的教官,愿意与倾听的人分享我的街头知识和艰苦的生活。你似乎已经准备好大跃进，准备迎接第三次升职的挑战。太多魔法师来了又走，无法达到第三职业转职的标准。你呢？你准备好接受考验并获得第三次转职了吗？");
	            else if (status == 1){
		            cm.getPlayer().setPartyQuestItemObtained("JB3");
	                cm.sendNext("很好。你将接受魔法师两个重要方面的考验：力量和智慧。我现在给你解释一下测试的物理部分。你还记得魔法密林的#b#p1032001##k吗?去见他，他会告诉你考试前半部分的细节。请完成任务，然后从#p1032001#k把#b#t4031057##k带回来给我.");
	            } else if (status == 2)
	                cm.sendNextPrev("只有你通过了身体部分的测试，心理部分的测试才能开始。#b#t4031057##k将证明你确实通过了考试。我会让#b#p1032001##k对你进行测试。在你到达目的地之前，做好准备。这不容易，但我对你有极大的信心。祝你好运。");
			}
            } else {
                if (cm.getPlayer().getLevel() >= 50){
            	    cm.sendOk("长老会让你挑战扎昆，祝你一切顺利。");
                    if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                    if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
                }else
                    cm.sendOk("你太虚弱了，无法挑战#r扎昆#k. 至少达到#b50级#k以后，再与我交谈。");
                cm.dispose();
            }
	}
}