/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */

importPackage(Packages.server.expeditions);

var status = 0;
var toBan = -1;
var choice;
var arenaType;
var arena;
var arenaName;
var type;
var map;
var exped = MapleExpeditionType.ARIANT;
var exped1 = MapleExpeditionType.ARIANT1;
var exped2 = MapleExpeditionType.ARIANT2;

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
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (cm.getPlayer().getMapId() == 980010000) {
            if (cm.getLevel() > 30) {
                cm.sendOk("你的等级已经超过了 #r30级#k, 因此，您不能再参与.");
                cm.dispose();
                return;
            }
            
            if (status == 0) {
                var expedicao = cm.getExpedition(exped);
                var expedicao1 = cm.getExpedition(exped1);
                var expedicao2 = cm.getExpedition(exped2);
				if (expedicao != null) {
				if (cm.getPlayerCount(980010100) == 0 && cm.getPlayerCount(980010101) == 0)
                    cm.endExpedition(expedicao);
				}
				if (expedicao1 != null) {
				if (cm.getPlayerCount(980010200) == 0 && cm.getPlayerCount(980010201) == 0)
                    cm.endExpedition(expedicao1);
				}
				if (expedicao2 != null) {
				if (cm.getPlayerCount(980010300) == 0 && cm.getPlayerCount(980010301) == 0)
                    cm.endExpedition(expedicao2);
				}
                var channelMaps = cm.getClient().getChannelServer().getMapFactory();
                var startSnd = "你想做什么? \r\n\r\n\t#e#r(选择一个竞技场)#n#k\r\n#b";
                var toSnd = startSnd;

                if (expedicao == null) {
                    toSnd += "#L0#竞技场 (1) (空闲)#l\r\n";
                } else if (channelMaps.getMap(980010101).getCharacters().isEmpty()) {
                    toSnd += "#L0#加入战斗竞技场 (1)  Owner (" + expedicao.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped) + "\r\n";
                }
                if (expedicao1 == null) {
                    toSnd += "#L1#竞技场 (2) (空闲)#l\r\n";
                } else if (channelMaps.getMap(980010201).getCharacters().isEmpty()) {
                    toSnd += "#L1#加入战斗竞技场 (2)  Owner (" + expedicao1.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped1) + "\r\n";
                }
                if (expedicao2 == null) {
                    toSnd += "#L2#竞技场 (3) (空闲)#l\r\n";
                } else if (channelMaps.getMap(980010301).getCharacters().isEmpty()) {
                    toSnd += "#L2#加入战斗竞技场 (3)  Owner (" + expedicao2.getLeader().getName() + ")" + " 目前的成员: " + cm.getExpeditionMemberNames(exped2) + "\r\n";
                }
                if (toSnd.equals(startSnd)) {
                    cm.sendOk("所有的竞技场现在都有人了。我建议你以后再来或者换频道.");
                    cm.dispose();
                } else {
                    cm.sendSimple(toSnd);
                }
            } else if (status == 1) {
                arenaType = selection;
                expedicao = fetchArenaType();
                if (expedicao == "") {
                    cm.dispose();
                    return;
                }
                
                if (expedicao != null) {
                    enterArena(-1);
                } else {
                    cm.sendGetText("这场比赛最多能有多少人参加? (2~5 人)");
                }
            } else if (status == 2) {
                var players = parseInt(cm.getText());   // AriantPQ option limit found thanks to NarutoFury (iMrSiN)
                if (isNaN(players)) {
                    cm.sendNext("请在您的实例中输入允许玩家的人数限制.");
                    status = 0;
                } else if (players < 2) {
                    cm.sendNext("设置限值不应小于2个玩家.");
                    status = 0;
                } else {
                    enterArena(players);
                } 
            }
        }
    }
}

function fetchArenaType() {
    switch (arenaType) {
        case 0 :
            exped = MapleExpeditionType.ARIANT;
            expedicao = cm.getExpedition(exped);
            map = 980010100;
            break;
        case 1 :
            exped = MapleExpeditionType.ARIANT1;
            expedicao = cm.getExpedition(exped);
            map = 980010200;
            break;
        case 2 :
            exped = MapleExpeditionType.ARIANT2;
            expedicao = cm.getExpedition(exped);
            map = 980010300;
            break;
        default :
            exped = null;
            map = 0;
            expedicao = "";
    }
    
    return expedicao;
}

function enterArena(arenaPlayers) {
    expedicao = fetchArenaType();
    if (expedicao == "") {
        cm.dispose();
        return;
    } else if (expedicao == null) {
        if (arenaPlayers != -1) {
            var res = cm.createExpedition(exped, true, 0, arenaPlayers);
            if (res == 0) {
                cm.warp(map, 0);
                cm.getPlayer().dropMessage("你的竞技场成功创建。等待人们加入战斗。");
            } else if (res > 0) {
                cm.sendOk("对不起，你已经达到这次探险的限额了!改天再试一次……");
            } else {
                cm.sendOk("开始挑战时发生意外错误，请稍后再试。");
            }
        } else {
            cm.sendOk("探险队时发生意外错误，请稍后再试。");
        }
        
        cm.dispose();
    } else {
        if (playerAlreadyInLobby(cm.getPlayer())) {
            cm.sendOk("对不起，你已经在大厅了。");
            cm.dispose();
            return;
        }

        var playerAdd = expedicao.addMemberInt(cm.getPlayer());
        if (playerAdd == 3) {
            cm.sendOk("对不起，现在人员都满了");
            cm.dispose();
        } else {
            if (playerAdd == 0) {
                cm.warp(map, 0);
                cm.dispose();
            } else if (playerAdd == 2) {
                cm.sendOk("对不起，房主不允许您进入.");
                cm.dispose();
            } else {
                cm.sendOk("错误.");
                cm.dispose();
            }
        }
    }
}

function playerAlreadyInLobby(player) {
    return cm.getExpedition(MapleExpeditionType.ARIANT) != null && cm.getExpedition(MapleExpeditionType.ARIANT).contains(player) ||
            cm.getExpedition(MapleExpeditionType.ARIANT1) != null && cm.getExpedition(MapleExpeditionType.ARIANT1).contains(player) ||
            cm.getExpedition(MapleExpeditionType.ARIANT2) != null && cm.getExpedition(MapleExpeditionType.ARIANT2).contains(player);
}