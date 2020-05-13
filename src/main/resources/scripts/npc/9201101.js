/**
 *9201101 - T-1337
 *@author Ronan
 */
 
function start() {
    if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
        cm.openShopNPC(9201101);
    } else {
        //cm.sendOk("新叶城的巡逻队随时准备好。没有生物能闯入这座城市。");
        cm.sendDefault();
    }

    cm.dispose();
}
