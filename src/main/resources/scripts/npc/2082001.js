function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("����ǻ���?");
        } else {
            cm.sendOk("���໹û�е������Ե�Ƭ��.");
            cm.dispose();
        }
    } else {
        cm.sendOk("ȷ������һ�Ű±�˹�Ļ�Ʊ�������ı���.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı������˸���˵!");
        cm.dispose();
	return;
    }
    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(240000111);
        cm.gainItem(4031045, -1);
    } else {
        cm.sendOk("���໹û�е������Ե�Ƭ��.");
    }
    cm.dispose();
}