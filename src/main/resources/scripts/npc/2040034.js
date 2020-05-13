/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
*/

var status = 0;
var em = null;

function start() {
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
                
                if (status == 0) {
                        em = cm.getEventManager("LudiPQ");
                        if(em == null) {
                                cm.sendOk("副本出现未知问题,无法工作.请联系管理员");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队探索：时间裂缝>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你不能一个人前往，因为里面有非常危险的生物。你愿意与队员合作完成这项任务吗？如果可以，请#b队长#k跟我说话.#b\r\n#L0#我想探索时间裂缝。\r\n#L1#我很乐意" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用":"启用") + "组队搜索.\r\n#L2#我想知道更多的细节.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("你只有在创建或者参与一个队伍后才可以挑战.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("请叫你们的队长和我谈谈才能开始这次的挑战。");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("当前频道已有玩家在这个频道上进行#r组队任务#k。请尝试另一个频道，或等待当前的队伍完成挑战。");                            
                                                }
                                        }
                                        else {
                                                cm.sendOk("你还不能开始这个组队任务，因为要么你的队伍不在等级范围内，或者你的一些队员没有资格尝试，或者他们不在这个地图。");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("您的队伍状态是:#b"+ (psState ? "启用":"禁用") +"#k.你什么时候想开始任务了就跟我说.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队探索：时间裂缝>#k#n\r\n时间裂缝已经出现在 #b#m220000000#!#k 我们迫切需要勇敢的冒险家来打败入侵的怪物。拜托，找几个可靠的队友#m220000000#!你必须通过击败怪物和解谜的不同阶段，最终战胜#r#o9300012##k.");
                                cm.dispose();
                        }
                }
        }
}