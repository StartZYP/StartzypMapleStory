function start() {
	if (cm.isQuestStarted(2566)) {
		if (!cm.haveItem(4032985)) {
			if (cm.canHold(4032985)) {
				cm.gainItem(4032985, true);
				cm.earnTitle("你找到点火装置了。把它交给切割器。");				
			}
		} else {
			cm.earnTitle("你已经有了点火装置了。");
		}
	}
	cm.dispose();
}