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
/* Assistant Nicole
	Marriage NPC
 */

importPackage(Packages.net.server.channel);

var status;
var wid;
var isMarrying;

var cathedralWedding = true;
var weddingEventName = "WeddingCathedral";
var weddingEntryTicketCommon = 5251000;
var weddingEntryTicketPremium = 5251003;
var weddingSendTicket = 4031395;
var weddingGuestTicket = 4031407;
var weddingAltarMapid = 680000210;
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
                var text = "欢迎来到 #b大教堂#k! 我能帮你什么忙吗？";
                var choice = ["我怎么准备婚礼？", "我订婚了，想安排婚礼", "我想参加婚礼"];
                for (x = 0; x < choice.length; x++) {
                    text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                }
                
                if (cm.haveItem(5251100)) {
                    text += "\r\n#L" + x + "##bMake additional invitation cards#l";
                }
                
                cm.sendSimple(text);
            } else if (status == 1) {
                switch(selection) {
                    case 0:
                        cm.sendOk("首先你需要和某人进行#b订婚#k,购买订婚戒指#p9201000#. 一旦达到订婚状态，购买 #b#t" + weddingEntryTicketCommon + "##k.\r\n给我看看你的订婚戒指和一张婚礼门票，我会为你预订 #r15张婚礼门票 #k. 用它们邀请你的客人参加婚礼。他们每人需要一个。");
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
                                    cm.sendOk("Your wedding is set to start at the #r" + placeTime + "#k. Get formally dressed and don't be late!");
                                } else {
                                    var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                    if(partner == null) {
                                        cm.sendOk("你的搭档现在好像离线了。。。到时候一定要把两个人都聚集在这里!");
                                        cm.dispose();
                                        return;
                                    }

                                    if(hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                        cm.sendOk("你或你的伴侣已经有了结婚戒指.");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.getMap().equals(partner.getMap())) {
                                        cm.sendOk("请让你的伴侣也来登记预订。");
                                        cm.dispose();
                                        return;
                                    }

                                    if(!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                        cm.sendOk("不是你就是你的搭档没有免费的婚礼入场券！在登记预订之前，请先预订房间.");
                                        cm.dispose();
                                        return;
                                    }
                                    
                                    if(!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                        cm.sendOk("呃。。。对不起，根据婚礼村的结婚礼物登记处的预约，有些事情似乎不对。请与 #b#p9201014##k.");
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
                                            cm.sendOk("你们两个都收到了15张婚礼入场券，这是给你们的客人的。#b双击票据k将其发送给某人。请柬只能在婚礼开始时间k之前发送。您的 #b" + wedType + " wedding#k 婚礼设置为在 #r" + placeTime + "#k. 开始。穿上正式的衣服，不要迟到");

                                            player.dropMessage(6, "婚礼助理：你们都收到了15张婚礼门票。请柬只能在婚礼开始前发出。您的 " + wedType + " 婚礼将从 " + placeTime + ". 穿好衣服，别迟到！");
                                            partner.dropMessage(6, "婚礼助理：你们都收到了15张婚礼门票。请柬只能在婚礼开始前发出。您的 " + wedType + "婚礼将从 " + placeTime + ".穿好衣服，别迟到！");

                                            if(!hasSuitForWedding(player)) {
                                                player.dropMessage(5, "婚礼助理：请在出席婚礼前购买一件婚纱。一个可以在婚庆店买到的最左边的婚礼村。");
                                            }

                                            if(!hasSuitForWedding(partner)) {
                                                partner.dropMessage(5, "婚礼助理：请在出席婚礼前购买一件婚纱。一个可以在婚庆店买到的最左边的阿摩利亚。");
                                            }
                                        } else {
                                            cm.sendOk("你的婚礼预约一定是最近办理的。请稍后再试。");
                                        }
                                    } else {
                                        cm.sendOk("请喝一杯 #b#t" + weddingEntryTicketCommon + "##k 在尝试注册预订之前，在您的现金库存中提供。");
                                    }
                                }
                            } else {
                                cm.sendOk("婚礼预订遇到错误，请稍后再试。");
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("你没有订婚戒指。");
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
                                        cm.sendOk("祝你婚礼愉快。不要丢下你的金枫叶，否则你就不能完成整个婚礼。");
                                    } else {
                                        cm.sendOk("夫妇俩正准备进入大教堂，请稍等。");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("对不起，你还没被邀请参加婚礼。");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("现在还没有订婚礼.");
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
                                cm.sendOk("请提供一个道具栏以获取更多邀请。");
                            }
                        } else {
                            cm.sendOk("您目前还没有预订大教堂，以便发出其他邀请。");
                        }
                        
                        cm.dispose();
                }
            } else if (status == 2) {   // registering guest
                var eim = getMarriageInstance(wid);

                if(eim != null) {
                    cm.gainItem(weddingGuestTicket, -1);
                    eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                } else {
                    cm.sendOk("找不到结婚事件。");
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
                        cm.sendOk("欢迎来到 #b#m" + cm.getMapId() + "##k. 其他客人在这里集合时，请和新郎新娘在一起.\r\n\r\n当计时器到达终点时，这对夫妇将走向教堂，那时你将被允许进入 #b客人区#k.");
                    } else {
                        cm.sendOk("欢迎来到 #b#m" + cm.getMapId() + "##k.当其他客人来的时候，请问候已经在这里的客人。当计时器到达终点时，这对夫妇将走向教堂.");
                    }

                    cm.dispose();
                } else {
                    cm.sendYesNo("#b新娘和新郎#k已经在去教堂的路上了。你现在想加入他们吗？");
                }
            } else if (status == 1) {
                cm.warp(weddingAltarMapid,"sp");            
                cm.dispose();
            }
        }
        
    }
}