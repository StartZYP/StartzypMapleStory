var status = 0;
var entry;
function start() {
	if(cm.getPlayer().getMapId() == 922000000) {
		entry = 0;
		cm.sendYesNo("你想离开这里吗？");
		status++;
	}

	else if(cm.isQuestStarted(3239)) {
		entry = 1;
		cm.sendYesNo("你想进入#b玩具工厂<第4地区>#k吗?");
		status++;
	}
	else {
		cm.sendOk("#b玩具工厂<第4地区>#k只对授权后的人开放.");
	}
}

function action(mode, type, selection) {
	if(status == 1) {
		if(entry == 0) {
			if(mode <= 0) {
				cm.sendOk("好吧。如果你想离开就与我交谈吧。");
				cm.dispose();
				return;
			}
			
			cm.warp(922000009, 0);
			if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
			cm.dispose();
		}

		else {
			if(mode <= 0) {
				cm.dispose();
				return;
			}
                        
                        if(cm.getWarpMap(922000000).countPlayers() == 0) {
                                cm.warp(922000000, 0);
                                if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
                        } else {
                                cm.sendOk("已经有人正在尝试了，请稍后再试。");
                        }
	
			cm.dispose();		
		}
	}
}