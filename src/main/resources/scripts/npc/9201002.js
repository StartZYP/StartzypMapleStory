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
/* High Priest John
 Marriage NPC
 */

importPackage(Packages.config);
importPackage(Packages.net.server.channel.handlers);
importPackage(Packages.tools);
importPackage(Packages.tools.packets);

var status;
var state;
var eim;
var weddingEventName = "WeddingCathedral";
var cathedralWedding = true;
var weddingIndoors;
var weddingBlessingExp = YamlConfig.config.server.WEDDING_BLESS_EXP;

function isWeddingIndoors(mapid) {
    return mapid >= 680000100 && mapid <= 680000500;
}

function getMarriageInstance(player) {
    var em = cm.getEventManager(weddingEventName);

    for (var iterator = em.getInstances().iterator(); iterator.hasNext(); ) {
        var eim = iterator.next();
        if (eim.isEventLeader(player)) {
            return eim;
        }
    }

    return null;
}

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

    if (equipped) {
        for (var i = 0; i < 4; i++) {
            if (player.haveItemEquipped(baseid + i)) {
                return true;
            }
        }
    } else {
        for (var i = 0; i < 4; i++) {
            if (player.haveItemWithId(baseid + i, true)) {
                return true;
            }
        }
    }

    return false;
}

function getWeddingPreparationStatus(player, partner) {
    if (!player.haveItem(4000313))
        return -3;
    if (!partner.haveItem(4000313))
        return 3;

    if (!isSuitedForWedding(player, true))
        return -4;
    if (!isSuitedForWedding(partner, true))
        return 4;

    var hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (player.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if (!hasEngagement)
        return -1;

    hasEngagement = false;
    for (var x = 4031357; x <= 4031364; x++) {
        if (partner.haveItem(x)) {
            hasEngagement = true;
            break;
        }
    }
    if (!hasEngagement)
        return -2;

    if (!player.canHold(1112803))
        return 1;
    if (!partner.canHold(1112803))
        return 2;

    return 0;
}

function giveCoupleBlessings(eim, player, partner) {
    var blessCount = eim.gridSize();

    player.gainExp(blessCount * weddingBlessingExp);
    partner.gainExp(blessCount * weddingBlessingExp);
}

function start() {
    weddingIndoors = isWeddingIndoors(cm.getMapId());
    if (weddingIndoors)
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

        if (!weddingIndoors) {
            if (status == 0) {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }

                if (hasEngagement) {
                    var text = "��á���ʲô���԰���?";
                    var choice = new Array("����׼�������.");
                    for (x = 0; x < choice.length; x++) {
                        text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                    }
                    cm.sendSimple(text);
                } else {
                    cm.sendOk("�š����죬����Ʈ�����ļ���������ף��������һ��");
                    cm.dispose();
                }
            } else if (status == 1) {
                var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                var cserv = cm.getClient().getChannelServer();

                if (cserv.isWeddingReserved(wid)) {
                    if (wid == cserv.getOngoingWedding(cathedralWedding)) {
                        var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                        if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                            if (!cm.canHold(4000313)) {
                                cm.sendOk("������һ�±���#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!partner.canHold(4000313)) {
                                cm.sendOk("�����������İ���������һ�±��������#b#t4000313##k.");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(cm.getPlayer(), false)) {
                                cm.sendOk("��Ϊ������#r��ɴ#k! û�����ҾͲ��ܼ޸��㡣");
                                cm.dispose();
                                return;
                            } else if (!isSuitedForWedding(partner, false)) {
                                cm.sendOk("������İ���֪�����Ǳ���׼��һ�� #r��ɴt#k");
                                cm.dispose();
                                return;
                            }

                            cm.sendOk("�ܺã������׼������Ҳ����ˡ������������õ�һ�죬����������ĺ���������������һ����. ���ǿ�ʼ����!!");
                        } else {
                            cm.sendOk("�ţ�������Ĵ�ڱ�... ������������ʽ��ʼǰ��������.");
                            cm.dispose();
                        }
                    } else {
                        var placeTime = cserv.getWeddingReservationTimeLeft(wid);

                        cm.sendOk("������. ����Ļ���Ǽ�ʱ�򣬲�Ҫ���˻�ɴ��");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�ţ��ܱ�Ǹ�����Ƶ����ʱû��Ϊ��Ԥ����");
                    cm.dispose();
                }
            } else if (status == 2) {
                var cserv = cm.getClient().getChannelServer();
                var wtype = cserv.getOngoingWeddingType(cathedralWedding);

                var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                    if (cserv.acceptOngoingWedding(cathedralWedding)) {
                        var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                        if (wid > 0) {
                            var em = cm.getEventManager(weddingEventName);
                            if (em.startInstance(cm.getPlayer())) {
                                eim = getMarriageInstance(cm.getPlayer());
                                if (eim != null) {
                                    eim.setIntProperty("weddingId", wid);
                                    eim.setIntProperty("groomId", cm.getPlayer().getId());
                                    eim.setIntProperty("brideId", cm.getPlayer().getPartnerId());
                                    eim.setIntProperty("isPremium", wtype ? 1 : 0);

                                    eim.registerPlayer(partner);
                                } else {
                                    cm.sendOk("��λ�����¼�ʱ��������������Ժ����ԡ�");
                                }

                                cm.dispose();
                            } else {
                                cm.sendOk("����ﱸǰ������һ�����벻���Ĵ������Ժ�����.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("����ﱸǰ������һ�����벻���Ĵ������Ժ�����.");
                            cm.dispose();
                        }
                    } else {    // partner already decided to start
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�ţ�������Ĵ�ڱ𴦡�����������������ʽ��ʼǰ����������");
                    cm.dispose();
                }
            }
        } else {
            if (status == 0) {
                if (eim == null) {
                    cm.warp(680000000, 0);
                    cm.dispose();
                    return;
                }

                var playerId = cm.getPlayer().getId();
                if (playerId == eim.getIntProperty("groomId") || playerId == eim.getIntProperty("brideId")) {
                    var wstg = eim.getIntProperty("weddingStage");

                    if (wstg == 2) {
                        cm.sendYesNo("�ܺã����������ڰ��������е�ף���������㡣ʱ�䵽��, #r�Ҹ������Ϊ������#k?");
                        state = 1;
                    } else if (wstg == 1) {
                        cm.sendOk("�����������������½�����Ե�ʱ�����ǵĿ������ڸ�����ף�����������������Ҹ���ʱ�̣���Ϊ��ʽ�е����ˡ�");
                        cm.dispose();
                    } else {
                        cm.sendOk("ף����Ļ������ǵ���ʽ�����ˣ������ȥ#b#p9201007##k ���ڣ�����������Ŀ���ȥ�μ���ᡣΪ��İ��ɱ���");
                        cm.dispose();
                    }
                } else {
                    var wstg = eim.getIntProperty("weddingStage");
                    if (wstg == 1) {
                        if (eim.gridCheck(cm.getPlayer()) != -1) {
                            cm.sendOk("��Ҷ�ף����Կɰ������£�");
                            cm.dispose();
                        } else {
                            if (eim.getIntProperty("guestBlessings") == 1) {
                                cm.sendYesNo("����ף����Է���?");
                                state = 0;
                            } else {
                                cm.sendOk("�����������������ؾ�������õķ��ޣ�");
                                cm.dispose();
                            }
                        }
                    } else if (wstg == 3) {
                        cm.sendOk("�������ǽ����. �����õ���������Ϊ#r�ɶ�#k����׼��, Ӧ�úܿ�Ϳ�ʼ��.������Է���.");
                        cm.dispose();
                    } else {
                        cm.sendOk("���˵�ף��ʱ������ˡ���һ�£���Է򸾺ܿ��Ҫ���������ˡ������ľ�ɫ����");
                        cm.dispose();
                    }
                }
            } else if (status == 1) {
                if (state == 0) {    // give player blessings
                    eim.gridInsert(cm.getPlayer(), 1);

                    if (YamlConfig.config.server.WEDDING_BLESSER_SHOWFX) {
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

                    cm.sendOk("���ף���Ѿ����������ǵİ�����һ�Կɰ��ķ���˵�����Ƕ�ô���е���Ϊ����");
                    cm.dispose();
                } else {            // couple wants to complete the wedding
                    var wstg = eim.getIntProperty("weddingStage");

                    if (wstg == 2) {
                        var pid = cm.getPlayer().getPartnerId();
                        if (pid <= 0) {
                            cm.sendOk("�ƺ��㲻�ٺ���İ��¶����ˣ����ڽ���ǰ���������������ղ���������ֿ��ֶ�ȥ�Ķ��ˣ�");
                            cm.dispose();
                            return;
                        }

                        var player = cm.getPlayer();
                        var partner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId());
                        if (partner != null) {
                            state = getWeddingPreparationStatus(player, partner);

                            switch (state) {
                                case 0:
                                    var pid = eim.getIntProperty("confirmedVows");
                                    if (pid != -1) {
                                        if (pid == player.getId()) {
                                            cm.sendOk("���Ѿ�ȷ����������ԡ�ʣ�µľ�����İ���ȷ���ˡ�");
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

                                            cm.getMap().dropMessage(6, "���˾�������ǿøߴ�ķ��������ҵ���������������������Ϊ���ޡ�������������");
                                            eim.schedule("showMarriedMsg", 2 * 1000);
                                        }
                                    } else {
                                        eim.setIntProperty("confirmedVows", player.getId());
                                        cm.getMap().dropMessage(6, "Wedding Assistant: " + player.getName() + " has confirmed vows! Alright, one step away to make it official. Tighten your seatbelts!");
                                    }

                                    break;

                                case -1:
                                    cm.sendOk("�ƺ��㲻��ӵ�ж���ʱ����İ��¹���Ľ�ָ/��ָ�С���Ǹ��������Ҫ�������");
                                    break;

                                case -2:
                                    cm.sendOk("�������ǵİ��²���ӵ�ж���ʱ���������õĽ�ָ/��ָ���ˡ���Ǹ��������Ҫ���������");
                                    break;

                                case -3:
                                    cm.sendOk("�����û����ڴ���#r#t4000313##k ���ҵ�����û���Ƕ����Ҳ��ܼ޸��㡣");
                                    break;

                                case -4:
                                    cm.sendOk("��ԭ���ҵĴ�³�����·�����ʽ����Ҫ��ɲ��֡��봩�Ϻ��ʵ��·��μӻ���");
                                    break;

                                case 1:
                                    cm.sendOk("��׼��һ��װ������ȡ����ָ������");
                                    break;

                                case 2:
                                    cm.sendOk("������İ���֪��Ҫ�ṩһ��װ��������ý���ָ������");
                                    break;

                                case 3:
                                    cm.sendOk("��İ��º���û�� #r#t4000313##k������ڴ��ṩ... ���ҳ�����û�����Ҳ��ܼ޸��㡣.");
                                    break;

                                case 4:
                                    cm.sendOk("������Ĵ�ڻ����ϴ��ò����ʡ�������ԭ���ҵĴ�³�����·�����ʽ����Ҫ��ɲ���");
                                    break;
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("�ţ�������Ĵ��������ڽ���ǰ���������ź����������İ��²��ڣ��ҾͲ�����ɻ���");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("����������#b����#k. ��ϲ!");
                        cm.dispose();
                    }
                }
            }
        }
    }
}