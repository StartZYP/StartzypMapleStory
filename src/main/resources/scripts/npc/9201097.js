/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Joko <Crimsonwood Exchange Quest> - Phantom Forest: Dead Man's Gorge(610010004)
-- By ---------------------------------------------------------------------------------------------
	Ronan Lana
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Ronan Lana
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var eQuestChoices = new Array (4032007, 4032006, 4032009, 4032008, 4032007, 4032006, 4032009, 4032008);

var eQuestPrizes = new Array();

eQuestPrizes[0] = new Array ([1002801,1],  // ����ͷ��
    [1462052,1],	// ��ѻ��
    [1462006,1], 	// ������
    [1462009,1],	// ������
    [1452012,1],	// ������
    [1472031,1],        // ��֮ȭ
    [2044701,1],        // ȭ�׹�������60%
    [2044501,1],        // ����������60%
    [3010041,1],        // ��������
    [0, 750000]);       // Mesos
    
eQuestPrizes[1] = new Array ([1332077,1],  // ��ѻ�̵�
    [1322062,1],	// ��­��
    [1302068,1], 	// ������
    [4032016,1],        // ����֮��
    [2043001,1],        // ���ֽ���������60%
    [2043201,1],        // ���ֶ�����������60%
    [2044401,1],        // ì��������60%
    [2044301,1],        // ǹ��������60%
    [3010041,1],        // ��������
    [0,1250000]);       // Mesos
    
eQuestPrizes[2] = new Array ([1472072,1],   //��ѻȭ��
    [1332077,1],	// �İ�ѻ֮�
    [1402048,1], 	// ��ѻ˫�ֽ�
    [1302068,1],        // ������
    [4032017,1],        // ��г֮��
    [4032015,1],        // ��Ӱ֮��
    [2043023,1],        // ���ֽ������سɾ�100%
    [2043101,1],        // ���ָ���������60%
    [2043301,1],        // ���ָ���������60%
    [3010040,1],        // ������
    [0,2500000]);       // Mesos
    
eQuestPrizes[3] = new Array ([1002801,1],   //����ͷ��
    [1382008,1],	// ħ��֮��
    [1382006,1], 	// ����֮��
    [4032016,1],        // ����֮��
    [4032015,1],        // ��Ӱ֮��
    [2043701,1],        // ����ħ������60%
    [2043801,1],        // ����ħ������60%
    [3010040,1],        // ������
    [0,1750000]);       // Mesos

eQuestPrizes[4] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[5] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[6] = new Array ([0,3500000]);	// Mesos
eQuestPrizes[7] = new Array ([0,3500000]);	// Mesos

var requiredItem  = 0;
var lastSelection = 0;
var prizeItem     = 0;
var prizeQuantity = 0;
var itemSet;
var qnt;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("�š����������˵Ӧ�ò���ʲô���¡����ʵ���ʱ�������ң�����ܻ�õ����õĲ�Ʒ�����������������ı����⣬������ҡ�");
	cm.dispose();
	return;
    }
    
    status++;
    if (status == 0) { // first interaction with NPC
        if(cm.getQuestStatus(8225) != 2) {
            cm.sendNext("�٣��Ҳ���ǿ��������?");
            cm.dispose();
            return;
        }
        
	cm.sendNext("�٣��е�ʱ���𣿺ðɣ��ҵĹ������������ռ���Ʒ���������ط����ۣ�����Щ������ø��ӵжԣ����Ժ��ѵõ��õ���Ʒ����������ô��Ϊ�������������������");
    } else if (status == 1) {
	cm.sendYesNo("���׺ܼ򵥡������Ҫ�ģ��Ҹ���Ҫ�ġ������ǣ��Һ�һ��Ⱥ�˴򽻵�������ÿ��������ң��ұ����ṩ�Ķ��������ܸı䡣����ô��Ϊ����������");
    } else if (status == 2) {
	var eQuestChoice = makeChoices(eQuestChoices);
	cm.sendSimple(eQuestChoice);
    } else if (status == 3){
	lastSelection = selection;
	requiredItem = eQuestChoices[selection];
        
        if(selection < 4) qnt = 50;
        else qnt = 25;
        
	cm.sendYesNo("�����ǿ�������������� #b" + qnt +  " #t" + requiredItem + "##k �����ҵĶ������԰ɣ��ڽ���֮ǰ��ȷ����ı�������һ���յĿ�λ�ɹ���ʹ�á����ڣ�������ҽ�����");
    }else if (status == 4){
	itemSet = (Math.floor(Math.random() * eQuestPrizes[lastSelection].length));
	reward = eQuestPrizes[lastSelection];
	prizeItem = reward[itemSet][0];
	prizeQuantity = reward[itemSet][1];
	if(!cm.haveItem(requiredItem,qnt)){
	    cm.sendOk("��... ��ȷ������ #b" + qnt + " #t" + requiredItem + "##k? ����������������鲢�鿴��ı����Ƿ�����");
	} else if(prizeItem == 0) {
            cm.gainItem(requiredItem,-qnt);
            cm.gainMeso(prizeQuantity);
            cm.sendOk("Ϊ����� #b" + qnt + " #t"+requiredItem+"##k, ���� #b" + prizeQuantity + " mesos#k. ����ô���� ��ϲ���Ҹ�������Ʒ�� �Ҽƻ��������һ���������������ռ�������Ʒ���ҽ���ʱ����ó��...");
        } else if(!cm.canHold(prizeItem)){
	    cm.sendOk("��ı����������������������ҵ��ҡ�");
	} else {
	    cm.gainItem(requiredItem,-qnt);
	    cm.gainItem(prizeItem, prizeQuantity);
	    cm.sendOk("Ϊ����� #b" + qnt + " #t"+requiredItem+"##k, �����ҵ� #b"+prizeQuantity+" #t"+prizeItem+"##k. ����ô���� ��ϲ���Ҹ�������Ʒ�� �Ҽƻ��������һ���������������ռ�������Ʒ���ҽ���ʱ����ó��...");
	}
	cm.dispose();
    }
}

function makeChoices(a){
    var result  = "�ð�����������Ҫѡ����Ҫ���׵���Ʒ���������Խ�ã��Ҿ�Խ�п��ܸ�����õĻر�.\r\n";
    var qnty = [50, 25];
    
    for (var x = 0; x< a.length; x++){
	result += " #L" + x + "##v" + a[x] + "#  #b#t" + a[x] + "# #kx " + qnty[Math.floor(x/4)] + "#l\r\n";
    }
    return result;
}