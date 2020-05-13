function start() {
    cm.sendNext("你在那边做得很好," + cm.getPlayer().getName() + ", 做得好.现在我送你回冰峰雪域. 把挂件放在你的身边,当你准备好接受新技能的时候和我谈谈.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000,"in01");
        cm.dispose();
    }
}