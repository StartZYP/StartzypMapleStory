/**
 *9201100 - Taggrin
 *@author Ronan
 */
 
function start() {
    if(cm.getQuestStatus(8224) == 2) {
        cm.sendOk("很好，家族成员。如果你需要我们的帮助，试着和我们的一个成员谈谈。");
    } else {
        cm.sendOk("你好，陌生人。我们是著名的雇佣兵乌鸦爪族，我是他们的首领。");
    }
    
    cm.dispose();
}
