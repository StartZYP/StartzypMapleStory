var status = -1;
var sel;

var destinations = new Array("ħ������", "��߳�", "��ľ��", "����", "���ﰲ��", "ʥ��");
var boatType = new Array("�ɴ�", "���л�", "���з���", "���", "���������", "�ɴ�");

function start() {
	var message = "���֮�����������ݺύ����ѡ��һ�����Դ��㵽Ŀ�ĵص�վ̨������ģ���ʹ��ѡ����ˣ������Ի�������˵���ҽ����㵽��ȷ��վ̨�ȴ����ࡣ��������ѡ����Ҫȥ��վ̨��\r\n";
	for(var i = 0; i < destinations.length; i++){
		message += "\r\n#L" + i + "##b����" + boatType[i] + "ǰ��" + destinations[i] + ".#l";
	}
	cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0){
        sel = selection;
        cm.sendNext("�� #h #,������ȥ#b#m" + (200000110 + (sel * 10)) + "##k.");
    }else if (status == 1) {
        cm.warp(200000110 + (sel * 10), "west00");
        cm.dispose();
    }
}