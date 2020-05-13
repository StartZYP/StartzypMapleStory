/**
-- Odin JavaScript --------------------------------------------------------------------------------
    Hak - Cabin <To Mu Lung>(200000141) / Mu Lung Temple(250000100) / Herb Town(251000000)
-- By ---------------------------------------------------------------------------------------------
    Information
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Text and statement fix [Information]
    1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var menu = new Array("武陵","天空之城","百草堂","武陵");
var cost = new Array(1500,1500,500,1500);
var hak;
var slct;
var display = "";
var btwmsg;
var method;


function start() {
    status = -1;
    hak = cm.getEventManager("Hak");
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
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" mesos)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" mesos)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b天空之城#k to #b武陵#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#b武陵#k to #b天空之城#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("你好.到目前为止旅行怎么样?我很快就把你这样的旅客送到#b"+menu[3]+"#k了, 还有...你有兴趣吗?它没有船稳,所以你得抓紧,但我能比船快得多.只要你付#b"+cost[2]+"金币#k我就带你去.");
                status++;
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("你好。到目前为止旅行怎么样？我明白，和我这样能在天空中行走的人相比，用两条腿走路更难覆盖地面。我很快就把像你这样的旅行者送到了其他地区，而且。。。你有兴趣吗？如果是，那么选择你想去的城镇.\r\n"+display);
            } else {
                cm.sendSimple("你好。到目前为止旅行怎么样？我很快就把像你这样的旅行者送到了其他地区，而且。。。你有兴趣吗？如果是，请选择要前往的城镇.\r\n"+display);
            }
        } else if(status == 1) {
            slct = selection;
            cm.sendYesNo("你想去#b"+menu[selection]+"#k吗? 如果你有"+cost[selection]+"金币#k, 我现在就可以带你过去.");

        } else if(status == 2) {
            if(slct == 2) {
                if(cm.getMeso() < cost[2]) {
                    cm.sendNext("你确定你有足够的金币吗?");
                    cm.dispose();
                } else {
                    cm.gainMeso(-cost[2]);
                    cm.warp(251000000, 0);
                    cm.dispose();
                }
            }
            
            else {
                if(cm.getMeso() < cost[slct]) {
                        cm.sendNext("你确定你有足够的金币吗?");
                        cm.dispose();
                } else {
                        if(cm.getPlayer().getMapId() == 251000000) {
                            cm.gainMeso(-cost[2]);
                            cm.warp(250000100, 0);
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Hak");
                            if (!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("请稍候再试");
                                cm.dispose();
                                return;
                            }
                            
                            cm.gainMeso(-cost[slct]);
                            cm.dispose();
                        }
                }
            }
        }
    }
}  