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
/* Dances with Balrog
	Warrior Job Advancement
	Victoria Road : Warriors' Sanctuary (102000003)

	Custom Quest 100003, 100005
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 110;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 1;

function start() {
	if (cm.isQuestStarted(4710) && !cm.isQuestFinished(4711)) {
         cm.forceStartQuest(4711);
		 cm.dispose();
        return;
        } 
	if (cm.isQuestStarted(4720) && !cm.isQuestFinished(4721)) {
         cm.forceStartQuest(4721);
		 cm.dispose();
        return;
        } 
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "���Ѿ����˺ܳ���·������������ӵ�е��������ǻۺ�������������?�����������ô�� #rð�յ���ҫ�����������㵱ǰ��ɫ��ͼ��#k? ��ϲ����?";
        if(spawnPnpcFee > 0) {
            sendStr += " �ҿ���Ϊ��������� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("���Ϊ#rսʿ#k��?��һЩ��׼��Ҫ����.��Ϊ���ǲ��ܽ��ܡ�#b��ĵȼ�Ӧ�ôﵽ10��#k,����" + cm.getFirstJobStatRequirement(jobType) +"��Ϊ�����Ҫ����.�����ǿ����������."); 
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("Ŷ�������㰲ȫ�����ˣ��Ҿ�֪�����������ȥ�ġ��ҳ��ϣ�����һ��ǿ��ǿ���սʿ���ðɣ��һ������Ϊ�����ڸ�ǿ���սʿ�����ڴ�֮ǰ������Ҫ������·����ѡ��һ�����ⲻ��һ�����׵��£���������������⣬��������ʡ�");
            else if (cm.haveItem(4031008)){
                cm.sendOk("ȥ����#b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("����ȡ�õĽ����Ǿ��˵�.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("���ڵ��㡣����ǰ���Ҵ�#b#p2020008##k �á������������һ��������������϶�������һ������ͨ����ֻ������ܽ�������ͨ������������ͨ�����������ҵķ��������������#b#t4031059##k��������.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("Please, bring me the #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("��ġ������������ҵķ���#b#t4031059##k,������˵���ܺã���϶�֤���������������ʵ�����ԣ����Ѿ�׼������������ݹ����ˡ�����������ŵ�ģ��һ����#b#t4031057##k������˵��������������#b#p2020008##k,�㽫�ܹ����ܵ�����תְ�ĵڶ��ο��顣ף�����~");
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
                    cm.sendOk("�Բ�����û���㹻�Ľ����ð�յ���ҫ���������λ��.");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("There you go! Hope you will like it.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("�Բ�����ҫ�����������ˡ�����");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("Make up your mind and visit me again.");
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
                cm.sendNextPrev("����һ����Ҫ��Ҳ������ѡ���㲻�ܻ�ͷ��");
            } else {
                cm.sendOk("��ѵ��һ��ֱ����ﵽ����Ҫ���ҿ��Ը�����#rսʿ#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1302077)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendNext("�����￪ʼ����Ҫȥ��ʿ֮·���ⲻ��һ�����׵Ĺ��������������Լ�������ͼ����м��ɺ����ģ��㽫�˷����·�ϵ��κ����ѡ�ȥ�ɣ��������ʿ!");
            } else {
                cm.sendNext("����ı���������һЩ�ռ����������̸̸��");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڱ�ø�ǿ׳�ˡ��Ҹոո�����һ��SP���������Ļ���½ǵļ�����ʱ�������ͨ��ʹ��SP��ѧϰһЩ���ɡ���������һ�����棺��һЩ����ֻ��������ѧ����һЩ����֮����ܻ�á�");
        else if (status == 3)
            cm.sendNextPrev("���������㡣һ����ѡ���ˣ���Ͳ��ܸı����⣬����ѡ����һ��·�����ھ�ȥ����һ��������սʿ��");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("�ðɣ��������˾���, ��������#b[��Ҫתְ]#b\r\n#L0#���ڽ���\r\n#L1#����׼��ʿ\r\n#L2#����ǹսʿ\r\n#L3#��Ҫתְ");
            else {
                cm.sendNext("�ܺõľ������㿴������ǿ׳��������Ҫ�������Ƿ�����㹻ǿ׳����ͨ�����ԣ��ⲻ��һ�����ѵĿ��ԣ�����������úܺá����������ҵ��š�����һ����Ҫ���ˣ�");
		if(!cm.isQuestStarted(100003)) cm.startQuest(100003);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031008)){
                    if(!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("���������͵�#b#p1072000##k����#b#m102020300##k������ ���Ÿ��������ʹ������������㡣ף����ˡ�");
                } else {
                    cm.sendNext("������ı���������һЩ�ռ䡣");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {    //fighter
                        cm.sendNext("���ս��͸�ͷ��սʿ.\r\n\r\n#r����#k��ʹ��#b��ŭ֮��#k, ʹ��ĵ����������õ���ߡ�#b�˺�����#k����40%�Ĵ����˺����������˺���������������Ϊʲô���ͱ���Ϊ��ǿ�����Ҫԭ��");
                    } else if(selection == 1) {    //page
                        cm.sendNext("���ս��Ͷ�����սʿ.\r\n\r\n#r׼��ʿ#k��ʹ��#bѹ����#k,�����˵����������������������͵ļ��ܣ���Ҫ���ڽ��Ͷ�����ɵ��˺���#b�˺�����#k����40%�Ĵ����˺����������˺���������������Ϊʲô׼��ʿ����Ϊ��ǿ�����Ҫԭ��");
                    } else {    //spearman
                        cm.sendNext("����ǹ��ì��սʿ\r\n\r\n#rǹսʿ#k��ʹ��#b��ʥ֮��#k,ʹ�����Ķ��ѵ��������ֵ���60%������ܶ�����ӵķ����������������ֺͷ�ʦ�ر����ã�������Լ�BOSSս���еĸ��๥���������ر����á�ǹսʿ������ʹ��#b���޷���#k������������һ�����Ƶ�ף���ļ��ܣ�����ʱ���100�룬��û�н��ͻ�׼��ʿ�ļ����˺��ӳɡ���ʹ����ܷ��ӵ����£�Ҳ������������з���ǿ�����ã���Ҳ��Ϊʲôǹսʿ���ܶ��е�ԭ��.");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("���ڡ��������¶�����������ѡ����ϣ��Ϊ�ڶ�����ְѡ��Ĺ����� #b\r\n#L0#����\r\n#L1#׼��ʿ\r\n#L2#ǹսʿ");
            }
        } else if (status == 2){
            if (cm.haveItem(4031008)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("��������ѵڶ���תְתΪ" + (job == 110 ? "#b����#k" : job == 120 ? "#b׼��ʿ#k" : "#bǹսʿ#k") + "? ��֪��һ�������������˾��ģ���Ͳ��ܷ��ڣ���ȷ����");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
	    cm.completeQuest(100005);
            
            if(job == 110) cm.sendNext("�ðɣ������ڳ���#b����#k. ��ʿŬ����Ϊǿ���е�ǿ�ߣ��Ӳ�ֹͣս������Զ��Ҫʧȥս������־���һ�������ñ����ڸ�ǿ��");
            else if(job == 120) cm.sendNext("�ðɣ������ڳ���#b׼��ʿ#k.�����кܸߵ����̺���������ϣ�������������ó������õ���ȷ�ĵ�·�ϡ��һ�������ñ�����ǿ��öࡣ");
            else cm.sendNext("�ðɣ������ڳ���#bǹսʿ#k��ǹսʿ�úڰ���������������ˣ������ںڰ��С���������;�У����������Լ����������˾�η���������һ�������ñ����ڸ�ǿ׳��");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո�����һ���飬�����г�������Ϊһ��" + (job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + ". ���⣬���HP��MPҲ�����ˡ����Լ�ȥ�����ɡ�");
        else if (status == 5)
            cm.sendNextPrev("��Ҳ������һ��SP����λ�����½ǵļ��������㽫�ܹ�����»�õĶ������ܡ���������Щ����ֻ������ѧ������������֮�����ʹ�á�һ��Ҫ��ס��");
        else if (status == 6)
            cm.sendNextPrev((job == 110 ? "����" : job == 120 ? "׼��ʿ" : "ǹսʿ") + "��Ҫ��ǿ����Ҫ��ס���㲻������������������������������ϡ�������ȷ�ķ�ʽʹ����޴����������Ϊ������������˵������ȷ�ķ�ʽ����ȱ�ø�ǿ��ҪӲ�öࡣ������ǰ�ߣ������ҡ��һ����ġ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("�ҵ���һ���Һܼ�ǿ����ʹ�úܶ����⼼�ܣ���Ӧ�ú���һ��һ��ս����Ȼ�������ǲ���������ͨ�����̫�ã����Ծ��������Ǻ���Ҫ�ġ��á�����ף����ˣ����ڴ������#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/* 3th Job Part
	PORTAL 20 MINUTES.
 */