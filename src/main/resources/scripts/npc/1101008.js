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
			cm.sendSimple("你好，需要什么服务?\r\n#b#L0#打开罗杰#l#L1#仓库管家#l#L2#促进剂交换#l\r\n#L3#装备经验转移#l#L4#矿石交换#l\r\n#L5#快捷商店#l#L6#卷轴分解#l#L7#卷轴合成#l\r\n#L8#学习技能#l#L9#自由市场#l#L10#混沌卷轴#l\r\n#L11#技能精通#l#L12#配件工匠#l\r\n#L13#组队副本50-255巨魔蝙蝠怪#l#L14#组队副本140-255#l");
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
			cm.openShopNPC(1338);//HeavenMS 打开商店用OpenshopNPC
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
			} else if(selection == 11){//技能精通Skill & Mastery Book announcer
				cm.openNpc(9209000);

			} else if(selection == 12){//配件工匠
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