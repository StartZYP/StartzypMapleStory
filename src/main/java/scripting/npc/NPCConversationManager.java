/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation version 3 as published by
the Free Software Foundation. You may not use, modify or distribute
this program under any other version of the GNU Affero General Public
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package scripting.npc;

import java.io.File;
import java.sql.SQLException;

import config.YamlConfig;
import net.server.Server;
import net.server.guild.MapleAlliance;
import net.server.guild.MapleGuild;
import net.server.world.MapleParty;
import net.server.world.MaplePartyCharacter;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import scripting.AbstractPlayerInteraction;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.MapleShop;
import server.MapleShopFactory;
import server.events.gm.MapleEvent;
import server.gachapon.MapleGachapon;
import server.gachapon.MapleGachapon.MapleGachaponItem;
import server.life.MaplePlayerNPC;
import server.maps.MapleMap;
import server.maps.MapleMapManager;
import server.partyquest.Pyramid;
import server.partyquest.Pyramid.PyramidMode;
import tools.LogHelper;
import tools.MaplePacketCreator;
import client.MapleCharacter;
import client.MapleClient;
import client.MapleJob;
import client.MapleSkinColor;
import client.MapleStat;
import client.Skill;
import client.SkillFactory;
import client.inventory.Item;
import client.inventory.ItemFactory;
import client.inventory.MaplePet;
import constants.game.GameConstants;
import constants.inventory.ItemConstants;
import constants.string.LanguageConstants;
import net.server.channel.Channel;
import net.server.coordinator.matchchecker.MatchCheckerListenerFactory.MatchCheckerType;
import server.MapleMarriage;
import server.MapleSkillbookInformationProvider;
import server.MapleSkillbookInformationProvider.SkillBookEntry;
import server.TimerManager;
import server.life.MapleLifeFactory;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.expeditions.MapleExpedition;
import server.expeditions.MapleExpeditionType;
import server.partyquest.AriantColiseum;
import server.partyquest.MonsterCarnival;
import tools.packets.Wedding;

import java.awt.Point;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lynfanadded.Triple;
import tools.DatabaseConnection;
import tools.FilePrinter;
import tools.Pair;

/**
 *
 * @author Matze
 */
public class NPCConversationManager extends AbstractPlayerInteraction {
        
	private int npc;
        private int npcOid;
	private String scriptName;
	private String getText;
        private boolean itemScript;
        private List<MaplePartyCharacter> otherParty;
        
        private Map<Integer, String> npcDefaultTalks = new HashMap<>();
        
        private String getDefaultTalk(int npcid) {
            String talk = npcDefaultTalks.get(npcid);
            if (talk == null) {
                talk = MapleLifeFactory.getNPCDefaultTalk(npcid);
                npcDefaultTalks.put(npcid, talk);
            }
            
            return talk;
        }
        
        public NPCConversationManager(MapleClient c, int npc, String scriptName) {
               this(c, npc, -1, scriptName, false);
        }
        
        public NPCConversationManager(MapleClient c, int npc, List<MaplePartyCharacter> otherParty, boolean test) {
                super(c);
                this.c = c;
                this.npc = npc;
                this.otherParty = otherParty;
        }
        
	public NPCConversationManager(MapleClient c, int npc, int oid, String scriptName, boolean itemScript) {
		super(c);
		this.npc = npc;
                this.npcOid = oid;
		this.scriptName = scriptName;
                this.itemScript = itemScript;
	}

	public int getNpc() {
		return npc;
	}
        
        public int getNpcObjectId() {
		return npcOid;
	}

	public String getScriptName() {
		return scriptName;
	}
        
        public boolean isItemScript() {
                return itemScript;
        }
        
        public void resetItemScript() {
                this.itemScript = false;
        }

	public void dispose() {
		NPCScriptManager.getInstance().dispose(this);
                getClient().announce(MaplePacketCreator.enableActions());
	}

	public void sendNext(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) 0));
	}

	public void sendPrev(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) 0));
	}

	public void sendNextPrev(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) 0));
	}

	public void sendOk(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
	}
        
        public void sendDefault() {
                sendOk(getDefaultTalk(npc));
        }
	/**
	 * 发送NPC消息
	 * @param text
	 */
	public void sendYesNo(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", (byte) 0));
	}

	public void sendAcceptDecline(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", (byte) 0));
	}

	public void sendSimple(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", (byte) 0));
	}

	public void sendNext(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", speaker));
	}

	public void sendPrev(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", speaker));
	}

	public void sendNextPrev(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", speaker));
	}

	public void sendOk(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", speaker));
	}

	public void sendYesNo(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 1, text, "", speaker));
	}

	public void sendAcceptDecline(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 0x0C, text, "", speaker));
	}

	public void sendSimple(String text, byte speaker) {
		getClient().announce(MaplePacketCreator.getNPCTalk(npc, (byte) 4, text, "", speaker));
	}

	public void sendStyle(String text, int styles[]) {
                if (styles.length > 0) {
                        getClient().announce(MaplePacketCreator.getNPCTalkStyle(npc, text, styles));
                } else {    // thanks Conrad for noticing empty styles crashing players
                        sendOk("Sorry, there are no options of cosmetics available for you here at the moment.");
                        dispose();
                }
	}

	public void sendGetNumber(String text, int def, int min, int max) {
		getClient().announce(MaplePacketCreator.getNPCTalkNum(npc, text, def, min, max));
	}

	public void sendGetText(String text) {
		getClient().announce(MaplePacketCreator.getNPCTalkText(npc, text, ""));
	}

	/*
	 * 0 = ariant colliseum
	 * 1 = Dojo
	 * 2 = Carnival 1
	 * 3 = Carnival 2
	 * 4 = Ghost Ship PQ?
	 * 5 = Pyramid PQ
	 * 6 = Kerning Subway
	 */
	public void sendDimensionalMirror(String text) {
		getClient().announce(MaplePacketCreator.getDimensionalMirror(text));
	}

	public void setGetText(String text) {
		this.getText = text;
	}

	public String getText() {
		return this.getText;
	}
