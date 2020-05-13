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
/*
 *@Author:  Moogra
 *@NPC:     4th Job 弓箭手 Advancement NPC
 *@Purpose: Handles 4th job.
 */

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(cm.getLevel() < 120 || Math.floor(cm.getJobId() / 100) != 3) {
                                cm.sendOk("现在请不要打扰我，我正在集中精力.");
                                cm.dispose();
                        } else if (!cm.isQuestCompleted(6924)) { 
                                cm.sendOk("你还没有通过我的考验.并不能够获取奖励.");
                                cm.dispose();
                        } else if ( cm.getJobId() % 100 % 10 != 2) {
                                cm.sendYesNo("你通过了我的考试，干得很出色. 你准备好完成第四份任务了吗?");
                        } else {
                                cm.sendSimple("如果必须的话，我可以教你这门课的艺术.\r\n#b#L0#请教我这份技术.#l");
                                //cm.dispose();
                        }
                } else if(status == 1) {
                        if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
                                if (cm.canHold(2280003, 1)) {
                                        cm.changeJobById(cm.getJobId() + 1);
                                        if(cm.getJobId() == 312) {
                                                cm.teachSkill(3121002, 0, 10, -1);
                                                cm.teachSkill(3120005, 0, 10, -1);
                                                cm.teachSkill(3121007, 0, 10, -1);
                                        } else if(cm.getJobId() == 322) {
                                                cm.teachSkill(3221002, 0, 10, -1);
                                                cm.teachSkill(3220004, 0, 10, -1);
                                                cm.teachSkill(3221006, 0, 10, -1);
                                        }
                                        cm.gainItem(2280003, 1);
                                } else {
                                        cm.sendOk("请在#b消耗栏#k空出一个位置，才能获取技能手册.");
                                }
                        } else if(mode >= 0 && cm.getJobId() % 100 % 10 == 2) {
                                if(cm.getJobId() == 312) {
                                        if(cm.getPlayer().getSkillLevel(3121008) == 0)
                                                cm.teachSkill(3121008 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(3121006) == 0)
                                                cm.teachSkill(3121006 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(3121004) == 0)
                                                cm.teachSkill(3121004 , 0, 10, -1);
                                } else if(cm.getJobId() == 322) {
                                        if(cm.getPlayer().getSkillLevel(3221007) == 0)
                                                cm.teachSkill(3221007 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(3221005) == 0)
                                                cm.teachSkill(3221005 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(3221001) == 0)
                                                cm.teachSkill(3221001 , 0, 10, -1);
                                }
                                cm.sendOk("完成了. 你可以离开了.");
                        }
                        
                        cm.dispose();
                }
        }
}
