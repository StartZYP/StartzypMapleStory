/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Mark the Toy Soldier - Doll's House(922000010)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var havePendulum = false;
var complete = false;
var inQuest = false;

function start() {
    if(cm.getQuestStatus(3230) == 1) {
	inQuest = true;
    } else {
	inQuest = false;
    }
    dh = cm.getEventManager("DollHouse");
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == 0 && status == 0) {
	cm.dispose();
	return;
    } else if(mode == 0 && status == 1) {
	cm.sendNext("�Ҿ�֪�������������������Ѿ���ʼ�������Ǻ���Ҫ�ģ����ڣ���ȥѰ�Ҳ�ͬ������ݣ���������������#b#t4031094##k����!");
	cm.dispose();
	return;
    }
    if(mode == 1) {
	status++;
    } else {
	status--;
    }
    if(inQuest == true) {
	if(status == 0) {
	    if(cm.haveItem(4031094)) {
		cm.sendNext("Ŷ���ۣ���ȷʵ�ҵ��˿�������ͬ�������#b#t4031094##k!̫����˼���ˣ������������·���������ٴ����У�лл��Ĺ��������Ƕ���Ŭ����һ�㽱��������֮ǰ��ͨ�����������ı������������Ƿ�������");
		havePendulum = true;
	    } else {
		cm.sendSimple("��ã�����#b#p2040028##k,���𱣻�������䡣�����棬��ῴ��һ������ݣ�����ܻᷢ������һ���������е㲻ͬ����������ݡ���Ĺ������ҵ��������������ţ��ҵ�#b#t4031094##k,����·���������ɷָ��һ���֡������ʱ�����Ƶģ����������˴��������ݣ���ᱻ�Ȼص����棬������С�ġ�\r\n#L0##b�����뿪���#k#l");
	    }
	} else if(status == 1) {
	    if(havePendulum == true) {
		if(!cm.canHold(2000010)) {
		    cm.sendNext("���ò�ס�������������");
		}
		cm.sendNextPrev("����ô��Ϊ������Ҫ�Ҹ���#b100��#t2000010#s#k��?�ǳ���л��������ǡ��������Ӣ��Ŭ������¥���ٴ����У���������һ��ά�ȵĹ����ƺ�Ҳ��ʧ�ˡ������ھͷ����ȥ����ͷ����");
		if(complete == false) {
		    cm.completeQuest(3230);
		    cm.gainExp(2400);
		    cm.gainItem(4031094, -1);
		    cm.gainItem(2000010, 100);
		    complete = true;
		}
	    } else {
		cm.sendYesNo("��ȷ������Ҫ�������Ǻðɡ����������ס���´���ι�����ط�ʱ������ݻỻ���ط������������ϸ�ؿ�һ��ÿ������ݡ�����ô��Ϊ���㻹���뿪����ط���");
	    }
	} else if(status == 2) {
	    if( cm.getPlayer().getEventInstance() != null)
	        cm.getPlayer().getEventInstance().removePlayer(cm.getChar());
	    cm.dispose();
	}
    } else {
	if(status == 0) {
	    cm.sendNext("ʲô����������һֱ��ֹ���ǽ���������䣬��Ϊ��һ��ά�ȵĹ�������������Ҳ�֪��������ô�����ģ����ҵ����������뿪����Ϊ������������Σ�ա�");
	} else if(status == 1) {
	    cm.warp(221024400, 4);
	    cm.dispose();
	}
    }
}
