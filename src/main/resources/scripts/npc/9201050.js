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
/* Icebyrd Slimm
	Masteria: New Leaf City (600000000)
	Handles the quiz quest. (4900)
 */

var minlevel = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestCompleted(4911)) {
                cm.sendNext("干得好！你解决了我所有的问题。祝你旅途愉快！");
                cm.dispose();
            } else if (cm.isQuestCompleted(4900) || cm.isQuestStarted(4900)) {  // thanks imbee for pointing out the quiz leak
                cm.sendNext("嘿，注意了，我想问你另一个问题！");
                cm.dispose();
            } else {
                var selStr = "怎么了！名字叫冰草泥，新叶城市长！很高兴看到你接受了我的邀请。那么，我能为你做些什么?#b"
                var info = new Array("这是什么地方?","谁是福克斯威特教授?","什么是狐狸精门？","什么是绯红树林?","中间齿轮在哪里?","什么是装备入口?","路牌是什么意思？","杰克·马斯克怎么了？","利塔·无法无天看起来像块硬饼干，她的故事是什么?","这个城市什么时候会开放新的行政区?","我想参加测验！");
                for (var i = 0; i < info.length; i++)
                    selStr += "\r\n#L" + i + "# " + info[i] + "#l";
                cm.sendSimple(selStr);
            }
        } else if(status == 1) {
            switch (selection) {
                case 0:
                    cm.sendNext("我一直梦想着建一座城市.不仅仅是任何一个城市,每个人都受到欢迎的城市.我以前住在克宁市，所以我决定看看我是否能创建一个城市。当我继续寻找这样做的方法时，我遇到了许多人,其中一些人我已经把他们当作朋友了.像福克斯威特教授一样,他是我们的天才.把他从一群吃人的植物中拯救出来.杰克·马斯克是一个来自阿摩利亚的老猎友,他说话太圆滑了,对他自己也没好处.利塔和我是克宁市的老朋友,她用她的武器救了我几次,所以我认为她是镇治安官的最佳选择.经过一番劝说,她终于相信自己的命运就在这里.关于我们的探险家,路障来找东西.他同意把他找到的东西带到博物馆。我还在克宁城的时候就听说过他和他哥哥的故事.还有埃尔帕姆…好吧,我们就说他不是这附近的人.完全.我们以前说过,他似乎是好心人,所以我允许他留下来。我才意识到我已经漫无目的了!你还想知道什么?");
                    status -= 2;
                    break;
                case 1:
                    cm.sendNext("一个97岁的人.他是我有一天在城外遇到的时间旅行者.老家伙和一些丛林生物有点麻烦,比如他们想吃掉他.作为我救他的回报,他同意建一个时间博物馆.我有种感觉,他来这里是为了另一个原因,因为他不止几次地提到,新叶城未来将扮演一个有趣的角色.也许你能发现更多...");
                    status -= 2;
                    break;
                case 2:
                    cm.sendNext("嘿，当我看到教授在建的时候我也问了同样的问题。它们是扭曲点。向上压会将你扭曲到另一个位置。我建议你掌握他们的窍门，他们是我们的运输系统。");
                    status -= 2;
                    break;
                case 3:
                    cm.sendNext("中间齿轮在大本钟下面.这是街垒发现的大本钟怪物出没的区域.如果你问我的话,它似乎住在塔的一个单独的部分很奇怪.我听说他需要帮忙探索一下,你应该见见他.不过要小心,里面的狼蛛可不是闹着玩的.");
                    status -= 2;
                    break;
                case 4:
                    cm.sendNext("啊…好吧.克拉基亚丛林位于新叶城的郊区.许多新的和强大的生物游荡在这些地区,所以你最好准备好战斗,如果你去那里.在镇的右边.有谣言说丛林通向一座失落的城市,但是我们还没有找到任何东西.");
                    status -= 2;
                    break;
                case 5:
                    cm.sendNext("好吧，当约翰发现自己在大本钟的中间齿轮部分,他站在一个上,然后去了另一个地方.然而,他只能来回走动,他们不像狐狸精门那样骑自行车通过.古老的科技.");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("好吧,你到处都能看到.它们是在建的区域.红灯表示还没完工,绿灯表示还没完工.经常回头看看，我们总是在建设！");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("啊,杰克.你认识那些对学校来说太酷的人吗?那些总是什么都不做的人?抓住那个女孩?好吧,那是杰克,但没有那个女孩.他认为自己错失了机会,开始戴上面具来掩盖自己的真实身份.我对他是谁守口如瓶,但他来自亚摩利亚.如果你问他,他可能会告诉你更多.");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("我认识利塔有一段时间了,不过我们最近才重新燃起友谊.我很久没见到她了,但我明白为什么.她训练了很长很长一段时间当小偷.事实上,这是我们第一次见面！我被一群任性的蘑菇包围了,她跳进去帮忙.到了挑选警长的时候,这是一件轻而易举的事.她承诺帮助其他人进行训练,保护城市,所以如果你对一些公民义务感兴趣,就和她谈谈.");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("很快,我的朋友.即使你看不见他们,城市开发商也在努力工作.等他们准备好了，我们就打开.我知道你很期待,我也是!");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("没问题.如果你答对了,我会给你一些好东西!");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("我们很渴望,是吗?在我让你参加测验之前,你再多探索一下怎么样?");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}