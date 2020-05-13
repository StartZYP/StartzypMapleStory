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
			cm.sendGetText("���������ͨ��������ģ�����ҹ�����Ϣ�����ʲô���");
		} else if(status == 1) {
			var text = cm.getText();
			mobs = cm.getPosiblemob(text);
			if(mobs.length == 0) {
				cm.sendOk("��Ǹ,�Ҳ�֪������Ҫ��ѯʲô");
				cm.dispose();
				return;
			}
			text = "������Ҫ�ҵ���:\r\n";
			for(var i = 0; i < mobs.length; i++) {
				text += "#L" + i + "##o" + mobs[i] + "##z" + mobs[i] + "##l\r\n";
			}
			cm.sendSimple(text);
		} else if(status == 2) {
			var level = cm.getPlayer().getLevel();
			var requestMeso = 10*level*level;
			var text = "��ѯ��#r#o" + mobs[selection] + "##k�ķֲ����£������ͼ��������#b"+10*level*level+"#k��ҽ��п����ƶ���\r\n";
			maps = cm.getMobInMap(mobs[selection]);
			if(maps.length == 0) {
				cm.sendOk("��Ǹ,�������ֻ�ڻʱ�Ż����");
				cm.dispose();
				return;
			}

			for(var i = 0; i < maps.length; i += 2) {
				text += "#L" + i + "##m" + maps[i] + "#l\r\n";
			}
			text += "#L" + (i + 1) + "##r�һ��Լ��߹�ȥ��#k#l\r\n";
			cm.sendSimple(text);
		} else if(status == 3) {
			if(selection >= maps.length) {
				cm.sendOk("�ܸ����ܰﵽ��");
			} else {
				
				if (cm.getMeso()>10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel()) {
				
				cm.warp(maps[selection]);
				cm.gainMeso(-10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel());
				cm.dispose();
				} else {
				cm.sendOk("��Ľ�Ҳ������޷������ƶ�");
				cm.dispose();				
				}
				
			}
			//cm.dispose();
		}
}