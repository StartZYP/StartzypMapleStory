var status = -1;

function start() {
	action(1, 0, 0);
}

var sel1;

function action(mode, type, selection) {
	status++;
	if(mode != 1) {
		if(mode == 0 && type != 4) {
			status -= 2;
		} else {
			cm.dispose();
			return;
		}
	}
	if(status == 0) {
		var text = "�������ӻ��ֿ�,��Ҫ��Щʲô?\r\n"
		text += "#L0#�ͳ������뼼����#l\r\n";
		text += "#L1#��ž����뼼����#l\r\n";
		text += "#L2#�ͳ��������#l\r\n";
		text += "#L3#��Ŷ������#l\r\n";
		cm.sendSimple(text);
	} else if(status == 1) {
		sel1 = selection;
		if(sel1 == 0) {
			var scrolls = cm.getScrolls(1);
			if(scrolls.length == 0) {
				cm.sendOk("��û�д���κζ���");
				cm.dispose();
			} else {
				var text = "���ŵĶ�������������:\r\n";
				for(var i = 0; i < scrolls.length; i++) {
					text += "#L" + scrolls[i][0] + "##i" + scrolls[i][0] + "##z" + scrolls[i][0] + "#\t\t---------" + scrolls[i][1] + "��#l\r\n";
				}
				cm.sendSimple(text);
			}
		} else if(sel1 == 1) {
			var inv = cm.getInventory(2);
			var aaa = false;
			text = "\t\t\t  #e- ��ѡ��Ҫ��ŵĵ��� -#n\r\n\r\n#b";
			for(var i = 1; i <= inv.getSlotLimit(); i++) {
				var it = inv.getItem(i);
				if(it == null) {
					continue;
				}
				var itemid = it.getItemId();
				if((itemid >= 2040000 && itemid < 2050000) || (itemid >= 2280000 && itemid < 2300000)) {
					aaa = true;
					text += "#L" + itemid + "##v" + itemid + "##l";
				}
			}
			if(aaa) {
				cm.sendSimple(text);
			} else {
				cm.sendOk("��������û�п��Դ�ŵĵ���");
				cm.dispose();
			}
		} else if(sel1 == 2) {
			var items = cm.getPlayer().getScrolls(2);
			if(items.size() == 0) {
				cm.sendOK("�������Ϳ���");
				cm.dispose();
				return;
			}
			var text = "\tѡ��Ҫ�ͳ��ĵ���:\r\n";
			for(var i = 0; i < items.size(); i++) {
				text += "#L" + items.get(i).left + "##z" + items.get(i).left + "#(" + items.get(i).right + "��)\r\n";
			}
			cm.sendSimple(text);
		} else if(sel1 == 3) {
			var inv = cm.getInventory(4);
			for(var i = 1; i <= inv.getSlotLimit(); i++) {
				var it = inv.getItem(i);
				if(it == null) {
					continue;
				}
				var itemid = it.getItemId();
				if((itemid >= 4004000 && itemid <= 4005004) || (itemid >= 4010000 && itemid <= 4021009) || (itemid >= 4007000 && itemid < 4007007) || (itemid >= 4130000 && itemid <= 4131015)) {
					cm.saveItem(itemid, cm.getPlayer().getItemQuantity(itemid, false));
					cm.gainItem(itemid, -cm.getPlayer().getItemQuantity(itemid, false));
				}
			}
			cm.sendOk("���ж�����Ͼ��ѱ��浽������ֿ�");
			cm.dispose();
		}
	} else if(status == 2) {
		if(sel1 == 0) {
			if(cm.getPlayer().canHold(selection)) {
				var count = cm.�ͳ�����(selection);
				cm.gainItem(selection, count);
				status = 0;
				action(1, 0, sel1);
			} else {
				cm.sendOk("����������,����������");
				cm.dispose();
			}
		} else if(sel1 == 1) {
			cm.saveItem(selection, cm.getPlayer().getItemQuantity(selection, false));
			cm.gainItem(selection, -cm.getPlayer().getItemQuantity(selection, false));
			status = 0;
			action(1, 0, 1);
		} else if(sel1 == 2) {
			if(cm.getPlayer().canHold(selection)) {
				var count = cm.�ͳ�����(selection);
				cm.gainItem(selection, count);
				status = 0;
				action(1, 0, sel1);
			} else {
				cm.sendOk("����������,����������");
				cm.dispose();
			}
		}
	}
	//	if(status == 0) {
	//		cm.sendGetText("���ʲô���䣿");
	//	} else if(status == 1) {
	//		var text = cm.getText();
	//		items = cm.getPosible(text);
	//		if(items.length == 0) {
	//			cm.sendOk("��Ǹ,�Ҳ�֪������Ҫ��ѯʲô");
	//			cm.dispose();
	//			return;
	//		}
	//		text = "������Ҫ����:\r\n";
	//		for(var i = 0; i < items.length; i++) {
	//			text += "#L" + i + "##i" + items[i] + "##z" + items[i] + "##l\r\n";
	//		}
	//		cm.sendSimple(text);
	//	} else if(status == 2) {
	//		var text = "�����ǲ�ѯ��#r#z" + items[selection] + "##k�ĵ�������\r\n";
	//		droppers = cm.getDrops(items[selection]);
	//		if(droppers.length == 0) {
	//			cm.sendOk("��Ǹ,û���ҵ������Ʒ�ĵ�������,���ܳ齱���߻���Ի��");
	//			cm.dispose();
	//			return;
	//		}
	//		for(var i = 0; i < droppers.length; i += 2) {
	//			text += "#L" + i + "##o" + droppers[i] + "#=========" + droppers[i + 1] / 1000 + "��#l\r\n";
	//		}
	//		cm.sendSimple(text);
	//	} else if(status == 3) {
	//		var text = "�����ǲ�ѯ��#r#o" + droppers[selection] + "##k�ķֲ�\r\n";
	//		maps = cm.getMobInMap(droppers[selection]);
	//		if(maps.length == 0) {
	//			cm.sendOk("��Ǹ,�������ֻ�ڻʱ�Ż����");
	//			cm.dispose();
	//			return;
	//		}
	//		var i = 0;
	//		for(; i < maps.length; i += 2) {
	//			text += "#L" + i + "##m" + maps[i] + "#����" + maps[i + 1] + "ֻ#l\r\n";
	//		}
	//		text += "#L" + (i + 1) + "##r�һ��Լ��߹�ȥ��#k#l\r\n";
	//		cm.sendSimple(text);
	//	} else if(status == 4) {
	//		if(selection >= maps.length) {
	//			cm.sendOk("�ܸ����ܰﵽ��");
	//		} else {
	//			cm.warp(maps[selection]);
	//		}
	//		cm.dispose();
	//	}
}