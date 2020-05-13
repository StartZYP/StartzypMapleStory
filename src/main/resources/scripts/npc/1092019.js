/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    Copyleft (L) 2016 - 2018 RonanLana (HeavenMS)

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
/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
    Cody (Cyndicate)
-- Totally Recreated by --
    Moogra
-- And Quest Script by --
    Ronan
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/

var status;

var seagullProgress;
var seagullIdx = -1;
var seagullQuestion = ["һ�죬��ȥ���߳�����������62�����㡣�������и����ӹ���������10��������Ϊ��������ܹ��ж��������أ�"];
var seagullAnswer = ["72"];
 
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
    
                if (status == 0) {    // missing script for skill test found thanks to Lost(tm)
                        if (!cm.isQuestStarted(6400)) {
                                cm.sendOk("���ں�˭˵���������ֻ�Ǿ������ģ�ȥ���ű��˰ɡ�");
                                cm.dispose();
                        } else {
                                seagullProgress = cm.getQuestProgressInt(6400, 1);
                            
                                if (seagullProgress == 0) {
                                        seagullIdx = Math.floor(Math.random() * seagullQuestion.length);
                                        
                                        // string visibility thanks to ProXAIMeRx & Glvelturall
                                        cm.sendNext("�Ǻðɣ������ھ͸����һ�����⣡�����׼���ã���Ϊ������ѡ���������ĺ�ŸҲ�����������ѶԸ�������һ���൱���ѵ����⡣");
                                } else if (seagullProgress == 1) {
                                        cm.sendNext("����~���Ǽ�����һ�����⡣�����ĺ��ѡ���Ҫ�ð��ذ��ҽ��������⡣����ʶ���أ��԰ɣ�");
                                } else {
                                        cm.sendNext("Ŷ������������ӡ����̣�����Ϊ�ҵĿ��Ժ��ѣ�����Ҫͨ���ǡ��������ȷ�Ǻ������岻�ɻ�ȱ��һԱ��Ҳ�Ǻ�Ÿ�����ѡ��������ڱ��⽫����һ�����໥������ϵ��һ�𣡶��ң�����Ҫ���ǣ�������������ʱ�����ѻ�����㡣����㴦�ڽ���״̬�������Ǻ�Ÿ��");
                                }
                        }
                } else if (status == 1) {
                        if (seagullProgress == 0) {
                                cm.sendGetText(seagullQuestion[seagullIdx]);
                        } else if (seagullProgress == 1) {
                                cm.sendNextPrev("��Ҫ����ȥ�����ݵ�һ���շ��䡣��ῴ��������9�����ء�������~������˫��̥�𣿲���������Ȼ���ǡ������˵�ħ����������־��");
                        } else {
                                cm.sendNextPrev("֪ͨ����ʹ�ÿ��д�����ܣ����ǻ�����㣬��Ϊ�����ҵ����ѡ�\r\n\r\n  #s5221003#    #b#q5221003##k");
                        }
                } else if (status == 2) {
                        if (seagullIdx > -1) {
                                var answer = cm.getText();
                                if (answer == seagullAnswer[seagullIdx]) {
                                        cm.sendNext("ʲô�����治���������ж��������ֱ ����˼�飡������̫���ˡ��������治�����š������Ҽ�ֱ�������ţ�");
                                        cm.setQuestProgress(6400, 1, 1);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("��,�Ҳ�̫�ǵ��ˡ�����һ�Σ�");
                                        cm.dispose();
                                }
                        } else if (seagullProgress != 2) {
                                cm.sendNextPrev("����������9��������ֻ��һ���������İ��ء���֪�������������뺣��ͬ��������������������������һ�������ĺ�������Ӧ���ܹ������ҵ��Լ��İ��¡��ðɣ���������ȥ����ס�ķ��䡣");
                        } else {
                                //cm.gainExp(1000000);
                                //cm.teachSkill(5221003, 0, 10, -1);
                                //cm.forceCompleteQuest(6400);

                                cm.sendNextPrev("���Ѿ�ͨ���������е���ս���ɵúã�");
                                cm.dispose();
                        }
                } else if (status == 3) {
                        var em = cm.getEventManager("4jaerial");
                        if(!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("��һ������Ѿ�����ս���Ƶ���Ĳ����ˡ��볢������Ƶ������ȴ����������ս��ɡ�");
                        }
                        
                        cm.dispose();
                }
        }
}