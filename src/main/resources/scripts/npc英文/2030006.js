/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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
/* Holy Stone
	Holy Ground at the Snowfield (211040401)
	3rd job advancement - Question trial.
 */

var questionTree = [
        //Questions Related to CHARACTERS
        ["在冒险岛里面,1级升到2级需要多少经验值?", ["20", "15", "4", "12", "16"], 1],
        ["在第一次转职中,下面哪一项是错误的?", ["魔法师 - 等级 8", "海盗 - 20 敏捷以上", "弓箭手 - 25 敏捷以上", "飞侠 - 20 运气以上", "战士 - 35 力量以上"], 3],
        ["下面debuff中,哪个是错误的?", ["沉默-无法释放技能", "亡灵-变成亡灵恢复效果减半", "弱化-移动速度减半", "诅咒-获得的经验值减少", "眩晕-无法行动"], 2],
        ["下面z第一次转职中,下面哪一项是正确的?", ["海盗 - 25 运气", "法师 - 等级 10", "飞侠 - 25 运气", "战士 - 30 力量", "弓箭手 - 25 敏捷"], 4],

        //Questions Related to ITEMS
        ["下列怪物和怪物掉落的战利品对应正确的是?", ["Royal cactus - Needle", "Wild Boar - Boar fang", "Lazy Buffy - Buffy hat", "Chipmunk - Nut", "Stirge - Stirge's wing"], 4],
        ["下列怪物和怪物掉落的战利品对应错误的是?", ["Greatest Oldies - Greatest oldies", "Nependeath - Nependeath's leaf", "Ghost stump - Seedling", "Sparker - Seal tooth", "Miner Zombie - Zombie's lost tooth"], 1],
        //["In GM Event, how many FRUIT CAKE you can get as reward?", ["20", "200", "5", "25", "100"], 2],
        ["Which of following potions got CORRECT info.?", ["Warrior Elixir - Attack +5 for 3 minutes", "Pure Water - Recover 700 MP", "Cake - Recover 150 HP & MP", "Salad - Recover 300 MP", "Pizza - Recover 400 HP"], 4],
        ["Which of following potions got WRONG info.?", ["Mana Elixir - Recover 300 MP", "Tonic - Cures state of weakness", "Apple - Recover 30 HP", "Sunrise Dew - Recover 3000 MP", "Ramen - Recover 1000 HP"], 3],

        //Questions Related to MONSTERS
        ["Green Mushroom, Tree Stump, Bubbling, Axe Stump, Octopus, which is highest level of all?", ["Tree Stump", "Bubbling", "选Axe Stump", "Octopus", "Green Mushroom"], 2],
        ["Which monster will be seen during the ship trip to Orbis/Ellinia?", ["Werewolf", "Slime", "Crimson Balrog", "Zakum", "Star Pixie"], 2],
        ["Maple Island doesn't have which following monsters?", ["选Shroom", "Blue Snail", "Slime", "Red Snail", "Pig"], 4],    // to get conformant with website answers, thanks to Vcoc
        ["Which monster is not at Victoria Island and Sleepywood?", ["Evil Eye", "选Sentinel", "Jr. Balrog", "Ghost Stump", "Snail"], 1],
        ["El Nath doesn't have which following monsters?", ["Dark Yeti", "Dark Ligator", "Yeti & Pepe", "Bain", "Coolie Zombie"], 1],
        ["Which of following monsters can fly?", ["选Malady", "Ligator", "Cold Eye", "Meerkat", "Alishar"], 0],
        ["Which of these monsters will you NOT be facing in Ossyria?", ["Lunar Pixie", "Lioner", "Cellion", "选这个Croco", "Hector"], 3],
        ["Which monster has not appeared in Maple Island?", ["Snail", "Shroom", "Evil Eye", "Orange Mushroom", "Blue Snail"], 2],

        //Questions Related to QUESTS
        ["Which material doesn't need for awaken Hero's Gladius?", ["Flaming Feather", "Old Gladius", "Piece of Ice", "Ancient Scroll", "选Fairy Wing"], 4],
        ["Which of following quests can be repeated?", ["Mystery of Niora Hospital", "Rightful Donation Culture", "The Ghost Whereabout", "Arwen and the Glass Shoe", "Maya and the Weird Medicine"], 3],
        ["Which of following are not 2nd job adv.?", ["Mage", "Cleric", "Assassin", "Gunslinger", "Fighter"], 0],
        ["Which of following is the highest level quest?", ["Cupid's Courier", "Lost in the Ocean", "Alcaster and the Dark Crystal", "Eliminating the Drumming Bunny", "War of Pang Pang"], 2],

        //Questions Related to TOWN/NPC
        ["Which town is not at Victoria Island?", ["Florina Beach or Nautilus", "选Amherst or Southperry", "Kerning City & Square", "Perion or Ellinia", "Sleepywood"], 1],
        ["Which is the first NPC you meet in Maple Island?", ["not希娜", "选Heena", "Lucas", "Roger", "Shanks"], 1],
        ["Which NPC cannot be seen in El Nath?", ["Vogen", "索非亚", "Pedro", "Master Sergeant Fox", "Rumi"], 1],
        ["在?神秘岛的冰峰雪域里看不见的NPC是哪个?", ["Hidden Rock", "Glibber", "Jeff", "Holy Stone", "保姆珥玛"], 4],
        ["Which NPC cannot be seen in Perion?", ["Ayan", "Sophia", "Mr. Smith", "选Francois", "Manji"], 3],
        ["Which NPC cannot be seen in Henesys?", ["Teo", "Vicious", "Mia", "Doofus", "Casey"], 0],
        ["Which NPC cannot be seen in Ellinia?", ["Mr. Park", "Mar the Fairy", "Roel", "Ria", "Shane"], 2],
        ["Which NPC cannot be seen in Kerning City?", ["Dr. Faymus", "Mong from Kong", "Ervine", "Luke", "Nella"], 3],
        ["Which NPC is not related to pets?", ["Doofus", "Vicious", "Patricia", "Weaver", "Cloy"], 1],
        ["In Kerning City, who is the father of Alex, the runaway kid?", ["选Chief Stan", "JM From tha Streetz", "Dr. Faymus", "Vicious", "Luke"], 0],
        ["Which NPC is not belong to Alpha Platoon's Network of Communication?", ["Staff Sergeant Charlie", "Sergeant Bravo", "Corporal Easy", "Master Sergeant Fox", "选Peter"], 4],
        ["What do you receive in return from giving 30 Dark Marbles to the 2nd job advancement NPC?", ["Old Ring", "Memory Powder", "Fairy Dust", "选Proof of Hero", "Scroll of Secrets"], 3],
        ["Which item you give Maya at Henesys in order to cure her sickness?", ["Apple", "Power Elixir", "选Weird Medicine", "Chrysanthemum", "Orange Juice"], 2],
        ["Which of following NPC is not related to item synthesis/refine?", ["Neve", "Serryl", "选Shane", "Francois", "JM From tha Streetz"], 2],
        ["Which NPC cannot be seen in Maple Island?", ["Bari", "Teo", "Pio", "Sid", "Maria"], 1],
        ["Who do you see in the monitor in the navigation room with Kyrin?", ["Lucas", "Dr. Kim", "Chief Stan", "Scadur", "Professor Foxwit"], 1],
        ["You know Athena Pierce in Henesys? What color are her eyes?", ["Blue", "Green", "Brown", "Red", "非Black"], 1],
        ["How many feathers are there on Dances with Barlog's Hat?", ["7", "8", "3", "选13", "16"], 3],
        ["What's the color of the marble Grendel the Really Old from Ellinia carries with him?", ["White", "Orange", "Blue", "Purple", "Green"], 2]
    ];
    
