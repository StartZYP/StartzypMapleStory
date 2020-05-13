var status = 0;
var section = 0;
importPackage(java.lang);
//questid 29931, infoquest 7662

function start() {
	action(1, 0, 0);
}


function action(mode, type, selection) {
    status++;
    if(mode == 0 && type == 0)
        status -= 2;
	                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
    if (mode >= 0) {
    if (status == 1) {
	if (cm.getMapId() == 910320001) {
		cm.warp(910320000, 0);
		cm.dispose();
	} else if (cm.getMapId() == 910330001) {
		var itemid = 4001321;
		if (!cm.canHold(itemid)) {
			cm.sendOk("������������һЩ�ռ䡣");
		} else {
			cm.gainItem(itemid,1);
			cm.warp(910320000, 0);
		}
		cm.dispose();
	} else if (cm.getMapId() >= 910320100 && cm.getMapId() <= 910320304) {
		cm.sendYesNo("����Ҫ�뿪����");
		status = 99;
	} else {
		cm.sendSimple("���ã�����#p1052115# ��ʲô���԰�æ���𣿣�\r\n#b#e#L1#��ȥ��ս��#l#n\r\n#L2#��ѵ�� 999.#l\r\n#L3#��ȡѫ�� <#t4001321#>.#l#k");
	}
    } else if (status == 2) {
		section = selection;
		if (selection == 1) {
			if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
			cm.sendOk("�ӳ����������");
			cm.dispose();
			return;
		    } 
			var party = cm.getPlayer().getParty().getMembers();
			var mapId = cm.getPlayer().getMapId();
			var next = true;
			var size = 0;
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if (ccPlayer == null) {
					next = false;
					break;
				}
				size++;
			}	
			 var em = cm.getEventManager("English");
    		    if (em == null) {
			cm.sendOk("���ٳ���һ�Ρ�");
			cm.dispose();
			return;
    		    }
			if (next && size >= 1) {
		    		if (em.getInstance("English") == null) {
					 var eli = em.getEligibleParty(cm.getParty());
                    if(eli.size() > 0) {
                         if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                              cm.sendOk("��һ���Ѿ������� #r�������#k �����Ƶ�����볢����һ��Ƶ������ȴ���ǰ�Ľ�Ŀ������");
												}}                      
		    		} else {
					cm.sendOk("�Ѿ�������һ������������ս�ˡ�");
		    		}
			} else {
				cm.sendOk("�����Ա����ȫ�������");
			}
		    
		} else if (selection == 2) {
			if (cm.haveItem(4001321)) {
				if (cm.bonus_PyramidSubway(-1)) {
					cm.gainItem(4001321, -1);
				} else {
					cm.sendOk("�����Ѿ����ˡ�");
				}
			} else {
				cm.sendOk("��û��#b#t4001321##k��");
			}
		} else if (selection == 3) {
			var record = cm.getQuestRecord(7662);
			var data = record.getCustomData();
			if (data == null) {
				record.setCustomData("0");
				data = record.getCustomData();
			}
			var mons = parseInt(data);
			if (mons < 10000) {
				cm.sendOk("����Ҫɱ��1��ֻ���Ŀǰ : " + mons);
			} else if (cm.canHold(1142141) && !cm.haveItem(1142141)){
				cm.gainItem(1142141,1);
				cm.forceStartQuest(29931);
				cm.forceCompleteQuest(29931);
			} else {
				cm.sendOk("��ճ�һЩ�ռ䡣");
			}
		}
		cm.dispose();
	} else if (status == 100) {
		cm.warp(910320000,0);
		cm.dispose();
	}
}
}