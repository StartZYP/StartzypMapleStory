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
/* Wayne
	Marriage NPC
 */

var status;
var state;
var eim;
var weddingEventName = "结婚礼堂 ";
var cathedralWedding = false;


function isSuitedForWedding(player, equipped) {
    var baseid = (player.getGender() == 0) ? 1050131 : 1051150;
    
    if(equipped) {
        for(var i = 0; i < 4; i++) {
            if(player.haveItemEquipped(baseid + i)) {
                return true;
            }
        }
    } else {
        for(var i = 0; i < 4; i++) {
            if(player.haveItemWithId(baseid + i, true)) {
                return true;
            }
        }
    }
    
    return false;
}

function getMarriageInstance(player) {
    var em = cm.getEventManager(weddingEventName);
    
    for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
        var eim = iterator.next();
        if(eim.isEventLeader(player)) {
            return eim;
        }
    }
    
    return null;
}

function start() {  
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

        if(status == 0) {
            var hasEngagement = false;
            for (var x = 4031357; x <= 4031364; x++) {
                if (cm.haveItem(x, 1)) {
                    hasEngagement = true;
                    break;
                }
            }

            if(hasEngagement) {
                var text = "找我有什么事情？你想要预定一个婚礼？";
                var choice = new Array("我们准备结婚了.");
                for (x = 0; x < choice.length; x++) {
                    text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                }
                cm.sendSimple(text);
            } else {
                cm.sendOk("嗨，各位。甚至想过在阿摩利亚举行婚礼？当谈论婚礼的时候，每个人首先想到的是阿莫利亚，不要错过。我们的小教堂因为冒险家提供最好的婚礼服务而闻名于冒险世界！");
                cm.dispose();
            }
        } else if(status == 1) {
            var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
            var cserv = cm.getClient().getChannelServer();

            if(cserv.isWeddingReserved(wid)) {
                if(wid == cserv.getOngoingWedding(cathedralWedding)) {
                    var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                    if(!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                        if(!cm.canHold(4000313)) {
                            cm.sendOk("请提供一个免费的ETC插槽#b#t4000313##k.");
                            cm.dispose();
                            return;
                        } else if(!partner.canHold(4000313)) {
                            cm.sendOk("请让你的搭档知道他们必须有一个免费的Etc插槽来获得 #b#t4000313##k.");
                            cm.dispose();
                            return;
                        } else if(!isSuitedForWedding(cm.getPlayer(), false)) {
                            cm.sendOk("请尽快为婚礼购买时尚的羽绒服！是时候发光了，宝贝!");
                            cm.dispose();
                            return;
                        } else if(!isSuitedForWedding(partner, false)) {
                            cm.sendOk("你的伴侣必须知道他们一定有时髦的婚礼服装。是时候发光了，宝贝~!");
                            cm.dispose();
                            return;
                        }

                        cm.sendOk("好吧！这对夫妇像以前一样时髦地出现在这里。我们走吧，伙计们，我们摇滚吧!!!");
                    } else {
                        cm.sendOk("哦，你的搭档在别处...两个人都必须来参加婚礼，否则会很糟的.");
                        cm.dispose();
                    }
                } else {
                    var placeTime = cserv.getWeddingReservationTimeLeft(wid);

                    cm.sendOk("哟。你的婚礼将在 #r" + placeTime + "#k, 穿件像样的衣服别迟到，好吗？");
                    cm.dispose();
                }
            } else {
                cm.sendOk("对不起，这个频道暂时没有为您预订.");
                cm.dispose();
            }
        } else if(status == 2) {
            var cserv = cm.getClient().getChannelServer();
            var wtype = cserv.getOngoingWeddingType(cathedralWedding);
            
            var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
            if(!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                if(cserv.acceptOngoingWedding(cathedralWedding)) {
                    var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                    if(wid > 0) {
                        var em = cm.getEventManager(weddingEventName);
                        if(em.startInstance(cm.getPlayer())) {
                            eim = getMarriageInstance(cm.getPlayer());
                            if(eim != null) {
                                eim.setIntProperty("weddingId", wid);
                                eim.setIntProperty("groomId", cm.getPlayer().getId());
                                eim.setIntProperty("brideId", cm.getPlayer().getPartnerId());
                                eim.setIntProperty("isPremium", wtype ? 1 : 0);

                                eim.registerPlayer(partner);
                            } else {
                                cm.sendOk("定位婚礼事件时发生意外错误。请稍后再试.");
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("婚礼筹备前发生了一个意想不到的错误。请稍后再试.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("婚礼筹备前发生了一个意想不到的错误。请稍后再试.");
                        cm.dispose();
                    }
                } else {    // partner already decided to start
                    cm.dispose();
                }
            } else {
                cm.sendOk("哦，看来你的搭档在别处..两个人都必须来参加婚礼，否则会很糟的.");
                cm.dispose();
            }
        }        
    }
}