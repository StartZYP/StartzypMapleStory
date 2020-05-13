/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getEventInstance();
        if(!eim.isEventCleared()) {
            if (status == 0) {
                cm.sendYesNo("���������ȥ��?");
            }
            else if (status == 1) {
                cm.warp(270050000, 0);
                cm.dispose();
            }
        
        } else {
            if (status == 0) {
                cm.sendYesNo("Ʒ�ͱ�����ˣ�����������Ƭ�����ϵ�Ӣ�ۣ����κ�ʱ��ʱ��ĵ��ö���������һ����ҫ����һ�ж�Ҫ��л���Ŭ�������ǵ�Ӣ�����꣡��������׼����������");
            }
            else if (status == 1) {
                if(eim.giveEventReward(cm.getPlayer(), 1)) {
                    cm.warp(270050000);
                }
                else {
                    cm.sendOk("���װ����ʹ�á����õȿ����û�㹻�Ŀռ䣬���޷����ʵ������.");
                }
                
                cm.dispose();
            }
        }
    }
}