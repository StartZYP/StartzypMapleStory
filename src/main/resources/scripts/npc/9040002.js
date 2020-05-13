/* 
 * This file is part of the OdinMS Maple Story Server
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

/* 
 * @Author Lerk
 * 
 * Shawn, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Guild Quest Info
 */

var status;
var selectedOption;

function start() {
    selectedOption = -1;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (mode == 1 && status == 3) {
            status = 0;
        }
        if (status == 0) {
            var prompt = "\r\n#b#L0# ��������˭?#l\r\n#b#L1# #t4001024#��ʲô?#l\r\n#b#L2# ��������?#l\r\n#b#L3# ���������ںܺ�.#l";
            if (selectedOption == -1) {
                prompt = "���ǵ����˻ᣬһֱ��ͼ���� '���ƽ��,' һ����������ܳ�һ��ʱ�䡣���, ���Ƿ�����³�̰�, ���ӹ�ȥ����������,�������˯�����ǻ����֣���˵�е����ر�ʯ#t4001024#���������ܾ���³�̰����ź��С������Ϊʲô�������������ҵ�#t4001024#." + prompt;
            } else {
                prompt = "�㻹������������?" + prompt;
            }
            cm.sendSimple(prompt);
        }
        else if (status == 1) {
            selectedOption = selection;
            if (selectedOption == 0) {
                cm.sendNext("��������һ������ʱ�����ӹ�ȥ������ά�����ǵ���ÿһ�����������³������������������ϵĽ�����û����֪����˭��������ʱ�������.");
            }
            else if (selectedOption == 1) {
                cm.sendNext("#t4001024#��һ������ı�ʯ,����ӵ�������˴���������ഺ.���з����ζ����,���ƺ���ÿ���˶���#t4001024#.�����еĵ�̨˵����,һ������������.");
                status = -1;
            }
            else if (selectedOption == 2) {
                cm.sendNext("����ǰ�ɳ���һ��̽�ռ�ȥѰ�������У������Ƕ�û�л�������ʹ���ǿ�ʼ�˼���̽��������һֱ�ڵȴ�ǿ������Ӧ���Ͼ���ս�ļ��壬���������ļ��塣");
            }
            else if (selectedOption == 3) {
                cm.sendOk("���? ����㻹��ʲôҪ�ʵģ�����ʱ����˵��");
                cm.dispose();
            }
            else {
                cm.dispose();
            }
        }
        else if (status == 2) { //should only be available for options 0 and 2
            if (selectedOption == 0) {
                cm.sendNextPrev("ʥ�����ǵ����һλ������һλ������������������ʿ����Ȼ����һλ�ǳ������͸���ͬ���ĵĹ���������һ�죬�������������ˣ�û���κν��͡�");
            }
            else if (selectedOption == 2) {
                cm.sendNextPrev("����������������Ŀ����̽��ʥ�����ǲ��ҵ�#t4001024#���ŶӺ������������Ҫ��");
            }
            else {
                cm.dispose();
            }
        }
    }
}