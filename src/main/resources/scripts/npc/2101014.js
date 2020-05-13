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
                cm.sendOk("��ĵȼ��Ѿ������� #r30��#k, ��ˣ��������ٲ���.");
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
                var startSnd = "������ʲô? \r\n\r\n\t#e#r(ѡ��һ��������)#n#k\r\n#b";
                var toSnd = startSnd;

                if (expedicao == null) {
                    toSnd += "#L0#������ (1) (����)#l\r\n";
                } else if (channelMaps.getMap(980010101).getCharacters().isEmpty()) {
                    toSnd += "#L0#����ս�������� (1)  Owner (" + expedicao.getLeader().getName() + ")" + " Ŀǰ�ĳ�Ա: " + cm.getExpeditionMemberNames(exped) + "\r\n";
                }
                if (expedicao1 == null) {
                    toSnd += "#L1#������ (2) (����)#l\r\n";
                } else if (channelMaps.getMap(980010201).getCharacters().isEmpty()) {
                    toSnd += "#L1#����ս�������� (2)  Owner (" + expedicao1.getLeader().getName() + ")" + " Ŀǰ�ĳ�Ա: " + cm.getExpeditionMemberNames(exped1) + "\r\n";
                }
                if (expedicao2 == null) {
                    toSnd += "#L2#������ (3) (����)#l\r\n";
                } else if (channelMaps.getMap(980010301).getCharacters().isEmpty()) {
                    toSnd += "#L2#����ս�������� (3)  Owner (" + expedicao2.getLeader().getName() + ")" + " Ŀǰ�ĳ�Ա: " + cm.getExpeditionMemberNames(exped2) + "\r\n";
                }
                if (toSnd.equals(startSnd)) {
                    cm.sendOk("���еľ��������ڶ������ˡ��ҽ������Ժ��������߻�Ƶ��.");
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
                    cm.sendGetText("�ⳡ����������ж����˲μ�? (2~5 ��)");
                }
            } else if (status == 2) {
                var players = parseInt(cm.getText());   // AriantPQ option limit found thanks to NarutoFury (iMrSiN)
                if (isNaN(players)) {
                    cm.sendNext("��������ʵ��������������ҵ���������.");
                    status = 0;
                } else if (players < 2) {
                    cm.sendNext("������ֵ��ӦС��2�����.");
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
                cm.getPlayer().dropMessage("��ľ������ɹ��������ȴ����Ǽ���ս����");
            } else if (res > 0) {
                cm.sendOk("�Բ������Ѿ��ﵽ���̽�յ��޶���!��������һ�Ρ���");
            } else {
                cm.sendOk("��ʼ��սʱ��������������Ժ����ԡ�");
            }
        } else {
            cm.sendOk("̽�ն�ʱ��������������Ժ����ԡ�");
        }
        
        cm.dispose();
    } else {
        if (playerAlreadyInLobby(cm.getPlayer())) {
            cm.sendOk("�Բ������Ѿ��ڴ����ˡ�");
            cm.dispose();
            return;
        }

        var playerAdd = expedicao.addMemberInt(cm.getPlayer());
        if (playerAdd == 3) {
            cm.sendOk("�Բ���������Ա������");
            cm.dispose();
        } else {
            if (playerAdd == 0) {
                cm.warp(map, 0);
                cm.dispose();
            } else if (playerAdd == 2) {
                cm.sendOk("�Բ��𣬷���������������.");
                cm.dispose();
            } else {
                cm.sendOk("����.");
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