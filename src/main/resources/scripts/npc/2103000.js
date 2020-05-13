/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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
/* Oasis near Ariant Castle
 */

importPackage(Packages.client);

function isTigunMorphed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210005;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                if(cm.isQuestStarted(3900) && cm.getQuestProgressInt(3900) != 5) {
                        cm.sendOk("#b(你喝了绿洲里的水，感到神清气爽.)", 2);
                        cm.setQuestProgress(3900, 5);
                } else if(cm.isQuestCompleted(3938)) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你发现一绺头发（可能是蒂贡的）漂浮在水面上，然后抓住了它。记住如何#bJano#k 上次你做了一个新的 #t2210005#", 2);
                                }
                        } else {
                                cm.sendOk("您没有足够的空间.", 2);
                        }
                } else if(cm.isQuestStarted(3934) || (cm.isQuestCompleted(3934) && !cm.isQuestCompleted(3935))) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你在河里找到一个奇怪的瓶子。看起来像是一个模仿城堡守卫的变形瓶，也许有了它你可以在里面自由漫步.", 2);
                                }
                        } else {
                                cm.sendOk("你在河里发现了一个奇怪的瓶子。但是你决定忽略它，因为你没有足够的空间来存放它.", 2);
                        }
                }
                
                cm.dispose();
        }
    }
}