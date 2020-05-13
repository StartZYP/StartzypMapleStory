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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Shuri the Tour Guide - Orbis (200000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version
---------------------------------------------------------------------------------------------------
**/

var pay = 2000;
var ticket = 4031134;
var msg;
var check;

var status = 0;

function start() {
    cm.sendSimple("你听说过可以看到大海的海滩吗 #b#m110000000##k, 离这里有点远 #m"+cm.getPlayer().getMapId()+"#? 我现在可以带你去那里 #b"+pay+" 金币#k, 如果你有 #b#t"+ticket+"##k 戴着，那样你就免费了.\r\n\r\n#L0##b我愿意付 "+pay+" 金币.#k#l\r\n#L1##b我有 #t"+ticket+"##k#l\r\n#L2##b什么是#t"+ticket+"#?#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendNext("你一定有什么事要处理。你一定是旅行和打猎累了。去休息一下，如果你想改变主意，就来找我。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0)
                    msg = "所以你想付 #b"+pay+"  枫币#k 然后去 #m110000000#?";
                else if (selection == 1)
                    msg = "所以你有一张 #b#t"+ticket+"##k? 你可以随时前往 #m110000000# 游玩";
                cm.sendYesNo(msg+" 好吧! !请注意，你可能会在那里遇到一些怪物，所以一定不要措手不及。好的，你要不要去 #m110000000# 旅游?");
            } else if (selection == 2) {
                cm.sendNext("你一定很好奇 #b#t"+ticket+"##k. 是的，我能看出来. #t"+ticket+"# 是一件物品，只要你拥有，你可以使你的方式 #m110000000# 免费的。这是一件非常罕见的物品，我们甚至不得不去买，但不幸的是，我在几个星期前的一个长周末把它弄丢了。");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getMeso() < pay) {
                    cm.sendOk("我觉得你缺少金币。筹钱的方法有很多，比如……卖掉你的盔甲…打败怪物……做任务…你知道我在说什么。");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("嗯，确切位置在哪里 #b#t"+ticket+"##k?? 你确定你有吗?请仔细检查.");
                    cm.dispose();
                } else
                    access = true;
            }
            if (access) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3) 
            cm.sendNext("你一定很好奇 #b#t"+ticket+"##k. 是的，我能看出来. #t"+ticket+"# 是一件物品，只要你拥有，你就可以自由往返#m110000000# 免费的。这是一件非常罕见的物品，我们甚至不得不去买，但不幸的是，我在几个星期前的一个长周末把它弄丢了。");
        else if (status == 4)
            cm.sendPrev("我回来的时候没有它，没有它感觉很糟糕。希望有人把它捡起来放在安全的地方。不管怎样，这是我的故事，谁知道呢，你可能会把它捡起来，好好利用。如果你有任何问题，尽管问");
        else if (status == 5)
            cm.dispose();
        
    }
}