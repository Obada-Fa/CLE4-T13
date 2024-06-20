import { Actor, Vector, Color, Circle, CollisionType } from 'excalibur';

class ItemActor extends Actor {
    constructor(item, x, y) {
        super({
            pos: new Vector(x, y),
            radius: 20,
            color: item instanceof Helmet ? Color.Green : Color.Red,
            collisionType: CollisionType.Passive, // Passive collision type for items
        });

        this.item = item;
    }
}

class Item {
    constructor(name, quantity = 1) {
        this.name = name;
        this.quantity = quantity;
    }

    toActor(x, y) {
        return new ItemActor(this, x, y);
    }
}

class Helmet extends Item {
    constructor(name, defense) {
        super(name);
        this.defense = defense;
    }
}

class Gun extends Item {
    constructor(name, attack) {
        super(name);
        this.attack = attack;
    }
}

class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemName, quantity = 1) {
        const itemIndex = this.items.findIndex(i => i.name === itemName);
        if (itemIndex !== -1) {
            this.items[itemIndex].quantity -= quantity;
            if (this.items[itemIndex].quantity <= 0) {
                this.items.splice(itemIndex, 1);
            }
        }
    }

    getItems() {
        return this.items;
    }
}

export { Item, Helmet, Gun, Inventory, ItemActor };
