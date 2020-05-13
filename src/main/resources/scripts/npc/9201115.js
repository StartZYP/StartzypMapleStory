var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
        var eim = cm.getEventInstance();
        if (eim != null && eim.getIntProperty("glpq6") == 3) {
                cm.sendOk("... 打的好。 您超越了扭曲大师，穿过那扇门去领奖。");
                cm.dispose();
                return;
        }
        
        if (!cm.isEventLeader()) {
                cm.sendNext("我希望你的组长能和我谈谈。");
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
                                cm.sendNext("欢迎来到扭曲大师的城堡。今晚我将是你的主人。。。");
                        } else if (status == 1) {
                                cm.sendNext("今晚，我们有一个冒险小队的盛宴。。哈哈。。。");
                        } else if (status == 2) {
                                cm.sendNext("让我们训练有素的守护大师护送您！");
                                cm.mapMessage(6, "守护大师来了！");
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
                                        cm.sendOk("呃。这是什么？你打败了他们？");
                                } else if (status == 1) {
                                        cm.sendNext("好吧，没关系！扭曲的主人会很高兴欢迎你；");
                                        cm.mapMessage(6, "扭曲的主人接近！");

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
                                cm.sendOk("别理我。守护大师会护送你！");
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 2) {
                        if (cm.getMap().countMonsters() == 0) {
                                cm.sendOk("什么？呃。。。这不可能发生。.");
                                cm.mapMessage(5, "下一阶段的入口已经打开！");
                                eim.setIntProperty("glpq6", 3);
                                
                                eim.showClearEffect(true);
                                eim.giveEventPlayersStageReward(6);
                                
                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                cm.sendOk("别理我。扭曲的主人会护送你！");
                                cm.dispose();
                        }
                } else {
                        cm.sendOk("... 玩得很好。你超过了扭曲的主人。穿过那扇门去领奖。");
                        cm.dispose();
                }
        } else {
                cm.dispose();
        }
}