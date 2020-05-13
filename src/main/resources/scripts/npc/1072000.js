/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
*/

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.isQuestCompleted(100004)) {
                            cm.sendOk("你真是个英雄！");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100003)) {
                            cm.sendNext("好吧，我让你进去！打败里面的怪物，收集30个黑珠，然后和我的一个同事在里面谈一谈。他会给你#b英雄的证明#k。祝你好运。");
                            status = 4;
                        } else if (cm.isQuestStarted(100003)) {
                            cm.sendNext("嗯...那封信是从#b武术教练#k...所以你千里迢迢来这里参加考试，并作为战士获得第二次转职。好吧，我来给你解释一下测试。别操心太多，没那么复杂。");
                        } else {
                            cm.sendOk("一旦你准备好了，我可以带你去。");
                            cm.dispose();
                        }
                }
                else if (status == 1)
                        cm.sendNextPrev("我会送你去看隐藏的地图。你会看到平时看不到的怪物。他们看起来和普通人一样，但态度完全不同。它们既不能提高你的经验水平，也不能为你提供物品。");
                else if (status == 2)
                        cm.sendNextPrev("你可以从怪物获得#b#t4031013##k。这是一种特殊的珠子，是用他们邪恶邪恶的思想做成的。收集30个，然后去和我的同事谈谈。你就可以通过考试。");
                else if (status == 3)
                        cm.sendYesNo("一旦你进去，你就不能离开，除非你把你的任务。如果你死了，你的经验水平会降低。。所以你最好真的准备好了…好吧，你想现在就去吗？");
                else if (status == 4) {
                        cm.sendNext("好吧，我让你进去！打败里面的怪物，收集30个黑珠，然后和我的一个同事在里面谈话。他会给你#b英雄的证明#k, 祝你好运。");
                        cm.completeQuest(100003);
                        cm.startQuest(100004);
                        cm.gainItem(4031008, -1);
                }
                else if (status == 5) {
                        cm.warp(108000300, 0);
                        cm.dispose();
                } else {
                    cm.dispose();
                }
        }
}
