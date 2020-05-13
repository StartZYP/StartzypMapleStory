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
var seagullQuestion = ["一天，我去海边吃晚饭，钓到了62条章鱼。但后来有个孩子过来给了我10条章鱼作为礼物！那我总共有多少章鱼呢？"];
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
                                cm.sendOk("你在和谁说话？如果你只是觉得无聊，去打扰别人吧。");
                                cm.dispose();
                        } else {
                                seagullProgress = cm.getQuestProgressInt(6400, 1);
                            
                                if (seagullProgress == 0) {
                                        seagullIdx = Math.floor(Math.random() * seagullQuestion.length);
                                        
                                        // string visibility thanks to ProXAIMeRx & Glvelturall
                                        cm.sendNext("那好吧！我现在就给你第一个问题！你最好准备好，因为这个很难。就连这里的海鸥也觉得这条很难对付。这是一个相当困难的问题。");
                                } else if (seagullProgress == 1) {
                                        cm.sendNext("现在~我们继续下一个问题。这个真的很难。我要让巴特帮我解决这个问题。你认识巴特，对吧？");
                                } else {
                                        cm.sendNext("哦！这真是令人印象深刻！我认为我的考试很难，而你要通过那。。。你的确是海盗家族不可或缺的一员，也是海鸥的朋友。我们现在被这将持续一生的相互友谊联系在一起！而且，最重要的是，当你陷入困境时，朋友会帮助你。如果你处于紧急状态，叫我们海鸥。");
                                }
                        }
                } else if (status == 1) {
                        if (seagullProgress == 0) {
                                cm.sendGetText(seagullQuestion[seagullIdx]);
                        } else if (seagullProgress == 1) {
                                cm.sendNextPrev("我要送你去鹦鹉螺的一个空房间。你会看到那里有9个巴特。哈哈哈~他们是双胞胎吗？不，不，当然不是。我用了点魔法来测试意志。");
                        } else {
                                cm.sendNextPrev("通知我们使用空中打击技能，我们会帮助你，因为你是我的朋友。\r\n\r\n  #s5221003#    #b#q5221003##k");
                        }
                } else if (status == 2) {
                        if (seagullIdx > -1) {
                                var answer = cm.getText();
                                if (answer == seagullAnswer[seagullIdx]) {
                                        cm.sendNext("什么！我真不敢相信你有多聪明！简直 不可思议！你真是太棒了。。。我真不敢相信。。。我简直不敢相信！");
                                        cm.setQuestProgress(6400, 1, 1);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("嗯,我不太记得了。再试一次！");
                                        cm.dispose();
                                }
                        } else if (seagullProgress != 2) {
                                cm.sendNextPrev("不管怎样，9个巴特中只有一个是真正的巴特。你知道海盗以他们与海盗同伴的友谊和友情而闻名。如果你是一个真正的海盗，你应该能够轻松找到自己的伴侣。好吧，那我送你去巴特住的房间。");
                        } else {
                                //cm.gainExp(1000000);
                                //cm.teachSkill(5221003, 0, 10, -1);
                                //cm.forceCompleteQuest(6400);

                                cm.sendNextPrev("你已经通过了我所有的挑战，干得好！");
                                cm.dispose();
                        }
                } else if (status == 3) {
                        var em = cm.getEventManager("4jaerial");
                        if(!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("另一个玩家已经在挑战这个频道的测试了。请尝试其他频道，或等待其他玩家挑战完成。");
                        }
                        
                        cm.dispose();
                }
        }
}