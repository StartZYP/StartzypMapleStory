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
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("太糟糕了，你没有得到任何珠宝!");
                cm.dispose();
            } else {
                cm.sendNext("好的,让我们看看…你做得很好，你带来了 #b" + copns + "#k 我喜欢的珠宝。既然你已经完成了比赛，我将奖励你一个竞技场分数 #b" + arena.getAriantRewardTier(cm.getPlayer()) + " 目的#k. 如果你想知道更多关于竞技场分数的信息，请联系我们 #b#p2101015##k.");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);
            
            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("好吧!下次给我制造更多的珠宝吧!Ahahahahah!"); 
            cm.dispose();
        }
    }
}