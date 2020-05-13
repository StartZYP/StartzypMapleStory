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
	Weaver - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    cm.sendYesNo("�����ǣ����������һͬɢ����ɢ��·��ֻ��ɢ�����ٻ�ȥҲ���ԣ�����Ҳ���Խ��д�Խ�������ط��ϰ����ѵ�������������û�кͳ�����Ϥ���������ܲ�����ʹ������ô�����벻����������ѵ������");
}

function action(mode, type, selection) {
    if (mode == -1){
    } else if (mode == 0) {
        cm.sendNext("Ŷ...����û�пյ����Ӱ�������ֻҪ�ı�����Ļ�������ʱ����������~��");
    } else if (mode == 1) {
        if (cm.haveItem(4031128))
            cm.sendNext("���Ƿ��ż������һ�𣬴�Խ���ϰ�����ȥ�������ҵܵ����ա�ֻҪת���ż����϶����жԳ���õ����顣");
        else {
            cm.gainItem(4031128, 1);
            cm.sendOk("��Ү����������������ż��ɣ���Ϊֱ�ӹ�ȥ�Ļ���û���˻�֪�����ҽ���ȥ��...�ͳ���һ��Խ���ϰ������������֮�����ҵܵ�#b����#k˵���������ż���������������һͬ���У�������ʲô����ġ��Ǽ���Ŷ��");
        }
    }
    cm.dispose();
}