var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;



	if(status == 0){
		cm.sendGetText("密封神殿的入口。。。#b密码#k!");
	}
	else if(status == 1){
                if(cm.getWarpMap(925040100).countPlayers() > 0) {
                        cm.sendOk("已经有人在参加密封的圣殿。");
                        cm.dispose();
                        return;
                }
		if(cm.getText() == "行动胜于雄辩"){
			if(cm.isQuestStarted(21747) && cm.getQuestProgressInt(21747, 9300351) == 0)
				cm.warp(925040100, 0);
                        else
                                cm.playerMessage(5, "虽然你说的是对的，但是一些神秘的力量正在阻挡你的进入。");

			cm.dispose();
		}
		else{
			cm.sendOk("#r错误!#k");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}