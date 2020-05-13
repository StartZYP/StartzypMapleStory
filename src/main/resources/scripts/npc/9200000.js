/*var Ore_1 = [4010000,
4010001,
4010002,
4010003,
4010004,
4010005,
4010006,
4020000,
4020001,
4020002,
4020003,
4020004,
4020005,
4020006,
4020007,
4020008]; //矿石
*/
var Ore_1 = [4011000,4011001,4011002,4011003,4011004,4011005,4011006,4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008]; //矿石成品
function start() 
{
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) 
{
    if (status == 1 && mode == 0) 
	{
        cm.dispose();
        return;
    }
    if (mode == 1) 
	{
        status++;
    } else 
	{
        status--;
        cm.dispose();
    }
	if (status == 0) 
	{
	var selStr="";
	selStr += "#b #e你好，#b我可以和你交换矿石，你要用哪种矿石交换？\r\n";
	selStr += "#b#L999#我没有矿石!#l\r\n";
	for (var i=0;i<Ore_1.length;i++)	//MYLYNFAN added
		if (cm.haveItem(Ore_1[i], 1)) {
			selStr+="#L"+i+"#矿石图片:#v"+Ore_1[i]+"# 矿石名称:#g#z"+Ore_1[i]+"##l#b\r\n"//MYLYNFAN added
		}
			cm.sendSimple(selStr);
	}

	if (status == 1) 
	{
		if (selection == 999)
		{
		cm.sendOk("缺少矿石就无法交换哦!");
		cm.dispose();
		}
		else {
		
		var it =selection;		
		var selStr = "#b #e你要换成哪种矿石？\r\n";
		
		for (var j=0;j<Ore_1.length;j++)	//MYLYNFAN added
		if (cm.haveItem(Ore_1[j], 1)){//MYLYNFAN added

		selStr+="#L"+j+"#矿石图片:#v"+Ore_1[j]+"# 矿石名称:#g#z"+Ore_1[j]+"##l#b\r\n"//MYLYNFAN added
			}
		
       		cm.sendSimple(selStr);
			cm.gainItem(Ore_1[it],-1);
			}	
			
	}
			
			if (status == 2) 
		{
						var is =selection;
						
            			cm.gainItem(Ore_1[is],1);
						
											
						cm.sendOk("交换成功!!");
						cm.dispose();	
		
		}
		
			
	
}