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

var menu = new Array("����","���֮��","�ٲ���","����");
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
            cm.sendNext("�����ı����⣬������ҡ�");
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
                btwmsg = "#b���֮��#k to #b����#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#b����#k to #b���֮��#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("���.��ĿǰΪֹ������ô��?�Һܿ�Ͱ����������ÿ��͵�#b"+menu[3]+"#k��, ����...������Ȥ��?��û�д���,�������ץ��,�����ܱȴ���ö�.ֻҪ�㸶#b"+cost[2]+"���#k�Ҿʹ���ȥ.");
                status++;
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("��á���ĿǰΪֹ������ô���������ף���������������������ߵ�����ȣ�����������·���Ѹ��ǵ��档�Һܿ�Ͱ������������������͵����������������ҡ�����������Ȥ������ǣ���ôѡ������ȥ�ĳ���.\r\n"+display);
            } else {
                cm.sendSimple("��á���ĿǰΪֹ������ô�����Һܿ�Ͱ������������������͵����������������ҡ�����������Ȥ������ǣ���ѡ��Ҫǰ���ĳ���.\r\n"+display);
            }
        } else if(status == 1) {
            slct = selection;
            cm.sendYesNo("����ȥ#b"+menu[selection]+"#k��? �������"+cost[selection]+"���#k, �����ھͿ��Դ����ȥ.");

        } else if(status == 2) {
            if(slct == 2) {
                if(cm.getMeso() < cost[2]) {
                    cm.sendNext("��ȷ�������㹻�Ľ����?");
                    cm.dispose();
                } else {
                    cm.gainMeso(-cost[2]);
                    cm.warp(251000000, 0);
                    cm.dispose();
                }
            }
            
            else {
                if(cm.getMeso() < cost[slct]) {
                        cm.sendNext("��ȷ�������㹻�Ľ����?");
                        cm.dispose();
                } else {
                        if(cm.getPlayer().getMapId() == 251000000) {
                            cm.gainMeso(-cost[2]);
                            cm.warp(250000100, 0);
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Hak");
                            if (!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("���Ժ�����");
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