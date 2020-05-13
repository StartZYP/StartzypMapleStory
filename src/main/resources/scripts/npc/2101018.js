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
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
	NPC NAME: Cesar (1)
	NPC ID: 2101018
	Author: Vcoc
	Function: AriantPQ
*/

status = -1;
function start() {
    if((cm.getPlayer().getLevel() < 19 || cm.getPlayer().getLevel() > 30) && !cm.getPlayer().isGM()){
        cm.sendNext("你如果要参加竞技场，你的等级必须在20级~29级。");
        cm.dispose();
        return;
    }
    action(1,0,0);
}

function action(mode, type, selection){
    status++;
    if (status == 4){
        cm.getPlayer().saveLocation("MIRROR");
        cm.warp(980010000, 3);
        cm.dispose();
    }
    if(mode != 1){
        if(mode == 0 && type == 0)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0)
        cm.sendNext("我在冒险岛中为了伟大的冒险家筹划了一个大活动, 它被称为 #b阿里安特竞技场挑战#k.");
    else if (status == 1)
        cm.sendNextPrev("阿里安特竞技场挑战赛是一个与怪物战斗技能攻击别人. 在这场比赛中，你的目标不是要猎杀怪物;  相反，你需要 #b攻击一定量的怪物，其次是获取它的宝石#k. #b结束战斗将有机会赢得竞争.#k");
    else if (status == 2)
        cm.sendSimple("如果你是一个坚强而勇敢的战士 #b探析#k, 训练，然后你参与到竞技场挑战感兴趣吗？?!\r\n#b#L0# 我很愿意参加这个伟大的比赛.#l");
    else if (status == 3)
        cm.sendNext("好吧，现在我要派你去战场。我想看到你的胜利");
}