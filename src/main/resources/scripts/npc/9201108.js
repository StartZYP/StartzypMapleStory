/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("һ����˵�е��ػ����ڵ����㡣�׵������������һ�����ɫ���ػ��ߣ��������ħ����������ì����������һ�ж������к�ǿ�ĵֿ�������������������Ƿ��ļ��������ֺ�Ů�ˣ���Ϊ�޿�����Ĺ�����ʦ�������ʹ������ǿ��Ĺ���������ʩ����쫷��ٵ��̴�֮�������ݻ����ǿ�����������﹭���ֵ����Ի������֮����ף����ˣ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("��������Ψһ��֪����ʥ������֮һ���Ǹ�Ҫ����������Ӣ��֮һ���ر�ֵ��һ���������ϰ�װ�ɫ�ͽ�ɫ��ս����������˵����һ��ǿ���Ů��ף��������Ŀ���ڳ������Ϸǳ���ȷ�����򡰴�����֮�����͡������ˡ������ܾ�η������Ӣ�۹Ȼ�������̨�硣");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030540) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001258, 1)) {
                                        cm.gainItem(4001258, 1);
                                        cm.sendOk("Good job.");
                                        
                                        stgStatus += (1 << jobNiche);
                                        eim.setIntProperty("glpq5_room", stgStatus);
                                } else {
                                        cm.sendOk("������ı��������ڳ��ռ䡣.");
                                }
                        } else {
                                cm.sendOk("������������Ѿ��ҵ��ˡ�");
                        }
                } else {
                        cm.sendOk("���������ػ��ߡ�");
                }
                cm.dispose();
        }
}