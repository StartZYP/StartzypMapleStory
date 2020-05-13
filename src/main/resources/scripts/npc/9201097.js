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

eQuestPrizes[0] = new Array ([1002801,1],  // 深蓝头巾
    [1462052,1],	// 乌鸦弩
    [1462006,1], 	// 白银弩
    [1462009,1],	// 破天弩弓
    [1452012,1],	// 青龙弓
    [1472031,1],        // 龙之拳
    [2044701,1],        // 拳套攻击卷轴60%
    [2044501,1],        // 弓攻击卷轴60%
    [3010041,1],        // 骷髅王座
    [0, 750000]);       // Mesos
    
eQuestPrizes[1] = new Array ([1332077,1],  // 乌鸦短刀
    [1322062,1],	// 碎颅锤
    [1302068,1], 	// 薄光刃
    [4032016,1],        // 视线之道
    [2043001,1],        // 单手剑攻击卷轴60%
    [2043201,1],        // 单手钝器攻击卷轴60%
    [2044401,1],        // 矛攻击卷轴60%
    [2044301,1],        // 枪攻击卷轴60%
    [3010041,1],        // 骷髅王座
    [0,1250000]);       // Mesos
    
eQuestPrizes[2] = new Array ([1472072,1],   //乌鸦拳套
    [1332077,1],	// 幽暗鸦之喙
    [1402048,1], 	// 乌鸦双手剑
    [1302068,1],        // 薄光刃
    [4032017,1],        // 和谐之道
    [4032015,1],        // 暗影之道
    [2043023,1],        // 单手剑攻击必成卷100%
    [2043101,1],        // 单手斧攻击卷轴60%
    [2043301,1],        // 单手斧攻击卷轴60%
    [3010040,1],        // 蝙蝠椅
    [0,2500000]);       // Mesos
    
eQuestPrizes[3] = new Array ([1002801,1],   //深蓝头巾
    [1382008,1],	// 魔灵之魂
    [1382006,1], 	// 白龙之杖
    [4032016,1],        // 视线之道
    [4032015,1],        // 暗影之道
    [2043701,1],        // 短杖魔力卷轴60%
    [2043801,1],        // 长杖魔力卷轴60%
    [3010040,1],        // 蝙蝠椅
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
	cm.sendOk("嗯……这对你来说应该不是什么坏事。在适当的时候来看我，你可能会得到更好的产品。不管怎样，如果你改变主意，请告诉我。");
	cm.dispose();
	return;
    }
    
    status++;
    if (status == 0) { // first interaction with NPC
        if(cm.getQuestStatus(8225) != 2) {
            cm.sendNext("嘿，我不是强盗，好吗?");
            cm.dispose();
            return;
        }
        
	cm.sendNext("嘿，有点时间吗？好吧，我的工作是在这里收集物品并在其他地方出售，但这些天怪物变得更加敌对，所以很难得到好的物品。。。你怎么认为？你想和我做点生意吗？");
    } else if (status == 1) {
	cm.sendYesNo("交易很简单。你给我要的，我给你要的。问题是，我和一大群人打交道，所以每次你见到我，我必须提供的东西都可能改变。你怎么认为？还想做吗？");
    } else if (status == 2) {
	var eQuestChoice = makeChoices(eQuestChoices);
	cm.sendSimple(eQuestChoice);
    } else if (status == 3){
	lastSelection = selection;
	requiredItem = eQuestChoices[selection];
        
        if(selection < 4) qnt = 50;
        else qnt = 25;
        
	cm.sendYesNo("让我们看看，你想用你的 #b" + qnt +  " #t" + requiredItem + "##k 带着我的东西，对吧？在交易之前，确保你的背包中有一个空的空位可供你使用。现在，你想和我交易吗？");
    }else if (status == 4){
	itemSet = (Math.floor(Math.random() * eQuestPrizes[lastSelection].length));
	reward = eQuestPrizes[lastSelection];
	prizeItem = reward[itemSet][0];
	prizeQuantity = reward[itemSet][1];
	if(!cm.haveItem(requiredItem,qnt)){
	    cm.sendOk("嗯... 你确定你有 #b" + qnt + " #t" + requiredItem + "##k? 如果是这样，则请检查并查看你的背包是否已满");
	} else if(prizeItem == 0) {
            cm.gainItem(requiredItem,-qnt);
            cm.gainMeso(prizeQuantity);
            cm.sendOk("为了你的 #b" + qnt + " #t"+requiredItem+"##k, 这是 #b" + prizeQuantity + " mesos#k. 你怎么看？ 您喜欢我给您的物品吗？ 我计划在这里待一会儿，所以如果您收集更多物品，我将随时开放贸易...");
        } else if(!cm.canHold(prizeItem)){
	    cm.sendOk("你的背包已满，清理背包后再来找到我。");
	} else {
	    cm.gainItem(requiredItem,-qnt);
	    cm.gainItem(prizeItem, prizeQuantity);
	    cm.sendOk("为了你的 #b" + qnt + " #t"+requiredItem+"##k, 这是我的 #b"+prizeQuantity+" #t"+prizeItem+"##k. 你怎么看？ 您喜欢我给您的物品吗？ 我计划在这里待一会儿，所以如果您收集更多物品，我将随时开放贸易...");
	}
	cm.dispose();
    }
}

function makeChoices(a){
    var result  = "好啊！首先你需要选择你要交易的商品。这个东西越好，我就越有可能给你更好的回报.\r\n";
    var qnty = [50, 25];
    
    for (var x = 0; x< a.length; x++){
	result += " #L" + x + "##v" + a[x] + "#  #b#t" + a[x] + "# #kx " + qnty[Math.floor(x/4)] + "#l\r\n";
    }
    return result;
}