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
//Boss Kitty

var status;
var questions;
var answers;
var correctAnswer;
var questionNum;

function start() {
    status = -1;
    questions = new Array("������Ʒ������è����������Ʒ?","�Ŵ������У�д�С��㹽���ĵط��м�����","�Ŵ�����ķ�����Ʒ������������������ģ�?","������Ʒ�У��Ǹ���Ʒ�Ǵ��ڵĶ�����?","�Ǹ���Ʒ������??","���Ѻ����߲˵��ϰ��ʲô����?","��Щ��Ʒ���Ǹ�����?","�Ѻʹ��������������д���ļ�����?","���ֵ��ߵ�˵���д���?","���߲��ǹŴ������Ԫ̩�������棿?","�Ѻ͵�ӰԺ��ǰ��NPC ��˭?")
    answers = new Array(new Array("��è���","����ʨ��Ӳ��","��ɫ��ש"),new Array("6","5","4"),new Array("������","������","���"),new Array("��ѻʺ","��ɫ��ɡ","���յ�"),new Array("������","������ħǹ","��Ӭ��"),new Array("����","����","����"),new Array("�ƺ�������","����","�����β��"),new Array("���ٷ�ʢ","ȫ��һ��","��ӭ����"),new Array("��ì-սʿΨһ������","��Ƥ��ͷ-���ֽ�","������-˫�ֽ�"),new Array("������","�ձ�����","Ģ����������"),new Array("�����","ӣ��С����","������"));
    correctAnswer = new Array(1,1,0,1,2,2,2,0,0,2,2);
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestStarted(8012) && !cm.haveItem(4031064)){ //quest in progress
                cm.sendYesNo("��õ�����������׼���ش������е�������?");
            }
            else { //quest not started or already completed
                //cm.sendOk("������~!");
                cm.dispose();
            }
        }
        else if (status == 1 && mode == 1) {
            var hasChicken = true;
            if (!cm.haveItem(2020001,300)) hasChicken=false;
            if (!hasChicken) {
                cm.sendOk("ʲô����!����Ҫ300��ը�����������Ҫ�Ļ�����Ҫ����������ѣ�����������Ҫ300��.���������е��˶�������һ��ΰ��...");
                cm.dispose();
            }
            else {
                cm.gainItem(2020001, -300)
                cm.sendNext("�ɵú�!���ڿ�ʼ����!��������һЩʳ��!�����Լ�. �ðɣ�������ʱ����������һЩ�����ˡ������������ʶ����һ�㣬����ס���������ˣ��Ǿͽ����ˡ���һ�л�ʲô��û��!");
            }
        }
        else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()){
                cm.sendNext("�ţ������������෸����! ������������ش�һ�Σ��Ǿ͸��Ҵ�300��ը��.")
                cm.dispose();
            }
            else {
                cm.sendNext("��~����ش������е����⡣�ҿ��ܲ�ϲ�����࣬���Ҳ�ϲ���ƻ�һ����ŵ�����ԣ���������ŵ�ģ�����ĳ�ɫ����ʯ.")
            }
        }
        else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            cm.sendOk("���ǵ���������ˣ��ǳ���л�㣡�����ڿ�������!");
            cm.dispose();
        }
        else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()){
                    cm.sendNext("�ţ������������෸����������������ش�һ�Σ��Ǿ͸��Ҵ�300��ը��.")
                    cm.dispose();
                    cont = false;
                }
            }
            if (cont) {
                questionNum = Math.floor(Math.random() * questions.length);
                if (questionNum != (questions.length - 1)){
                    var temp;
                    temp = questions[questionNum];
                    questions[questionNum] = questions[questions.length - 1];
                    questions[questions.length - 1] = temp;
                    temp = answers[questionNum];
                    answers[questionNum] = answers[questions.length - 1];
                    answers[questions.length - 1] = temp;
                    temp = correctAnswer[questionNum];
                    correctAnswer[questionNum] = correctAnswer[questions.length - 1];
                    correctAnswer[questions.length - 1] = temp;
                }
                var question = questions.pop();
                var answer = answers.pop();
                var prompt = "����." + (status - 1) + ": " + question;
                for (var i = 0; i < answer.length; i++)
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                cm.sendSimple(prompt);
            }
        }
    }
}