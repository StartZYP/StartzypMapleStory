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
/* Credits to: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("你好,我是江,活动马上要开始了,跟我一起走吧.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("Hmm...我该怎么办？活动马上就要开始了。。。很多人去参加活动，所以我们最好快点。。。");
        } else if (status == 2) {
            cm.sendSimple("嘿。。。你为什么不和我一起去？我想我哥哥会和其他人一起去的?#k#l\r\n#L1##e1.#n#b说明比赛规则.#k#l\r\n#L2##e2.#n#b好吧,我们一起走吧!#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("整个月,全球冒险岛都在庆祝三周年!冒险岛管理员将举办相应的活动,请积极参加活动,到时候会有相应的奖励发给你");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("这项赛事有很多比赛。在你玩这个游戏之前知道怎么玩它会帮你很多。选择一个你想知道更多的！#b\r\n#L0#上楼上楼#l\r\n#L1#向高地#l\r\n#L2#滚雪球#l\r\n#L3#打椰子#l\r\n#L4#OX问答#l\r\n#L5#寻宝#l#k");
            } else if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001) 
						cm.divideTeams();
        
					cm.getEvent().minusLimit();
					cm.warp(cm.getEvent().getMapId(), 0);
					cm.dispose();
				} else {
					cm.sendNext("活动尚未开始，您已经有了#b神秘的卷轴#k，或者您已经在过去24小时内参加了此活动。请稍后再试！");
					cm.dispose();                
            }
			}
        } else if (status == 4) {
            if (selection == 0) {
                cm.sendNext("#b[上楼上楼]#k 是一个游戏，参与者爬梯子到达顶部。向上爬，从众多可用的入口中选择正确的入口，进入下一层。\r\n\r\n游戏分为三个等级，时间限制是#b6分钟#k.在[上楼上楼]中,你#b无法使用药剂或物品跳跃、传送、加速或提升你的速度#k. 也有一些隐藏的门会把你带到一个陌生的地方，所以请注意!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[向高地] 一场穿越障碍的比赛就像耐心的森林. 你可以克服各种障碍，在规定的时间内到达目的地. \r\n\r\n游戏分为四个等级，时间限制是#b15分钟#k.在[向高地]中,你将无法使用传送或加速.");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[滚雪球]#k由两个团队组成，红队和蓝队，两个团队一起努力去滚雪球#b哪个队在有限的时间内把雪球滚得越大则获胜#k.如果比赛不能在规定的时间内决定，那么把雪球滚得更远的队获胜. \r\n\r\n把雪卷起来，按一下#bCtrl#k.所有远程攻击和基于技能的攻击在这里都不起作用，#b只有普通攻击才有效#k. \r\n\r\n如果一个角色碰到雪球，他/她将被送回起点。在出发点前攻击雪人，防止对方向前滚雪。这是一个计划周密的策略，因为团队将决定是攻击雪球还是雪人。");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[打椰子]#k由两个团队组成，红队和蓝队，两个团队一起努力去打椰子#b哪个队收集的椰子最多#k.时间限制是#b5分钟#k.如果比赛以平局结束，将加时2分钟以确定胜利者。如果由于某种原因，比分保持平局，那么比赛将以平局告终。\r\n\r\n所有远程攻击和基于技能的攻击在这里都不起作用，只有普通攻击会起作用。如果你没有普通攻击的武器，你可以通过事件地图中的NPC购买。不管你的属性、武器或技能如何，所有的伤害都是一样的.\r\n\r\n小心地图上的障碍物和陷阱。如果角色在游戏中死亡，则该角色将从游戏中退出。在椰子掉落前最后一击的玩家获胜。只有击中地面的椰子才算，这意味着不会从树上掉下来的椰子，或者偶尔爆炸的椰子也不算。地图底部的一个贝壳上还有一个隐藏的入口，所以要明智地使用它！");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX问答]#k是一个通过判断X和O的益智游戏. 一旦你加入游戏, 打开小地图看看X和O在哪里。总共有#r10道问题#k,回答正确的角色将赢得比赛。\r\n\r\n一旦问题提出,使用梯子进入正确答案可能出现的区域, 是X还是O. 如果角色没有选择答案，或者超过时间限制挂在梯子上, 角色将被强行退出。请保持胜利直到[对的] 离开屏幕再继续。 为了防止任何形式的作弊，所有类型的聊天都将在OX问答期间关闭");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[寻宝]#k是一种游戏，你的目标是找到宝藏#k在地图上到处都是#r10分钟#k.开始时会有很多神秘的宝箱, 一旦你攻击箱子，很多东西就会从箱子里掉出来. 你的任务是从那些物品中挑选出正确的卷轴. \r\n宝箱可以用#b普通攻击#k,一旦你拥有宝藏卷轴，你就可以通过一个负责物品交易的NPC来把它换成神秘的卷轴。交易NPC可以在寻宝地图上找到，但你也可以通过交易获得卷轴#b江#k明珠港.\r\n\r\n这个游戏有隐形传送点。若要使用它们，请在某个位置按#b向上箭头#k，您将被传送到另一个位置。试着跳来跳去，因为你可能会碰到隐藏的楼梯或绳索。还有一个宝箱会带你去一个隐藏的地方，还有一个隐藏的宝箱只能通过隐藏的入口找到，所以试着四处看看.\r\n\r\n在寻宝游戏中，所有的攻击技能#r是不可用的#k, 所以请用普通攻击打破宝箱.");
                cm.dispose();
            }
        }   
    }
}  