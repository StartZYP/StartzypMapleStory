var map = 677000010;
var quest = 28283;
var status = -1;
var inHuntingGround;

function start(mode, type, selection) {
        inHuntingGround = (cm.getMapId() >= 677000010 && cm.getMapId() <= 677000012);
	action(1, 0, 0);        
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if(!inHuntingGround) {
            if (cm.isQuestStarted(quest)) {
                if(!cm.getPlayer().haveItemEquipped(1003036)) {
                    cm.sendOk("ǰ���·��һ�ɹ�ζ�������ڽ���֮ǰװ��#r�������#k.");
                    cm.dispose();
                    return;
                }

                cm.sendYesNo("����ᵽ #b#m" + map + "##k?");
            } else {
                cm.sendOk("��ڱ�һ����ֵ�������ס�ˡ�");
                cm.dispose();
            }
        } else {
            if(cm.getMapId() == 677000011) {
                map = 677000012;
                cm.sendYesNo("����ᵽ #b#m" + map + "##k?");
            } else {
                map = 105050400;
                cm.sendYesNo("���� #b�뿪����ط�#k ��?");
            }
        }
    } else {
        cm.warp(map, 0);
	cm.dispose();
    }
}