/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("如果你改变主意，请告诉我。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b前往圣地(1000金币)#k";
                        }			
                        cm.sendSimple("这艘船将驶向圣地，在那里你会发现深红色的树叶沐浴在阳光中，微风掠过小溪，还有希纳斯女皇。如果你有兴趣加入骑士团，那么你一定要来参观一下。你有兴趣参观圣地吗？，旅行将花费你#b1000#k金币\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("嗯...你确定你有#b1000#k金币吗?");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090030);
				cm.dispose();
				}
			}
		}
}