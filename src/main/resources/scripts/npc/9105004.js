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

/* 
 * @Author Ronan
 * Snow Spirit
	Maplemas PQ coordinator
 */

importPackage(Packages.server.life);

var prizeTree = [[[2000002, 1002850], [20, 1]], [[2000006, 1012011], [20, 1]]];

var state;
var status;
var gift;
var pqType;
 
function start() {
        pqType = ((cm.getMapId() / 10) % 10) + 1;
        state = (cm.getMapId() % 10 > 0) ? 1 : 0;
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
    
                if(state > 0) {
                    insidePqAction(mode, type, selection);
                } else {
                    recruitPqAction(mode, type, selection);
                }
        }
}

function recruitPqAction(mode, type, selection) {
        if (status == 0) {
                em = cm.getEventManager("HolidayPQ_" + pqType);
                if(em == null) {
                        cm.sendOk("The Holiday PQ " + pqType + " has encountered an error.");
                        cm.dispose();
                } else if(cm.isUsingOldPqNpcStyle()) {
                        action(1, 0, 0);
                        return;
                }

                cm.sendSimple("#e#b<组队任务: 圣诞派对>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你和你的队员集体击败一个任务怎么样? 在这里，你会发现障碍和问题，如果没有出色的团队合作，你将无法战胜它们. 如果你想试试, 请让你的#b队长#k和我谈谈.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想听听更多细节.");
        } else if (status == 1) {
                if (selection == 0) {
                        if (cm.getParty() == null) {
                                cm.sendOk("只有加入一个队伍，你才能参加组队任务.");
                                cm.dispose();
                        } else if(!cm.isLeader()) {
                                cm.sendOk("让你的队长和我谈谈，才能开始这个组队任务。");
                                cm.dispose();
                        } else {
                                var eli = em.getEligibleParty(cm.getParty());
                                if(eli.size() > 0) {
                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), pqType)) {
                                                cm.sendOk("#r其他队伍#k已进入此频道，请尝试更换其他频道，或等待当前参与方完成.");
                                        }
                                }
                                else {
                                        cm.sendOk("你还无法启动此任务，因为你的组队不在范围之内，你的组队成员没有资格尝试或他们不在地图中。如果你找不到组员，请尝试搜索。");
                                }

                                cm.dispose();
                        }
                } else if (selection == 1) {
                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                        cm.sendOk("您的组队搜索状态为: #b" + (状态? "开启" : "关闭") + "#k. 想换回来的时候跟我说..");
                        cm.dispose();
                } else {
                        cm.sendOk("#e#b<组队任务: 圣诞派对>#k#n\r\n\r\n加入到你的组队中去，建立一个雪人，保护幸福村不受克洛斯的伤害. 请与你的团队一起努力，采取一切必要措施保护雪人，这将有助于雪人的成长。");
                        cm.dispose();
                }
        }
}

