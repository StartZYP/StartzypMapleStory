/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
*/

var status = 0;
var mapid;

function start() {
        mapid = cm.getPlayer().getMapId();
    
	status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                if(status == 0) {
                        var ellinStr = ellinMapMessage(mapid);
                    
                        if(mapid == 930000000) {
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000300) {
                            var eim = cm.getEventInstance();
                            
                            if(eim.getIntProperty("statusStg4") == 0) {
                                eim.showClearEffect(cm.getMap().getId());
                                eim.setIntProperty("statusStg4", 1);
                            }
                            
                            cm.sendNext(ellinStr);
                        } else if(mapid == 930000400) {
                            if (cm.haveItem(4001169, 20)) {
                                if(cm.isEventLeader()) {
                                    cm.sendNext("Ŷ��������ˣ��������ڿ��Լ����ˣ�����?");
                                } else {
                                    cm.sendOk("����������ǣ����㲻�Ƕӳ������öӳ��Ѷ���ݸ���...");
                                    cm.dispose();
                                    return;
                                }
                            } else {
                                if(cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
                                    cm.sendNext(ellinStr);
                                    
                                    cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
                                    status = -1;
                                } else {
                                    var mobs = cm.getMap().countMonsters();
                                
                                    if(mobs > 0) {
                                        if (!cm.haveItem(2270004)) {
                                            if(cm.canHold(2270004, 10)) {
                                                cm.gainItem(2270004, 10);
                                                cm.sendOk("����� 10�� #t2270004#. ����, #r���� #o9300174##k ����������ֵ����ʱ��ʹ���Ҹ������Ʒ����׽����.");
                                                cm.dispose();
                                                return;
                                            } else {
                                                cm.sendOk("���յ�������֮ǰ����������ʹ�ñ����������ռ�!");
                                                cm.dispose();
                                                return;
                                            }
                                        } else {
                                            cm.sendYesNo(ellinStr + "\r\n\r\n�����������뿪�����������ǣ�Ҳ����Ķ��ѻ��ڳ����������.");
                                        }
                                    } else {
                                        cm.sendYesNo("����ץ�������е�#o9300174#. ������Ķӳ��� #b20�� #t4001169##k ������." + "\r\n\r\n�����������뿪����#k? ���������ǣ�Ҳ����Ķ��ѻ��ڳ����������.");
                                    }
                                }
                            }
                        } else {
                            cm.sendYesNo(ellinStr + "\r\n\r\n�����������뿪�����������ǣ�Ҳ����Ķ��ѻ��ڳ����������.");
                        }
                } else if(status == 1) {
                        if(mapid == 930000000) {
                        } else if(mapid == 930000300) {
                            cm.getEventInstance().warpEventTeam(930000400);
                        } else if(mapid == 930000400) {
                            if(cm.haveItem(4001169, 20) && cm.isEventLeader()) {
                                cm.gainItem(4001169, -20);
                                cm.getEventInstance().warpEventTeam(930000500);
                            } else {
                                cm.warp(930000800, 0);
                            }
                        } else {
                            cm.warp(930000800, 0);
                        }
                        
                        cm.dispose();
                }
        }
}

function ellinMapMessage(mapid) {
    switch(mapid) {
	case 930000000:
	    return "��ӭ��������ɭ�֡�������ڼ���.";
	    
	case 930000100:
	    return " #b#o9300172##k �Ѿ�ռ����������������Ǳ�������������Щ����Ⱦ�Ĺ�����ܼ���ǰ.";
	    
	case 930000200:
	    return "һ������ٵ�ס��ǰ���·��Ϊ����������ϰ������Ǳ����һ�#b#o9300173##k ����ֹ���������ļ�����Ȼ������Ȼ״̬�µĶ�ҩ�ǲ��ܴ���ģ���Ϊ��̫Ũ��. ������Ҫ�� #bȪˮ#k �Ǳ�ϡ��.";
	    
	case 930000300:
            return "̫���ˣ����ҵ����ˡ��������ڿ��Լ�������ɭ��.";
	    
	case 930000400:
	    return "#b#o9300175##k�ӹ������������Ȼ�����ǲ�����ͨ�Ĺ��Ȼ��ܿ����������ͨ��������ħ������û���κ��˺������Ǳ��뾻��������Щ����Ⱦ�Ĺ���#b#t2270004##k! ������鳤������20�����ﶾ��.";
	    
	case 930000600:
	    return "ɭ����������ĸ�Դ���ѵõ���ħ��ʯ���ڼ�̳�ϣ��Լ�׼��!";
	    
	case 930000700:
	    return "�����������������ˣ��ǳ���л�㾻����ɭ��!!";
	    
    }
}