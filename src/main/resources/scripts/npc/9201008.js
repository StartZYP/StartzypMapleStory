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
                var text = "欢迎来到这里！我能帮你什么忙吗？";
                var choice = ["我怎样准备婚礼?", "我订婚了，想安排婚礼", "我是客人，我想参加婚礼"];
                for (x = 0; x < choice.length; x++) {
                    text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                }
                
                if (cm.haveItem(5251100)) {
                    text += "\r\n#L" + x + "##b制作其他邀请卡#l";
                }
                
                cm.sendSimple(text);
            } else if (status == 1) {
                switch(selection) {
                    case 0:
                        cm.sendOk("首先，您需要与某人 #b订婚#k. #p9201000# 订婚戒指. 一旦达到订婚状态,\r\n我会为您预订15张婚礼门票，用它们邀请您的客人参加婚礼。他们每人需要一个。");
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
                                    cm.sendOk("你的婚礼将在适当的时候开始穿上漂亮的衣服，不要迟到！");
                                } else {
                                    var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                    if(partner == null) {
                                        cm.sendOk("你的伴侣现在好像离线了。请你俩都在的时候再来吧！");
                                        cm.dispose();
                                        return;
                                    }
                                    
                                    if(hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                        cm.sendOk("你或者你的伴侣已经有结婚戒指了.");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.getMap().equals(partner.getMap())) {
                                        cm.sendOk("请让你的伴侣也来登记预订。");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                        cm.sendOk("你或你的伴侣背包已满！ 请在尝试登记之前清理一下背包。.");
                                        cm.dispose();
                                        return;
                                    }
                                    
                                    if(!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                        cm.sendOk("“呃。。。很抱歉，根据阿摩利亚的结婚礼物登记处的记录，有些事情似乎不对. Please check in the situation with #b#p9201014##k.");
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
                                            cm.sendOk("你们两个都收到了15张婚礼入场券，这是给你们的客人的。#b双击门票#k将其发送给某人。请柬只能在婚礼开始时间之前发送给客人，穿好衣服，别迟到！");

                                            player.dropMessage(6,"婚礼助理：你们都收到了15张婚礼门票。请柬只能在婚礼开始前发出。穿好衣服，别迟到！");
                                            partner.dropMessage(6, "婚礼助理：你们都收到了15张婚礼门票。请柬只能在婚礼开始前发出。穿好衣服，别迟到！");

                                            if(!hasSuitForWedding(player)) {
                                                player.dropMessage(5, "婚礼助理: 参加仪式前请购买婚纱. 可以在婚礼村最左边婚礼上点购买一个.");
                                            }

                                            if(!hasSuitForWedding(partner)) {
                                                partner.dropMessage(5, "婚礼助理：请在出席婚礼前购买一件婚纱. 可以在婚礼村最左边婚礼上点购买一个。");
                                            }
                                        } else {
                                            cm.sendOk("你的婚礼预约一定是最近办理的。请稍后再试.");
                                        }
                                    } else {
                                        cm.sendOk("请喝一杯 #b#t" + weddingEntryTicketCommon + "##k available on your CASH inventory before trying to register a reservation.");
                                    }
                                }
                            } else {
                                cm.sendOk("婚礼预订遇到错误，请稍后再试.");
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("你没有订婚戒指.");
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
                                        cm.sendOk("祝你婚礼愉快. 不要丢下你的黄金枫叶，否则你就不能完成整个婚礼。");
                                    } else {
                                        cm.sendOk("请稍等片刻，这对新人正准备进入教堂。");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("抱歉，你还没被邀请参加婚礼。");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("目前没有预订婚礼。");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("你没有 #b#t" + weddingGuestTicket + "##k.");
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
                                cm.sendOk("请确保道具栏有充足的空间以获取更多邀请。");
                            }
                        } else {
                            cm.sendOk("你目前还没有预定到教堂去做额外的邀请.");
                        }
                        
                        cm.dispose();
                }
            } else if (status == 2) {   // registering guest
                var eim = getMarriageInstance(wid);

                if(eim != null) {
                    cm.gainItem(weddingGuestTicket, -1);
                    eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                } else {
                    cm.sendOk("找不到结婚事件.");
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
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. 其他客人在这里集合时，请和新郎新娘在一起.\r\n\r\n当时间到了，这对夫妇将走向教堂，届时你将被允许从宾客区扎根在他们身上.");
                    } else {
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. 当其他客人来的时候，请问候已经在这里的客人。当计时器到达终点时，这对夫妇将走向教堂。");
                    }

                    cm.dispose();
                } else {
                    cm.sendYesNo("#b新郎和新娘#k 已经在去教堂的路上了。你现在想加入他们吗？?");
                }
            } else if (status == 1) {
                cm.warp(weddingAltarMapid,"sp");            
                cm.dispose();
            }
        }
    }
}