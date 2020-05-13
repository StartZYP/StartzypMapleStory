/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
*/

var status = 0;
var em = null;

function start() {
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
                
                if (status == 0) {
                        em = cm.getEventManager("LudiPQ");
                        if(em == null) {
                                cm.sendOk("��������δ֪����,�޷�����.����ϵ����Ա");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<���̽����ʱ���ѷ�>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n�㲻��һ����ǰ������Ϊ�����зǳ�Σ�յ������Ը�����Ա�����������������������ԣ���#b�ӳ�#k����˵��.#b\r\n#L0#����̽��ʱ���ѷ졣\r\n#L1#�Һ�����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����":"����") + "�������.\r\n#L2#����֪�������ϸ��.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("��ֻ���ڴ������߲���һ�������ſ�����ս.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("������ǵĶӳ�����̸̸���ܿ�ʼ��ε���ս��");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("��ǰƵ��������������Ƶ���Ͻ���#r�������#k���볢����һ��Ƶ������ȴ���ǰ�Ķ��������ս��");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("�㻹���ܿ�ʼ������������ΪҪô��Ķ��鲻�ڵȼ���Χ�ڣ��������һЩ��Աû���ʸ��ԣ��������ǲ��������ͼ��");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("���Ķ���״̬��:#b"+ (psState ? "����":"����") +"#k.��ʲôʱ���뿪ʼ�����˾͸���˵.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<���̽����ʱ���ѷ�>#k#n\r\nʱ���ѷ��Ѿ������� #b#m220000000#!#k ����������Ҫ�¸ҵ�ð�ռ���������ֵĹ�����У��Ҽ����ɿ��Ķ���#m220000000#!�����ͨ�����ܹ���ͽ��յĲ�ͬ�׶Σ�����սʤ#r#o9300012##k.");
                                cm.dispose();
                        }
                }
        }
}