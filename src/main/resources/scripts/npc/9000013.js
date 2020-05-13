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
/*      Author:                 Xterminator, Moogra
	NPC Name: 		Tony
	Map(s): 		Maple Road: Southperry (60000)
	Description: 	        Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("你好，我是 #b托尼#k, 如果你不忙。。。那我可以和你一起出去玩吗？我听说有人在这附近聚集要复仇，但我不想一个人去那里。。。你想和我一起去看看吗?");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
cm.sendSimple("呵呵？什么样的活动？嗯，那是...\r\n#L0##e1.#n#b 这是什么样的活动?#k#l\r\n#L1##e2.#n#b 告诉我详细的活动信息.#k#l\r\n#L2##e3.#n#b 好吧，我们出发!#k#l");
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNext("整个月，MapleStory 都在庆祝三周年！GM将在整个活动中举办惊喜的GM活动，因此请保持警惕，确保至少参加其中一个活动以获得大奖!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("这项赛事有很多比赛。在你玩这个游戏之前先知道怎么玩它会帮你很多。选择一个你想知道更多的! #b\r\n#L0# Ola Ola#l\r\n#L1# 跳一跳#l\r\n#L2# 雪球大战#l\r\n#L3# 椰子收获#l\r\n#L4# OX 答题#l\r\n#L5# 寻宝#l#k");
            } else if (selection == 2) {
                cm.sendNext("该活动尚未开始，您已经拥有了“机密列表”，或者您在过去24小时内已经参加了该活动。请稍后再试!");
                cm.dispose();
            }
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("#b[Ola Ola]#k 是一个游戏，参与者爬梯子到达顶部。从众多可用的入口中选择正确的入口，向上爬并进入下一层. \r\n\r\n游戏分为三个等级，时间限制是 #b6 分钟#k. 在 [Ola Ola], 你#b无法使用药剂或物品跳跃、传送、加速或提升你的速度#k. 也有一些陷阱会把你带到一个陌生的地方，所以请注意.");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[枫之谷跳一跳活动] 是一场穿越障碍的比赛#k 就像耐心的森林。你可以克服各种障碍，在规定的时间内到达目的地. \r\n\r\n游戏分为四个等级，时间限制是 #b15 分钟#k. 在[枫之谷跳一跳活动]中, 你将无法使用传送或加速.");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[雪球大作战]#k 由两支队伍组成,两支队伍在有限的时间内把雪球滚得越来越大#k. 如果比赛不能在规定的时间内决定，那么把雪球滚得更远的队获胜. \r\n\r\n把雪卷起来，按一下#bCtrl#k. 所有远程攻击和基于技能的攻击在这里都不起作用, #b只有近距离攻击才有效#k. \r\n\r\n如果一个角色碰到雪球，他/她将被送回起点。在出发点前攻击雪人，防止对方向前滚雪。这是一个计划周密的策略，因为团队将决定是攻击雪球还是雪人.");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[椰子收获]#k 由枫树队和故事队两支队伍组成，两支队伍齐心协力，看谁收集的椰子最多#k. 期限是 #b5 分钟#k. 如果比赛以平局结束，另加一个 2 分钟时间，然后会根据记录以确定获胜者. 如果由于某种原因比分保持平局，那么比赛将以平局告终. \r\n\r\n所有远程攻击和基于技能的攻击在这里都不起作用, #b只有近距离攻击才有效#k. 如果你没有近程攻击的武器，你可以通过事件地图中的NPC购买。不管你的性格、武器或技能如何，所有的伤害都是一样的.\r\n\r\n小心地图上的障碍物和陷阱。如果角色在游戏中死亡，则该角色将从游戏中退出。在椰子掉落前最后一击的玩家获胜。只有击中地面的椰子才算，这意味着不会从树上掉下来的椰子，或者偶尔爆炸的椰子也不算。在地图底部的一个外壳上还有一个隐藏的入口，所以要明智地使用它!");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX 答题]#k 是一个通过X和O的MapleStory问答的游戏。一旦你加入游戏，按#bM#k 看看X和O在哪里. 总共将给出10个问题，回答正确的角色将赢得游戏。\r\n\r\n给出问题后，请使用梯形图输入正确答案所在的区域，无论是X还是O。如果字符没有选择答案或超过时间限制挂在梯形图上，则该字符将被删除。请保持您的位置，直到[正确]离开屏幕，然后再继续。为了防止任何形式的作弊，所有类型的聊天都将在OX测验中关闭.");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[寻宝]#k 这是一个游戏，你的目标是在#r10分钟内#k找到隐藏在地图上的真实宝箱。将会有很多神秘的宝藏被藏起来, 一旦你把它们打开，很多东西就会从箱子里露出来。你的工作就是从这些物品中挑选出宝卷。\r\n宝箱可以用普通攻击攻击摧毁，一旦你拥有宝卷，你可以通过一个负责交易物品的NPC将其换成秘笈。交易NPC可以在寻宝地图上找到，但你也可以通过交易卷轴 #b维京#k 在 Lith 港.\r\n\r\n这个游戏有它的隐藏门户和隐藏的传送点的份额。若要使用它们，请在某个位置按“上键”k，您将被传送到另一个位置。试着跳来跳去，因为你可能会碰到隐藏的楼梯或绳索。还有一个宝箱会把你带到一个隐藏的地方，还有一个隐藏的宝箱只能通过隐藏的门户找到，所以试着四处看看。\r\n\r\n在寻宝游戏中, 所有的攻击技能都将是 #r无效的#k, 所以请用普通攻击打破宝箱.");
                cm.dispose();
            }
        }
    }
}