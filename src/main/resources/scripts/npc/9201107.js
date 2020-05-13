/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("难以置信的力量和力量，任何人都可以做到。但让战士与众不同的是他们的钢铁意志。不管胜算多大，真正的勇士都会坚持到底，直到胜利在望。因此，武士室是一条残酷的道路，房间本身就是反对你的，以及内部的超强怪物。使用你的技能摆脱效果，击败里面的怪物，到达勇士雕像，并要求主剑。祝你好运！");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("德夫里森家族是传奇的英雄家族，是风暴法师的创始人。这个家庭是独一无二的，因为每个儿子或女儿都继承了他们祖先的全部战斗技巧。这种能力已经被证明是非常有用的，因为它允许几乎无限的战略，即兴发挥和战术击败所有敌人。世世代代真正的家庭。");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030510) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001259, 1)) {
                                        cm.gainItem(4001259, 1);
                                        cm.sendOk("Good job.");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("先在你的背包中腾出空间。");
                                }
                        } else {
                                cm.sendOk("房间里的武器已经找到了。");
                        }
                } else {
                        cm.sendOk("消灭所有绯红卫士。");
                }
                cm.dispose();
        }
}