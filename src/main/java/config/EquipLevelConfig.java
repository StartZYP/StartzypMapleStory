package config;

import java.util.Objects;

public class EquipLevelConfig {
    public int id = 0;
    public int MaxLevel = 30;

//    public EquipLevelConfig(int id) {
//        this.id = id;
//    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMaxLevel() {
        return MaxLevel;
    }

    public void setMaxLevel(int maxLevel) {
        MaxLevel = maxLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EquipLevelConfig that = (EquipLevelConfig) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
