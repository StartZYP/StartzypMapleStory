/*
	NPC Name: 		Insiginificant Being
	Map(s): 		Dungeon : Another Entrance
	Description: 		Takes you to another Dimension
*/

function start() {
    if (cm.getQuestStatus(6107) == 1 || cm.getQuestStatus(6108) == 1) {
	var ret = checkJob();
	if (ret == -1) {
	    cm.sendOk("�봴��һ�����������ҽ�̸");
	} else if (ret == 0) {
	    cm.sendOk("��ȷ����Ķ���ֻ��2����");
	} else if (ret == 1) {
	    cm.sendOk("��Ķ�Աû���ʸ�������֮�š�");
	} else if (ret == 2) {
	    cm.sendOk("��Ķ�Աû���ʸ�������֮�š�");
	} else {
	    var em = cm.getEventManager("s4aWorld");
	    if (em == null) {
		cm.sendOk("δ֪ԭ���޷����롣����һ�Ρ�" );
	    } else if (em.getProperty("started").equals("true")) {
		cm.sendOk("�Ѿ�������ͼ�����֮����ս����������" );
	    } else {
                var eli = em.getEligibleParty(cm.getParty());
                if(eli.size() > 0) {
                    if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                        cm.sendOk("��Ķ����Ѿ��Ǽ���");
                    }
                } else {
                    cm.sendOk("�����޷��������������Ϊ���Ķ��鲻�ڷ�Χ��С�ڣ�������ӳ�Ա�е�ĳЩ��û���ʸ��ԣ��������ǲ��ڴ˵�ͼ�С�");
                }
	    }
	}
    } else {
        cm.sendOk("δ֪ԭ���޷����롣����һ�Ρ���");
    }
    
    cm.dispose();
}

function action(mode, type, selection) {
}

function checkJob() {
    var party = cm.getParty();

    if (party == null) {
	return -1;
    }
    //    if (party.getMembers().size() != 2) {
    //	return 0;
    //    }
    var it = party.getMembers().iterator();

    while (it.hasNext()) {
	var cPlayer = it.next();

	if (cPlayer.getJobId() == 312 || cPlayer.getJobId() == 322 || cPlayer.getJobId() == 900) {
	    if (cPlayer.getLevel() < 120) {
		return 2;
	    }
	} else {
	    return 1;
	}
    }
    return 3;
}