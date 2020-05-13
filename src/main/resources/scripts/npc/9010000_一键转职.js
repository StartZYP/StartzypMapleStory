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
var ְҵ = Array(
	Array("սʿ", 100, 10, 0),
	Array("����", 110, 30, 100),
	Array("��ʿ", 111, 70, 110),
	Array("Ӣ��", 112, 120, 111),
	Array("׼��ʿ", 120, 30, 100),
	Array("��ʿ", 121, 70, 120),
	Array("ʥ��ʿ", 122, 120, 121),
	Array("ǹսʿ", 130, 30, 100),
	Array("����ʿ", 131, 70, 130),
	Array("����ʿ", 132, 120, 131),
	Array("ħ��ʦ", 200, 8, 0),
	Array("�𶾷�ʦ", 210, 30, 200),
	Array("����ʦ", 211, 70, 210),
	Array("��ħ��ʿ", 212, 120, 211),
	Array("���׷�ʦ", 220, 30, 200),
	Array("������ʦ", 221, 70, 220),
	Array("����ħ��ʿ", 222, 120, 221),
	Array("��ʦ", 230, 30, 200),
	Array("��˾", 231, 70, 230),
	Array("����", 232, 120, 231),
	Array("������", 300, 10, 0),
	Array("����", 310, 30, 300),
	Array("����", 311, 70, 310),
	Array("������", 312, 120, 311),
	Array("����", 320, 30, 300),
	Array("����", 321, 70, 320),
	Array("����", 322, 120, 321),
	Array("����", 400, 10, 0),
	Array("�̿�", 410, 30, 400),
	Array("��Ӱ��", 411, 70, 410),
	Array("��ʿ", 412, 120, 411),
	Array("����", 420, 30, 400),
	Array("���п�", 421, 70, 420),
	Array("����", 422, 120, 421),
	Array("����", 500, 10, 0),
	Array("ȭ��", 510, 30, 500),
	Array("��ʿ", 511, 70, 510),
	Array("���ӳ�", 512, 120, 511),
	Array("��ǹ��", 520, 30, 500),
	Array("��", 521, 70, 520),
	Array("����", 522, 120, 521),
	Array("����ʿ��һת��", 1100, 10, 1000),
	Array("����ʿ����ת��", 1110, 30, 1100),
	Array("����ʿ����ת��", 1111, 70, 1110),
	Array("����ʿ����ת��", 1112, 120, 1111),
	Array("����ʿ��һת��", 1200, 10, 1000),
	Array("����ʿ����ת��", 1210, 30, 1200),
	Array("����ʿ����ת��", 1211, 70, 1210),
	Array("����ʿ����ת��", 1212, 120, 1211),
	Array("����ʹ�ߣ�һת��", 1300, 10, 1000),
	Array("����ʹ�ߣ���ת��", 1310, 30, 1300),
	Array("����ʹ�ߣ���ת��", 1311, 70, 1310),
	Array("����ʹ�ߣ���ת��", 1312, 120, 1311),
	Array("ҹ���ߣ�һת��", 1400, 10, 1000),
	Array("ҹ���ߣ���ת��", 1410, 30, 1400),
	Array("ҹ���ߣ���ת��", 1411, 70, 1410),
	Array("ҹ���ߣ���ת��", 1412, 120, 1411),
	Array("��Ϯ�ߣ�һת��", 1500, 10, 1000),
	Array("��Ϯ�ߣ���ת��", 1510, 30, 1500),
	Array("��Ϯ�ߣ���ת��", 1511, 70, 1510),
	Array("��Ϯ�ߣ���ת��", 1512, 120, 1511),
	Array("ս��һת��", 2100, 10, 2000),
	Array("ս�񣨶�ת��", 2110, 30, 2100),
	Array("ս����ת��", 2111, 70, 2110),
	Array("ս����ת��", 2112, 120, 2111));

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
			var text = "�����תְ��\r\n"
			for(var i = 0; i < ְҵ.length; i++) {
				if(job == ְҵ[i][3] && level >= ְҵ[i][2]) {
					aaa = true;
					text += "#L" + ְҵ[i][1] + "##r" + ְҵ[i][0] + "#k#l\r\n";
				}
			}
			if(aaa) {
				cm.sendSimple(text);
			} else {
				cm.sendOk("��ǰ�ȼ���������תְ������");
				cm.dispose();
			}
		} else {
			cm.changeJobById(selection);
			cm.getPlayer().equipChanged();
			cm.sendOk("תְ�ɹ�");
			cm.dispose();
		}
	}
} 