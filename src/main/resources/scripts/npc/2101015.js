var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("�٣����ھ�������ս����û�п������ڳ���!���������ʲô?");
        cm.dispose();
        return;
    }
    
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
            menuStr = generateSelectionMenu(["��Ҫ����ҵ�ս������! / ����һ� (1) Ҭ֭��ɳ̲��", "����֪��������ھ�������Ҫ�㡣"]);
            cm.sendSimple("���ã�����Ϊ����Щʲô��?\r\n\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("��ľ���������: #b" + apqpoints + "#k �㡣����Ҫ��Խ #b100 ��#k �����ҾͿ��Ը��� #bҬ֭��ɳ̲��#k. �������㹻�ķ���ʱ�ٺ���̸.");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("��ľ���������: #b" + apqpoints + "#k ��ʵ�����Ѿ��õ����Ǹ�����! ��������̸̸, #p2101016#�ҵ����ǣ�Ȼ���ٺ�������!");
                    cm.dispose();
                } else {
                    cm.sendNext("�ۣ����������ҵ��� #b100#k ����׼�����ף������ǽ���?!");
                }
            } else if (selection == 1) {
                cm.sendOk("ս������������ҪĿ��������һ��۵������������ǾͿ��Թ��ٵػ�ȡ��ߵĽ���:��� #bҬ֭��ɳ̲��#k. ��ս�����ռ����������ڸõý�ʱ�����ҡ���ÿһ��ս���У���Ҷ��л�������Լ����ӵ�е��鱦������÷���������ҪС��!�����ĵ�����������ҵľ��� #r̫����#k, ��һ�ж�����ͽ���޹��ģ�����ֻ��׬��һ��� #r1 ��#k ֻ��.");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}