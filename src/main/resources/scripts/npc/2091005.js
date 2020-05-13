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
* @Author: Moogra, XxOsirisxX
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);

/* var belt_points = Array(200, 1800, 4000, 9200, 17000); */
var belt_points = Array(5, 45, 100, 230, 425); /* Watered down version */

var status = -1;
var selectedMenu = -1;

function start() {
	if(disabled) {
		cm.sendOk("�ҵ�ʦ��Ҫ��#r�ر�#k�����������Ҳ����������.");
		cm.dispose();
		return;
	}
	
    if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        var text = "�Һܾ�����������ôԶ���������ڿ�ʼ�Ͳ������ˡ��㻹����Ҫ��ս?\r\n\r\n#b#L0#�������#l\r\n#L1#�����뿪#l\r\n";
        if (!GameConstants.isDojoPartyArea(cm.getPlayer().getMapId())) {
            text += "#L2#�����¼���ڵķ���#l";
        }
        cm.sendSimple(text);
    } else if (cm.getPlayer().getLevel() >= 25) {
        if (cm.getPlayer().getMap().getId() == 925020001) {
            cm.sendSimple("��ʦ�������������������ˣ����ȻҪ����������ս���պ�ɱ�����.\r\n\r\n#b#L0#���˽�����ս.#l\r\n#L1#��ӽ�����ս.#l\r\n#L2#����Ҫ��ȡ����.#l\r\n#L3#���������ҵ�ѵ����.#l\r\n#L4#����Ҫѫ��.#l\r\n#L5#���������ʲô?#l");
        } else {
            cm.sendYesNo("��������뿪��?");
        }
    } else {
        cm.sendOk("�٣����ڳ�Ц�ҵ�ʦ��������Ϊ��Ҫ��ս˭�����Ǹ�Ц������������Ҫ#b25#k.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (cm.getPlayer().getMap().getId() == 925020001) {
        if (mode >= 0) {
            if (status == -1)
                selectedMenu = selection;
            status++; //there is no prev.
            if (selectedMenu == 0) { //I want to challenge him alone.
                if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                    if (status == 0) {
                        cm.sendYesNo("�������һ����ս����������ţ��ðɣ��ҵ�ʦ������æ��������ܴ���ң��Ҿ���������ҵ�ʦ��?");
                    } else if (status == 1) {
                        if (mode == 0) {
                            cm.sendNext("������ʧ���˰�?\r\n���ȥ��!");
                        } else {
                           if(cm.getClient().getChannelServer().getMapFactory().getMap(925020010).getCharacters().size() > 0) {
                                cm.sendOk("����������ʹ�õ���.���Ժ����.");
                                cm.dispose();
                                return;
                            }
                            cm.warp(925020010, 0);
                            cm.getPlayer().setFinishedDojoTutorial();
                        }
                        cm.dispose();
                    }
                } else if (cm.getPlayer().getDojoStage() > 0) {
                    if (status == 0) {
                        cm.sendYesNo("��һ������Խ�����սʱ" + cm.getPlayer().getDojoStage() + ". �����ڿ��Դ���ȥ�������ȥ������?");
                    } else {
                        cm.warp(mode == 1 ? 925020000 + cm.getPlayer().getDojoStage() * 100 : 925020100, 0);
                        cm.dispose();
                    }
                } else {
					for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
						if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
							cm.sendOk("�Ѿ���������ս��." + i);
							cm.dispose();
							return;
						}
					}
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warp(925020100, 0);
                    cm.dispose();
                }
            } else if (selectedMenu == 1) { //I want to challenge him with a party.
                var party = cm.getPlayer().getParty();
                if (party == null) {
                    cm.sendNext("������Ķӳ����ҽ�̸.");
                    cm.dispose();
                    return;
                }
                var lowest = cm.getPlayer().getLevel();
                var highest = lowest;
                for (var x = 0; x < party.getMembers().size(); x++) {
                    var lvl = party.getMembers().get(x).getLevel();
                    if (lvl > highest)
                        highest = lvl;
                    else if (lvl < lowest)
                        lowest = lvl;
                }
                var isBetween30 = highest - lowest < 30;
                if (party.getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendNext("������Ķӳ����ҽ�̸.");
                    cm.dispose();
                } else if (party.getMembers().size() == 1) {
                    cm.sendNext("��ȷ�����ڶ����У�");
                } else if (!isBetween30) {
                    cm.sendNext("��ĵȼ�̫�ͻ�����Ķ�Ա����ͬһ��ͼ.");
                } else {
                    for (var i = 1 ; i < 39; i++) { //only 32 stages, but 38 maps
                            if(cm.getClient().getChannelServer().getMapFactory().getMap(925020000 + 100 * i).getCharacters().size() > 0) {
                                    cm.sendOk("�Ѿ���������ս��.");
                                    cm.dispose();
                                    return;
                            }
                    }
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).resetReactors();
                    cm.getClient().getChannelServer().getMapFactory().getMap(925020100).killAllMonsters();
                    cm.warpParty(925020100);
                    cm.dispose();
                }
                cm.dispose();
            } else if (selectedMenu == 2) { //I want to receive a belt.
                if (mode < 1) {
                    cm.dispose();
                    return;
                }
                if (status == 0) {
                    var selStr = "���ѵ����Ϊ #b" + cm.getPlayer().getDojoPoints() + "#k.ʦ��ϲ����ʵ�����ˡ�������õ��㹻��ѵ���㣬����Ը������ѵ���㹺��һ������.\r\n";
                    for (var i = 0; i < belts.length; i++) {
                        if (cm.haveItemWithId(belts[i], true)) {
                            selStr += "\r\n     #i" + belts[i] + "# #t" + belts[i] + "#(Obtain)";
                        } else
                            selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                    }
                    cm.sendSimple(selStr);
                } else if (status == 1) {
                    var belt = belts[selection];
                    var level = belt_level[selection];
                    var points = belt_points[selection];
                    if (cm.getPlayer().getDojoPoints() > points) {
                        if (cm.getPlayer().getLevel() > level)
                            cm.gainItem(belt, 1);
                        else
                            cm.sendNext("��һ��#i" + belt + "# #b#t" + belt + "##k,�����ٳ���#b" + level + "#k������Ӧ����#b" + points + "ѵ����#k.\r\n\r\n�������õ���������������Ҫ#r" + (points - cm.getPlayer().getDojoPoints()) + "#k�����ѵ����.");
                    } else
                        cm.sendNext("����ȡ֮ǰ#i" + belt + "# #b#t" + belt + "##k,�����ٳ���#b" + level + "#k������Ӧ����#b" + points + "ѵ����#k.\r\n\r\n�������õ���������������Ҫ#r" + (points - cm.getPlayer().getDojoPoints()) + "#k�����ѵ����.");
                    cm.dispose();
                }
            } else if (selectedMenu == 3) { //I want to reset my training points.
                if (status == 0) {
                    cm.sendYesNo("��ȷ��Ҫ����ѵ������?�������Ⲣ�����Ǽ����¡����ú�������¿�ʼ���ѵ���㣬Ȼ������ٴλ������������Ҫ����ѵ������?");
                } else if (status == 1) {
                    if (mode == 0) {
                        cm.sendNext("#r�����Ժ�ѵ���������,ȷ����?#k.");
                    } else {
                        cm.getPlayer().setDojoPoints(0);
                        cm.sendNext("ѵ�����Ѿ�����!");
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 4) { //I want to receive a medal.
                if (status == 0 && cm.getPlayer().getVanquisherStage() <= 0) {
                    cm.sendYesNo("�㻹û��ѫ����?�������һ��ʱ���ڻ��ܹ���,����Ի��#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k.��������#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k��...,����������#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k?");
                } else if (status == 1 || cm.getPlayer().getVanquisherStage() > 0) {
                    if (mode == 0) {
                        cm.sendNext("����㲻�룬Ҳû��ϵ.");
                        cm.dispose();
                    } else {
                        if (cm.getPlayer().getDojoStage() > 37) {
                            cm.sendNext("���Ѿ��������ս.");
                        } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                            cm.sendNext("�㻹��Ҫ#b" + (100 - cm.getPlayer().getVanquisherKills()) + "#kΪ�˻��#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k�����Ŭ��������ܹ�����뿪!#r������ڻ��ܹ����û�н�����һ�㣬�ǾͲ���ʤ��#k.");
                        else if (cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.getPlayer().setVanquisherStage(1);
                        } else {
                            cm.sendNext("��ϲ���Ѿ������#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                            cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                            cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                            cm.getPlayer().setVanquisherKills(0);
                        }
                    }
                    cm.dispose();
                }
            } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                cm.sendNext("�ҵ�ʦ���乫����ǿ����. �����ĵط����������, ���������һ������38��Ľ�����,��37�㽨���ټ���ʦ���ĵ���¥��������,һ��һ�����������,�Ϳ��������Լ�,��Ȼƾ���ʵ��,�����Ǻ����ߵ�����.");
                cm.dispose();
            }
        } else
            cm.dispose();
    } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
        if (selectedMenu == -1)
            selectedMenu = selection;
        status++;
        if (selectedMenu == 0) {
            cm.warp(cm.getPlayer().getMap().getId() + 100, 0);
            cm.dispose();
        } else if (selectedMenu == 1) { //I want to leave
            if (status == 0) {
                cm.sendAcceptDecline("��ȷ��Ҫ�뿪��?");
            } else {
                if (mode == 1) {
                    cm.warp(925020002, "st00");
                }
                cm.dispose();
            }
        } else if (selectedMenu == 2) { //I want to record my score up to this point
            if (status == 0) {
                cm.sendYesNo("����������ķ���������Դ���һ�ν����ĵط���ʼ�������¼�����ڵķ�����?");
            } else {
                if (mode == 0) {
                    cm.sendNext("����������ߵø�Զ��ף����ˣ�");
                } else if (925020000 + cm.getPlayer().getDojoStage() * 100 == cm.getMapId()) {
                    cm.sendOk("��ķ����Ѿ�����¼�ˡ��´�����ս����ʱ���㽫�����￪ʼ.");
                } else {
                    cm.sendNext("��ķ����Ѿ���¼.�´�Ҫ�����￪ʼ��ʱ�������ҶԻ�");
                    cm.getPlayer().setDojoStage((cm.getMapId() - 925020000) / 100);
                }
                cm.dispose();
            }
        }
    } else {
        if (mode == 0) {
            cm.sendNext("ף����ս˳��.");
        } else if (mode == 1) {
            cm.warp(925020002, 0);
            cm.getPlayer().message("���Ǻ��Ժ������ҶԻ���");
        }
        cm.dispose();
    }
}

function isRestingSpot(id) {
    return (id / 100 - 9250200) % 6 == 0;
}
