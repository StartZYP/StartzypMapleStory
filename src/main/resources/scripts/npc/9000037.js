/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @author: Ronan
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
*/

var status = 0;
var state;
var em = null;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;
    
    for(var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());
    
    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if(midLevel <= 20) lobby = 0;
    else if(midLevel <= 40) lobby = 1;
    else if(midLevel <= 60) lobby = 2;
    else if(midLevel <= 80) lobby = 3;
    else if(midLevel <= 90) lobby = 4;
    else if(midLevel <= 100) lobby = 5;
    else if(midLevel <= 110) lobby = 6;
    else lobby = 7;
        
    return lobby;
}

function start() {
	status = -1;
        state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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
                        if(state == 3) {
                                if(cm.getEventInstance().getProperty("clear") == null) {
                                        cm.getEventInstance().clearPQ();
                                        cm.getEventInstance().setProperty("clear", "true");
                                }
                            
                                if(cm.isEventLeader()) {
                                        cm.sendOk("������һ·�������������˾��˵�׳�٣�#b���������е�BOSS#k, ��ϲ��!�����һ����㱻�ͳ�ȥ��ʱ����㽱������");
                                }
                                else {
                                        cm.sendOk("������ #b�������е�BOSS#k ����������£���ϲ��! �����ڻ�õ�һ������������ı�����ƥ��Ľ�������Ϊ���Ͽ����ˡ�");
                                }
                        }
                        else if(state == 2) {
                                if(cm.isEventLeader()) {
                                        if(cm.getPlayer().getEventInstance().isEventTeamTogether()) {
                                                cm.sendYesNo("��Ķ���׼���ý�����һ���׶�����?�������Ϊ���Ѿ�����ˣ���ô���ھ���ʱ���ˡ����ڣ���������������?");
                                        }
                                        else {
                                                cm.sendOk("��ȴ������Ŷ�������װ���ټ�����");
                                                cm.dispose();
                                                return;
                                        }
                                }
                                else {
                                        cm.sendOk("�����ǵĶӳ��������룬���Ҽ����������о���̫�ã���Ҫ���������������ţ���ᱻ���ͳ�ȥ�������Ϊ������ôԶ��ʧȥ������");
                                        cm.dispose();
                                        return;
                                }
                        } else if(state == 1) {
                                cm.sendYesNo("����������������?");
                        }
                        else {
                                em = cm.getEventManager("BossRushPQ");
                                if(em == null) {
                                        cm.sendOk("��������δ֪����,�޷�����.����ϵ����Ա");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                                
                                cm.sendSimple("#e#b<�������ǿ��ѵ��>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n����Ը��Ͷ�Ա��һ�����̽�����񣬻������㹻�������������?����Ķӳ�����̸̸�����߸��Լ�����һ�����顣#b\r\n#L0#����μ�ǿ������.\r\n#L1#����" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "����" : "����") + "��������д�.\r\n#L2#����֪�������ϸ�ڡ�");
                        }
                } else if (status == 1) {
                        if(state == 3) {
                                if(!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                                        cm.sendOk("����������ı��������������ϰ���һ����λ��");
                                        cm.dispose();
                                        return;
                                }
                                
                                cm.warp(970030000);
                                cm.dispose();
                        } else if(state == 2) {
                                var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                                cm.getPlayer().getEventInstance().restartEventTimer(restSpot * 4 * 60000);  // adds (restspot number * 4) minutes
                                cm.getPlayer().getEventInstance().warpEventTeam(970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot));
                                
                                cm.dispose();
                        } else if(state == 1) {
                                cm.warp(970030000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("ֻ�е�����һ���Ŷ��У�����ܲ����Ŷ�����.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("���ǵĶӳ��������̸̸���ܿ�ʼ�������");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        var lobby = detectTeamLobby(eli), i;
                                                        for(i = lobby; i < 8; i++) {
                                                                if(em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) break;
                                                        }
                                                        
                                                        if(i == 8) {
                                                                cm.sendOk("��һ���Ѿ������� #rǿ��ѵ����ս#k �����Ƶ�����볢����һ��Ƶ������ȴ���ǰ����ս������");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("�㻹���ܿ�ʼ����Ŷ�������ΪҪô��Ķ�Ա���ڷ�Χ�ڣ�Ҫô����Ŷӳ�Աû���ʸ��ԣ�Ҫô���ǲ��ڵ�ͼ�ϡ��������Ѱ�Ҷ���ʱ�������ѣ������������ѡ�");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("����������״̬��: #b" + (psState ? "����" : "����") + "#k. ��ʲôʱ���뻻��ʲôʱ�����˵��");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<�������ǿ��ѵ��>#k#n\r\n���Ը��ص��¸ҵ�ð�ռ���������������ǵ�ս�����ܺ���������Ϊ���ǽ��������ð�������ǿ���boss��������ð�ռ��������������߶��Գе����еĸ������������е���ҫ����ȡ�����㡣̽�նӽ�����̽���ߵ���ľ��������Ӧ�Ľ�����̽�ն��е�����һ����Ա����ö���Ľ�������Щ����������̽�ս���ʱ����.\r\n\r\n�������Ҳ֧�ֶ�����˵��ƥ�䲻ͬ������Ŷ�:��������и��õĻ���Ѹ��Ϊ����Ŷӽ���һ�����飬����Ժ͵ͼ�������һ�������");
                                        cm.dispose();
                                }
                        }
                }
        }
}