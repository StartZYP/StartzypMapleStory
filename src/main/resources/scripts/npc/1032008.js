function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你想去天空之城吗?");
        else{
            cm.sendOk("去天空之城的航班已经出发，请耐心等待下一次航班。");
            cm.dispose();
        }
    }else{
        cm.sendOk("确保你有一张乘坐这艘船的天空之城船票。检查你的背包。");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变想法跟我说！");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("本次航班已经出发，请等待下一次航班。");
        cm.dispose();
    }
}	