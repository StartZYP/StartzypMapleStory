/* @Author SharpAceX
*/

function start() {
	switch(cm.getPlayer().getMapId()) {
		case 610030500:
        		cm.sendOk("ÿһ��������֪������õĹ���������Զ�������ġ����ԣ�Ϊ����õ�˵����һ�㣬�㽫��һ����ƽ̨�ͱڼܵķ������ֻ�ܴҴ�ææ���ߵ�����Լ��������ذ�׻�צ�ӱ�����Զ���ϵ��۾��������е��۾����������󣬰�С͵�ĵ�����ң�������ԭʼצ��ף����ˣ�");
			break;
		case 610030000:
			cm.sendOk("������Ϊ��Ӱ�����ӡ��ĵ���ӵ�г�����ٶȺ��������̳�ذ�׺ͳ���״צ����Ϊ��˹˳�ضӵ�һ����ְ��Ա�����������ױȵ�����ҹ���������������ӵ�С����Ĵ���������������ķɭ���Ͷ��޸��һ��ս���з�չ�����ģ����ǳ�ս���У��Ͷ��޸������֮�죬�����ڰͶ��޸�Ĺ���ֻ�����˺䶯������Ҳż��Ϊ��Щ�������ҵ��˱��ݡ�Ѱ�ء���");
			break;
		case 610030530:
			if (cm.isAllReactorState(6108004, 1)) {
                                var eim = cm.getEventInstance();
                                var stgStatus = eim.getIntProperty("glpq5_room");
                                var jobNiche = cm.getPlayer().getJob().getJobNiche();

                                if ((stgStatus >> jobNiche) % 2 == 0) {
                                        if(cm.canHold(4001256, 1)) {
                                                cm.gainItem(4001256, 1);
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
				cm.sendOk("ȥ�ɣ�����Ļ����Դݻ����о�����۾���С͵ͬ�顣�������˾����һ㱨��");
			}
			break;
	}
	cm.dispose();
}