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
/* Author: Xterminator
	NPC Name: 		Robin
	Map(s): 		Maple Road : Snail Hunting Ground I (9010000)
	Description: 		Beginner Helper
*/
var status;
var sel1, sel2, sel3, sel4;
var menu = Array("���ܴ���", "�����г�", "�����̵�", "һ��תְ", "��������", "����ʱװ", "����ֿ�");

function start() {
	status = -1;
	sel1 = -1;
	var text = " \t\t\t           #e#d��ӭ����#k MapleStory #k#n              \r\n          \r\n";
	text += "#d��ɫ���ƣ�#b" + cm.getName() + "#k#n\t\t  #dʣ���ң�#b" + cm.getMeso() + "#k#n\r\n";
	text += "#d�����#b" + cm.getPlayer().getCashShop().getCash(1) + "#k#n\t#d         ������#b" + cm.getPlayer().getCashShop().getCash(4) + "#k#n\r\n";
	text += generateSelectionMenu(menu);
	cm.sendSimple(text);
}
var prize = Array(2040006, 2040007, 2040041, 2040042, 2040334, 2040403, 2040430, 2040506, 2040538, 2040539, 2040603, 2040630, 2040709, 2040710, 2040711, 2040740, 2040741, 2040742, 2040806, 2040829, 2040830, 2040903, 2040936, 2041024, 2041025, 2041066, 2041067, 2043003, 2043023, 2043103, 2043117, 2043203, 2043217, 2043303, 2043312, 2043703, 2043712, 2043803, 2043812, 2044003, 2044025, 2044103, 2044117, 2044203, 2044217, 2044303, 2044317, 2044403, 2044417, 2044503, 2044512, 2044603, 2044612, 2044703, 2044712);

function action(mode, type, selection) {
	status++;
	if(mode != 1) {
		if(mode == 0 && type != 4)
			status -= 2;
		else {
			cm.dispose();
			return;
		}
	}
	if(status == 0) {
		if(sel1 == -1)
			sel1 = selection;
		if(sel1 == 0) { //���ܴ���
			cm.openNpc(9010000, "1", "_");
		} else if(sel1 == 1) { //�����г�
			cm.warp(910000000);
			cm.dispose();
		} else if(sel1 == 2) { //�����̵�
			cm.openShopNPC(11100);
			cm.dispose();
		} else if(sel1 == 3) {
			cm.openNpc(9010000, "һ��תְ", "_");
                                } else if(sel1 == 4) {
			cm.openNpc(1012117, "��������", "_");
                                } else if(sel1 == 5) {
			cm.openNpc(9010000, "����ʱװ", "_"); 
		} 
	} else if(status == 1) {
		if(sel1 == 2) {
			var item1 = cm.getEquipInSlot(1);
			var item2 = cm.getEquipInSlot(2);
			if(item1 == null || item2 == null) {
				cm.sendOk("���װ���ź�");
				cm.dispose();
			} else {
				cm.eatEquip(cm.getPlayer(), item2, item1);
				cm.removeItem(2, 1, 1);
			}
		}
	}
}

function generateSelectionMenu(array) { // nice tool for generating a string for the sendSimple functionality
	var menu = "";
	for(var i = 0; i < array.length; i++) {
		menu += "#L" + i + "##r" + array[i] + "#k#l";
		if(i % 4 == 3) {
			menu += "\r\n";
		} else {
			menu += "\t";
		}
	}
	return menu;
}