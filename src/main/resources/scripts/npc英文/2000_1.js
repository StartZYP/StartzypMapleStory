var transportMenu = Array("boss地圖","練級傳送","城镇傳送","跳跳地圖");
var sels = Array(Array(
		Array(100000005,0,"铁甲猪公园III"),
		Array(105070002,0,"蘑菇王之墓"), 
		Array(105090900,0,"被诅咒的寺院"), 									
		Array(240020402,0,"喷火龙栖息地"), 
		Array(240020101,0,"格瑞芬多森林"), 
		Array(230040420,0,"皮亚奴斯洞穴"), 
		Array(220080000,0,"时间塔的本源"), 
		Array(211042300,0,"扎昆入口"), 						
		Array(240040700,0,"暗黑龙王洞穴") 														
		),
		Array(
		Array(104040000,0,"适合 1 ~ 15 级玩家。"), 
		Array(103000101,0,"适合 20 ~ 30 级玩家。"), 
		Array(103000105,0,"适合 50 ~ 70 级玩家。"), 
		Array(101030110,0," 适合 40 ~ 60 级玩家。"), 
		Array(106000002,0,"适合 40 ~ 60 级玩家。"), 
		Array(101030103,0,"适合 40 ~ 60 级玩家。"), 
		Array(101040001,0,"适合 20 ~ 35 级玩家。"), 
		Array(101040003,0,"适合 20 ~ 35 级玩家。"), 
		Array(101030001,0,"适合 20 ~ 35 级玩家。"), 
		Array(104010001,0,"适合 10 ~ 20 级玩家。"), 
		Array(105070001,0,"适合 20 ~ 40 级玩家。"), 
		Array(105090300,0,"适合 40 ~ 70 级玩家。"), 
		Array(105040306,0,"适合 60 ~ 80 级玩家。"), 
		Array(230020000,0,"适合 30 ~ 40 级玩家。"), 
		Array(230010400,0,"适合 40 ~ 50 级玩家。"), 
		Array(211041400,0,"适合 55 ~ 70 级玩家。"), 
		Array(222010000,0,"适合 20 ~ 50 级玩家。"), 
		Array(220010500,0,"适合 40 ~ 70 级玩家。"), 
		Array(251010000,0,"适合 45 ~ 60 级玩家。"), 
		Array(250020000,0,"适合 50 ~ 60 级玩家。"),
		Array(800020130,0,"适合 50 ~ 70 级玩家。"), 
		Array(200040000,0,"适合 35 ~ 60 级玩家。"),
		Array(541010010,0,"适合 60 ~ 90 级玩家。"),
		Array(200010301,0,"适合 70 ~ 90 级玩家。"),
		Array(600020300,0,"适合 80 ~ 120 级玩家。"), 
		Array(240020100,0,"适合 85 ~ 120 级玩家。"),
		Array(220070201,0,"适合 85 ~ 120 级玩家。"), 
		Array(220070301,0,"适合 95 ~ 120 级玩家。"),
		Array(240040000,0,"适合 95 ~ 120 级玩家。"),
		Array(551030100,0,"适合 95 ~ 120 级玩家。"),  
		Array(541020000,0,"适合 95 ~ 150 级玩家。"),
		Array(240040500,0,"适合 100 ~ 150 级玩家。")   
		),
		Array(
		//Array(910000000,0,"自由市场"), 
		//Array(701000210,0,"大擂台"), 
		Array(1000000,0,"彩虹岛新手村"), 
		Array(104000000,0,"明珠港"), 
		Array(100000000,0,"射手村"), 
		Array(101000000,0,"魔法密林"), 
		Array(102000000,0,"勇士部落"), 
		Array(103000000,0,"废弃都市"), 
		Array(120000000,0,"诺特勒斯号码头"),
		Array(105040300,0,"林中之城"),
		Array(140000000,0,"里恩"),
		Array(200000000,0,"天空之城"),
		Array(211000000,0,"冰峰雪域"), 
		Array(230000000,0,"水下世界"),  
		Array(222000000,0,"童话村"), 
		Array(220000000,0,"玩具城"),
		Array(701000000,0,"东方神州"),
		Array(250000000,0,"武陵"), 
		Array(702000000,0,"少林寺"), 
		Array(500000000,0,"泰国"),
		Array(260000000,0,"阿里安特"),  
		Array(600000000,0,"新叶城"), 
		Array(240000000,0,"神木村"),  
		Array(261000000,0,"马加提亚"), 
		Array(221000000,0,"地球防御本部"), 
		Array(251000000,0,"百草堂"),
		Array(701000200,0,"上海豫园"),
		Array(550000000,0,"吉隆大都市"),
		Array(130000000,0,"圣地"),
		Array(551000000,0,"甘榜村"),
		Array(801000000,0,"昭和村"), 
		Array(540010000,0,"新加坡机场"),
		Array(541000000,0,"新加坡码头"),
		Array(300000000,0,"艾林森林"), 
		Array(270000100,0,"时间神殿"), 
		Array(702100000,0,"藏经阁"), 
		Array(800000000,0,"古代神社"), 
		Array(130000200,0,"圣地岔路"),
		Array(741000208,0,"钓鱼场"),
		Array(925020000,0,"武陵道场入口"),
		Array(930000000,0,"毒雾森林"),
		Array(930000010,0,"森林入口"),	
		Array(702090101,0,"英语村"),  
		Array(700000000,0,"红鸾宫")
		//Array(749020000,0,"国庆蛋糕地图")
		),
		Array(
		Array(105040316,10,"沉睡森林跳跳"),	
		Array(103000900,10,"地铁三号线跳跳"), 
		Array(109040001,10,"冒险岛活动跳跳"),     
		Array(280020000,10,"火山跳跳"), 
		Array(101000100,10,"忍苦跳跳") 											
		));
		var sel;
		var status;
function start() {
	/*var oldEquip = cm.getEquipInSlot(1);
	var newEquip = cm.getEquipInSlot(2);
	cm.eatEquip(cm.getPlayer(),oldEquip,newEquip);
	cm.removeItem(1,1,1);*/
    status = -1;
    sel = -1;
	var text = " \t\t\t  #e#d欢迎来到#r通锅锅小岛#k#n              \r\n          \r\n";
	text += "#d角色名称：#b" + cm.getName() + "#k#n\t\t  #d剩余金币：#b" + cm.getMeso() + "#k#n\r\n";
	text += "#d点卷余额：#b" + cm.getPlayer().getCashShop().getCash(1) + "#k#n\t#d         抵用余额：#b" + cm.getPlayer().getCashShop().getCash(4) + "#k#n\r\n"	;
	text += generateSelectionMenu(transportMenu);
    cm.sendSimple(text);
}
function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0 && type != 4)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
		sel = selection;
    	var text = "请选择你要去的地方吧\r\n";
  		for(var i=0;i<sels[sel].length;i++){
	 		text +="#L"+i+"##b#m"+sels[sel][i][0]+"##r\t\t"+sels[sel][i][2]+"#k#l\r\n"
		}
		cm.sendSimple(text);
	}else if(status ==1){
		
			if (cm.getPlayer().getMeso()>10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel()) {
				
				cm.warp(sels[sel][selection][0]);
				cm.gainMeso(-10*cm.getPlayer().getLevel()*cm.getPlayer().getLevel());
				cm.dispose();
								
			} else {
				cm.sendOk("你的金币不够，无法快速移动");
				cm.dispose();				
			}
		
		
	}
}
function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "##r" + array[i] + "#k#l";
				if(i%4 == 3){
					menu+="\r\n";
				}else{
					menu+="\t";
				}
        }
        return menu;
}