var status = -1;
var exchangeItem = 4000439;

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
        cm.sendSimple("�ҵ������� #p2131001#, ������һ����������ħ��ʦ.#b\r\n#L0#�٣�������Щʯͷ�����������������ʩչħ��.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("��û���㹻�ġ�������������Ҫ 100.");
	    cm.dispose();
	} else {
            // thanks yuxaij for noticing a few methods having parameters not matching the expected Math library function parameter types
	    cm.sendGetNumber("�٣����Ǹ������⣡�ҿ��Ը��� #i4310000#����ÿ����Ҫ100�� #i" + exchangeItem + "##t" + exchangeItem + "# ������. ����Ҫ����? (�һ�: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("�������㹻�ı����ռ�.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("��л!");
	    }
	}
        cm.dispose();
    }
}