function insidePqAction(mode, type, selection) {
        var eim = cm.getEventInstance();
        var difficulty = eim.getIntProperty("level");
        var stg = eim.getIntProperty("statusStg1");

        var mapobj = eim.getInstanceMap(889100001 + 10 * (difficulty - 1));

        if(status == 0) {
                if(stg == -1) {
                        cm.sendNext("#b#h0##k... 你终于来了. 这是幸福村居民建造巨型雪人的地方. 但克洛斯的下属现在正在攻击它. 快点! 我们的任务是在规定的时间内保护雪人不受克洛斯手下的伤害. 如果你消灭他们, 然后他们会扔下一种道具.把它们收集起来，扔到雪人身上，你就会看到它在生长.一旦它恢复到原来的大小，那么您的任务就完成了. 小心一件事.有些部下可能会投下假雪球. 假雪球实际上会使雪人融化得比平时更快.祝你好运.");
                } else if(stg == 0) {
                        if(cm.getMap().getMonsterById(9400321 + 5 * difficulty) == null) {
                                cm.sendNext("求你了，打败克洛斯的手下，让雪人长起来，这样克洛斯就别无选择了.");
                                cm.dispose();
                        } else {
                                cm.sendNext("令人惊叹的！正如我所料，你成功地打败了克洛斯的下属.非常感谢！ (沉默了一会儿...) 不幸的是，克洛斯似乎不会就此罢休. 他的一个手下已经告诉他发生了什么，这意味着... 他很快就会出现的。请继续战斗，再次祝你好运.");
                        }
                } else {
                        if(!eim.isEventCleared()) {
                                cm.sendNext("请打败克洛斯，这样我们的圣诞树就不会受到伤害了！");
                                cm.dispose();
                        } else {
                                cm.sendNext("真的！你打败了克洛斯！非常感谢！你已经设法使这圣诞树安全了！谢谢！！");
                        }
                }
        } else if(status == 1) {
                if(stg == -1) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("请让你的组长和我谈谈关于这次任务的更多细节。");
                                cm.dispose();
                                return;
                        }

                        mapobj.allowSummonState(true);
                        var snowman = MapleLifeFactory.getMonster(9400317 + (5 * difficulty));
                        mapobj.spawnMonsterOnGroundBelow(snowman, new java.awt.Point(-180, 15));
                        eim.setIntProperty("snowmanLevel", 1);
                        eim.dropMessage(5, "雪人出现了！用一切必要的手段保护它！");

                        eim.setIntProperty("statusStg1", 0);
                        cm.dispose();
                        return;
                } else if(stg == 0) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("请让你的组长和我谈谈关于这次任务的更多细节。");
                                cm.dispose();
                                return;
                        }

                        mapobj.broadcastStringMessage(5, "随着雪人的成长，克洛斯出现了！");
                        eim.getEm().getIv().invokeFunction("snowmanHeal", eim);

                        var boss = MapleLifeFactory.getMonster(9400318 + difficulty);
                        mapobj.spawnMonsterOnGroundBelow(boss, new java.awt.Point(-180, 15));
                        eim.setProperty("spawnedBoss", "true");

                        eim.setIntProperty("statusStg1", 1);
                        cm.dispose();
                } else {
                        gift = cm.haveItem(4032092, 1);
                        if(gift) {
                                var optStr = generateSelectionMenu(generatePrizeString());
                                cm.sendSimple("Oh, you brought a #b#t4032092##k with you? That's nice, hold on a bit... Here's your Maplemas gift. Please select the one you'd like to receive:\r\n\r\n" + optStr);
                        } else if(eim.gridCheck(cm.getPlayer()) == -1) {
                                cm.sendNext("这是你的圣诞树礼物. 享受~");
                        } else {
                                cm.sendOk("Happy Maplemas!!");
                                cm.dispose();
                        }
                }

        } else if(status == 2) {
                if(gift) {
                        var selItems = prizeTree[selection];
                        if(cm.canHoldAll(selItems[0], selItems[1])) {
                                cm.gainItem(4032092, -1);
                                cm.gainItem(selItems[0][0], selItems[1][0]);

                                if(selection == 1) {
                                        var rnd = (Math.random() * 9) | 0;
                                        cm.gainItem(selItems[0][1] + rnd, selItems[1][1]);
                                } else {
                                        cm.gainItem(selItems[0][1], selItems[1][1]);
                                }
                        } else {
                                cm.sendOk("请确保你的道具栏中有足够的空间。");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer(), difficulty)) {
                                eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                                cm.sendOk("在进行之前，请确保你的道具栏有足够的空间。");
                        }
                }

                cm.dispose();
        }
}

function generatePrizeString() {
        var strTree = [];
        
        for(var i = 0; i < prizeTree.length; i++) {
                var items = prizeTree[i][0];
                var qtys = prizeTree[i][1];

                var strSel = "";
                for(var j = 0; j < items.length; j++) {
                        strSel += ("#i" + items[j] + "# #t" + items[j] + "#" + (qtys[j] > 1 ? (" : " + qtys[j]) : ""));
                }

                strTree.push(strSel);
        }
        
        return strTree;
}

function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}