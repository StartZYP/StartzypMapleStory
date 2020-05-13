/*
NPC:        Muirhat - Nautilus' Port
Created By: Kevin
Function:   When on the quest, he warps player to Black Magician's Disciple
*/

var status;

function start() {
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
    if (mode == -1){
        cm.dispose();
    }
    else{
        if (mode == 0 && type > 0){
            cm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0){
            if (cm.getQuestStatus(2175) == 1){
                if (cm.getPlayer().canHold(2030019)){
                    cm.sendOk("请拿着#b#t2030019##k,它会让你的生活更轻松。#i2030019#");
                }
                else{
                    cm.sendOk("你的背包空间不足");
                    cm.dispose();
                }
            }
            else{
                cm.sendOk("黑魔术师和他的追随者。凯林和诺特勒斯号船员。\n他们会互相攻击直到其中一个不存在，这是肯定的。");
                cm.dispose();
            }
        }
        else if (status == 1){
            cm.gainItem(2030019, 1);
            cm.warp(100000006, 0);
            cm.dispose();
        }
    }
}