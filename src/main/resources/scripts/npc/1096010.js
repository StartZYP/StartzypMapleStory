function start() {
	if (cm.isQuestStarted(2566)) {
		if (!cm.haveItem(4032985)) {
			if (cm.canHold(4032985)) {
				cm.gainItem(4032985, true);
				cm.earnTitle("���ҵ����װ���ˡ����������и�����");				
			}
		} else {
			cm.earnTitle("���Ѿ����˵��װ���ˡ�");
		}
	}
	cm.dispose();
}