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
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
*/

var status = 0;
var state;
var em = null;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;
    
    for(var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());
    
    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if(midLevel <= 20) lobby = 0;
    else if(midLevel <= 40) lobby = 1;
    else if(midLevel <= 60) lobby = 2;
    else if(midLevel <= 80) lobby = 3;
    else if(midLevel <= 90) lobby = 4;
    else if(midLevel <= 100) lobby = 5;
    else if(midLevel <= 110) lobby = 6;
    else lobby = 7;
        
    return lobby;
}

function start() {
	status = -1;
        state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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
                        if(state == 3) {
                                if(cm.getEventInstance().getProperty("clear") == null) {
                                        cm.getEventInstance().clearPQ();
                                        cm.getEventInstance().setProperty("clear", "true");
                                }
                            
                                if(cm.isEventLeader()) {
                                        cm.sendOk("你们这一路走来，完成了如此惊人的壮举，#b你打败了所有的BOSS#k, 恭喜你!现在我会在你被送出去的时候给你奖励……");
                                }
                                else {
                                        cm.sendOk("由于你 #b击败所有的BOSS#k 在这种情况下，恭喜你! 你现在会得到一个与你在这里的表现相匹配的奖励，因为我认可你了。");
                                }
                        }
                        else if(state == 2) {
                                if(cm.isEventLeader()) {
                                        if(cm.getPlayer().getEventInstance().isEventTeamTogether()) {
                                                cm.sendYesNo("你的队伍准备好进入下一个阶段了吗?如果你认为你已经完成了，那么现在就是时候了。现在，你们真的想继续吗?");
                                        }
                                        else {
                                                cm.sendOk("请等待您的团队重新组装后再继续。");
                                                cm.dispose();
                                                return;
                                        }
                                }
                                else {
                                        cm.sendOk("等你们的队长给我申请，让我继续。如果你感觉不太好，想要放弃，穿过传送门，你会被传送出去，你会因为走了这么远而失去奖励。");
                                        cm.dispose();
                                        return;
                                }
                        } else if(state == 1) {
                                cm.sendYesNo("你想放弃这个机会吗?");
                        }
                        else {
                                em = cm.getEventManager("BossRushPQ");
                                if(em == null) {
                                        cm.sendOk("副本出现未知问题,无法工作.请联系管理员");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                                
                                cm.sendSimple("#e#b<组队任务：强化训练>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你是愿意和队员们一起完成探险任务，还是有足够的勇气独自完成?让你的队长跟我谈谈，或者给自己创建一个队伍。#b\r\n#L0#我想参加强化任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索招待.\r\n#L2#我想知道更多的细节。");
                        }
                } else if (status == 1) {
                        if(state == 3) {
                                if(!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                                        cm.sendOk("请事先在你的背包的所有类型上安排一个空位。");
                                        cm.dispose();
                                        return;
                                }
                                
                                cm.warp(970030000);
                                cm.dispose();
                        } else if(state == 2) {
                                var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                                cm.getPlayer().getEventInstance().restartEventTimer(restSpot * 4 * 60000);  // adds (restspot number * 4) minutes
                                cm.getPlayer().getEventInstance().warpEventTeam(970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot));
                                
                                cm.dispose();
                        } else if(state == 1) {
                                cm.warp(970030000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有当你在一个团队中，你才能参与团队任务.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你们的队长必须和我谈谈才能开始这个任务。");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        var lobby = detectTeamLobby(eli), i;
                                                        for(i = lobby; i < 8; i++) {
                                                                if(em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) break;
                                                        }
                                                        
                                                        if(i == 8) {
                                                                cm.sendOk("另一方已经进入了 #r强化训练挑战#k 在这个频道。请尝试另一个频道，或等待当前的挑战结束。");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你还不能开始这个团队任务，因为要么你的队员不在范围内，要么你的团队成员没有资格尝试，要么他们不在地图上。如果你在寻找队友时遇到困难，试试搜索队友。");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你的组队搜索状态是: #b" + (psState ? "启用" : "禁用") + "#k. 你什么时候想换就什么时候跟我说。");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务：强化训练>#k#n\r\n来自各地的勇敢的冒险家来到这里测试他们的战斗技能和能力，因为他们将面对来自冒险世界更强大的boss。与其他冒险家联合起来，或者独自承担所有的负担，接受所有的荣耀，这取决于你。探险队将根据探险者到达的距离给予相应的奖励，探险队中的任意一名队员将获得额外的奖励，这些奖励都将在探险结束时发放.\r\n\r\n这个例子也支持多种游说来匹配不同级别的团队:如果你想有更好的机会迅速为你的团队建立一个队伍，你可以和低级别的玩家一起合作。");
                                        cm.dispose();
                                }
                        }
                }
        }
}