function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("��������ǰ��" + (cm.c.getPlayer().getMapId() == 103000100 ? "��Ҷ��" : "ά�����ǵ����ĳ���") + " #b��������#k, ��������������������� #b5000 ���#k. ��ȷ��Ҫ���� #b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("�����ڵ�������ǰ�뿪�𣿲����˿");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
	var item = 4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000);

        if(!cm.canHold(item)) {
            cm.sendNext("��ı���������");
	}
	else if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(item, 1);
            cm.sendNext("����ɹ�.");
        }else
            cm.sendNext("��û���㹻��Ǯ��");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}