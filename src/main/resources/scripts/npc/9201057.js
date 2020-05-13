function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("乘坐地铁前往" + (cm.c.getPlayer().getMapId() == 103000100 ? "新叶城" : "维多利亚岛核心城市") + " #b废弃都市#k, 从这里出发，它将花费你 #b5000 金币#k. 你确定要购买 #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("你想在地铁开动前离开吗？不会退款。");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
	var item = 4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000);

        if(!cm.canHold(item)) {
            cm.sendNext("你的背包已满。");
	}
	else if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(item, 1);
            cm.sendNext("购买成功.");
        }else
            cm.sendNext("你没有足够的钱。");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}