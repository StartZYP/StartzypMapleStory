/* @Author SharpAceX
*/

function start() {
	switch(cm.getPlayer().getMapId()) {
		case 610030500:
        		cm.sendOk("每一个盗贼都知道，最好的攻击是你永远看不到的。所以，为了最好地说明这一点，你将在一个有平台和壁架的房间里，你只能匆匆忙忙地走到那里，以及所有你的匕首或爪子必须永远闭上的眼睛。当所有的眼睛都被消除后，把小偷的雕像给我，并声称原始爪！祝你好运！");
			break;
		case 610030000:
			cm.sendOk("曾被称为“影子王子”的盗贼拥有超快的速度和力量，短程匕首和长链状爪。作为博斯顺特队的一名兼职队员，他因无与伦比的融入夜晚的能力而被重新拥有。他的传奇故事是在与克里姆森·巴尔罗格的一场战斗中发展起来的，在那场战斗中，巴尔罗格动作如此之快，以至于巴尔罗格的攻击只引起了轰动。饶毅也偶尔为那些比他不幸的人表演“寻回”。");
			break;
		case 610030530:
			if (cm.isAllReactorState(6108004, 1)) {
                                var eim = cm.getEventInstance();
                                var stgStatus = eim.getIntProperty("glpq5_room");
                                var jobNiche = cm.getPlayer().getJob().getJobNiche();

                                if ((stgStatus >> jobNiche) % 2 == 0) {
                                        if(cm.canHold(4001256, 1)) {
                                                cm.gainItem(4001256, 1);
                                                cm.sendOk("Good job.");

                                                stgStatus += (1 << jobNiche);
                                                eim.setIntProperty("glpq5_room", stgStatus);
                                        } else {
                                                cm.sendOk("先在你的背包中腾出空间。");
                                        }
                                } else {
                                        cm.sendOk("房间里的武器已经找到了。");
                                }
			} else {
				cm.sendOk("去吧，用你的机动性摧毁所有警惕的眼睛，小偷同伴。你做完了就向我汇报。");
			}
			break;
	}
	cm.dispose();
}