/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Mark the Toy Soldier - Doll's House(922000010)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var havePendulum = false;
var complete = false;
var inQuest = false;

function start() {
    if(cm.getQuestStatus(3230) == 1) {
	inQuest = true;
    } else {
	inQuest = false;
    }
    dh = cm.getEventManager("DollHouse");
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 0 && status == 0) {
	cm.dispose();
	return;
    } else if(mode == 0 && status == 1) {
	cm.sendNext("我就知道你会留下来。完成你已经开始的事情是很重要的！现在，请去寻找不同的玩具屋，打破它，并带来#b#t4031094##k给我!");
	cm.dispose();
	return;
    }
    if(mode == 1) {
	status++;
    } else {
	status--;
    }
    if(inQuest == true) {
	if(status == 0) {
	    if(cm.haveItem(4031094)) {
		cm.sendNext("哦，哇，你确实找到了看起来不同的玩具屋#b#t4031094##k!太不可思议了！！有了这个，路德钟塔将再次运行！谢谢你的工作，这是对你努力的一点奖励。在那之前，通过，请检查您的背包蓝，看看是否已满。");
		havePendulum = true;
	    } else {
		cm.sendSimple("你好，我是#b#p2040028##k,负责保护这个房间。在里面，你会看到一堆玩具屋，你可能会发现其中一个看起来有点不同于其他玩具屋。你的工作是找到它，打破它的门，找到#b#t4031094##k,它是路德钟塔不可分割的一部分。你会有时间限制的，如果你打破了错误的玩具屋，你会被迫回到外面，所以请小心。\r\n#L0##b我想离开这里。#k#l");
	    }
	} else if(status == 1) {
	    if(havePendulum == true) {
		if(!cm.canHold(2000010)) {
		    cm.sendNext("你拿不住这个东西？？？");
		}
		cm.sendNextPrev("你怎么认为？你想要我给你#b100个#t2000010#s#k吗?非常感谢你帮助我们。由于你的英勇努力，钟楼将再次运行，而来自另一个维度的怪物似乎也消失了。我现在就放你出去。回头见！");
		if(complete == false) {
		    cm.completeQuest(3230);
		    cm.gainExp(2400);
		    cm.gainItem(4031094, -1);
		    cm.gainItem(2000010, 100);
		    complete = true;
		}
	    } else {
		cm.sendYesNo("你确定现在要放弃吗？那好吧。。。但请记住，下次你参观这个地方时，玩具屋会换个地方，你必须再仔细地看一遍每个玩具屋。你怎么认为？你还想离开这个地方吗？");
	    }
	} else if(status == 2) {
	    if( cm.getPlayer().getEventInstance() != null)
	        cm.getPlayer().getEventInstance().removePlayer(cm.getChar());
	    cm.dispose();
	}
    } else {
	if(status == 0) {
	    cm.sendNext("什么。。。我们一直禁止人们进入这个房间，因为另一个维度的怪物正藏在这里。我不知道你是怎么进来的，但我得请你马上离开，因为在这个房间里很危险。");
	} else if(status == 1) {
	    cm.warp(221024400, 4);
	    cm.dispose();
	}
    }
}
