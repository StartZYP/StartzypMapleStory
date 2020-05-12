package lynfanadded;

public class DropItem {
	int dropperId, itemId, min_quantity, max_quantity, questId, chance;
	String itemName, dropperName;

	public DropItem(int dropperId, int itemId, int min_quantity, int max_quantity, int questId, int chance,
			String itemName, String dropperName) {
		this.chance = chance;
		this.dropperId = dropperId;
		this.dropperName = dropperName;
		this.itemId = itemId;
		this.itemName = itemName;
		this.max_quantity = max_quantity;
		this.min_quantity = min_quantity;
		this.questId = questId;
	}
}