//lynfan added below
        static String reg = "(?:')|(?:--)|(/\\*(?:.|[\\n\\r])*?\\*/)|"
			+ "(\\b(select|update|and|or|delete|insert|trancate|char|into|substr|ascii|declare|exec|count|master|into|drop|execute)\\b)";

	static Pattern sqlPattern = Pattern.compile(reg, Pattern.CASE_INSENSITIVE);// 表示忽略大小写

	public static boolean isSqlValid(String str) {
		Matcher matcher = sqlPattern.matcher(str);
		if (matcher.find()) {
			System.out.println("参数存在非法字符，请确认：" + matcher.group());// 获取非法字符：or
			return true;
		}
		return false;
	}

	// 通过道具名搜索可能要查询的道具
	public int[] getPosible(String s) throws Exception {
		if (s == null || s.length() < 2 || isSqlValid(s))
			return new int[0];
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("SELECT * FROM drop_data WHERE itemname LIKE '%" + s + "%'");
		ResultSet rs = ps.executeQuery();
		ArrayList<Integer> ids = new ArrayList<Integer>();
		while (rs.next()) {
			ids.add(rs.getInt("itemid"));
		}
		int[] idArr = new int[ids.size() > 256 ? 256 : ids.size()];
		for (int i = 0; i < idArr.length; i++) {
			idArr[i] = ids.get(i);
		}
		rs.close();
		ps.close();
		con.close();
		return idArr;
	}

	// 通过怪物名搜索可能要查询的怪物 lynfan added
	public int[] getPosiblemob(String s) throws Exception {
		if (s == null || s.length() < 2 || isSqlValid(s))
			return new int[0];
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("SELECT * FROM mobinfo WHERE mobname LIKE '%" + s + "%'");
		ResultSet rs = ps.executeQuery();
		ArrayList<Integer> ids = new ArrayList<Integer>();
		while (rs.next()) {
			ids.add(rs.getInt("mobid"));
		}
		int[] idArr = new int[ids.size() > 256 ? 256 : ids.size()];
		for (int i = 0; i < idArr.length; i++) {
			idArr[i] = ids.get(i);
		}
		rs.close();
		ps.close();
		con.close();
		return idArr;
	}

	// 通过道具代码搜索掉落这个道具的怪物
	public int[] getDrops(int itemId) throws Exception {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("SELECT * FROM drop_data WHERE itemid  = " + itemId + " order by chance desc");
		ResultSet rs = ps.executeQuery();
		ArrayList<Integer> drops = new ArrayList<Integer>();
		while (rs.next()) {
			drops.add(rs.getInt("dropperid"));
			drops.add(rs.getInt("chance"));
		}
		int[] idArr = new int[drops.size()];
		for (int i = 0; i < idArr.length; i++) {
			idArr[i] = drops.get(i);
		}
		rs.close();
		ps.close();
		con.close();
		return idArr;
	}
	// 通过continent 查询角色所在大陆的所有地图lynfan added
	public int[] searchMapbycontinent(int continent) throws SQLException {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("SELECT * FROM mapinfo WHERE continent  = " + continent + " order by mapid desc");
		ResultSet rs = ps.executeQuery();
		ArrayList<Integer> maps = new ArrayList<Integer>();
		while (rs.next()) {
			maps.add(rs.getInt("mapid"));

		}
		int[] idArr = new int[maps.size()];
		for (int i = 0; i < idArr.length; i++) {
			idArr[i] = maps.get(i);
		}
		rs.close();
		ps.close();
		con.close();
		return idArr;
	}

	// 通过怪物id查询掉落
	public int[][] getDropFromMob(int mobId) {
		try {
			Connection connection = DatabaseConnection.getConnection();
			PreparedStatement ps = connection
					.prepareStatement("select * from drop_data where dropperid = ? and questid = 0");
			ps.setInt(1, mobId);
			ResultSet rs = ps.executeQuery();
			ArrayList<Pair<Integer, Integer>> drop = new ArrayList<Pair<Integer, Integer>>();
			while (rs.next()) {
				int itemid = rs.getInt("itemid");
				int chance = rs.getInt("chance") * getPlayer().getDropRate()
						* getPlayer().getWorldServer().getDropRate();
				if (itemid == 0) {
					continue;
				}
				drop.add(new Pair<Integer, Integer>(itemid, chance));
			}
			rs.close();
			ps.close();
			connection.close();
			int[][] arr = new int[drop.size()][2];
			for (int i = 0; i < arr.length; i++) {
				arr[i][0] = drop.get(i).left;
				arr[i][1] = drop.get(i).right;
			}
			return arr;
		} catch (SQLException e) {
			return new int[0][0];
		}
	}

	// 通过怪物代码搜索这个怪物所在的地图
	public int[] getMobInMap(int mobId) throws Exception {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("SELECT * FROM lt_mob_in_map WHERE mobid  = " + mobId + " order by count desc");
		ResultSet rs = ps.executeQuery();
		ArrayList<Integer> maps = new ArrayList<Integer>();
		while (rs.next()) {
			maps.add(rs.getInt("mapid"));
		}
		int[] idArr = new int[maps.size()];
		for (int i = 0; i < idArr.length; i++) {
			idArr[i] = maps.get(i);
		}
		rs.close();
		ps.close();
		con.close();
		return idArr;
	}
