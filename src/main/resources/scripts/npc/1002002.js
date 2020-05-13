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
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
var status = 0;

function start() {
    cm.sendSimple("����˵��#b�ƽ�̲#k��, ����ط��������.�ҿ������ڰ����㵽�Ǹ��ط���ֻ��Ҫ#b10000���#k, �����������һ��#b#t4031134##k,��ô�Ϳ������ȥ.\r\n\r\n#L0##b ��Ը�⸶10000���.#l\r\n#L1# ����#b#t4031134##k.#l\r\n#L2# ʲô��#b#t4031134##k?#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1)
        if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
            if(type == 1)
                cm.sendNext("��һ����ʲô��Ҫ������һ�������кʹ������ˡ�ȥ��Ϣһ�£��������ı����⣬�������ҡ�");
            cm.dispose();
            return;
        } else
            status -= 2;
    if (selection == 0)
        status++;
    if(status == 1){
        if(selection == 1)
            cm.sendYesNo("��������#b#t4031134##k������Դ�����ȥ�ƽ�̲���ðɣ�������Ҫ֪�������Ҳ������һЩ����õģ���������ȥ�ƽ�̲��?");
        else if (selection == 2)
            cm.sendNext("��һ����#b#t4031134##k�ܺ��档������ֻҪ��ӵ����Ϳ������ǰ���ƽ�̲������һ�����ټ��Ķ����������Ƕ����ò��򣬵����ҵ��ǣ�����ǰ��Ū���ˡ�");
    } else if (status == 2){
        if(type != 1 && selection != 0) {
            cm.sendNextPrev("�һ�����ʱ��û����û���о�����⡣ϣ�����˰������������ڰ�ȫ�ĵط������������������ҵĹ��£�˭֪���أ���Ҳ����԰����������ú����á�");
			cm.dispose();
		} else{
            if (cm.getMeso() < 10000 && selection == 0)
                cm.sendNext("���Ǯ�������кܶ෽�����ԳＯ��һЩǮ����֪�������硣���������װ����������ܹ������ִ�����񡣡�����֪������˵ʲô.");
            else if(!cm.haveItem(4031134) && selection != 0){
                cm.sendNext("��ȷ������#b#t4031134##k�����ٺ˶�һ�¡�");
            }else{
                if(selection == 0)
                    cm.gainMeso(-10000);
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
            }
            cm.dispose();
        }
    }
}