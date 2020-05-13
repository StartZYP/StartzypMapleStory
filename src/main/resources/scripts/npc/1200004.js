/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Rien");
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
			cm.sendNext("好吧。如果你改变主意了，请告诉我。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b前往里恩(800 金币)#k";
                        }
                        cm.sendSimple("你想离开金银岛，去我们的小镇吗？如果你登上这艘船，我可以带你从#明珠港#K到#里恩#K然后回来。但你必须付#b800金币#k,你想去里恩吗？到那里大约需要一分钟.\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("你确定你有800金币吗？请确保你有足够的金币。…");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800); 
                                cm.warp(200090060);
                                cm.dispose();
                        }
                }
        }
}