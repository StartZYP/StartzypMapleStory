

/* Author: Xterminator
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
	
    if (status == 0) {
	cm.sendNext("这是一个叫做#彩虹岛#K的小镇，位于枫岛的东北部。你知道枫树岛是初学者的出生地，对吧？很高兴这里只有弱小的怪物。");
    } else if (status == 1) {
	cm.sendNextPrev("如果你想变得更强，然后去#南港#K那里有一个港口。乘坐这艘巨大的船，前往一个叫#b金银岛#K的地方，它的大小与这个小岛相比是无与伦比的。");
    } else if (status == 2) {
	cm.sendPrev("在金银岛，你可以选择你的职业。它被称为#原始部落#K...什么？我听说有个光秃秃的，荒凉的城镇，那里住着战士。高地那会是什么样的地方?");
    } else if (status == 3) {
	cm.dispose();
    }
}