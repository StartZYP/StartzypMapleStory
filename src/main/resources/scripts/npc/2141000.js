/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendAcceptDecline("������������ľ��ӣ��Ҿ��������ٻ�����ʦ�� \r\n�ȴ����е㲻�Ծ���Ϊʲôû���ٻ�����ʦ���ȵȣ�����ʲô�������Ҹо�����������ȫ��ͬ�ں���ʦ������������ \r\n\r\n #b(���ַ��������ļ���ϡ�)");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.removeNpc(270050100, 2141000);
	cm.forceStartReactor(270050100, 2709000);
    }
    cm.dispose();

// If accepted, = summon PB + Kriston Disappear + 1 hour timer
// If deny = NoTHING HAPPEN
}