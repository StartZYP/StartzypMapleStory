/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("��Ϊһ��ǿ���ħ����ʦ������֪���ǻ۵ļ�ֵ��һ����ʦ�ı�־��Ʒ�ʡ���ˣ���ʦ����һ��Ť�����Թ��������˹���ĸ�������ͼ�������������Ψһ����ʹ�õļ��ܣ���ħצ��Ψһ���Դ��Ƶ���ļ��ܡ��㻹����ɱ���������������������Թ����������������еĵ��˺��ƶϳ��ĸ���ʦ���������˵�һħ���Ȳ�������Ի������ף����ˣ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("��쳶����������Զ�����Ǽ�ס������һ���ǳ���������ʦ��ͬʱҲ������ħ���������Ӧ�������Ӧ������Ҫ�Ĵ�ʦ������֮�⣬�����Ǿ�ͨ����Ԫ�صġ���Ӣ��ʦ��֮һ�������һ�α���������Ѱ�ҡ�Ԫ��֮�����������ֵĿ������Ǿ��ӡ�����");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030521) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001257, 1)) {
                                        cm.gainItem(4001257, 1);
                                        cm.sendOk("Good job.");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("������ı������ڳ��ռ䡣");
                                }
                        } else {
                                cm.sendOk("������������Ѿ��ҵ��ˡ�");
                        }
                } else {
                        cm.sendOk("�������й��");
                }
                cm.dispose();
        } /* else if (cm.getPlayer().getMapId() == 610030522) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        cm.warp(610030522,0);
                } else {
                        cm.sendOk("�������й��");
                }
                cm.dispose();
        }
        */
}