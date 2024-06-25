import { Actor, Color, Vector, ScreenElement, CollisionType } from "excalibur";

export class Healthbar extends ScreenElement {
    constructor(game, enemy = false) {
        super();
        this.game = game;
        this.enemy = enemy;
    }

    onInitialize(engine) {
        if (this.enemy) {
            this.colour = Color.Red;
        } else {
            this.colour = Color.Green;
        }
        this.currentHealth = 1;

        this.background = new Actor({
            x: -75,
            y: -300, // Position above the player
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 150, // Width of the health bar
            height: 5, // Height of the health bar
            anchor: Vector.Zero
        });
        this.background.z = 4;
        this.addChild(this.background);

        this.healthbar = new Actor({
            x: -75,
            y: -300, // Position above the player
            color: this.colour,
            width: 150, // Width of the health bar
            height: 5, // Height of the health bar
            anchor: Vector.Zero
        });
        this.addChild(this.healthbar);
        this.healthbar.z = 666;

        this.body.collisionType = CollisionType.PreventCollision;
        this.healthbar.body.collisionType = CollisionType.PreventCollision;
        this.background.body.collisionType = CollisionType.PreventCollision;
    }

    reduceHealth(amount) {
        if (this.currentHealth > 0) {
            this.currentHealth = Math.max(0, this.currentHealth - amount);
            this.healthbar.scale.x = this.currentHealth; // Scale width based on health
        }
    }

    setHealth(value) {
        this.currentHealth = Math.max(0, Math.min(1, value));
        this.healthbar.scale.x = this.currentHealth; // Scale width based on health
    }

    increaseHealth(amount) {
        if (this.currentHealth < 1) {
            this.currentHealth = Math.min(1, this.currentHealth + amount);
            this.healthbar.scale.x = this.currentHealth; // Scale width based on health
        }
    }
}
