var status = -1;
var sel;

var destinations = new Array("魔法密林", "玩具城", "神木村", "武陵", "阿里安特", "圣地");
var boatType = new Array("飞船", "飞行火车", "巨行飞鸟", "天鹤", "阿拉丁神灯", "飞船");

function start() {
	var message = "天空之城来往航班纵横交错，请选择一个可以带你到目的地的站台。请放心，即使你选择错了，还可以回来跟我说，我将带你到正确的站台等待航班。请在下面选择你要去的站台。\r\n";
	for(var i = 0; i < destinations.length; i++){
		message += "\r\n#L" + i + "##b乘坐" + boatType[i] + "前往" + destinations[i] + ".#l";
	}
	cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0){
        sel = selection;
        cm.sendNext("好 #h #,我送你去#b#m" + (200000110 + (sel * 10)) + "##k.");
    }else if (status == 1) {
        cm.warp(200000110 + (sel * 10), "west00");
        cm.dispose();
    }
}