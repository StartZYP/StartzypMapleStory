/* Author: aaroncsn - MapleSea Like, Incomplete, Needs skin id
	NPC Name: 		Laila
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Skin Care Specialist
*/

var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("����~��ӭ���١���ӭ�������ﰲ��Ƥ���������߽���һ�������Ļ���Ʒ�꣬��Ů������Ҳ�����������������˰��ﰲ�ػ����Ż�ȯ�����ǻ��չ˺�����ġ����������Ƥ��������ô��?");
		} else if (status == 1) {
			cm.sendStyle("ʹ�����ǵ�ר�û����������������ƺ���ǰ�����Լ���������ʲô����Ƥ������ѡ����ϲ���ķ��...", skin);
		} else if (status == 2){
			cm.dispose();
			if (cm.haveItem(5153007) == true){
				cm.gainItem(5153007, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("�����µ�Ƥ��!");
			} else {
				cm.sendNext("������û�д����ǵĻ���ȯ��û�������Ҳ��ܸ�������");
			}
		}
	}
}