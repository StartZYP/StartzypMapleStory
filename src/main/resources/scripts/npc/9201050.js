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
/* Icebyrd Slimm
	Masteria: New Leaf City (600000000)
	Handles the quiz quest. (4900)
 */

var minlevel = 10;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestCompleted(4911)) {
                cm.sendNext("�ɵúã������������е����⡣ף����;��죡");
                cm.dispose();
            } else if (cm.isQuestCompleted(4900) || cm.isQuestStarted(4900)) {  // thanks imbee for pointing out the quiz leak
                cm.sendNext("�٣�ע���ˣ�����������һ�����⣡");
                cm.dispose();
            } else {
                var selStr = "��ô�ˣ����ֽб����࣬��Ҷ���г����ܸ��˿�����������ҵ����롣��ô������Ϊ����Щʲô?#b"
                var info = new Array("����ʲô�ط�?","˭�Ǹ���˹���ؽ���?","ʲô�Ǻ��꾫�ţ�","ʲô��糺�����?","�м����������?","ʲô��װ�����?","·����ʲô��˼��","�ܿˡ���˹����ô�ˣ�","�������޷����쿴�������Ӳ���ɣ����Ĺ�����ʲô?","�������ʲôʱ��Ὺ���µ�������?","����μӲ��飡");
                for (var i = 0; i < info.length; i++)
                    selStr += "\r\n#L" + i + "# " + info[i] + "#l";
                cm.sendSimple(selStr);
            }
        } else if(status == 1) {
            switch (selection) {
                case 0:
                    cm.sendNext("��һֱ�����Ž�һ������.���������κ�һ������,ÿ���˶��ܵ���ӭ�ĳ���.����ǰס�ڿ����У������Ҿ����������Ƿ��ܴ���һ�����С����Ҽ���Ѱ���������ķ���ʱ���������������,����һЩ�����Ѿ������ǵ���������.�񸣿�˹���ؽ���һ��,�������ǵ����.������һȺ���˵�ֲ�������ȳ���.�ܿˡ���˹����һ�����԰�Ħ���ǵ�������,��˵��̫Բ����,�����Լ�Ҳû�ô�.���������ǿ����е�������,�����������������Ҽ���,��������Ϊ�������ΰ��ٵ����ѡ��.����һ��Ȱ˵,�����������Լ������˾�������.�������ǵ�̽�ռ�,·�����Ҷ���.��ͬ������ҵ��Ķ�����������ݡ��һ��ڿ����ǵ�ʱ�����˵�����������Ĺ���.���а�����ķ���ð�,���Ǿ�˵�������⸽������.��ȫ.������ǰ˵��,���ƺ��Ǻ�����,���������������������Ҳ���ʶ�����Ѿ�����Ŀ����!�㻹��֪��ʲô?");
                    status -= 2;
                    break;
                case 1:
                    cm.sendNext("һ��97�����.��������һ���ڳ���������ʱ��������.�ϼһ��һЩ���������е��鷳,����������Ե���.��Ϊ�Ҿ����Ļر�,��ͬ�⽨һ��ʱ�䲩���.�����ָо�,����������Ϊ����һ��ԭ��,��Ϊ����ֹ���ε��ᵽ,��Ҷ��δ��������һ����Ȥ�Ľ�ɫ.Ҳ�����ܷ��ָ���...");
                    status -= 2;
                    break;
                case 2:
                    cm.sendNext("�٣����ҿ��������ڽ���ʱ����Ҳ����ͬ�������⡣������Ť���㡣����ѹ�Ὣ��Ť������һ��λ�á��ҽ������������ǵ����ţ����������ǵ�����ϵͳ��");
                    status -= 2;
                    break;
                case 3:
                    cm.sendNext("�м�����ڴ�������.���ǽ��ݷ��ֵĴ��ӹ����û������.��������ҵĻ�,���ƺ�ס������һ�������Ĳ��ֺ����.����˵����Ҫ��æ̽��һ��,��Ӧ�ü�����.����ҪС��,���������ɲ����������.");
                    status -= 2;
                    break;
                case 4:
                    cm.sendNext("�����ð�.�������Ǵ���λ����Ҷ�ǵĽ���.����µĺ�ǿ��������ε�����Щ����,���������׼����ս��,�����ȥ����.������ұ�.��ҥ��˵����ͨ��һ��ʧ��ĳ���,�������ǻ�û���ҵ��κζ���.");
                    status -= 2;
                    break;
                case 5:
                    cm.sendNext("�ðɣ���Լ�������Լ��ڴ��ӵ��м���ֲ���,��վ��һ����,Ȼ��ȥ����һ���ط�.Ȼ��,��ֻ�������߶�,���ǲ�����꾫�����������г�ͨ��.���ϵĿƼ�.");
                    status -= 2;
                    break;
                case 6:
                    cm.sendNext("�ð�,�㵽�����ܿ���.�������ڽ�������.��Ʊ�ʾ��û�깤,�̵Ʊ�ʾ��û�깤.������ͷ���������������ڽ��裡");
                    status -= 2;
                    break;
                case 7:
                    cm.sendNext("��,�ܿ�.����ʶ��Щ��ѧУ��˵̫�������?��Щ����ʲô����������?ץס�Ǹ�Ů��?�ð�,���ǽܿ�,��û���Ǹ�Ů��.����Ϊ�Լ���ʧ�˻���,��ʼ����������ڸ��Լ�����ʵ���.�Ҷ�����˭�ؿ���ƿ,����������Ħ����.���������,�����ܻ���������.");
                    status -= 2;
                    break;
                case 8:
                    cm.sendNext("����ʶ������һ��ʱ����,�����������������ȼ������.�Һܾ�û��������,��������Ϊʲô.��ѵ���˺ܳ��ܳ�һ��ʱ�䵱С͵.��ʵ��,�������ǵ�һ�μ��棡�ұ�һȺ���Ե�Ģ����Χ��,������ȥ��æ.������ѡ������ʱ��,����һ������׾ٵ���.����ŵ���������˽���ѵ��,��������,����������һЩ�����������Ȥ,�ͺ���̸̸.");
                    status -= 2;
                    break;
                case 9:
                    cm.sendNext("�ܿ�,�ҵ�����.��ʹ�㿴��������,���п�����Ҳ��Ŭ������.������׼�����ˣ����Ǿʹ�.��֪������ڴ�,��Ҳ��!");
                    status -= 2;
                    break;
                case 10:
                    if (cm.getLevel() >= minlevel) {
                        cm.sendNext("û����.���������,�һ����һЩ�ö���!");
                        cm.startQuest(4900);
                    } else {
                        cm.sendNext("���Ǻܿ���,����?��������μӲ���֮ǰ,���ٶ�̽��һ����ô��?");
                    }
                    
                    cm.dispose();
                    break;
            }
        }
    }
}