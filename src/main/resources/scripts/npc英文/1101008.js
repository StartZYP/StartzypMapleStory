function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(status == 0){
			cm.sendSimple("��ã���Ҫʲô����?\r\n#b#L0#���޽�#l#L1#�ֿ�ܼ�#l#L2#�ٽ�������#l\r\n#L3#װ������ת��#l#L4#��ʯ����#l\r\n#L5#����̵�#l#L6#����ֽ�#l#L7#����ϳ�#l\r\n#L8#ѧϰ����#l#L9#�����г�#l#L10#�������#l\r\n#L11#���ܾ�ͨ#l#L12#�������#l\r\n#L13#��Ӹ���50-255��ħ�����#l#L14#��Ӹ���140-255#l");
	    } else if(status == 1){
			if(selection == 0){
			cm.openNpc(2000);
		    } else if(selection == 1){
			cm.openNpc(1052017);
			} else if(selection == 2){
			cm.openNpc(9010001);
			} else if(selection == 3){
			cm.openNpc(9000041);
			} else if(selection == 4){
				cm.openNpc(9200000);

			} else if(selection == 5){
			cm.openShopNPC(1338);//HeavenMS ���̵���OpenshopNPC
            cm.dispose();
			} else if(selection == 6){
			cm.openNpc(9000009);
			} else if(selection == 7){
				cm.openNpc(9010003);

			} else if(selection == 8){
				cm.guideHint(8);
				cm.dispose();
			} else if(selection == 9){
				cm.warp(910000000);
				cm.dispose();
			} else if(selection == 10){
				cm.openNpc(9000017);
			} else if(selection == 11){//���ܾ�ͨSkill & Mastery Book announcer
				cm.openNpc(9209000);

			} else if(selection == 12){//�������
				cm.openNpc(9000036);

			} else if(selection == 13){
				cm.openNpc(1061014);				
			} else if(selection == 14){
				cm.openNpc(9220018);	
			} 
		}else if(status == 2){
				cm.sendNextPrev("There is no need for you to check this info now. These are basics that you'll pick up as you play. You can always ask me questions that come up after you've reached Lv. 10, so just relax.");
				cm.dispose();
			}
	}
}