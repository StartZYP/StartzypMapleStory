function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想上船吗?");
        } else {
            cm.sendOk("航班还没到。请等一会儿。");
            cm.dispose();
        }
    } else {
        cm.sendOk("确保你有一张神木村的机票。请检查你的背包.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变主意就跟我说！");
        cm.dispose();
	return;
    }

    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("航班还没到。请等一会儿。");
    }
    cm.dispose();
}