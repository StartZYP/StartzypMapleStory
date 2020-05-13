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
status = -1;


var travelFrom = [777777777,541000000];
var travelFee = [3000,10000];

var travelMap = [800000000,550000000];
var travelPlace = ["�Ŵ�����","��������"];
var travelPlaceShort = ["�Ŵ�����","��������"];
var travelPlaceCountry = ["Japan","Malaysia"];
var travelAgent = ["","#r#p9201135##k"];

var travelDescription = ["�����������ձ��ľ��裬Ģ�������һ���񻰰�ĵط����������Թ����������ױȵ�Ģ����",
                        "���������һ������Ļ����и����ȴ������ȣ��������ǵľ�������黶ӭ�㡣���⣬�������Ǳ����ǵ��ؾ��õ����ģ�������֪������ط������ṩһЩ��������ιۡ�"];

var travelDescription2 = ["�����Ǹ�ΪĢ��������Ů��������ǿ�ҽ����㳢���ձ���ͷ���۵���ζʳƷ�����ڣ�������ȥ�Ŵ����磬һ���񻰰�ĵط��������һ����",
                        "һ�������ǿ�ҽ����㰲��һ��ȥ�ʰ������С�Ϊʲô����һ���Ѿ��˽����λ����⹫԰�Ĺ������磿������ֻ�ǰ���������⹫԰�������ֵ��һ�Σ����ڣ�������ȥ�������ǵ�������."];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1,0,0);
}

function getTravelingStatus(mapid) {
    for(var i = 0; i < travelMap.length; i++) {
        if(mapid == travelMap[i]) {
            return i;
        }
    }
    
    return -1;
}

function getTravelType(mapid) {
    for(var i = 0; i < travelFrom.length; i++) {
        if(mapid == travelFrom[i]) {
            return i;
        }
    }
    
    return 0;
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    
    if (travelStatus != -1) {
        if (status == 0) 
            cm.sendSimple("������ô������ϲ����?#b\r\n#L0#�ǵģ����������ˡ����ܻص�#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#��?\r\n#L1#�����������̽������ط���");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("�ðɡ��Ҵ���ص�ȥ�ձ�֮ǰ�ĵط������������ȥ���У�������ң�");
            } else if (selection == 1) {
                cm.sendOk("�ð��������ı����⣬������ҡ�");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) map = 104000000;
            
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("���������˵������ճ���������ȥ���������ɣ�û��ʲô�ȳ�����һ���µ��Ļ��У�һ��һ���ѧϰ�µĶ������õ��ˣ���ó�ȥ�����ˡ����ǣ������������Ƽ���ȥ�������Σ��㵣�����з������㲻Ӧ�ã����ǣ���Ҷ�����磬�Ѿ���ϸ�������һ���ƻ�������ֻ�� #b" + cm.numberWithCommas(travelFee[travelType]) + " ���#k!");
        } else if (status == 1) {
            cm.sendSimple("��������Ϊ���ṩ����ط�: #b" + travelPlace[travelType] + "#k" + travelAgent[travelType] +"�һ����Ƕ����㵱���Ρ�����ģ�Ŀ�ĵص�����������ʱ������ƶ����ӡ����ڣ�����ȥ" + travelPlaceShort[travelType] + "?#b\r\n#L0#" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            cm.sendNext("����ȥ������#b" + travelPlace[travelType] + "#k?" + travelDescription[travelType]);
        } else if (status == 3) {
            if(cm.getMeso() < travelFee[travelType]){
                cm.sendNext("��û���㹻�Ľ��ȥ���С�");
                cm.dispose();
                return;
            }
            cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 4) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}