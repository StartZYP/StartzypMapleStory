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
	Konpei - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Fixed by Moogra
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
function start() {
    cm.sendSimple ("What do you want from me?\r #L0##b�ռ�һЩ���ڲ�������Ϣ.#l\r\n#L1#����ȥ�Ĳ���֮����#l\r\n#L2#û�С�#l#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendNext("�ҿ��Դ���ȥ�����������ﵽ���������鷳�ı�ͽ������Ҫ�ǳ�ǿ����¸Ҳ��ܽ���. �����δ�������ҵ���������������������ϰ���ϰ�.�����������ף�������ط�����ķ���ÿ��ֻ�ܽ���һ�Ρ��ϰ�ķ��䲻�����߰���ĵط����ҽ����㲻Ҫ���Ƕ���̫�ã���һ��ȥ�͵�Ѹ�ٴ�������¡��ϰ屾���Ǹ����ѶԸ��ĵ��ˣ�����ȥ���ϰ��·���������һЩǿ���ޱȵĵ��ˣ��ⲻ���ס�");
                cm.dispose();
            } else if (selection == 1)
                cm.sendNext("Ŷ���¸ҵ��Ǹ�����һֱ�ڵ���ĵ���. �������Щ��ͽ��ң���⣬�Ͳ�֪���⸽���ᷢ��ʲô. ����֮ǰ,��ϣ�������չ˺����ǡ�����Ҫʱ�̱��־��裬��Ϊ�ϰ�̫ǿӲ�ˣ������߶��޷�Ӧ�������ǣ���������۾����ҿ��Կ����ϰ���۾�����������������������顣�߰ɣ�");
            else {
                cm.sendOk("����һ��æµ���ˣ�����Զһ�㣡");
                cm.dispose();
            }
        } else {
            cm.warp(801040000, "in00");
            cm.dispose();
        }
    }
}