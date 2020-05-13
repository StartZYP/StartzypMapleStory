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
/*
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103001 - Rolly
*	Map =  Ludibrium - <Ludibrium>
*	NPC MapId = 220000000
*	Function = Start LMPQ
*
*/

var status = 0;

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
                        em = cm.getEventManager("LudiMazePQ");
                        if(em == null) {
                                cm.sendOk("玩具城迷宫遇到错误");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务:玩具城迷宫>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这是玩具城迷宫!\r\n#b#L0#我想进入玩具城迷宫#l\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "搜索状态\r\n#L2#什么是玩具城迷宫？");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("试着和你的组队一起去迷宫探险.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("如果你真的决定要解决这个问题，请你的组长通知我！");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("#r其他队伍#k已进入此频道，请尝试更换其他频道，或等待当前参与方完成。");
                                                }
                                        }
                                        else {
                                                cm.sendOk("为了解决这个难题，你的组队至少需要由3名成员组成.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的组队搜索状态为: #b" + (状态? "开启" : "关闭") + "#k. 想换回来的时候跟我说.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<Party Quest: Ludibrium Maze>#k#n\r\n此迷宫适用于3人或3人以上的组队，队员必须在51~70级之间. 你将有15分钟的时间逃离迷宫.  在房间的中心，将设置一个传送门，将您传送到另一个房间.  这些入口会把你送到其他房间，在那里你会（希望）找到出口.  旅游向导会在出口等你，所以你只要和他谈谈，他就会放你出去.  打破房间里所有的箱子，箱子里的怪物会掉一张优惠券。逃离迷宫后，您将根据收集到的优惠券获得经验值。另外，如果族长至少有30张优惠券，那么将向组队赠送一份特别的礼物.  如果你不能在规定的15分钟内逃离迷宫，你在迷宫中的时间将获得0经验值.  如果你决定在迷宫中退出组队，你将被自动踢出迷宫.  即使队员们在任务中途离开，剩下的队员们也能继续任务，除非他们在迷宫里用完了最低限度的队员.  如果你情况危急，无法追捕到怪物，你可以避开它们来拯救自己,你的斗志和智慧将受到考验!祝你好运!");
                                cm.dispose();
                        }
                }
        }
}