function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�����ϴ���?");
        } else {
            cm.sendOk("���໹û�������һ�����");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ������һ����ľ��Ļ�Ʊ��������ı���.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı�����͸���˵��");
        cm.dispose();
	return;
    }

    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("���໹û�������һ�����");
    }
    cm.dispose();
}