var status = 0;
var menu;
var payment = false;
var atHerbTown = false;

function start() {
    if(cm.getPlayer().getMap().getId() == 251000100) atHerbTown = true;
	
    if (cm.haveItem(4031242)){
		if(atHerbTown)
			menu = "#L0##b����ʹ��#t4031242##k�ƶ���#b#m230030200##k.#l\r\n#L1#ǰ��#b#m230000000##k��Ҫ֧��#b10000���#k.#l";
		else
			menu = "#L0##b����ʹ��#t4031242##k�ƶ���#b#m230030200##k.#l\r\n#L1#ǰ��#b#m251000000##k��Ҫ֧��#b10000���#k.#l";
    }else {
		if(atHerbTown)
			menu = "#L0#ǰ��#b#m230030200##k��Ҫ֧��#b1000���#k.#l\r\n#L1#ǰ��#b#m230000000##k��Ҫ֧��#b10000���#k.#l";
		else
			menu = "#L0#ǰ��#b#m230030200##k��Ҫ֧��#b1000���#k.#l\r\n#L1#ǰ��#b#m251000000##k��Ҫ֧��#b10000���#k.#l";
        payment = true;
    }
    cm.sendSimple ("����˴����������в����ĵط�������ϵ�Ұɡ�����ʹ��#b������⳵#k��?\r\n"+menu);
}

function action(mode, type, selection) {
    if (mode < 1) 
        cm.dispose();
    else {
        if (selection == 0) {
            if(payment) {
                if(cm.getPlayer().getMeso() < 1000) {
                    cm.sendOk("������û���㹻�Ľ��...");
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