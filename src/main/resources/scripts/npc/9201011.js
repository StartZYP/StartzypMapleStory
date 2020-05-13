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
/* Pelvis Bebop
	Marriage NPC
 */

importPackage(Packages.config);
importPackage(Packages.net.server.channel.handlers);
importPackage(Packages.tools);
importPackage(Packages.tools.packets);

var status;
var state;
var eim;
var weddingEventName = "WeddingChapel";
var cathedralWedding = false;
var weddingIndoors;
var weddingBlessingExp = YamlConfig.config.server.WEDDING_BLESS_EXP;

function detectPlayerItemid(player) {
    for (var x = 4031357; x <= 4031364; x++) {
        if (player.haveItem(x)) {
            return x;
        }
    }
    
    return -1;
}

function getRingId(boxItemId) {
    return boxItemId == 4031357 ? 1112803 : (boxItemId == 4031359 ? 1112806 : (boxItemId == 4031361 ? 1112807 : (boxItemId == 4031363 ? 1112809 : -1)));
}

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

function getWeddingPreparationStatus(player, partner) {
    if(!player.haveItem(4000313)) return -3;
    if(!partner.haveItem(4000313)) return 3;
    
    if(!isSuitedForWedding(player, true)) return -4;
    if(!isSuitedForWedding(partner, true)) return 4;
    
    var hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (player.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if(!hasEngagement) return -1;

    hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (partner.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if(!hasEngagement) return -2;

    if(!player.canHold(1112803)) return 1;
    if(!partner.canHold(1112803)) return 2;

    return 0;
}

function giveCoupleBlessings(eim, player, partner) {
    var blessCount = eim.gridSize();
    
    player.gainExp(blessCount * weddingBlessingExp);
    partner.gainExp(blessCount * weddingBlessingExp);
}

function start() {  
    eim = cm.getEventInstance();

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

        if (status == 0) {
            if(eim == null) {
                cm.warp(680000000,0);
                cm.dispose();
                return;
            }

            var playerId = cm.getPlayer().getId();
            if(playerId == eim.getIntProperty("groomId") || playerId == eim.getIntProperty("brideId")) {
                var wstg = eim.getIntProperty("weddingStage");

                if(wstg == 2) {
                    cm.sendYesNo("哦哦哦哦哦哦，客人们已经向你们宣布了他们的爱。现在是时候了，宝贝，我该让你做夫妻吗？");
                    state = 1;
                } else if(wstg == 1) {
                    cm.sendOk("等等，好吗？你们的客人正在把他们的爱献给你们。让我们把这地方摇起来，宝贝~~.");
                    cm.dispose();
                } else {
                    cm.sendOk("再见！我们的节日现在已经结束了，请给#b#p9201009#k一个甜言蜜语，她会带你和你的家人去参加下一个聚会。为你的爱干杯！");
                    cm.dispose();
                }
            } else {
                var wstg = eim.getIntProperty("weddingStage");
                if(wstg == 1) {
                    if(eim.gridCheck(cm.getPlayer()) != -1) {
                        cm.sendOk("所有人让我们摆动起来！摇滚吧!!");
                        cm.dispose();
                    } else {
                        if(eim.getIntProperty("guestBlessings") == 1) {
                            cm.sendYesNo("你能向在场的朋友们表达你的爱吗?");
                            state = 0;
                        } else {
                            cm.sendOk("我们的超级明星都聚集在这里。每个人，让我们给他们一个美好的，美好的聚会~!");
                            cm.dispose();
                        }
                    }
                } else if(wstg == 3) {
                    cm.sendOk("喔喔喔喔！现在这对情侣的爱情就像一颗超级闪亮的心！在这个节日之后它将一直持续下去。请准备好后派对，宝贝。跟着这对已婚夫妇走！");
                    cm.dispose();
                } else {
                    cm.sendOk("现在是男人们。保持眼睛和耳朵紧闭！!!");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if(state == 0) {    // give player blessings
                eim.gridInsert(cm.getPlayer(), 1);

                if(YamlConfig.config.server.WEDDING_BLESSER_SHOWFX) {
                    var target = cm.getPlayer();
                    target.announce(MaplePacketCreator.showSpecialEffect(9));
                    target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                } else {
                    var target = eim.getPlayerById(eim.getIntProperty("groomId"));
                    target.announce(MaplePacketCreator.showSpecialEffect(9));
                    target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                    
                    target = eim.getPlayerById(eim.getIntProperty("brideId"));
                    target.announce(MaplePacketCreator.showSpecialEffect(9));
                    target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                }

                cm.sendOk("去吧，我的朋友！你的爱已经添加到他们之中，现在一个更大的心形，将永远活跃在我们的心中！");
                cm.dispose();
            } else {            // couple wants to complete the wedding
                var wstg = eim.getIntProperty("weddingStage");

                if(wstg == 2) {
                    var pid = cm.getPlayer().getPartnerId();
                    if(pid <= 0) {
                        cm.sendOk("啊~。。。。等等，你刚才是不是弄坏了现在的东西？？天哪，怎么了？");
                        cm.dispose();
                        return;
                    }

                    var player = cm.getPlayer();
                    var partner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId());
                    if(partner != null) {
                        state = getWeddingPreparationStatus(player, partner);

                        switch(state) {
                            case 0:
                                var pid = eim.getIntProperty("confirmedVows");
                                if(pid != -1) {
                                    if(pid == player.getId()) {
                                        cm.sendOk("你已经确认了你的誓言。剩下的就是让你的搭档确认了.");
                                    } else {
                                        eim.setIntProperty("weddingStage", 3);
                                        var cmPartner = partner.getAbstractPlayerInteraction();

                                        var playerItemId = detectPlayerItemid(player);
                                        var partnerItemId = (playerItemId % 2 == 1) ? playerItemId + 1 : playerItemId - 1;

                                        var marriageRingId = getRingId((playerItemId % 2 == 1) ? playerItemId : partnerItemId);

                                        cm.gainItem(playerItemId, -1);
                                        cmPartner.gainItem(partnerItemId, -1);

                                        RingActionHandler.giveMarriageRings(player, partner, marriageRingId);
                                        player.setMarriageItemId(marriageRingId);
                                        partner.setMarriageItemId(marriageRingId);

                                        //var marriageId = eim.getIntProperty("weddingId");
                                        //player.announce(Wedding.OnMarriageResult(marriageId, player, true));
                                        //partner.announce(Wedding.OnMarriageResult(marriageId, player, true));

                                        giveCoupleBlessings(eim, player, partner);

                                        cm.getMap().dropMessage(6, "韦恩：我现在就说出来，然后继续说：你们是对方锁的钥匙，一个吊坠的花边。就这样，亲自己!");
                                        eim.schedule("showMarriedMsg", 2 * 1000);
                                    }
                                } else {
                                    eim.setIntProperty("confirmedVows", player.getId());
                                    cm.getMap().dropMessage(6, "Wedding Assistant: " + player.getName() + " 已经确认了誓言！好吧，离正式会议只有一步之遥。系紧安全带!");
                                }
                                
                                break;

                            case -1:
                                cm.sendOk("好吧，看来你们不再有订婚时交换的戒指/戒指盒了。");
                                break;

                            case -2:
                                cm.sendOk("好吧，看来你们的搭档不再有你们订婚时交换的戒指/戒指盒了。噢~");
                                break;

                            case -3:
                                cm.sendOk("好吧，看来你没有入口处的#r#t4000313##k卡 请找到它，宝贝");
                                break;

                            case -4:
                                cm.sendOk("噢，我知道这很时髦，但时髦的婚纱在这里起着至关重要的作用。跟我说话前请穿上它.");
                                break;

                            case 1:
                                cm.sendOk("请准备一个装备槽来取结婚戒指好吗？");
                                break;

                            case 2:
                                cm.sendOk("请让你的伴侣知道要提供一个装备槽来获得结婚戒指，好吗？");
                                break;

                            case 3:
                                cm.sendOk("好吧，看来你的搭档没有在入口处给你 #r#t4000313##k卡 在入口处。... 请找到它");
                                break;

                            case 4:
                                cm.sendOk("噢，我知道你很帅，但你的搭档好像不穿时髦的婚纱。在和我说话之前请告诉他们穿上它.");
                                break;
                        }

                        cm.dispose();
                    } else {
                        cm.sendOk("哦，是不是你的搭档现在不在这里...哦，不，如果你的搭档不在，恐怕我不能打电话给终结者.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("Wheeeeeeeeeeeeew~恭喜！！!");
                    cm.dispose();
                }
            }
        }
    }
}