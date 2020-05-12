package lynfanadded;

import java.util.HashMap;
import java.util.Map;

import provider.wz.MapleDataType;
import tools.Pair;

public class 物品信息 {
	int id;
	String name;
	String desc;
	String type;
	Map<String, Pair<MapleDataType, Object>> values;
	static HashMap<String, MapleDataType> names = new HashMap<String, MapleDataType>();

	public 物品信息(int id, String name) {
		this.id = id;
		this.name = name;
		type = getType(id);
		values = new HashMap<String, Pair<MapleDataType, Object>>();
	}

	/**
	 * @information id/1000 20,23,25男脸,21,24,26,27,28女脸
	 * @information id/1000
	 *              30,33,35,36,39,40,43,45,46男发,31,32,34,37,38,41,42,44,47,48女发
	 * @information id/10000
	 *              100帽子,101,194脸饰,102眼饰,103耳环,104上衣,105套服,106下装,107鞋子,108手套,
	 *              109盾牌,110披风,111戒指,112,195坠子,113腰带,114勋章,130单手剑,131单手斧,132单手钝器,
	 *              133短刀,137短杖,138长杖,140双手剑,141双手斧,142双手钝器,143枪,144矛,145弓,
	 *              146弩,147拳套,148拳甲,149短枪,170点装武器,500,宠物,180宠物装备,181宠物功能道具,1822000宠物名片戒指,
	 *              1832000宠物聊天戒指,190,193,199骑宠,191鞍子,198椅子 ,501效果,502飞镖皮肤,503个人商店,
	 *              504传送道具,505重置道具,506取名封印,507喇叭,515会员卡,516表情,517宠物取名,518生命水,519宠物技能,
	 *              520通汇兑换,521双倍经验,524宠物消耗,536双倍爆率,539喇叭,
	 * @information id/10000
	 *              200,201,202,203,205消耗,204卷轴,206弓矢弩矢,207飞镖,210怪物召唤包,221变身药,228,229能手册,
	 *              233子弹,237兵法书,238怪物卡片,301,302椅子,370称号,3801286~3801297
	 *              生肖字符,3990000~3990019 红绿数字0-9 3991000-3991051
	 *              红绿字母A-Z,3991052-3991059盛大(黄金)纪念字母SNDA,3994066-3994049汉字字符,
	 *              3994059-3994084字母A-Z,3994559-3994562生日快乐字符,
	 * @information id/1000
	 *              4000怪物其他物品,4001,4031,4032任务道具,4002邮票,4004属性母矿,4005属性矿石,4007魔法粉末,4010金属母矿,4011金属,
	 *              4020宝石母矿,4021宝石,4030小游戏材料,4040表情,4050~4055整容美发会员卡,4060个人商店,4080小游戏,4100双倍经验,
	 *              4130,4131锻造辅助剂,4160宠物指令书,4161书籍,4170飞天猪的蛋,4210戒指,4250锻造强化宝石,4260怪物结晶,
	 * 
	 * 
	 */
	private String getType(int id) {
		switch (id / 1000) {
		case 20:
		case 23:
		case 25:
			return "脸型-男";
		case 21:
		case 24:
		case 26:
		case 27:
		case 28:
			return "脸型-女";
		case 30:
		case 33:
		case 35:
		case 36:
		case 39:
		case 40:
		case 43:
		case 45:
		case 46:
			return "发型-男";
		case 31:
		case 32:
		case 34:
		case 37:
		case 38:
		case 41:
		case 42:
		case 44:
		case 47:
		case 48:
			return "发型-女";
		case 4000:
			return "怪物其他物品";
		case 4001:
		case 4031:
		case 4032:
			return "任务道具";
		case 4002:
			return "邮票";
		case 4004:
			return "属性母矿";
		case 4005:
			return "属性矿石";
		case 4007:
			return "魔法粉末";
		case 4010:
			return "金属母矿";
		case 4011:
			return "金属";
		case 4020:
			return "宝石母矿";
		case 4021:
			return "宝石";
		case 4030:
			return "小游戏材料";
		case 4040:
			return "表情";
		case 4050:
		case 4051:
		case 4052:
		case 4053:
		case 4054:
		case 4055:
			return "整容美发会员卡";
		case 4060:
			return "个人商店";
		case 4080:
			return "小游戏";
		case 4100:
			return "双倍经验";
		case 4130:
		case 4131:
			return "锻造辅助剂";
		case 4160:
			return "宠物指令书";
		case 4161:
			return "书籍";
		case 4170:
			return "飞天猪的蛋";
		case 4210:
			return "戒指";
		case 4250:
			return "锻造强化宝石";
		case 4260:
			return "怪物结晶";
		}
		switch (id / 10000) {
		case 100:
			return "帽子";
		case 101:
		case 194:
			return "脸饰";
		case 102:
			return "眼饰";
		case 103:
			return "耳环";
		case 104:
			return "上衣";
		case 105:
			return "套服";
		case 106:
			return "下装";
		case 107:
			return "鞋子";
		case 108:
			return "手套";
		case 109:
			return "盾牌";
		case 110:
			return "披风";
		case 111:
			return "戒指";
		case 112:
		case 195:
			return "坠子";
		case 113:
			return "腰带";
		case 114:
			return "勋章";
		case 130:
			return "单手剑";
		case 131:
			return "单手斧";
		case 132:
			return "单手钝器";
		case 133:
			return "短刀";
		case 137:
			return "短杖";
		case 138:
			return "长杖";
		case 140:
			return "双手剑";
		case 141:
			return "双手斧";
		case 142:
			return "双手钝器";
		case 143:
			return "枪";
		case 144:
			return "矛";
		case 145:
			return "弓";
		case 146:
			return "弩";
		case 147:
			return "拳套";
		case 148:
			return "拳甲";
		case 149:
			return "短枪";
		case 170:
			return "点装武器";
		case 500:
			return "宠物";
		case 180:
			return "宠物装备";
		case 181:
			return "宠物功能道具";
		case 182:
			return "宠物名片戒指";
		case 183:
			return "宠物聊天戒指";
		case 190:
		case 193:
		case 199:
			return "骑宠";
		case 191:
			return "鞍子";
		case 198:
			return "椅子";
		case 501:
			return "效果";
		case 502:
			return "飞镖皮肤";
		case 503:
			return "个人商店";
		case 504:
			return "传送道具";
		case 505:
			return "重置道具";
		case 506:
			return "取名封印";
		case 507:
			return "喇叭";
		case 515:
			return "会员卡";
		case 516:
			return "表情";
		case 517:
			return "宠物取名";
		case 518:
			return "生命水";
		case 519:
			return "宠物技能";
		case 520:
			return "通汇兑换";
		case 521:
			return "双倍经验";
		case 524:
			return "宠物消耗";
		case 536:
			return "双倍爆率";
		case 539:
			return "喇叭";
		case 200:
		case 201:
		case 202:
		case 203:
		case 205:
			return "消耗";
		case 204:
			return "卷轴";
		case 206:
			return "弓矢弩矢";
		case 207:
			return "飞镖";
		case 210:
			return "怪物召唤包";
		case 221:
			return "变身药";
		case 228:
		case 229:
			return "能手册";
		case 233:
			return "子弹";
		case 237:
			return "兵法书";
		case 238:
			return "怪物卡片";
		case 301:
		case 302:
			return "椅子";
		case 370:
			return "称号";
		case 380:
			return "生肖字符";
		case 399:
			return "字符";
		}
		return "未归类";
	}

	public void insertValue(Triple<String, MapleDataType, Object> p) {
		this.values.put(p.left, new Pair<MapleDataType, Object>(p.mid, p.right));
		if (!names.containsKey(p.left)) {
			names.put(p.left, p.mid);
		}
	}

	public int getInteger(String tag) {
		int r = 0;
		Pair<MapleDataType, Object> p = values.get(tag);
		if (p != null && p.right != null) {
			if (p.left.equals(MapleDataType.INT)) {
				r = (int) p.right;
			} else if (p.left.equals(MapleDataType.SHORT)) {
				r = (short) p.right;
			} else if (p.left.equals(MapleDataType.PROPERTY)) {
				r = (int) p.right;
			}
		}
		return r;
	}

	public String getString(String tag) {
		String r = "NONE";
		Pair<MapleDataType, Object> p = values.get(tag);
		if (p.right != null) {
			if (p.left.equals(MapleDataType.STRING))
				r = (String) p.right;
		}
		return r;
	}
}
