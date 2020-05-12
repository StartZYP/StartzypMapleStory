package lynfanadded;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

public class 船新的卷轴 {
	static String _60icon = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJdSURBVEhLrZUNla0wDISxgAUsXAtYwEItYKEWsIAFLGABC1jom0kbCKXcLW8353w3u6WdScpPmz+I8IJfxUVsm8YrsxfC7iT7rg3rOITVDXZddZxGSfhgysCYNV2GXowxCLbgh3rzKLYNpxHzF2QuulfjfW0E70ClcRJCB6aj2/YSP4bF9WEePmGfmzB9OjGe+w5/Y7sxts5tGCuMw+pdMr0aEF47GE3mti6dZBqrOTM1E18DBjBecY9yk2Rw5gHdnnlfsMXonhoZVSGVbhM6T+IWGlC8xL40cm+pEaXqIwl0N9EbMOB91UxYLDN1olx9iKhuWUlc/7fo+IYHiZk6Ue5dyGI+oWqiwiUzO0fXUCNKvQtZrNUrpQLycfIbcxFbfcxWlDwZKlzHh5M6Ua4+5N3TB4VYM0WvKZN8MOJ7a97d1yFi+XY/0psMZN3/dk0hayxdJuGbmeTuuC67hUydKFcfInYYJ8HTwGKupzHeZ247daLcuxCRWH1uhHE5NHiQzPINHzCf8F5zzZ8Y67GXg59o2sLUUNuxTrhwOX+PY/HM+BHTscWRBxwMXcosOOk8hgjhJwqWsAUoMERbcmiwM0tNt6lyY1oySWexPXf5Hfc45K0h313mZYzfAepHm3vIlkA9GRgjcJ7D5ijMPh774uR/GtGwxpQhRqexMTzMQDKzhhY1p56hTTyGGMFRtvGpM86roM/4JDpQLKIkkjMafAF73eIAXm8poGjOQVbGSjlRF6rw9AO2CKXamBfVmAuIFvANnasmim7341ZraNcKF+XYe2ex6wi1FBNN8w/wTIH727DUYAAAAABJRU5ErkJggg==";
	static String _60iconraw = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIZSURBVEhLrZUNlYQwDISxgAUsnAUs1AIWsFALWMACFrCABSz0ZtKGhsLuldvNe0N2C52vKT9pvhDhgT6Kk9k2jWfNXhT2QbLv2rCOLqyDs/OqI4OS8aGpEMYsdHG9gDEIbcG7eng021wGMb+RXIvqFbyvjcgPUCU4GaECU9Fleyk/hmXow+x+wj43YfrpBDz3HX5juzG2zm0YK8Bh9UOCngEUzx0aTea2Lp1kghXOTM+ktwEAwCvuUQlJgJwdqs15X7DFqJ4ehapCVrpNqDyZWxFA8zvtSyP3lh7Rqj6SQXcxvQgA3lfNFBfLTJ9oVx9iqlt2Z67/rXR8w4PETJ9o9yxkMp9QhajxHcxeo3PoEa2ehUzW1avuFlCOU5/AxWz1MVtT6hVQxXl8OOkT7epD3j19UCgLU+k51SQfjPjemnf3cYhZud0v1ZsMybz/Vk0jC5Yqk/EFJrk7zstuIdMn2tWHmB3gZJgBVuZ8GuN95rbTJ9o9CzGJqy9BGJemwUYyyzfc4XqK95pzvgLWtlcKhwhtATWqrVgvOOnUf4+2mDMOAh1btDxoAHBImQtOPi9DjHCIhneyC1ABiLKkabAyq5pq08oN9A6SerHtu/yOezR5C+S7y7yM8TtA/4i5hmwJ3BPAgKDch00rLD4e+zLIf4IIrIEyBJTBBnjAoASzQCuF08/ozxAQiLKNryrjdRV6HHcmpb4UTfMLgn1gg0vsWyQAAAAASUVORK5CYII=";
	static String _100icon = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ9SURBVEhLrZYNlcMgEIRjoRZiIRZiAQuxEAtYwEIsxAIWYiEWuJ2F4ZZc2qO92/e+t+SHGVhK6PAPkd7gT9GIbXss7Moeo5JOr3mcl+TDllbB9OuO2onC5Ns4g3vWdPEh+W1PclM4knf95o0YxV+RzlXfo/EZB8UvQqdxEQrNjNi2BCkzyunEKO5jmpc1jW5J8+rT5FyK2yA80tphnAJKJDO14hV5RlBKyxmdriuMMWuYI0Oz8DLUIB3LrTiEmTFTyxEnKXHzY+oyZEi5ZF23UcVgcjWAONC2Xge9PuKobWhkqf5QsTPORdAYMatJBuvK7Na8xmhDJ8v1h4rnkt2LK+VevV+eqbFk6GS590I7H0WkMZV8va7vsI+0oZGl3gvtzLKpgTGp7QJNef3Hcgf9cVFMuZg2M+d9yXvAXvafGWPvcb2qibSRG0PTxocDTGUPQyfLvRcqVst9BaY01rZvQD98PKCT5fpDRX/OujWwwIhZl0kydLJcf2jHbHwxkPVTSrve5zPJeZ3Xj4wRKhJl9NaM5jw05Gujn9hhnBQYYsb/Ysxj70o688FBU9JrzBcaMBsasG3zeWTTxzQLruQMKlJ0nkYdOU2u2AEQGJ5H/o5PTrYQtlFhk/XFPWhni5+hotb0zgT/p2DEI5InEvarmlbydfAwfr2PtSQ0tmUE9ixuj7+ydyUf0es1Dn4YArShnS3uQ43wq/w2pJk9e59/raw59AyPwtPQmeGHUmdmzlya4L0O5gtTYRRuB3EncmU1+Bvsc8siOAEDuDXHTYwMI8WL7Ejh8At2EKTbGA9pjA6AA3gF36UJYbmflprBWRN0umLXzmL7AWgRE8PwBT/c0e9n36WnAAAAAElFTkSuQmCC";
	static String _100iconraw = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI5SURBVEhLrZYBdYQwEESxUAtYwAIWsIAFLMQCFrCAhVjAAhbSndlsuqH0Gtrb9+ZtyJH5ZEPIdW+I9ED/isps22PWTu0xUukMzP04p7BuaRG5cc1RBpmx6QusQp+HzmFNYduTdIqOFKZ2eGVm5q+UzoX3GfiMHRVmUSM4G63VjKzttUqZUc5JQHHv0zgvqZ/mNC4hDdOU4taJPtLSAE4rSiQz9eZF8psJpfQ648R1BRizBhwZnlkvg4B0zLfmMLaMmXodcZASVy9TE9BCyiXruvU0A+QKgDnENq9XXh+xZxseatUeNDvjmA0dyDIhKqyr5WnRNUYbPmrXHjTXkt2bU7mv9OffCJYMH7V7Fhx8ZJMKKvl6Xe6xMdKGh1o9Cw62shHgIKWdZVC7/me5V75cZkZdoNXMrV/yvmIvh7+BsfdsvQpE2sgV0LXx4YCGvIfho3bPgmal3FcBamC2QyWMw8cDPmrXHjT9Pusa4AWQZS6TZPioXXtwoIIvAFk/KrdLv/0mWdd5+RMYQZMoT+9hBrdDQ742/MR2/UABiBm/BWzH3lXp1IPDoKZWsN1QCbMxgLV9Pg+FfgyjaMpZhYpknx+jPLlBrvIPYALwPPQ7PkyyhbCNsjZZX/TBWxHfg6YeegfB/ymA7Ii0Ewn7ldAivV4DwK/3MUtiYF9GyJ/F9fGX967kIwZe4+AHEEIb3oq4D4LwVn4BDebP3p+/Vh4OP6dfgzPDi1Jm5s5cg+C+Bj2OO5Or3hRd9wlsY7B3snygkAAAAABJRU5ErkJggg==";
	static String _10icon = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJgSURBVEhLrZYBlYQwDESxsBawsBawsBawsBawgAUsYAELWMBCbyZpIC3lttxt3vsvLNCZJhS6zRci3OBfkYhty1uZlbAOISxgwzHy8GrCOnWCG1cd+yARhdGv0BQToOk8PjGhV8BJsMq5qPUxIMYK+kNYqvLH8fderd5Lk2Xs0BF2pglDDyqNo1A0cbC9+7G0uReTeUCFMJneD60YeYThMpFHeFcYi5jNXp9jrywxR1a0cmWekEFYW8k0VvPWV/q5WoqGDa0S8QjFnUmJgIpZPTUyqkLataJFJfEFq5TiJcKaGN+KKPBIBEtw1fK5erYZ7UWmjsrVh4jazHfxgomcy85zcTFTR+XuhQzm8xLB3PRqEsg2hhoqdS9ksM3+I1+sWsS4uLzgiVLlgOO4OKmjcvUh754tFMFMmC8MaUb40XDv7u0Qsep2D22CjMPHgzoqVx8ieK46NUiAkeVVxv3ZOM7chCPWUhpItmv2m8b/eM4MEWHV3szMbaMI2ySf1mfbCLzGir9ifGyHllPT7tkk1FZsNyQcRtHM78ViOopp3zUnJkw46lxGFJmQIXyqLM96LLsX7uWmMfZ8hZQJLGMjx9RWi3OoEE3zapyh34/3HQrfcW+oqOEMY/7joL7anEMXiVSbG6Zm6VZo7y6+zWsvr5ls+jAU04qPhxpt82EWDdXMGx5mOWZOPccjchlixIWibSxXxvsq6DKekRYUJ1ESyXk7hgL+uqcHL8AJFM15kjPjTHmjDTTh8QN+Eka1MS+aMQcQm8Bv2L1mYli7L1ttYVUbHJTjn53HjyPUMlw0zQ/QhN3SFzadFgAAAABJRU5ErkJggg==";
	static String _10iconraw = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIdSURBVEhLrZYBlbMwEIRjoRZqoRZq4SxgoRawgAUsYAELsYCF/DOzWUiAXsN/3ffmLeXIfNklJBe+EOmC/hSV2TK/TJMpxT6lGVpwjdz/hBTHp1SMa451kEwB+lWEYgKETsMDE/pJuAlF3cteHwNmrKDbjFVVeZ1/r9Xas4TMwxMdYWdC6juoEZyNMqQQ27teq82dIFOPCgEZXzerGHkAcB6pW3o1gGXms7f32JnmnLMiWhmZR2QoxbsywQa/l5V+rpamaUGrZJ5F8wJypoSKWT09dmoKtSuiRWfmM1Ypzc+UYgW+FNngVhmeiauW77XUMqG9yPQxu/aQqc98NT+B6N7uPhcXM33M7lpoMN+XDPfQd5NA9jH0MKtrocE++4/6YtUy4+IqDQ86qxziOC5O+phde+jb84UiOYT5DZAwiptG8e1eDpk1t7u/V9I4bB70Mbv2kOGx6hpQCSDPUeP+G5xn7sZZ3lIClP1v/pvgP7xnhkxYdQlzuB8UaRm1tT7uQeLfWPFXwNtx6LmGPh+hUmvF/kClDZRh5Vks6CBo9wwHjZhw9nkb2WREhvGhsn22a51eeJaHxtDxEzKN0DwEXdPbEMcwI0L31RTA8jxeTyjs4yXQZMAJYP7HQX/DHMMWiardA2tYfRT6t4u9OXb6zHToAyhow+ZhoGXaYBlosBK4wfZyOP0KfQyBuFCsjeeV8bkGXY4zk72+FCH8AyE6vFrEsaADAAAAAElFTkSuQmCC";
	static String _perfecticon = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ+SURBVEhLrZUNtesgEIRr4VqohVqohVjAQixgAQtYwAIWYgEL3JldNiG9bUJe35wz3bSB+fhpwu0/qF7wV9qFmUrzquKluNnXlHKNcNdvWH9Ah+qgIaaacuaP8FL9NA6XEAsbUpmlOK/gkm9i7+BBsATUErR+kC1zXgpmt9Sc7tWHUGcfUCOqrzne4J86D4B1z7qZGmBnfIC3VrnOE2qRpaYJZ2Vm86EkuC7ubTiDt/ri/JDZO+d62CnQJP/EFO8tcA9h8GYsb/d9yXepzNCocUnHkp+7wNU5oipM9jQHqWbuMStzNG5cEmpLlgDZB0+wa9fzer3d/3cwJZ2XFtJbwBGDIlTqHmx9mKFR19QgBo6wvgxS4uPxwP7DAcb3lHA/zq3td7PWEPy5pCbsIyF0nLZr8bNGz98xgAZO4d6/Ji9J3jrbjAnHrIJCCdq5zZYwmn1p5mjcNUnYDo6ljsEBxlnCYQa0m2ln9otozxyNG9caoGEKDQAGPwHIx4h73vYebeTZb21tm5ijceOSjgaOABAm5jWXlYNp1wa05f5mnynpnDF6CyRMB8LjrqlkecVOkxPzHmfMygyNuibpTPBHFRx9KJObdx4FW4Odz1QWhTqA5DRibR6CakrSOigCyxLl0ODZ2ztifwP2ntmK+KuWcgwVCI0PvL7XE4rP6iuUDh7gk+dYluQTuIfJydRZ/8V4N2d9jlfgAJRqhO0f+hmmoHc2OPM6n6rtVzqcGdsN+OeND/Uu5NWP5ucFW587fDgI3mQjA0ywa547+zfu7/dmX+Yw8y3coAa0jhYcTtwPwjwMPpvpJ1tbg5htuYeX2sxOr+73rnffj2aWudPt9gtvK+2//cF5GwAAAABJRU5ErkJggg==";
	static String _perfecticonraw = "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI4SURBVEhLrZUNlesgFIRj4VmohbWwFmIBC7GABSxgAQtYiAUssDP3XhLo9oe87pwzvbQN8wUIYfkD1Qv+SENYUzEfKl6K23xNKdcId/2m9Qv0Uh00xFRTzvwR3qtf5+ES0sKmVDYpziu45EXsHTwJloBagtYnatOc94LR7TWnW/Uh1M0H1Ijqa44L/K9uE2Bds26kDTAYH+AdVdp5RS0y1TThrMw0v5QE1909DGfwWe+cv2T0zrke9hbYJE9iijcLHCEMPo3p7b7v+SaVGRo1L+lY8vcQeDhHVIXJmuYgtZlrzMocjZuXhLYpS4CMwSvsrL0d7fP//wdT0nm3kN4CjrgpQqWO4NaHGRp1TQZp4AjryyAlbo8vrD8cYHxPCf/Hza79bNQagodLasI6EkLH9WyLv2v0/B03YOAUbv1r8pLkrXOOmHCMKiiUoME2WsJo9qWZo3HXJGEDHFMdgwOMo4TDBmg30s7sF3E9czRuXkeAhik0ABj8CiC3Edfc1h7XyN63a9syMUfj5iUdGzgCQJiYbU4rb8baDdim+5N1pqRzxt23QML0RnjcmUqWV+y6OjH/44hZmaFR1ySdCX6qgqMPZXXb4Flwu2DwO5VdoQ4gOY1YzVNQTUlaJ0Vg2aMcGjx7e0esb8DaM1sRv2Upr6ECofGB1/dxQnGv3kPp4AF+s49lSp6Be5icTJ31Kca7Oes+PoATUMoI5xP6HKagR25w5nV+K1uv9HJkvG7Cl/Uo5N5/pGX5ATi7yAfplZusAAAAAElFTkSuQmCC";

