/* @Author SharpAceX
*/

function start() {
        if (cm.getPlayer().getMapId() == 610030500) {
                cm.sendOk("�������ŵ��������������κ��˶���������������սʿ���ڲ�ͬ�������ǵĸ�����־������ʤ������������ʿ�����ֵ��ף�ֱ��ʤ����������ˣ���ʿ����һ���п�ĵ�·�����䱾����Ƿ�����ģ��Լ��ڲ��ĳ�ǿ���ʹ����ļ��ܰ���Ч������������Ĺ��������ʿ���񣬲�Ҫ��������ף����ˣ�");
                cm.dispose();
        } else if (cm.getPlayer().getMap().getId() == 610030000) {
                cm.sendOk("�·���ɭ�����Ǵ����Ӣ�ۼ��壬�Ƿ籩��ʦ�Ĵ�ʼ�ˡ������ͥ�Ƕ�һ�޶��ģ���Ϊÿ�����ӻ�Ů�����̳����������ȵ�ȫ��ս�����ɡ����������Ѿ���֤���Ƿǳ����õģ���Ϊ�����������޵�ս�ԣ����˷��Ӻ�ս���������е��ˡ��������������ļ�ͥ��");
                cm.dispose();
        } else if (cm.getPlayer().getMapId() == 610030510) {
                if (cm.getPlayer().getMap().countMonsters() == 0) {
                        var eim = cm.getEventInstance();
                        var stgStatus = eim.getIntProperty("glpq5_room");
                        var jobNiche = cm.getPlayer().getJob().getJobNiche();
                    
                        if ((stgStatus >> jobNiche) % 2 == 0) {
                                if(cm.canHold(4001259, 1)) {
                                        cm.gainItem(4001259, 1);
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
                        cm.sendOk("��������糺���ʿ��");
                }
                cm.dispose();
        }
}