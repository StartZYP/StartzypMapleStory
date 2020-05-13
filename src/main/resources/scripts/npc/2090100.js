/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Grandpa Luo
	Mu Lung VIP Hair/Hair Color Change.

        GMS-like revised by Ronan. Contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30150, 30240, 30370, 30420, 30640, 30710, 30750, 30810);
var fhair_v = Array(31140, 31160, 31180, 31300, 31460, 31470, 31660, 31910);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function start() {
    cm.sendSimple("��ӭ����������. �������#b#t5150025##k,����#b#t5151020##k,�����Ҿ���Ϊ������ϲ���ķ�����.��ѡ������Ҫ�ģ�\r\n#L1#��: #i5150025##t5150025##l\r\n#L2#Ⱦ��: #i5151020##t5151020##l");
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++) {
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++) {
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair()
                            % 10));
                    }
                }
                cm.sendStyle("����ȫ���Ըı���ķ��ͣ������������ܺÿ�����Ϊʲô����һ���أ�ֻҪ�� #b#t5150025##k,�ҾͿ�������ѡ����ϲ���ķ��", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()
                    /10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("����ȫ���Ըı���ķ�����ɫ�������������ܺÿ�����Ϊʲô����һ���أ�ֻҪ��#b#t5151020##k, �ҾͿ�������ѡ����ϲ���ķ��!", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420006)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�������¸Ľ��ķ���!");
                } else if (cm.haveItem(5150025)){
                    cm.gainItem(5150025, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("�������¸Ľ��ķ���!");
                } else {
                    cm.sendOk("Hmmm...�����û������ָ�����Ż�ȯ��������û�����Ҳ��ܸ��������Һܱ�Ǹ...");
                }
            }
            if (beauty == 2){
                if (cm.haveItem(5151020)){
                    cm.gainItem(5151020, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("��������·��ͺ͸�������!");
                } else {
                    cm.sendOk("Hmmm...�����û������ָ�����Ż�ȯ��������û�����Ҳ��ܸ����ͷ��Ⱦɫ���Һܱ�Ǹ...");
                }
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150025, 1);
                    cm.sendOk("Enjoy!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151020, 1);
                    cm.sendOk("Enjoy!");
                } else {
                    cm.sendOk("��û���㹻�ĵ�������Ż�ȯ!");
                }
            }
        }
    }
}
