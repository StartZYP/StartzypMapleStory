function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("����ȥ��߳���?");
        } else {
            cm.sendOk("ȥ��߳ǵĻ��Ѿ������ˣ������ĵȴ���һ��.");
            cm.dispose();
        }
    } else {
        cm.sendOk("��ȷ����ȥ����߳ǵ�Ʊ��?.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("������Ժ��ٸ��ҶԻ�!");
        cm.dispose();
	return;
    } 
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("ȥ��߳ǵĻ��Ѿ������ˣ������ĵȴ���һ��.");
        cm.dispose();
    }
}