/**
 *9201101 - T-1337
 *@author Ronan
 */
 
function start() {
    if (Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
        cm.openShopNPC(9201101);
    } else {
        //cm.sendOk("��Ҷ�ǵ�Ѳ�߶���ʱ׼���á�û�������ܴ����������С�");
        cm.sendDefault();
    }

    cm.dispose();
}
