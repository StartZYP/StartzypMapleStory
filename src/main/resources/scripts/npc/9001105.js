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
                        if (cm.getPlayer().getMapId() == 922240200)  {
                                cm.sendOk("���ϧ��׼�����˾ͻ���.");
                        }
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.getMapId() == 922240200) {
                                cm.sendSimple("����ʲôҪ˵����...? #b\b\r\n#L0#����ȸ¸�.#l\r\n");    //#L1#I want to go to the Space Mine.#l
                        } else if (cm.getMapId() >= 922240000 && cm.getMapId() <= 922240019) {
                                cm.sendYesNo("�����ʧ���ˣ����ġ��������λ��ᡣ�㻹���������Ѿ����۲ž��˸¸£������������ֻص�ԭ����?"); 
                        } else if (cm.getMapId() >= 922240100 && cm.getMapId() <= 922240119) {
                                var text = "��Ѿ����۲ž��˸¸£������������ֻص�ԭ����. ";				
                                var rgaga = cm.getPlayer().getEvents().get("rescueGaga");
                                if (rgaga.getCompleted() > 10) {
                                        text += "�ڼӼӻ��֮ǰ���벻Ҫ������Ϊ�˱�ʾ�Ҷ���������ȡ�óɾ͵ĸ�л���Ҹ�����һ������ɴ������Ѿ����ƾ��ˣ���Ӧ�û�����ʹ�á��������#b������#k.";
                                        rgaga.giveSkill(cm.getPlayer());
                                } else 
                                        text += "�������ڻ�ȥ��.";

                                cm.sendNext(text); 
                        }
                } else {
                        if (cm.getPlayer().getMapId() == 922240200) {
                                if (status == 1) {
                                        if(selection == 0) {
                                                selected = 1;
                                                cm.sendNext("��ӭ������˵��С�����õ��£��Һܸ�������������Ϊ��������Ѱ��������Ӽ����ҵ�һ�����ѣ�����ǰ�������ң����������к������ҵ��ǣ����������˰����."); 
                                        } else {
                                                selected = 2;
                                                cm.sendYesNo("��̫�տ�������ҵ�һ������Ŀ�ʯ������#b봾���#k�����̺���̫�յ�����������#b봾���#kͨ�������ɫ�ģ������������ɴ���̫�չ������л�����ɫ����ס��Ϊ����ֹ���������˵����ѣ���Ҫ#r10����ɫ봾���#k��#r10�����봾���#k������Ȼ#b봾���#k�ܰ���æ���Ǿ;����ܶ�ذ��ҡ�Ŷ������һ���£�̫�յ����ܵ�̫�ջ��ı���������봾�������������Ƿǳ�ǿ�����Բ�Ҫ��ͼ������ǡ�ֻ��רע�ڿ����ռ�����."); 
                                        } 
                                } else if (status == 2) {
                                        if(selected == 1) {
                                                cm.sendYesNo("������ǰѼӼ����������ˣ�������µģ��һ������һ��̫�մ������������������У�������Ϳ������ȸ¸��ˡ���Ȼ����ʱ�������е�����Ѷϡ��ٶۺ����ɣ����������һ���ܺõ������ˡ���������ȥ������?");
                                        } else if(selected == 2) { 
                                                cm.sendOk("��û�б��룬f4."); 
                                                cm.dispose();
                                        }
                                } else if (status == 3) {
                                        var em = cm.getEventManager("RescueGaga");
                                        if (em == null) {
                                                cm.sendOk("���¼���ǰ������.");
                                        } else if (!em.startInstance(cm.getPlayer())) {
                                                cm.sendOk("��ͼ�����ˣ����Ժ�����.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        } else if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        }
                }
        }
}