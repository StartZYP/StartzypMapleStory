var status = -1;

function start() {
	action(1, 0, 0);
}

var mobs;
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
			cm.sendGetText("我这里可以通过怪物名模糊查找怪物信息，想查什么怪物？");
		} else if(status == 1) {
			var text = cm.getText();
			mobs = cm.getPosiblemob(text);
			if(mobs.length == 0) {
				cm.sendOk("抱歉,我不知道你想要查询什么");
				cm.dispose();
				return;
			}
			text = "我想你要找的是:\r\n";
			for(var i = 0; i < mobs.length; i++) {
				text += "#L" + i + "##o" + mobs[i] + "##z" + mobs[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 2) {
			var level = cm.getPlayer().getLevel();
			var requestMeso = 10*level*level;
			var text = "查询到#r#o" + mobs[selection] + "##k的分布如下，点击地图名将交费#b"+10*level*level+"#k金币进行快速移动。\r\n";
			maps = cm.getMobInMap(mobs[selection]);
			if(maps.length == 0) {
				cm.sendOk("抱歉,这个怪物只在活动时才会出现");
				cm.dispose();
				return;
			}

			for(var i = 0; i < maps.length; i += 2) {
				text += "#L" + i + "##m" + maps[i] + "#l\r\n";
			}
			text += "#L" + (i + 1) + "##r我会自己走过去的#k#l\r\n";
			cm.sendSimple(text);
		} else if(status == 3) {
			if(selection >= maps.length) {
				cm.sendOk("很高兴能帮到你");
			} else {
				
				if (cm.getMeso()>10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel()) {
				
				cm.warp(maps[selection]);
				cm.gainMeso(-10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel());
				cm.dispose();
				} else {
				cm.sendOk("你的金币不够，无法快速移动");
				cm.dispose();				
				}
				
			}
			//cm.dispose();
		}
}