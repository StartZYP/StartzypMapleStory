/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
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
			cm.sendNext("�����ı����⣬������ҡ�");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##bǰ��ʥ��(1000���)#k";
                        }			
                        cm.sendSimple("���Ҵ���ʻ��ʥ�أ���������ᷢ�����ɫ����Ҷ��ԡ�������У�΢���ӹ�СϪ������ϣ��˹Ů�ʡ����������Ȥ������ʿ�ţ���ô��һ��Ҫ���ι�һ�¡�������Ȥ�ι�ʥ���𣿣����н�������#b1000#k���\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("��...��ȷ������#b1000#k�����?");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090030);
				cm.dispose();
				}
			}
		}
}