var status = -1;

function start() {
	action(1, 0, 0);
}

var items;
var droppers;
var maps;

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
		var mobs = cm.getPlayer().getMap().getMobs();
		if(mobs.length == 0) {
			cm.sendOk("这个地图没有怪物");
			cm.dispose();
		} else {
			var text = "当前地图有以下怪物:\r\n";
			for(var i = 0; i < mobs.length; i++) {
				text += "#L" + mobs[i] + "##o" + mobs[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		}
	} else if(status == 1) {
		var drops = cm.getDropFromMob(selection);
		var text = "";
		if(drops.length == 0) {
			text = "抱歉,没查询到这个怪物的掉落数据";
		} else {
			text = "#o" + selection + "#掉落如下:\r\n";
			for(var i = 0; i < drops.length; i++) {
				var chance = drops[i][1] / 1000000 * 1000;
				if(chance < 1000) {
					text += "#z" + drops[i][0] +"##i" + drops[i][0] + "#\t\t" + chance.toFixed(3) + "‰\r\n";
				}else{
					text += "#i" + drops[i][0] + "#\t\t必掉\r\n";
				}
			}
		}
		cm.sendOk(text);
		cm.dispose();
	}

	/*
		if(status == 0) {
			cm.sendGetText("想查什么掉落？");
		} else if(status == 1) {
			var text = cm.getText();
			items = cm.getPosible(text);
			if(items.length == 0) {
				cm.sendOk("抱歉,我不知道你想要查询什么");
				cm.dispose();
				return;
			}
			text = "我想你要的是:\r\n";
			for(var i = 0; i < items.length; i++) {
				text += "#L" + i + "##i" + items[i] + "##z" + items[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 2) {
			var text = "以下是查询到#r#z" + items[selection] + "##k的掉落数据\r\n";
			droppers = cm.getDrops(items[selection]);
			if(droppers.length == 0) {
				cm.sendOk("抱歉,没有找到这个物品的掉落数据,可能抽奖或者活动可以获得");
				cm.dispose();
				return;
			}
			for(var i = 0; i < droppers.length; i += 2) {
				text += "#L" + i + "##o" + droppers[i] + "#=========" + droppers[i + 1] / 1000 + "‰#l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 3) {
			var text = "以下是查询到#r#o" + droppers[selection] + "##k的分布\r\n";
			maps = cm.getMobInMap(droppers[selection]);
			if(maps.length == 0) {
				cm.sendOk("抱歉,这个怪物只在活动时才会出现");
				cm.dispose();
				return;
			}
			var i = 0;
			for(; i < maps.length; i += 2) {
				text += "#L" + i + "##m" + maps[i] + "#里有" + maps[i + 1] + "只#l\r\n";
			}
			text += "#L" + (i + 1) + "##r我会自己走过去的#k#l\r\n";
			cm.sendSimple(text);
		} else if(status == 4) {
			if(selection >= maps.length) {
				cm.sendOk("很高兴能帮到你");
			} else {
				cm.warp(maps[selection]);
			}
			cm.dispose();
		}
		*/
}