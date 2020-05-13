/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

importPackage(Packages.client.inventory);
importPackage(Packages.client.inventory.manipulator);
importPackage(Packages.server);
importPackage(Packages.tools);
importPackage(Packages.scripting);


function start() {
	//var oldEquip=cm.getEquipInSlot(1);
	//var newEquip=cm.getEquipInSlot(2);
	//cm.eatEquip(cm.getPlayer(),oldEquip,newEquip);
	//cm.removeItem(1,1,1);
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	var oldEquip=cm.getEquipInSlot(1);
	var newEquip=cm.getEquipInSlot(2);
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("#L0#装备经验转移#l");
    } else if (status == 1) {
	    cm.sendNext("请注意，需要转移的旧装备放到装备格第一格，新装备放到第二格");
    } else if (status == 2) {	
	if (cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(1) == null){
cm.sendOk("第一个格子并没有装备");

   } else if(cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(2) == null){
cm.sendOk("第二个格子并没有装备");
	}
	
	else{
	cm.eatEquip(cm.getPlayer(),oldEquip,newEquip);
	cm.removeItem(1,1,1);
    }
	
    cm.dispose();
}
}