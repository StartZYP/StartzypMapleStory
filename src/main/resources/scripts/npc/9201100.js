/**
 *9201100 - Taggrin
 *@author Ronan
 */
 
function start() {
    if(cm.getQuestStatus(8224) == 2) {
        cm.sendOk("�ܺã������Ա���������Ҫ���ǵİ��������ź����ǵ�һ����Ա̸̸��");
    } else {
        cm.sendOk("��ã�İ���ˡ������������Ĺ�Ӷ����ѻצ�壬�������ǵ����졣");
    }
    
    cm.dispose();
}
