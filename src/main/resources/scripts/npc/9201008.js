/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

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
/* Assistant Bonnie
	Marriage NPC
 */

importPackage(Packages.net.server.channel);

var status;
var wid;
var isMarrying;

var cathedralWedding = false;
var weddingEventName = "WeddingChapel";
var weddingEntryTicketCommon = 5251001;
var weddingEntryTicketPremium = 5251002;
var weddingSendTicket = 4031377;
var weddingGuestTicket = 4031406;
var weddingAltarMapid = 680000110;
var weddingIndoors;

function isWeddingIndoors(mapid) {
    return mapid >= 680000100 && mapid <= 680000500;
}

function hasSuitForWedding(player) {
    var baseid = (player.getGender() == 0) ? 1050131 : 1051150;
    
    for(var i = 0; i < 4; i++) {
        if(player.haveItemWithId(baseid + i, true)) {
            return true;
        }
    }
    
    return false;
}

function getMarriageInstance(weddingId) {
    var em = cm.getEventManager(weddingEventName);
    
    for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
        var eim = iterator.next();
        
        if(eim.getIntProperty("weddingId") == weddingId) {
            return eim;
        }
    }
    
    return null;
}

function hasWeddingRing(player) {
    var rings = [1112806, 1112803, 1112807, 1112809];
    for (var i = 0; i < rings.length; i++) {
        if (player.haveItemWithId(rings[i], true)) {
            return true;
        }
    }
    
    return false;
}

function start() {  
    weddingIndoors = isWeddingIndoors(cm.getMapId());
    status = -1;
    
    action(1, 0, 0);  
}  

