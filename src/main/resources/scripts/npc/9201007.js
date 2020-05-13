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
	Assistant Nancy
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720 ragezone)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
---------------------------------------------------------------------------------------------------
**/

var status;
var eim;
var hasEngage;
var hasRing;

function start() {
    eim = cm.getEventInstance();
    if(eim == null) {
        cm.warp(680000000,0);
        cm.dispose();
        return;
    }
    
    if(cm.getMapId() == 680000200) {
        if(eim.getIntProperty("weddingStage") == 0) {
            cm.sendNext("�������������Ｏ�ϡ����Եȣ���ʽ���Ͼ�Ҫ��ʼ�ˡ�");
        } else {
            cm.warp(680000210, "sp");
            cm.sendNext("������ѡ��λ�Ӻúñ��ݣ�");
        }
        
        cm.dispose();
    } else {
        if(cm.getPlayer().getId() != eim.getIntProperty("groomId") && cm.getPlayer().getId() != eim.getIntProperty("brideId")) {
            cm.sendNext("��Ǹ������Ӧ��ֻ����Խ��ķ��ں���˵����");
            cm.dispose();
            return;
        }

        hasEngage = false;
        for(var i = 4031357; i <= 4031364; i++) {
            if(cm.haveItem(i)) {
                hasEngage = true;
                break;
            }
        }

        var rings = [1112806, 1112803, 1112807, 1112809];
        hasRing = false;
        for (i = 0; i < rings.length; i++) {
            if (cm.getPlayer().haveItemWithId(rings[i], true)) {
                hasRing = true;
            }
        }

        status = -1;
        action(1, 0, 0);
    }
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.sendOk("�ټ���"); 
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    if (status == 0) {
        var hasGoldenLeaf = cm.haveItem(4000313);
        
        if (hasGoldenLeaf && hasEngage) {
            cm.sendOk("�㻹�����ߣ����������뿪֮ǰ������Ҫ������˾Ȼ���顣");
            cm.dispose();
        } else if (hasGoldenLeaf && hasRing) {
            var choice = Array("ȥ�μӾۻ� ", "�Ҹ���ô��");
            var msg = "���ܰ���ʲôæ��?#b";
            for (i = 0; i < choice.length; i++) {
                msg += "\r\n#L" + i + "#" + choice[i] + "#l";
            }
            cm.sendSimple(msg);
        } else {
            cm.sendNext("�����û�ж����ָ�����ָ�ȵ��ߡ��㲻��������������Ҵ���ȥ����塣");
            selection = 20; // Random.
        }
    } else if (status == 1) {
        var cmPartner;
        try {
            cmPartner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId()).getAbstractPlayerInteraction();
        } catch(err) {
            cmPartner = null;
        }
        
        switch(selection) {
            case 0:
                if(eim.getIntProperty("isPremium") == 1) {
                    eim.warpEventTeam(680000300);
                    cm.sendOk("���ܰɣ���Զ��ϧ�����Ƭ��");
                    if (cmPartner != null) cmPartner.npcTalk(cm.getNpc(), "���ܰɣ���Զ��ϧ�����Ƭ��");
                } else {    // skip the party-time (premium only)
                    eim.warpEventTeam(680000500);
                    cm.sendOk("��ϲ�»飡�����㵽���ڡ�");
                    if (cmPartner != null) cmPartner.npcTalk(cm.getNpc(), "��ϲ�»飡�����㵽���ڡ�");
                }
                
                cm.dispose();
                break;
                
            case 1:
                cm.sendOk("�������������ܴ��˾��ף�����ܳɻ顣����׼�����ˣ�����Ե����ȥ�μӺ�����ɶԡ�");
                cm.dispose();
                break;
                
            default:
                cm.warp(680000000,0);
                cm.dispose();
                break;
        }
    }
}