	public static void main(String[] args) throws IOException {
		HashMap<Integer, String> map1 = new HashMap<Integer, String>();
		map1.put(0, "头盔");
		map1.put(1, "脸部装饰");
		map1.put(2, "眼部装饰");
		map1.put(3, "耳环");
		map1.put(4, "上衣");
		map1.put(5, "全身铠甲");
		map1.put(6, "裤裙");
		map1.put(7, "鞋子");
		map1.put(8, "手套");
		map1.put(9, "盾牌");
		map1.put(10, "披风");
		map1.put(11, "戒指");
		map1.put(12, "项链");
		map1.put(13, "腰带");
		map1.put(30, "单手剑");
		map1.put(31, "单手斧");
		map1.put(32, "单手钝器");
		map1.put(33, "短剑");
		map1.put(37, "短杖");
		map1.put(38, "长杖");
		map1.put(40, "双手剑");
		map1.put(41, "双手斧");
		map1.put(42, "双手钝器");
		map1.put(43, "枪");
		map1.put(44, "矛");
		map1.put(45, "弓");
		map1.put(46, "弩");
		map1.put(47, "拳套");
		map1.put(48, "拳甲");
		map1.put(49, "短枪");
		map1.put(80, "宠物");
		ArrayList<String> names = new ArrayList<String>();
		names.add("智力卷轴100%");
		names.add("智力卷轴60%");
		names.add("智力卷轴10%");
		names.add("智力必成卷轴");
		names.add("力量卷轴100%");
		names.add("力量卷轴60%");
		names.add("力量卷轴10%");
		names.add("力量必成卷轴");
		names.add("敏捷卷轴100%");
		names.add("敏捷卷轴60%");
		names.add("敏捷卷轴10%");
		names.add("敏捷必成卷轴");
		names.add("运气卷轴100%");
		names.add("运气卷轴60%");
		names.add("运气卷轴10%");
		names.add("运气必成卷轴");
		names.add("防御卷轴100%");
		names.add("防御卷轴60%");
		names.add("防御卷轴10%");
		names.add("防御必成卷轴");
		names.add("攻击卷轴100%");
		names.add("攻击卷轴60%");
		names.add("攻击卷轴10%");
		names.add("攻击必成卷轴");
		names.add("魔力卷轴100%");
		names.add("魔力卷轴60%");
		names.add("魔力卷轴10%");
		names.add("魔力必成卷轴");
		names.add("速度卷轴100%");
		names.add("速度卷轴60%");
		names.add("速度卷轴10%");
		names.add("速度必成卷轴");
		ArrayList<String> desc = new ArrayList<String>();
		desc.add("魔法攻击力+1,智力+1,成功率100%");
		desc.add("魔法攻击力+2,智力+3,成功率60%");
		desc.add("魔法攻击力+5,智力+5,成功率10%");
		desc.add("魔法攻击力+5,智力+5,成功率100%");
		desc.add("力量+1,成功率100%");
		desc.add("力量+2,敏捷+1,成功率60%");
		desc.add("力量+5,敏捷+3,成功率10%");
		desc.add("力量+5,敏捷+3,成功率100%");
		desc.add("敏捷+1,成功率100%");
		desc.add("敏捷+2,力量+1,成功率60%");
		desc.add("敏捷+5,力量+3,成功率10%");
		desc.add("敏捷+5,力量+3,成功率100%");
		desc.add("运气+1,成功率100%");
		desc.add("运气+2,敏捷+1,成功率60%");
		desc.add("运气+5,敏捷+3,成功率10%");
		desc.add("运气+5,敏捷+3,成功率100%");
		desc.add("物理防御力+1,成功率100%");
		desc.add("物理防御力+3,魔法防御力+1,成功率60%");
		desc.add("物理防御力+5,魔法防御力+3,生命值上限+5,成功率10%");
		desc.add("物理防御力+5,魔法防御力+3,生命值上限+5,成功率100%");
		desc.add("物理攻击力+1,成功率100%");
		desc.add("物理攻击力+2,力量+1,敏捷+1,运气+1,成功率60%");
		desc.add("物理攻击力+5,力量+3,敏捷+3,运气+3,成功率10%");
		desc.add("物理攻击力+5,力量+3,敏捷+3,运气+3,成功率100%");
		desc.add("魔法攻击力+2,成功率100%");
		desc.add("魔法攻击力+5,智力+2,成功率60%");
		desc.add("魔法攻击力+10,智力+5,最大魔法值+15,成功率10%");
		desc.add("魔法攻击力+10,智力+5,最大魔法值+15,成功率100%");
		desc.add("速度+1,成功率100%");
		desc.add("速度+3,跳跃+1,成功率60%");
		desc.add("速度+5,跳跃+2,成功率10%");
		desc.add("速度+5,跳跃+2,成功率100%");
		ArrayList<String> info = new ArrayList<String>();
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"1\"/>\r\n<int name=\"incINT\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"2\"/>\r\n<int name=\"incINT\" value=\"3\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"5\"/>\r\n<int name=\"incINT\" value=\"5\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"5\"/>\r\n<int name=\"incINT\" value=\"5\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSTR\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSTR\" value=\"2\"/>\r\n<int name=\"incDEX\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSTR\" value=\"5\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSTR\" value=\"5\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incDEX\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incDEX\" value=\"2\"/>\r\n<int name=\"incSTR\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incDEX\" value=\"5\"/>\r\n<int name=\"incSTR\" value=\"3\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incDEX\" value=\"5\"/>\r\n<int name=\"incSTR\" value=\"3\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incLUK\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incLUK\" value=\"2\"/>\r\n<int name=\"incDEX\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incLUK\" value=\"5\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incLUK\" value=\"5\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPDD\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPDD\" value=\"3\"/>\r\n<int name=\"incMDD\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPDD\" value=\"5\"/>\r\n<int name=\"incMDD\" value=\"3\"/>\r\n<int name=\"incMHP\" value=\"5\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPDD\" value=\"5\"/>\r\n<int name=\"incMDD\" value=\"3\"/>\r\n<int name=\"incMHP\" value=\"5\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPAD\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPAD\" value=\"2\"/>\r\n<int name=\"incSTR\" value=\"1\"/>\r\n<int name=\"incDEX\" value=\"1\"/>\r\n<int name=\"incLUK\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPAD\" value=\"5\"/>\r\n<int name=\"incSTR\" value=\"3\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"incLUK\" value=\"3\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incPAD\" value=\"5\"/>\r\n<int name=\"incSTR\" value=\"3\"/>\r\n<int name=\"incDEX\" value=\"3\"/>\r\n<int name=\"incLUK\" value=\"3\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"2\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"5\"/>\r\n<int name=\"incINT\" value=\"2\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"10\"/>\r\n<int name=\"incINT\" value=\"5\"/>\r\n<int name=\"incMMP\" value=\"15\"/>\r\n<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incMAD\" value=\"10\"/>\r\n<int name=\"incINT\" value=\"5\"/>\r\n<int name=\"incMMP\" value=\"15\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSpeed\" value=\"1\"/>\r\n<int name=\"success\" value=\"100\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSpeed\" value=\"3\"/>\r\n<int name=\"incJump\" value=\"1\"/>\r\n<int name=\"success\" value=\"60\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSpeed\" value=\"5\"/>\r\n<int name=\"incJump\" value=\"2\"/>\r\r<int name=\"success\" value=\"10\"/>\r\n");
		info.add(
				"<int name=\"price\" value=\"1\"/>\r\n<int name=\"incSpeed\" value=\"5\"/>\r\n<int name=\"incJump\" value=\"2\"/><int name=\"success\" value=\"100\"/>\r\n");
		BufferedWriter bw = new BufferedWriter(new FileWriter(new File("C:\\Users\\Administrator\\Desktop\\204.xml")));
		BufferedWriter bwString = new BufferedWriter(
				new FileWriter(new File("C:\\Users\\Administrator\\Desktop\\204 - 副本.xml")));
		bw.write("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
		bw.write("\r\n");
		bw.write("<imgdir name=\"0204.img\">");
		bw.write("\r\n");
		for (Integer key : map1.keySet()) {
			switch (key) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 10:
			case 11:
			case 12:
			case 13:
			case 80:// 只有属性或防御
				for (int i = 0; i < 20; i++) {
					String id = "0204" + (key < 10 ? "0" + key : key) + (i < 10 ? "0" + i : i);
					String name = map1.get(key) + names.get(i);
					String descString = desc.get(i);
					System.out.println(id + "\t" + name + "\t" + descString);
//					 <imgdir name="2040000">
//			        <string name="name" value="头盔防御卷轴"/>
//			        <string name="desc" value="成功率100%,物理防御力+1"/>
//			   		 </imgdir>
					bwString.write("<imgdir name=\"" + id + "\">\r\n");
					bwString.write("<string name=\"name\" value=\"" + name + "\"/>\r\n");
					bwString.write("<string name=\"desc\" value=\"" + descString + "\"/>\r\n");
					bwString.write("</imgdir>\r\n");
					bw.write("<imgdir name=\"" + id + "\">\r\n");
					bw.write("<imgdir name=\"info\">\r\n");
					if (key == 0 && i < 4) {
						switch (i) {
						case 0:
							bw.write("<canvas name=\"icon\" width=\"30\" height=\"29\" basedata=\"" + _100icon
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n <canvas name=\"iconRaw\" width=\"30\" height=\"26\" basedata=\""
									+ _100iconraw
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n");
							break;
						case 1:
							bw.write("<canvas name=\"icon\" width=\"30\" height=\"29\" basedata=\"" + _60icon
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n <canvas name=\"iconRaw\" width=\"30\" height=\"26\" basedata=\""
									+ _60iconraw
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n");
							break;
						case 2:
							bw.write("<canvas name=\"icon\" width=\"30\" height=\"29\" basedata=\"" + _10icon
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n <canvas name=\"iconRaw\" width=\"30\" height=\"26\" basedata=\""
									+ _10iconraw
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n");
							break;
						case 3:
							bw.write("<canvas name=\"icon\" width=\"30\" height=\"29\" basedata=\"" + _perfecticon
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n <canvas name=\"iconRaw\" width=\"30\" height=\"26\" basedata=\""
									+ _perfecticonraw
									+ "\">\r\n<vector name=\"origin\" x=\"-1\" y=\"29\"/>\r\n</canvas>\r\n");
							break;
						default:
							break;
						}
					} else {
						switch (i % 4) {
						case 0:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040000/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040000/info/iconRaw\"/>\r\n");
							break;
						case 1:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040001/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040001/info/iconRaw\"/>\r\n");
							break;
						case 2:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040002/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040002/info/iconRaw\"/>\r\n");
							break;
						case 3:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040003/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040003/info/iconRaw\"/>\r\n");
							break;
						default:
							break;
						}
					}
					bw.write(info.get(i));
					bw.write("</imgdir>\r\n</imgdir>\r\n");
				}
				break;
			default:// 武器只有攻击和魔力
				if (key == 37 || key == 38) {// 法师装备只添加魔力
					for (int i = 24; i < 28; i++) {
						String id = "0204" + (key < 10 ? "0" + key : key) + (i < 10 ? "0" + i : i);
						String name = map1.get(key) + names.get(i);
						String descString = desc.get(i);
						System.out.println(id + "\t" + name + "\t" + descString);
						bwString.write("<imgdir name=\"" + id + "\">\r\n");
						bwString.write("<string name=\"name\" value=\"" + name + "\"/>\r\n");
						bwString.write("<string name=\"desc\" value=\"" + descString + "\"/>\r\n");
						bwString.write("</imgdir>\r\n");
						bw.write("<imgdir name=\"" + id + "\">\r\n");
						bw.write("<imgdir name=\"info\">\r\n");
						switch (i % 4) {
						case 0:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040000/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040000/info/iconRaw\"/>\r\n");
							break;
						case 1:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040001/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040001/info/iconRaw\"/>\r\n");
							break;
						case 2:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040002/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040002/info/iconRaw\"/>\r\n");
							break;
						case 3:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040003/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040003/info/iconRaw\"/>\r\n");
							break;
						default:
							break;
						}
						bw.write(info.get(i));
						bw.write("</imgdir>\r\n</imgdir>\r\n");
					}
				} else {// 只加攻击
					for (int i = 20; i < 24; i++) {
						String id = "0204" + (key < 10 ? "0" + key : key) + (i < 10 ? "0" + i : i);
						String name = map1.get(key) + names.get(i);
						String descString = desc.get(i);
						System.out.println(id + "\t" + name + "\t" + descString);
						bwString.write("<imgdir name=\"" + id + "\">\r\n");
						bwString.write("<string name=\"name\" value=\"" + name + "\"/>\r\n");
						bwString.write("<string name=\"desc\" value=\"" + descString + "\"/>\r\n");
						bwString.write("</imgdir>\r\n");
						bw.write("<imgdir name=\"" + id + "\">\r\n");
						bw.write("<imgdir name=\"info\">\r\n");
						switch (i % 4) {
						case 0:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040000/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040000/info/iconRaw\"/>\r\n");
							break;
						case 1:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040001/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040001/info/iconRaw\"/>\r\n");
							break;
						case 2:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040002/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040002/info/iconRaw\"/>\r\n");
							break;
						case 3:
							bw.write(
									"<uol name=\"icon\" value=\"../../02040003/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040003/info/iconRaw\"/>\r\n");
							break;
						default:
							break;
						}
						bw.write(info.get(i));
						bw.write("</imgdir>\r\n</imgdir>\r\n");
					}
				}
				break;
			}
			if (key == 7 || key == 80) {// 鞋子和宠物添加速度属性
				for (int i = 28; i < 32; i++) {
					String id = "0204" + (key < 10 ? "0" + key : key) + (i < 10 ? "0" + i : i);
					String name = map1.get(key) + names.get(i);
					String descString = desc.get(i);
					System.out.println(id + "\t" + name + "\t" + descString);
					bwString.write("<imgdir name=\"" + id + "\">\r\n");
					bwString.write("<string name=\"name\" value=\"" + name + "\"/>\r\n");
					bwString.write("<string name=\"desc\" value=\"" + descString + "\"/>\r\n");
					bwString.write("</imgdir>\r\n");
					bw.write("<imgdir name=\"" + id + "\">\r\n");
					bw.write("<imgdir name=\"info\">\r\n");
					switch (i % 4) {
					case 0:
						bw.write(
								"<uol name=\"icon\" value=\"../../02040000/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040000/info/iconRaw\"/>\r\n");
						break;
					case 1:
						bw.write(
								"<uol name=\"icon\" value=\"../../02040001/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040001/info/iconRaw\"/>\r\n");
						break;
					case 2:
						bw.write(
								"<uol name=\"icon\" value=\"../../02040002/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040002/info/iconRaw\"/>\r\n");
						break;
					case 3:
						bw.write(
								"<uol name=\"icon\" value=\"../../02040003/info/icon\"/>\r\n<uol name=\"iconRaw\" value=\"../../02040003/info/iconRaw\"/>\r\n");
						break;
					default:
						break;
					}
					bw.write(info.get(i));
					bw.write("</imgdir>\r\n</imgdir>\r\n");
				}
			}
		}
		bw.write("</imgdir>");
		bw.flush();
		bwString.flush();
		bw.close();
		bwString.close();
	}
	// 智力卷轴100% incMAD 1 incINT 1
	// 智力卷轴60% incMAD 2 incINT 3
	// 智力卷轴10% incMAD 5 incINT 5
	// 力量卷轴100% incSTR 1
	// 力量卷轴60% incSTR 2 incDEX 1
	// 力量卷轴10% incSTR 5 incDEX 3
	// 敏捷卷轴100% incDEX 1
	// 敏捷卷轴60% incDEX 2 incSTR 1
	// 敏捷卷轴10% incDEX 5 incSTR 3
	// 运气卷轴100% incLUK 1
	// 运气卷轴60% incLUK 2 incDEX 1
	// 运气卷轴10% incLUK 5 incDEX 3
	// 防御卷轴100% incPDD 1
	// 防御卷轴60% incPDD 3 incMDD 1
	// 防御卷轴10% incPDD 5 incMDD 3 incMHP 5
	// 攻击卷轴100% incPAD 1
	// 攻击卷轴60% incPAD 2 incSTR 1 incDEX 1 incLUK 1
	// 攻击卷轴10% incPAD 3 incSTR 3 incDEX 3 incLUK 3
	// 魔力卷轴100% incMAD 2
	// 魔力卷轴60% incMAD 5 incINT 3 incLUK 1
	// 魔力卷轴10% incMAD 10 incINT 5 incLUK 3

}
