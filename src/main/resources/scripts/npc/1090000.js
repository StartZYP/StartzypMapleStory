/* ==================
 �ű�����: NPC	    
 �ű���Ȩ����Ϸ���Ŷ�
 ��ϵ�ۿۣ�297870163    .
 =====================
 */

var status = 0;
var jobId;
var jobName;
var mapId


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 2) {
        cm.sendOk("������.");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;
    if (status == 0) {
	if (cm.getMapId() == 912010200 || cm.haveItem(4031059, 1)) {
        if (cm.getQuestStatus(6370) == 1) {
			cm.removeAll(4031059);
            //cm.teachSkill(5221006, 0, 10);
           cm.forceStartQuest(6371,"2"); //��ʼ����
		   cm.warp(120000101, 0);
		   cm.dispose();
        } else if (cm.getQuestStatus(6330) == 1) {
			cm.removeAll(4031059);
            //cm.teachSkill(5121003, 0, 10);
             cm.forceStartQuest(6331,"2"); //��ʼ����
			 cm.warp(120000101, 0);
			 cm.dispose();
        }
        //cm.warp(120000101, 0);
		//cm.sendOk("��ϲ�������,�����װ���ܣ�");
        cm.dispose();
	}
	if (cm.getJob() == 0) {
		if (cm.getPlayer().getLevel() >= 10) {
		cm.sendNext("��Ҫתְ��Ϊһλ #r����#k ?");
	    } else {
		cm.sendOk("�㻹����תְ��Ϊ #r����#k.");
		cm.dispose();
	    }
	} else {
	    if (cm.getPlayer().getLevel() >= 30 && cm.getJob() == 500) { // ����
		if (cm.isQuestFinished(2191) || cm.isQuestFinished(2192)) {
			if (cm.isQuestFinished(2191) || cm.isQuestFinished(2192)) {
			status = 20;
			cm.sendNext("�ҿ���������˲���. ��Ҫ����תְ�����һҳ!");
		    } else {
			cm.sendOk("��ȥ�� #r����תְ�̹�#k.")
			cm.dispose();
		    }
		} else {
		    status = 10;
		    cm.sendNext("���Ѿ�����תְ��,Ҫתְ�����һҳ.");
		}
	    } else if (cm.getPlayer().getLevel() >= 70 && cm.getJob() == 510 || cm.getJob() == 520) {
				if (cm.isQuestActive(100111)) {
				cm.sendOk("�������һ�����飬����ȥ�� #r�ѵ���#k.λ�ڱ���ѩ��#b���Ϲ���#k!");
				cm.dispose();
				} else if (!cm.isQuestActive(100110)) {
				cm.sendOk("����ȥȥ�� #r�ѵ���#k.�������������������!");
				cm.dispose();
               } else if(cm.haveItem(4031057, 1)){
			    cm.sendOk("�������һ�����飬����ȥ�� #b�ѵ���#k.λ�ڱ���ѩ��#b���Ϲ���#k!");
               } else if (cm.haveItem(4031059, 1)) {
                    //cm.gainItem(4031057, 1);
                    cm.gainItem(4031059, -1);
					cm.forceStartQuest(100111); //��ʼ����
                   //cm.warp(211000001, 0);
                    cm.sendOk("�������һ������,����ȥ��#b�ѵ���#k,λ�ڱ���ѩ��#b���Ϲ���#k");
                } else {
                    cm.sendOk("��,#b#h0##k!����Ҫһ��#b�ڷ�#k.��ȥ#r������޶�Ѩ��#k��#r���Ԫ�ռ�#k�ø���.");
                }
                cm.dispose();
            } else if (cm.isQuestActive(6370) && !cm.isQuestActive(6371)) {
			var dd = cm.getEventManager("KyrinTrainingGroundC");
            if (dd != null) {
                dd.startInstance(cm.getPlayer());
            } else {
                cm.sendOk("δ֪�Ĵ������Ժ��ڳ��ԡ�");
				cm.dispose();
            }
		} else if (cm.isQuestActive(6330) && !cm.isQuestActive(6331)) {
            var dd = cm.getEventManager("KyrinTrainingGroundV");
            if (dd != null) {
                dd.startInstance(cm.getPlayer());
				cm.dispose();
            } else {
                cm.sendOk("δ֪�Ĵ������Ժ��ڳ��ԡ�");
				cm.dispose();
			}				
	    } else {
		if (cm.isQuestActive(6371) || cm.isQuestActive(6331)) {
		cm.sendOk("���ҿ���-����תְ�ٽ�����.");
		cm.dispose();
		} else {
		cm.sendOk("���,���ǿ���-����תְ��.");
		cm.dispose();
	    }
	}
	}
    } else if (status == 1) {
	cm.sendNextPrev("һ��תְ�˾Ͳ��ܷ���,�������תְ�����һҳ.");
    } else if (status == 2) {
	cm.sendYesNo("�����Ҫ��Ϊһλ #r����#k ?");
    } else if (status == 3) {
	if (cm.getJob() == 0 && cm.getPlayer().getLevel() == 10) {
		cm.changeJob(500); // ����
		cm.resetStats(4, 4, 4, 4);
	    cm.gainItem(1482014, 1);
	    cm.gainItem(1492014, 1);
	    cm.gainItem(2330000, 600);
	    cm.gainItem(2330000, 600);
	    cm.gainItem(2330000, 600);
	cm.sendOk("תְ�ɹ� ! ");
	} else{
		if (cm.getJob() == 0 && cm.getPlayer().getLevel() >= 10) {
				cm.changeJob(500); // ����
				cm.resetStats(4, 4, 4, 4);
				cm.getPlayer().gainSP((cm.getPlayer().getLevel()-10)*3);//תְ�����ܵ�
				cm.gainItem(1482014, 1);
	    cm.gainItem(1492014, 1);
	    cm.gainItem(2330000, 600);
	    cm.gainItem(2330000, 600);
	    cm.gainItem(2330000, 600);
	cm.sendOk("תְ�ɹ� ! ");
	cm.dispose();
	}}
    } else if (status == 11) {
	cm.sendNextPrev("�����ѡ����Ҫתְ��Ϊһλ #rȭ��#k, #rǹ��#k.")
    } else if (status == 12) {
	cm.askAcceptDecline("�����ұ����Ȳ�����,��׼�������� ?");
    } else if (status == 13) {
	if (cm.isQuestActive(2191)==1 || cm.isQuestActive(2192)==1 || cm.isQuestFinished(2191) || cm.isQuestFinished(2192)){//�ж�����
	//if (cm.isQuestFinished(2191) || cm.isQuestFinished(2192)) {//�ж�����
	cm.sendSimple("����Ҫ��Ϊʲô? #b\r\n#L0#ȭ��#l\r\n#L1#ǹ��#l#k");	
	//} else {
	//cm.sendOk("�������#r��Ϊȭ�ֵ�;��#k����#r��Ϊ��ǹ�ֵ�;��#k��������!");
	//cm.dispose();
	//}
		} else {
	cm.sendOk("���Ƚ��ܲ����#r��Ϊȭ�ֵ�;��#k��#r��Ϊ��ǹ�ֵ�;��#k����!.");
	cm.dispose();
	}
	} else if (status == 14) {
	var jobName;
	if (selection == 0) {
	    jobName = "ȭ��";
		MapId = "108000502";
	} else if (selection == 1) {
	    jobName = "ǹ��";
		MapId = "108000500";
	}
	cm.sendYesNo("�����Ҫ��Ϊһλ #r" + jobName + "#k?");
	} else if (status == 15) {
	map = cm.getPlayer().getMap();
	cm.warp(MapId);
	cm.getPlayer().startMapTimeLimitTask(1200, map);
	cm.sendOk("��ȥ�� #b����תְ�̹�#k . ����������.");
	cm.dispose();
    } else if (status == 21) {
	if (cm.isQuestFinished(2191) || cm.isQuestFinished(2192)){//�ж�����
	cm.sendSimple("����Ҫ��Ϊʲô? #b\r\n#L0#ȭ��#l\r\n#L1#ǹ��#l#k");
			} else {
	cm.sendOk("�������#r��Ϊȭ�ֵ�;��#k��#r��Ϊ��ǹ�ֵ�;��#k����!.");
	cm.dispose();
	}
    } else if (status == 22) {
	var jobName;
	if (selection == 0) {
	    jobName = "ȭ��";
	    job = 510;
	} else if (selection == 1) {
	    jobName = "ǹ��";
	    job = 520;
	}
	cm.sendYesNo("�����Ҫ��Ϊһλ#r" + jobName + "#k?");
    } else if (status == 23) {
	cm.changeJob(job);
    if(cm.haveItem(4031012) && cm.isQuestFinished(2191)) {
	cm.removeAll(4031857);
	cm.removeAll(4031856);
	cm.removeAll(4031012);
	cm.sendOk("תְ�ɹ� ! ");
	cm.dispose();
	} else if (cm.haveItem(4031012) && cm.isQuestFinished(2192)) {
	cm.removeAll(4031857);
	cm.removeAll(4031856);
	cm.removeAll(4031012);
	cm.sendOk("תְ�ɹ� ! ");
	cm.dispose();
	} else {
	cm.sendOk("������ʲô������? ");
	cm.dispose();
    }
}
}
