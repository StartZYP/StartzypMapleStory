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
package client.inventory;

import client.MapleCharacter;
import client.MapleClient;
import config.EquipLevelConfig;
import config.YamlConfig;
import constants.game.ExpTable;
import constants.inventory.ItemConstants;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import server.MapleItemInformationProvider;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.Randomizer;

public class Equip extends Item {

    public static enum ScrollResult {

        FAIL(0), SUCCESS(1), CURSE(2);
        private int value = -1;

        private ScrollResult(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
    
    public static enum StatUpgrade {

        incDEX(0), incSTR(1), incINT(2), incLUK(3),
        incMHP(4), incMMP(5), incPAD(6), incMAD(7),
        incPDD(8), incMDD(9), incEVA(10), incACC(11),
        incSpeed(12), incJump(13), incVicious(14), incSlot(15);
        private int value = -1;

        private StatUpgrade(int value) {
            this.value = value;
        }
    }
    
    private byte upgradeSlots;
    private int level, itemLevel;
    private short flag;
    private short str, dex, _int, luk, hp, mp, watk, matk, wdef, mdef, acc, avoid, hands, speed, jump, vicious;
    private float itemExp;
    private int ringid = -1;
    private boolean wear = false;
    private boolean isUpgradeable, isElemental = false;    // timeless or reverse, or any equip that could levelup on GMS for all effects

    public Equip(int id, short position) {
        this(id, position, 0);
    }

    public Equip(int id, short position, int slots) {
        super(id, position, (short) 1);
        this.upgradeSlots = (byte) slots;
        this.itemExp = 0;
        this.itemLevel = 1;
        
        this.isElemental = (MapleItemInformationProvider.getInstance().getEquipLevel(id, false) > 1);
    }

    @Override
    public Item copy() {
        Equip ret = new Equip(getItemId(), getPosition(), getUpgradeSlots());
        ret.str = str;
        ret.dex = dex;
        ret._int = _int;
        ret.luk = luk;
        ret.hp = hp;
        ret.mp = mp;
        ret.matk = matk;
        ret.mdef = mdef;
        ret.watk = watk;
        ret.wdef = wdef;
        ret.acc = acc;
        ret.avoid = avoid;
        ret.hands = hands;
        ret.speed = speed;
        ret.jump = jump;
        ret.flag = flag;
        ret.vicious = vicious;
        ret.upgradeSlots = upgradeSlots;
        ret.itemLevel = itemLevel;
        ret.itemExp = itemExp;
        ret.level = level;
        ret.log = new LinkedList<>(log);
        ret.setOwner(getOwner());
        ret.setQuantity(getQuantity());
        ret.setExpiration(getExpiration());
        ret.setGiftFrom(getGiftFrom());
        return ret;
    }

    @Override
    public short getFlag() {
        return flag;
    }

    @Override
    public byte getItemType() {
        return 1;
    }
    
    public byte getUpgradeSlots() {
        return upgradeSlots;
    }

    public short getStr() {
        return str;
    }

    public short getDex() {
        return dex;
    }

    public short getInt() {
        return _int;
    }

    public short getLuk() {
        return luk;
    }

    public short getHp() {
        return hp;
    }

    public short getMp() {
        return mp;
    }

    public short getWatk() {
        return watk;
    }

    public short getMatk() {
        return matk;
    }

    public short getWdef() {
        return wdef;
    }

    public short getMdef() {
        return mdef;
    }

    public short getAcc() {
        return acc;
    }

    public short getAvoid() {
        return avoid;
    }

    public short getHands() {
        return hands;
    }

    public short getSpeed() {
        return speed;
    }

    public short getJump() {
        return jump;
    }

    public short getVicious() {
        return vicious;
    }

    @Override
    public void setFlag(short flag) {
        this.flag = flag;
    }

    public void setStr(short str) {
        this.str = str;
    }

    public void setDex(short dex) {
        this.dex = dex;
    }

    public void setInt(short _int) {
        this._int = _int;
    }

    public void setLuk(short luk) {
        this.luk = luk;
    }

    public void setHp(short hp) {
        this.hp = hp;
    }

    public void setMp(short mp) {
        this.mp = mp;
    }

    public void setWatk(short watk) {
        this.watk = watk;
    }

    public void setMatk(short matk) {
        this.matk = matk;
    }

    public void setWdef(short wdef) {
        this.wdef = wdef;
    }

    public void setMdef(short mdef) {
        this.mdef = mdef;
    }

    public void setAcc(short acc) {
        this.acc = acc;
    }

    public void setAvoid(short avoid) {
        this.avoid = avoid;
    }

    public void setHands(short hands) {
        this.hands = hands;
    }

    public void setSpeed(short speed) {
        this.speed = speed;
    }

    public void setJump(short jump) {
        this.jump = jump;
    }

    public void setVicious(short vicious) {
        this.vicious = vicious;
    }

    public void setUpgradeSlots(byte upgradeSlots) {
        this.upgradeSlots = upgradeSlots;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    private static int getStatModifier(boolean isAttribute) {
        // each set of stat points grants a chance for a bonus stat point upgrade at equip level up.
        
        if(YamlConfig.config.server.USE_EQUIPMNT_LVLUP_POWER) {
            if(isAttribute) return 2;
            else return 4;
        }
        else {
            if(isAttribute) return 4;
            else return 16;
        }
    }
    
    private static int randomizeStatUpgrade(int top) {
        int limit = Math.min(top, YamlConfig.config.server.MAX_EQUIPMNT_LVLUP_STAT_UP);
        
        int poolCount = (limit * (limit + 1) / 2) + limit;
        int rnd = Randomizer.rand(0, poolCount);
        
        int stat = 0;
        if(rnd >= limit) {
            rnd -= limit;
            stat = 1 + (int)Math.floor((-1 + Math.sqrt((8 * rnd) + 1)) / 2);    // optimized randomizeStatUpgrade author: David A.
        }
        
        return stat;
    }
    
    private static boolean isPhysicalWeapon(int itemid) {
        Equip eqp = (Equip) MapleItemInformationProvider.getInstance().getEquipById(itemid);
        return eqp.getWatk() >= eqp.getMatk();
    }
    
    private boolean isNotWeaponAffinity(StatUpgrade name) {
        // Vcoc's idea - WATK/MATK expected gains lessens outside of weapon affinity (physical/magic)
        
        if (ItemConstants.isWeapon(this.getItemId())) {
            if (name.equals(StatUpgrade.incPAD)) {
                if (!isPhysicalWeapon(this.getItemId())) {
                    return true;
                }
            } else if (name.equals(StatUpgrade.incMAD)) {
                if (isPhysicalWeapon(this.getItemId())) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    private void getUnitStatUpgrade(List<Pair<StatUpgrade, Integer>> stats, StatUpgrade name, int curStat, boolean isAttribute) {
        isUpgradeable = true;
        
        int maxUpgrade = randomizeStatUpgrade((int)(1 + (curStat / (getStatModifier(isAttribute) * (isNotWeaponAffinity(name) ? 2.7 : 1)))));
        if(maxUpgrade == 0) return;
            
        stats.add(new Pair<>(name, maxUpgrade));
    }
    
    private static void getUnitSlotUpgrade(List<Pair<StatUpgrade, Integer>> stats, StatUpgrade name) {
        if(Math.random() < 0.1) {
            stats.add(new Pair<>(name, 1));  // 10% success on getting a slot upgrade.
        }
    }
    
    private void improveDefaultStats(List<Pair<StatUpgrade, Integer>> stats) {
        if(dex > 0) getUnitStatUpgrade(stats, StatUpgrade.incDEX, dex, true);
        if(str > 0) getUnitStatUpgrade(stats, StatUpgrade.incSTR, str, true);
        if(_int > 0) getUnitStatUpgrade(stats, StatUpgrade.incINT,_int, true);
        if(luk > 0) getUnitStatUpgrade(stats, StatUpgrade.incLUK, luk, true);
        if(hp > 0) getUnitStatUpgrade(stats, StatUpgrade.incMHP, hp, false);
        if(mp > 0) getUnitStatUpgrade(stats, StatUpgrade.incMMP, mp, false);
        if(watk > 0) getUnitStatUpgrade(stats, StatUpgrade.incPAD, watk, false);
        if(matk > 0) getUnitStatUpgrade(stats, StatUpgrade.incMAD, matk, false);
        if(wdef > 0) getUnitStatUpgrade(stats, StatUpgrade.incPDD, wdef, false);
        if(mdef > 0) getUnitStatUpgrade(stats, StatUpgrade.incMDD, mdef, false);
        if(avoid > 0) getUnitStatUpgrade(stats, StatUpgrade.incEVA, avoid, false);
        if(acc > 0) getUnitStatUpgrade(stats, StatUpgrade.incACC, acc, false);
        if(speed > 0) getUnitStatUpgrade(stats, StatUpgrade.incSpeed, speed, false);
        if(jump > 0) getUnitStatUpgrade(stats, StatUpgrade.incJump, jump, false);
    }
    
    public Map<StatUpgrade, Short> getStats() {
        Map<StatUpgrade, Short> stats = new HashMap<>(5);
        
        if(dex > 0) stats.put(StatUpgrade.incDEX, dex);
        if(str > 0) stats.put(StatUpgrade.incSTR, str);
        if(_int > 0) stats.put(StatUpgrade.incINT,_int);
        if(luk > 0) stats.put(StatUpgrade.incLUK, luk);
        if(hp > 0) stats.put(StatUpgrade.incMHP, hp);
        if(mp > 0) stats.put(StatUpgrade.incMMP, mp);
        if(watk > 0) stats.put(StatUpgrade.incPAD, watk);
        if(matk > 0) stats.put(StatUpgrade.incMAD, matk);
        if(wdef > 0) stats.put(StatUpgrade.incPDD, wdef);
        if(mdef > 0) stats.put(StatUpgrade.incMDD, mdef);
        if(avoid > 0) stats.put(StatUpgrade.incEVA, avoid);
        if(acc > 0) stats.put(StatUpgrade.incACC, acc);
        if(speed > 0) stats.put(StatUpgrade.incSpeed, speed);
        if(jump > 0) stats.put(StatUpgrade.incJump, jump);
        
        return stats;
    }
    
    public Pair<String, Pair<Boolean, Boolean>> gainStats(List<Pair<StatUpgrade, Integer>> stats) {
        boolean gotSlot = false, gotVicious = false;
        String lvupStr = "";
        Integer statUp, maxStat = YamlConfig.config.server.MAX_EQUIPMNT_STAT;
        for (Pair<StatUpgrade, Integer> stat : stats) {
            switch (stat.getLeft()) {
                case incDEX:
                    //statUp = Math.min(stat.getRight(), maxStat - dex);//lynfan 原始代码
                    statUp = Math.min((int) Math.ceil(dex * 0.01), maxStat - dex);//lynfan 属性增长是dex+dex*20%。
                    dex += statUp;
                    lvupStr += "+" + statUp + "敏捷 ";
                    break;
                case incSTR:
                    //statUp = Math.min(stat.getRight(), maxStat - str);//lynfan 原始代码
                    statUp = Math.min((int)Math.ceil(str * 0.01), maxStat - str);//lynfan，属性增长是str+str*20%。
                    str += statUp;
                    lvupStr += "+" + statUp + "力量 ";
                    break;
                case incINT:
                    //statUp = Math.min(stat.getRight(), maxStat - _int);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(_int * 0.01), maxStat - _int);//lynfan 属性增长是*20%
                    _int += statUp;
                    lvupStr += "+" + statUp + "智力 ";
                    break;
                case incLUK:
                    //statUp = Math.min(stat.getRight(), maxStat - luk);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(luk * 0.01), maxStat - luk);//lynfan 属性增长是*20%
                    luk += statUp;
                    lvupStr += "+" + statUp + "运气 ";
                    break;
                case incMHP:
                    //statUp = Math.min(stat.getRight(), maxStat - hp);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(hp * 0.01), maxStat - hp);//lynfan 属性增长是*50%
                    hp += statUp;
                    lvupStr += "+" + statUp + "HP ";
                    break;
                case incMMP:
                    //statUp = Math.min(stat.getRight(), maxStat - mp);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(mp * 0.01), maxStat - mp);//lynfan 属性增长是*50%
                    mp += statUp;
                    lvupStr += "+" + statUp + "MP ";
                    break;
                case incPAD:
                    //statUp = Math.min(stat.getRight(), maxStat - watk);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(watk * 0.01), maxStat - watk);//lynfan 属性增长是*20%
                    watk += statUp;
                    lvupStr += "+" + statUp + "物理攻击 ";
                    break;
                case incMAD:
                    //statUp = Math.min(stat.getRight(), maxStat - matk);//lynfan 原始代码
                    statUp = (int)Math.min(Math.ceil(matk * 0.01), maxStat - matk);//lynfan 属性增长是*50%
                    matk += statUp;
                    lvupStr += "+" + statUp + "魔法攻击 ";
                    break;
                case incPDD:
                    statUp = (int)Math.min(Math.ceil(wdef * 0.01), maxStat - wdef);

                    wdef += statUp;
                    lvupStr += "+" + statUp + "物理防御 ";
                    break;
                case incMDD:
                    statUp = (int)Math.min(Math.ceil(mdef * 0.01), maxStat - mdef);
                    mdef += statUp;
                    lvupStr += "+" + statUp + "魔法防御 ";
                    break;
                case incEVA:
                    statUp = (int)Math.min(Math.ceil(avoid * 0.01), maxStat - avoid);
                    avoid += statUp;
                    lvupStr += "+" + statUp + "闪避 ";
                    break;
                case incACC:
                    statUp = (int)Math.min(Math.ceil(acc * 0.01), maxStat - acc);
                    acc += statUp;
                    lvupStr += "+" + statUp + "命中 ";
                    break;
                case incSpeed:
                    statUp = (int)Math.min(Math.ceil(speed * 0.01), maxStat - speed);
                    speed += statUp;
                    lvupStr += "+" + statUp + "速度 ";
                    break;
                case incJump:
                    statUp = (int)Math.min(Math.ceil(jump * 0.01), maxStat - jump);
                    jump += statUp;
                    lvupStr += "+" + statUp + "跳跃力 ";
                    break;
                    
                case incVicious:
                    vicious -= stat.getRight();
                    gotVicious = true;
                    break;
                case incSlot:
                    upgradeSlots += stat.getRight();
                    gotSlot = true;
                    break;
            }
        }
        
        return new Pair<>(lvupStr, new Pair<>(gotSlot, gotVicious));
    }
    
    private void gainLevel(MapleClient c) {
        List<Pair<StatUpgrade, Integer>> stats = new LinkedList<>();
        
        if(isElemental) {
            List<Pair<String, Integer>> elementalStats = MapleItemInformationProvider.getInstance().getItemLevelupStats(getItemId(), itemLevel);
            
            for(Pair<String, Integer> p: elementalStats) {
                if(p.getRight() > 0) stats.add(new Pair<>(StatUpgrade.valueOf(p.getLeft()), p.getRight()));
            }
        }
        
        if(!stats.isEmpty()) {
            if(YamlConfig.config.server.USE_EQUIPMNT_LVLUP_SLOTS) {
                if(vicious > 0) getUnitSlotUpgrade(stats, StatUpgrade.incVicious);
                getUnitSlotUpgrade(stats, StatUpgrade.incSlot);
            }
        } else {
            isUpgradeable = false;
            
            improveDefaultStats(stats);
            if(YamlConfig.config.server.USE_EQUIPMNT_LVLUP_SLOTS) {
                if(vicious > 0) getUnitSlotUpgrade(stats, StatUpgrade.incVicious);
                getUnitSlotUpgrade(stats, StatUpgrade.incSlot);
            }
            
            if(isUpgradeable) {
                while(stats.isEmpty()) {
                    improveDefaultStats(stats);
                    if(YamlConfig.config.server.USE_EQUIPMNT_LVLUP_SLOTS) {
                        if(vicious > 0) getUnitSlotUpgrade(stats, StatUpgrade.incVicious);
                        getUnitSlotUpgrade(stats, StatUpgrade.incSlot);
                    }
                }
            }
        }
        
        itemLevel++;
        
        //String lvupStr = "'" + MapleItemInformationProvider.getInstance().getName(this.getItemId()) + "' is now level " + itemLevel + "! ";
        //String showStr = "#e'" + MapleItemInformationProvider.getInstance().getName(this.getItemId()) + "'#b is now #elevel #r" + itemLevel + "#k#b!";
        String lvupStr = "'" + MapleItemInformationProvider.getInstance().getName(this.getItemId()) + "' 升级到了 " + itemLevel + "! ";//lynfan
        String showStr = "#e'" + MapleItemInformationProvider.getInstance().getName(this.getItemId()) + "'#b 升到了 #r" + itemLevel + "#k#b!";//lynfan
        
        Pair<String, Pair<Boolean, Boolean>> res = this.gainStats(stats);
        lvupStr += res.getLeft();
        boolean gotSlot = res.getRight().getLeft();
        boolean gotVicious = res.getRight().getRight();
        
        if (gotVicious) {
            //c.getPlayer().dropMessage(6, "A new Vicious Hammer opportunity has been found on the '" + MapleItemInformationProvider.getInstance().getName(getItemId()) + "'!");
            lvupStr += "+VICIOUS ";
        }
        if (gotSlot) {
            //c.getPlayer().dropMessage(6, "A new upgrade slot has been found on the '" + MapleItemInformationProvider.getInstance().getName(getItemId()) + "'!");
            lvupStr += "+ 升级次数 ";
        }
        
        c.getPlayer().equipChanged();
        
        showLevelupMessage(showStr, c); // thanks to Polaris dev team !
        c.getPlayer().dropMessage(6, lvupStr);
        
        c.announce(MaplePacketCreator.showEquipmentLevelUp());
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MaplePacketCreator.showForeignEffect(c.getPlayer().getId(), 15));
        c.getPlayer().forceUpdateItem(this);
    }

    public int getItemExp() {
        return (int) itemExp;
    }
    
    private static double normalizedMasteryExp(int reqLevel) {
        // Conversion factor between mob exp and equip exp gain. Through many calculations, the expected for equipment levelup
        // from level 1 to 2 is killing about 100~200 mobs of the same level range, on a 1x EXP rate scenario.
        
        if(reqLevel < 5) {
            return 42;
        } else if(reqLevel >= 78) {
            return Math.max((10413.648 * Math.exp(reqLevel * 0.03275)), 15);
        } else if(reqLevel >= 38) {
            return Math.max(( 4985.818 * Math.exp(reqLevel * 0.02007)), 15);
        } else if(reqLevel >= 18) {
            return Math.max((  248.219 * Math.exp(reqLevel * 0.11093)), 15);
        } else {
            return Math.max(((1334.564 * Math.log(reqLevel)) - 1731.976), 15);
        }
    }
    
    public synchronized void gainItemExp(MapleClient c, int gain) {  // Ronan's Equip Exp gain method
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if(!ii.isUpgradeable(this.getItemId())) {
            return;
        }

        int equipMaxLevel = Math.min(30, Math.max(ii.getEquipLevel(this.getItemId(), true), YamlConfig.config.server.USE_EQUIPMNT_LVLUP));
        EquipLevelConfig tmp = new EquipLevelConfig();
        tmp.setId(this.getItemId());
        if (YamlConfig.config.equipLevel.contains(tmp)){
            EquipLevelConfig equipLevel = YamlConfig.config.equipLevel.get(YamlConfig.config.equipLevel.indexOf(tmp));
            equipMaxLevel = equipLevel.MaxLevel;
        }
        int reqLevel = ii.getEquipLevelReq(this.getItemId());
        //int equipMaxLevel = ((ii.getReqLevel(this.getItemId())+30) / 30)*YamlConfig.config.server.USE_EQUIPMNT_LVLUP;//lynfan以上语句：装备经验升级级别随等级增加，1-29级装备，可升级7级，30-59级可升级2*7=14,60-89级可升级3*7=21级
        if (itemLevel >= equipMaxLevel) {
            return;
        }
        
        float masteryModifier = (float)(YamlConfig.config.server.EQUIP_EXP_RATE * ExpTable.getExpNeededForLevel(1)) / (float)normalizedMasteryExp(reqLevel);
        float elementModifier = (isElemental) ? 0.85f : 0.6f;
        
        float baseExpGain = gain * elementModifier * masteryModifier;
        
        itemExp += baseExpGain;
        int expNeeded = ExpTable.getEquipExpNeededForLevel(itemLevel);
        
        if(YamlConfig.config.server.USE_DEBUG_SHOW_INFO_EQPEXP) System.out.println("'" + ii.getName(this.getItemId()) + "' -> EXP Gain: " + gain + " Mastery: " + masteryModifier + " Base gain: " + baseExpGain + " exp: " + itemExp + " / " + expNeeded + ", Kills TNL: " + expNeeded / (baseExpGain / c.getPlayer().getExpRate()));
        
        if (itemExp >= expNeeded) {
            while(itemExp >= expNeeded) {
                itemExp -= expNeeded;
                gainLevel(c);

                if(itemLevel >= equipMaxLevel) {
                    itemExp = 0.0f;
                    break;
                }
                
                expNeeded = ExpTable.getEquipExpNeededForLevel(itemLevel);
            }
        }
        
        c.getPlayer().forceUpdateItem(this);
        //if(YamlConfig.config.server.USE_DEBUG) c.getPlayer().dropMessage("'" + ii.getName(this.getItemId()) + "': " + itemExp + " / " + expNeeded);
    }
    
    private boolean reachedMaxLevel() {
        if (isElemental) {
            if (itemLevel < MapleItemInformationProvider.getInstance().getEquipLevel(getItemId(), true)) {
                return false;
            }
        }
        
        return itemLevel >= YamlConfig.config.server.USE_EQUIPMNT_LVLUP;
    }
    
    public String showEquipFeatures(MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if(!ii.isUpgradeable(this.getItemId())) return "";
        
        String eqpName = ii.getName(getItemId());
        String eqpInfo = reachedMaxLevel() ? " #e#rMAX LEVEL#k#n" : (" EXP: #e#b" + (int)itemExp + "#k#n / " + ExpTable.getEquipExpNeededForLevel(itemLevel));
        
        return "'" + eqpName + "' -> LV: #e#b" + itemLevel + "#k#n    " + eqpInfo + "\r\n";
    }

    private static void showLevelupMessage(String msg, MapleClient c) {
        c.getPlayer().showHint(msg, 300);
    }
    
    public void setItemExp(int exp) {
        this.itemExp = exp;
    }

    public void setItemLevel(byte level) {
        this.itemLevel = level;
    }

    @Override
    public void setQuantity(short quantity) {
        if (quantity < 0 || quantity > 1) {
            throw new RuntimeException("Setting the quantity to " + quantity + " on an equip (itemid: " + getItemId() + ")");
        }
        super.setQuantity(quantity);
    }

    public void setUpgradeSlots(int i) {
        this.upgradeSlots = (byte) i;
    }

    public void setVicious(int i) {
        this.vicious = (short) i;
    }

    public int getRingId() {
        return ringid;
    }

    public void setRingId(int id) {
        this.ringid = id;
    }

    public boolean isWearing() {
        return wear;
    }

    public void wear(boolean yes) {
        wear = yes;
    }

    public int getItemLevel() {
        return itemLevel;
    }
         //lynfan 以下语句增加装备升级经验转移到新装备的功能
    public long getExpGained() {
		MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
		long expGained = 0;
		float masteryModifier = (float) (YamlConfig.config.server.EQUIP_EXP_RATE * ExpTable.getExpNeededForLevel(1))
				/ (float) normalizedMasteryExp(ii.getEquipLevelReq(getItemId()));
		float elementModifier = (isElemental) ? 0.85f : 0.6f;
		for (int i = 1; i < getItemLevel() + 1; i++) {
			expGained += ExpTable.getEquipExpNeededForLevel(itemLevel);
		}
		expGained += itemExp;
		expGained = (long) ((double) expGained / elementModifier / masteryModifier);
		return expGained;
	}
    public static void eatEquip(MapleCharacter c,Equip oldEquip,Equip newEquip) {
		float 系数 = 0.5f;//装备升级经验转移系数
		long exp  = (long) (oldEquip.getExpGained()*系数);
		while(exp>Integer.MAX_VALUE) {
			exp-=Integer.MAX_VALUE;
			newEquip.gainItemExp(c.getClient(), Integer.MAX_VALUE);
		}
		newEquip.gainItemExp(c.getClient(), (int) exp);
	}
    //lynfan 以上语句增加装备升级经验转移到新装备的功能  
}