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
		cm.sendGetText("�ܷ�������ڡ�����#b����#k!");
	}
	else if(status == 1){
                if(cm.getWarpMap(925040100).countPlayers() > 0) {
                        cm.sendOk("�Ѿ������ڲμ��ܷ��ʥ�");
                        cm.dispose();
                        return;
                }
		if(cm.getText() == "�ж�ʤ���۱�"){
			if(cm.isQuestStarted(21747) && cm.getQuestProgressInt(21747, 9300351) == 0)
				cm.warp(925040100, 0);
                        else
                                cm.playerMessage(5, "��Ȼ��˵���ǶԵģ�����һЩ���ص����������赲��Ľ��롣");

			cm.dispose();
		}
		else{
			cm.sendOk("#r����!#k");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}