var status = -1;
var mobArrays = Array(Array(100101, 100124, 100133, 130100, 1210102, 210100),
	Array(1110100, 1120100, 1140100, 1210101, 1130100),
	Array(2100102, 2110301, 2130100, 2220100, 2230100, 2230102, 2230111),
	Array(3100101, 3110100, 3110102, 3210200, 3210207, 3230100, 3230101, 3230102, 3230305),
	Array(4230104, 4230113, 4230116, 4230125, 4230400, 4230503, 4230115),
	Array(5100000, 5100004, 5110300, 5120003, 5120503, 5130102, 5130103, 5130107, 5250002, 5300100),
	Array(6130103, 6130100, 6110300, 6130208, 6230100, 6230200, 6230601, 6230602),
	Array(7130000, 7130003, 7130002, 7130004, 7130101, 7130103, 7130601),
	Array(7140000, 7160000, 8140002, 8140102, 8140103, 8140101, 8140110, 8140111),
	Array(8140700, 8140701, 8142000, 8143000, 8150300, 8200002, 8200003),
	Array(8150101, 8150302, 8190001, 8150301, 8190000, 8150100, 8150200, 8150201, 8200004, 8200005, 8200006),
	Array(8190003, 8190004, 8190005, 8200007, 8200008),
	Array(8200009, 8200010, 8200011, 8200012)
);
var fee = 4001006;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {

	status++;
	if(mode != 1) {
		if(mode == 0 && type != 4)
			status -= 2;
		else {
			cm.dispose();
			return;
		}
	}
	if(status == 0) {
		var circleMobId = cm.getCircleMobId();
		if(circleMobId == 0) {
			var level = cm.getPlayer().getLevel();
			level = parseInt(level / 10);
			if(level > 12)
				level = 12;
			var randomCount = parseInt(Math.random() * 80 + 40);
			var randomIndex = parseInt(Math.random() * mobArrays[level].length);
			cm.beginCircle(mobArrays[level][randomIndex], randomCount);
			var tarMap = cm.searchMob(mobArrays[level][randomIndex]);
			var text = "��ʼɱ������,���ɱ#o" + mobArrays[level][randomIndex] + "#" + randomCount + "ֻ,Ȼ�����ұ���,���з��Ľ���!!\r\n";
			if(tarMap != 0) {
				text += "#L0#���͵�#r#m" + cm.searchMob(cm.getCircleMobId()) + "##k(��Ҫһ��#r#z" + fee + "##k)#l \r\n"
				text += "#L1#���Լ��߹�ȥ�ͺ�#l \r\n";
				text += "#L2#�Ҳ���������(��Ҫһ��#r#z" + fee + "##k)#l";
			}
			cm.sendSimple(text);
			//cm.sendOk("��ʼɱ������,���ɱ#o" + mobArrays[level][randomIndex] + "#" + randomCount + "ֻ,Ȼ�����ұ���,���з��Ľ���!!\r\n" + cm.searchMob(mobArrays[level][randomIndex]) + "�кܶ���������û");
			//cm.dispose();
		} else if(!cm.circleCompleted()) {
			var text = "��ǰ������Ҫ��ɱ#o" + cm.getCircleMobId() + "#" + cm.getCircleNeed() + "��,��ǰ�Ѿ���ɱ:" + cm.getCircleCount() + "\r\n";
			var tarMap = cm.searchMob(cm.getCircleMobId());
			if(tarMap != 0) {
				text += "#L0#���͵�#r#m" + cm.searchMob(cm.getCircleMobId()) + "##k(��Ҫһ��#r#z" + fee + "##k)#l \r\n"
				text += "#L1#���Լ��߹�ȥ�ͺ�#l \r\n";
				text += "#L2#�Ҳ���������(��Ҫһ��#r#z" + fee + "##k)#l";
			}
			cm.sendSimple(text);
		} else {
			cm.sendOk("�㼺������˱�������,���Ǹ���Ľ���");
			cm.circlePrize();
			cm.dispose();
		}
	} else if(status == 1) {
		if(selection == 0) {
			if(cm.haveItem(fee)) {
				cm.gainItem(fee, -1);
				cm.warp(cm.searchMob(cm.getCircleMobId()));
				cm.dispose();
			} else {
				cm.sendOk("��û��#i" + fee + "#");
				cm.dispose();
			}
		} else if(selection == 1) {
			cm.sendOk("�Ǿͼ��Ͱ�!");
			cm.dispose();
		} else {
			if(cm.haveItem(fee)) {
				cm.gainItem(fee, -1);
				cm.reStartCircle();
				cm.sendOk("�����Ѿ�����");
				cm.dispose();
			} else {
				cm.sendOk("��û��#i" + fee + "#�Ҳ��ܰ�����������");
				cm.dispose();
			}
		}
	}
}