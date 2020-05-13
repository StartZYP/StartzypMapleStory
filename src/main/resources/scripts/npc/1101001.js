 /* 
	NPC Name: 		Divine Bird
	Map(s): 		Erev
	Description: 		3rd job KoC Buff
*/
importPackage(Packages.constants.game);

function start() {
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("让我祝福你，我的骑士请保护冒险岛世界");
    } else {
        cm.sendOk("别停止训练。你的每一分精力都是用来保护冒险岛世界的…");
    }
    
    cm.dispose();
}