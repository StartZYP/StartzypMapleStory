/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Magician Job Instructor
	Magician 2nd Job Advancement
	Victoria Road : The Forest North of Ellinia (101020000)
*/

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
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.isQuestCompleted(100007)) {
                            cm.sendOk("�����Ǹ�Ӣ�ۣ�");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100006)) {
                            cm.sendNext("�ðɣ��������ȥ���������Ĺ���ռ�30�����飬Ȼ����ҵ�һ��ͬ��������̸һ̸���������#bӢ�۵�֤��#k��ף����ˡ�");
                            status = 4;
                        } else if (cm.isQuestStarted(100006)) {
                            cm.sendNext("��...�϶����Ƿ��š�#k...������ǧ������������μӿ��ԣ�����Ϊħ��ʦ��õڶ���תְ���ðɣ������������һ�²��ԡ������̫�࣬û��ô���ӡ�");
                        } else {
                            cm.sendOk("һ����׼�����ˣ��ҿ��Դ���ȥ��");
                            cm.dispose();
                        }
                }
                else if(status == 1)
                        cm.sendNextPrev("�һ�����ȥ�����صĵ�ͼ����ῴ��ƽʱ�������Ĺ�����ǿ���������ͨ��һ������̬����ȫ��ͬ�����ǼȲ��������ľ���ˮƽ��Ҳ����Ϊ���ṩ��Ʒ��");
                else if (status == 2)
                        cm.sendNextPrev("����Դӹ�����#b#t4031013##k������һ����������ӣ���������а��а���˼�����ɵġ��ռ�30����Ȼ��ȥ���ҵ�ͬ��̸̸����Ϳ���ͨ�����ԡ�");
                else if (status == 3)
                        cm.sendYesNo("һ�����ȥ����Ͳ����뿪������������������������ˣ���ľ���ˮƽ�ή�͡���������������׼�����ˡ��ðɣ��������ھ�ȥ��");
                else if (status == 4) {
                        cm.sendNext("�ðɣ��������ȥ���������Ĺ���ռ�30�����飬Ȼ����ҵ�һ��ͬ��������̸�����������#bӢ�۵�֤��#k, ף����ˡ�");
                        cm.completeQuest(100006);            
                        cm.startQuest(100007);
                        cm.gainItem(4031009, -1);
                }
                else if (status == 5) {
                        cm.warp(108000200, 0);
                        cm.dispose();
                }
                else cm.dispose();
        }
}
