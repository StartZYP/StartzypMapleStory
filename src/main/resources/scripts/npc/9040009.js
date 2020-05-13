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
var status;
var stage;

function clearStage(stage, eim) {
        eim.setProperty("stage" + stage + "clear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(stage);
}

function start() {
    status = -1;
    action (1, 0, 0);
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
        
        var eim = cm.getPlayer().getEventInstance();
        if (eim == null) {
            cm.warp(990001100);
        } else {
            if(eim.getProperty("stage1clear") == "true") {
                cm.sendOk("Ư�����������һ�׶�.");
                cm.dispose();
                return;
            }
            
            if (cm.isEventLeader()) {
                if (status == 0) {
                    if (eim.getProperty("stage1status") == null || eim.getProperty("stage1status").equals("waiting")) {
                        if (eim.getProperty("stage1phase") == null) {
                            stage = 1;
                            eim.setProperty("stage1phase",stage);
                        } else {
                            stage = parseInt(eim.getProperty("stage1phase"));
                        }
                        
                        if (stage == 1) {
                            cm.sendOk("�������ս�У��ҽ�������Χ�ĵ�����չʾһ��ͼ��������˵�������ʱ���ظ����ģʽ���Ҽ���.");
                        } else {
                            cm.sendOk("�����ҽ�Ϊ�����һ�����ѵ����⡣ף�����");
                        }
                    } else if (eim.getProperty("stage1status").equals("active")) {
                        stage = parseInt(eim.getProperty("stage1phase"));
                        
                        if (eim.getProperty("stage1combo").equals(eim.getProperty("stage1guess"))) {
                            if (stage == 3) {
                                cm.getPlayer().getMap().getReactorByName("statuegate").forceHitReactor(1);
                                clearStage(1, eim);
                                cm.getGuild().gainGP(15);

                                cm.sendOk("Ư�����������һ�׶�.");
                            } else {
                                cm.sendOk("�ܺá��������㻹��Ҫ��ɸ���Ĺ�����׼���ú��ٸ���˵��");
                                eim.setProperty("stage1phase", stage + 1);
                                cm.mapMessage(5, "���Ѿ�����˲��� " + stage + "��ʯ�����.");
                            }

                        } else {
                            eim.showWrongEffect();
                            cm.sendOk("�㲻����.");
                            cm.mapMessage(5, "���Ѿ�ʧ����.");
                            eim.setProperty("stage1phase","1");
                        }
                        eim.setProperty("stage1status", "waiting");
                        cm.dispose();
                    } else {
                        cm.sendOk("�������ڴ���ͼ�������Ժ�");
                        cm.dispose();
                    }
                }
                else if (status == 1) {
                    var reactors = getReactors();
                    var combo = makeCombo(reactors);
                    cm.mapMessage(5, "������ʾ��ϣ����Ժ�.");
                    var delay = 5000;
                    for (var i = 0; i < combo.length; i++) {
                        cm.getPlayer().getMap().getReactorByOid(combo[i]).delayedHitReactor(cm.getClient(), delay + 3500*i);
                    }
                    eim.setProperty("stage1status", "display");
                    eim.setProperty("stage1combo","");
                    cm.dispose();
                }
            } else {
                cm.sendOk("�㲻���峤����������峤������.");
                cm.dispose();
            }
        }
    }
}

//method for getting the statue reactors on the map by oid
function getReactors() {
    var reactors = new Array();
        
    var iter = cm.getPlayer().getMap().getReactors().iterator();
    while (iter.hasNext()) {
        var mo = iter.next();
        if (!mo.getName().equals("statuegate")) {
            reactors.push(mo.getObjectId());
        }
    }
    
    return reactors;
}

function makeCombo(reactors) {
    var combo = new Array();
    while (combo.length < (stage + 3)) {
        var chosenReactor = reactors[Math.floor(Math.random() * reactors.length)];
        var repeat = false;
        if (combo.length > 0) {
            for (var i = 0; i < combo.length; i++) {
                if (combo[i] == chosenReactor) {
                    repeat = true;
                    break;
                }
            }
        }
        if (!repeat) {
            combo.push(chosenReactor);
        }
    }
    return combo;
}