/**
	Author: xQuasar
	NPC: Kyrin - Pirate Job Advancer
	Inside Test Room
**/

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            if (cm.getMapId() == 108000502) {
                if (!(cm.haveItem(4031856,15))) {
                    cm.sendSimple("�㻹û�����е�ˮ�������ҡ����ڴ���Ľ�������ƣ�\r\n#b#L1#�����뿪#l");
                } else {
                    status++;
                    cm.sendNext("�ۣ�����Ҵ�����15��#b#t4031856##k!ף���㡣���Ұ���Ū������");
                }
            } else if (cm.getMapId() == 108000501) {
                if (!(cm.haveItem(4031857,15))) {
                    cm.sendSimple("�㻹û�����е�ˮ�������ҡ����ڴ���Ľ�������ƣ�\r\n#b#L1#�����뿪#l");
                } else {
                    status++;
                    cm.sendNext("�ۣ�����Ҵ�����15��#b#t4031857##k!ף���㡣���Ұ���Ū������");
                }
            } else {
                cm.sendNext("�����뱨��������⡣");
                cm.dispose();
            }
        } else if (status == 1) {   // thanks Lame for noticing players getting stuck in area in certain scenarios
            cm.removeAll(4031856);
            cm.removeAll(4031857);
            cm.warp(120000101,0);
            cm.dispose();
        } else if (status == 2) {
            cm.warp(120000101,0);
            cm.dispose();
        }
    }
}
