package net.server.task;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import client.MapleCharacter;
import config.YamlConfig;
import net.server.Server;
import net.server.world.World;
import tools.DatabaseConnection;

public class DailyClearTask implements Runnable {

	@Override
	public void run() {
		清理每日复活次数();
	}

	private void 清理每日复活次数() {
		try {
			Connection con = DatabaseConnection.getConnection();
			PreparedStatement ps = con.prepareStatement("update characters set heal = ?");
			ps.setInt(1, YamlConfig.config.server.每日复活次数);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		for (World world : Server.getInstance().getWorlds())
			for (MapleCharacter chr : world.getPlayerStorage().getAllCharacters()) {
				chr.setHealCount(YamlConfig.config.server.每日复活次数);
			}
	}

}
