var status = 0;
var entry;
function start() {
	if(cm.getPlayer().getMapId() == 922000000) {
		entry = 0;
		cm.sendYesNo("�����뿪������");
		status++;
	}

	else if(cm.isQuestStarted(3239)) {
		entry = 1;
		cm.sendYesNo("�������#b��߹���<��4����>#k��?");
		status++;
	}
	else {
		cm.sendOk("#b��߹���<��4����>#kֻ����Ȩ����˿���.");
	}
}

function action(mode, type, selection) {
	if(status == 1) {
		if(entry == 0) {
			if(mode <= 0) {
				cm.sendOk("�ðɡ���������뿪�����ҽ�̸�ɡ�");
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
                                cm.sendOk("�Ѿ��������ڳ����ˣ����Ժ����ԡ�");
                        }
	
			cm.dispose();		
		}
	}
}