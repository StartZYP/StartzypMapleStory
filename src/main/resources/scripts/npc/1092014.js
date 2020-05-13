var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 103000000];
var cost = [1000, 1000, 1000, 800, 1000];
var selectedMap = -1;

function start() {
    cm.sendNext("��ã�����#bŵ����˹�а�#k,������밲ȫ���ٵش�һ��������һ�������Ǿʹ����ǵĳ��⳵�ɡ����Ǻ��������ȥ����Ŀ�ĵأ��۸�ʵ��.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("���С��Ҳ�кܶ�ֵ��һ���Ķ�����������Ҫȥ��һ������ʱ������������.");
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
            selStr += "ѡ�����Ŀ�ĵأ���Ϊ���û���ض���.#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + "���)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("��û�����Ҫ���˰�?�������ȥ��#b#m" + maps[selection] + "##k? ���Ứ���� #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " ���#k.");
            selectedMap = selection;
        } else if (status == 3) {
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
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}