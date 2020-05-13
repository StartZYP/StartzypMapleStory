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
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
*/

importPackage(Packages.tools);
importPackage(java.awt);

var stage1Questions = Array(
    "��һ�����⣺תְ��սʿ����͵ȼ��Ƕ���?#b\r\n(�򵹹����ȡ��Ӧ������֤��.)",
    "��һ�����⣺תְ��սʿ���������ֵ(SEX)�Ƕ���?#b\r\n(�򵹹����ȡ��Ӧ������֤��.)",
    "��һ�����⣺תְ��ħ��ʦ���������ֵ(INT)�Ƕ���?#b\r\n(�򵹹����ȡ��Ӧ������֤��.)",
    "��һ�����⣺תְ�ɹ����ֵ��������ֵ(DEX)�Ƕ��٣�#b\r\n(�򵹹����ȡ��Ӧ������֤�顣)",
    "��һ�����⣺תְ�ɷ������������ֵ(DEX)�Ƕ��٣�#b\r\n(�򵹹����ȡ��Ӧ������֤�顣)",
    "��һ�����⣺�ڶ���תְ�����Ҫ�ĵȼ�(LEVEL)�Ƕ���? #b\r\n(�򵹹����ȡ��Ӧ������֤�顣)",
    "��һ�����⣺תְ��ħ��ʦ����͵ȼ�(LEVEL)�Ƕ���?#b\r\n(�򵹹����ȡ��Ӧ������֤��.)");
var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);

var stage2Rects = Array(new Rectangle(-755,-132,4,218),new Rectangle(-721,-340,4,166),new Rectangle(-586,-326,4,150),new Rectangle(-483,-181,4,222));
var stage3Rects = Array(new Rectangle(608,-180,140,50),new Rectangle(791,-117,140,45),
    new Rectangle(958,-180,140,50),new Rectangle(876,-238,140,45),
    new Rectangle(702,-238,140,45));
var stage4Rects = Array(new Rectangle(910,-236,35,5),new Rectangle(877,-184,35,5),
    new Rectangle(946,-184,35,5),new Rectangle(845,-132,35,5),
    new Rectangle(910,-132,35,5),new Rectangle(981,-132,35,5));
    
var stage2Combos = Array(Array(0,1,1,1),Array(1,0,1,1),Array(1,1,0,1),Array(1,1,1,0));
var stage3Combos = Array(Array(0,0,1,1,1),Array(0,1,0,1,1),Array(0,1,1,0,1),
    Array(0,1,1,1,0),Array(1,0,0,1,1),Array(1,0,1,0,1),
    Array(1,0,1,1,0),Array(1,1,0,0,1),Array(1,1,0,1,0),
    Array(1,1,1,0,0));
var stage4Combos = Array(Array(0,0,0,1,1,1),Array(0,0,1,0,1,1),Array(0,0,1,1,0,1),
    Array(0,0,1,1,1,0),Array(0,1,0,0,1,1),Array(0,1,0,1,0,1),
    Array(0,1,0,1,1,0),Array(0,1,1,0,0,1),Array(0,1,1,0,1,0),
    Array(0,1,1,1,0,0),Array(1,0,0,0,1,1),Array(1,0,0,1,0,1),
    Array(1,0,0,1,1,0),Array(1,0,1,0,0,1),Array(1,0,1,0,1,0),
    Array(1,0,1,1,0,0),Array(1,1,0,0,0,1),Array(1,1,0,0,1,0),
    Array(1,1,0,1,0,0),Array(1,1,1,0,0,0));

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);
    
    eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
}

function rectangleStages(eim, property, areaCombos, areaRects) {
    var c = eim.getProperty(property);
    if(c == null) {
        c = Math.floor(Math.random() * areaCombos.length);
        eim.setProperty(property, c.toString());
    }
    else c = parseInt(c);
    
    // get player placement
    var players = eim.getPlayers();
    var playerPlacement = new Array(0, 0, 0, 0, 0, 0);

    for(var i = 0; i < eim.getPlayerCount(); i++) {
        for(var j = 0; j < areaRects.length; j++) {
            if(areaRects[j].contains(players.get(i).getPosition())) {
                playerPlacement[j] += 1;
                break;
            }
        }
    }

    var curCombo = areaCombos[c];
    var accept = true;
    for(var j = 0; j < curCombo.length; j++) {
        if(curCombo[j] != playerPlacement[j]) {
            accept = false;
            break;
        }
    }
    
    return accept;
}

