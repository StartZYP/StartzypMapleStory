/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0) {
		cm.sendNext("是的…你害怕速度还是高度？你不能相信我的飞行技巧吗？相信我，我已经解决了所有的问题!");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if(status == 0){
		cm.sendNext("我不知道你怎么知道的，但你来对地方了！对于那些在尼哈尔沙漠徘徊并想家的人，我提供直飞维多利亚岛的航班，不停！别担心那艘会飞的船--它只掉了一两次！在那艘小船上长途飞行你不觉得幽闭恐怖吗?");
	} else if(status == 1){
		cm.sendYesNo("请记住两件事。第一，这条航线实际上是为海外运输服务的，所以国际扶轮不能保证你到底会在哪个城市降落。第二，因为我要把你安排在这趟特别航班上，所以会有点贵。服务费是1万金币，有一班飞机要起飞了。你对这趟直达航班感兴趣吗?");
	} else if(status == 2){
		cm.sendNext("好了，准备起飞~");
	} else if(status == 3){
		if(cm.getMeso() >= 10000){
			cm.gainMeso(-10000);
			cm.warp(towns[Math.floor(Math.random() * towns.length)]);
		} else{
			cm.sendNextPrev("嘿，你缺钱吗？我告诉过你你需要一万块.");
			cm.dispose();
			}
		}
	}
}