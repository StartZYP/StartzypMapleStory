var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("#r黑魔法师#k的军队以不可阻挡的速度逼近这里。。。我们别无选择，只能逃离这个地区，离开我们的家。哦，悲剧！");
    cm.dispose();
}