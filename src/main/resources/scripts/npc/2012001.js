function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("����ȥħ��������?");
        else{
            cm.sendOk("ȥħ�����ֵĴ��Ѿ������ˣ������ĵȴ���һ��.");
            cm.dispose();
        }
    }else{
        cm.sendOk("ȷ������һ��ħ�����ֵĴ�Ʊ��������ı���.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("������Ժ��ٸ��ҶԻ�!");
	cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000112);
        cm.gainItem(4031047, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("ȥħ�����ֵĴ��Ѿ������ˣ������ĵȴ���һ��.");
        cm.dispose();
    }
}