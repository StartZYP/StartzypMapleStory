function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("����ȥ��߳���");
        else{
            cm.sendOk("ȥ��߳ǵĻ��Ѿ������ˣ������ĵȴ���һ�ࡣ");
            cm.dispose();
        }
    }else{
        cm.sendOk("ȷ������һ����߳ǻ�Ʊ�������ı���.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı�����͸���˵��");
        cm.dispose();
	return;
    } 
    
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(220000111);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else {
        cm.sendOk("ȥ��߳ǵĻ��Ѿ������ˣ������ĵȴ���һ�ࡣ");
        cm.dispose();
    }
}