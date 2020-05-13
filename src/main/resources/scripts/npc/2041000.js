function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你想去玩具城吗？");
        else{
            cm.sendOk("去玩具城的火车已经开走了，请耐心等待下一班。");
            cm.dispose();
        }
    }else{
        cm.sendOk("确保你有一张玩具城火车票。检查你的背包.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧，如果你改变主意就跟我说！");
        cm.dispose();
	return;
    } 
    
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(220000111);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else {
        cm.sendOk("去玩具城的火车已经开走了，请耐心等待下一班。");
        cm.dispose();
    }
}