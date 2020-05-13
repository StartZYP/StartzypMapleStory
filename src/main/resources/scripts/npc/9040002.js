/* 
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* 
 * @Author Lerk
 * 
 * Shawn, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Guild Quest Info
 */

var status;
var selectedOption;

function start() {
    selectedOption = -1;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (mode == 1 && status == 3) {
            status = 0;
        }
        if (status == 0) {
            var prompt = "\r\n#b#L0# 锡安列是谁?#l\r\n#b#L1# #t4001024#是什么?#l\r\n#b#L2# 家族任务?#l\r\n#b#L3# 不，我现在很好.#l";
            if (selectedOption == -1) {
                prompt = "我们的联盟会，一直试图破译 '翡翠平板,' 一个珍贵的文物，很长一段时间。因此, 我们发现了鲁碧安, 他从过去的神秘王国,在这里沉睡。我们还发现，传说中的神秘宝石#t4001024#的线索可能就在鲁碧安的遗骸中。这就是为什么家族任务最终找到#t4001024#." + prompt;
            } else {
                prompt = "你还有其他问题吗?" + prompt;
            }
            cm.sendSimple(prompt);
        }
        else if (status == 1) {
            selectedOption = selection;
            if (selectedOption == 0) {
                cm.sendNext("锡安列是一个文明时代，从过去控制了维多利亚岛的每一个地区。地下城深处的神殿、庙宇和其他古老的建筑，没有人知道是谁在锡安列时代建造的.");
            }
            else if (selectedOption == 1) {
                cm.sendNext("#t4001024#是一个传奇的宝石,它给拥有它的人带来永恒的青春.具有讽刺意味的是,它似乎是每个人都有#t4001024#.锡安列的倒台说明了,一个王国的灭亡.");
                status = -1;
            }
            else if (selectedOption == 2) {
                cm.sendNext("我以前派出过一批探险家去寻找锡安列，但他们都没有回来，促使我们开始了家族探索。我们一直在等待强大到足以应对严峻挑战的家族，像你这样的家族。");
            }
            else if (selectedOption == 3) {
                cm.sendOk("真的? 如果你还有什么要问的，请随时跟我说。");
                cm.dispose();
            }
            else {
                cm.dispose();
            }
        }
        else if (status == 2) { //should only be available for options 0 and 2
            if (selectedOption == 0) {
                cm.sendNextPrev("圣瑞尼亚的最后一位国王是一位名叫锡安列三世的绅士，显然他是一位非常聪明和富有同情心的国王。但有一天，整个王国灭亡了，没有任何解释。");
            }
            else if (selectedOption == 2) {
                cm.sendNextPrev("这个家族任务的最终目标是探索圣瑞尼亚并找到#t4001024#。团队合作在这里很重要。");
            }
            else {
                cm.dispose();
            }
        }
    }
}