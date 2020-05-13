var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("我们现在出发前往#b金银岛#k.我听说#r黑魔法师#k他还没掌控那个地方，多亏了#b在那个地区铸造的印章#k.我们为他们的安全祈祷，但如果命运不眷顾英雄，至少我们到达大陆后会安全。");
    cm.dispose();
}