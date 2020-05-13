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
* @Author : iAkira, Kevintjuh93
**/
var status = 0; 
var selected = 0;

function start() {
	if (cm.getPlayer().getMapId() == 100000000) {
		cm.sendNext("������㿴��������û�У�һ������������ով�������������������ţ����˱��Ͻ��˲�����������������Ǹ¸£�#r�ձ�������������!#k");
	}
}

function action(m,t,s) { 
	if (m > 0) {
		status++; 
		if (cm.getPlayer().getMapId() == 100000000) { // warper completed
			if (status == 1) {
				if (cm.getPlayer().getLevel() >= 12) 
					cm.sendYesNo("�������ڸ���ô�죿ֻ��ҥ�ԣ����ǡ���������˵����㱻�����˰�ܵĻ����п��µ����鷢���������ϡ�����Ҳ������ǼӼ����ڵĴ����������㣬�Ⱦȸ¸£�\���Ӽӿ����е㲻ȷ���Ͳ��������������һ�ŷǳ��õ��ġ��Ҳ����������¡���ȷ�ģ�����������үү����֪����ô��������Ҫ����ȥ������������ȥ��үү��ȥ�ȸ¸�!!!");
				else 
					cm.sendOk("Ŷ�������㻹û�дﵽ���ȸ¸µ�ˮƽ��12�������������.");
          
			} else if (status == 2)
				cm.sendNext("�ǳ���л����ȳ��¸£�����үү������.");
			else if (status == 3) {
				cm.warp(922240200, 0); 
				cm.dispose();
			}
		}
	} else if (m < 1) {
		cm.dispose();
	}
}