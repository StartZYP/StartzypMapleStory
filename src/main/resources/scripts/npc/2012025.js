function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("�ⲻ�Ƕ�;���У���������Ҫ����һЩ���飬�ҽ������ڵǻ�ǰ�������㻹����������?");
        } else {
            cm.sendOk("�������Ҫ�����ˡ��Բ�����ô���һ���ˡ�");
            cm.dispose();
        }
    } else {
        cm.sendOk("��ȷ����ı�������Ʊ.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı��������˵!");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000152);
        cm.gainItem(4031576, -1);
    } else {
        cm.sendOk("�������Ҫ�����ˡ��Բ�����ô���һ����.");
    }
    
    cm.dispose();
}