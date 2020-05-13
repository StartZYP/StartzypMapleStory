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
function start() {
    cm.sendOk("<留言板> \r\n 你是一个拥有足够勇气和信任的家族成员吗？那就接受家族任务，挑战自己吧！\r\n\r\n#b参与 :#k\r\n1. 家族的队伍必须至少6人!\r\n2. 家族任务的组长必须是族长或是副族长!\r\n3. 如果家族成员的人数下降到6以下,或如果组长决定提前结束,则家族任务可能会提前结束!");
    cm.dispose();
}