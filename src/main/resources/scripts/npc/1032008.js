function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("����ȥ���֮����?");
        else{
            cm.sendOk("ȥ���֮�ǵĺ����Ѿ������������ĵȴ���һ�κ��ࡣ");
            cm.dispose();
        }
    }else{
        cm.sendOk("ȷ������һ�ų������Ҵ������֮�Ǵ�Ʊ�������ı�����");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�ðɣ������ı��뷨����˵��");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("���κ����Ѿ���������ȴ���һ�κ��ࡣ");
        cm.dispose();
    }
}	