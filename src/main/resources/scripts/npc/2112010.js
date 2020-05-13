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
/* Yulete
	Yulete's Office (926110203)
	Magatia NPC
 */

var status;
 
importPackage(Packages.server.life);
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function playersTooClose() {
        var npcpos = cm.getMap().getMapObject(cm.getNpcObjectId()).getPosition();
        var listchr = cm.getMap().getPlayers();
        
        for (var iterator = listchr.iterator(); iterator.hasNext();) {
            var chr = iterator.next();
            
            var chrpos = chr.getPosition();
            if(Math.sqrt( Math.pow((npcpos.getX() - chrpos.getX()), 2) + Math.pow((npcpos.getY() - chrpos.getY()), 2) ) < 310) return true;
        }
        
        return false;
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
                
                if(cm.getMapId() == 926110203) {
                        if(status == 0) {
                                var state = eim.getIntProperty("yuleteTalked");

                                if(state == -1) {
                                    cm.sendOk("�٣����������а��ˡ���������ÿ��ĵ㣬����ò���������뿪.");

                                } else if (playersTooClose()) {
                                    cm.sendOk("Ŷ����á��Դ����ǽ������������������һֱ�ڼ������ǵ��ж������������������ˣ�����һ���˲���ĳɾ͡����ڣ����ڣ�����ʱ�䣬�������и�Լ�ᣬ��������Ҫ��١������ģ��ҵ�����̳��˻ᴦ�����������˵ġ���������������ھ���.");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else if (eim.getIntProperty("npcShocked") == 0) {
                                    cm.sendOk("�Ǻ�~�㲻�Ǻܽƻ��𣿺ðɣ�û��ϵ���Դ����ǽ������������������һֱ�ڼ������ǵ��ж������������������ˣ�����һ���˲���ĳɾ͡����ڣ����ڣ�����ʱ�䣬�������и�Լ�ᣬ��������Ҫ��١������ģ��ҵ�����̳��˻ᴦ�����������˵ġ���������������ھ���.");

                                    eim.setIntProperty("yuleteTalked", -1);
                                } else {
                                    cm.sendOk("... ����ʲô������ô���ģ����������Ѿ��������������еĵ�·��������������������ܿ�ͻ���������ǣ��������������㣡�ǵģ��㡣�㲻�������µ���Ϊֹ�𣬻�ͷ�������ͬ�飬������Ҫ������������Ҫ������.");

                                    eim.setIntProperty("yuleteTalked", 1);
                                }
                        }
                        
                        cm.dispose();
                } else {
                        if(status == 0) {
                                if(eim.isEventCleared()) {
                                        cm.sendOk("Nooooo... �ұ����ˣ�������ô���أ���������һ�ж���Ϊ�˷�չ��ΰ������������㲻�ܰ��ҹ�����������������վ�����������ĵط����˶��������£�����������ֻ����Ϊ��ѧ����Ϊ��Σ�յģ��;����谭���ķ�չ������Ŷ������!");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("���������ӵ��������о��Ķ���! Hahahahahahaha...");
                                        } else if(state == 0) {
                                                cm.sendOk("��������̫ʹ���ˣ����졣�ܺã��Ҹ��������µ�����������õ�����������, #rFrankenroid#k.");
                                                eim.dropMessage(5, "������: �Ұ������µ��������㣬������õ������������ģ���������!");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300151);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("��������̫ʹ���ˣ����졣�ܺã�������չʾ�ҵ������������ɰ����������Ŭ��˹����õ�����������Щ��ӵ�������ĵ����ǽ�ֹЯ��������, ��� #����ľ���֮��#k!");
                                                eim.dropMessage(5, "������: ������չʾ�����µ��������ɰ����������Ŭ��˹����õ�����������Щ��ӵ�������ĵ����ǽ�ֹ�����ģ�ǿ���#r��������#k!!");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300152);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 2);
                                                eim.setIntProperty("yuletePassed", -1);
                                        }
                                }
                        }
                        
                        cm.dispose();
                }
        }
}