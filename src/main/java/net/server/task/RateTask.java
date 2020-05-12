package net.server.task;

import java.util.Timer;
import java.util.TimerTask;

import net.server.Server;
import net.server.world.World;
import server.TimerManager;

/**
 * @author 大力 更改倍率线程(时间18:00~22:00开启双倍)
 */
public class RateTask implements Runnable {
	private int hour, minute, second;

	public RateTask(int hour, int minute, int second) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

	@Override
	public void run() {
		if (hour >= 18 && hour < 22) {
			for (World world : Server.getInstance().getWorlds()) {
				world.setExpRate(world.getExpRate() * 2);
				world.setDropRate(world.getDropRate() * 2);
				System.out.println("当前服务器倍率" + world.getExpRate());
			}
			System.out.println((21 - hour) + "小时" + (59 - minute) + "分" + (60 - second) + "秒后关闭双倍经验");
			new Timer().schedule(new TimerTask() {
				@Override
				public void run() {
					for (World world : Server.getInstance().getWorlds()) {
						world.setExpRate(world.getExpRate() / 2);
						world.setDropRate(world.getDropRate() / 2);
						System.out.println("当前服务器倍率" + world.getExpRate());
					}
				}
			}, (21 - hour) * 60 * 60 * 1000 + (59 - minute) * 60 * 1000 + (60 - second) * 1000);
//			TimerManager.getInstance().schedule(new CancleRate(),
//					(21 - hour) * 60 * 60 * 1000 + (59 - minute) * 60 * 1000 + (60 - second) * 1000);
			hour = 0;
			minute = 0;
			second = 0;

		} else {
			for (World world : Server.getInstance().getWorlds()) {
				world.setExpRate(world.getExpRate() * 2);
				world.setDropRate(world.getDropRate() * 2);
			}
			System.out.println((4) + "小时后关闭双倍经验");
			new Timer().schedule(new TimerTask() {
				@Override
				public void run() {
					for (World world : Server.getInstance().getWorlds()) {
						world.setExpRate(world.getExpRate() / 2);
						world.setDropRate(world.getDropRate() / 2);
						System.out.println("当前服务器倍率" + world.getExpRate());
					}
				}
			}, 4 * 60 * 60 * 1000);
			// TimerManager.getInstance().schedule(new CancleRate(), 4 * 60 * 60 * 1000);
		}
	}

	private class CancleRate implements Runnable {

		@Override
		public void run() {
			for (World world : Server.getInstance().getWorlds()) {
				world.setExpRate(world.getExpRate() / 2);
				world.setDropRate(world.getDropRate() / 2);
				System.out.println("当前服务器倍率" + world.getExpRate());
			}
		}

	}
}
