/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var toMap = new Array(105070001,211040200, 220050300, 220000000, 240030000);
var inMap = new Array(105000000,211000000, 220000000, 221000000, 240000000);
var cost = new Array(10000,10000, 25000, 25000, 65000);
var location;
var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.sendNext("�ţ����ٿ���һ�¡��������ˣ����㲻�������һ���ķ���е�ʧ��!");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            for (var i = 0; i < toMap.length; i ++) {
                if (inMap[i] == cm.getPlayer().getMap().getId()) {
                    location = i;
                    break;
                }
            }
            cm.sendNext("��ã�������ʱ����ȥ���ص���½Σ�յ�����Σ�յ������ٳ��⳵������Ӫ��·Ϊ��#m" + inMap[location] + "#��#b#m"+toMap[location]+"##k,�۸�Ϊ#b"+ cost[location] +" ��Ҿ����е�󣬵���һ�������ڵģ�#k");
        }
        else if (status == 1)
            cm.sendYesNo("��ȷ��Ҫȥ#b#m"+toMap[location]+"##k��?");
        else if (status == 2) {
            if (cm.getMeso() < cost[location]) {
                cm.sendNext("���ƺ�û���㹻����������ǳ���Ǹ�������㸶�壬�����Ұﲻ���㡣ͨ�������������׬ȡ����Ľ�ң��������㹻��ʱ���ٻ�����");
            } else {
                cm.warp(toMap[location], location != 1 ? 0 : 1);
                cm.gainMeso(-cost[location]);
            }
            cm.dispose();
        }
    }
}
