var quantities = Array(10, 8, 6, 5, 4, 3, 2, 1, 1, 1);
var prize1 = Array(1442047, 2000000, 2000001, 2000002, 2000003, 2000004, 2000005, 2430036, 2430037, 2430038, 2430039, 2430040); //1 day
var prize2 = Array(1442047, 4080100, 4080001, 4080002, 4080003, 4080004, 4080005, 4080006, 4080007, 4080008, 4080009, 4080010, 4080011);
var prize3 = Array(1442047, 1442048, 2022070);
var prize4 = Array(1442048, 2430082, 2430072); //7 day
var prize5 = Array(1442048, 2430091, 2430092, 2430093, 2430101, 2430102); //10 day
var prize6 = Array(1442048, 1442050, 2430073, 2430074, 2430075, 2430076, 2430077); //15 day
var prize7 = Array(1442050, 3010183, 3010182, 3010053, 2430080); //20 day
var prize8 = Array(1442050, 3010178, 3010177, 3010075, 1442049, 2430053, 2430054, 2430055, 2430056, 2430103, 2430136); //30 day
var prize9 = Array(1442049, 3010123, 3010175, 3010170, 3010172, 3010173, 2430201, 2430228, 2430229); //60 day
var prize10 = Array(1442049, 3010172, 3010171, 3010169, 3010168, 3010161, 2430117, 2430118, 2430119, 2430120, 2430137); //1 year
var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status >= 0 && mode == 0) {
			cm.dispose();
			return;
		}	
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {	
			cm.sendNext("嘿,我是 #p" + cm.getNpc() + "#, 如果你不忙……那我可以和你一起玩吗?我听说有人在这附近有一个 #r活动#k 但我不想一个人去……你想和我一起去看看吗?");
		} else if (status == 1) {	
			cm.sendSimple("嗯?什么样的活动?嗯,那是……\r\n#L0##e1.#n#b 这是什么样的活动?#k#l\r\n#L1##e2.#n#b 给我解释一下这个比赛项目。#k#l\r\n#L2##e3.#n#b 好了,我们走吧!#k#l\r\n#L3##e4.#n#b请出示直接赢到奖品的证书。#k#l");
		} else if (status == 2) {
			if (selection == 0) {
				cm.sendNext("整个这个月，冒险世界都在庆祝它的三周年纪念日! GM将在整个活动期间举办惊喜GM活动， 所以保持你的时间表，并确保参加至少一个伟大的奖品的活动!");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendSimple("这个活动有很多比赛。在你玩这个游戏之前，知道怎么玩这个游戏对你会有很大的帮助。选择一个你想知道更多的! #b\r\n#L0#椰汁大战#l\r\n#L1# 枫木体能测验#l\r\n#L2# 雪花球#l\r\n#L3# 椰子收获#l\r\n#L4# OX 测试#l\r\n#L5# 寻宝游戏#l#k");
			} else if (selection == 2) {
				var marr = cm.getQuestRecord(100295);
				if (marr.getCustomData() == null) {
					marr.setCustomData("0");
				}
				var dat = parseInt(marr.getCustomData());
				if (!cm.haveItem(5220001)) {
					cm.sendNext("你没有活动门票,无法进入,活动门票可以在商城中购买");
				} else if (!cm.canHold(4031019)) {
					cm.sendNext("你已经有了#b秘密卷轴#k");
				} else if (cm.getEvent() != null && !cm.haveItem(4031019)) {
					if (cm.getLimit() > cm.getLimitsxian()) {
					cm.sendNext("比赛的选手人数已经达到极限.目前无法进入");
					} else {
					cm.getPlayer().saveLocation("EVENT");
					cm.getPlayer().setChalkboard(null);
					marr.setCustomData("" + cm.getCurrentTime());
					cm.warp(cm.getMapId(),0);
					cm.gainItem(5220001, -1);
					}
				} else {
					cm.sendNext("要么这个活动还没有开始，你已经有了#b秘密卷轴#k，你没有活动门票,无法进入,活动门票可以在商城中购买。请稍后再试!");
				}
				cm.dispose();
			} else if (selection == 3) {
				var selStr = "你想交换哪一个直接赢的证书?";
				for (var i = 0; i < quantities.length; i++) {
					selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# 交换(" + quantities[i] + ")#l";
				}
				cm.sendSimple(selStr);
				status = 9;
			}
		} else if (status == 3) {
			if (selection == 0) {
				cm.sendNext("#b[上楼 上楼]#k 是一个游戏，参与者爬梯子到达顶部。通过选择正确的光柱，从众多的光柱门中选择正确的光柱门，爬上你的方法. \r\n\r\n游戏由三个层次组成，时间限制是 #b6 分钟#k. 在[Ola Ola], 你 #b不能跳，瞬移，加速，或增加你的速度使用药剂或物品#k. 还有一些恶作剧的光柱门，将导致你到一个陌生的地方，所以请注意那些.");
				cm.dispose();
			} else if (selection == 1) {
				cm.sendNext("#b[冒险岛的体能测试] 是一个种通过障碍物的#k 很像森林的耐心。你可以通过克服各种障碍，并在时限内到达最终目的地。 \r\n\r\n游戏由四个层次组成，时间限制是 #b15分钟#k.[冒险岛体能测试]时，你不可以使用传送或速度加成.");
				cm.dispose();
			} else if (selection == 2) {
				cm.sendNext("#b[滚雪球]#k 由两队、枫叶队和故事队组成，两队的勋章也看不见 #b在有限的时间里，哪个队把雪球滚得越远，越大#k. 如果游戏不能在时间段内决定，那么就把雪球滚到更远的地方 \r\n\r\n卷起的雪，在未攻击它g #bCtrl#k. 所有远程攻击和技能为基础的攻击将不在这里能使用, #b只有关闭的攻击将工作#k. \r\n\r\n如果一个角色接触到雪球，他/她会被送回起点。在出发点前面的雪人攻击，以防止对方从滚动的雪前进。这是一个计划好的策略，因为团队将决定是否攻击滚雪球或雪人.");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendNext("#b[椰子比赛]#k 由两队，枫叶队和故事的团队，和两支出来勋章看不到#哪个团队收集了最多椰子#k. 时间限制 #b5 分钟#k. 如果游戏结束于一条领带，一个额外的2分钟将被授予确定获胜者。如果，为了某种原因，比分保持平局，那么游戏将以平局结束。\r\n \ r所有远程攻击技能的攻击将不会在这里工作，#市邦立的近距离攻击将#如果你不有一个近距离攻击的武器，你可以购买他们通过活动地图内的NPC。无论是性格、水平的武器或技能，所有赔偿的适用将是相同的。\r\n \ r \ nbeware的重重障碍和陷阱在地图。如果角色在游戏中死亡，玩家将被淘汰出局。在椰子下降的最后一个球员的球员。只有椰子砸到地上数，这意味着不要从树上掉下来的，或者偶尔的爆炸椰子就不算。还有一个隐藏的门在地图底部的一个壳，所以使用的是明智的!");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendNext("#b[0X智力测试]#k 是一款通过X和O来获得最高智慧的游戏。一旦你加入游戏，按下小地图 #bM#k 看看X和O在哪里。总共 #r10 道题目#k 将被给予，和字符回答所有正确赢得游戏。 \r\n\r\n一旦给出了问题，使用梯子进入正确答案所在的区域，可能是X或o。如果角色没有选择答案，或者超过时间限制挂在梯子上，角色将被淘汰。请保持你的姿势直到 [正确的] 离开屏幕，然后继续。为了防止任何形式的作弊，在答题期间，所有类型的聊天都将被关闭。");
				cm.dispose();
			} else if (selection == 5) {
				cm.sendNext("#b[寻宝]#k 在这个游戏中你的目标是找到 #b宝卷轴#k 都隐藏在地图上 #rin 10 分钟#k. 将会有许多神秘的宝箱被藏起来，一旦你把它们拆开，许多东西就会从箱子里露出来。你的工作是从这些物品中挑选出宝藏卷轴。 \r\n宝箱可以被摧毁使用 #b普通攻击#k, 一旦你拥有了宝藏卷轴，你就可以通过一个负责交易物品的NPC来换取秘密卷轴。交易NPC可以在寻宝地图上找到，但你也可以通过滚动条进行交易 #bVikin#k 石港的.\r\n\r\n这个游戏有它的隐藏的入口和隐藏的传送点。要使用它们，请按#bup箭头#k 在某个地方，你会被传送到另一个地方。尝试跳跃，因为你也可能会遇到隐藏的楼梯或绳索。还会有一个宝藏箱，可以带你到一个隐藏的地点，和一个隐藏的箱子，只能通过隐藏的门户找到，所以尝试看看周围.\r\n\r\n在寻宝游戏中，所有的攻击技能都是 #r禁用#k, 所以请用常规的攻击打破这个宝藏箱。");
				cm.dispose();
			}
		} else if (status == 10) {
			if (selection < 0 || selection > quantities.length) {
				return;
			}
			var ite = 4031332 + selection;
			var quan = quantities[selection];
			var pri;
			switch(selection) {
				case 0:
					pri = prize1;
					break;
				case 1:
					pri = prize2;
					break;
				case 2:
					pri = prize3;
					break;
				case 3:
					pri = prize4;
					break;
				case 4:
					pri = prize5;
					break;
				case 5:
					pri = prize6;
					break;
				case 6:
					pri = prize7;
					break;
				case 7:
					pri = prize8;
					break;
				case 8:
					pri = prize9;
					break;
				case 9:
					pri = prize10;
					break;
				default:
					cm.dispose();
					return;
			}
			var rand = Math.floor(Math.random() * pri.length);
			if (!cm.haveItem(ite, quan)) {
				cm.sendOk("你需要 #b" + quan + " #t" + ite + "##k 用物品交换。");
			} else if (cm.getInventory(1).getNextFreeSlot() <= -1 || cm.getInventory(2).getNextFreeSlot() <= -1 || cm.getInventory(3).getNextFreeSlot() <= -1 || cm.getInventory(4).getNextFreeSlot() <= -1) {
				cm.sendOk("你需要空间放这个东西。");
			} else {
				cm.gainItem(pri[rand], 1);
				cm.gainItem(ite, -quan);
				cm.gainMeso(100000 * selection); //temporary prize lolol
			}
			cm.dispose();
		}
	}
}