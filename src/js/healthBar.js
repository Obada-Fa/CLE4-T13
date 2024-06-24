import { Actor, Color, Vector, ScreenElement, CollisionType } from "excalibur";

export class Healthbar extends ScreenElement {
    constructor(game, enemy = false) {
        super();
        this.game = game;
        this.enemy = enemy;
        this.currentHealth = 1;
    }

    onInitialize(engine) {
        this.colour = this.enemy ? Color.Red : Color.Green;

        this.background = new Actor({ x: 0, y: 0, color: Color.fromRGB(255, 255, 255, 0.4), width: 15, height: 1, anchor: Vector.Zero });
        this.background.z = 666;
        this.addChild(this.background);

        this.healthbar = new Actor({ x: 0, y: 0, color: this.colour, width: 15, height: 1, anchor: Vector.Zero });
        this.healthbar.z = 666;
        this.addChild(this.healthbar);

        this.body.collisionType = CollisionType.PreventCollision;
        this.healthbar.body.collisionType = CollisionType.PreventCollision;
        this.background.body.collisionType = CollisionType.PreventCollision;
    }

    reduceHealth(amount) {
        if (this.currentHealth > 0) {
            this.currentHealth = Math.max(0, this.currentHealth - amount);
            this.healthbar.scale = new Vector(this.currentHealth, 1);
        }
    }

    setHealth(value) {
        this.currentHealth = Math.max(0, Math.min(1, value));
        this.healthbar.scale = new Vector(this.currentHealth, 1);
    }

    increaseHealth(amount) {
        if (this.currentHealth < 1) {
            this.currentHealth = Math.min(1, this.currentHealth + amount);
            this.healthbar.scale = new Vector(this.currentHealth, 1);
        }
    }
}
