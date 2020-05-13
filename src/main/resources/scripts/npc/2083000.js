/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

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

/*The encrypted slate
 *@author Jvlaple <eat268@hotmail.com>
 */

var status = 0;

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
        if (status == 0) {
            if(cm.haveItem(4001086)) {
                cm.sendYesNo("您想现在进入#b#m240050400##k吗");
            } else if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS) {
                if(canBypassHTPQ()) {
                    cm.sendYesNo("您想现在进入#b#m240050400##k吗?");
                } else {
                    cm.sendOk("那些没有#r#t4001086##k的人在挑战#b暗黑龙王#k前,需要证明自己有足够的资格.拿到足够的#r3 证书#k来这么你能够完成接下来的任务.");    // NPC picture is so long it goes through some section of text, || to fill up that space
                    cm.dispose();
                }
            } else {
                cm.sendOk("那些没有#r#t4001086##k的人在挑战#b暗黑龙王#k前，需要证明自己有足够的资格.");
                cm.dispose();
            }
        }
        else {
            cm.warp(240050400);
            cm.dispose();
        }
    }
}

function canBypassHTPQ() {
    return cm.haveItem(4001083) && cm.haveItem(4001084) && cm.haveItem(4001085);
}