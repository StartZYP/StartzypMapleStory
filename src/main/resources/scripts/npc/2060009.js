var status = 0;
var menu;
var payment = false;
var atHerbTown = false;

function start() {
    if(cm.getPlayer().getMap().getId() == 251000100) atHerbTown = true;
	
    if (cm.haveItem(4031242)){
		if(atHerbTown)
			menu = "#L0##b我想使用#t4031242##k移动到#b#m230030200##k.#l\r\n#L1#前往#b#m230000000##k需要支付#b10000金币#k.#l";
		else
			menu = "#L0##b我想使用#t4031242##k移动到#b#m230030200##k.#l\r\n#L1#前往#b#m251000000##k需要支付#b10000金币#k.#l";
    }else {
		if(atHerbTown)
			menu = "#L0#前往#b#m230030200##k需要支付#b1000金币#k.#l\r\n#L1#前往#b#m230000000##k需要支付#b10000金币#k.#l";
		else
			menu = "#L0#前往#b#m230030200##k需要支付#b1000金币#k.#l\r\n#L1#前往#b#m251000000##k需要支付#b10000金币#k.#l";
        payment = true;
    }
    cm.sendSimple ("海洋彼此相连。步行不到的地方就请联系我吧。你想使用#b海豚出租车#k吗?\r\n"+menu);
}

function action(mode, type, selection) {
    if (mode < 1) 
        cm.dispose();
    else {
        if (selection == 0) {
            if(payment) {
                if(cm.getPlayer().getMeso() < 1000) {
                    cm.sendOk("我想你没有足够的金币...");
                    cm.dispose();
                } else
                    cm.gainMeso(-1000);
            } else
                cm.gainItem(4031242,-1);
            cm.warp(230030200, 2);
            cm.dispose();
            return;
        } else if (selection == 1) {
			 if (cm.getPlayer().getMeso() < 10000) {
				cm.sendOk("I don't think you have enough money...");
				cm.dispose();
				return;
			}else{
				cm.gainMeso(-10000);
				cm.warp(atHerbTown ? 230000000 : 251000100);
			}
		}
        cm.dispose();
    }
}