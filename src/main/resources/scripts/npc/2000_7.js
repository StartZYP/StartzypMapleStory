var status = -1;

function start() {
	action(1, 0, 0);
}

var sel1;
var skills = Array(4111002, 3121002, 2311003, 21121003);
var skillname = Array("影分身", "火眼晶晶", "祈祷", "战神的意志");
var 书籍碎片 = Array(3995001, 3995002, 3995003, 3995004, 3995005, 3995006, 3995007);

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
		var text = "需要做些什么呢?\r\n"
		text += "#L0#学习其他职业技能#l\r\n";
		text += "#L1#升级其他职业技能#l\r\n";
		cm.sendSimple(text);
	} else if(status == 1) {
		sel1 = selection;
		if(sel1 == 0) {
			var text = "你现在还可以学习这些技能:\r\n(需要5000万金币以及一套技能书碎片\r\n)"
			var job = cm.getJobId();
			var aaa = false;
			if(job == 211 || job == 221 || job == 111 || job == 121 || job == 131 || job == 112 || job == 122 || job == 132 || job == 511 || job == 521 || job == 512 || job == 522 || job == 212 || job == 222 || job == 421 || job == 422) {
				for(var i = 0; i < skills.length; i++) {
					if(cm.getPlayer().getSkillLevel(skills[i]) == 0) {
						aaa = true;
						text += "#L" + skills[i] + "#" + skillname[i] + "#l\r\n";
					}
				}
			} else if(job == 231 || job == 232) {
				for(var i = 0; i < skills.length; i++) {
					if(i != 2 && cm.getPlayer().getSkillLevel(skills[i]) == 0) {
						aaa = true;
						text += "#L" + skills[i] + "#" + skillname[i] + "#l\r\n";
					}
				}
			} else if(job == 311 || job == 321 || job == 312 || job == 322) {
				for(var i = 0; i < skills.length; i++) {
					if(i != 1 && cm.getPlayer().getSkillLevel(skills[i]) == 0) {
						aaa = true;
						text += "#L" + skills[i] + "#" + skillname[i] + "#l\r\n";
					}
				}
			} else if(job == 411 || job == 412) {
				for(var i = 1; i < skills.length; i++) {
					if(cm.getPlayer().getSkillLevel(skills[i]) == 0) {
						aaa = true;
						text += "#L" + skills[i] + "#" + skillname[i] + "#l\r\n";
					}
				}
			} else if(job == 2111 || job == 2112) {
				for(var i = 1; i < skills.length - 1; i++) {
					if(cm.getPlayer().getSkillLevel(skills[i]) == 0) {
						aaa = true;
						text += "#L" + skills[i] + "#" + skillname[i] + "#l\r\n";
					}
				}
			}
			if(aaa)
				cm.sendSimple(text);
			else {
				cm.sendOk("我没什么可以教你了");
				cm.dispose();
			}
		} else if(sel1 == 1) {
			var text = "这些技能现在可以升级:\r\n";
			var job = cm.getJobId();
			var bbb = false;
			if(cm.getPlayer().getSkillLevel(skills[0]) != 0 && job != 412 && job != 411 && cm.getPlayer().getSkillLevel(skills[0]) != 30) {
				bbb = true;
				text += "#L" + skills[0] + "#" + skillname[0] + "\t 当前" + cm.getPlayer().getSkillLevel(skills[0]) + "级\r\n";
			}
			if(job != 312 && job != 322 && cm.haveItem(2012011) && cm.getPlayer().getItemQuantity(2012011, false) < 30) {
				bbb = true;
				text += "#L" + skills[1] + "#" + skillname[1] + "\t 当前" + cm.getPlayer().getItemQuantity(2012011, false) + "级\r\n";
			}
			if(job != 231 && job != 232 && cm.haveItem(2012013) && cm.getPlayer().getItemQuantity(2012012, false) < 30) {
				bbb = true;
				text += "#L" + skills[2] + "#" + skillname[2] + "\t 当前" + cm.getPlayer().getItemQuantity(2012012, false) + "级\r\n";
			}
			if(job != 2112 && cm.haveItem(2012013) && cm.getPlayer().getItemQuantity(2012013, false) < 30) {
				bbb = true;
				text += "#L" + skills[3] + "#" + skillname[3] + "\t 当前" + cm.getPlayer().getItemQuantity(2012013, false) + "级\r\n";
			}
			if(bbb)
				cm.sendSimple(text);
			else {
			cm.sendOk("你没有技能可以升级");
			cm.dispose();
			}
		}
	} else if(status == 2) {
		if(sel1 == 0) {
			if(!cm.getPlayer().getMeso() >= 50000000) {
				cm.sendOk("金币不足,需要" + 50000000 + "金币");
				cm.dispose();
				return;
			}
			for(var i = 0; i < 书籍碎片.length; i++) {
				if(!cm.haveItem(书籍碎片[i])) {
					cm.sendOk("#z" + 书籍碎片[i] + "#数量不足,需要" + 1 + "套书籍碎片");
					cm.dispose();
					return;
				}
			}
			for(var i = 0; i < 书籍碎片.length; i++) {
				cm.gainItem(书籍碎片[i], -1);
			}
			cm.gainMeso(-50000000);
			switch(selection) {
				case skills[0]:
					cm.teachSkill(selection, 1, 30, -1);
					cm.gainItem(2012010);
					break;
				case skills[1]:
					cm.gainItem(2012011);
					break;
				case skills[2]:
					cm.gainItem(2012012);
					break;
				case skills[3]:
					cm.gainItem(2012013);
					break;
			}
		} else if(sel1 == 1) {
			var level;
			switch(selection) {
				case skills[0]:
					level = cm.getPlayer().getSkillLevel(selection) + 1;
					break;
				case skills[1]:
					level = cm.getPlayer().getItemQuantity(书籍碎片[1], false) + 1;
					break;
				case skills[2]:
					level = cm.getPlayer().getItemQuantity(书籍碎片[2], false) + 1;
					break;
				case skills[3]:
					level = cm.getPlayer().getItemQuantity(书籍碎片[3], false) + 1;
					break;
			}
			for(var i = 0; i < 书籍碎片.length; i++) {
				if(!cm.haveItem(书籍碎片[i], level)) {
					cm.sendOk("#z" + 书籍碎片[i] + "#数量不足,需要" + level + "套书籍碎片");
					cm.dispose();
					return;
				}
			}
			if(!cm.getPlayer().getMeso() >= (level * 20000000)) {
				cm.sendOk("金币不足,需要" + level * 20000000 + "金币");
				cm.dispose();
				return;
			}
			for(var i = 0; i < 书籍碎片.length; i++) {
				cm.gainItem(书籍碎片[i], -level);
			}
			cm.gainMeso(-level * 20000000);
			switch(selection) {
				case skills[0]:
					cm.teachSkill(selection, level, 30, -1);
					break;
				case skills[1]:
					cm.gainItem(2012011);
					break;
				case skills[2]:
					cm.gainItem(2012012);
					break;
				case skills[3]:
					cm.gainItem(2012013);
					break;
			}
		} else {
		
		}
		cm.dispose();
}
}