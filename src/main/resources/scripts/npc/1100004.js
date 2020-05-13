/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("如果你改变主意，请告诉我。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            var display = "";
            for (var i = 0; i < menu.length; i++) {
                display += "\r\n#L" + i + "##b天空之城(1000金币)#k";
            }
            cm.sendSimple("嗯... 风是有利的。你想离开圣地去别的地方吗？这艘渡轮开往神秘岛的天空之城，你在圣地有没有照顾好你需要的一切？如果你碰巧想去#b天空之城#k我可以带你去那里。你要去天空之城吗？\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("嗯... 你确定你又#b1000#k金币吗?请确认你是否有足够的金币，不然无法让你乘船。");
                cm.dispose();
            } else {
                cm.gainMeso(-1000);
                cm.warp(200090021);
                cm.dispose();
            }
        }
    }
}