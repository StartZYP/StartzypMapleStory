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
 * @author: Ronan
 * @npc: Romeo
 * @func: MagatiaPQ area NPC
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
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getEventInstance();
                
                if(!eim.isEventCleared()) {
                        if(status == 0) {
                                if(eim.getIntProperty("npcShocked") == 0 && cm.haveItem(4001131, 1)) {
                                        cm.gainItem(4001131, -1);
                                        eim.setIntProperty("npcShocked", 1);
                                        
                                        cm.sendNext("Ŷ�������ҵ�������������ʱ�̣�Ӧ����ʲô�������������д��·����ˣ�����ǡ����������������ڿ�ʼ��������ǰ������!");
                                        eim.dropMessage(6, "����ŷ��������Ҷ���ź��ƺ��ǳ���.");
                                        
                                        cm.dispose();
                                        return;
                                } else if (eim.getIntProperty("statusStg4") == 1) {
                                        var door = cm.getMap().getReactorByName("rnj3_out3");
                                    
                                        if(door.getState() == 0) {
                                                cm.sendNext("���Ұ��㿪��.");
                                                door.hitReactor(cm.getClient());
                                        } else {
                                                cm.sendNext("���㣬����Ҷ���鷳��.");
                                        }
                                        
                                        cm.dispose();
                                        return;
                                } else if (cm.haveItem(4001134, 1) && cm.haveItem(4001135, 1)) {
                                        if (cm.isEventLeader()) {
                                                cm.gainItem(4001134, -1);
                                                cm.gainItem(4001135, -1);
                                                cm.sendNext("̫���ˣ�����ͷ�а����������Ŭ��˹�صĵ������������ǿ��Լ�����.");

                                                eim.showClearEffect();
                                                eim.giveEventPlayersStageReward(4);
                                                eim.setIntProperty("statusStg4", 1);
                                                
                                                cm.getMap().killAllMonsters();
                                                cm.getMap().getReactorByName("rnj3_out3").hitReactor(cm.getClient());
                                        } else {
                                                cm.sendOk("������Ķӳ����ļ�������.");
                                        }

                                        cm.dispose();
                                        return;
                                } else {
                                        cm.sendYesNo("���Ǳ������ս������������Ҷ���뱣����Ĳ���������㲻�������ȥ�����ͬ����һ���⡣�������ԣ���Ҫ������?");
                                }
                        } else {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if(status == 0) {
                                if(eim.getIntProperty("escortFail") == 0) {
                                        cm.sendNext("�������Ҷ��ȫ�ˣ�������Ŭ�������ǲ��ܰ����������ص����н�ȳ��������������ڽ�������ӵٶ��ܵ����С���������������ʼ���������ǽ�������ע����Ŭ����ȷ���������ٸ�δ�������鷳.");
                                }
                                else {
                                        cm.sendNext("����Ҷ���ڰ�ȫ�ˣ���Ȼս��������������ʧ������������Ŭ�������ǲ��ܰ����������ص����н�ȳ��������������ڽ�������ӵٶ��ܵ����С�лл��.");
                                        status = 2;
                                }
                        } else if(status == 1) {
                                cm.sendNext("���ڣ���������������Ϊ���ǵ�л��.");
                        } else if(status == 2) {
                                if(cm.canHold(4001159)) {
                                        cm.gainItem(4001159, 1);
                                        
                                        if(eim.getIntProperty("normalClear") == 1) cm.warp(926100600, 0);
                                        else cm.warp(926100500, 0);
                                } else {
                                        cm.sendOk("ȷ����ı��������㹻�Ŀ�λ.");
                                }
                                
                                cm.dispose();
                        } else {
                                cm.warp(926100600, 0);
                                cm.dispose();
                        }
                }
        }
}