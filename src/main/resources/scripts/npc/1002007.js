var status = 0;
var maps = [100000000, 102000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var selectedMap = -1;
var mesos;

function start() {
	if (cm.hasItem(4032313,1)) {
		cm.sendNext("我看到你有一张优惠券要去Henesys。等一下，我马上带你过去!");
	} else {
		cm.sendNext("你好，我是#b明珠港中巴#k,如果你想安全快速地从一个城镇到另一个城镇，那就搭我们的出租车吧。我们很乐意带您去您的目的地，价格实惠.");
	}
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("这个小镇也有很多值得一看的东西。当你需要去另一个城镇时，回来找我们.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.hasItem(4032313,1)) {
                cm.gainItem(4032313, -1);
                cm.warp(maps[0], 0);
                cm.dispose();
                return;
            }
            
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "我们对新手有九折优惠.";
            selStr += "选择你的目的地，因为费用会因地而异.#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + "金币)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你没别的事要做了吧?你真的想去吗#b#m" + maps[selection] + "##k?它会花费你#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + "金币.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("你没有足够的金币。无法乘坐中巴.");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}