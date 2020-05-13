/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("一个传说中的守护者在等着你。雷德利曾经试验过一种深红色的守护者，结果它对魔法攻击、长矛、狼牙棒、一切东西都有很强的抵抗力，除了射出的威力非凡的箭。弓箭手和女人！作为无可争议的弓箭大师，你必须使用你最强大的攻击——从施暴到飓风再到刺穿之箭，来摧毁这个强大的生物，并到达弓箭手雕像，以获得先祖之弓！祝你好运！");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("洛克伍德是唯一已知的神圣弓箭手之一，是该要塞最著名的英雄之一。特别值得一提的是他的习俗白色和金色的战斗倒钩，据说是由一个强大的女神祝福。他的目标在长距离上非常精确。他因“创世纪之箭”和“毁灭凤凰”而备受敬畏，曾从英雄谷击落六个台风。");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030540) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001258, 1)) {
                                        cm.gainItem(4001258, 1);
                                        cm.sendOk("Good job.");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("先在你的背包中上腾出空间。.");
                                }
                        } else {
                                cm.sendOk("房间里的武器已经找到了。");
                        }
                } else {
                        cm.sendOk("消灭所有守护者。");
                }
                cm.dispose();
        }
}