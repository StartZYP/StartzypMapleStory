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
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 210;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 2;

function start() {
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
            cm.sendNext("想成为#r魔法师#k吗?有一些标准需要满足.因为我们不能接受…#b你的等级应该达到8级#k,与获得" + cm.getFirstJobStatRequirement(jobType) +"作为你的首要条件.让我们看看你的能力."); 
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("我看你干得不错。我将允许你在漫长的道路上迈出下一步。");
            else if (cm.haveItem(4031009)){
                cm.sendOk("去看看 #b#p1072001##k.");
                cm.dispose();
            } else
                cm.sendNext("你取得的进步是惊人的。");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("你就在那里。几天前， 冰峰雪域的#b#p2020009##k人跟我谈过你。我看到你对第三次晋升魔术师的开明工作很感兴趣。为了实现这个目标，我必须测试一下你的能力，看看你是否有资格获得晋升。在维多利亚岛的邪恶森林深处有一个开口，它会带你到一个秘密通道。一旦进去，你就会面对一个克隆的我。你的任务是打败他，然后带来 #b#t4031059##k 回来跟你.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("请给我拿来 #b#t4031059##k 从我的分身。你可以在一个深埋于邪恶森林中的太空洞穴中找到他。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("不错的工作。你打败了我的分身#b#t4031059##k 安全回来。现在你已经证明了你是值得第三次升职的。现在你应该把这条项链给 #b#p2020011##k 在奥斯兰接受第二部分的测试。祝你好运。你会需要它.");
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
    } else if (mode == 0 && type == 0) {
        status -= 2;
    }
    
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起，你没有足够的金币来购买你在冒险岛荣耀大厅的位置。");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("你走吧!希望你会喜欢它。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉，冒险岛光荣大厅现在已经满了…");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道没有其他选择…");
                if (!(mode == 0 && type == 0)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("哦…!你看起来绝对可以成为我们的一部分……你只需要一点邪恶的头脑，然后…是的…你怎么看?想成为魔法师吗?");
            } else {
                cm.sendOk("多训练一点，直到你达到基本要求，我可以告诉你的方式 #r魔法师#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1372043)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这里开始，你是我们的一部分!你将在……过着流浪者的生活。但是你要尽快有耐心，你会过上好日子的。好吧，不是很多，但我会给你一些我的能力…呵呵哈哈 ! ! !");
            } else {
                cm.sendNext("在你的背包里留点空间，然后和我谈谈。");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("你现在强壮多了。我为你的每个背包栏都增加了空间。你自己去看看。我只是给了你们一点 #b技能点#k. 当你打开 #b技能#k 菜单在屏幕的左下角，有技能你可以学习使用SP的。不过，有一个警告:你不可能一次提出所有问题。还有一些技能，你只有在掌握了一些技能之后才能掌握。");
        else if (status == 3)
            cm.sendNextPrev("但要记住，技能不是一切。你的能力应该支持你的技能，作为一个魔法师，使用智力作为他们的主要属性，运气作为他们的次要属性。如果提升属性很困难，就使用#b自动分配#k.");
        else if (status == 4)
            cm.sendNextPrev("现在，再给你一个警告。如果你从现在开始在战斗中失败，你将会失去一部分经验值。要特别注意这一点，因为你的血量比大多数人都少。");
        else if (status == 5)
            cm.sendNextPrev("这就是我能教你的。祝你旅途好运，年轻的魔法师。");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("好吧，当你做出决定后，在下面点击 [我要转职].#b\r\n#L0#什么是法师 (火 / 毒).\r\n#L1#什么是法师 (冰 / 雷)\r\n#L2#什么是牧师\r\n#L3#我要转职");
            else {
                cm.sendNext("很好的决定。你看起来很强壮，但我需要看看你是否真的足够强壮，能通过考试，这不是一个困难的考试，所以你会做得很好。给，先拿我的信。。。一定不要丢了！");
		if(!cm.isQuestStarted(100006)) cm.startQuest(100006);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031009)){
                    if(!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("请把这封信送到#b#p1072001##k,到#b#m101020000##k把信给他,他就代替我来考验你.祝你好运.");
                } else {
                    cm.sendNext("请在你的背包中留出一些空间.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {
                        cm.sendNext("法师(火/毒)的魔法：#k\r\n\r\n#b法师#是一个可以造成魔法,元素伤害的职业.这些能力使他们在对付弱小的敌人时有了显著的优势. 用他们的技能#r精神力#k和#r缓慢术#k,#b法师#k可以增加魔法攻击并降低对手的移动能力. #b法师(火/毒)#k可以使用强大的火属性攻击和毒属性攻击的技能.");    //f/p mage
                    } else if(selection == 1) {
                        cm.sendNext("法师(冰/雷)的魔法：#k\r\n\r\n#b法师#k是一个可以造成魔法,元素伤害的职业, 这些能力使他们在对付弱小的敌人时有了显著的优势. 用他们的技能#r精神力#k和#r缓慢术, #b法师#k可以增加魔法攻击并降低对手的移动能力. #b法师(冰/雷)#k可以使用强大的冰属性攻击和雷属性攻击的技能.");    //i/l mage
                    } else {
                        cm.sendNext("牧师具有#r神圣的魔法#k.\r\n\r\n#b牧师#k 是一个强大的神圣技能，一定会被任何组队接受。因为他们有能力 #r治愈术#k 他们自己和组队其他人。使用#r祝福#k, #b牧师#k可以提高属性并减少伤害。如果你觉得这门课很难生存，那就值得去上。 #b牧师#k 对黑暗系怪物特别有效。");    //cleric
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("现在。。。你下定决心了吗？请选择要为第二次升职选择的工作. #b\r\n#L0#法师 (火 / 毒)\r\n#L1#法师 (冰 / 雷)\r\n#L2#牧师");
            }
        } else if (status == 2){
            if (cm.haveItem(4031009)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("所以你想把第二次转职转为" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b法师 (冰 / 雷)#k" : "#b牧师#k") + "? 你知道一旦你在这里下了决心,你就不能为第二次升职选择不同的工作了,对吗?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("好吧，你已经转为了" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b法师 (冰 / 雷)#k" : "#b牧师#k") + "从这里开始.法师和巫师是一群具有不可思议的魔法能力的聪明人,能够轻松地刺穿怪物的心灵和心理结构...请每天训练自己.我会帮助你变得比现在更强大.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给了你一本书，上面列出了你作为一个" + (job == 210 ? "#b法师 (火 / 毒)#k" : job == 220 ? "#b法师 (冰 / 雷)#k" : "#b牧师#k") + ". 另外你HP和MP也增加了。你自己去看看吧。");
        else if (status == 5)
            cm.sendNextPrev("我也给了你一点SP。打开位于右下角的技能栏。你将能够提高新获得的二级技能。不过，有些技能只有在你学会了其他技能之后才能使用。一定要记住。");
        else if (status == 6)
            cm.sendNextPrev((job == 210 ? "法师 (火 / 毒)" : job == 220 ? "法师 (冰 / 雷)" : "牧师") + " 需要坚强。但要记住，你不能滥用权力，把它用在弱者身上。请以正确的方式使用你巨大的力量，因为。。。对你来说，用正确的方式，这比变得更强大要硬得多。你再往前走，请找我。我会等你的。");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("既然他是我的分身，你可以期待一场艰苦的战斗。他使用了许多你从未见过的特殊攻击技能，你的任务是成功地一对一地攻击他。秘密通道是有期限的，所以你必须在期限内打败他。我祝你好运，我希望你带来#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}