var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("我希望这次旅行是安全的，希望我们能住在一个更和平的地方。。。嘿，亲爱的，我们走吧。");
    cm.dispose();
}