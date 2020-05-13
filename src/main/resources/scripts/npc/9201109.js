/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("作为一个强大的魔法大师，里奇知道智慧的价值，一个巫师的标志性品质。因此，法师室是一个扭曲的迷宫，充满了诡异的概念——传送技能是你在里面唯一可以使用的技能，而魔爪是唯一可以打破雕像的技能。你还必须杀死里面的许多怪物。当你解决了迷宫并击败了里面所有的敌人后，推断出哪个法师雕像隐藏了第一魔法杖并将其打开以获得它！祝你好运！");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("拉斐尔这个名字永远被人们记住，他是一个非常熟练的巫师，同时也是心灵魔法、心灵感应和心灵感应的最重要的大师。除此之外，他还是精通所有元素的“精英法师”之一。他最后一次被看到是在寻找“元素之庙”来抵御入侵的克拉基亚军队。。。");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030521) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001257, 1)) {
                                        cm.gainItem(4001257, 1);
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
                        cm.sendOk("消除所有怪物。");
                }
                cm.dispose();
        } /* else if (cm.getPlayer().getMapId() == 610030522) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        cm.warp(610030522,0);
                } else {
                        cm.sendOk("消灭所有怪物。");
                }
                cm.dispose();
        }
        */
}