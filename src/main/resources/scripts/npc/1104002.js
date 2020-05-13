/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                var mapobj = cm.getMap();
            
                if (mode == 0 && type > 0) {
                        cm.getPlayer().dropMessage(5, "���װ�ŵ��:Ŷ��ʧȥ��Ů�ʣ���������ս���ǣ������������ˣ�����׼���ɣ�����");
                        
                        mapobj.spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new Packages.java.awt.Point(850, 0));
                        mapobj.destroyNPC(1104002);
                        
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(!cm.isQuestStarted(20407)) {
                                cm.sendOk("... ��ʿ���㻹��#b��������ⳡս��#k, ����? ��һ���˻�û��Ϊս����������׼��ʱ����ս����û����ò�ġ�������ֻ���ֱ��ŵĴ���ú�̸̸��˵������������������");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendAcceptDecline("����������!Ů���Ѿ����ҵĵ������ˣ���������һ���ܴ�Ľ���#b��ɫ֮��#k����ð�յ������㸲���������أ�����������ǣ����ߣ����õ��ǣ���Ȼ�㿴�����㹻ǿ�󣬿�����Ϊ���Ƿ���Ĳ���������#r�����������ǵ������ͼ������ǵ�Ը����#k�������Ѿ�����Ϊ���ˣ�");
                } else if (status == 1) {
                        cm.sendOk("�٣���С����#r��ħ��ʦ#k���ӡ��߿���");
                        cm.dispose();
                }
        }
}
