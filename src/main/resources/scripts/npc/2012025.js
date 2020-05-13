function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("这不是短途飞行，所以你需要处理一些事情，我建议你在登机前先做。你还想登上神灯吗?");
        } else {
            cm.sendOk("神灯马上要出发了。对不起，你得搭下一趟了。");
            cm.dispose();
        }
    } else {
        cm.sendOk("请确认你的背包中有票.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变主意跟我说!");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000152);
        cm.gainItem(4031576, -1);
    } else {
        cm.sendOk("神灯马上要出发了。对不起，你得搭下一趟了.");
    }
    
    cm.dispose();
}