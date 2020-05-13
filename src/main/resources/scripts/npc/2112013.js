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
 * @npc: Investigation Result
 * @func: Gives MagatiaPQ stg1 item
*/

function start() {
    var eim = cm.getEventInstance();
    var book = "stg1_b" + (cm.getNpcObjectId() % 26);
    
    var res = eim.getIntProperty(book);
    if(res > -1) {
        eim.setIntProperty(book, -1);
        
        if(res == 0) {  // mesos
            var mgain = 500 * cm.getPlayer().getMesoRate();
            cm.sendNext("Earned " + mgain + " mesos!");
            cm.gainMeso(mgain);
        } else if(res == 1) {  // exp
            var egain = 500 * cm.getPlayer().getExpRate();
            cm.sendNext("Earned " + egain + " exp!");
            cm.gainExp(egain);
        } else if(res == 2) {  // letter
            var letter = 4001130;
            if(!cm.canHold(letter)) {
                cm.sendOk("���յ�һ���ţ�����ı����ռ䲻�㣬����������Ż�ȥ��.");
                cm.dispose();
                return;
            }
            
            cm.gainItem(letter, 1);
            cm.sendNext("�㷢����һ���ţ�������������������������.");
        } else if(res == 3) {  // pass
            cm.sendNext("���ҵ�����һ�׶ε�����.");
            
            var eim = cm.getEventInstance();
            eim.showClearEffect();
            eim.giveEventPlayersStageReward(1);
            eim.setIntProperty("statusStg1", 1);
            
            cm.getMap().getReactorByName("d00").hitReactor(cm.getClient());
        }
    } else {
        cm.sendNext("����ʲô��û��.");
    }
    
    cm.dispose();
}
