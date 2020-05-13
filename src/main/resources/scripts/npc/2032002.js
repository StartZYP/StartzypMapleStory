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
/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
*/

var status;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getPlayer().getEventInstance();
        
        if (status == 0) {
            if(!eim.isEventCleared()) {
                cm.sendSimple("怎么样？都搜集好了吗？#b\r\n#L0#告诉我应该做什么？#l\r\n#L1#已经搜集好了物品！#l\r\n#L2#我要离开这里！#l");
            } else {
                cm.sendNext("你完成了这场考验，现在领奖。");
            }
        }
        else if (status == 1) {
            if(!eim.isEventCleared()) {
                selectedType = selection;
                if (selection == 0) {
                    cm.sendNext("揭开扎昆的力量, 你必须重建它的核心.这个矿区里藏着#b\火石的母矿\#k这是必要材料之一。找到它，然后带回来给我\r\n\r\n哦，你能帮我个忙吗？还有一些#b废矿卷轴#k藏在这附近的岩石下面。如果你能得到30个，我可以奖励你的努力。");
                    cm.dispose();
                    return;
                }
                else if (selection == 1) {
                    if(!cm.isEventLeader()) {
                        cm.sendNext("请让你的队长把材料带给我来完成这场考验.");
                        cm.dispose();
                        return;
                    }

                    if (!cm.haveItem(4001018)) { //fire ore
                        cm.sendNext("请把#b火石的母矿#k给我.");
                        cm.dispose();
                    }
                    else {
                        gotAllDocs = cm.haveItem(4001015, 30);
                        if (!gotAllDocs) { //documents
                            cm.sendYesNo("你带了火石的母矿？我可以给你和你们队员一人一份火石母矿碎片。请确保你的整个团队都有足够的空间.");
                        } else {
                            cm.sendYesNo("所以，你带了火石的母矿和废矿卷轴？我可以给你和你们队员一人一份火石母矿碎片。还有，既然你#r带来了废矿卷轴#k, 我也可以给你废矿回城卷轴，它可以#b随时带你到废矿#k.请确保你的整个队伍都有足够的空间。");
                        }
                    }
                } else if (selection == 2)
                    cm.sendYesNo("你确定要退出吗？如果你是队长，你的队伍也将被从废矿中退出。");
            } else {
                if(eim.getProperty("gotDocuments") == 1) {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHoldAll([2030007, 4031061], [5, 1])) {
                            cm.gainItem(2030007, 5);
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("请确保您的背包中有足够的空间");
                        }
                    } else {
                        cm.sendOk("你已经获得了奖励。你现在可以通过那边的入口离开矿井.");
                    }
                } else {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHold(4031061, 1)) {
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("请确保您的背包中有足够的空间");
                        }
                    } else {
                        cm.sendOk("你已经获得了奖励。你现在可以通过那边的入口离开矿井.");
                    }
                }
                
                cm.dispose();
            }
            
        }
        else if (status == 2) {
            if (selectedType == 1) {
                cm.gainItem(4001018, -1);
                
                if(gotAllDocs) {
                    cm.gainItem(4001015, -30);
                    
                    eim.setProperty("gotDocuments", 1);
                    eim.giveEventPlayersExp(20000);
                } else {
                    eim.giveEventPlayersExp(12000);
                }
                
                eim.clearPQ();
                cm.dispose();
            }
            else if (selectedType == 2) {
                cm.warp(211042300);
                cm.dispose();
            }
        }
    }
}