function action(mode, type, selection) {  
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if(!weddingIndoors) {
            var hasEngagement = false;
            for (var x = 4031357; x <= 4031364; x++) {
                if (cm.haveItem(x, 1)) {
                    hasEngagement = true;
                    break;
                }
            }

            if (status == 0) {
                var text = "��ӭ����������ܰ���ʲôæ��";
                var choice = ["������׼������?", "�Ҷ����ˣ��밲�Ż���", "���ǿ��ˣ�����μӻ���"];
                for (x = 0; x < choice.length; x++) {
                    text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                }
                
                if (cm.haveItem(5251100)) {
                    text += "\r\n#L" + x + "##b�����������뿨#l";
                }
                
                cm.sendSimple(text);
            } else if (status == 1) {
                switch(selection) {
                    case 0:
                        cm.sendOk("���ȣ�����Ҫ��ĳ�� #b����#k. #p9201000# �����ָ. һ���ﵽ����״̬,\r\n�һ�Ϊ��Ԥ��15�Ż�����Ʊ���������������Ŀ��˲μӻ�������ÿ����Ҫһ����");
                        cm.dispose();
                        break;
                        
                    case 1:
                        if (hasEngagement) {
                            var wserv = cm.getClient().getWorldServer();
                            var cserv = cm.getClient().getChannelServer();
                            var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());

                            if(weddingId > 0) {
                                if(cserv.isWeddingReserved(weddingId)) {    // registration check
                                    var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);
                                    cm.sendOk("��Ļ������ʵ���ʱ��ʼ����Ư�����·�����Ҫ�ٵ���");
                                } else {
                                    var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                    if(partner == null) {
                                        cm.sendOk("��İ������ں��������ˡ����������ڵ�ʱ�������ɣ�");
                                        cm.dispose();
                                        return;
                                    }
                                    
                                    if(hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                        cm.sendOk("�������İ����Ѿ��н���ָ��.");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.getMap().equals(partner.getMap())) {
                                        cm.sendOk("������İ���Ҳ���Ǽ�Ԥ����");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                        cm.sendOk("�����İ��±��������� ���ڳ��ԵǼ�֮ǰ����һ�±�����.");
                                        cm.dispose();
                                        return;
                                    }
                                    
                                    if(!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                        cm.sendOk("�����������ܱ�Ǹ�����ݰ�Ħ���ǵĽ������ǼǴ��ļ�¼����Щ�����ƺ�����. Please check in the situation with #b#p9201014##k.");
                                        cm.dispose();
                                        return;
                                    }

                                    var hasCommon = cm.haveItem(weddingEntryTicketCommon);
                                    var hasPremium = cm.haveItem(weddingEntryTicketPremium);

                                    if(hasCommon || hasPremium) {
                                        var weddingType = (hasPremium ? true : false);

                                        var player = cm.getPlayer();
                                        var resStatus = cserv.pushWeddingReservation(weddingId, cathedralWedding, weddingType, player.getId(), player.getPartnerId());
                                        if(resStatus > 0) {
                                            cm.gainItem((weddingType) ? weddingEntryTicketPremium : weddingEntryTicketCommon, -1);

                                            var expirationTime = Channel.getRelativeWeddingTicketExpireTime(resStatus);
                                            cm.gainItem(weddingSendTicket,15,false,true,expirationTime);
                                            partner.getAbstractPlayerInteraction().gainItem(weddingSendTicket,15,false,true,expirationTime);

                                            var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);

                                            var wedType = weddingType ? "Premium" : "Regular";
                                            cm.sendOk("�����������յ���15�Ż����볡ȯ�����Ǹ����ǵĿ��˵ġ�#b˫����Ʊ#k���䷢�͸�ĳ�ˡ����ֻ���ڻ���ʼʱ��֮ǰ���͸����ˣ������·�����ٵ���");

                                            player.dropMessage(6,"�����������Ƕ��յ���15�Ż�����Ʊ�����ֻ���ڻ���ʼǰ�����������·�����ٵ���");
                                            partner.dropMessage(6, "�����������Ƕ��յ���15�Ż�����Ʊ�����ֻ���ڻ���ʼǰ�����������·�����ٵ���");

                                            if(!hasSuitForWedding(player)) {
                                                player.dropMessage(5, "��������: �μ���ʽǰ�빺���ɴ. �����ڻ��������߻����ϵ㹺��һ��.");
                                            }

                                            if(!hasSuitForWedding(partner)) {
                                                partner.dropMessage(5, "�����������ڳ�ϯ����ǰ����һ����ɴ. �����ڻ��������߻����ϵ㹺��һ����");
                                            }
                                        } else {
                                            cm.sendOk("��Ļ���ԤԼһ�����������ġ����Ժ�����.");
                                        }
                                    } else {
                                        cm.sendOk("���һ�� #b#t" + weddingEntryTicketCommon + "##k available on your CASH inventory before trying to register a reservation.");
                                    }
                                }
                            } else {
                                cm.sendOk("����Ԥ�������������Ժ�����.");
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("��û�ж����ָ.");
                            cm.dispose();
                        }
                        break;
                        
                    case 2:
                        if (cm.haveItem(weddingGuestTicket)) {
                            var cserv = cm.getClient().getChannelServer();

                            wid = cserv.getOngoingWedding(cathedralWedding);
                            if(wid > 0) {
                                if(cserv.isOngoingWeddingGuest(cathedralWedding, cm.getPlayer().getId())) {
                                    var eim = getMarriageInstance(wid);
                                    if(eim != null) {
                                        cm.sendOk("ף��������. ��Ҫ������Ļƽ��Ҷ��������Ͳ��������������");
                                    } else {
                                        cm.sendOk("���Ե�Ƭ�̣����������׼��������á�");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("��Ǹ���㻹û������μӻ���");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("Ŀǰû��Ԥ������");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("��û�� #b#t" + weddingGuestTicket + "##k.");
                            cm.dispose();
                        }
                        break;
                        
                    default:
                        var wserv = cm.getClient().getWorldServer();
                        var cserv = cm.getClient().getChannelServer();
                        var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());

                        var resStatus = cserv.getWeddingReservationStatus(weddingId, cathedralWedding);
                        if(resStatus > 0) {
                            if(cm.canHold(weddingSendTicket, 3)) {
                                cm.gainItem(5251100, -1);

                                var expirationTime = Channel.getRelativeWeddingTicketExpireTime(resStatus);
                                cm.gainItem(weddingSendTicket,3,false,true,expirationTime);
                            } else {
                                cm.sendOk("��ȷ���������г���Ŀռ��Ի�ȡ�������롣");
                            }
                        } else {
                            cm.sendOk("��Ŀǰ��û��Ԥ��������ȥ�����������.");
                        }
                        
                        cm.dispose();
                }
            } else if (status == 2) {   // registering guest
                var eim = getMarriageInstance(wid);

                if(eim != null) {
                    cm.gainItem(weddingGuestTicket, -1);
                    eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                } else {
                    cm.sendOk("�Ҳ�������¼�.");
                }

                cm.dispose();
            }
        } else {
            if (status == 0) {
                var eim = cm.getEventInstance();
                if(eim == null) {
                    cm.warp(680000000,0);
                    cm.dispose();
                    return;
                }

                isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));

                if(eim.getIntProperty("weddingStage") == 0) {
                    if(!isMarrying) {
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. �������������Ｏ��ʱ���������������һ��.\r\n\r\n��ʱ�䵽�ˣ���Է򸾽�������ã���ʱ�㽫������ӱ�������������������.");
                    } else {
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. ��������������ʱ�����ʺ��Ѿ�������Ŀ��ˡ�����ʱ�������յ�ʱ����Է򸾽�������á�");
                    }

                    cm.dispose();
                } else {
                    cm.sendYesNo("#b���ɺ�����#k �Ѿ���ȥ���õ�·���ˡ������������������?");
                }
            } else if (status == 1) {
                cm.warp(weddingAltarMapid,"sp");            
                cm.dispose();
            }
        }
    }
}