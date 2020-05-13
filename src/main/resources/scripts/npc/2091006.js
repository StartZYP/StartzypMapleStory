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
	Author: Traitor, XxOsirisxX, Moogra
*/

/**
 * Dojo Entrance NPC
 */
var status = -2;
var readNotice = 0;

function start() {
    cm.sendSimple("#e< ֪ͨ >#n\r\n�����˭��������ս�ң�������������ɣ�- �乫\r\n\r\n\r\n#b#L0#��ս�������.#l\r\n#L1#����ϸ���Ķ�֪ͨ.#l");
}

function action(mode, type, selection) {
    status++;
    if(mode == 0 && type == 0)
        status -= 2;
	                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
    if (mode >= 0) {
        if (selection == 1 || readNotice == 1) {
            if (status == -1) {
                readNotice = 1;
                cm.sendNext("#b<����: ������ս>#k#n\r\n����������������������乫���ܾ���ǰ����������ɽ��ʼ���������������ҵ��ڹ��Ѵﵽ�쳬Խ���޵Ľ׶Ρ���ǰ�������������ų�����������ĳ̶ȡ����Խ��쿪ʼ���ҽӹ����������ֻ��ǿ�߿���ӵ������������ʸ���Ҫ�õ�����ָ����˾�������ս��������Ҫ��ս�ҵ���Ҳ�޷����һ�����֪�������֪��");
            } else if (status == 0)
                cm.sendPrev("������Լ���ս�ҡ�Ҳ�����������ĺ���һ��ǰ����ս��");
            else
                cm.dispose();
        } else {
            if (status == -1 && mode == 1) {
                cm.sendYesNo("(���Ұ��ַ��ڹ�������ʱ��һ�����ص�������ʼ�������ҡ�)\r\n\r\n����ȥ���������");
            } else if (status == 0) {
                if (mode == 0) {
                    cm.sendNext("#b(���Ұ��ִӹ��������ÿ�ʱ���������ҵ���������Ҳ��ʧ��.)");
                } else {
                    cm.getPlayer().saveLocation("MIRROR");
                    cm.warp(925020000, 4);
                }
                cm.dispose();
            }
        }
    } else
        cm.dispose();
}