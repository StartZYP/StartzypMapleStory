var status = -1;
var exchangeItem = 4000437;

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
        cm.sendSimple("这么多的伤，这么少的药……#b\r\n#L0#嘿，拿着这些黑孢子。你可以用它们做更好的药.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你没有足够的。。。我至少需要 100个.");
	    cm.dispose();
	} else {
	    cm.sendGetNumber("嘿，这是个好主意！我可以给你 #i4310000#但是需要100个#i" + exchangeItem + "##t" + exchangeItem + "# 你给我。你想要多少？ (Current Items: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("请空出足够的背包空间.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("感谢!");
	    }
	}
        cm.dispose();
    }
}