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
/* Mar the Fairy
	Handles Water of Life
 */

importPackage(Packages.client.inventory);
importPackage(Packages.server);

var status;
var dList;
 
function start() {
        status = -1;
        dList = cm.getDriedPets();
        if(dList.size() == 0) {
                cm.playerMessage(5, "������û�г�����Ҫ������֮ˮ�����ơ�");
                cm.dispose();
                return;
        }
        
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
    
                if (status == 0) {
                        cm.sendYesNo("�ˣ��������ҵ�ħ���ó��︴� ����#b����ˮ#k������������»�������������ô��Ϊ�������������Ʒ���»�����ĳ�����?");
                        
                } else if (status == 1) {
                        var talkStr = "���뻽����ֻ�����ѡ�����������»��ѵĳ���...\r\n\r\n";
                        
                        var listStr = "";
                        var i = 0;
                        
                        var dIter = dList.iterator();
                        while (dIter.hasNext()){
                            var dPet = dIter.next();
                            
                            listStr += "#b#L" + i + "# " + dPet.getName() + " #k - Lv " + dPet.getLevel() + " Closeness " + dPet.getCloseness();
                            listStr += "#l\r\n";
                            
                            i++;
                        }
                        
                        cm.sendSimple(talkStr + listStr);
                } else if (status == 2) {
                        var sPet = dList.get(selection);
                        
                        if(sPet != null) {
                            cm.sendNext("��ĳ��ﱻ���»����ˣ����ǣ��ҵ�ħ�����������ģ������Ҳ��ܱ�֤��ĳ������������������������֮ˮ�ɺ�֮ǰ�չ˺���ֻ�����ô���ټ�...");
                            
                            var it = cm.getPlayer().getInventory(MapleInventoryType.CASH).getItem(sPet.getPosition());
                            it.setExpiration(Date.now() + (1000 * 60 * 60 * 24 * 90));
                            cm.getPlayer().forceUpdateItem(it);
                            
                            cm.gainItem(5180000, -1);
                        } else {
                            cm.sendNext("Ŷ���Ǻðɡ��ټ�������");
                        }
                    
                        cm.dispose();
                }
        }
}