//lynfan added above
        
	@Override
        public boolean forceStartQuest(int id) {
                return forceStartQuest(id, npc);
        }
        
        @Override
        public boolean forceCompleteQuest(int id) {
                return forceCompleteQuest(id, npc);
        }
        
        @Override
        public boolean startQuest(short id) {
                return startQuest((int) id);
        }
        
        @Override
        public boolean completeQuest(short id) {
                return completeQuest((int) id);
        }
        
        @Override
        public boolean startQuest(int id) {
                return startQuest(id, npc);
        }
        
        @Override
        public boolean completeQuest(int id) {
                return completeQuest(id, npc);
        }
        
	public int getMeso() {
		return getPlayer().getMeso();
	}

	public void gainMeso(int gain) {
		getPlayer().gainMeso(gain);
	}

	public void gainExp(int gain) {
		getPlayer().gainExp(gain, true, true);
	}

        @Override
	public void showEffect(String effect) {
		getPlayer().getMap().broadcastMessage(MaplePacketCreator.environmentChange(effect, 3));
	}

	public void setHair(int hair) {
		getPlayer().setHair(hair);
		getPlayer().updateSingleStat(MapleStat.HAIR, hair);
		getPlayer().equipChanged();
	}

	public void setFace(int face) {
		getPlayer().setFace(face);
		getPlayer().updateSingleStat(MapleStat.FACE, face);
		getPlayer().equipChanged();
	}

	public void setSkin(int color) {
		getPlayer().setSkinColor(MapleSkinColor.getById(color));
		getPlayer().updateSingleStat(MapleStat.SKIN, color);
		getPlayer().equipChanged();
	}

	public int itemQuantity(int itemid) {
		return getPlayer().getInventory(ItemConstants.getInventoryType(itemid)).countById(itemid);
	}

	public void displayGuildRanks() {
		MapleGuild.displayGuildRanks(getClient(), npc);
	}
        
        public boolean canSpawnPlayerNpc(int mapid) {
                MapleCharacter chr = getPlayer();
                return !YamlConfig.config.server.PLAYERNPC_AUTODEPLOY && chr.getLevel() >= chr.getMaxClassLevel() && !chr.isGM() && MaplePlayerNPC.canSpawnPlayerNpc(chr.getName(), mapid);
        }
        
        public MaplePlayerNPC getPlayerNPCByScriptid(int scriptId) {
                for(MapleMapObject pnpcObj : getPlayer().getMap().getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER_NPC))) {
                        MaplePlayerNPC pn = (MaplePlayerNPC) pnpcObj;

                        if(pn.getScriptId() == scriptId) {
                                return pn;
                        }
                }
                
                return null;
        }

	@Override
	public MapleParty getParty() {
		return getPlayer().getParty();
	}

	@Override
	public void resetMap(int mapid) {
		getClient().getChannelServer().getMapFactory().getMap(mapid).resetReactors();
	}

	public void gainCloseness(int closeness) {
		for (MaplePet pet : getPlayer().getPets()) {
                        if(pet != null) {
                                pet.gainClosenessFullness(getPlayer(), closeness, 0, 0);
                        }
		}
	}

	public String getName() {
		return getPlayer().getName();
	}

	public int getGender() {
		return getPlayer().getGender();
	}

	public void changeJobById(int a) {
		getPlayer().changeJob(MapleJob.getById(a));
	}



	public void changeJob(MapleJob job) {
		getPlayer().changeJob(job);
	}

	public String getJobName(int id) {
		return GameConstants.getJobName(id);
	}

	public MapleStatEffect getItemEffect(int itemId) {
		return MapleItemInformationProvider.getInstance().getItemEffect(itemId);
	}

	public void resetStats() {
		getPlayer().resetStats();
	}
        
        public void openShopNPC(int id) {
            MapleShop shop = MapleShopFactory.getInstance().getShop(id);
            
            if (shop != null) {
                shop.sendShop(c);
            } else {    // check for missing shopids thanks to resinate
                FilePrinter.printError(FilePrinter.NPC_UNCODED, "Shop ID: " + id + " is missing from database.");
                MapleShopFactory.getInstance().getShop(11000).sendShop(c);
            }
        }

	public void maxMastery() {
		for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/" + "String.wz")).getData("Skill.img").getChildren()) {
			try {
				Skill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
				getPlayer().changeSkillLevel(skill, (byte) 0, skill.getMaxLevel(), -1);
			} catch (NumberFormatException nfe) {
                                nfe.printStackTrace();
				break;
			} catch (NullPointerException npe) {
                                npe.printStackTrace();
				continue;
			}
		}
	}

	public void doGachapon() {
		int[] maps = {100000000, 101000000, 102000000, 103000000, 105040300, 800000000, 809000101, 809000201, 600000000, 120000000};

		MapleGachaponItem item = MapleGachapon.getInstance().process(npc);

		Item itemGained = gainItem(item.getId(), (short) (item.getId() / 10000 == 200 ? 100 : 1), true, true); // For normal potions, make it give 100.

		sendNext("You have obtained a #b#t" + item.getId() + "##k.");
		
		String map = c.getChannelServer().getMapFactory().getMap(maps[(getNpc() != 9100117 && getNpc() != 9100109) ? (getNpc() - 9100100) : getNpc() == 9100109 ? 8 : 9]).getMapName();
		
		LogHelper.logGacha(getPlayer(), item.getId(), map);
		
		if (item.getTier() > 0){ //Uncommon and Rare
			Server.getInstance().broadcastMessage(c.getWorld(), MaplePacketCreator.gachaponMessage(itemGained, map, getPlayer()));
		}
	}
        
        public void upgradeAlliance() {
                MapleAlliance alliance = Server.getInstance().getAlliance(c.getPlayer().getGuild().getAllianceId());
                alliance.increaseCapacity(1);
                
                Server.getInstance().allianceMessage(alliance.getId(), MaplePacketCreator.getGuildAlliances(alliance, c.getWorld()), -1, -1);
                Server.getInstance().allianceMessage(alliance.getId(), MaplePacketCreator.allianceNotice(alliance.getId(), alliance.getNotice()), -1, -1);
                
                c.announce(MaplePacketCreator.updateAllianceInfo(alliance, c.getWorld()));  // thanks Vcoc for finding an alliance update to leader issue
        }

	public void disbandAlliance(MapleClient c, int allianceId) {
		MapleAlliance.disbandAlliance(allianceId);
	}

	public boolean canBeUsedAllianceName(String name) {
                return MapleAlliance.canBeUsedAllianceName(name);
	}
        
        public MapleAlliance createAlliance(String name) {
            return MapleAlliance.createAlliance(getParty(), name);
        }
        
        public int getAllianceCapacity() {
                return Server.getInstance().getAlliance(getPlayer().getGuild().getAllianceId()).getCapacity();
        }

	public boolean hasMerchant() {
		return getPlayer().hasMerchant();
	}

	public boolean hasMerchantItems() {
		try {
			if (!ItemFactory.MERCHANT.loadItems(getPlayer().getId(), false).isEmpty()) {
				return true;
			}
		} catch (SQLException e) {
                        e.printStackTrace();
			return false;
		}
		if (getPlayer().getMerchantMeso() == 0) {
			return false;
		} else {
			return true;
		}
	}

	public void showFredrick() {
		c.announce(MaplePacketCreator.getFredrick(getPlayer()));
	}

	public int partyMembersInMap() {
		int inMap = 0;
		for (MapleCharacter char2 : getPlayer().getMap().getCharacters()) {
			if (char2.getParty() == getPlayer().getParty()) {
				inMap++;
			}
		}
		return inMap;
	}

	public MapleEvent getEvent() {
		return c.getChannelServer().getEvent();
	}

	public void divideTeams() {
		if (getEvent() != null) {
			getPlayer().setTeam(getEvent().getLimit() % 2); //muhaha :D
		}
	}

	public MapleCharacter getMapleCharacter(String player) {
		MapleCharacter target =  Server.getInstance().getWorld(c.getWorld()).getChannel(c.getChannel()).getPlayerStorage().getCharacterByName(player);
		return target;
	}

	public void logLeaf(String prize) {
		LogHelper.logLeaf(getPlayer(), true, prize);
	}

	public boolean createPyramid(String mode, boolean party) {//lol
		PyramidMode mod = PyramidMode.valueOf(mode);

		MapleParty partyz = getPlayer().getParty();
		MapleMapManager mapManager = c.getChannelServer().getMapFactory();

		MapleMap map = null;
		int mapid = 926010100;
		if (party) {
			mapid += 10000;
		}
		mapid += (mod.getMode() * 1000);

		for (byte b = 0; b < 5; b++) {//They cannot warp to the next map before the timer ends (:
			map = mapManager.getMap(mapid + b);
			if (map.getCharacters().size() > 0) {
				continue;
			} else {
				break;
			}
		}

		if (map == null) {
			return false;
		}

		if (!party) {
			partyz = new MapleParty(-1, new MaplePartyCharacter(getPlayer()));
		}
		Pyramid py = new Pyramid(partyz, mod, map.getId());
		getPlayer().setPartyQuest(py);
		py.warp(mapid);
		dispose();
		return true;
	}
        
        public boolean itemExists(int itemid) {
                return MapleItemInformationProvider.getInstance().getName(itemid) != null;
        }
        
        public int getCosmeticItem(int itemid) {
                if (itemExists(itemid)) {
                        return itemid;
                }
                
                int baseid;
                if (itemid < 30000) {
                        baseid = (itemid / 1000) * 1000 + (itemid % 100);
                } else {
                        baseid = (itemid / 10) * 10;
                }
                
                return itemid != baseid && itemExists(baseid) ? baseid : -1;
        }
        
        private int getEquippedCosmeticid(int itemid) {
                if (itemid < 30000) {
                        return getPlayer().getFace();
                } else {
                        return getPlayer().getHair();
                }
        }
        
        public boolean isCosmeticEquipped(int itemid) {
                return getEquippedCosmeticid(itemid) == itemid;
        }
        
        public boolean isUsingOldPqNpcStyle() {
                return YamlConfig.config.server.USE_OLD_GMS_STYLED_PQ_NPCS && this.getPlayer().getParty() != null;
        }
        
        public Object[] getAvailableMasteryBooks() {
                return MapleItemInformationProvider.getInstance().usableMasteryBooks(this.getPlayer()).toArray();
        }
        
        public Object[] getAvailableSkillBooks() {
                List<Integer> ret = MapleItemInformationProvider.getInstance().usableSkillBooks(this.getPlayer());
                ret.addAll(MapleSkillbookInformationProvider.getInstance().getTeachableSkills(this.getPlayer()));
                
                return ret.toArray();
        }
        
        public Object[] getNamesWhoDropsItem(Integer itemId) {
                return MapleItemInformationProvider.getInstance().getWhoDrops(itemId).toArray();
        }
        
        public String getSkillBookInfo(int itemid) {
                SkillBookEntry sbe = MapleSkillbookInformationProvider.getInstance().getSkillbookAvailability(itemid);
                switch (sbe) {
                        case UNAVAILABLE:
                                return "";
                              
                        case REACTOR:
                                return "    Obtainable through #rexploring#k (loot boxes).";
                            
                        case SCRIPT:
                                return "    Obtainable through #rexploring#k (field interaction).";
                        
                        case QUEST_BOOK:
                                return "    Obtainable through #rquestline#k (collecting book).";
                                
                        case QUEST_REWARD:
                                return "    Obtainable through #rquestline#k (quest reward).";

                        default:
                                return "    Obtainable through #rquestline#k.";
                }
        }
        
        // (CPQ + WED wishlist) by -- Drago (Dragohe4rt)
        public int cpqCalcAvgLvl(int map) {
            int num = 0;
            int avg = 0;
            for (MapleMapObject mmo : c.getChannelServer().getMapFactory().getMap(map).getAllPlayer()) {
                avg += ((MapleCharacter) mmo).getLevel();
                num++;
            }
            avg /= num;
            return avg;
        }

        public boolean sendCPQMapLists() {
            String msg = LanguageConstants.getMessage(getPlayer(), LanguageConstants.CPQPickRoom);
            int msgLen = msg.length();
            for (int i = 0; i < 6; i++) {
                if (fieldTaken(i)) {
                    if (fieldLobbied(i)) {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (Level: "  // "Carnival field" GMS-like improvement thanks to Jayd (jaydenseah)
                                + cpqCalcAvgLvl(980000100 + i * 100) + " / "
                                + getPlayerCount(980000100 + i * 100) + "x"
                                + getPlayerCount(980000100 + i * 100) + ")  #l\r\n";
                    }
                } else {
                    if (i >= 0 && i <= 3) {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (2x2) #l\r\n";
                    } else {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (3x3) #l\r\n";
                    }
                }
            }
            
            if (msg.length() > msgLen) {
                sendSimple(msg);
                return true;
            } else {
                return false;
            }
        }

        public boolean fieldTaken(int field) {
            if (!c.getChannelServer().canInitMonsterCarnival(true, field)) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980000100 + field * 100).getAllPlayer().isEmpty()) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980000101 + field * 100).getAllPlayer().isEmpty()) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980000102 + field * 100).getAllPlayer().isEmpty()) {
                return true;
            }
            return false;
        }

        public boolean fieldLobbied(int field) {
            if (!c.getChannelServer().getMapFactory().getMap(980000100 + field * 100).getAllPlayer().isEmpty()) {
                return true;
            }
            return false;
        }

        public void cpqLobby(int field) {
            try {
                final MapleMap map, mapExit;
                Channel cs = c.getChannelServer();
                
                map = cs.getMapFactory().getMap(980000100 + 100 * field);
                mapExit = cs.getMapFactory().getMap(980000000);
                for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                    final MapleCharacter mc = mpc.getPlayer();
                    if (mc != null) {
                        mc.setChallenged(false);
                        mc.changeMap(map, map.getPortal(0));
                        mc.announce(MaplePacketCreator.serverNotice(6, LanguageConstants.getMessage(mc, LanguageConstants.CPQEntryLobby)));
                        TimerManager tMan = TimerManager.getInstance();
                        tMan.schedule(new Runnable() {
                            @Override
                            public void run() {
                                mapClock(3 * 60);
                            }
                        }, 1500);
                        
                        mc.setCpqTimer(TimerManager.getInstance().schedule(new Runnable() {
                            @Override
                            public void run() {
                                mc.changeMap(mapExit, mapExit.getPortal(0));
                            }
                        }, 3 * 60 * 1000));
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        public MapleCharacter getChrById(int id) {
            return c.getChannelServer().getPlayerStorage().getCharacterById(id);
        }

        public void cancelCPQLobby() {
            for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                MapleCharacter mc = mpc.getPlayer();
                if (mc != null) {
                    mc.clearCpqTimer();
                }
            }
        }
        
        private void warpoutCPQLobby(MapleMap lobbyMap) {
            MapleMap out = lobbyMap.getChannelServer().getMapFactory().getMap((lobbyMap.getId() < 980030000) ? 980000000 : 980030000);
            for (MapleCharacter mc : lobbyMap.getAllPlayers()) {
                mc.resetCP();
                mc.setTeam(-1);
                mc.setMonsterCarnival(null);
                mc.changeMap(out, out.getPortal(0));
            }
        }
        
        private int isCPQParty(MapleMap lobby, MapleParty party) {
            int cpqMinLvl, cpqMaxLvl;
            
            if (lobby.isCPQLobby()) {
                cpqMinLvl = 30;
                cpqMaxLvl = 50;
            } else {
                cpqMinLvl = 51;
                cpqMaxLvl = 70;
            }
            
            List<MaplePartyCharacter> partyMembers = party.getPartyMembers();
            for (MaplePartyCharacter pchr : partyMembers) {
                if (pchr.getLevel() >= cpqMinLvl && pchr.getLevel() <= cpqMaxLvl) {
                    if (lobby.getCharacterById(pchr.getId()) == null) {
                        return 1;  // party member detected out of area
                    }
                } else {
                    return 2;  // party member doesn't fit requirements
                }
            }
            
            return 0;
        }
        
        private int canStartCPQ(MapleMap lobby, MapleParty party, MapleParty challenger) {
            int ret = isCPQParty(lobby, party);
            if (ret != 0) {
                return ret;
            }
            
            ret = isCPQParty(lobby, challenger);
            if (ret != 0) {
                return -ret;
            }
            
            return 0;
        }

        public void startCPQ(final MapleCharacter challenger, final int field) {
            try {
                cancelCPQLobby();
                
                final MapleMap lobbyMap = getPlayer().getMap();
                if (challenger != null) {
                    if (challenger.getParty() == null) {
                        throw new RuntimeException("No opponent found!");
                    }
                    
                    for (MaplePartyCharacter mpc : challenger.getParty().getMembers()) {
                        MapleCharacter mc = mpc.getPlayer();
                        if (mc != null) {
                            mc.changeMap(lobbyMap, lobbyMap.getPortal(0));
                            TimerManager tMan = TimerManager.getInstance();
                            tMan.schedule(new Runnable() {
                                @Override
                                public void run() {
                                    mapClock(10);
                                }
                            }, 1500);
                        }
                    }
                    for (MaplePartyCharacter mpc : getPlayer().getParty().getMembers()) {
                        MapleCharacter mc = mpc.getPlayer();
                        if (mc != null) {
                            TimerManager tMan = TimerManager.getInstance();
                            tMan.schedule(new Runnable() {
                                @Override
                                public void run() {
                                    mapClock(10);
                                }
                            }, 1500);
                        }
                    }
                }
                final int mapid = c.getPlayer().getMapId() + 1;
                TimerManager tMan = TimerManager.getInstance();
                tMan.schedule(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            for (MaplePartyCharacter mpc : getPlayer().getParty().getMembers()) {
                                MapleCharacter mc = mpc.getPlayer();
                                if (mc != null) {
                                    mc.setMonsterCarnival(null);
                                }
                            }
                            for (MaplePartyCharacter mpc : challenger.getParty().getMembers()) {
                                MapleCharacter mc = mpc.getPlayer();
                                if (mc != null) {
                                    mc.setMonsterCarnival(null);
                                }
                            }
                        } catch (NullPointerException npe) {
                            warpoutCPQLobby(lobbyMap);
                            return;
                        }
                        
                        MapleParty lobbyParty = getPlayer().getParty(), challengerParty = challenger.getParty();
                        int status = canStartCPQ(lobbyMap, lobbyParty, challengerParty);
                        if (status == 0) {
                            new MonsterCarnival(lobbyParty, challengerParty, mapid, true, (field / 100) % 10);
                        } else {
                            warpoutCPQLobby(lobbyMap);
                        }
                    }
                }, 11000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public void startCPQ2(final MapleCharacter challenger, final int field) {
            try {
                cancelCPQLobby();
                
                final MapleMap lobbyMap = getPlayer().getMap();
                if (challenger != null) {
                    if (challenger.getParty() == null) {
                        throw new RuntimeException("No opponent found!");
                    }
                    
                    for (MaplePartyCharacter mpc : challenger.getParty().getMembers()) {
                        MapleCharacter mc = mpc.getPlayer();
                        if (mc != null) {
                            mc.changeMap(lobbyMap, lobbyMap.getPortal(0));
                            mapClock(10);
                        }
                    }
                }
                final int mapid = c.getPlayer().getMapId() + 100;
                TimerManager tMan = TimerManager.getInstance();
                tMan.schedule(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            for (MaplePartyCharacter mpc : getPlayer().getParty().getMembers()) {
                                MapleCharacter mc = mpc.getPlayer();
                                if (mc != null) {
                                    mc.setMonsterCarnival(null);
                                }
                            }
                            for (MaplePartyCharacter mpc : challenger.getParty().getMembers()) {
                                MapleCharacter mc = mpc.getPlayer();
                                if (mc != null) {
                                    mc.setMonsterCarnival(null);
                                }
                            }
                        } catch (NullPointerException npe) {
                            warpoutCPQLobby(lobbyMap);
                            return;
                        }
                        
                        MapleParty lobbyParty = getPlayer().getParty(), challengerParty = challenger.getParty();
                        int status = canStartCPQ(lobbyMap, lobbyParty, challengerParty);
                        if (status == 0) {
                            new MonsterCarnival(lobbyParty, challengerParty, mapid, false, (field / 1000) % 10);
                        } else {
                            warpoutCPQLobby(lobbyMap);
                        }
                    }
                }, 10000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        public boolean sendCPQMapLists2() {
            String msg = LanguageConstants.getMessage(getPlayer(), LanguageConstants.CPQPickRoom);
            int msgLen = msg.length();
            for (int i = 0; i < 3; i++) {
                if (fieldTaken2(i)) {
                    if (fieldLobbied2(i)) {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (Level: "  // "Carnival field" GMS-like improvement thanks to Jayd
                                + cpqCalcAvgLvl(980031000 + i * 1000) + " / "
                                + getPlayerCount(980031000 + i * 1000) + "x"
                                + getPlayerCount(980031000 + i * 1000) + ")  #l\r\n";
                    }
                } else {
                    if (i == 0 || i == 1) {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (2x2) #l\r\n";
                    } else {
                        msg += "#b#L" + i + "#Carnival Field " + (i + 1) + " (3x3) #l\r\n";
                    }
                }
            }
            
            if (msg.length() > msgLen) {
                sendSimple(msg);
                return true;
            } else {
                return false;
            }
        }

        public boolean fieldTaken2(int field) {
            if (!c.getChannelServer().canInitMonsterCarnival(false, field)) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980031000 + field * 1000).getAllPlayer().isEmpty()) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980031100 + field * 1000).getAllPlayer().isEmpty()) {
                return true;
            }
            if (!c.getChannelServer().getMapFactory().getMap(980031200 + field * 1000).getAllPlayer().isEmpty()) {
                return true;
            }
            return false;
        }

        public boolean fieldLobbied2(int field) {
            if (!c.getChannelServer().getMapFactory().getMap(980031000 + field * 1000).getAllPlayer().isEmpty()) {
                return true;
            }
            return false;
        }

        public void cpqLobby2(int field) {
            try {
                final MapleMap map, mapExit;
                Channel cs = c.getChannelServer();
                
                mapExit = cs.getMapFactory().getMap(980030000);
                map = cs.getMapFactory().getMap(980031000 + 1000 * field);
                for (MaplePartyCharacter mpc : c.getPlayer().getParty().getMembers()) {
                    final MapleCharacter mc = mpc.getPlayer();
                    if (mc != null) {
                        mc.setChallenged(false);
                        mc.changeMap(map, map.getPortal(0));
                        mc.announce(MaplePacketCreator.serverNotice(6, LanguageConstants.getMessage(mc, LanguageConstants.CPQEntryLobby)));
                        TimerManager tMan = TimerManager.getInstance();
                        tMan.schedule(new Runnable() {
                            @Override
                            public void run() {
                                mapClock(3 * 60);
                            }
                        }, 1500);
                        
                        mc.setCpqTimer(TimerManager.getInstance().schedule(new Runnable() {
                            @Override
                            public void run() {
                                mc.changeMap(mapExit, mapExit.getPortal(0));
                            }
                        }, 3 * 60 * 1000));
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        
        public void mapClock(int time) {
            getPlayer().getMap().broadcastMessage(MaplePacketCreator.getClock(time));
        }
        
        private boolean sendCPQChallenge(String cpqType, int leaderid) {
            Set<Integer> cpqLeaders = new HashSet<>();
            cpqLeaders.add(leaderid);
            cpqLeaders.add(getPlayer().getId());
            
            return c.getWorldServer().getMatchCheckerCoordinator().createMatchConfirmation(MatchCheckerType.CPQ_CHALLENGE, c.getWorld(), getPlayer().getId(), cpqLeaders, cpqType);
        }
        
        public void answerCPQChallenge(boolean accept) {
            c.getWorldServer().getMatchCheckerCoordinator().answerMatchConfirmation(getPlayer().getId(), accept);
        }
        
        public void challengeParty2(int field) {
            MapleCharacter leader = null;
            MapleMap map = c.getChannelServer().getMapFactory().getMap(980031000 + 1000 * field);
            for (MapleMapObject mmo : map.getAllPlayer()) {
                MapleCharacter mc = (MapleCharacter) mmo;
                if (mc.getParty() == null) {
                    sendOk(LanguageConstants.getMessage(mc, LanguageConstants.CPQFindError));
                    return;
                }
                if (mc.getParty().getLeader().getId() == mc.getId()) {
                    leader = mc;
                    break;
                }
            }
            if (leader != null) {
                if (!leader.isChallenged()) {
                    if (!sendCPQChallenge("cpq2", leader.getId())) {
                        sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQChallengeRoomAnswer));
                    }
                } else {
                    sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQChallengeRoomAnswer));
                }
            } else {
                sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQLeaderNotFound));
            }
        }
        
        public void challengeParty(int field) {
            MapleCharacter leader = null;
            MapleMap map = c.getChannelServer().getMapFactory().getMap(980000100 + 100 * field);
            if (map.getAllPlayer().size() != getPlayer().getParty().getMembers().size()) {
                sendOk("An unexpected error regarding the other party has occurred.");
                return;
            }
            for (MapleMapObject mmo : map.getAllPlayer()) {
                MapleCharacter mc = (MapleCharacter) mmo;
                if (mc.getParty() == null) {
                    sendOk(LanguageConstants.getMessage(mc, LanguageConstants.CPQFindError));
                    return;
                }
                if (mc.getParty().getLeader().getId() == mc.getId()) {
                    leader = mc;
                    break;
                }
            }
            if (leader != null) {
                if (!leader.isChallenged()) {
                    if (!sendCPQChallenge("cpq1", leader.getId())) {
                        sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQChallengeRoomAnswer));
                    }
                } else {
                    sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQChallengeRoomAnswer));
                }
            } else {
                sendOk(LanguageConstants.getMessage(leader, LanguageConstants.CPQLeaderNotFound));
            }
        }
        
        private synchronized boolean setupAriantBattle(MapleExpedition exped, int mapid) {
            MapleMap arenaMap = this.getMap().getChannelServer().getMapFactory().getMap(mapid + 1);
            if (!arenaMap.getAllPlayers().isEmpty()) {
                return false;
            }
            
            new AriantColiseum(arenaMap, exped);
            return true;
        }
        
        public String startAriantBattle(MapleExpeditionType expedType, int mapid) {
            if (!GameConstants.isAriantColiseumLobby(mapid)) {
                return "You cannot start an Ariant tournament from outside the Battle Arena Entrance.";
            }
            
            MapleExpedition exped = this.getMap().getChannelServer().getExpedition(expedType);
            if (exped == null) {
                return "Please register on an expedition before attempting to start an Ariant tournament.";
            }
            
            List<MapleCharacter> players = exped.getActiveMembers();
            
            int playersSize = players.size();
            if (!(playersSize >= exped.getMinSize() && playersSize <= exped.getMaxSize())) {
                return "Make sure there are between #r" + exped.getMinSize() + " ~ " + exped.getMaxSize() + " players#k in this room to start the battle.";
            }
            
            MapleMap leaderMap = this.getMap();
            for (MapleCharacter mc : players) {
                if (mc.getMap() != leaderMap) {
                    return "All competing players should be on this area to start the battle.";
                }
                
                if (mc.getParty() != null) {
                    return "All competing players must not be on a party to start the battle.";
                }
                
                int level = mc.getLevel();
                if (!(level >= expedType.getMinLevel() && level <= expedType.getMaxLevel())) {
                    return "There are competing players outside of the acceptable level range in this room. All players must be on #blevel between 20~30#k to start the battle.";
                }
            }
            
            if (setupAriantBattle(exped, mapid)) {
                return "";
            } else {
                return "Other players are already competing on the Ariant tournament in this room. Please wait a while until the arena becomes available again.";
            }
        }
        
        public void sendMarriageWishlist(boolean groom) {
            MapleCharacter player = this.getPlayer();
            MapleMarriage marriage = player.getMarriageInstance();
            if(marriage != null) {
                int cid = marriage.getIntProperty(groom ? "groomId" : "brideId");
                MapleCharacter chr = marriage.getPlayerById(cid);
                if (chr != null) {
                    if (chr.getId() == player.getId()) {
                        player.announce(Wedding.OnWeddingGiftResult((byte) 0xA, marriage.getWishlistItems(groom), marriage.getGiftItems(player.getClient(), groom)));
                    } else {
                        marriage.setIntProperty("wishlistSelection", groom ? 0 : 1);
                        player.announce(Wedding.OnWeddingGiftResult((byte) 0x09, marriage.getWishlistItems(groom), marriage.getGiftItems(player.getClient(), groom)));
                    }
                }
            }
        }
        
        public void sendMarriageGifts(List<Item> gifts) {
            this.getPlayer().announce(Wedding.OnWeddingGiftResult((byte) 0xA, Collections.singletonList(""), gifts));
        }

        public boolean createMarriageWishlist() {
            MapleMarriage marriage = this.getPlayer().getMarriageInstance();
            if (marriage != null) {
                Boolean groom = marriage.isMarriageGroom(this.getPlayer());
                if (groom != null) {
                    String wlKey;
                    if (groom) {
                        wlKey = "groomWishlist";
                    } else {
                        wlKey = "brideWishlist";
                    }
                    
                    if (marriage.getProperty(wlKey).contentEquals("")) {
                        getClient().announce(Wedding.sendWishList());
                        return true;
                    }
                }
            }
            
            return false;
        }
        
        //以下lynfan added, 增加cm.getItemLevel(item.getItemId());分解装备
        public int getItemLevel(int id) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        return ii.getReqLevel(id);
        }
        //以上lynfan added, 增加cm.getItemLevel(item.getItemId());分解装备
        
        //lynfan added below
        // 这里开始添加每日任务所需代码
	/**
	 * 每日打怪任务所需的怪物ID
	 */
	public int getCircleMobId() {
		if (getPlayer().getCircleTriple() == null)
			return 0;
		else
			return getPlayer().getCircleTriple().left;
	}

	/**
	 * 开始杀怪任务
	 */
	public void beginCircle(int mobId, byte count) {
		getPlayer().setCircleTriple(new Triple<Integer, Byte, Byte>(mobId, count, (byte) 0));
	}

	/**
	 * 当前任务是否已完成
	 */
	public boolean circleCompleted() {
		return getPlayer().getCircleTriple().mid.byteValue() <= getPlayer().getCircleTriple().right.byteValue();
	}

	/**
	 * 需求量
	 */
	public int getCircleNeed() {
		return getPlayer().getCircleTriple().mid;
	}

	/**
	 * 已完成的数量
	 */
	public int getCircleCount() {
		return getPlayer().getCircleTriple().right;
	}

	/**
	 * 给与奖励
	 */
	public void circlePrize() {
		int playerExpGain = getPlayer().getCircleTriple().mid
				* MapleLifeFactory.getMonster(getPlayer().getCircleTriple().left).getExp() * getPlayer().getExpRate()
				* getPlayer().getWorldServer().getExpRate();
		getPlayer().gainExp(playerExpGain);
		getPlayer().increaseEquipExp(playerExpGain);
		getPlayer().dropMessage("完成杀怪任务获取了" + playerExpGain + "人物经验和" + playerExpGain + "装备经验");
		try {
			Connection con = DatabaseConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("select id from lt_circle_quest where characterid = "
					+ getPlayer().getId() + " and status = -1 order by id desc");
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				ps = con.prepareStatement("update lt_circle_quest set status = 1 where id = " + rs.getInt("id"));
				ps.executeUpdate();
			} else {
				ps.close();
				ps = con.prepareStatement(
						"insert into lt_circle_quest (characterid,mobid,mobneed,mobCount,status) values(?,?,?,?,1)");
				ps.setInt(1, getPlayer().getId());
				ps.setInt(2, getPlayer().getCircleTriple().left);
				ps.setInt(3, getPlayer().getCircleTriple().mid);
				ps.setInt(4, getPlayer().getCircleTriple().right);
				ps.execute();
			}
			ps = con.prepareStatement("select COUNT(*) num from lt_circle_quest where characterid ="
					+ getPlayer().getId() + " and status = 1");
			rs = ps.executeQuery();
			rs.next();
			int count = rs.getInt("num");
			if (count != 0 && count % 10 == 0)// 每完成10次任务奖励一个吸怪道具
			{
				gainItem(2002031);
				getPlayer().yellowMessage("累计完成了" + count + "次循环任务,奖励吸怪道具一个");
			} else {
				getPlayer().yellowMessage("当前累计完成了" + count + "次循环任务,每完成10次奖励吸怪道具一个");
			}
			ps.close();
			rs.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		getPlayer().setCircleTriple(null);
	}

	/**
	 * 重置任务
	 */
	public void reStartCircle() {
		getPlayer().setCircleTriple(null);
	}

	public int searchMob(int mobId) throws SQLException {
		Connection con = DatabaseConnection.getConnection();
		PreparedStatement ps = con
				.prepareStatement("select * from lt_mob_in_map where mobid = " + mobId + " order by count desc");
		ResultSet rs = ps.executeQuery();
		if (rs.next()) {
			int map = rs.getInt("mapid");
			rs.close();
			return map;
		}
		ps.close();
		rs.close();
		con.close();
		return 0;
	}


	//保存道具
	public void saveItem(int itemId, int count) {
		ArrayList<Pair<Integer, Integer>> scrolls = getPlayer().getScrolls(0);
		for (Pair<Integer, Integer> pair : scrolls) {
			if (pair.left.intValue() == itemId) {
				pair.right = pair.right + count;
				return;
			}
		}
		scrolls.add(new Pair<Integer, Integer>(itemId, count));
	}

