var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        if (cm.getPlayer().getMapId() == 922240200)  {
                                cm.sendOk("真可惜，准备好了就回来.");
                        }
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if (cm.getMapId() == 922240200) {
                                cm.sendSimple("你有什么要说的吗...? #b\b\r\n#L0#我想救嘎嘎.#l\r\n");    //#L1#I want to go to the Space Mine.#l
                        } else if (cm.getMapId() >= 922240000 && cm.getMapId() <= 922240019) {
                                cm.sendYesNo("如果你失败了，别担心。你有三次机会。你还想放弃吗？你费尽周折才救了嘎嘎，但看来我们又回到原点了?"); 
                        } else if (cm.getMapId() >= 922240100 && cm.getMapId() <= 922240119) {
                                var text = "你费尽周折才救了嘎嘎，但看来我们又回到原点了. ";				
                                var rgaga = cm.getPlayer().getEvents().get("rescueGaga");
                                if (rgaga.getCompleted() > 10) {
                                        text += "在加加获救之前，请不要放弃。为了表示我对你迄今所取得成就的感谢，我给了你一艘宇宙飞船。它已经很破旧了，但应该还可以使用。检查您的#b技能栏#k.";
                                        rgaga.giveSkill(cm.getPlayer());
                                } else 
                                        text += "我们现在回去吧.";

                                cm.sendNext(text); 
                        }
                } else {
                        if (cm.getPlayer().getMapId() == 922240200) {
                                if (status == 1) {
                                        if(selection == 0) {
                                                selected = 1;
                                                cm.sendNext("欢迎！我听说了小月亮兔的事，我很高兴你能来，因为我正打算寻求帮助。加加是我的一个朋友，他以前帮助过我，经常来打招呼。不幸的是，他被外星人绑架了."); 
                                        } else {
                                                selected = 2;
                                                cm.sendYesNo("在太空矿，你可以找到一种特殊的矿石，叫做#b氪晶体#k，它蕴含着太空的神秘力量。#b氪晶体#k通常是翡翠色的，但如果被宇宙飞船的太空光束击中会变成棕色。记住，为了阻止这种外星人的消费，需要#r10颗棕色氪晶体#k和#r10颗翡翠氪晶体#k。但既然#b氪晶体#k能帮上忙，那就尽可能多地帮我。哦，还有一件事！太空地雷受到太空伙伴的保护。由于氪晶体的力量，它们非常强大，所以不要试图打败它们。只需专注于快速收集晶体."); 
                                        } 
                                } else if (status == 2) {
                                        if(selected == 1) {
                                                cm.sendYesNo("如果我们把加加留给外星人，他会出事的！我会让你借一艘太空船，月亮兔子用来旅行，这样你就可以拯救嘎嘎了。虽然他有时看起来有点优柔寡断、迟钝和幼稚，但他真的是一个很好的年轻人。你现在想去救他吗?");
                                        } else if(selected == 2) { 
                                                cm.sendOk("还没有编码，f4."); 
                                                cm.dispose();
                                        }
                                } else if (status == 3) {
                                        var em = cm.getEventManager("RescueGaga");
                                        if (em == null) {
                                                cm.sendOk("此事件当前不可用.");
                                        } else if (!em.startInstance(cm.getPlayer())) {
                                                cm.sendOk("地图上有人，请稍后再来.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (cm.getPlayer().getMapId() >= 922240000 && cm.getPlayer().getMapId() <= 922240019) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        } else if (cm.getPlayer().getMapId() >= 922240100 && cm.getPlayer().getMapId() <= 922240119) {
                                cm.warp(922240200, 0);
                                cm.dispose();
                        }
                }
        }
}