var status = 0;
var maps = [190000000,191000000,192000000,195000000,196000000,197000000];
var cost = [100000, 100000, 100000, 100000, 100000, 100000];
var selectedMap = -1;
var mesos;

function start() {
    cm.sendNext("#b电脑#k连接着一个多区域的地方，各种各样的怪物聚集在一起, 是提升等级的理想场所。#p1052014#.选择你想去的地图\r\n\r\n#b");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("想好以后再来找我.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "我们对新手有九折优惠";
            selStr += "选择你的目的地，因为费用会因地而异.#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "#(" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i])+ "金币)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你真的想去吗#b#m" + maps[selection] + "#吗#k? 需要支付#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + "金币#k。");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("你没有足够的金币。很抱歉这么说，但是没有他们，你就不能去#Premium路#.");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}