//道具列表
	public int[][] getScrolls(int type) {
		int arr[][] = new int[getPlayer().getScrolls(type).size()][2];
		int i = 0;
		for (Pair<Integer, Integer> pair : getPlayer().getScrolls(type)) {
			arr[i][0] = pair.left;
			arr[i++][1] = pair.right;
		}
		return arr;
	}

//模糊查询掉落道具
	public int[] searchItemByName(String itemName) {
		// 你自己该数据库链接 一般服务端有自带的
		try {
			Connection con = DriverManager
					.getConnection("jdbc:mysql://localhost:3306/小冰?user=root&password=root&characterEncoding=utf8");
			PreparedStatement ps = con.prepareStatement(
					"select itemid from drop_data where 'itemname' like '" + itemName + "' limit  255");
			ResultSet rs = ps.executeQuery();
			ArrayList<Integer> list = new ArrayList<Integer>();
			while (rs.next()) {
				if (!list.contains(rs.getInt(1)))
					list.add(rs.getInt(1));
			}
			int[] arr = new int[list.size() > 255 ? 255 : list.size()];
			for (int i = 0; i < arr.length && i < 255; i++) {
				arr[i] = list.get(i);
			}
			rs.close();
			ps.close();
			con.close();
			return arr;
		} catch (Exception e) {
			return new int[] {};
		}
	}

