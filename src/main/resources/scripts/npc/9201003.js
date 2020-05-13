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
/**
 *9201003.js - Mom and Dad
 *@author Jvlaple
 *@author Ronan
 */
var numberOfLoves = 0;
var status = -1;
var state = 0;

function hasProofOfLoves(player) {
    var count = 0;
    
    for(var i = 4031367; i <= 4031372; i++) {
        if(player.haveItem(i)) {
            count++;
        }
    }
    
    return count >= 4;
}

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

        if (status == 0) {
            if (!cm.isQuestStarted(100400)) {
                cm.sendOk("你好,我们是爸爸妈妈....");
                cm.dispose();
            } else {
                if (cm.getQuestProgressInt(100400, 1) == 0) {
                    cm.sendNext("爸爸，妈妈..我有个请求要对你们两个.... 我想知道你一直以来走的路, 爱和关心我所爱的人的道路。", 2);
                } else {
                    if(!hasProofOfLoves(cm.getPlayer())) {
                        cm.sendOk("亲爱的，我们需要确保你真的准备好和你选择的伴侣坠入爱河，请带过来。 #b4 #t4031367#'s#k.");
                        cm.dispose();
                    } else {
                        cm.sendNext("#b#h0##k, 你今天让我们感到骄傲。你现在可以得到更多的祝福了 #r我们的祝福#k 选择你喜欢的人做你的未婚妻。你现在可以咨询 #p9201000#, 婚礼珠宝商。祝您旅途愉快，充满爱心~~");
                        state = 1;
                    }
                }
            }
        } else if (status == 1) {
            if (state == 0) {
                cm.sendNextPrev("亲爱的！你请求我们的帮助是多么周到啊。我们一定会帮你的！");
            } else {
                cm.sendOk("爸爸，妈妈...。非常感谢您的热情支持!!!", 2);
                
                cm.completeQuest(100400);
                cm.gainExp(20000 * cm.getPlayer().getExpRate());
                for(var i = 4031367; i <= 4031372; i++) {
                    cm.removeAll(i);
                }
                
                cm.dispose();
            }
        } else if (status == 2) {
            cm.sendNextPrev("当然你一定已经看到了 #r娜娜，爱的精灵#k, 在枫树世界。其中4个, 收集 #b4 #t4031367#'s#k 把他们带到这里来。这次旅行将澄清一些关于爱的问题。。。");
        } else if (status == 3) {
            cm.setQuestProgress(100400, 1, 1);
            cm.dispose();
        }
    }
}