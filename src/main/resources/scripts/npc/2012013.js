function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想去玩具城吗?");
        } else {
            cm.sendOk("去玩具城的火车已经开走了，请耐心等待下一班.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你确定有去往玩具城的票吗?.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("请想好以后再跟我对话!");
        cm.dispose();
	return;
    } 
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("去玩具城的火车已经开走了，请耐心等待下一班.");
        cm.dispose();
    }
}