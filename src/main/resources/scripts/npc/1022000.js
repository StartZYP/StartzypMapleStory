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
/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 110;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 1;

function start() {
	if (cm.isQuestStarted(4710) && !cm.isQuestFinished(4711)) {
         cm.forceStartQuest(4711);
		 cm.dispose();
        return;
        } 
	if (cm.isQuestStarted(4720) && !cm.isQuestFinished(4721)) {
         cm.forceStartQuest(4721);
		 cm.dispose();
        return;
        } 
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你已经走了很长的路来获得你今天所拥有的力量、智慧和勇气，不是吗?你觉得现在怎么样 #r冒险岛荣耀大厅，持有你当前角色的图像#k? 你喜欢吗?";
        if(spawnPnpcFee > 0) {
            sendStr += " 我可以为你做这件事 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想成为#r战士#k吗?有一些标准需要满足.因为我们不能接受…#b你的等级应该达到10级#k,与获得" + cm.getFirstJobStatRequirement(jobType) +"作为你的首要条件.让我们看看你的能力."); 
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("哦。。。你安全回来了！我就知道你会慢慢过去的。我承认，你是一个强大，强大的战士！好吧，我会让你成为比现在更强大的战士。但在此之前，你需要从三条路径中选择一条。这不是一件容易的事，所以如果你有问题，可以随便问。");
            else if (cm.haveItem(4031008)){
                cm.sendOk("去看看#b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("你所取得的进步是惊人的.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("我在等你。几天前，我从#b#p2020008##k 好。。。我想测试一下你的力量。蚂蚁洞附近有一条秘密通道。只有你才能进入那条通道。如果你进入通道，将遇到我的分身。打败他，带上#b#t4031059##k回来找我.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("Please, bring me the #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("真的。。。你打败了我的分身#b#t4031059##k,对我来说。很好！这肯定证明了你的力量。就实力而言，你已经准备好升入第三份工作了。正如我所承诺的，我会给你#b#t4031057##k对你来说。把这条项链给#b#p2020008##k,你将能够接受第三次转职的第二次考验。祝你好运~");
        } else {
            cm.sendOk("你的选择很明智。");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }
    
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起，你没有足够的金币在冒险岛荣耀大厅买你的位子.");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("There you go! Hope you will like it.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起，荣耀大厅现在满了。。。");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("Make up your mind and visit me again.");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("这是一个重要的也是最后的选择。你不能回头。");
            } else {
                cm.sendOk("再训练一点直到你达到基本要求，我可以告诉你#r战士#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1302077)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("从这里开始，你要去勇士之路。这不是一项容易的工作，但如果你对自己的身体和技能有纪律和信心，你将克服你道路上的任何困难。去吧，年轻的勇士!");
            } else {
                cm.sendNext("在你的背包中清理一些空间后再来和我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("你现在变得更强壮了。我刚刚给了你一点SP。当你打开屏幕右下角的技能栏时，你可以通过使用SP来学习一些技巧。不过，有一个警告：有一些技能只有在你先学会了一些技能之后才能获得。");
        else if (status == 3)
            cm.sendNextPrev("现在提醒你。一旦你选择了，你就不能改变主意，尝试选择另一条路。现在就去，做一个骄傲的战士。");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("好吧，当你做了决定, 点击下面的#b[我要转职]#b\r\n#L0#关于剑客\r\n#L1#关于准骑士\r\n#L2#关于枪战士\r\n#L3#我要转职");
            else {
                cm.sendNext("很好的决定。你看起来很强壮，但我需要看看你是否真的足够强壮，能通过考试，这不是一个困难的考试，所以你会做得很好。给，先拿我的信。。。一定不要丢了！");
		if(!cm.isQuestStarted(100003)) cm.startQuest(100003);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031008)){
                    if(!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("请把这封信送到#b#p1072000##k，在#b#m102020300##k附近， 把信给他，他就代替我来考验你。祝你好运。");
                } else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {    //fighter
                        cm.sendNext("掌握剑和斧头的战士.\r\n\r\n#r剑客#k会使用#b愤怒之火#k, 使你的的武器攻击得到提高。#b伤害反击#k减少40%的触碰伤害，并将其伤害反击给怪物。这就是为什么剑客被认为是强大的主要原因。");
                    } else if(selection == 1) {    //page
                        cm.sendNext("掌握剑和钝器的战士.\r\n\r\n#r准骑士#k会使用#b压制术#k,将敌人的武器防御和武器攻击降低的技能；主要用于降低对你造成的伤害。#b伤害反击#k减少40%的触碰伤害，并将其伤害反击给怪物。这就是为什么准骑士被认为是强大的主要原因。");
                    } else {    //spearman
                        cm.sendNext("掌握枪或矛的战士\r\n\r\n#r枪战士#k会使用#b神圣之火#k,使你和你的队友的最大生命值提高60%。这项技能对于组队的飞侠、海盗、弓箭手和法师特别有用，在组队以及BOSS战斗中的更多攻击中生存特别有用。枪战士还可以使用#b极限防御#k，它基本上是一个类似的祝福的技能，持续时间多100秒，但没有剑客或准骑士的减少伤害加成。即使这项技能发挥到极致，也不足以在组队中发挥强大作用，这也是为什么枪战士不能独行的原因。.");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("现在。。。你下定决心了吗？请选择您希望为第二次升职选择的工作。 #b\r\n#L0#剑客\r\n#L1#准骑士\r\n#L2#枪战士");
            }
        } else if (status == 2){
            if (cm.haveItem(4031008)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你想把第二次转职转为" + (job == 110 ? "#b剑客#k" : job == 120 ? "#b准骑士#k" : "#b枪战士#k") + "? 你知道一旦你在这里下了决心，你就不能反悔，你确定吗？");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
	    cm.completeQuest(100005);
            
            if(job == 110) cm.sendNext("好吧，你现在成了#b剑客#k. 斗士努力成为强者中的强者，从不停止战斗。永远不要失去战斗的意志，我会帮助你变得比现在更强大。");
            else if(job == 120) cm.sendNext("好吧，你现在成了#b准骑士#k.佩奇有很高的智商和勇气，我希望你能在整个旅程中运用到正确的道路上。我会帮助你变得比现在强大得多。");
            else cm.sendNext("好吧，你现在成了#b枪战士#k。枪战士用黑暗的力量来消灭敌人，总是在黑暗中。。。在旅途中，请相信你自己和你那令人敬畏的力量。我会帮助你变得比现在更强壮。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给了你一本书，上面列出了你作为一个" + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + ". 另外，你的HP和MP也增加了。你自己去看看吧。");
        else if (status == 5)
            cm.sendNextPrev("我也给了你一点SP。打开位于左下角的技能栏。你将能够提高新获得的二级技能。不过，有些技能只有在你学会了其他技能之后才能使用。一定要记住。");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "需要坚强。但要记住，你不能滥用你的力量，把它用在弱者身上。请以正确的方式使用你巨大的力量，因为。。。对你来说，用正确的方式，这比变得更强大要硬得多。你再往前走，请找我。我会等你的。");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("我的另一个我很坚强。他使用很多特殊技能，你应该和他一对一的战斗。然而，人们不能在秘密通道里呆太久，所以尽快打败他是很重要的。好。。。祝你好运，我期待你带来#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/* 3th Job Part
	PORTAL 20 MINUTES.
 */