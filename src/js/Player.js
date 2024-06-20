import { Actor, Vector, Input, Animation, SpriteSheet, CollisionType, Shape } from 'excalibur';
import { Resources } from './resources.js';
import { Inventory, ItemActor } from './Inventory.js';

class Player extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Active, // Ensure the player has an active collision type
            width: 300,
            height: 316
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

        this.scale = new Vector(0.5, 0.5);

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

        // Initialize player inventory
        this.inventory = new Inventory();

        // Define the collision shape for the player
        this.collider.set(Shape.Box(this.width, this.height));
    }

    onInitialize(engine) {
        this.engine = engine;

        // Listen for collision events
        this.on('collisionstart', (evt) => {
            console.log('Collision detected with', evt.other);
            if (evt.other instanceof ItemActor) {
                this.collectItem(evt.other);
            }
        });
    }

    onPreUpdate(engine, delta) {
        this.vel.setTo(0, 0); // Reset velocity before applying movement

        let moving = false;

        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
            this.vel.y = -100;
            moving = true;
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
            this.vel.y = 100;
            moving = true;
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
            this.vel.x = -100;
            moving = true;
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
            this.vel.x = 100;
            moving = true;
        } 
        
        if (moving) {
            if (this.vel.x < 0) {
                this.graphics.use(this.animations.left);
            } else if (this.vel.x > 0) {
                this.graphics.use(this.animations.right);
            } else if (this.vel.y < 0) {
                this.graphics.use(this.animations.up);
            } else if (this.vel.y > 0) {
                this.graphics.use(this.animations.down);
            }
        } else {
            // No movement, keep the current animation frame
        }
    }

    collectItem(itemActor) {
        console.log(`Collected item: ${itemActor.item.name}`);
        this.inventory.addItem(itemActor.item);
        itemActor.kill(); // Remove item from the game
    }
}

export { Player };
