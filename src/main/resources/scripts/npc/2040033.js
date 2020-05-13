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
        Neru - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
        Xterminator
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
        1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    if (cm.haveItem(4031128)) {
        cm.sendNext("Ŷѽ...�ǲ����Ҹ���ż������ǲ�����߶�Ҳ��ɻ͵�������ݰ�...��������~�������Ҹ�Ļ���һ��ѵ�����һ������������𣿺�Ү�����ò����ף��Ҿ͸�����ߺͳ�������ܶȰɣ�");
    } else {
        cm.sendOk("���ܸ���ڹ�������ϰ��豸...�������ں͸�����̫Զ������������͵��...�Ǻ�...�����ӺǺǿ��������Ի���������һ��~");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else if (cm.getPlayer().getNoPets() == 0)
        cm.sendNextPrev("Ŷ...���ǲ��Ǻͳ���һ������ѽ������Ϊ�˳������õ��ϰ�������ﶼû�У����������ʲô���Ͻ���ȥ��~��");
    else {
        cm.gainItem(4031128, -1);
        cm.gainCloseness(4);
        cm.sendNextPrev("����ô��Ϊ���㲻���������ĳ����ϵ�����������������ʱ�䣬�������ϰ�������ѵ����ĳ������Ȼ��Ҫ�õ��Ҹ�������");
    }
    cm.dispose();
}