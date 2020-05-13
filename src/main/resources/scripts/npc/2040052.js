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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Wiz the Librarian - Helios Tower <Library>(222020000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var questid = new Array(3615,3616,3617,3618,3630,3633,3639,3920);
var questitem = new Array(4031235,4031236,4031237,4031238,4031270,4031280,4031298,4031591);
var counter = 0;
var books;
var i;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if(counter == 0) {
				books = "";
				for(i=0; i < questid.length; i++) {
					if(cm.isQuestCompleted(questid[i])) {
						counter += 1;
						books += "\r\n#v"+questitem[i]+"# #b#t"+questitem[i]+"##k";
					}
				}
				if(counter == 0)
					counter = 99;
			}
			if(counter == 99) {
				cm.sendOk("#b#h ##k还没有归还任何一本故事书。");
				cm.dispose();
			} else {
				cm.sendNext("让我看一看。。#b#h ##k总共归还了#b"+counter+"#k故事书.归还图书清单如下："+books);
			}
		} else if (status == 1) {
			cm.sendNextPrev("图书馆现在问题解决了主要是因为你，#b#h ##k多谢你的帮助.如果这个故事又弄错了，希望你能协助我再把它修复好。");
		} else if (status == 2) {
			cm.dispose();
		}
	}
}	