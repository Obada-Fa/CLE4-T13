import { Actor, Vector, Input, Animation, SpriteSheet } from 'excalibur';
import { Resources } from './resources.js';

class Player extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
        });
        // Define the sprite sheet
        const playerSheet = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 3,
                columns: 4,
                spriteWidth: 320,
                spriteHeight: 316
            }
        });
this.scale = new Vector(0.5, 0.5),
        // Create animations
        
        this.animations = {
            left: Animation.fromSpriteSheet(playerSheet, [0, 1, 2, 3], 200),
            right: Animation.fromSpriteSheet(playerSheet, [0, 1, 2, 3], 200),
            up: Animation.fromSpriteSheet(playerSheet, [8, 9, 10, 11], 200),
            down: Animation.fromSpriteSheet(playerSheet, [4, 5, 6, 7], 200)
        };

        // Flip the right animation
        this.animations.right.flipHorizontal = true;

        // Set the default animation
        this.graphics.use(this.animations.down);
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onPreUpdate(engine, delta) {
        this.vel.setTo(0, 0); // Reset velocity before applying movement

        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
            this.vel.y = -100;
            this.graphics.use(this.animations.up);
        } else if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
            this.vel.y = 100;
            this.graphics.use(this.animations.down);
        } else if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
            this.vel.x = -100;
            this.graphics.use(this.animations.left);
        } else if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
            this.vel.x = 100;
            this.graphics.use(this.animations.right);
        } else {
            // No movement, keep the current animation frame
        }
    }
}

export { Player };
