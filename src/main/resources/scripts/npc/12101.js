

/* Author: Xterminator
	NPC Name: 		Rain
	Map(s): 		Maple Road : Amherst (1010000)
	Description: 		Talks about Amherst
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
	
    if (status == 0) {
	cm.sendNext("����һ������#�ʺ絺#K��С��λ�ڷ㵺�Ķ���������֪���������ǳ�ѧ�ߵĳ����أ��԰ɣ��ܸ�������ֻ����С�Ĺ��");
    } else if (status == 1) {
	cm.sendNextPrev("��������ø�ǿ��Ȼ��ȥ#�ϸ�#K������һ���ۿڡ��������Ҿ޴�Ĵ���ǰ��һ����#b������#K�ĵط������Ĵ�С�����С������������ױȵġ�");
    } else if (status == 2) {
	cm.sendPrev("�ڽ������������ѡ�����ְҵ��������Ϊ#ԭʼ����#K...ʲô������˵�и���ͺͺ�ģ������ĳ�������ס��սʿ���ߵ��ǻ���ʲô���ĵط�?");
    } else if (status == 3) {
	cm.dispose();
    }
}