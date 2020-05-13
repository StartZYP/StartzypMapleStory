status = -1;
close = false;
oldSelection = -1;
var em;

function start() {
    em = cm.getEventManager("Subway");
    var text = "这是检票机。";
	var hasTicket = false;
    if (cm.haveItem(4031713) && cm.getPlayer().getMapId() == 600010001){
        text += "\r\n#b#L0##t4031713#";
		hasTicket = true;
	}
	if(!hasTicket){
		cm.sendOk("你好像没有票！你可以从贝尔那里买一个.");
		cm.dispose();
	}else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("你一定有点事要处理，对吧？");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(selection == 0){
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("看来这趟车有足够的空间。请把票准备好，我好让你进去。这趟车会很长，但你会很好地到达目的地。怎么样？你想搭这趟车吗？");
            else{
                cm.sendNext("我们将在出发前一分钟开始登机。请耐心等待几分钟。请注意地铁会准时出发，而且我们会在1分钟前停止收票，所以请务必准时到达。");
                cm.dispose();
            }
        }
        oldSelection = selection;
    }else if(status == 1){
        if (oldSelection == 0 && cm.haveItem(4031713)) {
            if(em.getProperty("entry") == "true") {
                cm.gainItem(4031713, -1);
                cm.warp(600010002);
            }
            else {
                cm.sendNext("我们将在出发前一分钟开始登机。请耐心等待几分钟。请注意地铁会准时出发，而且我们会在1分钟前停止收票，所以请务必准时到达。");
            }
        } else {
            cm.sendNext("抱歉，你需要门票才能进入！");
	}
        
        cm.dispose();
    }
}