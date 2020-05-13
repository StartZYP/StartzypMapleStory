function start() {
    cm.sendSimple("如果你有翅膀,我相信你可以去那里.但是,光是这样还不够.如果你想在比刀刃还锋利的风中飞翔,你也需要坚硬的鳞片.我是唯一一个知道路的半身人...如果你想去那里，我可以改变你.不管你是什么人,此刻,你会变成一条 #b龙#k.\r\n #L0##b我想成为一条龙。#k#l");
}

function action(m, t, s) {
   if (m > 0){
      cm.useItem(2210016);
      cm.warp(200090500, 0);
   }
   cm.dispose();
}  