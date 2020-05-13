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
 * @author BubblesDev, Rich for text, Ronan for PNPCs
 */

var status = 0;
var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var minJobType = 11;
var maxJobType = 15;

function start() {
    var jobType = parseInt(cm.getJobId() / 100);
    if (jobType >= minJobType && jobType <= maxJobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "���Ѿ������˺ܾã����ܴﵽ������������ǻۺ�������������������#r���������������λ����#k?��ϲ����?";
        if(spawnPnpcFee > 0) {
            sendStr += "�ҿ���Ϊ����һ�ܵ�����Ҫ����#b " + cm.numberWithCommas(spawnPnpcFee) + "���.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("��ӭ������ҫ������");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("�Բ�����û���㹻�Ľ�����������������õ�λ�á�");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("���ˣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("�Բ����������������ˡ�����");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}