var status = 0;

var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var jobType = 21;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "���Ѿ����˺ܳ���·�����ܴﵽ������������ǻۺ�����������������Ҫ#r���˵����������λ����#k?";
        if(spawnPnpcFee > 0) {
            sendStr += "�ҿ���Ϊ�������շ�Ϊ#b " + cm.numberWithCommas(spawnPnpcFee) + "���.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("����ΰ���Ӣ���ǣ���Щ���Ͳ��ε��ģ��ǴӺܾ���ǰ���ڱ������ǵ����������¸ҵ�ͬ־�ǡ�");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("�Բ�����û���㹻����Ʒ�ڴ��˵��������λ��.");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("���㣡ϣ�����ϲ��.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("�Բ��𣬴��˵����������ˡ�����");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}