

var status = 0;
var ticketSelection = -1;
var text = "Here's the ticket reader.";
var hasTicket = false;
var NLC = false;
var em;

function start() {
	cm.sendSimple("ѡ�����Ŀ�ĵء�\n\r\n#L0##b�϶��㳡վ#l\n\n\r\n#L1#���빤�ص���#l\r\n#L2#��Ҷ��#l");
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
                    cm.sendOk("���Ժ�����.");
                }
                
        	cm.dispose();
        	return;
        } else if (selection == 1) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += " ���Ͼͻ�����������ȥ���#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("�����û��Ʊ!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 2) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("�����û��Ʊ������Դӱ���������һ��.");
	    		cm.dispose();
	    		return;
        	}
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("�������˳����㹻�Ŀռ䡣���Ʊ׼���ã��Һ������ȥ�����˳�ʱ���ܳ��������ܺõص���Ŀ�ĵء�����ô��Ϊ����������˳���?");
            } else {
                cm.sendNext("���ǽ��ڳ���ǰһ���ӿ�ʼ��Ʊ�������ĵȴ������ӡ���ע�⣬������׼ʱ�������������ǻ���1����ǰֹͣ��Ʊ�����������׼ʱ����.");
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
                cm.sendNext("���ǽ��ڳ���ǰһ���ӿ�ʼ��Ʊ�������ĵȴ������ӡ���ע�⣬������׼ʱ�������������ǻ���1����ǰֹͣ��Ʊ�����������׼ʱ����.");
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