//通过id查掉落
	public int[] searchDropById(int itemid) {
		// 你自己该数据库链接 一般服务端有自带的
		try {
			Connection con = DriverManager
					.getConnection("jdbc:mysql://localhost:3306/小冰?user=root&password=root&characterEncoding=utf8");
			PreparedStatement ps = con.prepareStatement("select dropperid from drop_data where itemid = " + itemid);
			ResultSet rs = ps.executeQuery();
			ArrayList<Integer> list = new ArrayList<Integer>();
			while (rs.next()) {
				if (!list.contains(rs.getInt(1)))
					list.add(rs.getInt(1));
			}
			int[] arr = new int[list.size()];
			for (int i = 0; i < arr.length; i++) {
				arr[i] = list.get(i);
			}
			rs.close();
			ps.close();
			con.close();
			return arr;
		} catch (Exception e) {
			return new int[] {};
		}
	}

	// 取出道具
	public int 掏出卷轴(int itemid) {
		int index = 0;
		for (; index < getPlayer().getScrolls(0).size(); index++) {
			if (itemid == getPlayer().getScrolls(0).get(index).left) {
				break;
			}
		}
		int count = getPlayer().getScrolls(0).get(index).right;
		getPlayer().getScrolls(0).remove(index);
		return count;
	}
}