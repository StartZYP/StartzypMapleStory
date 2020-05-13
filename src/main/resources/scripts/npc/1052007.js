

var status = 0;
var ticketSelection = -1;
var text = "Here's the ticket reader.";
var hasTicket = false;
var NLC = false;
var em;

function start() {
	cm.sendSimple("选择你的目的地。\n\r\n#L0##b废都广场站#l\n\n\r\n#L1#进入工地地铁#l\r\n#L2#新叶城#l");
}

function action(mode, type, selection) {
    em = cm.getEventManager("Subway");
    
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		var em = cm.getEventManager("KerningTrain");
                if (!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("请稍后再试.");
                }
                
        	cm.dispose();
        	return;
        } else if (selection == 1) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += " 马上就会出发，你打算去哪里？#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("你好像没有票!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 2) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("你好像没有票！你可以从贝尔那里买一张.");
	    		cm.dispose();
	    		return;
        	}
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("看来这趟车有足够的空间。请把票准备好，我好让你进去。这趟车时间会很长，但你会很好地到达目的地。你怎么认为？你想搭这趟车吗?");
            } else {
                cm.sendNext("我们将在出发前一分钟开始检票。请耐心等待几分钟。请注意，地铁会准时出发，而且我们会在1分钟前停止收票，所以请务必准时到达.");
                cm.dispose();
                return;
            }
        }
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(103000897 + (ticketSelection * 3), "st00");  // thanks IxianMace for noticing a few scripts having misplaced warp SP's
                hasTicket = false;
                cm.dispose();
                return;
            }
    	}
        
	if (cm.haveItem(4031711)) {
            if(em.getProperty("entry") == "false") {
                cm.sendNext("我们将在出发前一分钟开始检票。请耐心等待几分钟。请注意，地铁会准时出发，而且我们会在1分钟前停止收票，所以请务必准时到达.");
            }
            else {
                cm.gainItem(4031711, -1);
                cm.warp(600010004);
            }
            
            cm.dispose();
            return;
        }
    }
}