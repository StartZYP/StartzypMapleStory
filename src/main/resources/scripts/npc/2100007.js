/* Author: aaroncsn - MapleSea Like, Incomplete, Needs skin id
	NPC Name: 		Laila
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Skin Care Specialist
*/

var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("霍霍~欢迎光临。欢迎来到阿里安特皮肤护理。你走进了一家著名的护肤品店，连女王本人也经常光顾这里。如果你带了阿里安特护肤优惠券，我们会照顾好其余的。今天让你的皮肤工作怎么样?");
		} else if (status == 1) {
			cm.sendStyle("使用我们的专用机器，您可以在治疗后提前看到自己。你想做什么样的皮肤护理？选择你喜欢的风格...", skin);
		} else if (status == 2){
			cm.dispose();
			if (cm.haveItem(5153007) == true){
				cm.gainItem(5153007, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("享受新的皮肤!");
			} else {
				cm.sendNext("我想你没有带我们的护肤券。没有它，我不能给你治疗");
			}
		}
	}
}