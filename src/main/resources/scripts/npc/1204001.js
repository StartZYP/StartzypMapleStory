/*
 * NPC : Francis (Doll master)
 * Map : 910510200
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1 || mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
    	status++;
    } else {
    	status--;
    }
    if (status == 0) {
    	cm.sendNext("���Ǹ�����˹����ɫ֮���ľżʦ������ô�Ҵ����ҵ�ľż�������������Ҳ�����������һ��������ߵġ�����ҷ���������ô�������Ժ�ħ��ʦ�����巢�ģ��һ����㸶�����۵ġ�", 9);
    } else if (status == 1) {
    	cm.sendNextPrev("#b(��ɫ֮���Ǻǣ�������˭����һ�кͺ�ħ��ʦ��ʲô��ϵ���ţ�Ҳ����Ӧ�ð���Щ��Ϣ�������³��)#k", 3);
    } else if (status == 2) {
        cm.completeQuest(21719);
        cm.warp(105040200, 10);//104000004 
        cm.dispose();
    }
}