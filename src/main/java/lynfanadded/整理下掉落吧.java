package lynfanadded;

import java.io.File;
import java.security.Security;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import provider.MapleData;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataEntity;
import provider.MapleDataFileEntry;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import provider.wz.MapleDataType;
import server.MapleItemInformationProvider;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.MapleMonsterInformationProvider;
import tools.AutoJCE;
import tools.DatabaseConnection;
import tools.Pair;

public class 整理下掉落吧 {
	public static void main(String[] args) throws Throwable {
		System.setProperty("wzpath", "wz");
		Security.setProperty("crypto.policy", "unlimited");
		AutoJCE.removeCryptographyRestrictions();
		ArrayList<Pair<Integer, String>> allItemsIDAndNames = 读取物品();
		saveEquips(allItemsIDAndNames);//这个是读取服务端wz 导入 lt_wz_item_information到数据库
		// 清理();
		// ArrayList<MobInfo> allMobs = getAllMobInfo();
		// 把所有母矿都变成矿石();
		// 添加掉落();
		// 修改掉落();
	}

	private static void 添加掉落() throws SQLException {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con.prepareStatement("SELECT * FROM drop_data");
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			int mob = rs.getInt("dropperid");
			int item = rs.getInt("itemid");
			int chance = rs.getInt("chance");
			chance *= 3;
			chance /= 2;
			ps = con.prepareStatement("update drop_data set chance = ? where id = ?");
			ps.setInt(1, chance);
			ps.setInt(2, rs.getInt("id"));
			ps.executeUpdate();
		}
	}

	private static void 把所有母矿都变成矿石() throws SQLException {

		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps;
		ResultSet rs;
		ps = con.prepareStatement(
				"select *  from drop_data WHERE (`itemid` >= '4004000' AND `itemid` < '4005000') or(`itemid` >= '4010000' AND `itemid` < '4011000') OR(`itemid` >= '4020000' AND `itemid` < '4021000')");
		rs = ps.executeQuery();
		while (rs.next()) {
			ps = con.prepareStatement("update drop_data set itemname = ?,itemid = ?,chance = ? where id = ?");
			int id = rs.getInt("id");
			int itemid = rs.getInt("itemid") + 1000;
			int chance = rs.getInt("chance") / 10 * 3;
			String name = MapleItemInformationProvider.getInstance().getName(id);
			ps.setString(1, name);
			ps.setInt(2, itemid);
			ps.setInt(3, chance);
			ps.setInt(4, id);
			ps.executeUpdate();
		}

	}

	/**
	 * @throws SQLException
	 */
	private static void saveEquips(ArrayList<Pair<Integer, String>> allItemsIDAndNames) throws SQLException {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps;
		MapleDataProvider character = MapleDataProviderFactory
				.getDataProvider(new File(System.getProperty("wzpath") + "/Character.wz"));
		MapleDataProvider item = MapleDataProviderFactory
				.getDataProvider(new File(System.getProperty("wzpath") + "/Item.wz"));
		ArrayList<物品信息> items = new ArrayList<物品信息>();
		for (MapleDataDirectoryEntry topDir : character.getRoot().getSubdirectories()) {
			if (!topDir.getName().equalsIgnoreCase("Special") && !topDir.getName().equalsIgnoreCase("Hair")
					&& !topDir.getName().equalsIgnoreCase("Face") && !topDir.getName().equalsIgnoreCase("Afterimage")) {
				for (MapleDataFileEntry ifile : topDir.getFiles()) {
					MapleData iz = character.getData(topDir.getName() + "/" + ifile.getName());
					int id = Integer.parseInt(iz.getName().substring(0, 8));
					物品信息 物品 = new 物品信息(id, MapleItemInformationProvider.getInstance().getName(id));
					for (MapleData md : iz.getChildByPath("info").getChildren()) {
						try {
							if (md != null && md.getType() != null) {
								Triple<String, MapleDataType, Object> triple = new Triple<String, MapleDataType, Object>(
										md.getName(), md.getType(), md.getData());
								物品.insertValue(triple);
							}
						} catch (NullPointerException e) {
							System.out.println();
						}
					}
					items.add(物品);
				}
			}
		}
		for (MapleDataDirectoryEntry topDir : item.getRoot().getSubdirectories()) {
			if (!topDir.getName().equalsIgnoreCase("Special") && !topDir.getName().equalsIgnoreCase("Hair")
					&& !topDir.getName().equalsIgnoreCase("Face") && !topDir.getName().equalsIgnoreCase("Afterimage")
					&& !topDir.getName().equalsIgnoreCase("Pet")) {
				for (MapleDataFileEntry ifile : topDir.getFiles()) {
					MapleData iz = item.getData(topDir.getName() + "/" + ifile.getName());
					for (MapleData izz : iz.getChildren()) {
						int id = Integer.parseInt(izz.getName());
						物品信息 物品 = new 物品信息(id, MapleItemInformationProvider.getInstance().getName(id));
						for (MapleData md : izz.getChildByPath("info").getChildren()) {
							Triple<String, MapleDataType, Object> triple = new Triple<String, MapleDataType, Object>(
									md.getName(), md.getType(), md.getData());
							物品.insertValue(triple);
						}
						items.add(物品);
					}
				}
			}
		}
		for (物品信息 物品信息 : items) {
			ps = con.prepareStatement(
					// id,name,desc,reqLevel,repPOP,reqJob,reqSTR,reqDEX,reqINT,reqLUK,incSTR,incDEX,incINT,incLUK,incPAD,incMAD,incPDD,incMDD,incSpeed,incJump,incSwim,incMHP,incMMP,incHP,incACC,incEVA,incRMAS,incRMAL,incRMAI,incRMAF,incCraft,attackSpeed,slotmax,price,cash,hpRecovery,mpRecovery,acc,tuc,expireOnLogout,sfx,replace,knockback,quest,tradBlock,sweepForDrop,only,tamingmob,islot,equipTradeBlock,bonusExp,notExtend,level,MaxHp,epic,nameTag,effect,tradeBlock,vslot,medalTag,longRange,pachinko,recovery,fs,speed,weekly,elemDefault,attack,keywordEffect,pickupItem,accountSharable,notSale,stand,ignorePickup,consumeHP,afterImage,epicItem,onlyEquip,tradeAvailable,specialID,hide,pickupOthers,chatBalloon,consumeMP,walk,timeLimited
					"insert into lt_wz_item_information values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			ps.setInt(1, 物品信息.id);
			ps.setString(2, 物品信息.name);
			ps.setString(3, 物品信息.type);
			ps.setString(4, 物品信息.desc);
			ps.setInt(5, 物品信息.getInteger("cash"));
			ps.setInt(6, 物品信息.getInteger("reqLevel"));
			ps.setInt(7, 物品信息.getInteger("repPOP"));
			String job = null;
			switch (物品信息.getInteger("reqJob")) {
			case 0:
				job = " ";
				break;
			case 1:
				job = "战士";
				break;
			case 2:
				job = "法师";
				break;
			case 4:
				job = "弓箭手";
				break;
			case 8:
				job = "飞侠";
				break;
			case 16:
				job = "海盗";
				break;
			}
			ps.setString(8, job);
			ps.setInt(9, 物品信息.getInteger("reqSTR"));
			ps.setInt(10, 物品信息.getInteger("reqDEX"));
			ps.setInt(11, 物品信息.getInteger("reqINT"));
			ps.setInt(12, 物品信息.getInteger("reqLUK"));
			ps.setInt(13, 物品信息.getInteger("incSTR"));
			ps.setInt(14, 物品信息.getInteger("incDEX"));
			ps.setInt(15, 物品信息.getInteger("incINT"));
			ps.setInt(16, 物品信息.getInteger("incLUK"));
			ps.setInt(17, 物品信息.getInteger("incPAD"));
			ps.setInt(18, 物品信息.getInteger("incMAD"));
			ps.setInt(19, 物品信息.getInteger("incPDD"));
			ps.setInt(20, 物品信息.getInteger("incMDD"));
			ps.setInt(21, 物品信息.getInteger("incSpeed"));
			ps.setInt(22, 物品信息.getInteger("incJump"));
			ps.setInt(23, 物品信息.getInteger("incSwim"));
			ps.setInt(24, 物品信息.getInteger("incMHP"));
			ps.setInt(25, 物品信息.getInteger("incMMP"));
			ps.setInt(26, 物品信息.getInteger("incHP"));
			ps.setInt(27, 物品信息.getInteger("incACC"));
			ps.setInt(28, 物品信息.getInteger("incEVA"));
			ps.setInt(29, 物品信息.getInteger("attackSpeed"));
			ps.setInt(30, 物品信息.getInteger("slotMax"));
			ps.setInt(31, 物品信息.getInteger("price"));
			System.out.println(物品信息.type);
			ps.execute();
		}
		MapleItemInformationProvider mmip = MapleItemInformationProvider.getInstance();

	}

	private static ArrayList<MobInfo> getAllMobInfo() throws SQLException {
		ArrayList<MobInfo> mis = new ArrayList<MobInfo>();
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con.prepareStatement("select * from lt_mob_info");
		ResultSet rs = ps.executeQuery();
		while (rs.next()) {
			MobInfo mi = new MobInfo();
			mi.id = rs.getInt(2);
			mi.level = rs.getInt(3);
			mi.name = rs.getString(4);
			mi.isBoss = rs.getInt(5);
			mi.hp = rs.getInt(6);
			mi.mp = rs.getInt(7);
			mi.pad = rs.getInt(8);
			mi.pdd = rs.getInt(9);
			mi.mad = rs.getInt(10);
			mi.mdd = rs.getInt(11);
			mis.add(mi);
		}
		rs.close();
		ps.close();
		return mis;
	}

	/**
	 * @author 大力
	 * @return
	 * @information 读取物品id和名称存储在数据库
	 */
	public static ArrayList<Pair<Integer, String>> 读取物品() throws SQLException {
		MapleItemInformationProvider miip = MapleItemInformationProvider.getInstance();
		ArrayList<Pair<Integer, String>> itemIdAndNames = (ArrayList<Pair<Integer, String>>) miip.getAllItems();
		// Connection con =
		// DatabaseConnection.getConnection();
		// PreparedStatement ps;
		// for (Pair<Integer, String> in :
		// itemIdAndNames) {
		// ps = con.prepareStatement(
		// "insert into lt_wz_items (itemId ,
		// itemName) values (?,?)");
		// ps.setInt(1, in.left);
		// ps.setString(2, in.right);
		// ps.execute();
		// }
		return itemIdAndNames;
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
	}

	private static void 修改掉落() throws SQLException {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con.prepareStatement("select * from drop_data");
		ResultSet rs = ps.executeQuery();
		MapleLifeFactory mlf = new MapleLifeFactory();
		Random ran = new Random();
		while (rs.next()) {
			int itemid = rs.getInt("itemid");
			int chance = rs.getInt("chance"), max = rs.getInt("maximum_quantity"), min = rs.getInt("minimum_quantity"),
					dropperid = rs.getInt("dropperid"), questid = rs.getInt("questid");
			boolean _1000 = false;
			switch (itemid / 1000) {
			case 0:// 金币
				if (mlf.getMonsterLevel(dropperid) != -1) {
					min = mlf.getMonsterLevel(dropperid);
					max = mlf.getMonsterLevel(dropperid) * 4;
					chance = 300000 + ran.nextInt(300000);
				}
				_1000 = true;
				break;
			case 4000:// 其他
				chance = 200000 + ran.nextInt(100000);
				_1000 = true;
				break;
			case 4001:
			case 4031:
			case 4032:// 任务
				chance = 150000 + ran.nextInt(60000);
				_1000 = true;
				break;
			case 4002:// 邮票
				chance = 0;
				_1000 = true;
				break;
			case 4004:// 母矿
				chance = 8000 + ran.nextInt(4000);
				_1000 = true;
				break;
			case 4005:// 矿
				chance = 6000 + ran.nextInt(2000);
				_1000 = true;
				break;
			case 4007:// 魔法粉末
				chance = 8000 + ran.nextInt(5000);
				_1000 = true;
				break;
			case 4010:// 母矿
				chance = 8000 + ran.nextInt(3000);
				_1000 = true;
				break;
			case 4011:// 矿
				chance = 6000 + ran.nextInt(2000);
				_1000 = true;
				break;
			case 4020:// 母矿
				chance = 8000 + ran.nextInt(5000);
				_1000 = true;
				break;
			case 4021:// 矿
				chance = 6000 + ran.nextInt(2000);
				_1000 = true;
				break;
			case 4130:
			case 4131:// 锻造材料
				chance = 2600 + ran.nextInt(1600);
				_1000 = true;
				break;
			case 4161:// 书籍
				chance = 1600 + ran.nextInt(600);
				_1000 = true;
				break;
			}
			if (!_1000)
				switch (itemid / 10000) {
				case 100:// 帽子
					chance = 300 + ran.nextInt(500);
					break;
				case 101:
				case 194:// 脸饰
					chance = 300 + ran.nextInt(500);
					break;
				case 102:// 眼饰
					chance = 300 + ran.nextInt(500);
					break;
				case 103:// 耳环
					chance = 300 + ran.nextInt(500);
					break;
				case 104:// 上衣
					chance = 300 + ran.nextInt(500);
					break;
				case 105:// 套服
					chance = 300 + ran.nextInt(500);
					break;
				case 106:// 下装
					chance = 300 + ran.nextInt(500);
					break;
				case 107:// 鞋子
					chance = 300 + ran.nextInt(500);
					break;
				case 108:// 手套
					chance = 300 + ran.nextInt(500);
					break;
				case 109:// 盾牌
					chance = 300 + ran.nextInt(500);
					break;
				case 110:// 披风
					chance = 300 + ran.nextInt(500);
					break;
				case 111:// 戒指
					chance = 300 + ran.nextInt(500);
					break;
				case 112:
				case 195:// 坠子
					chance = 300 + ran.nextInt(500);
					break;
				case 113:// 腰带
					chance = 300 + ran.nextInt(500);
					break;
				case 114:// 勋章
					chance = 300 + ran.nextInt(500);
					break;
				case 130:// 单手剑
					chance = 300 + ran.nextInt(600);
					break;
				case 131:// 131单手斧
					chance = 300 + ran.nextInt(600);
					break;
				case 132:// 132单手钝器,
					chance = 300 + ran.nextInt(600);
					break;
				case 133:// 133短刀
					chance = 300 + ran.nextInt(600);
					break;
				case 137:// 137短杖
					chance = 300 + ran.nextInt(600);
					break;
				case 138:// 138长杖
					chance = 300 + ran.nextInt(600);
					break;
				case 140:// 140双手剑
					chance = 300 + ran.nextInt(600);
					break;
				case 141:// 141双手斧
					chance = 300 + ran.nextInt(600);
					break;
				case 142:// 142双手钝器
					chance = 300 + ran.nextInt(600);
					break;
				case 143:// 143枪
					chance = 300 + ran.nextInt(600);
					break;
				case 144:// 144矛
					chance = 300 + ran.nextInt(600);
					break;
				case 145:// 145弓
					chance = 300 + ran.nextInt(600);
					break;
				case 146: // 146弩
					chance = 300 + ran.nextInt(600);
					break;
				case 147:// 147拳套
					chance = 300 + ran.nextInt(600);
					break;
				case 148:// 148拳甲
					chance = 300 + ran.nextInt(600);
					break;
				case 149:// 149短枪
					chance = 300 + ran.nextInt(600);
					break;
				case 198:// 椅子
					chance = 15 + ran.nextInt(10);
					break;
				case 200:
				case 201:
				case 202:
				case 203:
				case 205:// 消耗品
					chance = 4500 + ran.nextInt(3000);
					break;
				case 204:// 卷轴
					chance = 150 + ran.nextInt(200);
					break;
				case 206:// 弓失弩矢
					max = 50;
					min = 6;
					chance = 1500 + ran.nextInt(1500);
					break;
				case 207:// 镖
					chance = 150 + ran.nextInt(150);
					break;
				case 210:// 召唤包
					chance = 20 + ran.nextInt(20);
					break;
				case 221:// 变身药
					chance = 500 + ran.nextInt(600);
					break;
				case 228:
				case 229:// 技能书
					chance = 300 + ran.nextInt(500);
					break;
				case 233:// 子弹
					chance = 800 + ran.nextInt(800);
					break;
				case 237:// 兵法书
					chance = 200 + ran.nextInt(200);
					break;
				case 238:// 怪物卡
					chance = 300 + ran.nextInt(200);
					break;
				case 301:
				case 302:// 椅子
					chance = 30 + ran.nextInt(10);
					break;
				}
			chance = Math.min(350000, chance);
			ps = con.prepareStatement(
					"update drop_data set dropperid = ?,itemid = ?,maximum_quantity = ?,minimum_quantity = ?,questid = ?,chance = ?,droppername = ?,itemname = ?"
							+ " where id = ?");
			String dropper;
			if (mlf.getMonster(dropperid) != null)
				dropper = mlf.getMonster(dropperid).getName();
			else
				dropper = "未知";
			if (mlf.getMonster(dropperid) != null && mlf.getMonster(dropperid).isBoss()) {
				chance *= 10;
			}
			String itemName = MapleItemInformationProvider.getInstance().getName(itemid);
			ps.setInt(1, dropperid);// 2000
			ps.setInt(2, itemid);// 4031161
			ps.setInt(3, max);// 1
			ps.setInt(4, min);// 1
			ps.setInt(5, questid);// 1008
			ps.setInt(6, chance);// 81290
			ps.setString(7, dropper);
			ps.setString(8, itemName);
			ps.setInt(9, rs.getInt("id"));// 1

			ps.executeUpdate();
			System.out.println("success");
		}
	}

	public static void 读取技能() {

	}

	public static void 读取地图() {

	}

	{
		int worldEquip[] = { 1012098, 1012101, 1012102, 1012103, 1002419, 1302021, 1302024, 1302033, 1302067 };

	}
}
