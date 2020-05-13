/*
  Growlie (that fatass uhh.. hungry lion or whatever)
  FightDesign @RageZONE

  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
        eim.setProperty(stage + "stageclear", "true");
        eim.showClearEffect(true);

        eim.giveEventPlayersStageReward(stage);
}

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0) {
                cm.dispose();
                return;
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 0)
                        status += ((chosen == 2) ? 1 : -1);
                else
                        status++;
                    
                if (status == 0) {
                        if (cm.isEventLeader()) {
                                cm.sendSimple("����!���Ǹ���������ʱ׼����������ط���ʲô����㴵����?\r\n#b#L0# �����������ʲô�ط���#l\r\n#L1# �Ҵ����� #t4001101#.#l\r\n#L2# �����뿪����ط���#l");
                        } else {
                                cm.sendSimple("����!���Ǹ���������ʱ׼����������ط���ʲô����㴵����?\r\n#b#L0# �����������ʲô�ط���#l\r\n#L2# �����뿪����ط���#l");
                        }
                } else if (status == 1) {
                        if (chosen == -1)
                                chosen = selection;
                        if (chosen == 0) {
                                cm.sendNext("ÿ����Բ֮ҹ���㶼����������Ʒ����������������⡣");
                        } else if (chosen == 1) {
                                if (cm.haveItem(4001101, 10)) {
                                        cm.sendNext("Ŷ�����ⲻ�����������������?����׸�ݸ��ҡ��š�����Щ�������ܺóԡ��´��������Ұ� #b#t4001101##k. �ؼ�һ·ƽ����!");
                                } else {
                                        cm.sendOk("�ҽ�������һ�£�ȷ����ȷʵ�Ѿ��ռ����� #b10 #t4001101#s#k.");
                                        cm.dispose();
                                }
                        } else if (chosen == 2) {
                                cm.sendYesNo("��ȷ��Ҫ����?");
                        }
                        else {
                                cm.dispose();
                                return;
                        }
                } else if (status == 2) {
                        if (chosen == 0) {
                                cm.sendNextPrev("����Ƭ����ı�����Ҷ�����ռ������������ӣ��������������¸����ĸ������Ϳ��Կ����������ˡ���������6�֣�ÿһ�ֶ���Ҫ��ͬ�ĵ��������������뻨����������Ӧ��");
                        } else if (chosen == 1) {
                                cm.gainItem(4001101, -10);

                                var eim = cm.getEventInstance();
                                clearStage(1, eim);

                                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                                map.killAllMonstersNotFriendly();

                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                if (mode == 1) {
                                        cm.warp(910010300);
                                } else {
                                        cm.sendOk("����ø����ռ�һЩ��ζ����⣬��Ϊʱ�䲻���ˣ�������!");
                                }
                                cm.dispose();
                        }
                } else if (status == 3) {
                        if (chosen == 0) {
                                cm.sendNextPrev("��ӣ�ݻ�ʢ����ʱ�����¾ͻ�������ʱ�����þͻ���֣���ʼ����ĥ�̡���������Ǵ�ܹ����ȷ�������ÿ��Լ��о�������õ���⡣");
                        }
                } else if (status == 4) {
                        if (chosen == 0) {
                                cm.sendNextPrev("����Ϊ�����ĵ�Ա����������10���׸⡣��ǿ�ҽ������ڹ涨��ʱ���ڸ������׸⡣");
                        }
                } else {
                        cm.dispose();
                }
        }
}