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

/**
 * @author: Ronan
 * @npc: Shuang
 * @map: Victoria Road: Excavation Site<Camp> (101030104)
 * @func: Start Guild PQ
*/

var status = 0;
var sel;
var em = null;

function findLobby(guild) {
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
                var lobby = iterator.next();
                
                if(lobby.getIntProperty("guild") == guild) {
                        if(lobby.getIntProperty("canJoin") == 1) return lobby;
                        else return null;
                }
        }
        
        return null;
}

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                
                if (status == 0) {
                        em = cm.getEventManager("GuildQuest");
                        if(em == null) {
                                cm.sendOk("家族任务出现错误.");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#e#b<家族任务: 圣瑞尼亚遗址>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n 这里是通往家族守卫战的路，你想参加吗？#b\r\n#L0#我要举办家族守卫战#l\r\n#L1#我要参加家族守卫战#l\r\n#L2#什么是家族守卫战？#l");
                } else if (status == 1) {
                        sel = selection;
                        if (selection == 0) {
                                if(!cm.isGuildLeader()) {
                                        cm.sendOk("只有家族族长或副族长才能开始这个任务.");
                                        cm.dispose();
                                } else {
                                        if(em.isQueueFull()) {
                                                cm.sendOk("此频道上的队列已满,请更换频道或耐心等待一段时间后再试一次.");
                                                cm.dispose();
                                        } else {
                                                var qsize = em.getQueueSize();
                                                cm.sendYesNo(((qsize > 0) ? "There is currently #r" + qsize + "#k guilds queued on. " : "") + "Do you wish for your guild to join this queue?");
                                        }
                                }
                        } else if (selection == 1) {
                                if(cm.getPlayer().getGuildId() > 0) {
                                        var eim = findLobby(cm.getPlayer().getGuildId());
                                        if(eim == null) {
                                                cm.sendOk("你的家族目前没有注册这个副本.");
                                        } else {
                                                if(cm.isLeader()) {
                                                        em.getEligibleParty(cm.getParty());
                                                        eim.registerParty(cm.getPlayer());
                                                } else {
                                                        eim.registerPlayer(cm.getPlayer());
                                                }
                                        }
                                } else {
                                        cm.sendOk("你必须加入一个家族.");
                                }
                                
                                cm.dispose();
                        } else {
                                var reqStr = "";
                                reqStr += "\r\n\r\n    团队要求:\r\n\r\n";
                                reqStr += "     - 1 名团队成员达到30级或者30级以上#k.\r\n";
                                reqStr += "     - 1 名具有#r隐身#k技能和#r快速反应#k能力的飞侠.\r\n";
                                reqStr += "     - 1 名具有#r快速移动#k的魔法师\r\n";
                                reqStr += "     - 1 名队员具有#r弓箭手、刺客或火枪手#k一样的#r远程攻击者#k.\r\n";
                                reqStr += "     - 1 名队员具备轻功的飞侠或轻羽鞋的火枪手.\r\n";
                            
                                cm.sendOk("#e#b<家族任务: 圣瑞尼亚遗址>#k#n\r\n 与你的家族成员合作，完成后可以获得丰厚奖励，家族可以获得家族积分。" + reqStr);
                                cm.dispose();
                        }
                } else if (status == 2) {
                        if (sel == 0) {
                                var entry = em.addGuildToQueue(cm.getPlayer().getGuildId(), cm.getPlayer().getId());
                                if(entry > 0) {
                                        cm.sendOk("当你的家族登记成功时，聊天框会弹出一条消息，让你的家族了解登记状态.\r\n\r\n #r重要提示#k: #r作为家族族长或副族长，你必须及时调用家族登记成员出现在此频道#k。#b如操作出现错误，将使整个家族登记无效，并立即调用下一个家族进行此项任务。还需要注意的是，在家族登记期间未及时进入家族任务，你的家族任务就会立即被中断，并移出队列。");
                                } else if(entry == 0) {
                                        cm.sendOk("此频道上的队列已满,请更换频道或耐心等待一段时间后再试一次.");
                                } else {
                                        cm.sendOk("你的家族已经在一个频道排队了，请耐心等待。");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}
