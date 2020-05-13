var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿，我在竞技场的战斗中没有看到你在场上!你在这儿干什么?");
        cm.dispose();
        return;
    }
    
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
            menuStr = generateSelectionMenu(["我要检查我的战斗点数! / 我想兑换 (1) 椰汁树沙滩椅", "我想知道更多关于竞技场的要点。"]);
            cm.sendSimple("您好，我能为您做些什么吗?\r\n\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("你的竞技场分数: #b" + apqpoints + "#k 点。你需要超越 #b100 点#k 这样我就可以给你 #b椰汁树沙滩椅#k. 当你有足够的分数时再和我谈.");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("你的竞技场分数: #b" + apqpoints + "#k 你实际上已经得到了那个分数! 和我妻子谈谈, #p2101016#找到他们，然后再和我聊天!");
                    cm.dispose();
                } else {
                    cm.sendNext("哇，看起来你找到了 #b100#k 点数准备交易，让我们交易?!");
                }
            } else if (selection == 1) {
                cm.sendOk("战斗竞技场的主要目标是让玩家积累点数，这样他们就可以光荣地换取最高的奖励:获得 #b椰汁树沙滩椅#k. 在战斗中收集点数，并在该得奖时告诉我。在每一场战斗中，玩家都有机会根据自己最后拥有的珠宝数量获得分数。但是要小心!如果你的点数与其他玩家的距离 #r太高了#k, 这一切都将是徒劳无功的，而你只会赚到一点点 #r1 点#k 只有.");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}