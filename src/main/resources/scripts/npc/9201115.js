var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
        var eim = cm.getEventInstance();
        if (eim != null && eim.getIntProperty("glpq6") == 3) {
                cm.sendOk("... ��ĺá� ����Խ��Ť����ʦ������������ȥ�콱��");
                cm.dispose();
                return;
        }
        
        if (!cm.isEventLeader()) {
                cm.sendNext("��ϣ������鳤�ܺ���̸̸��");
                cm.dispose();
                return;
        }
    
        if (mode == 1) {
                status++;
        } else {
                status--;
        }

        if (eim != null) {
                if (eim.getIntProperty("glpq6") == 0) {
                        if (status == 0) {
                                cm.sendNext("��ӭ����Ť����ʦ�ĳǱ��������ҽ���������ˡ�����");
                        } else if (status == 1) {
                                cm.sendNext("����������һ��ð��С�ӵ�ʢ�硣������������");
                        } else if (status == 2) {
                                cm.sendNext("������ѵ�����ص��ػ���ʦ��������");
                                cm.mapMessage(6, "�ػ���ʦ���ˣ�");
                                for (var i = 0; i < 10; i++) {
                                        var mob = eim.getMonster(9400594);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                for (var i = 0; i < 20; i++) {
                                        var mob = eim.getMonster(9400582);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                eim.setIntProperty("glpq6", 1);
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 1) {
                        if (cm.getMap().countMonsters() == 0) {
                                if (status == 0) {
                                        cm.sendOk("��������ʲô�����������ǣ�");
                                } else if (status == 1) {
                                        cm.sendNext("�ðɣ�û��ϵ��Ť�������˻�ܸ��˻�ӭ�㣻");
                                        cm.mapMessage(6, "Ť�������˽ӽ���");

                                        //Margana
                                        var mob = eim.getMonster(9400590);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-22, 1));

                                        //Red Nirg
                                        var mob2 = eim.getMonster(9400591);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-22, 276));

                                        //Hsalf
                                        var mob4 = eim.getMonster(9400593);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob4, new java.awt.Point(496, 276));

                                        //Rellik
                                        var mob3 = eim.getMonster(9400592);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob3, new java.awt.Point(-496, 276));

                                        eim.setIntProperty("glpq6", 2);
                                        cm.dispose();
                                }
                        } else {
                                cm.sendOk("�����ҡ��ػ���ʦ�Ụ���㣡");
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 2) {
                        if (cm.getMap().countMonsters() == 0) {
                                cm.sendOk("ʲô�����������ⲻ���ܷ�����.");
                                cm.mapMessage(5, "��һ�׶ε�����Ѿ��򿪣�");
                                eim.setIntProperty("glpq6", 3);
                                
                                eim.showClearEffect(true);
                                eim.giveEventPlayersStageReward(6);
                                
                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                cm.sendOk("�����ҡ�Ť�������˻Ụ���㣡");
                                cm.dispose();
                        }
                } else {
                        cm.sendOk("... ��úܺá��㳬����Ť�������ˡ�����������ȥ�콱��");
                        cm.dispose();
                }
        } else {
                cm.dispose();
        }
}