/**
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Drago (MapleStorySA)
        2.0 - Second Version by Jayd - translated CPQ contents to English
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var rnk = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("�Ǻðɣ������´����ġ�");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if (cm.getPlayer().getMapId() == 980030010) {
            if (status == 0) {
                cm.sendNext("��ϣ�����ڹ�����껪����ÿ��ģ�");
            } else if (status > 0) {
                cm.warp(980030000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("���ҵ��ǣ���������ֳ�ɫ����ҪôսƽҪô������ⳡս�����������Ͱɣ�\r\n\r\n#b��Ľ����" + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("���ҵ��ǣ���Ҫôսƽ��Ҫô������ⳡս������ʹ������ռ����֡�ֻҪһ��㣬ʤ���Ϳ��������㣡\r\n\r\n#b��Ľ����" + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("���ҵ��ǣ���ҪôսƽҪô���ˡ�ʤ����Ϊ����Щ�ܶ����ˡ��ҿ������Ŭ��������ʤ�����㲻Զ�������ȥ��\r\n\r\n#b��Ľ��: " + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("���ҵ��ǣ���Ҫô��ƽ�˱ȷ֣�Ҫô����˱�������ı�������ط�ӳ����һ�㡣��ϣ���´����ܸ��Ҹ��ࡣ\r\n\r\n#b��Ľ��: " + shiu);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 10:
                        cm.warp(980030000, 0);
                        cm.gainExp(35000);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980030000, 0);
                        cm.gainExp(25000);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980030000, 0);
                        cm.gainExp(12500);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980030000, 0);
                        cm.gainExp(3500);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("��ϲ������ʤ���������ྫ�ʵı��ݰ�����һ��ʲôҲ�����ˣ�ϣ���´�Ҳ����ͬ���ĺóɼ���\r\n\r\n#b��Ľ��: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("ף��������ʤ����̫���ˣ����ڶԿ����ֵı����б��ֵúܺã��ٳ�һ�㣬���´�һ����õ��ģ�\r\n\r\n#b��Ľ��: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("ף��������ʤ����������һЩ���飬������������á���ϣ���´����ܸ��Ҹ��ࡣ\r\n\r\n#b��Ľ��: " + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("ף�����ʤ����������ı��ֲ�����ȫ��ӳ��һ�㡣�������ز��������껪! \r\n\r\n#b��Ľ��: " + shi);
                    }
                } else {
                    cm.warp(980030000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 1:
                        cm.warp(980030000, 0);
                        cm.gainExp(875000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980030000, 0);
                        cm.gainExp(700000);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980030000, 0);
                        cm.gainExp(555000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980030000, 0);
                        cm.gainExp(100000);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980030000, 0);
                        cm.dispose();
                        break;
                }
            }
        }
    }
}  