/*
 * С��Ϸ����
 * by Kodan
 */

var select;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {
		cm.dispose();
		return;
	} else if (mode == 1) {
		status++;
	} else {
		status--;
	}

	if (status == 0) {
		cm.sendSimple("�٣��������Դ����ˣ����ܿ����������ҵ������ô����ֻҪ�м��ֵ��ߣ��Ҿ͸����������С��Ϸ�ĵ��ߡ��š���������ʲô���أ�\r\n#b#L0#����С��Ϸ#l\r\n#b#L1#��С��Ϸ�Ĺ���#l");
	} else if (status == 1) {
		if (selection == 0) {
			cm.sendSimple("����Ҫ��������С��Ϸ��\r\n\r\n#b#L2#������#l#k\r\n#b#L3#�������#l#k");
		} else if (selection == 1) {
			cm.sendSimple("��Ҫ�˽�����С��Ϸ��\r\n\r\n#b#L4#������#l#k\r\n#b#L5#�������#l#k");
		}
	} else if (status == 2) {
		if (selection != null)
			select = selection;

		if (select == 2) {
			cm.sendSimple("��ô������Ҫ�������������أ�\r\n#b#L6##v4080000#��ˮ��/Ģ��������#l#k\r\n#b#L7##v4080001#��ˮ��/��������������#l#k\r\n#b#L8##v4080002#��ˮ��/����������#l#k\r\n#b#L9##v4080003#��������/Ģ��������#l#k\r\n#b#L10##v4080004#����/��������������#l#k\r\n#b#L11##v4080005#����/Ģ��������#l#k");
		} else if (select == 3) {
			if (!cm.haveItem(4030012, 15)) {
				cm.sendNext("���ﶼ�������������Ҫ�ĵĲ��ϡ�#b#v4080100#�������#k��Ҫ#b15#k��#t4030012##v4030012#��");
				cm.dispose();
				return;
			} else {
				cm.gainItem(4030012, -15);
				cm.gainItem(4080100 , 1);
				cm.dispose();
			}
		} else if (select == 4) {
			cm.sendOk("�����Ķ���������һ�����ӷ��������ϣ�ֱ�������ҵ�һ�ַ�����������5�����ӷ���һ�����ϣ�������ˮƽ�ģ��Խ��ߵģ����Ǵ�ֱ�ġ�");
			cm.dispose();
		} else if (select == 5) {
			cm.sendOk("����˼�壬�����������ڰ��������ϵ��������ҵ�һ��ƥ����ơ����ҵ�����ƥ���ʱ��ƥ���Խ����˽�Ӯ����Ϸ");
			cm.dispose();
		}
	} else if (status == 3) {
		if (selection == 6) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080000#��ˮ��/Ģ��������#k��Ҫ#b5#k��#b#v4030000#��ˮ����Ŀʯ#k��#b5#k��#b#v4030001#Ģ����Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080000, 1);
				cm.sendOk("#b�����#v4080000#��ˮ��/Ģ��������#k��");
			}
		} else if (selection == 7) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030010, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080001#��ˮ��/��������������#k��Ҫ#b5#k��#b#v4030000#��ˮ����Ŀʯ#k��#b5#k��#b#v4030010#����������Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030010, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080001, 1);
				cm.sendOk("#b�����#v4080001#��ˮ��/��������������#k��");
			}
		} else if (selection == 8) {
			if (!cm.haveItem(4030000, 5) || !cm.haveItem(4030011, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080002#��ˮ��/����������#k��Ҫ#b5#k��#b#v4030000#��ˮ����Ŀʯ#k��#b5#k��#b#v4030011#������Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030000, -5);
				cm.gainItem(4030011, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080002, 1);
				cm.sendOk("#b�����#v4080002#��ˮ��/����������#k��");
			}
		} else if (selection == 9) {
			if (!cm.haveItem(4030010, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080003#��������/Ģ��������#k��Ҫ#b5#k��#b#v4030010#����������Ŀʯ#k��#b5#k��#b#v4030001#Ģ����Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030010, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080003, 1);
				cm.sendOk("#b�����#v4080003#��������/Ģ��������#k��");
			}
		} else if (selection == 10) {
			if (!cm.haveItem(4030011, 5) || !cm.haveItem(4030010, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080004#����/��������������#k��Ҫ#b5#k��#b#v4030011#������Ŀʯ#k��#b5#k��#b#v4030010#����������Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030011, -5);
				cm.gainItem(4030010, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4030004, 1);
				cm.sendOk("#b�����#v4080004#����/��������������#k��");
			}
		} else if (selection == 11) {
			if (!cm.haveItem(4030011, 5) || !cm.haveItem(4030001, 5) || !cm.haveItem(4030009, 1)) {
				cm.sendNext("��׼���ò��ϡ�#b#v4080005#����/Ģ��������#k��Ҫ#b5#k��#b#v4030011#������Ŀʯ#k��#b5#k��#b#v4030001#Ģ����Ŀʯ#k��#b1#k��#b#v4030009#Χ����#k");
			} else {
				cm.gainItem(4030011, -5);
				cm.gainItem(4030001, -5);
				cm.gainItem(4030009, -1);
				cm.gainItem(4080005, 1);
				cm.sendOk("#b�����#v4080005#����/Ģ��������#k��");
			}
		}
		cm.dispose();
	}
}