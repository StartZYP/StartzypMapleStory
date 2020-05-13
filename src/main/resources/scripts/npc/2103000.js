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
/* Oasis near Ariant Castle
 */

importPackage(Packages.client);

function isTigunMorphed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210005;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                if(cm.isQuestStarted(3900) && cm.getQuestProgressInt(3900) != 5) {
                        cm.sendOk("#b(������������ˮ���е�������ˬ.)", 2);
                        cm.setQuestProgress(3900, 5);
                } else if(cm.isQuestCompleted(3938)) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("�㷢��һ�ͷ���������ǵٹ��ģ�Ư����ˮ���ϣ�Ȼ��ץס��������ס���#bJano#k �ϴ�������һ���µ� #t2210005#", 2);
                                }
                        } else {
                                cm.sendOk("��û���㹻�Ŀռ�.", 2);
                        }
                } else if(cm.isQuestStarted(3934) || (cm.isQuestCompleted(3934) && !cm.isQuestCompleted(3935))) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("���ں����ҵ�һ����ֵ�ƿ�ӡ�����������һ��ģ�³Ǳ������ı���ƿ��Ҳ���������������������������.", 2);
                                }
                        } else {
                                cm.sendOk("���ں��﷢����һ����ֵ�ƿ�ӡ��������������������Ϊ��û���㹻�Ŀռ��������.", 2);
                        }
                }
                
                cm.dispose();
        }
    }
}