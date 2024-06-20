import { Actor, Vector, Animation, SpriteSheet, Color } from 'excalibur';
import { Resources } from './resources.js';

class Boss extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 80,
            height: 80
        });
        this.scale = new Vector(0.5, 0.5);
        
        const bossSheet = SpriteSheet.fromImageSource({
            image: Resources.Boss,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 768,
                spriteHeight: 768
            }
        });

        this.animations = {
            idle: Animation.fromSpriteSheet(bossSheet, [0, 1, 2, 3], 200),
        };

        this.graphics.use(this.animations.idle);

        // Add health properties
        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onPreUpdate(engine, delta) {
        // Ensure health bar position updates with the boss
        this.updateHealthBar();
    }

    takeDamage(amount) {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
    }

    updateHealthBar() {
        // Logic to ensure health bar position and values are up-to-date
    }

    draw(ctx) {
        super.draw(ctx);

        // Draw the health bar
        const healthBarWidth = 50; // Adjusted width for visibility
        const healthBarHeight = 5; // Adjusted height for visibility
        const healthBarX = this.pos.x - healthBarWidth / 2;
        const healthBarY = this.pos.y - this.height / 2 - 10; // Position above the boss

        // Draw the background (red)
        ctx.fillStyle = 'red';
        ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        // Draw the current health (green)
        const healthWidth = (this.currentHealth / this.maxHealth) * healthBarWidth;
        ctx.fillStyle = 'green';
        ctx.fillRect(healthBarX, healthBarY, healthWidth, healthBarHeight);
    }
}

export { Boss };
