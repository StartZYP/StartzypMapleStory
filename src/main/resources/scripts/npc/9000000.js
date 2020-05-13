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
/*      Author:                 Xterminator, Moogra
	NPC Name: 		Paul
	Map(s): 		Maple Road: Southperry (60000)
	Description: 	        Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("��, ����#b���#k, ����㲻æ�Ļ�...�����ܺ���һ���ȥ����? ����˵���˾ۼ������︴�𣬵��Ҳ���һ����ȥ����...�ðɣ��������һ��ȥ������");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            cm.sendSimple("�Ǻǣ�ʲô���Ļ���ţ�����...\r\n#L0##e1.#n#b ����ʲô���Ļ?#k#l\r\n#L1##e2.#n#b ��������ϸ�Ļ��Ϣ.#k#l\r\n#L2##e3.#n#b �ðɣ����ǳ���!#k#l");
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNext("�����,MapleStory������ף������!GM����������оٰ쾪ϲ��GM�,����뱣�־���,ȷ�����ٲμ�����һ����Ի�ô�!");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("���������кܶ�����������������Ϸ֮ǰ��֪����ô���������ܶࡣѡ��һ������֪�������! #b\r\n#L0# Ola Ola#l\r\n#L1# ��һ��#l\r\n#L2# ѩ���ս#l\r\n#L3# Ҭ���ջ�#l\r\n#L4# OX ����#l\r\n#L5# Ѱ��#l#k");
            } else if (selection == 2) {
                cm.sendNext("�û��δ��ʼ�����Ѿ�ӵ���ˡ������б����������ڹ�ȥ24Сʱ���Ѿ��μ��˸û�����Ժ�����!");
                cm.dispose();
            }
        } else if (status == 3) {
            if (selection == 0) {
                cm.sendNext("#b[Ola Ola]#k ��һ����Ϸ�������������ӵ��ﶥ�������ڶ���õ������ѡ����ȷ����ڣ���������������һ��. \r\n\r\n��Ϸ��Ϊ�����ȼ���ʱ�������� #b6 ����#k. �� [Ola Ola], ��#b�޷�ʹ��ҩ������Ʒ��Ծ�����͡����ٻ���������ٶ�#k. Ҳ��һЩ�����������һ��İ���ĵط���������ע��.");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendNext("#b[��֮����һ���] ��һ����Խ�ϰ��ı���#k �������ĵ�ɭ�֡�����Կ˷������ϰ����ڹ涨��ʱ���ڵ���Ŀ�ĵ�. \r\n\r\n��Ϸ��Ϊ�ĸ��ȼ���ʱ�������� #b15 ����#k. ��[��֮����һ���]��, �㽫�޷�ʹ�ô��ͻ����.");
                cm.dispose();
            } else if (selection == 2) {
                cm.sendNext("#b[ѩ�����ս]#k ����֧�������,��֧���������޵�ʱ���ڰ�ѩ�����Խ��Խ��#k. ������������ڹ涨��ʱ���ھ�������ô��ѩ����ø�Զ�Ķӻ�ʤ. \r\n\r\n��ѩ����������һ��#bCtrl#k. ����Զ�̹����ͻ��ڼ��ܵĹ��������ﶼ��������, #bֻ�н����빥������Ч#k. \r\n\r\n���һ����ɫ����ѩ����/�������ͻ���㡣�ڳ�����ǰ����ѩ�ˣ���ֹ�Է���ǰ��ѩ������һ���ƻ����ܵĲ��ԣ���Ϊ�Ŷӽ������ǹ���ѩ����ѩ��.");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendNext("#b[Ҭ���ջ�]#k �ɷ����Ӻ͹��¶���֧������ɣ���֧��������Э������˭�ռ���Ҭ�����#k. ������ #b5 ����#k. ���������ƽ�ֽ��������һ�� 2 ����ʱ�䣬Ȼ�����ݼ�¼��ȷ����ʤ��. �������ĳ��ԭ��ȷֱ���ƽ�֣���ô��������ƽ�ָ���. \r\n\r\n����Զ�̹����ͻ��ڼ��ܵĹ��������ﶼ��������, #bֻ�н����빥������Ч#k. �����û�н��̹����������������ͨ���¼���ͼ�е�NPC���򡣲�������Ը�����������Σ����е��˺�����һ����.\r\n\r\nС�ĵ�ͼ�ϵ��ϰ�������塣�����ɫ����Ϸ����������ý�ɫ������Ϸ���˳�����Ҭ�ӵ���ǰ���һ������һ�ʤ��ֻ�л��е����Ҭ�Ӳ��㣬����ζ�Ų�������ϵ�������Ҭ�ӣ�����ż����ը��Ҭ��Ҳ���㡣�ڵ�ͼ�ײ���һ������ϻ���һ�����ص���ڣ�����Ҫ���ǵ�ʹ����!");
                cm.dispose();
            } else if (selection == 4) {
                cm.sendNext("#b[OX ����]#k ��һ��ͨ��X��O��MapleStory�ʴ����Ϸ��һ���������Ϸ����#bM#k ����X��O������. �ܹ�������10�����⣬�ش���ȷ�Ľ�ɫ��Ӯ����Ϸ��\r\n\r\n�����������ʹ������ͼ������ȷ�����ڵ�����������X����O������ַ�û��ѡ��𰸻򳬹�ʱ�����ƹ�������ͼ�ϣ�����ַ�����ɾ�����뱣������λ�ã�ֱ��[��ȷ]�뿪��Ļ��Ȼ���ټ�����Ϊ�˷�ֹ�κ���ʽ�����ף��������͵����춼����OX�����йر�.");
                cm.dispose();
            } else if (selection == 5) {
                cm.sendNext("#b[Ѱ��]#k ����һ����Ϸ�����Ŀ������#r10������#k�ҵ������ڵ�ͼ�ϵ���ʵ���䡣�����кܶ����صı��ر�������, һ��������Ǵ򿪣��ܶණ���ͻ��������¶��������Ĺ������Ǵ���Щ��Ʒ����ѡ������\r\n�����������ͨ���������ݻ٣�һ����ӵ�б��������ͨ��һ����������Ʒ��NPC���任�����š�����NPC������Ѱ����ͼ���ҵ�������Ҳ����ͨ�����׾��� #bά��#k �� Lith ��.\r\n\r\n�����Ϸ�����������Ż������صĴ��͵�ķݶ��Ҫʹ�����ǣ�����ĳ��λ�ð����ϼ���k�����������͵���һ��λ�á�����������ȥ����Ϊ����ܻ��������ص�¥�ݻ�����������һ�������������һ�����صĵط�������һ�����صı���ֻ��ͨ�����ص��Ż��ҵ������������Ĵ�������\r\n\r\n��Ѱ����Ϸ��, ���еĹ������ܶ����� #r��Ч��#k, ����������ͨ�������Ʊ���.");
                cm.dispose();
            }
        }
    }
}