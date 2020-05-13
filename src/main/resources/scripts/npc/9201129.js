var map = 677000000;
var quest = 28198;
var questItem = 4032495;
var status = -1;

function start(mode, type, selection) {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if (cm.isQuestStarted(quest)) {
            if (cm.haveItem(questItem)) {
                cm.sendYesNo("你想搬到 #b#m" + map + "##k?");
            } else {
                cm.sendOk("入口被一种只有手持徽章的人才能举起的力量挡住。");
                cm.dispose();
            }
        } else {
            cm.sendOk("入口被一股奇怪的力量堵住了。");
            cm.dispose();
        }
    } else {
	cm.warp(map, 0);
	cm.dispose();
    }
}