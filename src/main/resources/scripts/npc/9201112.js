var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        }
    
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.sendNext("�¼�δ����...");
            cm.dispose();
            return;
        }
        switch(cm.getPlayer().getMapId()) {
            case 610030100:
                if (status == 0) {
                    cm.sendNext("������ɹ��ˡ����Һܿ�����㣺�����Ѿ�ץ�������ˡ��ػ���ʦ���Ͼ�Ҫ���ˡ�������ÿ�㡣");
                } else if (status == 1) {
                    cm.sendNext("ͨ��Ť����ʦ�Ĵ��ű��ݻ��ˡ����Ǳ����ҵ���һ��·��һ���ܴ����Ǵ���������������·��");
                } else if (status == 2) {
                    cm.sendNext("��������⸽���ҵ���ڡ���������ÿ���ҵ������һ���ϵġ�");
                    cm.dispose();
                }
                break;
            case 610030200:
               if (status == 0) {
                    cm.sendNext("���ǳɹ��ģ����ڣ���������·��������������Ҫÿһ��ð�ռҴ�����ͨ����");
               } else if (status == 1) {
                    cm.sendNext("������Ҫ�����ǵļ�������ÿһ������Sigils�������ϡ�����������ˣ����ǾͿ��Թ�ȥ�ˡ�");
                    cm.dispose();
               }
               break;
            case 610030300:
               if (status == 0) {
                    cm.sendNext("�������������и�����źš����������ð�ռұ���������˲�ͨ����ڡ�����ע�⣺���ǵ�ͼ�ϵ�ÿһ��ǽ��ÿһ��ض����������������ӣ�����ҪС�����£�");
               } else if (status == 1) {
                    cm.sendNext("Ŷ��������Щ�������壬������ĺ�������ף����ˡ�");
                    cm.dispose();
               }
               break;
            case 610030400:
               if (status == 0) {
                    cm.sendNext("ͨ��Ť����ʦ�Ĵ��ű��ݻ��ˡ����Ǳ����ҵ���һ��·��һ���ܴ����Ǵ���������������·��");
               } else if (status == 1) {
                    cm.sendNext("��Щ�鷳������㣬������ֻ�Ƿ�ɢ���ע������Ϊ�˰������ǣ������ð�ռ�ͬʱվ������վ̨�ϡ�Ҫ��ͨ��������ÿһ���źţ�ֱ�����ǹ�����");
                    cm.dispose();
               }
               break;
            case 610030500:
               if (status == 0) {
                    cm.sendNext("���Ȼ������ôԶ���������￴�������ػ���Ҫ���ĵ��񣬵�û���κ�������");
               } else if (status == 1) {
                    cm.sendNext("������Χ��������䣬ÿ�����丽������һ������");
               } else if (status == 2) {
                    cm.sendNext("�һ���ÿ�����䶼�е�����������֮һ��");
               } else if (status == 3) {
                    cm.sendNext("�������������������ǻָ������յ��ż���");
                    cm.dispose();
               }
               break;
            case 610030700:
               cm.sendNext("���Ǹ�����Ĺ���������·ͨ��Ť�������˵ľ�е�⡣");
               cm.dispose();
               break;
        }
    }
}