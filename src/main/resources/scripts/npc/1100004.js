/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("�����ı����⣬������ҡ�");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            var display = "";
            for (var i = 0; i < menu.length; i++) {
                display += "\r\n#L" + i + "##b���֮��(1000���)#k";
            }
            cm.sendSimple("��... ���������ġ������뿪ʥ��ȥ��ĵط������Ҷ��ֿ������ص������֮�ǣ�����ʥ����û���չ˺�����Ҫ��һ�У������������ȥ#b���֮��#k�ҿ��Դ���ȥ�����Ҫȥ���֮����\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("��... ��ȷ������#b1000#k�����?��ȷ�����Ƿ����㹻�Ľ�ң���Ȼ�޷�����˴���");
                cm.dispose();
            } else {
                cm.gainMeso(-1000);
                cm.warp(200090021);
                cm.dispose();
            }
        }
    }
}