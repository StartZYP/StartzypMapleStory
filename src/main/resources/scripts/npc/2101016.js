var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("�٣����ھ�������ս����û�п������ڳ���!���������ʲô?");
        cm.dispose();
        return;
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("̫����ˣ���û�еõ��κ��鱦!");
                cm.dispose();
            } else {
                cm.sendNext("�õ�,�����ǿ����������úܺã�������� #b" + copns + "#k ��ϲ�����鱦����Ȼ���Ѿ�����˱������ҽ�������һ������������ #b" + arena.getAriantRewardTier(cm.getPlayer()) + " Ŀ��#k. �������֪��������ھ�������������Ϣ������ϵ���� #b#p2101015##k.");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);
            
            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("�ð�!�´θ������������鱦��!Ahahahahah!"); 
            cm.dispose();
        }
    }
}