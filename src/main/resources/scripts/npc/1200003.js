/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200003 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("�����");
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
			cm.sendNext("�����ı����⣬�������.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##bǰ�������(800���)#k";
                        }			
                        cm.sendSimple("�����뿪����𣿵������Ҵ��Ҵ����뿪#b���#kǰ��#b�����#kȻ�����.�����#b800���#k.��������ȥ������𣿵��Ƕ���Լ��Ҫһ����.\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("��ȷ������#b800���#k��? �������Ƿ�����ô��Ǯ,��Ȼ���޷�����Ǵ�.");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090070);
                                cm.dispose();
                        }
				
                }
        }
}