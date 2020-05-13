/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getEventInstance();
        if(!eim.isEventCleared()) {
            if (status == 0) {
                cm.sendYesNo("你现在想出去吗?");
            }
            else if (status == 1) {
                cm.warp(270050000, 0);
                cm.dispose();
            }
        
        } else {
            if (status == 0) {
                cm.sendYesNo("品缤被打败了！你们真是这片土地上的英雄！在任何时候，时间的殿堂都会像以往一样闪耀，这一切都要感谢你的努力！我们的英雄万岁！！你现在准备好走了吗？");
            }
            else if (status == 1) {
                if(eim.giveEventReward(cm.getPlayer(), 1)) {
                    cm.warp(270050000);
                }
                else {
                    cm.sendOk("如果装备、使用、设置等库存中没足够的空间，则无法获得实例奖励.");
                }
                
                cm.dispose();
            }
        }
    }
}