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
	NPC Name: 		Sera
	Map(s): 		Maple Road : Entrance - Mushroom Town Training Camp (0), Maple Road: Upper level of the Training Camp (1), Maple Road : Entrance - Mushroom Town Training Camp (3)
	Description: 		First NPC
*/

var status = -1;

function start() {
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3)
        cm.sendYesNo("��ӭ����ð�յ�.���ѵ��Ӫ��Ŀ���ǰ�����ѧ�ߡ�����μ����ѵ��Ӫ����Щ��û�вμ�ѵ���ƻ��Ϳ�ʼ�����ǵ��ó̡�����ǿ�ҽ������Ȳμ�ѵ���ƻ�.");
    else
        cm.sendNext("������ĵ�һ��ѵ���ƻ���ʼ��ͼ���ҡ������������㽫Ԥ�ȵ�������ѡ�������.");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && status == 0){
            cm.sendYesNo("����������Ͽ�ʼ����ó���?");
            return;
        }else if(mode == 0 && status == 1 && type == 0){
            status -= 2;
            start();
            return;
        }else if(mode == 0 && status == 1 && type == 1)
            cm.sendNext("����������������ʱ�����ٺ���̸̸.");
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 0 || cm.c.getPlayer().getMapId() == 3){
        if(status == 0){
            cm.sendNext("�ðɣ����Ҿ��������ѵ��Ӫ����������ʦ��ָ��.");
        }else if(status == 1 && type == 1){
            cm.sendNext("�������벻�μ�ѵ���Ϳ�ʼ����ó̡����Ҿ�����ȥѵ������С�ĵ�~");
        }else if(status == 1){
            cm.warp(1, 0);
            cm.dispose();
        }else{
            cm.warp(40000, 0);
            cm.dispose();
        }
    }else
    if(status == 0)
        cm.sendPrev("һ�����㹻Ŭ����ѵ����������ʸ�רְ������Գ�Ϊ���ִ�Ĺ����֣�ħ�����ֵ�ħ��ʦ����ʿ�������ʿ���������е�С͵������");
    else
        cm.dispose();
}
