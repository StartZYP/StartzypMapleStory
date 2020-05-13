/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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

status = -1;
var job;
var sel;
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 5;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("��ã����������");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
        actionx["Mental"] = true;
    else if (cm.haveItem(4031057))
        actionx["Physical"] = true;
    cm.sendSimple("��Ҫ������#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#����Ҫ���е�����תְ��" : "") + "\r\n#L1#���������������");
}

function action(mode, type, selection){
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
        if (mode == 0 && type == 1)
            cm.sendNext("�¶����ġ�");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]){
        if (status == 0)
            cm.sendNext("�ܺõ�����˲��Ե������֡������ǵػش������е����⡣�ұ���˵������������ֳ����ǻ�ˮƽ������������̵�ӡ�����Ȱ������ݸ��ң�Ȼ�������ٽ�����һ����");
        else if (status == 1)
            cm.sendYesNo("���ԣ����ڣ��㽫ͨ���ұ��һ����ǿ��ĺ��������������������֮ǰ����ȷ����ļ��ܵ��Ѿ�������ʹ�ã���������Ҫ�þ����еļ��ܵ㣬ֱ��70�������ܽ��е�����תְ��Ŷ����Ȼ���Ѿ�ѡ���˵ڶ�ְҵ��ְҵ��·����Ͳ�����Ϊ����ְҵ��תְѡ���ˡ��������ھ�תְ��");
        else if (status == 2) {
            if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("���ڼ���֮ǰʹ�����м��ܵ㡣");
                    cm.dispose();
                    return;
                }
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }
            
            if(Math.floor(cm.getJobId() / 10) == 51) cm.sendNext("̫���ˣ���������#b��ʿ#k��.���ڶ�ʿ, �㽫ѧϰһЩ���ս������ص���߼����ܡ�#b�������#k��һ�ּ��ܣ������㴢������������˺������յ�һ��������ʽ��������һ���������������磬�����ʹ��#b��������#k�Ե����������˺���ͬʱʹ��#b������ת#k͵����˵��������ָ����Լ���������#b���˱���#k��������ת��Ϊһ�����л����Խ�ս�����ĳ��ˣ�������ת����ͬʱ�������ʹ��#b�����#k����һ��С���𲢶���ĵ�����ɾ޴���˺���");
            else cm.sendNext("̫���ˣ���������#b��#k��.��Ϊһ���󸱣��㽫��Ϊһ�������Ļ�ǹ�֣�ÿһ����֪��ǹе�������Լ�һЩ�������ܣ�������սʤа��#b˫��ǹ���#k��һ����ǿ��İ汾��˫����������������ӵ���ͬʱ��ɸ�����˺���������Ҳ�������ٻ�һ���ҳϵ�#b������̨#k�Լ�����#b��ŷ��Ϯ#k��Ϊ�����ε����ѣ�������#b����#k��������ʱ. Ҳ����ʹ�û���Ԫ�صĹ���#b��������#k��#b��������#k.");
        } else if (status == 3) {
            cm.sendNextPrev("��Ҳ������һЩ���ܵ������ֵ���⽫�����㿪ʼ��������ȷʵ����һ��ǿ��ĺ��������������ס����ʵ���罫�ȴ���ĵ��������и����ѵ��ϰ�Ҫ�˷���һ��������㲻��ѵ���Լ�ȥ���ߵĵط�����ô��ֻ������ʱ�������ҡ��һ���������㡣");
        }
    }else if (actionx["Physical"]){
        if (status == 0)
            cm.sendNext("�ܺõ�����˲��Ե������֡��Ҿ�֪��������������Ȼ���Ѿ�ͨ�����ϰ벿�ֵĿ��ԣ��������°벿�֡����Ȱ��������ҡ�");
        else if (status == 1){
            if (cm.haveItem(4031057)){
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("���ǿ��Եĺ�벿�֡�������Խ��������Ƿ��㹻�������ܹ���������ɹ�����һ�����ڱ���ѩ���ѩԭ����һ����ѩ���ǵĺڰ����򣬽���ʥ�أ������ﶼ�޷��������������������һ��޴��ʯͷ��������ʥ��ʯͷ������Ҫ�ṩһ���������Ŀ��Ϊ��Ʒ��Ȼ����ʥ��ʯͷ����������ǻۡ�");
        } else if (status == 2)
            cm.sendNextPrev("����Ҫ��ʵ���ᶨ�ػش�ÿһ�����⡣�������ȷ�ش������е����⣬��ôʥʯ����ʽ�����㲢��#b#t4031058##k������.�������û������һ�����ߵ���һ����ף����ˡ�");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("ȥ������̸̸#b#p1090000##k������#b#t4031057##k����������.");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("ȥ������̸̸#b#p2030006##k������#b#t4031058##k����������.");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0){
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0){
                if (status == 0)
                    cm.sendYesNo("��ӭ�㣬����#b#p2020013##k, ���к��������죬�����ÿһ����Ҫ��ָ���ĺ�������õ�һ��չ�ֳ������㿴���������������Ծ���ĺ�����׼����ӭ�ӵ�����תְ����ս�����Ҽ��������ĺ�������һ��������ɡ���������ʧ���ˡ����أ���׼���ý��ܿ��鲢��õ�����תְ��");
                else if (status == 1){
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("�ܺá��㽫�ں�����������Ҫ�����ܵ����飺�������ǻۡ������ڸ������һ�²��Ե������֡����ǵ�ŵ����˹�ŵ�#b#p1090000##k��ȥ��������������㿼��ǰ�벿�ֵ�ϸ�ڡ����������Ȼ���#p1090000#k��#b#t4031057##k����������.");
                } else if (status == 2)
                    cm.sendNextPrev("ֻ����ͨ�������岿�ֵĲ��ԣ������ֵĲ��Բ��ܿ�ʼ��#b#t4031057##k��֤����ȷʵͨ���˿��ԡ��һ���#b#p1022000##k������в��ԡ����㵽��Ŀ�ĵ�֮ǰ������׼�����ⲻ���ף����Ҷ����м�������ġ�ף����ˡ�");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50){
            	cm.sendOk("���ϻ�������ս������ף��һ��˳����");
                if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            }else
                cm.sendOk("��̫�����ˣ��޷���ս#r����#k. ���ٴﵽ#b50��#k�Ժ������ҽ�̸��");
            cm.dispose();
        }
    }
}