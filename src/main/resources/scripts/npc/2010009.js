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
var status;
var choice;
var guildName;

var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("���!��# ������ # k��ֻ�й���᳤���Գ��Գ������ᡣ");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("   ����������ŷ�� �ܸ���Ϊ������#k\r\n\r\n#b#L0#����Ҫ֪������������ʲô#l\r\n#L1#��Ҫ��ô��������������#l\r\n#L2#����Ҫ������������#l\r\n#L3#����Ҫ��������Ĺ��ᵽ����#l\r\n#L4#����Ҫ��ɢ��������#l");
    }
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("�������˾�����˵������������๫�����һ���������塣�Ҹ��������Щ���ᡣ");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("Ϊ�˽���һ���������ˣ������ҽ�������btwo�Ĺ���᳤������ͬһ��Ƶ����ͬһ�����������Ŷӵ��쵼�˽�������Ϊ����᳤�������ֻ�����������������µĹ��ᣬ������ʱ������ƣ������ͨ�����ҽ�̸��ȷ���������������Ͷ��һ����ɷѡ�");
            cm.dispose();
        } else if(selection == 2) {
            if(!cm.isLeader()) {
                cm.sendNext("�������������ᣬ�������������������̸̸����/����������Ϊ������쵼�ˡ�");
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("����Ĺ����Ѿ�����һ������ע��ʱ���㲻�ܴ����������ˡ�");
                cm.dispose();
                return;
            }
            
            cm.sendYesNo("Ŷ��������Ȥ����������?��������ĵ�ǰ������#b" + allianceCost + " ���#k.");
        } else if (selection == 3) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("�����û�й��ᣬ��Ͳ�����չ����.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("����ͨ��#rone����#k���������������?�������ķ����� #b" + increaseCost + " ���#k.");
            else {
                cm.sendNext("ֻ�й���᳤�������󹤻������.");
                cm.dispose();
            }
        } else if(selection == 4) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("�����û�й��ᣬ��Ͳ��ܽ�ɢ����.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("��ȷ��Ҫ��ɢ������?");
            else {
                cm.sendNext("ֻ�й���᳤���Խ�ɢ���ᡣ");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            if(cm.getMeso() < allianceCost) {
                cm.sendOk("��û���㹻�Ľ�����������Ҫ��");
                cm.dispose();
                return;
            }
            cm.sendGetText("���������������¹�������ơ�(���ơ�12����ĸ)");
        } else if (choice == 3) {
            if(cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("��������Ѿ��ﵽ��������������");
                cm.dispose();
                return;
            }
            if(cm.getMeso() < increaseCost) {
                cm.sendOk("��û���㹻�Ľ�����������Ҫ��");
                cm.dispose();
                return;
            }
            
            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("����������ڿ��Զ����һ�����ᡣ");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("�㲻�ܽ�ɢһ�������ڵĹ��ᡣ");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("��Ĺ����Ѿ���ɢ��");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo("�� '"+ guildName + "'��Ĺ���������ʲô?");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("�����Ʋ����ã���ѡ����������."); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null)
                cm.sendOk("�����������������һ���������������Ƿ�������������ȷ������������Ŀǰ��û���ڹ���ע�ᡣ����������У������Ĺ������䲻Ӧ�ú���2��һ��.");
            else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("���Ѿ��ɹ��ؽ�����һ�����ᡣ");
            }
            cm.dispose();
        }
    }
}