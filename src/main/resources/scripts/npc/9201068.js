status = -1;
close = false;
oldSelection = -1;
var em;

function start() {
    em = cm.getEventManager("Subway");
    var text = "���Ǽ�Ʊ����";
	var hasTicket = false;
    if (cm.haveItem(4031713) && cm.getPlayer().getMapId() == 600010001){
        text += "\r\n#b#L0##t4031713#";
		hasTicket = true;
	}
	if(!hasTicket){
		cm.sendOk("�����û��Ʊ������Դӱ���������һ��.");
		cm.dispose();
	}else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("��һ���е���Ҫ�����԰ɣ�");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(selection == 0){
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("�������˳����㹻�Ŀռ䡣���Ʊ׼���ã��Һ������ȥ�����˳���ܳ��������ܺõص���Ŀ�ĵء���ô������������˳���");
            else{
                cm.sendNext("���ǽ��ڳ���ǰһ���ӿ�ʼ�ǻ��������ĵȴ������ӡ���ע�������׼ʱ�������������ǻ���1����ǰֹͣ��Ʊ�����������׼ʱ���");
                cm.dispose();
            }
        }
        oldSelection = selection;
    }else if(status == 1){
        if (oldSelection == 0 && cm.haveItem(4031713)) {
            if(em.getProperty("entry") == "true") {
                cm.gainItem(4031713, -1);
                cm.warp(600010002);
            }
            else {
                cm.sendNext("���ǽ��ڳ���ǰһ���ӿ�ʼ�ǻ��������ĵȴ������ӡ���ע�������׼ʱ�������������ǻ���1����ǰֹͣ��Ʊ�����������׼ʱ���");
            }
        } else {
            cm.sendNext("��Ǹ������Ҫ��Ʊ���ܽ��룡");
	}
        
        cm.dispose();
    }
}