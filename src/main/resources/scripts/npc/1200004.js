/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Rien");
var method;

function start() {
	status = -1;
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
			cm.sendNext("�ðɡ������ı������ˣ�������ҡ�");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##bǰ�����(800 ���)#k";
                        }
                        cm.sendSimple("�����뿪��������ȥ���ǵ�С���������������Ҵ����ҿ��Դ����#�����#K��#���#KȻ�������������븶#b800���#k,����ȥ����𣿵������Լ��Ҫһ����.\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("��ȷ������800�������ȷ�������㹻�Ľ�ҡ���");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800); 
                                cm.warp(200090060);
                                cm.dispose();
                        }
                }
        }
}