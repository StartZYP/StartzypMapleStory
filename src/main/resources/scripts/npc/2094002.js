var status = -1;
var level = 1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.warp(251010404,0);
	cm.dispose();
	return;
    }
    
    if(status == 1) {   // leaders cant withdraw
        cm.warp(251010404,0);
        return;
    }
    
    if (!cm.isEventLeader()) {
	cm.sendYesNo("我希望你的队长能和我谈谈。或者，你可能想要退出。你打算放弃这次任务吗?");
    }
    else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404,0);
            cm.sendNext("你不能没有经过允许就进入这里!");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch(cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("我们现在要进入海盗船了！要进去，我们必须消灭所有守卫它的怪物.");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp.equals("0")) {
                    if (cm.haveItem(4001120,20)) {
                        cm.sendNext("那么,现在给我找20块#i4001120#.");
                        cm.gainItem(4001120,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("我们现在要进入海盗船了！想要往更深处走，我们必须打败足够的海盗。去获取 20 个#i4001120#.");
                    }
                } else if (emp.equals("1")) {
                    if (cm.haveItem(4001121,20)) {
                        cm.sendNext("那么,现在给我找20块#i4001121#");
                        cm.gainItem(4001121,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("我们现在要进入海盗船了！想要往更深处走，我们必须打败足够的海盗。去获取 20 个#i4001121#.");
                    }
                } else if (emp.equals("2")) {
                    if (cm.haveItem(4001122,20)) {
                        cm.sendNext("完成! 那么我们继续前进.");
                        cm.gainItem(4001122,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("我们现在要进入海盗船了！想要往更深处走，我们必须打败足够的海盗。去获取 20 个#i4001122#..");
                    }
                } else {
                    cm.sendNext("下一阶段已经开始.快走!");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("要进攻海盗船，我们必须先摧毁守卫.");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗王的宝藏出现了！如果你碰巧有一把钥匙，把它放在箱子旁边，露出它的宝藏。那肯定会让他心烦意乱的.");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("我们必须解放他们.");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗王的宝藏出现了！如果你碰巧有一把钥匙，把它放在箱子旁边，露出它的宝藏。那肯定会让他心烦意乱的.");
                    if (eim.getProperty("stage3a").equals("0")) {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("我们必须解放他们.");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("这些是船长和克鲁斯，他们追随于海盗王。你们需要打败他们.");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("这些是船的动力来源。我们必须用门上的旧金属钥匙把它封起来!");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("谢谢你救了我们的领袖！");
                } else {
                    cm.sendNext("打败所有的怪物！即使是海盗的奴仆!");
                }
                cm.dispose();
                break;
        }
    }
    
    
}