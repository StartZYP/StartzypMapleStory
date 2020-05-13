/** 
Happy - Happy ville 
@author Ronan
**/ 
var status = -1;
function start() { 
        action(1, 0, 0); 
} 
function action(mode, type, selection) { 
	if (mode == -1) { 
		cm.dispose(); 
	} else {
                if (status == 0 && mode == 0) { 
			cm.sendOk("Talk to me again when you want to."); 
			cm.dispose(); 
		} 
                if (mode == 1) 
                        status++; 
                else 
                        status--; 
                 
                if (status == 0) { 
                        cm.sendSimple("#b<Raid Quest: Happyville>#k\r\n一次突袭不过是许多人联合起来，试图打败强大的生物. 这没什么不同。每个人都可以参加击败产卵生物的战斗. What will you do?\r\n#b\r\n#L0#Spawn Kid Snowman.\r\n#L1#Spawn Lost Rudolph.\r\n#L2#Nothing, just chilling.#k");
                } else if(status == 1) {
                        if(selection == 0) {
                                if(cm.getMap().getMonsters().size() > 1) {  //reactor as a monster? wtf
                                        cm.sendOk("消灭该地区所有的暴徒叫小雪人。"); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500317, 1700, 80);
                        } else if(selection == 1) {
                                if(cm.getMap().getMonsters().size() > 6) {  //reactor as a monster? wtf
                                        cm.sendOk("这地方现在太拥挤了。在再试之前消灭一些暴徒。"); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500320, 1700, 80);
                        } else {
                                cm.sendOk("那好吧。");
                        }
                        
                        cm.dispose();
                }
        }
} 