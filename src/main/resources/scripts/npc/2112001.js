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
/* Yulete
	Traces of Yulete (926100500)
	Talking
 */

var status;
 
function start() {
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
    
                if (status == 0) {
                        cm.sendSimple("�����...���ԣ���̩���Ų������������ˣ�Ŷ�����Ƕ�ô����������ϣ���������ڿ��ģ���Ϊ�ҽ��ںڰ��ĵؽ���ȹ��Ҹ��õ����ӡ���������һ�ж���Ϊ��������ǣ���\r\n#Ll#�٣���ƣ�����������������û�ж�����ʧ����������������������ƶ�����Щ��ֹ�Եķ��ɣ��Ա��������ǲ��ܻ����Ե��˺������һ����ǿ��Ĺ������뻵��֮�֣����ͻ���������������˵���ⲻ���յ㣬�������ĸ��죬һ�ж����������!#l");
                } else if (status == 1){
                        cm.sendNext("... ����ԭ����������ô���𣿺ðɣ������ұ����ֿ��Ա����ֵ�ΰ����������Դ�ɱ���˫�ۣ�Ҳ������˵�Ķԣ�һ���˲��ܼ򵥵������Щ������ʹ�ã�������һ·��ʴ�Լ��������ҷǳ���Ǹ��Ϊ�˲���ÿһ���ˣ���Ը�����������Ľ����Ͼ��������ٴΰ������ӡ�лл����");
                } else {
                        if(!cm.isQuestCompleted(7770)) cm.completeQuest(7770);
                        
                        cm.warp(926100600);
                        cm.dispose();
                }
        }
}