/*
 * NPC : Francis (Doll master)
 * Map : 910510200
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1 || mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
    	status++;
    } else {
    	status--;
    }
    if (status == 0) {
    	cm.sendNext("我是弗朗西斯，黑色之翼的木偶师。你怎么敢打扰我的木偶。。。这真让我不安，但这次我会让它溜走的。如果我发现你再这么做，我以黑魔法师的名义发誓，我会让你付出代价的。", 9);
    } else if (status == 1) {
    	cm.sendNextPrev("#b(黑色之翼？呵呵？他们是谁？这一切和黑魔法师有什么关系？嗯，也许你应该把这些信息报告给特鲁。)#k", 3);
    } else if (status == 2) {
        cm.completeQuest(21719);
        cm.warp(105040200, 10);//104000004 
        cm.dispose();
    }
}