var status;
var question;

var questionPool;
var questionPoolCursor;

var questionAnswer;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            if(cm.getPlayer().gotPartyQuestItem("JBQ") && !cm.haveItem(4031058, 1)) {
                if(cm.haveItem(4005004, 1)) {
                    if(!cm.canHold(4031058)) {
                        cm.sendNext("请确保其他栏有空位。");
                        cm.dispose();
                    } else {
                        cm.sendNext("回答我几个问题，如果答错了就要重新带一个#b#t4005004##k过来。");
                    }
                } else {
                    cm.sendNext("带一个#b#t4005004##k再说。");
                    cm.dispose();
                }
            } else {
                cm.dispose();
            }
        } else if(status == 1) {
            cm.gainItem(4005004, -1);
            instantiateQuestionPool();
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status >= 2 && status <= 5) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("回答错误.");
                cm.dispose();
                return;
            }
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status == 6) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("回答错误.");
                cm.dispose();
                return;
            }
            
            cm.sendOk("你完成了所有的问题.\r\n这是你应得的.");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("Unexpected branch.");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    return "这是第 " + (status) + (status == 1 ? "个" : status == 2 ? "个" : status == 3 ? "个" : "个") + " 问题. ";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function instantiateQuestionPool() {
    questionPool = [];
    
    for(var i = 0; i < questionTree.length; i++) {
        questionPool.push(i);
    }
    
    shuffleArray(questionPool);
    questionPoolCursor = 0;
}

function fetchNextQuestion() {
    var next = questionPool[questionPoolCursor];
    questionPoolCursor++;
    
    return next;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateSelectionMenu(array, answer) {
    var answerStr = array[answer], answerPos = -1;
    
    shuffle(array);
    
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
        if (answerStr == array[i]) {
            answerPos = i;
        }
    }
    return [menu, answerPos];
}