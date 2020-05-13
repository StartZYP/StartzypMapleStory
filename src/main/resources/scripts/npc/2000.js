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
	Map(s): 		Maple Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status;
var sel1, sel2, sel3, sel4;
var menu = Array("���ܴ���", "�����г�", "װ���̳�", "ѭ������", "�����̵�", "�������", "���ʲ�ѯ", "����ֿ�", "�����ֲ�", "����ѧϰ", "һ��תְ", "������ͼ", "���ߵ���","�����ѯ");

function start() {
	status = -1;
	sel1 = -1;
	var text = " \t\t\t                #e#d��ӭ����#r����۹��ð��С��#k#n              \r\n";
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
			cm.openNpc(2000, "1", "_");
		} else if(sel1 == 1) { //�����г�
			cm.warp(910000000);
			cm.dispose();
		} else if(sel1 == 2) { //װ������̳�
			cm.sendNext("�뽫�����ĵ�װ������װ����#r�ڶ���#k,����ȡ�����װ������#r��һ��#k,����ת�Ʊ�����װ���ѻ�ȡ�����80%����װ����");
		} else if(sel1 == 3) { //ѭ������
			cm.openNpc(2000, "2", "_");
		} else if(sel1 == 4) { //�����̵�
			cm.openShopNPC(9000069);
			cm.dispose();
		} else if(sel1 == 5) { //��Ҷ�齱
			cm.openNpc(2000, 3, "_");
		} else if(sel1 == 6) { //���ʲ�ѯ
			cm.openNpc(2000, 4, "_");
		} else if(sel1 == 7) { //����ֿ�
			cm.openNpc(2000, 5, "_");
		} else if(sel1 == 8) { //�����뼼����
			cm.openNpc(2000, 6, "_");
		} else if(sel1 == 9) { //����ѧϰ
			cm.openNpc(2000, 7, "_");
		} else if(sel1 == 10) {
			cm.openNpc(2000, "һ��תְ", "_");
		} else if(sel1 == 11) {
			var level = cm.getPlayer().getLevel();
			var map = cm.getPlayer().getMapId();
			var continent = map / 1000000;
			var maps = cm.searchMapbycontinent(continent);
			var text = "";
			if(maps.length == 0) {
			text = "û�е�ͼ";
		} else {
			text = "������ͼ���£���ѡ����Ҫȥ�ĵ�ͼ����������Ѵ���Ŷ��������Ŀǰ�ĵȼ��������ƶ���������#b"+10*level*level+"#k�Ľ��Ŷ��\r\n";
			for(var i = 0; i < maps.length; i++) {
				text += "#L" + maps[i] + "##m" + maps[i] + "##l\r\n";
		}
		}
		cm.sendSimple(text);

		}else if(sel1 == 12) {
			cm.openNpc(2000, 9, "_");

		}else if(sel1 == 13) {
			cm.openNpc(2000, 10, "_");

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
		} else if (sel1 == 11) {

		
			if (cm.getPlayer().getMeso()>10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel()) {
				
				cm.warp(selection);
				cm.gainMeso(-10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel());
				cm.dispose();
			} else {
				cm.sendOk("��Ľ�Ҳ������޷������ƶ�");
				cm.dispose();				
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