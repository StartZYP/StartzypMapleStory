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

                cm.sendSimple("#e#b<�������: ʥ���ɶ�>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�����Ķ�Ա�������һ��������ô��? �������ᷢ���ϰ������⣬���û�г�ɫ���ŶӺ������㽫�޷�սʤ����. �����������, �������#b�ӳ�#k����̸̸.#b\r\n#L0#����μ��������.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "�ر�" : "����") + "�������.\r\n#L2#������������ϸ��.");
        } else if (status == 1) {
                if (selection == 0) {
                        if (cm.getParty() == null) {
                                cm.sendOk("ֻ�м���һ�����飬����ܲμ��������.");
                                cm.dispose();
                        } else if(!cm.isLeader()) {
                                cm.sendOk("����Ķӳ�����̸̸�����ܿ�ʼ����������");
                                cm.dispose();
                        } else {
                                var eli = em.getEligibleParty(cm.getParty());
                                if(eli.size() > 0) {
                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), pqType)) {
                                                cm.sendOk("#r��������#k�ѽ����Ƶ�����볢�Ը�������Ƶ������ȴ���ǰ���뷽���.");
                                        }
                                }
                                else {
                                        cm.sendOk("�㻹�޷�������������Ϊ�����Ӳ��ڷ�Χ֮�ڣ������ӳ�Աû���ʸ��Ի����ǲ��ڵ�ͼ�С�������Ҳ�����Ա���볢��������");
                                }

                                cm.dispose();
                        }
                } else if (selection == 1) {
                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                        cm.sendOk("�����������״̬Ϊ: #b" + (״̬? "����" : "�ر�") + "#k. �뻻������ʱ�����˵..");
                        cm.dispose();
                } else {
                        cm.sendOk("#e#b<�������: ʥ���ɶ�>#k#n\r\n\r\n���뵽��������ȥ������һ��ѩ�ˣ������Ҹ��岻�ܿ���˹���˺�. ��������Ŷ�һ��Ŭ������ȡһ�б�Ҫ��ʩ����ѩ�ˣ��⽫������ѩ�˵ĳɳ���");
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
                        cm.sendNext("#b#h0##k... ����������. �����Ҹ�����������ѩ�˵ĵط�. ������˹�������������ڹ�����. ���! ���ǵ��������ڹ涨��ʱ���ڱ���ѩ�˲��ܿ���˹���µ��˺�. �������������, Ȼ�����ǻ�����һ�ֵ���.�������ռ��������ӵ�ѩ�����ϣ���ͻῴ����������.һ�����ָ���ԭ���Ĵ�С����ô��������������. С��һ����.��Щ���¿��ܻ�Ͷ�¼�ѩ��. ��ѩ��ʵ���ϻ�ʹѩ���ڻ��ñ�ƽʱ����.ף�����.");
                } else if(stg == 0) {
                        if(cm.getMap().getMonsterById(9400321 + 5 * difficulty) == null) {
                                cm.sendNext("�����ˣ���ܿ���˹�����£���ѩ�˳���������������˹�ͱ���ѡ����.");
                                cm.dispose();
                        } else {
                                cm.sendNext("���˾�̾�ģ����������ϣ���ɹ��ش���˿���˹������.�ǳ���л�� (��Ĭ��һ���...) ���ҵ��ǣ�����˹�ƺ�����ʹ˰���. ����һ�������Ѿ�������������ʲô������ζ��... ���ܿ�ͻ���ֵġ������ս�����ٴ�ף�����.");
                        }
                } else {
                        if(!eim.isEventCleared()) {
                                cm.sendNext("���ܿ���˹���������ǵ�ʥ�����Ͳ����ܵ��˺��ˣ�");
                                cm.dispose();
                        } else {
                                cm.sendNext("��ģ������˿���˹���ǳ���л�����Ѿ��跨ʹ��ʥ������ȫ�ˣ�лл����");
                        }
                }
        } else if(status == 1) {
                if(stg == -1) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("��������鳤����̸̸�����������ĸ���ϸ�ڡ�");
                                cm.dispose();
                                return;
                        }

                        mapobj.allowSummonState(true);
                        var snowman = MapleLifeFactory.getMonster(9400317 + (5 * difficulty));
                        mapobj.spawnMonsterOnGroundBelow(snowman, new java.awt.Point(-180, 15));
                        eim.setIntProperty("snowmanLevel", 1);
                        eim.dropMessage(5, "ѩ�˳����ˣ���һ�б�Ҫ���ֶα�������");

                        eim.setIntProperty("statusStg1", 0);
                        cm.dispose();
                        return;
                } else if(stg == 0) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("��������鳤����̸̸�����������ĸ���ϸ�ڡ�");
                                cm.dispose();
                                return;
                        }

                        mapobj.broadcastStringMessage(5, "����ѩ�˵ĳɳ�������˹�����ˣ�");
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
                                cm.sendNext("�������ʥ��������. ����~");
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
                                cm.sendOk("��ȷ����ĵ����������㹻�Ŀռ䡣");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer(), difficulty)) {
                                eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                                cm.sendOk("�ڽ���֮ǰ����ȷ����ĵ��������㹻�Ŀռ䡣");
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