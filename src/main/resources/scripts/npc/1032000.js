var status = 0;
var maps = [104000000, 102000000, 100000000, 103000000, 120000000];
var cost = [1000, 1000, 1000, 1000, 800];
var selectedMap = -1;
var mesos;
var hasCoupon = false;

function start() {
    cm.sendNext("��ã�����#bħ�����а�#k����������ְ�ȫ���ƶ���������ׯ����ô����ʹ����ͻ��ٷְ������#bħ�����а�#k�ɡ�����Ҹ�������Ŵ����ҽ�������ȥ��ȥ�ĵط���");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("��������ƶ���������ׯ������ʱʹ�����ǵĳ��⳵~");
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
                selStr += "���Ƕ������о����Ż�.";
            selStr += "��ѡ��Ŀ�ĵء�#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + "���)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            if (maps[selection] == 100000000 && cm.getMapId() == 101000000 && cm.haveItem(4032288)) {
                cm.sendYesNo("�ţ���֪���Ϲ����Ƽ�������������������ʿ���ܡ��ðɣ�������һ�Σ����˳�����ѵġ����ܴ�㳵��?");
                hasCoupon = true;
            } else {
                cm.sendYesNo("�������ƺ�ûʲô��������ˡ������Ҫ�ƶ���#b#m" + maps[selection] + "##k��?");
            }
            
            selectedMap = selection;
        } else if (status == 3) {
            if (!hasCoupon) {
                if (cm.getJobId() == 0) {
                    mesos = cost[selectedMap] / 10;
                } else {
                    mesos = cost[selectedMap];
                }

                if (cm.getMeso() < mesos) {
                    cm.sendNext("��û���㹻�Ľ�ҡ��ܱ�Ǹ��ô˵������û�����ǣ���Ͳ��������⳵��.");
                    cm.dispose();
                    return;
                }

                cm.gainMeso(-mesos);
            } else {
                cm.gainItem(4032288, -1);
            }
            
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}