var status = -1;
var exchangeItem = 4000438;

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
        cm.sendSimple("这些怪物是小菜一碟！用我的剑一枪我就杀了他们。。。最好先拿把剑。#b\r\n#L0#嘿，拿着这些树干。你可以用他们造一把更好的剑.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你没有足够的物品，我需要100个.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("嘿，这是个好主意! 我可以给你 #i4310000#但是你要给我100个 #i" + exchangeItem + "##t" + exchangeItem + "# . 你要交换码? (兑换: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("请留出足够的空间.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感谢!");
	    }
	}
        cm.dispose();
    }
}