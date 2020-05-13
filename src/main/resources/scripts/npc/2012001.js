function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你想去魔法密林吗?");
        else{
            cm.sendOk("去魔法密林的船已经出发了，请耐心等待下一班.");
            cm.dispose();
        }
    }else{
        cm.sendOk("确保你有一张魔法密林的船票。请检查你的背包.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("请想好以后再跟我对话!");
	cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000112);
        cm.gainItem(4031047, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("去魔法密林的船已经出发了，请耐心等待下一班.");
        cm.dispose();
    }
}