var status = -1;
var eim;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
        eim = cm.getEventInstance();
    
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
                    
                if(status == 0) {
                        var curMap = cm.getMapId();
                        var stage = curMap - 103000800 + 1;
                        if(eim.getProperty(stage.toString() + "stageclear") != null) {
                                if(stage < 5) {
                                        cm.sendNext("���ڿ��Ե���һ���ؿ��ˣ���������Ļ����ſ��ܾ͹ر��ˡ�");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendNext("�������ţ����������Ա�����������������ս����Ϊ�������ҽ�����һЩ��������ȷ���������������������װ�����Ƿ���һ����Ŀ���ϵĿո�");
                                }
                        }
                        else if(curMap == 103000800) {   // stage 1
                                if(cm.isEventLeader()) {
                                        var numpasses = eim.getPlayerCount() - 1;     // minus leader

                                        if(cm.hasItem(4001008, numpasses)) {
                                                cm.sendNext("��ϲ���ǳɹ��ռ��� " + numpasses + " ��ͨ��֤��! �Աߵ�ͨ������������ȥ��һ���ؿ���ʱ�䲻������ץ��ʱ��.ף���Ǻ���!");
                                                clearStage(stage, eim, curMap);
                                                eim.gridClear();
                                                cm.gainItem(4001008, -numpasses);
                                        }
                                        else {
                                                cm.sendNext("����Ҫ�ռ�#b��Ӧ��Ŀ#k��֤����� ���ͨ��֤�����ӳ�֮�󣬰����������Ѱɣ�");
                                        }
                                }
                                else {
                                        var data = eim.gridCheck(cm.getPlayer());

                                        if(data == 0) {
                                                cm.sendNext("ף���㣬���ͨ��֤�����ӳ�֮�󣬰����������Ѱɣ�");
                                        } else if(data == -1) {
                                                data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                                                eim.gridInsert(cm.getPlayer(), data);

                                                var question = stage1Questions[data - 1];
                                                cm.sendNext(question);
                                        } else {
                                                var answer = stage1Answers[data - 1];

                                                if(cm.itemQuantity(4001007) == answer) {
                                                        cm.sendNext("�ش���ȷ! ���Ѿ�������ͨ��֤�����ͨ��֤�����ӳ�֮�󣬰����������Ѱɣ�");
                                                        cm.gainItem(4001007, -answer);
                                                        cm.gainItem(4001008, 1);
                                                        eim.gridInsert(cm.getPlayer(), 0);
                                                }
                                                else {
                                                        var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                                                        cm.sendNext("�ش����!\r\n" + question);
                                                }
                                        }
                                }
                                
                                cm.dispose();
                        } else if(curMap == 103000801) {   // stage 2
                                var stgProperty = "stg2Property";
                                var stgCombos = stage2Combos;
                                var stgAreas = stage2Rects;

                                var nthtext = "��", nthobj = "����", nthverb = "����", nthpos = "������λ��̫��";
                                var nextStgId = 103000802;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("���������Ƕӳ���ָʾһ�𣬹�ͬ��ɱ���.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ӭ������ " + nthtext + " ��. �����Աߵ� " + nthobj + "�˰ɣ�, #b3 ��������ȷ�������ϾͿ��Խ�����һ��#k. ��Ȼ����Ҫ�� #b3 ��ԱȥѰ�ҵ���ȷ�� " + nthobj + " �� " + nthverb + " ��ȥ.#k\r\n����㲻֪������ʲô�� �뾡�������м�� " + nthobj + " ȥ������ȷ�Ĵ�. ��Ȼ��ֻ��3����Ա�������� " + nthobj + ". һ����Ա " + nthverb + "����ȥ,�ӳ���Ҫ #b˫�� �� ȥ����Ƿ�ش���ȷ#k. ���ڣ�ȥѰ��������ȷ�� " + nthobj + " ��!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���ڿ��Ե���һ���ؿ��ˣ���������Ļ����ſ��ܾ͹ر��ˡ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ��� 3 ����ȷ�� " + nthobj + " �볢�Բ�ͬ����ϣ�ֻ����3λ��Ա������ȥ, ��Ȼ���������λ��̫����Ҳ������,�����뾡�������м�λ��. ����ǰ��!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000802) {
                                var stgProperty = "stg3Property";
                                var stgCombos = stage3Combos;
                                var stgAreas = stage3Rects;

                                var nthtext = "��", nthobj = "����", nthverb = "վ��";
                                var nextStgId = 103000803;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("���������Ƕӳ���ָʾһ�𣬹�ͬ��ɱ���.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ӭ������ " + nthtext + " ��. �����Աߵ� " + nthobj + "�˰�, #b3 վ������ȷ����������Ϳ��Խ�����һ��#k. ��Ȼ����Ҫ�� #b3 ��ԱȥѰ�ҵ���ȷ�� " + nthobj + " �� " + nthverb + " ��ȥ��#k\r\n����㲻֪������ʲô�� �뾡�������м�� " + nthobj + " ȥ������ȷ�Ĵ�. ��Ȼ��ֻ��3����Ա����վ���� " + nthobj + " ����.һ��" + nthverb + "����ȥ, �ӳ���Ҫ #b˫�� �� ȥ����Ƿ�ش���ȷ#k. ���ڣ�ȥѰ����ȷ�� " + nthobj + " ��!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���ڿ��Ե���һ���ؿ��ˣ���������Ļ����ſ��ܾ͹ر��ˡ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ��� 3 ����ȷ�� " + nthobj + " �볢�Բ�ͬ����ϣ�ֻ����3λ��Ավ����ȥ, ��Ȼ���վ����λ��̫Զ��Ҳ������,�����뾡�������м�λ��. ����ǰ��!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000803) {
                                var stgProperty = "stg4Property";
                                var stgCombos = stage4Combos;
                                var stgAreas = stage4Rects;

                                var nthtext = "��", nthobj = "ľͰ", nthverb = "վ��";
                                var nextStgId = 103000804;

                                if(!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("���������Ƕӳ���ָʾһ�𣬹�ͬ��ɱ���.");
                                }
                                else if(eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("��ӭ������ " + nthtext + " ��. �����Աߵ� " + nthobj + ". �˰�, #b3 վ������ȷ��ľͰ����Ϳ��Խ�����һ��#k. ��Ȼ����Ҫ�� #b3 ��ԱȥѰ�ҵ���ȷ�� " + nthobj + " �� " + nthverb + " ��ȥ��#k\r\n����㲻֪������ʲô�� �뾡�������м�� " + nthobj + " ȥ������ȷ�Ĵ�. ��Ȼ��ֻ��3����Ա����վ���� " + nthobj + " ����.һ��" + nthverb + "����ȥ, �ӳ���Ҫ #b˫�� �� ȥ����Ƿ�ش���ȷ#k. ���ڣ�ȥѰ����ȷ�� " + nthobj + " ��!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if(accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("���ڿ��Ե���һ���ؿ��ˣ���������Ļ����ſ��ܾ͹ر��ˡ�");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("���������ǻ�û���ҵ��� 3 ����ȷ�� " + nthobj + " �볢�Բ�ͬ����ϣ�ֻ����3λ��Ավ����ȥ, ��Ȼ���վ����λ��̫Զ��Ҳ������,�����뾡�������м�λ��. ����ǰ��!");
                                        }
                                }

                                cm.dispose();
                        } else if(curMap == 103000804) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        if (cm.haveItem(4001008, 10)) {
                                                cm.sendNext("�������ͨ�����һ���ؿ��������кܶ����͵Ĺ��������ף�������������ͨ��������ս��");
                                                cm.gainItem(4001008, -10);

                                                clearStage(stage, eim, curMap);
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("��ã���ӭ������5�׶Σ��������ߣ����ܻᷢ�ֺܶ����͵Ĺ��������ǣ���ȡͨ��֤���ٰ����ǽ����ҡ���ס��������ܱ���ǿ��ܶ࣬��С��һ�㣬ף��ͨ����һ�ء�");
                                        }
                                } else {
                                        cm.sendNext("��ӭ������5�׶Σ��ڵ�ͼ�����ߣ���ͻῴ��������͵Ĺ��������ǻ�ȡ�������ϵ�ͨ��֤���������ǵ���ӳ���");
                                }
                                
                                cm.dispose();
                        }
                }
                else if (status == 1) {
                        if(!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("��Ϊ�������ҽ�����һЩ��������ȷ���������������������װ�����Ƿ���һ����Ŀ���ϵĿո�");
                        } else {
                                cm.warp(103000805, "st00");
                        }
                        
                        cm.dispose();
                }
        }
}
