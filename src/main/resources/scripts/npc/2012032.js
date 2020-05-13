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
/* Harp String A
	Hidden Street - Eliza??s Garden (200010303)
 */

importPackage(Packages.tools);

var status;
var harpNote = 'A';
var harpSounds = ["do", "re", "mi", "pa", "sol", "la", "si"];   // musical order detected thanks to Arufonsu
var harpSong = "CCGGAAGFFEEDDC|GGFFEED|GGFFEED|CCGGAAGFFEEDDC|";
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        cm.getMap().broadcastMessage(MaplePacketCreator.playSound("orbis/" + harpSounds[cm.getNpc() - 2012027]));
                        
                        if(cm.isQuestStarted(3114)) {
                                var idx = -1 * cm.getQuestProgressInt(3114);
                                
                                if(idx > -1) {
                                        var nextNote = harpSong[idx];
                                        
                                        if(harpNote != nextNote) {
                                                cm.setQuestProgress(3114, 0);

                                                cm.getPlayer().announce(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
                                                cm.getPlayer().announce(MaplePacketCreator.playSound("Party1/Failed"));

                                                cm.message("��û�н��м�¼�����������¿�ʼ��");
                                        } else {
                                                nextNote = harpSong[idx + 1];

                                                if(nextNote == '|') {
                                                        idx++;

                                                        if(idx == 45) {     // finished lullaby
                                                                cm.message("һ����һ����С���ǣ��Ҷ�ô��֪������ʲô��");
                                                                cm.setQuestProgress(3114, 42);

                                                                cm.getPlayer().announce(MaplePacketCreator.showEffect("quest/party/clear"));
                                                                cm.getPlayer().announce(MaplePacketCreator.playSound("Party1/Clear"));
                                                                
                                                                cm.dispose();
                                                                return;
                                                        } else {
                                                                if(idx == 14) {
                                                                        cm.message("��˸����˸��С���ǣ�������֪������ʲô��");
                                                                } else if(idx == 22) {
                                                                        cm.message("������ĸߴ���");
                                                                } else if(idx == 30) {
                                                                        cm.message("�������ϵ���ʯ��");
                                                                }
                                                        }
                                                }

                                                cm.setQuestProgress(3114, -1 * (idx + 1));
                                        }
                                }
                        }
                    
                        cm.dispose();
                }
        }
}