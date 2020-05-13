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
var pay = 1800;
var ticket = 4031134;
var msg;
var check;
var access = false;
var status = 0;

function start() {
    cm.sendSimple("����˵�����Կ����󺣵ĺ�̲�� #b#m110000000##k, �������е�Զ #m"+cm.getPlayer().getMapId()+"#? �����ڿ��Դ���ȥ���� #b"+pay+" ���#k, �������#b#t"+ticket+"##k �������ϣ������������ˡ�\r\n\r\n#L0##b��Ը�⸶ "+pay+" ���.#k#l\r\n#L1##b���� #t"+ticket+"##k#l\r\n#L2##b����֪�� #t"+ticket+"#?#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } 
		if (mode == 0 && status == 1) {
            cm.sendNext("��һ����ʲô��Ҫ������һ�������кʹ������ˡ�ȥ��Ϣһ�£��������ı����⣬�������ҡ�");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0)
                    msg = "���븶Ǯ��? ����#b"+pay+" ���#k ����ȥ #m110000000#?";
                else if (selection == 1)
                    msg = "�������� #b#t"+ticket+"##k? �������ʱǰ�� #m110000000# ����.";
                cm.sendYesNo(msg+" �ð�! !��ע�⣬����ܻ�����������һЩ�������һ����Ҫ���ֲ������õģ���Ҫ��Ҫȥ #m110000000# ���ں�Щ����?");
            } else if (selection == 2) {
                cm.sendNext("��һ���ܺ��� #b#t"+ticket+"##k. �ǵģ����ܿ������� #t"+ticket+"# ��һ����Ʒ��ֻҪ��ӵ�У������ʹ��ķ�ʽ#m110000000# ��ѵġ�����һ���ǳ���������Ʒ�������������ò�ȥ�򣬵����ҵ��ǣ����ڼ�������ǰ��һ������ĩ����Ū���ˡ�");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getPlayer().getMeso() < pay) {
                    cm.sendOk("�Ҿ�����ȱ�ٽ�ҡ���Ǯ�ķ����кܶ࣬���硭��������Ŀ��ס���ܹ������������֪������˵ʲô��");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("�ţ�ȷ��λ�������� #b#t"+ticket+"##k?? ��ȷ��������?����ϸ��顣");
                    cm.dispose();
                } else
                    access = true;
            } 
            if (access == true) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3)
            cm.sendNext("��һ���ܺ��� #b#t"+ticket+"##k. �ǵģ����ܿ������� #t"+ticket+"# ��һ����Ʒ��ֻҪ��ӵ�У������ʹ��ķ�ʽ #m110000000# ��ѵġ�����һ���ǳ���������Ʒ�������������ò�ȥ�򣬵����ҵ��ǣ����ڼ�������ǰ��һ������ĩ����Ū���ˡ�");
        else if (status == 4)
            cm.sendPrev("�һ�����ʱ��û������û�����о�����⡣ϣ�����˰������������ڰ�ȫ�ĵط������������������ҵĹ��£�˭֪���أ�����ܻ�������������ú����á���������κ����⣬������");
        else if (status == 5)
            cm.dispose();
    }
}
