package client.command.commands.gm6;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import net.server.Server;
import net.server.channel.Channel;

public class 召唤玩家Command extends Command {

	@Override
	public void execute(MapleClient client, String[] params) {
		MapleCharacter chr = client.getPlayer();
		if (params.length == 0) {
			for (MapleCharacter player : client.getChannelServer().getPlayerStorage().getAllCharacters()) {
				if (!player.equals(chr)) {
					player.changeMap(chr.getMap(), chr.getMap().getRandomPlayerSpawnpoint());
					player.yellowMessage("管理员将你召唤到了他的身边");
				}
			}
		} else if (params.length == 1) {
			String name = params[0];
			MapleCharacter player = client.getChannelServer().getPlayerStorage().getCharacterByName(name);
			if (player != null) {
				player.yellowMessage("管理员将你召唤到了他的身边");
				player.changeMap(chr.getMap(), chr.getMap().getRandomPlayerSpawnpoint());
			} else {
				chr.yellowMessage("在当前频道未找到'" + name + "'的玩家");
			}
		} else {
			chr.yellowMessage("输入:@召唤玩家 [<玩家名字>]");
		}
	}

}
