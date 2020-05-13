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
/* Dark Lord
	Thief Job Advancement
	Victoria Road : Thieves' Hideout (103000003)
	Custom Quest 100009, 100011
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "���Ѿ����˺ܳ���·ȥ����������ӵ�е��������ǻۺ������������� �����ڸо���ô���� #rһ�������õ� NPC ���������ڵĽ�ɫ����#k? ��ϲ����?";
        if(spawnPnpcFee > 0) {
            sendStr += " ����Ϊ��������, Ϊ���� #b " + cm.numberWithCommas(spawnPnpcFee) + " ���.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("�����Ϊ #r����#k? ǰ������������������ֶ���... #b�ȼ�����Ϊ10#k. ���ҿ���.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�ҿ���ɵò���������һ���ɡ�");
            else if (cm.haveItem(4031011)){
                cm.sendOk("ȥ�� #b#p1072003##k.");
                cm.dispose();
            } else
                cm.sendNext("��Ľ������Ǿ��˵��ٶ�.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("There you are. A few days ago, #b#p2020011##k of Ossyria talked to me about you. �ҿ�����Է�����ת����Ȥ��Ϊ��ʵ����һĿ�꣬�ұ��뿼������������������Ƿ�ֵ����������������һ���������м���һ�����ڣ����������II��, ������㵽һ������ͨ��. һ�����룬�㽫����ҵķ�����������Ǵ���������� #b#t4031059##k ����.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("�ٶȣ���ȥ�� #b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("�ɵ�Ư�������Ѿ�������ҵķ�����������#b#t4031059##k . ���Ѿ�֤������������ʤ��3תְҵ��������Ӧ�ð��������������ѩ���#b#p2020011##k ��Ȼ����ܵڶ��ֿ���.ף����ˣ�");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
        } else {
            cm.sendOk("���ְҵѡ�������ǵ�.");
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
                    cm.sendOk("��û���㹻��Ǯ��");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("��ȥ�����ɣ�ϣ�����ϲ����");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("�Բ����������Ѿ���Ա��...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪��û�б��ѡ��...");
                if (!(mode == 0 && type != 1)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType))
                cm.sendYesNo("Ŷ���㿴�������Գ�Ϊ���ǵ�һԱ����ȷ��Ҫ��Ϊ������");
            else {
                cm.sendOk("��ȥ����ѵ���ɣ���ʱ���ҿ��Ը�������γ�Ϊ #r����#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])){
                if (cm.getJobId() == 0){
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("�õģ��ӽ��쿪ʼ���ǳ�Ϊ�����ǵ�һԱ���������˵��������ֻҪ�������������Ϻ����ӣ��ðɣ��һ����һЩ�ҵ�������������");
            } else {
                cm.sendNext("����ı����ڳ���λ�ã�Ȼ���ٸ���̸̸��");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("�����ڱ�֮ǰǿ׳���ˣ����Ѿ��͸��������ַ����ıر������밵����Ҳ����ı�������һ�У����Լ�ȥ�������ҽ̸�����һЩ���ܡ�����Դ���Ļ���½ǵ� #b����#k �˵��鿴, �����ʹ��SPѧϰ���ܣ�������һ�����棺��һЩ������Ҫѧϰ���������ܲſ���ѧϰ��");
        else if (status == 3)
            cm.sendNextPrev("���������㣬һ����������ѡ�񣬽����ɱ����");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("�õģ����������֮���� [ѡ��ְҵ] .#b\r\n#L0#����ҽ���һ�´̿�\r\n#L1#����ҽ���һ������.\r\n#L3#ѡ��ְҵ!");
            else {
                cm.sendNext("�õģ��㿴������ǿ����������Ҫ�������Ƿ�����㹻ǿ��ͨ�����ԣ�z");
		if(!cm.isQuestStarted(100009)) cm.startQuest(100009);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031011)){
                    if(!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("�������Ÿ� #b#p1072003##k ������ #b#m102040000##k ����. ��������ҿ�����.");
                } else {
                    cm.sendNext("����һ����ı���.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {    //assassin
                        cm.sendNext("�̿�ʹ�õ��� #rȭ��#k.\r\n\r\n#b�̿�#k ����Զ�̹���. ӵ���൱�ߵ������ʺ����õĹ�����������Ǯ�����͸�һ��.");
                    } else if(selection == 1) {    //bandit
                        cm.sendNext("����ʹ�õ��� #r�̵�#k.\r\n\r\n#b����#k ���ڶ�תְҵ�к�ǿ���һ��. ������̿�������ӹ��Ҳû��Զ�̹��������ƣ����ǿ�����ǿ����������ֲ���");
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("���ڡ��������������ѡ�����ְҵ #b\r\n#L0#�̿�\r\n#L1#����");
            }
        } else if (status == 2){
            if (cm.haveItem(4031011)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("����������ж�ת " + (job == 410 ? "#b�̿�#k" : "#b����#k") + "? һ��������ѡ�񣬲��ܺ�ڡ�");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
	    cm.completeQuest(100011);
            
            if(job == 410) cm.sendNext("���ˣ��ӽ��쿪ʼ����Ǵ̿��ˡ�");
            else cm.sendNext("���ˣ������ڿ�ʼ����������ˡ�");
            
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո�����һ���飬�����г����������Ϊ�̿ͻ�ǿ����õļ����б����⣬�����������Ҳͨ�������һ������չ������������ֵ��MPҲ�����ˡ����Լ�ȥ������");
        else if (status == 5)
            cm.sendNextPrev("I have also given you a little bit of #bSP#k. Open the #bSkill Menu#k located at the bottomleft corner. you'll be able to boost up the newer acquired 2nd level skills. A word of warning, though. You can't boost them up all at once. Some of the skills are only available after you have learned other skills. Make sure yo remember that.");
        else if (status == 6)
            cm.sendNextPrev((job == 410 ? "Assassin" : "Bandit") + " need to be strong. But remember that you can't abuse that power and use it on a weakling. Please use your enormous power the right way, because... for you to use that the right way, that is much harden than just getting stronger. Please find me after you have advanced much further. I'll be waiting for you.");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("��Ϊ�����ҵķ�������������ڴ�һ������ս������ʹ����������δ���������⹥�����ܣ���������ǳɹ���һ��һ�ع�����������ͨ�������ޣ������������ڻ�������������Ҫ�ġ�ף����ˣ���ϣ�����ܴ����� #b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}