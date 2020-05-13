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

/*      Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 310;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 3;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你已经走了很长一段路，才能达到今天的力量、智慧和勇气，不是吗？你觉得现在有什么 #ra NPC 在弓箭手培训中心里保持你现在的形象#k? 你喜欢吗？";
        if(spawnPnpcFee > 0) {
            sendStr += "我可以为你做，收费 #b " + cm.numberWithCommas(spawnPnpcFee) + "金币.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想选择#r弓箭手#k吗？有一些标准需要满足，#b你需要达到10级，" + cm.getFirstJobStatRequirement(jobType) + "点#k，让我们看看。");  
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("哈哈…我就知道你会轻松通过考试的。我承认，你是一个伟大的弓箭手。我会让你比现在更强壮。但在那之前。。。你需要从给你的两条路中选择一条。这对你来说是个艰难的决定，但是。。。如果有什么问题要问，请问。");
            else if (cm.haveItem(4031011)){
                cm.sendOk("去看看#b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("嗯。。。自从我上次见到你以来，你已经长大了很多。我没有看到我以前看到的弱者，相反，现在看起来更像一个弓箭手。你觉得呢？难道你不想变得更强大吗？通过一个简单的测试，我会为你做的。你想继续吗？");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("给你.几天前,冰峰雪域的#b#p2020010##k跟我谈起了你.我知道你对弓箭手第三次转职的有着较大的兴趣.为了达到这个目标,我必须测试你的力量，看看能否达到转职要求。在维多利亚岛的一片深邃的森林中间有一个洞口,它会把你引向一条秘密通道.一旦进入,你将面我的分身.你的任务是打败她，获取#b#t4031059##k后回到我的身边.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("Please, bring me the #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("恭喜你，你打败了我的分身，获取#b#t4031059##k后安全返回。你现在已经证明了自己值得第三次晋升从身体的角度来看。现在你应该把这条项链给 #b#p2020011##k在冰峰雪域接受第二部分的测试。祝你好运。你会需要的。");
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
                    cm.sendOk("对不起，你没有足够的介子来购买你在名人堂的位置。");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("给你！希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("Sorry, the Hall of Fame is currently full...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道没有别的选择。。。");
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
                cm.sendNextPrev("一旦转职了就不能反悔。");
            } else {
                cm.sendOk("再训练一点直到你达到基本要求，我可以告诉你#rBowman#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1452051) && cm.canHold(2070000)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(300);
                    cm.gainItem(1452051, 1);
                    cm.gainItem(2060000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这里开始，你成为我们的一部分！你将....继续接受训练，但只要耐心一点，你会变得更强大。好吧，没什么，但我会给你一些我的能力。。。哈哈！！！");
            } else {
                cm.sendNext("在你的背包里腾出点地方来和我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("你现在变得更强大了,我给了你一点点#b能力值#k. 当你打开#b技能#k 菜单在屏幕的左下角,您可以使用SP'.不过,有一个警告:你不可能一下子把它都提起来.也有一些技能只有在你先学会了一些技能之后才能获得.");
	else if (status == 3)
            cm.sendNextPrev("现在提醒你。一旦你选择了，你就不能改变主意，尝试选择另一条路。去吧，做一个骄傲的弓箭手。");
        else
            cm.dispose();    
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("好吧，当你做出决定后，在下面点击#b[选择我的职业].#b\r\n#L0#我想了解猎人\r\n#L1#我想了解弩弓手\r\n#L3#选择职业");
            else {
                cm.sendNext("很好的决定。你看起来很强壮，但我需要看看你是否真的足够强壮，能通过考试，这不是一个困难的考试，所以你会做得很好。给，先拿我的信。。。一定不要丢了！");
		if(!cm.isQuestStarted(100000)) cm.startQuest(100000);
	   }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031010)){
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("请把这封信送到#b#p1072002##k，她在#b#m106010000##k附近。把信给她，她就代替我来考验你。祝你好运。");
		    cm.dispose();
		} else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3){
                    if(selection == 0) {    //hunter
                        cm.sendNext("使用弓的弓箭手.\r\n\r\n#b猎手#k在早期阶段拥有着的群体输出技能,攻击速度更快,#b猎人#k的#r爆炸箭#k技能, 一个稍微弱一点的技能,但可以使6个敌人被击晕.");
                    } else if(selection == 1) {    //crossbowman
                        cm.sendNext("掌握弩的弓箭手.\r\n\r\n#b弩弓手#k与猎人相比,你的攻击力会随着等级的提高而提高.#b弩弓手#k的#r穿透箭#k,不以敌人为家,但能穿墙而带来的更猛烈的攻击.");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("现在。。。你下定决心了吗？请选择你希望转的职业。#b\r\n#L0#猎人\r\n#L1#弩弓手");
            }
        } else if (status == 2){
            job += selection * 10;
            cm.sendYesNo("所以你想把第二份工作提升为" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "? 你知道一旦你在这里下了决心，你就不能反悔重新选择其他职业了，对吧？");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            
            cm.sendNext("好吧，你想选择" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "从这里开始。" + (job == 310 ? "#b猎人#k" : "#b弩弓手#k") + "聪明的一群人有着不可思议的视力，能够轻松地刺穿怪物的心脏。。。请每天训练自己。我会帮助你变得比现在更强大。");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给了你一本书,上面列出了你可以获得的技能,比如" + (job == 310 ? "hunter" : "crossbowman") + "你的HP和MP也增加了.你自己去看看吧.");
        else if (status == 5)
            cm.sendNextPrev("我也给了你一点#bSP#k. 打开#b技能栏#k位于右下角.你将能够提高新获得的二转技能。不过,一定要记住,有些技能只有在你学会了其他技能之后才能使用.");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "猎人" : "弩弓手") + "需要坚强。但要记住，你不能滥用权力，把它用在弱者身上。请以正确的方式使用你巨大的力量，因为。。。对你来说，用正确的方式，这比变得更强大要硬得多。你再往前走，请找我。我会等你的。");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("既然她是我的复制品，你可以期待一场艰难的战斗。他使用了许多你从未见过的特殊攻击技能，你的任务是成功地一对一地攻击他。秘密通道是有期限的，所以你必须在期限内打败他。我祝你好运，我希望你带来#b#t4031059##k与你.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
