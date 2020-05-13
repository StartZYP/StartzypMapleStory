var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("请冷静点，我们正前往#b金银岛#k,我们一到那里就安全了。一起出发吧！");
    cm.dispose();
}