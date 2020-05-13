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
/*     Eric
        Singapore VIP Hair/Color Changer
        @Author AAron, Cody (FlowsionMS) Forums

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var mhair_v = Array(30110, 30180, 30260, 30290, 30300, 30350, 30470, 30720, 30840);
var fhair_v = Array(31110, 31200, 31250, 31280, 31600, 31640, 31670, 31810, 34020);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("�ˣ�����������������ģ����Ѿ��㹻���ˡ�������� #b#t5150032##k �� #b#t5151027##k ������Σ��Ǿ��������չ˺���ɣ�\r\n#L1#ʹ��: #i5150032##t5150032##l\r\n#L2#ʹ��: #i5151027##t5151027##l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (selection == 1) {
            beauty = 1;
            hairnew = Array();
            if (cm.getPlayer().getGender() == 0)
                for(var i = 0; i < mhair_v.length; i++)
                    pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
            else
                for(var i = 0; i < fhair_v.length; i++)
                    pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()% 10));
            cm.sendStyle("�����ʹ��REG�Ż�ȯ�����ͷ��������ı䣬�л�����һ���µ�ʵ�����������. ��Ҫ�� #b#t5150032##k ���Ҫ�ı���ķ�����", hairnew);
        } else if (selection == 2) {
            beauty = 2;
            haircolor = Array();
            var current = parseInt(cm.getPlayer().getHair()/10)*10;
            for(var i = 0; i < 8; i++)
                pushIfItemExists(haircolor, current + i);
            cm.sendStyle("�����ʹ��REG�Ż�ȯ�����ͷ��������ı䡣�㻹���� #b#t5151027##k ������һ��?", haircolor);
        } else if (status == 2) {
            if (beauty == 1){
                if (cm.haveItem(5150032)){
                    cm.gainItem(5150032, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�������µĺ͸Ľ��ķ��ͣ�");
                } else
                    cm.sendOk("�š���������û������ָ�����Ż�ȯ��������û�����Ҳ��ܸ��������Һܱ�Ǹ��");
            }
            if (beauty == 2){
                if (cm.haveItem(5151027)){
                    cm.gainItem(5151027, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("�������µĺ͸Ľ��ķ�����ɫ��");
                } else
                    cm.sendOk("�š�������û������ָ�����Ż�ȯ������û�����Ҳ���Ⱦ���ͷ�����Һܱ�Ǹ��");
            }
            cm.dispose();
        }
    }
}
