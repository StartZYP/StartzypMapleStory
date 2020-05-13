/*  作者：   枫之谷
	NPC名字: 达利额
	地图(ID):维多利亚各大城镇
	描述:    荣誉之神官
*/

function start() {
    cm.sendSimple ("你想挑战哪种勋章:\r\n#b#L0#挑战勋章- 暗黑龙王杀手勋章(特级)\r\n#L1#挑战勋章-品克缤杀手勋章(特级)\r\n#L2#我要查看关于我的勋章信息\r\n#L3#关于勋章系统")
}

function action(mode, type, selection) {
    if (mode == 1) {
	if (selection == 0) {
		if (cm.getQuestStatus(9000040)==0) {
		if(cm.haveItem(1142007,1)){
            cm.sendOk("你已经有了一个#b暗黑龙王杀手勋章(特级)")
         }else if(cm.getBoss("暗黑龙王") > 4){
		 cm.startQuest(9000040);
         cm.sendOk("很好，你已经屠杀了#b5只#k闇黑龙王。\r\n请收下我送给你的勋章，这是你应得的。")
         cm.gainItem(1142007,1)
         }else {//开始黑龙积分
			cm.sendOk("你已经接受了#b挑战勋章- 暗黑龙王杀手勋章(特级)#k任务。\r\n请杀死5只#b暗黑龙王#k\r\n目前你成功杀死"+cm.getBoss("暗黑龙王")+"只#b暗黑龙王#k")
			} 
		}else {
		cm.sendOk("你已经完成了#b挑战勋章- 暗黑龙王杀手勋章(特级)#k任务")
		}
	} else if (selection == 1) {
	 		if (cm.getQuestStatus(9000041)==0) {
		if(cm.haveItem(1142008,1)){
            cm.sendOk("您已经有了一个#b品克缤杀手勋章(特级)")
         }else if(cm.getBoss("品克缤") > 4){
		 cm.startQuest(9000041);
         cm.sendOk("很好，你已经屠杀了#b5只#k品克缤。\r\n请收下我送给你的勋章，这是你应得的。")
         cm.gainItem(1142008,1)
         }else {//开始黑龙积分
			cm.sendOk("你已经接受了#b挑战勋章- 品克缤杀手勋章(特级)#k任务。\r\n请杀死5只#b品克缤#k\r\n目前你成功杀死"+cm.getBoss("品克缤")+"只#b品克缤#k")
			} 
		}else {
		cm.sendOk("你已经完成了#b挑战勋章- 品克缤杀手勋章(特级)#k任务")
		}
} else if (selection == 2) {
cm.sendOk("目前你总共屠杀了\r\n#b"+cm.getBoss("暗黑龙王")+"#k只暗黑龙王。\r\n#b"+cm.getBoss("品克缤")+"#k只品克缤。\r\n#b"+cm.getBoss("帕普拉图斯")+"#k只帕普拉图斯。\r\n#b"+cm.getBoss("残暴炎魔")+"#k只残暴炎魔。")
} else if (selection == 3) {
       //cm.resetBoss("品克缤",0,0,100) 
	cm.sendOk("岛民通过各种各样的#b组队任务数、屠杀BOSS数、人气度数、点装数、充值数、爱心数#k等来获取勋章。为了回馈夺取勋章的岛民，#b勋章具有一定的能力值#k 。欢迎岛民们来夺取勋章！做勋章达人！")
}
	}
cm.dispose();
}
