var status = -1;
var level = 1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.warp(251010404,0);
	cm.dispose();
	return;
    }
    
    if(status == 1) {   // leaders cant withdraw
        cm.warp(251010404,0);
        return;
    }
    
    if (!cm.isEventLeader()) {
	cm.sendYesNo("��ϣ����Ķӳ��ܺ���̸̸�����ߣ��������Ҫ�˳��������������������?");
    }
    else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404,0);
            cm.sendNext("�㲻��û�о�������ͽ�������!");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch(cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("��������Ҫ���뺣�����ˣ�Ҫ��ȥ�����Ǳ������������������Ĺ���.");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp.equals("0")) {
                    if (cm.haveItem(4001120,20)) {
                        cm.sendNext("��ô,���ڸ�����20��#i4001120#.");
                        cm.gainItem(4001120,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("��������Ҫ���뺣�����ˣ���Ҫ������ߣ����Ǳ������㹻�ĺ�����ȥ��ȡ 20 ��#i4001120#.");
                    }
                } else if (emp.equals("1")) {
                    if (cm.haveItem(4001121,20)) {
                        cm.sendNext("��ô,���ڸ�����20��#i4001121#");
                        cm.gainItem(4001121,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("��������Ҫ���뺣�����ˣ���Ҫ������ߣ����Ǳ������㹻�ĺ�����ȥ��ȡ 20 ��#i4001121#.");
                    }
                } else if (emp.equals("2")) {
                    if (cm.haveItem(4001122,20)) {
                        cm.sendNext("���! ��ô���Ǽ���ǰ��.");
                        cm.gainItem(4001122,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("��������Ҫ���뺣�����ˣ���Ҫ������ߣ����Ǳ������㹻�ĺ�����ȥ��ȡ 20 ��#i4001122#..");
                    }
                } else {
                    cm.sendNext("��һ�׶��Ѿ���ʼ.����!");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("Ҫ���������������Ǳ����ȴݻ�����.");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("�������ı��س����ˣ������������һ��Կ�ף��������������Աߣ�¶�����ı��ء��ǿ϶��������ķ����ҵ�.");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("���Ǳ���������.");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("�������ı��س����ˣ������������һ��Կ�ף��������������Աߣ�¶�����ı��ء��ǿ϶��������ķ����ҵ�.");
                    if (eim.getProperty("stage3a").equals("0")) {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("���Ǳ���������.");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("��Щ�Ǵ����Ϳ�³˹������׷���ں�������������Ҫ�������.");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("��Щ�Ǵ��Ķ�����Դ�����Ǳ��������ϵľɽ���Կ�װ���������!");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("лл��������ǵ����䣡");
                } else {
                    cm.sendNext("������еĹ����ʹ�Ǻ�����ū��!");
                }
                cm.dispose();
                break;
        }
    }
    
    
}