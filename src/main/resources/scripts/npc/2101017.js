/*2101017.js
 *Cesar
 *@author Jvlaple
 */

importPackage(Packages.server.expeditions);


var status = 0;
var toBan = -1;
var choice;
var arena;
var arenaName;
var type;
var map;
var exped;
var expedicao;
var expedMembers;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
            if (cm.getPlayer().getMapId() == 980010100) {
                exped = MapleExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);

            } else if (cm.getPlayer().getMapId() == 980010200) {
                exped = MapleExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = MapleExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }
            
            if (expedicao == null) {
                cm.dispose();
                return;
            }
            
            expedMembers = expedicao.getMemberList();
            if (status == 0) {
                if (cm.isLeaderExpedition(exped)) {
                    cm.sendSimple("你想做什么? #b\r\n#L1#查看当前成员#l\r\n#L2#禁止成员#l\r\n#L3#开始战斗#l\r\n#L4#离开挑战#l");
                    status = 1;
                } else {
                    var toSend = "这个竞技场的当前成员:\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                }
            } else if (status == 1) {
                if (selection == 1) {
                    var toSend = "这个竞技场的当前成员:\r\n#b";
                    toSend += cm.getExpeditionMemberNames(exped);
                    cm.sendOk(toSend);
                    cm.dispose();
                } else if (selection == 2) {
                    var size = expedMembers.size();
                    if (size == 1) {
                        cm.sendOk("你是队伍中唯一的队员。");
                        cm.dispose();
                        return;
                    }
                    var text = "下列成员参与你的探险任务 (点击他们可以踢出):\r\n";
                    text += "\r\n\t\t1." + expedicao.getLeader().getName();
                    for (var i = 1; i < size; i++) {
                        text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                    }
                    cm.sendSimple(text);
                    status = 6;
                } else if (selection == 3) {
                    if (expedicao.getMembers().size() < 1) {
                        cm.sendOk("需要多一个玩家来开始战斗.");
                        cm.dispose();
                    } else {
                        if (cm.getParty() != null) {
                            cm.sendOk("你不能作为一个小队参加战斗.");
                            cm.dispose();
                            return;
                        }
                        
                        var errorMsg = cm.startAriantBattle(exped, cm.getPlayer().getMapId());
                        if (errorMsg != "") {
                            cm.sendOk(errorMsg);
                        }
                        
                        cm.dispose();
                    }
                } else if (selection == 4) {
                    cm.mapMessage(5, "竞技场的房主离开了.");
                    expedicao.warpExpeditionTeam(980010000);
                    cm.endExpedition(expedicao);
                    cm.dispose();
                }
            } else if (status == 6) {
                if (selection > 0) {
                    var banned = expedMembers.get(selection - 1);
                    expedicao.ban(banned);
                    cm.sendOk("你已经禁止 " + banned.getValue() + " 从这次探险.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            }
        } else if (Packages.constants.game.GameConstants.isAriantColiseumArena(cm.getPlayer().getMapId())) {
            if (cm.getPlayer().getMapId() == 980010101) {
                exped = MapleExpeditionType.ARIANT;
                expedicao = cm.getExpedition(exped);
            } else if (cm.getPlayer().getMapId() == 980010201) {
                exped = MapleExpeditionType.ARIANT1;
                expedicao = cm.getExpedition(exped);
            } else {
                exped = MapleExpeditionType.ARIANT2;
                expedicao = cm.getExpedition(exped);
            }
            if (status == 0) {
                var gotTheBombs = expedicao.getProperty("炸弹" + cm.getChar().getId());
                if (gotTheBombs != null) {
                    cm.sendOk("我已经把炸弹给你了，请杀了那个 #b蝎#k now!");
                    cm.dispose();
                } else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
                    cm.sendOk("我已经给了你 (5) #b#炸弹#k#n 减速石 (50) #b#e减速石k#k#n.\r\n用基本的岩石来捕获蝎子获取 #r#e灵魂石#k#n!");
                    expedicao.setProperty("炸弹" + cm.getChar().getId(), "1");
                    cm.gainItem(2270002, 50);
                    cm.gainItem(2100067, 5);
                    cm.dispose();
                } else {
                    cm.sendOk("看来你的背包已经满了.");
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("大家好，你听说过竞技场吗?这是一个供不同等级的玩家参加的竞技项目 20和 30级!");
            cm.dispose();
        } 
    }
}
