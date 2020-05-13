var cost = 6000;
var status = 0;

function start() {
    cm.sendYesNo("你好，我负责销售去玩具城的船票。从一小时开始，到玩具城的旅程每10分钟起飞一次，你需要花费#b"+cost+"金币#k.你确定要购买#b#t4031045##k吗?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        if(mode == 0) {
            cm.sendNext("你一定有点事要处理，对吧？");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("你确定你有#b"+cost+"金币#k吗?如果有的话，请检查你的其他栏是否已经满了。");
            cm.dispose();
        }
    }
}
