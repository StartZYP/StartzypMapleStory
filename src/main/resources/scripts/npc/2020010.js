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

//** Archer 3rd Job Instructor Rene

status = -1;
var job;
var sel;
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 3;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("���.");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
	    actionx["Mental"] = true;
	else if (cm.haveItem(4031057))
	    actionx["Physical"] = true;
    cm.sendSimple("���ܰ������?#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#������е�����תְ." : "") + "\r\n#L1#���������������.");
}

function action(mode, type, selection){
    status++;
	if (mode == 0 && type == 0) {
	    status -= 2;
	} else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
	    if (mode == 0 && type == 1)
		    cm.sendNext("�¶�����.");
	    cm.dispose();
		return;
	}
	if (actionx["Mental"]){
	    if (status == 0)
		    cm.sendNext("�ܺõ�����˲��Ե������֡������ǵػش������е����⡣�ұ���˵������������ֳ����ǻ�ˮƽ������������̵�ӡ�����Ȱ������ݸ��ң�Ȼ�������ٿ�ʼ��һ��.");
		else if (status == 1)
			cm.sendYesNo("���ԣ����ڣ��㽫ͨ���ұ��һ����ǿ��Ĺ����֡�����������֮ǰ����ȷ�����ļ��ܵ��ѱ�����ʹ�ã�������Ҫʹ���������м��ܵ��õģ�ֱ��70����Ŷ����Ȼ���Ѿ�ѡ���˵ڶ�ְҵ��·����Ͳ�����Ϊ����ְҵѡ���ˡ��������ھ�����");
		else if (status == 2) {
		    if (cm.getPlayer().getRemainingSp() > 0)
			    if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
				    cm.sendNext("���ڼ���֮ǰʹ�������еļ��ܵ㡣");
					cm.dispose();
					return;
				}
		    if (cm.getJobId() % 10 == 0) {
		        cm.gainItem(4031058, -1);
		        cm.changeJobById(cm.getJobId() + 1);
				cm.getPlayer().removePartyQuestItem("JBQ");
			}
                        
			if(Math.floor(cm.getJobId() / 10) == 31) cm.sendNext("��ϲ�㣬��������#b����#k��. ��������Ҫ���յļ���֮һ��#b�ᴩ��#k���������ֽ����������#b�һ��#k����������ʱ�Թ�����л��ڻ����Ĺ����������ܾ���#b������#k(�ٻ����������������ע����)��#b��ӥ�ٻ�#k(�ٻ�һֻ�����������ӥ)���ӹ����ֵ�Զ�̹����ȼ���");
                        else cm.sendNext("��ϲ�㣬��������#b����#k��.��������Ҫ���յļ���֮һ��#b�ᴩ��#k���������������������#b������#k����������ʱ�Թ�����б����Թ�������������#b������t#k(�ٻ����������������ע����)��#b��ӥ�ٻ�#k(�ٻ�һֻ��������Ľ�ӥ)���ӹ����ֵ�Զ�̹����ȼ���");
		} else if (status == 3) {
		    cm.sendNextPrev("��Ҳ������һЩ���ܵ������ֵ���⽫�����㿪ʼ����������ĳ���һ��ǿ���սʿ�����������ס����ʵ���罫�ȴ���ĵ��������и����ѵ��ϰ�Ҫ�˷���һ��������㲻��ѵ���Լ�ȥ���ߵĵط�����ô��ֻ�������������ҡ��һ���������㡣");
		}
	}else if (actionx["Physical"]){
	    if (status == 0)
	        cm.sendNext("�ܺõ�����˲��Ե������֡��Ҿ�֪��������������Ȼ���Ѿ�ͨ�����ϰ벿�ֵĿ��ԣ��������°벿�֡����Ȱ��������ҡ�");
		else if (status == 1){
		    if (cm.haveItem(4031057)){
		        cm.gainItem(4031057, -1);
				cm.getPlayer().setPartyQuestItemObtained("JBQ");
			}
			cm.sendNextPrev("���ǿ��Եĺ�벿�֡�������Խ��������Ƿ��㹻�������ܹ���������ɹ�����һ�����ڱ���ѩ���ѩԭ����һ����ѩ���ǵĺڰ����򣬽���ʥ�أ������ﶼ�޷��������������������һ��޴��ʯͷ������ʥʯ������Ҫ�ṩһ���������Ŀ��Ϊ��Ʒ��Ȼ��ʥʯ����������ǻۡ�");
		} else if (status == 2)
		    cm.sendNextPrev("����Ҫ��ʵ���ᶨ�ػش�ÿһ�����⡣�������ȷ�ش������е����⣬��ôʥʯ����ʽ�����㲢���㽻����#b#t4031058##k.�������û������һ�����ߵ���һ����ף����ˡ�");
	} else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0){
	    cm.sendNext("ȥ��#b#p1012100##k�Ի�������#b#t4031057##k����������.");
		cm.dispose();
	} else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0){
	    cm.sendNext("ȥ��#b#p2030006##k�Ի�������#b#t4031058##k����������.");
		cm.dispose();
	} else {
	    if (sel == undefined)
		    sel = selection;
	    if (sel == 0){
	        if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
	            if (status == 0)
	                cm.sendYesNo("��ӭ�㣬����#b#p2020010##k,�����ֵĽ̹�,Ը������ЩԸ���������˷����ҵ�ͷ��֪ʶ�ͼ���������ƺ��Ѿ�׼���ñ�ø�ǿ�ˣ�׼��ӭ�ӵ�������ְ����ս��̫��Ĺ�������ȥ�Ҵң��޷��ﵽ������תְ�ı�׼�����أ���׼���ý��ܿ��鲢��õ�����תְ����");
	            else if (status == 1){
		            cm.getPlayer().setPartyQuestItemObtained("JB3");
	                cm.sendNext("�ܺá��㽫�ܵ�������Ҫ����Ŀ��飺�������ǻۡ������ڸ������һ�²��Ե������֡��㻹�ǵ����ִ��#b#p1012100##k��?ȥ��������������㿼��ǰ�벿�ֵ�ϸ�ڡ����������Ȼ���#p1012100#k��#b#t4031057##k����������.");
	            } else if (status == 2)
	                cm.sendNextPrev("ֻ����ͨ�������岿�ֵĲ��ԣ������ֵĲ��Բ��ܿ�ʼ��#b#t4031057##k��֤����ȷʵͨ���˿��ԡ��һ���#b#p1012100##k������в��ԣ�������׼�����ⲻ���ף����Ҷ����м�������ġ�ף����ˡ�");
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
