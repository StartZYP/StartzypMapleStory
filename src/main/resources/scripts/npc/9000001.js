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
/* Credits to: kevintjuh93
    NPC Name:         Jean
    Map(s):         Victoria Road : Lith Harbour (104000000)
    Description:         Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("���,���ǽ�,�����Ҫ��ʼ��,����һ���߰�.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 2 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            cm.sendNextPrev("Hmm...�Ҹ���ô�죿����Ͼ�Ҫ��ʼ�ˡ������ܶ���ȥ�μӻ������������ÿ�㡣����");
        } else if (status == 2) {
            cm.sendSimple("�١�������Ϊʲô������һ��ȥ�������Ҹ����������һ��ȥ��?#k#l\r\n#L1##e1.#n#b˵����������.#k#l\r\n#L2##e2.#n#b�ð�,����һ���߰�!#k#l");
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("������,ȫ��ð�յ�������ף������!ð�յ�����Ա���ٰ���Ӧ�Ļ,������μӻ,��ʱ�������Ӧ�Ľ���������");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("���������кܶ�����������������Ϸ֮ǰ֪����ô���������ܶࡣѡ��һ������֪������ģ�#b\r\n#L0#��¥��¥#l\r\n#L1#��ߵ�#l\r\n#L2#��ѩ��#l\r\n#L3#��Ҭ��#l\r\n#L4#OX�ʴ�#l\r\n#L5#Ѱ��#l#k");
            } else if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001) 
						cm.divideTeams();
        
					cm.getEvent().minusLimit();
					cm.warp(cm.getEvent().getMapId(), 0);
					cm.dispose();
				} else {
					cm.sendNext("���δ��ʼ�����Ѿ�����#b���صľ���#k���������Ѿ��ڹ�ȥ24Сʱ�ڲμ��˴˻�����Ժ����ԣ�");
					cm.dispose();                
            }
			}
        } else if (status == 4) {
            if (selection == 0) {
                cm.sendNext("#b[��¥��¥]#k ��һ����Ϸ�������������ӵ��ﶥ���������������ڶ���õ������ѡ����ȷ����ڣ�������һ�㡣\r\n\r\n��Ϸ��Ϊ�����ȼ���ʱ��������#b6����#k.��[��¥��¥]��,��#b�޷�ʹ��ҩ������Ʒ��Ծ�����͡����ٻ���������ٶ�#k. Ҳ��һЩ���ص��Ż�������һ��İ���ĵط���������ע��!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[��ߵ�] һ����Խ�ϰ��ı����������ĵ�ɭ��. ����Կ˷������ϰ����ڹ涨��ʱ���ڵ���Ŀ�ĵ�. \r\n\r\n��Ϸ��Ϊ�ĸ��ȼ���ʱ��������#b15����#k.��[��ߵ�]��,�㽫�޷�ʹ�ô��ͻ����.");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[��ѩ��]#k�������Ŷ���ɣ���Ӻ����ӣ������Ŷ�һ��Ŭ��ȥ��ѩ��#b�ĸ��������޵�ʱ���ڰ�ѩ�����Խ�����ʤ#k.������������ڹ涨��ʱ���ھ�������ô��ѩ����ø�Զ�Ķӻ�ʤ. \r\n\r\n��ѩ����������һ��#bCtrl#k.����Զ�̹����ͻ��ڼ��ܵĹ��������ﶼ�������ã�#bֻ����ͨ��������Ч#k. \r\n\r\n���һ����ɫ����ѩ����/�������ͻ���㡣�ڳ�����ǰ����ѩ�ˣ���ֹ�Է���ǰ��ѩ������һ���ƻ����ܵĲ��ԣ���Ϊ�Ŷӽ������ǹ���ѩ����ѩ�ˡ�");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[��Ҭ��]#k�������Ŷ���ɣ���Ӻ����ӣ������Ŷ�һ��Ŭ��ȥ��Ҭ��#b�ĸ����ռ���Ҭ�����#k.ʱ��������#b5����#k.���������ƽ�ֽ���������ʱ2������ȷ��ʤ���ߡ��������ĳ��ԭ�򣬱ȷֱ���ƽ�֣���ô��������ƽ�ָ��ա�\r\n\r\n����Զ�̹����ͻ��ڼ��ܵĹ��������ﶼ�������ã�ֻ����ͨ�����������á������û����ͨ�����������������ͨ���¼���ͼ�е�NPC���򡣲���������ԡ�����������Σ����е��˺�����һ����.\r\n\r\nС�ĵ�ͼ�ϵ��ϰ�������塣�����ɫ����Ϸ����������ý�ɫ������Ϸ���˳�����Ҭ�ӵ���ǰ���һ������һ�ʤ��ֻ�л��е����Ҭ�Ӳ��㣬����ζ�Ų�������ϵ�������Ҭ�ӣ�����ż����ը��Ҭ��Ҳ���㡣��ͼ�ײ���һ�������ϻ���һ�����ص���ڣ�����Ҫ���ǵ�ʹ������");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX�ʴ�]#k��һ��ͨ���ж�X��O��������Ϸ. һ���������Ϸ, ��С��ͼ����X��O������ܹ���#r10������#k,�ش���ȷ�Ľ�ɫ��Ӯ�ñ�����\r\n\r\nһ���������,ʹ�����ӽ�����ȷ�𰸿��ܳ��ֵ�����, ��X����O. �����ɫû��ѡ��𰸣����߳���ʱ�����ƹ���������, ��ɫ����ǿ���˳����뱣��ʤ��ֱ��[�Ե�] �뿪��Ļ�ټ����� Ϊ�˷�ֹ�κ���ʽ�����ף��������͵����춼����OX�ʴ��ڼ�ر�");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[Ѱ��]#k��һ����Ϸ�����Ŀ�����ҵ�����#k�ڵ�ͼ�ϵ�������#r10����#k.��ʼʱ���кܶ����صı���, һ���㹥�����ӣ��ܶණ���ͻ�������������. ��������Ǵ���Щ��Ʒ����ѡ����ȷ�ľ���. \r\n���������#b��ͨ����#k,һ����ӵ�б��ؾ��ᣬ��Ϳ���ͨ��һ��������Ʒ���׵�NPC�������������صľ��ᡣ����NPC������Ѱ����ͼ���ҵ�������Ҳ����ͨ�����׻�þ���#b��#k�����.\r\n\r\n�����Ϸ�����δ��͵㡣��Ҫʹ�����ǣ�����ĳ��λ�ð�#b���ϼ�ͷ#k�����������͵���һ��λ�á�����������ȥ����Ϊ����ܻ��������ص�¥�ݻ�����������һ����������ȥһ�����صĵط�������һ�����صı���ֻ��ͨ�����ص�����ҵ������������Ĵ�����.\r\n\r\n��Ѱ����Ϸ�У����еĹ�������#r�ǲ����õ�#k, ����������ͨ�������Ʊ���.");
                cm.dispose();
            }
        }   
    }
}  