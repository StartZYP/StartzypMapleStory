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
@       Author : Ronan
@
@	NPC = Amos (PQ)
@	Map = AmoriaPQ maps
@	Function = AmoriaPQ Host
@
@	Description: Bonus stages of the Amorian Challenge
*/

var debug = false;
var status = 0;
var curMap, stage;

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 670010200) / 100) + 1;
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else if (mode == 0){
            cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getPlayer().getEventInstance();
                if(curMap == 670010750) {
                        if(cm.haveItem(4031597, 35)) {
                                if(cm.canHold(1102101) && eim.getIntProperty("marriedGroup") == 0) {
                                        eim.setIntProperty("marriedGroup", 1);

                                        var baseId = (cm.getPlayer().getGender() == 0) ? 1102101 : 1102104;
                                        var rnd = Math.floor(Math.random() * 3);
                                        cm.gainItem(baseId + rnd);

                                        cm.sendNext("�ü��ˣ����ǵ�һ������35Ӣ��#t4031597#Ӣ�����ˡ��������������Ĺ���.");
                                        cm.gainItem(4031597, -35);
                                        cm.gainExp(4000 * cm.getPlayer().getExpRate());
                                } else if(eim.getIntProperty("marriedGroup") == 0) {
                                        cm.sendNext("��̸�ۻ�֮ǰ���ȼ��һ�����Ƿ��п�λ��");
                                } else {
                                        cm.sendNext("35 #t4031597#.�ɵúã���ϧ�������˵�һ�����Ͽ�ȥ��������̨�����ʱ��!");
                                        cm.gainItem(4031597, -35);
                                        cm.gainExp(4000 * cm.getPlayer().getExpRate());
                                }
                        } else {
                                cm.sendNext("Ҫ��������ȡ��Ʒ�����������ı�ͽ��������35#t4031597#��ֻ�е�һ����Ҳ���#r��ô�#k�� ������������Ȼ���Դ����ר���л�þ������������ߣ������ѡ�� #b������������׶�#k�߹�ȥ�ճ��� #b�������#k.");
                        }
                } else {
                        cm.sendNext("�Ͽ�ȥ��������̨�����ʱ��!");
                }
                
                cm.dispose();
        }
}