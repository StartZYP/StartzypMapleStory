var status = -1;
var exchangeItem = 4000440;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("�������ǰ�档���Ҳ��ܼ���ǰ���ˡ��ұ�ԭʼҰ��ײ����...#b\r\n#L0#�٣�������ЩҰ��Ƥ������Դ���������ָ�����.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("��û���㹻�ġ�������������Ҫ100��.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("�٣������Ǹ�������! �ҿ��Ը��� #i4310000#������Ҫ���� 100�� #i" + exchangeItem + "##t" + exchangeItem + "#.��Ҫ������? (�һ�: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("�������㹻�Ŀռ�.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("��л!");
	    }
	}
        cm.dispose();
    }
}