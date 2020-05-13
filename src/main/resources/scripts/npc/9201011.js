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
                    cm.sendYesNo("ŶŶŶŶŶŶ���������Ѿ����������������ǵİ���������ʱ���ˣ��������Ҹ�������������");
                    state = 1;
                } else if(wstg == 1) {
                    cm.sendOk("�ȵȣ��������ǵĿ������ڰ����ǵİ��׸����ǡ������ǰ���ط�ҡ����������~~.");
                    cm.dispose();
                } else {
                    cm.sendOk("�ټ������ǵĽ��������Ѿ������ˣ����#b#p9201009#kһ�������������������ļ���ȥ�μ���һ���ۻᡣΪ��İ��ɱ���");
                    cm.dispose();
                }
            } else {
                var wstg = eim.getIntProperty("weddingStage");
                if(wstg == 1) {
                    if(eim.gridCheck(cm.getPlayer()) != -1) {
                        cm.sendOk("�����������ǰڶ�������ҡ����!!");
                        cm.dispose();
                    } else {
                        if(eim.getIntProperty("guestBlessings") == 1) {
                            cm.sendYesNo("�������ڳ��������Ǳ����İ���?");
                            state = 0;
                        } else {
                            cm.sendOk("���ǵĳ������Ƕ��ۼ������ÿ���ˣ������Ǹ�����һ�����õģ����õľۻ�~!");
                            cm.dispose();
                        }
                    }
                } else if(wstg == 3) {
                    cm.sendOk("���ร�����������µİ������һ�ų����������ģ����������֮������һֱ������ȥ����׼���ú��ɶԣ���������������ѻ���ߣ�");
                    cm.dispose();
                } else {
                    cm.sendOk("�����������ǡ������۾��Ͷ�����գ�!!");
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

                cm.sendOk("ȥ�ɣ��ҵ����ѣ���İ��Ѿ���ӵ�����֮�У�����һ����������Σ�����Զ��Ծ�����ǵ����У�");
                cm.dispose();
            } else {            // couple wants to complete the wedding
                var wstg = eim.getIntProperty("weddingStage");

                if(wstg == 2) {
                    var pid = cm.getPlayer().getPartnerId();
                    if(pid <= 0) {
                        cm.sendOk("��~���������ȵȣ���ղ��ǲ���Ū�������ڵĶ����������ģ���ô�ˣ�");
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
                                        cm.sendOk("���Ѿ�ȷ����������ԡ�ʣ�µľ�������Ĵȷ����.");
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

                                        cm.getMap().dropMessage(6, "Τ���������ھ�˵������Ȼ�����˵�������ǶԷ�����Կ�ף�һ����׹�Ļ��ߡ������������Լ�!");
                                        eim.schedule("showMarriedMsg", 2 * 1000);
                                    }
                                } else {
                                    eim.setIntProperty("confirmedVows", player.getId());
                                    cm.getMap().dropMessage(6, "Wedding Assistant: " + player.getName() + " �Ѿ�ȷ�������ԣ��ðɣ�����ʽ����ֻ��һ��֮ң��ϵ����ȫ��!");
                                }
                                
                                break;

                            case -1:
                                cm.sendOk("�ðɣ��������ǲ����ж���ʱ�����Ľ�ָ/��ָ���ˡ�");
                                break;

                            case -2:
                                cm.sendOk("�ðɣ��������ǵĴ���������Ƕ���ʱ�����Ľ�ָ/��ָ���ˡ���~");
                                break;

                            case -3:
                                cm.sendOk("�ðɣ�������û����ڴ���#r#t4000313##k�� ���ҵ���������");
                                break;

                            case -4:
                                cm.sendOk("�ޣ���֪�����ʱ�֣���ʱ�ֵĻ�ɴ����������������Ҫ�����á�����˵��ǰ�봩����.");
                                break;

                            case 1:
                                cm.sendOk("��׼��һ��װ������ȡ����ָ����");
                                break;

                            case 2:
                                cm.sendOk("������İ���֪��Ҫ�ṩһ��װ��������ý���ָ������");
                                break;

                            case 3:
                                cm.sendOk("�ðɣ�������Ĵû������ڴ����� #r#t4000313##k�� ����ڴ���... ���ҵ���");
                                break;

                            case 4:
                                cm.sendOk("�ޣ���֪�����˧������Ĵ���񲻴�ʱ�ֵĻ�ɴ���ں���˵��֮ǰ��������Ǵ�����.");
                                break;
                        }

                        cm.dispose();
                    } else {
                        cm.sendOk("Ŷ���ǲ�����Ĵ���ڲ�������...Ŷ�����������Ĵ���ڣ������Ҳ��ܴ�绰���ս���.");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("Wheeeeeeeeeeeeew~��ϲ����!");
                    cm.dispose();
                }
            }
        }
    }
}