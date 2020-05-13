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
/* Grendel the Really Old
	Magician Job Advancement
	Victoria Road : Magic Library (101000003)

	Custom Quest 100006, 100008, 100100, 100101
*/

status = -1;
actionx = {"1stJob" : false, "2ndjob" : false, "3thJobI" : false, "3thJobC" : false};
job = 210;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 2;

function start() {
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
            cm.sendNext("���Ϊ#rħ��ʦ#k��?��һЩ��׼��Ҫ����.��Ϊ���ǲ��ܽ��ܡ�#b��ĵȼ�Ӧ�ôﵽ8��#k,����" + cm.getFirstJobStatRequirement(jobType) +"��Ϊ�����Ҫ����.�����ǿ����������."); 
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("�ҿ���ɵò����ҽ��������������ĵ�·��������һ����");
            else if (cm.haveItem(4031009)){
                cm.sendOk("ȥ���� #b#p1072001##k.");
                cm.dispose();
            } else
                cm.sendNext("��ȡ�õĽ����Ǿ��˵ġ�");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))){
            actionx["3thJobI"] = true;
            cm.sendNext("������������ǰ�� ����ѩ���#b#p2020009##k�˸���̸���㡣�ҿ�����Ե����ν���ħ��ʦ�Ŀ��������ܸ���Ȥ��Ϊ��ʵ�����Ŀ�꣬�ұ������һ������������������Ƿ����ʸ��ý�������ά�����ǵ���а��ɭ�����һ�����ڣ�������㵽һ������ͨ����һ����ȥ����ͻ����һ����¡���ҡ���������Ǵ������Ȼ����� #b#t4031059##k ��������.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)){
            cm.sendNext("��������� #b#t4031059##k ���ҵķ����������һ��������а��ɭ���е�̫�ն�Ѩ���ҵ�����");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")){
            actionx["3thJobC"] = true;
            cm.sendNext("����Ĺ������������ҵķ���#b#t4031059##k ��ȫ�������������Ѿ�֤��������ֵ�õ�������ְ�ġ�������Ӧ�ð����������� #b#p2020011##k �ڰ�˹�����ܵڶ����ֵĲ��ԡ�ף����ˡ������Ҫ��.");
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
    } else if (mode == 0 && type == 0) {
        status -= 2;
    }
    
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("�Բ�����û���㹻�Ľ������������ð�յ���ҫ������λ�á�");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("���߰�!ϣ�����ϲ������");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("��Ǹ��ð�յ����ٴ��������Ѿ����ˡ�");
                }
            }
            
            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)){
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("��֪��û������ѡ��");
                if (!(mode == 0 && type == 0)){
                    cm.dispose();
                    return;
                }
            }
        }
    }
    
    if (actionx["1stJob"]){
        if (status == 0) {
            if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("Ŷ��!�㿴�������Կ��Գ�Ϊ���ǵ�һ���֡�����ֻ��Ҫһ��а���ͷ�ԣ�Ȼ���ǵġ�����ô��?���Ϊħ��ʦ��?");
            } else {
                cm.sendOk("��ѵ��һ�㣬ֱ����ﵽ����Ҫ���ҿ��Ը�����ķ�ʽ #rħ��ʦ#k.");
                cm.dispose();
            }
        } else if (status == 1){
            if (cm.canHold(1372043)){
                if (cm.getJobId() == 0){
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
                    cm.resetStats();
                }
                cm.sendNext("�ðɣ������￪ʼ���������ǵ�һ����!�㽫�ڡ������������ߵ����������Ҫ���������ģ������Ϻ����ӵġ��ðɣ����Ǻܶ࣬���һ����һЩ�ҵ��������Ǻǹ��� ! ! !");
            } else {
                cm.sendNext("����ı���������ռ䣬Ȼ�����̸̸��");
                cm.dispose();
            }
        } else if (status == 2) 
            cm.sendNextPrev("������ǿ׳���ˡ���Ϊ���ÿ���������������˿ռ䡣���Լ�ȥ��������ֻ�Ǹ�������һ�� #b���ܵ�#k. ����� #b����#k �˵�����Ļ�����½ǣ��м��������ѧϰʹ��SP�ġ���������һ������:�㲻����һ������������⡣����һЩ���ܣ���ֻ����������һЩ����֮��������ա�");
        else if (status == 3)
            cm.sendNextPrev("��Ҫ��ס�����ܲ���һ�С��������Ӧ��֧����ļ��ܣ���Ϊһ��ħ��ʦ��ʹ��������Ϊ���ǵ���Ҫ���ԣ�������Ϊ���ǵĴ�Ҫ���ԡ�����������Ժ����ѣ���ʹ��#b�Զ�����#k.");
        else if (status == 4)
            cm.sendNextPrev("���ڣ��ٸ���һ�����档���������ڿ�ʼ��ս����ʧ�ܣ��㽫��ʧȥһ���־���ֵ��Ҫ�ر�ע����һ�㣬��Ϊ���Ѫ���ȴ�����˶��١�");
        else if (status == 5)
            cm.sendNextPrev("��������ܽ���ġ�ף����;���ˣ������ħ��ʦ��");
        else
            cm.dispose();
    } else if(actionx["2ndJob"]){
        if (status == 0){
            if (cm.haveItem(4031012))
                cm.sendSimple("�ðɣ����������������������� [��Ҫתְ].#b\r\n#L0#ʲô�Ƿ�ʦ (�� / ��).\r\n#L1#ʲô�Ƿ�ʦ (�� / ��)\r\n#L2#ʲô����ʦ\r\n#L3#��Ҫתְ");
            else {
                cm.sendNext("�ܺõľ������㿴������ǿ׳��������Ҫ�������Ƿ�����㹻ǿ׳����ͨ�����ԣ��ⲻ��һ�����ѵĿ��ԣ�����������úܺá����������ҵ��š�����һ����Ҫ���ˣ�");
		if(!cm.isQuestStarted(100006)) cm.startQuest(100006);
	    }
        } else if (status == 1){
            if (!cm.haveItem(4031012)){
                if (cm.canHold(4031009)){
                    if(!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("���������͵�#b#p1072001##k,��#b#m101020000##k���Ÿ���,���ʹ�������������.ף�����.");
                } else {
                    cm.sendNext("������ı���������һЩ�ռ�.");
                    cm.dispose();
                }
            }else{
                if (selection < 3){
                    if(selection == 0) {
                        cm.sendNext("��ʦ(��/��)��ħ����#k\r\n\r\n#b��ʦ#��һ���������ħ��,Ԫ���˺���ְҵ.��Щ����ʹ�����ڶԸ���С�ĵ���ʱ��������������. �����ǵļ���#r������#k��#r������#k,#b��ʦ#k��������ħ�����������Ͷ��ֵ��ƶ�����. #b��ʦ(��/��)#k����ʹ��ǿ��Ļ����Թ����Ͷ����Թ����ļ���.");    //f/p mage
                    } else if(selection == 1) {
                        cm.sendNext("��ʦ(��/��)��ħ����#k\r\n\r\n#b��ʦ#k��һ���������ħ��,Ԫ���˺���ְҵ, ��Щ����ʹ�����ڶԸ���С�ĵ���ʱ��������������. �����ǵļ���#r������#k��#r������, #b��ʦ#k��������ħ�����������Ͷ��ֵ��ƶ�����. #b��ʦ(��/��)#k����ʹ��ǿ��ı����Թ����������Թ����ļ���.");    //i/l mage
                    } else {
                        cm.sendNext("��ʦ����#r��ʥ��ħ��#k.\r\n\r\n#b��ʦ#k ��һ��ǿ�����ʥ���ܣ�һ���ᱻ�κ���ӽ��ܡ���Ϊ���������� #r������#k �����Լ�����������ˡ�ʹ��#rף��#k, #b��ʦ#k����������Բ������˺��������������ſκ������棬�Ǿ�ֵ��ȥ�ϡ� #b��ʦ#k �Ժڰ�ϵ�����ر���Ч��");    //cleric
                    }
                    
                    status -= 2;
                } else
                    cm.sendSimple("���ڡ��������¶�����������ѡ��ҪΪ�ڶ�����ְѡ��Ĺ���. #b\r\n#L0#��ʦ (�� / ��)\r\n#L1#��ʦ (�� / ��)\r\n#L2#��ʦ");
            }
        } else if (status == 2){
            if (cm.haveItem(4031009)){
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("��������ѵڶ���תְתΪ" + (job == 210 ? "#b��ʦ (�� / ��)#k" : job == 220 ? "#b��ʦ (�� / ��)#k" : "#b��ʦ#k") + "? ��֪��һ�������������˾���,��Ͳ���Ϊ�ڶ�����ְѡ��ͬ�Ĺ�����,����?");
        } else if (status == 3){
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("�ðɣ����Ѿ�תΪ��" + (job == 210 ? "#b��ʦ (�� / ��)#k" : job == 220 ? "#b��ʦ (�� / ��)#k" : "#b��ʦ#k") + "�����￪ʼ.��ʦ����ʦ��һȺ���в���˼���ħ�������Ĵ�����,�ܹ����ɵش̴���������������ṹ...��ÿ��ѵ���Լ�.�һ�������ñ����ڸ�ǿ��.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("�Ҹոո�����һ���飬�����г�������Ϊһ��" + (job == 210 ? "#b��ʦ (�� / ��)#k" : job == 220 ? "#b��ʦ (�� / ��)#k" : "#b��ʦ#k") + ". ������HP��MPҲ�����ˡ����Լ�ȥ�����ɡ�");
        else if (status == 5)
            cm.sendNextPrev("��Ҳ������һ��SP����λ�����½ǵļ��������㽫�ܹ�����»�õĶ������ܡ���������Щ����ֻ������ѧ������������֮�����ʹ�á�һ��Ҫ��ס��");
        else if (status == 6)
            cm.sendNextPrev((job == 210 ? "��ʦ (�� / ��)" : job == 220 ? "��ʦ (�� / ��)" : "��ʦ") + " ��Ҫ��ǿ����Ҫ��ס���㲻������Ȩ�������������������ϡ�������ȷ�ķ�ʽʹ����޴����������Ϊ������������˵������ȷ�ķ�ʽ����ȱ�ø�ǿ��ҪӲ�öࡣ������ǰ�ߣ������ҡ��һ����ġ�");
    } else if (actionx["3thJobI"]){
        if (status == 0){
            if (cm.getPlayer().gotPartyQuestItem("JB3")){
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("��Ȼ�����ҵķ���������ڴ�һ������ս������ʹ����������δ���������⹥�����ܣ���������ǳɹ���һ��һ�ع�����������ͨ���������޵ģ�����������������ڴ��������ף����ˣ���ϣ�������#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]){
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}