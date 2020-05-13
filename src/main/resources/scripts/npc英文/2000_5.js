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
		var text = "这里是杂货仓库,需要做些什么?\r\n"
		text += "#L0#掏出卷轴与技能书#l\r\n";
		text += "#L1#存放卷轴与技能书#l\r\n";
		text += "#L2#掏出锻造材料#l\r\n";
		text += "#L3#存放锻造材料#l\r\n";
		cm.sendSimple(text);
	} else if(status == 1) {
		sel1 = selection;
		if(sel1 == 0) {
			var scrolls = cm.getScrolls(1);
			if(scrolls.length == 0) {
				cm.sendOk("你没有存放任何东西");
				cm.dispose();
			} else {
				var text = "你存放的东西都在这里了:\r\n";
				for(var i = 0; i < scrolls.length; i++) {
					text += "#L" + scrolls[i][0] + "##i" + scrolls[i][0] + "##z" + scrolls[i][0] + "#\t\t---------" + scrolls[i][1] + "本#l\r\n";
				}
				cm.sendSimple(text);
			}
		} else if(sel1 == 1) {
			var inv = cm.getInventory(2);
			var aaa = false;
			text = "\t\t\t  #e- 请选择要存放的道具 -#n\r\n\r\n#b";
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
				cm.sendOk("消耗栏里没有可以存放的道具");
				cm.dispose();
			}
		} else if(sel1 == 2) {
			var items = cm.getPlayer().getScrolls(2);
			if(items.size() == 0) {
				cm.sendOK("道具已掏空了");
				cm.dispose();
				return;
			}
			var text = "\t选择要掏出的道具:\r\n";
			for(var i = 0; i < items.size(); i++) {
				text += "#L" + items.get(i).left + "##z" + items.get(i).left + "#(" + items.get(i).right + "个)\r\n";
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
			cm.sendOk("所有锻造材料均已保存到了杂物仓库");
			cm.dispose();
		}
	} else if(status == 2) {
		if(sel1 == 0) {
			if(cm.getPlayer().canHold(selection)) {
				var count = cm.掏出卷轴(selection);
				cm.gainItem(selection, count);
				status = 0;
				action(1, 0, sel1);
			} else {
				cm.sendOk("消耗栏满了,清理背包再来");
				cm.dispose();
			}
		} else if(sel1 == 1) {
			cm.saveItem(selection, cm.getPlayer().getItemQuantity(selection, false));
			cm.gainItem(selection, -cm.getPlayer().getItemQuantity(selection, false));
			status = 0;
			action(1, 0, 1);
		} else if(sel1 == 2) {
			if(cm.getPlayer().canHold(selection)) {
				var count = cm.掏出卷轴(selection);
				cm.gainItem(selection, count);
				status = 0;
				action(1, 0, sel1);
			} else {
				cm.sendOk("其他栏满了,清理背包再来");
				cm.dispose();
			}
		}
	}
	//	if(status == 0) {
	//		cm.sendGetText("想查什么掉落？");
	//	} else if(status == 1) {
	//		var text = cm.getText();
	//		items = cm.getPosible(text);
	//		if(items.length == 0) {
	//			cm.sendOk("抱歉,我不知道你想要查询什么");
	//			cm.dispose();
	//			return;
	//		}
	//		text = "我想你要的是:\r\n";
	//		for(var i = 0; i < items.length; i++) {
	//			text += "#L" + i + "##i" + items[i] + "##z" + items[i] + "##l\r\n";
	//		}
	//		cm.sendSimple(text);
	//	} else if(status == 2) {
	//		var text = "以下是查询到#r#z" + items[selection] + "##k的掉落数据\r\n";
	//		droppers = cm.getDrops(items[selection]);
	//		if(droppers.length == 0) {
	//			cm.sendOk("抱歉,没有找到这个物品的掉落数据,可能抽奖或者活动可以获得");
	//			cm.dispose();
	//			return;
	//		}
	//		for(var i = 0; i < droppers.length; i += 2) {
	//			text += "#L" + i + "##o" + droppers[i] + "#=========" + droppers[i + 1] / 1000 + "‰#l\r\n";
	//		}
	//		cm.sendSimple(text);
	//	} else if(status == 3) {
	//		var text = "以下是查询到#r#o" + droppers[selection] + "##k的分布\r\n";
	//		maps = cm.getMobInMap(droppers[selection]);
	//		if(maps.length == 0) {
	//			cm.sendOk("抱歉,这个怪物只在活动时才会出现");
	//			cm.dispose();
	//			return;
	//		}
	//		var i = 0;
	//		for(; i < maps.length; i += 2) {
	//			text += "#L" + i + "##m" + maps[i] + "#里有" + maps[i + 1] + "只#l\r\n";
	//		}
	//		text += "#L" + (i + 1) + "##r我会自己走过去的#k#l\r\n";
	//		cm.sendSimple(text);
	//	} else if(status == 4) {
	//		if(selection >= maps.length) {
	//			cm.sendOk("很高兴能帮到你");
	//		} else {
	//			cm.warp(maps[selection]);
	//		}
	//		cm.dispose();
	//	}
}