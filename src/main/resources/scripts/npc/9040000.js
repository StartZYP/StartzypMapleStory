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
 * @npc: Shuang
 * @map: Victoria Road: Excavation Site<Camp> (101030104)
 * @func: Start Guild PQ
*/

var status = 0;
var sel;
var em = null;

function findLobby(guild) {
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
                var lobby = iterator.next();
                
                if(lobby.getIntProperty("guild") == guild) {
                        if(lobby.getIntProperty("canJoin") == 1) return lobby;
                        else return null;
                }
        }
        
        return null;
}

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
                        em = cm.getEventManager("GuildQuest");
                        if(em == null) {
                                cm.sendOk("����������ִ���.");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#e#b<��������: ʥ��������ַ>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n ������ͨ����������ս��·������μ���#b\r\n#L0#��Ҫ�ٰ��������ս#l\r\n#L1#��Ҫ�μӼ�������ս#l\r\n#L2#ʲô�Ǽ�������ս��#l");
                } else if (status == 1) {
                        sel = selection;
                        if (selection == 0) {
                                if(!cm.isGuildLeader()) {
                                        cm.sendOk("ֻ�м����峤���峤���ܿ�ʼ�������.");
                                        cm.dispose();
                                } else {
                                        if(em.isQueueFull()) {
                                                cm.sendOk("��Ƶ���ϵĶ�������,�����Ƶ�������ĵȴ�һ��ʱ�������һ��.");
                                                cm.dispose();
                                        } else {
                                                var qsize = em.getQueueSize();
                                                cm.sendYesNo(((qsize > 0) ? "There is currently #r" + qsize + "#k guilds queued on. " : "") + "Do you wish for your guild to join this queue?");
                                        }
                                }
                        } else if (selection == 1) {
                                if(cm.getPlayer().getGuildId() > 0) {
                                        var eim = findLobby(cm.getPlayer().getGuildId());
                                        if(eim == null) {
                                                cm.sendOk("��ļ���Ŀǰû��ע���������.");
                                        } else {
                                                if(cm.isLeader()) {
                                                        em.getEligibleParty(cm.getParty());
                                                        eim.registerParty(cm.getPlayer());
                                                } else {
                                                        eim.registerPlayer(cm.getPlayer());
                                                }
                                        }
                                } else {
                                        cm.sendOk("��������һ������.");
                                }
                                
                                cm.dispose();
                        } else {
                                var reqStr = "";
                                reqStr += "\r\n\r\n    �Ŷ�Ҫ��:\r\n\r\n";
                                reqStr += "     - 1 ���Ŷӳ�Ա�ﵽ30������30������#k.\r\n";
                                reqStr += "     - 1 ������#r����#k���ܺ�#r���ٷ�Ӧ#k�����ķ���.\r\n";
                                reqStr += "     - 1 ������#r�����ƶ�#k��ħ��ʦ\r\n";
                                reqStr += "     - 1 ����Ա����#r�����֡��̿ͻ��ǹ��#kһ����#rԶ�̹�����#k.\r\n";
                                reqStr += "     - 1 ����Ա�߱��Ṧ�ķ���������Ь�Ļ�ǹ��.\r\n";
                            
                                cm.sendOk("#e#b<��������: ʥ��������ַ>#k#n\r\n ����ļ����Ա��������ɺ���Ի�÷������������Ի�ü�����֡�" + reqStr);
                                cm.dispose();
                        }
                } else if (status == 2) {
                        if (sel == 0) {
                                var entry = em.addGuildToQueue(cm.getPlayer().getGuildId(), cm.getPlayer().getId());
                                if(entry > 0) {
                                        cm.sendOk("����ļ���Ǽǳɹ�ʱ�������ᵯ��һ����Ϣ������ļ����˽�Ǽ�״̬.\r\n\r\n #r��Ҫ��ʾ#k: #r��Ϊ�����峤���峤������뼰ʱ���ü���Ǽǳ�Ա�����ڴ�Ƶ��#k��#b��������ִ��󣬽�ʹ��������Ǽ���Ч��������������һ��������д������񡣻���Ҫע����ǣ��ڼ���Ǽ��ڼ�δ��ʱ�������������ļ�������ͻ��������жϣ����Ƴ����С�");
                                } else if(entry == 0) {
                                        cm.sendOk("��Ƶ���ϵĶ�������,�����Ƶ�������ĵȴ�һ��ʱ�������һ��.");
                                } else {
                                        cm.sendOk("��ļ����Ѿ���һ��Ƶ���Ŷ��ˣ������ĵȴ���");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}
