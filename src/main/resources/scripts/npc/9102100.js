/**
-- Odin JavaScript --------------------------------------------------------------------------------
	? - Victoria Road: Pet-Walking Road (100000202)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
	cm.sendNext("#b(��û��������ڲݵ��ϵĶ���)");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	if (cm.getQuestStatus(4646) == 1) {
	    if (cm.haveItem(4031921)) {
		cm.sendNext("#b(����ʲô�������������������г���ķ��!)");
		cm.dispose();
	    } else {
		cm.sendYesNo("#b(���ܿ���һЩ���ݸ��ǵĶ�������Ӧ�ð����γ�����)");
	    }
	} else {
	    cm.sendOk("#b(��ʲôҲ�Ҳ���.)");
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.sendNext("���ҵ��˳����������˹�صĶ������������ű���.");
	cm.gainItem(4031921, 1);
	cm.dispose();
    }
}