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
    var jobStyle = 2;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("��á�");
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
		    cm.sendNext("�¶�����");
	    cm.dispose();
		return;
	}
	if (actionx["Mental"]){
	    if (status == 0)
		    cm.sendNext("�ܺõ�����˲��Ե������֡������ǵػش������е����⡣�ұ���˵������������ֳ����ǻ�ˮƽ������������̵�ӡ�����Ȱ������ݸ��ң�Ȼ������������һ����");
		else if (status == 1)
			cm.sendYesNo("���ԣ����ڣ��㽫ͨ���ұ��һ����ǿ���ð�ռҡ����������������֮ǰ����ȷ����ļ��ܵ��Ѿ�������ʹ�ã���������Ҫ�þ����м��ܵ㣬ֱ��70�������ܽ��е�����תְ��Ŷ����Ȼ���Ѿ�ѡ���˵ڶ���תְ��ְҵ����Ͳ�����Ϊ����תְ��ְҵ����ѡ���ˡ��������ھ͵�����תְ��");
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
                        
			if(Math.floor(cm.getJobId() / 10) == 21) cm.sendNext("��ϲ�㣬��������һ��#b�𶾷�ʦ#k��.�¼��������µĺ͸Ľ��Ļ��ڻ�Ͷ�ҩ�ķ���Ϊ��ɫ���Լ�����#bħ������#k(�Ľ��Ļ���Ԫ�صķ���)��#bħ����#k(��߹��������������ٶ�)�����������Ч�Ĺ������������������#b��Ȼ������#k(ʹ����ĳЩ����Ԫ�صĹ����б�ø�ǿ)��#b��ӡ��#k(��ס����)������������ʦ��һ�����㣺����ֵ���㡣");
                        else if(Math.floor(cm.getJobId() / 10) == 22) cm.sendNext("��ϲ�㣬��������һ��#b���׷�ʦ#k��.�¼��������ɫ���µĺ͸Ľ��ı������編�����Լ�����#bħ������#k(�Ľ��Ļ���Ԫ�صķ���)��#bħ����#k(��߹��������������ٶ�)�����������Ч�Ĺ������������������#b��Ȼ������#k(ʹ����ĳЩ����Ԫ�صĹ����б�ø�ǿ)��#b��ӡ��#k(��ס����)������������ʦ��һ�����㣺����ֵ���㡣");
                        else cm.sendNext("��ϲ�㣬��������һ��#b��˾#k��.�¼�������ص����µĺ͸Ľ�����ʥ�����#bʥ��#k��#bʥ���ٻ�#k,�Լ�����#bʱ����#k(����ͨ����������ʱ����)��#b��ʥ��#k(�õ�����ľ���ֵ)���ܶ����������Ҫ��������#b�׶���#k(�ѹ�������ţ)�ȡ��Ա�����ְҵ����ʦħ��ʦ�бȽ������ְҵ��");
		} else if (status == 3) {
		    cm.sendNextPrev("��Ҳ������һЩ���ܵ������ֵ���⽫�����㿪ʼ����������ĳ���һ��ǿ���ħ��ʦ�����������ס����ʵ���罫�ȴ���ĵ��������и����ѵ��ϰ�Ҫ�˷���һ��������㲻��ѵ���Լ�ȥ���ߵĵط�����ô��ֻ�������������ҡ��һ���������㡣");
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
	    cm.sendNext("ȥ��#b#p1032001##k�Ի�������#b#t4031057##k����������.");
		cm.dispose();
	} else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0){
	    cm.sendNext("ȥ��#b#p2030006##k�Ի�������#b#t4031058##k����������.");
		cm.dispose();
	} else {
	    if (sel == undefined)
		    sel = selection;
	    if (sel == 0){
	        if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0){
	            if (status == 0)
	                cm.sendYesNo("��ӭ�㣬����#b#p2020009##k,ħ��ʦ�Ľ̹�,Ը�����������˷����ҵĽ�ͷ֪ʶ�ͼ���������ƺ��Ѿ�׼���ô�Ծ����׼��ӭ�ӵ�������ְ����ս��̫��ħ��ʦ�������ߣ��޷��ﵽ����ְҵתְ�ı�׼�����أ���׼���ý��ܿ��鲢��õ�����תְ����");
	            else if (status == 1){
		            cm.getPlayer().setPartyQuestItemObtained("JB3");
	                cm.sendNext("�ܺá��㽫����ħ��ʦ������Ҫ����Ŀ��飺�������ǻۡ������ڸ������һ�²��Ե������֡��㻹�ǵ�ħ�����ֵ�#b#p1032001##k��?ȥ��������������㿼��ǰ�벿�ֵ�ϸ�ڡ����������Ȼ���#p1032001#k��#b#t4031057##k����������.");
	            } else if (status == 2)
	                cm.sendNextPrev("ֻ����ͨ�������岿�ֵĲ��ԣ������ֵĲ��Բ��ܿ�ʼ��#b#t4031057##k��֤����ȷʵͨ���˿��ԡ��һ���#b#p1032001##k������в��ԡ����㵽��Ŀ�ĵ�֮ǰ������׼�����ⲻ���ף����Ҷ����м�������ġ�ף����ˡ�");
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