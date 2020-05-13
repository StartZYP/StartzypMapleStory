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
/* 	Sixx
	Singa REG/VIP Eye Color Changer
*/

var status = 0;
var beauty = 0;
var colors = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
    cm.sendSimple("�ˣ��������ϣ��˹������CBD�Ļ�ױ��Ƭ! ʹ��#b#t5152039##k��#b#t5152040##k,������������չ˺������ˣ�ӵ����һֱ�������������գ���ס��ÿ����ע�⵽��ĵ�һ���¾����۾������ǿ��԰����ҵ����ʺ���Ļ�ױ�������ڣ�������ʲô��\r\n#L1#ʹ��: #i5152039##t5152039##l\r\n#L2#ʹ��: #i5152040##t5152040##l\r\n#L3#ʹ��: #i5152107# (�κ���ɫ)#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                var current = cm.getPlayer().getFace()% 100 + 20000 + cm.getPlayer().getGender() * 1000;
                cm.sendYesNo("�����ʹ����ͨ�Ż�ȯ������������һ����ױ��Ƭ�� �����Ҫ��#b#t5152039##k���ı�����۾���");
            } else if (selection == 2) {
                beauty = 2;
                var current = cm.getPlayer().getFace()% 100 + 20000 + cm.getPlayer().getGender() * 1000;
                pushIfItemsExists(colors, [current + 200, current + 300, current +400, current + 700]);
                cm.sendStyle("ʹ�����ǵ�ר�û����������������ƺ���ǰ�����Լ��������ʲô���ľ�Ƭ��ѡ����ϲ���ķ��", colors);
            } else if (selection == 3) {
                beauty = 3;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 21000;
                }
                
                colors = Array();
                for (var i = 0; i < 8; i++) {
                    if (cm.haveItem(5152100 + i)) {
                        pushIfItemExists(colors, current + 100 * i);
                    }
                }
                
                if (colors.length == 0) {
                    cm.sendOk("��û��һ���Ի�ױ����");
                    cm.dispose();
                    return;
                }
                
                cm.sendStyle("�����ʲô���ľ�Ƭ����ѡ����ϲ���Ŀ�ʽ��", colors);
            }
        }
        else if (status == 2) {
            if (beauty == 1){
                if (cm.haveItem(5152039)){
                    cm.gainItem(5152039, -1);
                    cm.setFace(Math.floor(Math.random() * 8) * 100 + current);
                    cm.sendOk("��������µĺ͸Ľ��Ļ�ױ��Ƭ��");
                } else
                    cm.sendOk("�Բ�������������û�д����ǵĻ�ױ���Ż�ȯ�����û���Ż�ȯ�������Ҳ��ܰ��㡣��");
            } else if (beauty == 2){
                if (cm.haveItem(5152040)){
                    cm.gainItem(5152040, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("��������µĺ͸Ľ��Ļ�ױ��Ƭ��");
                } else 
                    cm.sendOk("�Բ�������������û�д����ǵĻ�ױ���Ż�ȯ�����û���Ż�ȯ�������Ҳ��ܰ��㡣��");
            } else if (beauty == 3){
                var color = (colors[selection] / 100) % 100 | 0;
                
                if (cm.haveItem(5152100 + color)){
                    cm.gainItem(5152100 + color, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("��������µĺ͸Ľ��Ļ�ױ��Ƭ��");
                } else {
                    cm.sendOk("�Բ�������������û�д����ǵĻ�ױ���Ż�ȯ�����û���Ż�ȯ�������Ҳ��ܰ��㡣��");
                }
            }
            cm.dispose();
        }
    }
}