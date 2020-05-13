/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("维多利亚岛");
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
                                display += "\r\n#L"+i+"##b金银岛(1000金币)#k";
                        }			
                        cm.sendSimple("呃，你好…又来了。你想离开圣地去别的地方吗？如果是的话，你来对地方了。我在#b圣地#k经营一艘渡轮前往#b金银岛#k,我能把你带到#b金银岛#k。如果你想去，你需要支付#b1000#k金币。\r\n"+display);
		} else if(status == 1) {
                        if(cm.getMeso() < 1000) {
				cm.sendNext("嗯... 你确定你又#b1000#k金币吗?请确认你是否有足够的金币，不然无法让你乘船。");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090031);
				cm.dispose();
                        }
                }
	}
}