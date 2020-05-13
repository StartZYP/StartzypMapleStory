/**
 *9201098 - Lukan
 *@author Ronan
 */
 
function start() {
    if(cm.getQuestStatus(8223) == 2) {
        if(cm.haveItem(3992041)) cm.sendOk("我们，约尔（Yere）的捍卫者，目前正在喀麦隆（Keep）内部的圣殿开会，即将发动针对扭曲大师及其军队的进攻。 随时加入我们。");
        else {
            if(!cm.canHold(3992041)) cm.sendOk("请在背包中预留一个空格，准备好我要给您的钥匙。 进入要塞内的内部圣殿至关重要。");
            else {
                cm.sendOk("所以您确实丢失了密码，对吗？ 很好，我会为您制作另一个，但请不要再失去它。 进入要塞内的内部圣殿至关重要。");
                cm.gainItem(3992041, 1);
            }
        }
    } else {
        cm.sendOk("哦，勇敢的冒险家。 我所属的这个周边地区，这个风景区免受扭曲的大师卫队每天威胁着公民的卫队的力量。 请帮助我们防御这些强大的怪物。");
    }
    
    cm.dispose();
}
