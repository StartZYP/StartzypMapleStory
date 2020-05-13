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

/*      Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 310;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 3;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "���Ѿ����˺ܳ�һ��·�����ܴﵽ������������ǻۺ������������������������ʲô #ra NPC �ڹ�������ѵ�����ﱣ�������ڵ�����#k? ��ϲ����";
        if(spawnPnpcFee > 0) {
            sendStr += "�ҿ���Ϊ�������շ� #b " + cm.numberWithCommas(spawnPnpcFee) + "���.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("����ѡ��#r������#k����һЩ��׼��Ҫ���㣬#b����Ҫ�ﵽ10����" + cm.getFirstJobStatRequirement(jobType) + "��#k�������ǿ�����");  
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 300) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�������Ҿ�֪���������ͨ�����Եġ��ҳ��ϣ�����һ��ΰ��Ĺ����֡��һ���������ڸ�ǿ׳��������֮ǰ����������Ҫ�Ӹ��������·��ѡ��һ�����������˵�Ǹ����ѵľ��������ǡ����������ʲô����Ҫ�ʣ����ʡ�");
            else if (cm.haveItem(4031011)){
                cm.sendOk("ȥ����#b#p1072002##k.");
                cm.dispose();
            } else
                cm.sendYesNo("�š������Դ����ϴμ��������������Ѿ������˺ܶࡣ��û�п�������ǰ���������ߣ��෴�����ڿ���������һ�������֡�������أ��ѵ��㲻���ø�ǿ����ͨ��һ���򵥵Ĳ��ԣ��һ�Ϊ�����ġ����������");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 3 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("����.����ǰ,����ѩ���#b#p2020010##k����̸������.��֪����Թ����ֵ�����תְ�����Žϴ����Ȥ.Ϊ�˴ﵽ���Ŀ��,�ұ��������������������ܷ�ﵽתְҪ����ά�����ǵ���һƬ�����ɭ���м���һ������,�����������һ������ͨ��.һ������,�㽫���ҵķ���.��������Ǵ��������ȡ#b#t4031059##k��ص��ҵ����.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("Please, bring me the #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("��ϲ�㣬�������ҵķ�����ȡ#b#t4031059##k��ȫ���ء��������Ѿ�֤�����Լ�ֵ�õ����ν���������ĽǶ�������������Ӧ�ð����������� #b#p2020011##k�ڱ���ѩ����ܵڶ����ֵĲ��ԡ�ף����ˡ������Ҫ�ġ�");
        } else {
            cm.sendOk("���ѡ������ǡ�");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }
    
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("�Բ�����û���㹻�Ľ������������������õ�λ�á�");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("���㣡ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("Sorry, the Hall of Fame is currently full...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪��û�б��ѡ�񡣡���");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("һ��תְ�˾Ͳ��ܷ��ڡ�");
            } else {
                cm.sendOk("��ѵ��һ��ֱ����ﵽ����Ҫ���ҿ��Ը�����#rBowman#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1452051) && cm.canHold(2070000)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(300);
                    cm.gainItem(1452051, 1);
                    cm.gainItem(2060000, 1000);
                    cm.resetStats();
                }
                cm.sendNext("�ðɣ������￪ʼ�����Ϊ���ǵ�һ���֣��㽫....��������ѵ������ֻҪ����һ�㣬����ø�ǿ�󡣺ðɣ�ûʲô�����һ����һЩ�ҵ���������������������");
            } else {
                cm.sendNext("����ı������ڳ���ط�������̸̸��");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڱ�ø�ǿ����,�Ҹ�����һ���#b����ֵ#k. �����#b����#k �˵�����Ļ�����½�,������ʹ��SP'.����,��һ������:�㲻����һ���Ӱ�����������.Ҳ��һЩ����ֻ��������ѧ����һЩ����֮����ܻ��.");
	else if (status == 3)
            cm.sendNextPrev("���������㡣һ����ѡ���ˣ���Ͳ��ܸı����⣬����ѡ����һ��·��ȥ�ɣ���һ�������Ĺ����֡�");
        else
            cm.dispose();    
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("�ðɣ�����������������������#b[ѡ���ҵ�ְҵ].#b\r\n#L0#�����˽�����\r\n#L1#�����˽�����\r\n#L3#ѡ��ְҵ");
            else {
                cm.sendNext("�ܺõľ������㿴������ǿ׳��������Ҫ�������Ƿ�����㹻ǿ׳����ͨ�����ԣ��ⲻ��һ�����ѵĿ��ԣ�����������úܺá����������ҵ��š�����һ����Ҫ���ˣ�");
		if(!cm.isQuestStarted(100000)) cm.startQuest(100000);
	   }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031010)){
                    if (!cm.haveItem(4031010))
                        cm.gainItem(4031010, 1);
                    cm.sendNextPrev("���������͵�#b#p1072002##k������#b#m106010000##k���������Ÿ��������ʹ������������㡣ף����ˡ�");
		    cm.dispose();
		} else {
                    cm.sendNext("������ı���������һЩ�ռ䡣");
                    cm.dispose();
                }
            } else {
                if (selection < 3){
                    if(selection == 0) {    //hunter
                        cm.sendNext("ʹ�ù��Ĺ�����.\r\n\r\n#b����#k�����ڽ׶�ӵ���ŵ�Ⱥ���������,�����ٶȸ���,#b����#k��#r��ը��#k����, һ����΢��һ��ļ���,������ʹ6�����˱�����.");
                    } else if(selection == 1) {    //crossbowman
                        cm.sendNext("������Ĺ�����.\r\n\r\n#b����#k���������,��Ĺ����������ŵȼ�����߶����.#b����#k��#r��͸��#k,���Ե���Ϊ��,���ܴ�ǽ�������ĸ����ҵĹ���.");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("���ڡ��������¶�����������ѡ����ϣ��ת��ְҵ��#b\r\n#L0#����\r\n#L1#����");
            }
        } else if (status == 2){
            job += selection * 10;
            cm.sendYesNo("��������ѵڶ��ݹ�������Ϊ" + (job == 310 ? "#b����#k" : "#b����#k") + "? ��֪��һ�������������˾��ģ���Ͳ��ܷ�������ѡ������ְҵ�ˣ��԰ɣ�");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            
            cm.sendNext("�ðɣ�����ѡ��" + (job == 310 ? "#b����#k" : "#b����#k") + "�����￪ʼ��" + (job == 310 ? "#b����#k" : "#b����#k") + "������һȺ�����Ų���˼����������ܹ����ɵش̴���������ࡣ������ÿ��ѵ���Լ����һ�������ñ����ڸ�ǿ��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո�����һ����,�����г�������Ի�õļ���,����" + (job == 310 ? "hunter" : "crossbowman") + "���HP��MPҲ������.���Լ�ȥ������.");
        else if (status == 5)
            cm.sendNextPrev("��Ҳ������һ��#bSP#k. ��#b������#kλ�����½�.�㽫�ܹ�����»�õĶ�ת���ܡ�����,һ��Ҫ��ס,��Щ����ֻ������ѧ������������֮�����ʹ��.");
        else if (status == 6)
            cm.sendNextPrev((job == 310 ? "����" : "����") + "��Ҫ��ǿ����Ҫ��ס���㲻������Ȩ�������������������ϡ�������ȷ�ķ�ʽʹ����޴����������Ϊ������������˵������ȷ�ķ�ʽ����ȱ�ø�ǿ��ҪӲ�öࡣ������ǰ�ߣ������ҡ��һ����ġ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("��Ȼ�����ҵĸ���Ʒ��������ڴ�һ�����ѵ�ս������ʹ����������δ���������⹥�����ܣ���������ǳɹ���һ��һ�ع�����������ͨ���������޵ģ�����������������ڴ��������ף����ˣ���ϣ�������#b#t4031059##k����.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}
