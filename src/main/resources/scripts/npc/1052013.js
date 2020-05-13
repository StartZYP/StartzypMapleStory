var status = 0;
var maps = [190000000,191000000,192000000,195000000,196000000,197000000];
var cost = [100000, 100000, 100000, 100000, 100000, 100000];
var selectedMap = -1;
var mesos;

function start() {
    cm.sendNext("#b����#k������һ��������ĵط������ָ����Ĺ���ۼ���һ��, �������ȼ������볡����#p1052014#.ѡ������ȥ�ĵ�ͼ\r\n\r\n#b");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("����Ժ���������.");
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
                selStr += "���Ƕ������о����Ż�";
            selStr += "ѡ�����Ŀ�ĵأ���Ϊ���û���ض���.#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "#(" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i])+ "���)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("�������ȥ��#b#m" + maps[selection] + "#��#k? ��Ҫ֧��#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + "���#k��");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("��û���㹻�Ľ�ҡ��ܱ�Ǹ��ô˵������û�����ǣ���Ͳ���ȥ#Premium·#.");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}