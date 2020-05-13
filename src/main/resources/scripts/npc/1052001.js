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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你已经走了很长的路去获得你今天所拥有的力量、智慧和勇气，不是吗？ 你现在感觉怎么样？ #r一个名人堂的 NPC 举着你现在的角色形象#k? 你喜欢吗?";
        if(spawnPnpcFee > 0) {
            sendStr += " 我能为你做到的, 为了这 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想成为 #r飞侠#k? 前提条件是你必须是新手而且... #b等级必须为10#k. 让我看看.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("我看你干得不错，进行下一步吧。");
            else if (cm.haveItem(4031011)){
                cm.sendOk("去找 #b#p1072003##k.");
                cm.dispose();
            } else
                cm.sendNext("你的进步真是惊人的速度.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("There you are. A few days ago, #b#p2020011##k of Ossyria talked to me about you. 我看到你对飞侠三转感兴趣。为了实现这一目标，我必须考验你的力量，看看你是否值得提升。金银岛的一个深沼泽中间有一个开口（猴子沼泽地II）, 它会带你到一个秘密通道. 一旦进入，你将面对我的分身。你的任务是打败他并带回 #b#t4031059##k 给我.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("速度，快去找 #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("干的漂亮，你已经打败了我的分身并带回来了#b#t4031059##k . 你已经证明了你有能力胜任3转职业，现在你应该吧这个项链给冰封雪域的#b#p2020011##k ，然后接受第二轮考验.祝你好运！");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
        } else {
            cm.sendOk("你的职业选择是明智的.");
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
                    cm.sendOk("你没有足够的钱。");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("快去看看吧，希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起，名人堂已经满员了...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道没有别的选择...");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType))
                cm.sendYesNo("哦，你看起来可以成为我们得一员，你确定要成为飞侠吗？");
            else {
                cm.sendOk("快去进行训练吧，到时候我可以告诉你如何成为 #r飞侠#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])){
                if (cm.getJobId() == 0){
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("好的，从今天开始，昵称为了我们的一员，过着流浪的生活，但是只要你有耐心你会过上好日子，好吧，我会教你一些我的能力。。。。");
            } else {
                cm.sendNext("给你的背包腾出点位置，然后再跟我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("你现在比之前强壮多了，我已经送给你了新手飞侠的必备武器与暗器，也给你的背包加了一列，你自己去看看。我教给你了一些技能。你可以打开屏幕右下角的 #b技能#k 菜单查看, 你可以使用SP学习技能，不过有一个警告：有一些技能需要学习了其他技能才可以学习。");
        else if (status == 3)
            cm.sendNextPrev("现在提醒你，一旦你做出了选择，将不可变更。");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("好的，当你想好了之后点击 [选择职业] .#b\r\n#L0#请给我讲解一下刺客\r\n#L1#请给我讲解一下侠客.\r\n#L3#选择职业!");
            else {
                cm.sendNext("好的，你看起来很强，但是我需要看看你是否真的足够强来通过考试，z");
		if(!cm.isQuestStarted(100009)) cm.startQuest(100009);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031011)){
                    if(!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("请把这封信给 #b#p1072003##k 他就在 #b#m102040000##k 附近. 他会代替我考验你.");
                } else {
                    cm.sendNext("请检查一下你的背包.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {    //assassin
                        cm.sendNext("刺客使用的是 #r拳套#k.\r\n\r\n#b刺客#k 属于远程攻击. 拥有相当高的命中率和良好的攻击力，但花钱比侠客高一点.");
                    } else if(selection == 1) {    //bandit
                        cm.sendNext("侠客使用的是 #r短刀#k.\r\n\r\n#b侠客#k 是在二转职业中很强大的一个. 他不像刺客那样中庸，也没有远程攻击的优势，但是可以用强大的力量来弥补。");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("现在。。你决定了吗？请选择你的职业 #b\r\n#L0#刺客\r\n#L1#侠客");
            }
        } else if (status == 2){
            if (cm.haveItem(4031011)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你想进行二转 " + (job == 410 ? "#b刺客#k" : "#b侠客#k") + "? 一旦做出了选择，不能后悔。");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
	    cm.completeQuest(100011);
            
            if(job == 410) cm.sendNext("好了，从今天开始你就是刺客了。");
            else cm.sendNext("好了，从现在开始你就是侠客了。");
            
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给了你一本书，上面列出了你可以作为刺客或强盗获得的技能列表。另外，您的其他库存也通过添加另一行来扩展。你的最大生命值和MP也增加了。你自己去看看。");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "Assassin" : "Bandit") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("因为他是我的分身，所以你可以期待一场艰苦的战斗。他使用了许多你从未见过的特殊攻击技能，你的任务是成功地一对一地攻击他。秘密通道有期限，所以在期限内击败他是至关重要的。祝你好运，我希望你能带回来 #b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}