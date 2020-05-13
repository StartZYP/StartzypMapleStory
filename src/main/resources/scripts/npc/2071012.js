/* A Familiar Lady
    Hidden Street : Gloomy Forest (922220000)
 */

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
            cm.dispose();
        } else {
            if (mode == 0 && type > 0) {
                cm.dispose();
                return;
            }
            if (mode == 1)
                status++;
            else
                status--;

            if(status == 0) {
                if(cm.getQuestProgressInt(23647, 1) != 0) {
                    cm.dispose();
                    return;
                }
                
                if(!cm.haveItem(4031793, 1)) {
                    cm.sendOk("嗯。。。嘿。。。你能帮我找一个#b柔软闪亮的银色皮毛#k吗？我在树林里迷路了，我需要它，我需要它，我非常需要它！");
                    cm.dispose();
                    return;
                }
                
                cm.sendYesNo("嘿。。。嗯。。。你能帮我找一个#b柔软闪亮的银色皮毛#k我在树林里迷路了？我需要它，我需要它，我非常需要它。。。哦，你找到了！！！你能把它给我吗？");
            } else if(status == 1) {
                cm.sendNext("蒂希希~这是你从我这里拿走的奖赏，这个对你来说可能很需要。");
                cm.gainItem(4031793, -1);
                cm.gainFame(-5);
                cm.setQuestProgress(23647, 1, 1);
                
                cm.dispose();
            }
        }
}