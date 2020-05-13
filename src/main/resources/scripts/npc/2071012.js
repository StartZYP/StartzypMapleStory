/* A Familiar Lady
    Hidden Street : Gloomy Forest (922220000)
 */

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else {
            if (mode == 0 && type > 0) {
                cm.dispose();
                return;
            }
            if (mode == 1)
                status++;
            else
                status--;

            if(status == 0) {
                if(cm.getQuestProgressInt(23647, 1) != 0) {
                    cm.dispose();
                    return;
                }
                
                if(!cm.haveItem(4031793, 1)) {
                    cm.sendOk("�š������١��������ܰ�����һ��#b������������ɫƤë#k��������������·�ˣ�����Ҫ��������Ҫ�����ҷǳ���Ҫ����");
                    cm.dispose();
                    return;
                }
                
                cm.sendYesNo("�١������š��������ܰ�����һ��#b������������ɫƤë#k������������·�ˣ�����Ҫ��������Ҫ�����ҷǳ���Ҫ��������Ŷ�����ҵ��ˣ��������ܰ���������");
            } else if(status == 1) {
                cm.sendNext("��ϣϣ~����������������ߵĽ��ͣ����������˵���ܺ���Ҫ��");
                cm.gainItem(4031793, -1);
                cm.gainFame(-5);
                cm.setQuestProgress(23647, 1, 1);
                
                cm.dispose();
            }
        }
}