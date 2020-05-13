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
/**
	Assistant Travis
-- By ---------------------------------------------------------------------------------------------
	Angel (get31720 ragezone)
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Angel
        2.0 - Second Version by happydud3 & XotiCraze
        3.0 - Third Version by RonanLana (HeavenMS)
---------------------------------------------------------------------------------------------------
**/

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {  
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    } else if (mode == 1) {
        status++;
    } else {
        status--;
    }
    
    var eim = cm.getEventInstance();
    if(eim == null) {
        cm.warp(680000000,0);
        cm.dispose();
        return;
    }
    
    var isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));
		
    switch (status) {
        case 0:
            if(cm.getMapId() == 680000300) {
                cm.sendYesNo("你确定要退出舞台回到巴莫利亚？这样你就可以跳过奖金阶段了.");
            } else {
                var hasEngagement = false;
                for (var x = 4031357; x <= 4031364; x++) {
                    if (cm.haveItem(x, 1)) {
                        hasEngagement = true;
                        break;
                    }
                }

                if (cm.haveItem(4000313) && isMarrying) {
                    if(eim.getIntProperty("weddingStage") == 3) {
                        cm.sendOk("你们完全震撼了舞台!!!去找#b#p9201007##k 开始派对.");
                        cm.dispose();
                    } else if(hasEngagement) {
                        if (!cm.createMarriageWishlist()) {
                            cm.sendOk("你已经寄出你的愿望了...");
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("哦，嘿，这场盛赞派对的证书呢？天啊，我们现在不能再这样下去了...对不起，聚会结束了。");
                    }
                } else {
                    if(eim.getIntProperty("weddingStage") == 3) {
                        if(!isMarrying) {
                            cm.sendYesNo("你们没错过吧？我们的超级明星在一起工作得很好，很快他们就要开始派对了。你真的要退出演出回到巴莫利亚吗？");
                        } else {
                            cm.sendOk("你们完全震撼了舞台!!! 去找 #b#p9201007##k开始派对.");
                            cm.dispose();
                        }
                    } else {
                        cm.sendYesNo("你确定要离开舞台，去巴莫利亚？你将跳过奖金阶段。");
                    }
                }
            }
            
            
            break;
            
        case 1:
            cm.warp(680000000,0);
            cm.dispose();
            break;
    }
}
