var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("��ã�����ħ��������ͷ#b��ƱԱ#k��ȥ���֮�ǵĴ�ÿ15�������һ�Σ��������ȥ����Ҫ����#b"+cost+"���#k����#b#t4031045##k.ȷ��Ҫ������?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("��һ������Ҫ�����԰�?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("��ȷ���� #b"+cost+" ���#k? ����������Ļ����ҽ�������һ����ı�����棬�����Ƿ��Ѿ����ˡ�");
                cm.dispose();
            }
        }
    }
}
