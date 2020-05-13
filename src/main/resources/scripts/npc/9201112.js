var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        }
    
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.sendNext("事件未启动...");
            cm.dispose();
            return;
        }
        switch(cm.getPlayer().getMapId()) {
            case 610030100:
                if (status == 0) {
                    cm.sendNext("啊，你成功了。让我很快告诉你：他们已经抓到我们了。守护大师马上就要来了。我们最好快点。");
                } else if (status == 1) {
                    cm.sendNext("通往扭曲大师的大门被摧毁了。我们必须找到另一条路，一条能带我们穿过许多死亡陷阱的路。");
                } else if (status == 2) {
                    cm.sendNext("你可以在这附近找到入口。。。你最好快点找到它。我会赶上的。");
                    cm.dispose();
                }
                break;
            case 610030200:
               if (status == 0) {
                    cm.sendNext("那是成功的！现在，对于这条路，我相信我们需要每一个冒险家从这里通过。");
               } else if (status == 1) {
                    cm.sendNext("他们需要把他们的技能用在每一件叫做Sigils的事情上。五个都做完了，我们就可以过去了。");
                    cm.dispose();
               }
               break;
            case 610030300:
               if (status == 0) {
                    cm.sendNext("现在我们这里有更多的信号。至少有五个冒险家必须爬到最顶端并通过入口。但请注意：不是地图上的每一堵墙或每一块地都是它看起来的样子，所以要小心行事！");
               } else if (status == 1) {
                    cm.sendNext("哦，当心这些死亡陷阱，他们真的很厉害。祝你好运。");
                    cm.dispose();
               }
               break;
            case 610030400:
               if (status == 0) {
                    cm.sendNext("通往扭曲大师的大门被摧毁了。我们必须找到另一条路，一条能带我们穿过许多死亡陷阱的路。");
               } else if (status == 1) {
                    cm.sendNext("这些麻烦会妨碍你，但它们只是分散你的注意力。为了摆脱他们，让五个冒险家同时站在左中站台上。要想通过，试着每一个信号，直到他们工作。");
                    cm.dispose();
               }
               break;
            case 610030500:
               if (status == 0) {
                    cm.sendNext("你居然能走这么远！你在这里看到的是守护者要塞的雕像，但没有任何武器。");
               } else if (status == 1) {
                    cm.sendNext("雕像周围有五个房间，每个房间附近都有一座雕像。");
               } else if (status == 2) {
                    cm.sendNext("我怀疑每个房间都有雕像的五件武器之一。");
               } else if (status == 3) {
                    cm.sendNext("把武器带回来，把它们恢复到掌握的遗迹！");
                    cm.dispose();
               }
               break;
            case 610030700:
               cm.sendNext("那是个不错的工作！这条路通向扭曲的主人的军械库。");
               cm.dispose();
               break;
        }
    }
}