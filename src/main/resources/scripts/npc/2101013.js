/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0) {
		cm.sendNext("�ǵġ��㺦���ٶȻ��Ǹ߶ȣ��㲻�������ҵķ��м����������ң����Ѿ���������е�����!");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if(status == 0){
		cm.sendNext("�Ҳ�֪������ô֪���ģ��������Եط��ˣ�������Щ�������ɳĮ�ǻ�����ҵ��ˣ����ṩֱ��ά�����ǵ��ĺ��࣬��ͣ���������һ�ɵĴ�--��ֻ����һ���Σ�������С���ϳ�;�����㲻�����ıտֲ���?");
	} else if(status == 1){
		cm.sendYesNo("���ס�����¡���һ����������ʵ������Ϊ�����������ģ����Թ��ʷ��ֲ��ܱ�֤�㵽�׻����ĸ����н��䡣�ڶ�����Ϊ��Ҫ���㰲���������ر𺽰��ϣ����Ի��е�󡣷������1���ң���һ��ɻ�Ҫ����ˡ��������ֱ�ﺽ�����Ȥ��?");
	} else if(status == 2){
		cm.sendNext("���ˣ�׼�����~");
	} else if(status == 3){
		if(cm.getMeso() >= 10000){
			cm.gainMeso(-10000);
			cm.warp(towns[Math.floor(Math.random() * towns.length)]);
		} else{
			cm.sendNextPrev("�٣���ȱǮ���Ҹ��߹�������Ҫһ���.");
			cm.dispose();
			}
		}
	}
}