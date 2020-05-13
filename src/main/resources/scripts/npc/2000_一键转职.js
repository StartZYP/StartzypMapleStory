/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var 职业 = Array(
	Array("战士", 100, 10, 0),
	Array("剑客", 110, 30, 100),
	Array("勇士", 111, 70, 110),
	Array("英雄", 112, 120, 111),
	Array("准骑士", 120, 30, 100),
	Array("骑士", 121, 70, 120),
	Array("圣骑士", 122, 120, 121),
	Array("枪战士", 130, 30, 100),
	Array("龙骑士", 131, 70, 130),
	Array("黑骑士", 132, 120, 131),
	Array("魔法师", 200, 8, 0),
	Array("火毒法师", 210, 30, 200),
	Array("火毒巫师", 211, 70, 210),
	Array("火毒魔导士", 212, 120, 211),
	Array("冰雷法师", 220, 30, 200),
	Array("冰雷巫师", 221, 70, 220),
	Array("冰雷魔导士", 222, 120, 221),
	Array("牧师", 230, 30, 200),
	Array("祭司", 231, 70, 230),
	Array("主教", 232, 120, 231),
	Array("弓箭手", 300, 10, 0),
	Array("猎人", 310, 30, 300),
	Array("射手", 311, 70, 310),
	Array("神射手", 312, 120, 311),
	Array("弩弓手", 320, 30, 300),
	Array("游侠", 321, 70, 320),
	Array("箭神", 322, 120, 321),
	Array("飞侠", 400, 10, 0),
	Array("刺客", 410, 30, 400),
	Array("无影人", 411, 70, 410),
	Array("隐士", 412, 120, 411),
	Array("侠客", 420, 30, 400),
	Array("独行客", 421, 70, 420),
	Array("侠盗", 422, 120, 421),
	Array("海盗", 500, 10, 0),
	Array("拳手", 510, 30, 500),
	Array("斗士", 511, 70, 510),
	Array("冲锋队长", 512, 120, 511),
	Array("火枪手", 520, 30, 500),
	Array("大副", 521, 70, 520),
	Array("船长", 522, 120, 521),
	Array("魂骑士（一转）", 1100, 10, 1000),
	Array("魂骑士（二转）", 1110, 30, 1100),
	Array("魂骑士（三转）", 1111, 70, 1110),
	Array("魂骑士（四转）", 1112, 120, 1111),
	Array("炎术士（一转）", 1200, 10, 1000),
	Array("炎术士（二转）", 1210, 30, 1200),
	Array("炎术士（三转）", 1211, 70, 1210),
	Array("炎术士（四转）", 1212, 120, 1211),
	Array("风灵使者（一转）", 1300, 10, 1000),
	Array("风灵使者（二转）", 1310, 30, 1300),
	Array("风灵使者（三转）", 1311, 70, 1310),
	Array("风灵使者（四转）", 1312, 120, 1311),
	Array("夜行者（一转）", 1400, 10, 1000),
	Array("夜行者（二转）", 1410, 30, 1400),
	Array("夜行者（三转）", 1411, 70, 1410),
	Array("夜行者（四转）", 1412, 120, 1411),
	Array("奇袭者（一转）", 1500, 10, 1000),
	Array("奇袭者（二转）", 1510, 30, 1500),
	Array("奇袭者（三转）", 1511, 70, 1510),
	Array("奇袭者（四转）", 1512, 120, 1511),
	Array("战神（一转）", 2100, 10, 2000),
	Array("战神（二转）", 2110, 30, 2100),
	Array("战神（三转）", 2111, 70, 2110),
	Array("战神（四转）", 2112, 120, 2111));

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
	} else {
		if(mode == 0 && type > 0) {
			cm.dispose();
			return;
		}
		if(mode == 1)
			status++;
		else
			status--;

		if(status == 0) {
			var level = cm.getLevel();
			var job = cm.getJobId();
			var aaa = false;
			var text = "你可以转职了\r\n"
			for(var i = 0; i < 职业.length; i++) {
				if(job == 职业[i][3] && level >= 职业[i][2]) {
					aaa = true;
					text += "#L" + 职业[i][1] + "##r" + 职业[i][0] + "#k#l\r\n";
				}
			}
			if(aaa) {
				cm.sendSimple(text);
			} else {
				cm.sendOk("当前等级还不满足转职条件");
				cm.dispose();
			}
		} else {
			cm.changeJobById(selection);
			cm.getPlayer().equipChanged();
			cm.sendOk("转职成功");
			cm.dispose();
		}
	}
}