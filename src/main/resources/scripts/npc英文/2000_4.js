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
			cm.sendOk("�����ͼû�й���");
			cm.dispose();
		} else {
			var text = "��ǰ��ͼ�����¹���:\r\n";
			for(var i = 0; i < mobs.length; i++) {
				text += "#L" + mobs[i] + "##o" + mobs[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		}
	} else if(status == 1) {
		var drops = cm.getDropFromMob(selection);
		var text = "";
		if(drops.length == 0) {
			text = "��Ǹ,û��ѯ���������ĵ�������";
		} else {
			text = "#o" + selection + "#��������:\r\n";
			for(var i = 0; i < drops.length; i++) {
				var chance = drops[i][1] / 1000000 * 1000;
				if(chance < 1000) {
					text += "#z" + drops[i][0] +"##i" + drops[i][0] + "#\t\t" + chance.toFixed(3) + "��\r\n";
				}else{
					text += "#i" + drops[i][0] + "#\t\t�ص�\r\n";
				}
			}
		}
		cm.sendOk(text);
		cm.dispose();
	}

	/*
		if(status == 0) {
			cm.sendGetText("���ʲô���䣿");
		} else if(status == 1) {
			var text = cm.getText();
			items = cm.getPosible(text);
			if(items.length == 0) {
				cm.sendOk("��Ǹ,�Ҳ�֪������Ҫ��ѯʲô");
				cm.dispose();
				return;
			}
			text = "������Ҫ����:\r\n";
			for(var i = 0; i < items.length; i++) {
				text += "#L" + i + "##i" + items[i] + "##z" + items[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 2) {
			var text = "�����ǲ�ѯ��#r#z" + items[selection] + "##k�ĵ�������\r\n";
			droppers = cm.getDrops(items[selection]);
			if(droppers.length == 0) {
				cm.sendOk("��Ǹ,û���ҵ������Ʒ�ĵ�������,���ܳ齱���߻���Ի��");
				cm.dispose();
				return;
			}
			for(var i = 0; i < droppers.length; i += 2) {
				text += "#L" + i + "##o" + droppers[i] + "#=========" + droppers[i + 1] / 1000 + "��#l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 3) {
			var text = "�����ǲ�ѯ��#r#o" + droppers[selection] + "##k�ķֲ�\r\n";
			maps = cm.getMobInMap(droppers[selection]);
			if(maps.length == 0) {
				cm.sendOk("��Ǹ,�������ֻ�ڻʱ�Ż����");
				cm.dispose();
				return;
			}
			var i = 0;
			for(; i < maps.length; i += 2) {
				text += "#L" + i + "##m" + maps[i] + "#����" + maps[i + 1] + "ֻ#l\r\n";
			}
			text += "#L" + (i + 1) + "##r�һ��Լ��߹�ȥ��#k#l\r\n";
			cm.sendSimple(text);
		} else if(status == 4) {
			if(selection >= maps.length) {
				cm.sendOk("�ܸ����ܰﵽ��");
			} else {
				cm.warp(maps[selection]);
			}
			cm.dispose();
		}
		*/
}