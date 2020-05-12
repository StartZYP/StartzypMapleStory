package client.command.commands.gm0;

import client.MapleClient;
import client.command.Command;
import net.server.task.AdvancedBossTask;

public class 开始进阶Boss extends Command {

	@Override
	public void execute(MapleClient client, String[] params) {
		new AdvancedBossTask().run();
	}

}
