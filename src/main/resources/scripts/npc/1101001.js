 /* 
	NPC Name: 		Divine Bird
	Map(s): 		Erev
	Description: 		3rd job KoC Buff
*/
importPackage(Packages.constants.game);

function start() {
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("����ף���㣬�ҵ���ʿ�뱣��ð�յ�����");
    } else {
        cm.sendOk("��ֹͣѵ�������ÿһ�־���������������ð�յ�����ġ�");
    }
    
    cm.dispose();
}