/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Jayd - translated CPQ contents to English
---------------------------------------------------------------------------------------------------
**/

var cpqMinLvl = 51;
var cpqMaxLvl = 70;
var cpqMinAmt = 2;
var cpqMaxAmt = 6;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getParty() == null) {
                status = 10;
                cm.sendOk("你需要先创建一个组队，然后才能参加怪物嘉年华！");
            } else if (!cm.isLeader()) {
                status = 10;
                cm.sendOk("如果你想开始战斗，请让#b队长#k与我交谈.");
            } else {
                var leaderMapid = cm.getMapId();
                var party = cm.getParty().getMembers();
                var inMap = cm.partyMembersInMap();
                var lvlOk = 0;
                var isOutMap = 0;
                for (var i = 0; i < party.size(); i++) {
                    if (party.get(i).getLevel() >= cpqMinLvl && party.get(i).getLevel() <= cpqMaxLvl) {
                        lvlOk++;
                        
                        if (party.get(i).getPlayer().getMapId() != leaderMapid) {
                            isOutMap++;
                        }
                    }
                }

                if (party >= 1) {
                    status = 10;
                    cm.sendOk("你的队伍人数不足。你至少需要#b" + cpqMinAmt + "#k - #r" + cpqMaxAmt + "#k队员和他们应该和你在地图上。");
                } else if (lvlOk != inMap) {
                    status = 10;
                    cm.sendOk("确保你的队员的每个人等级满足(" + cpqMinLvl + "~" + cpqMaxLvl + ")!");
                } else if (isOutMap > 0) {
                    status = 10;
                    cm.sendOk("有一些队员不在地图上！");
                } else {
                    if (!cm.sendCPQMapLists2()) {
                        cm.sendOk("所有的怪物狂欢场目前都在使用中！请稍后再试。");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 1) {
            if (cm.fieldTaken2(selection)) {
                if (cm.fieldLobbied2(selection)) {
                    cm.challengeParty2(selection);
                    cm.dispose();
                } else {
                    cm.sendOk("房间目前已满。");
                    cm.dispose();
                }
            } else {
                var party = cm.getParty().getMembers();
                if ((selection === 0 || selection === 1 ) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 2)) {
                    cm.sendOk("你至少需要2名玩家才能参加战斗！");
                } else if ((selection === 2 ) && party.size() < (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 3)) {
                    cm.sendOk("你至少需要3名玩家才能参加战斗！");
                } else {
                    cm.cpqLobby2(selection);
                }
                cm.dispose();
            }
        } else if (status == 11) {
            cm.dispose();
        }
    }
}