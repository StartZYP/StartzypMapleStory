function start() {
    cm.sendNext("�����Ǳ����úܺ�," + cm.getPlayer().getName() + ", ���ú�.����������ر���ѩ��. �ѹҼ�����������,����׼���ý����¼��ܵ�ʱ�����̸̸.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000,"in01");
        cm.dispose();
    }
}