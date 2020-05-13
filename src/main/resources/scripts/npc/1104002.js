/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                var mapobj = cm.getMap();
            
                if (mode == 0 && type > 0) {
                        cm.getPlayer().dropMessage(5, "埃雷奥诺尔:哦，失去了女皇，还还想挑战我们？现在你做到了！做好准备吧！！！");
                        
                        mapobj.spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new Packages.java.awt.Point(850, 0));
                        mapobj.destroyNPC(1104002);
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(!cm.isQuestStarted(20407)) {
                                cm.sendOk("... 骑士，你还是#b不想面对这场战斗#k, 对吗? 当一个人还没有为战斗做好心理准备时，挑战他是没有礼貌的。跟你那只笨手笨脚的大鸟好好谈谈，说不定它会给你点勇气。");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendAcceptDecline("哈哈哈哈哈!女皇已经在我的地盘上了，这无疑是一个很大的进步#b黑色之翼#k“向冒险岛世界倾覆。。。你呢？还想面对我们？或者，更好的是，既然你看起来足够强大，可以作为我们服务的补充力量，#r你能满足我们的期望和加入我们的愿望吗#k或者你已经无能为力了？");
                } else if (status == 1) {
                        cm.sendOk("嘿，胆小鬼在#r黑魔法师#k军队。走开！");
                        cm.dispose();
                }
        }
}
