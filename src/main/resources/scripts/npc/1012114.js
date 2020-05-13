/*
  Growlie (that fatass uhh.. hungry lion or whatever)
  FightDesign @RageZONE

  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
        eim.setProperty(stage + "stageclear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(stage);
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0) {
                cm.dispose();
                return;
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 0)
                        status += ((chosen == 2) ? 1 : -1);
                else
                        status++;
                    
                if (status == 0) {
                        if (cm.isEventLeader()) {
                                cm.sendSimple("咆哮!我是格罗利，随时准备保护这个地方。什么风把你吹来了?\r\n#b#L0# 请告诉我这是什么地方。#l\r\n#L1# 我带来了 #t4001101#.#l\r\n#L2# 我想离开这个地方。#l");
                        } else {
                                cm.sendSimple("咆哮!我是格罗利，随时准备保护这个地方。什么风把你吹来了?\r\n#b#L0# 请告诉我这是什么地方。#l\r\n#L2# 我想离开这个地方。#l");
                        }
                } else if (status == 1) {
                        if (chosen == -1)
                                chosen = selection;
                        if (chosen == 0) {
                                cm.sendNext("每当月圆之夜，你都可以在这里品尝到月亮兔做的年糕。");
                        } else if (chosen == 1) {
                                if (cm.haveItem(4001101, 10)) {
                                        cm.sendNext("哦……这不是月亮兔做的年糕吗?请把米糕递给我。嗯……这些看起来很好吃。下次再来找我吧 #b#t4001101##k. 回家一路平安吗!");
                                } else {
                                        cm.sendOk("我建议你检查一下，确定你确实已经收集好了 #b10 #t4001101#s#k.");
                                        cm.dispose();
                                }
                        } else if (chosen == 2) {
                                cm.sendYesNo("你确定要走吗?");
                        }
                        else {
                                cm.dispose();
                                return;
                        }
                } else if (status == 2) {
                        if (chosen == 0) {
                                cm.sendNextPrev("从这片区域的报春花叶子上收集报春花的种子，把种子种在新月附近的根部，就可以看到报春花了。报春花有6种，每一种都需要不同的底座。基础必须与花的种子相适应。");
                        } else if (chosen == 1) {
                                cm.gainItem(4001101, -10);

                                var eim = cm.getEventInstance();
                                clearStage(1, eim);

                                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                                map.killAllMonstersNotFriendly();

                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                if (mode == 1) {
                                        cm.warp(910010300);
                                } else {
                                        cm.sendOk("你最好给我收集一些美味的年糕，因为时间不多了，咆哮吧!");
                                }
                                cm.dispose();
                        }
                } else if (status == 3) {
                        if (chosen == 0) {
                                cm.sendNextPrev("当樱草花盛开的时候，满月就会升起，这时月亮兔就会出现，开始捣碎磨盘。你的任务是打败怪物，以确保月亮兔可以集中精力做最好的年糕。");
                        }
                } else if (status == 4) {
                        if (chosen == 0) {
                                cm.sendNextPrev("我想为你和你的党员合作，给我10个米糕。我强烈建议你在规定的时间内给我买米糕。");
                        }
                } else {
                        cm.dispose();
                }
        }
}