import { Actor, Vector, Input, Animation, SpriteSheet, CollisionType, Shape, Color } from 'excalibur';
import { Resources } from './resources.js';
import { Inventory, ItemActor, Gun, Bullet } from './Inventory.js';

class Player extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            collisionType: CollisionType.Active,
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

        // Track if the player has a gun
        this.hasGun = false;

        // Track the direction the player is facing
        this.facingDirection = 'down';

        // Define the collision shape for the player
        this.collider.set(Shape.Box(this.width, this.height));
    }

    onInitialize(engine) {
        this.engine = engine;

        // Listen for collision events
        this.on('collisionstart', (evt) => {
            if (evt.other instanceof ItemActor) {
                this.collectItem(evt.other);
            }
        });

        // Listen for shooting input
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Space && this.hasGun) {
                this.shoot();
            }
        });
    }

    onPreUpdate(engine, delta) {
        this.vel.setTo(0, 0);

        let moving = false;

        if (engine.input.keyboard.isHeld(Input.Keys.W) || engine.input.keyboard.isHeld(Input.Keys.ArrowUp)) {
            this.vel.y = -100;
            moving = true;
            this.facingDirection = 'up';
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.S) || engine.input.keyboard.isHeld(Input.Keys.ArrowDown)) {
            this.vel.y = 100;
            moving = true;
            this.facingDirection = 'down';
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.A) || engine.input.keyboard.isHeld(Input.Keys.ArrowLeft)) {
            this.vel.x = -100;
            moving = true;
            this.facingDirection = 'left';
        } 
        if (engine.input.keyboard.isHeld(Input.Keys.D) || engine.input.keyboard.isHeld(Input.Keys.ArrowRight)) {
            this.vel.x = 100;
            moving = true;
            this.facingDirection = 'right';
        } 
        
        if (moving) {
            if (this.facingDirection === 'left') {
                this.graphics.use(this.animations.left);
            } else if (this.facingDirection === 'right') {
                this.graphics.use(this.animations.right);
            } else if (this.facingDirection === 'up') {
                this.graphics.use(this.animations.up);
            } else if (this.facingDirection === 'down') {
                this.graphics.use(this.animations.down);
            }
        }
    }

    collectItem(itemActor) {
        this.inventory.addItem(itemActor.item);
        if (itemActor.item instanceof Gun) {
            this.hasGun = true;
        }
        itemActor.kill();
    }

    shoot() {
        let bulletDirection;
        if (this.facingDirection === 'left') {
            bulletDirection = new Vector(-1, 0);
        } else if (this.facingDirection === 'right') {
            bulletDirection = new Vector(1, 0);
        } else if (this.facingDirection === 'up') {
            bulletDirection = new Vector(0, -1);
        } else if (this.facingDirection === 'down') {
            bulletDirection = new Vector(0, 1);
        }
        const bullet = new Bullet(this.pos.x, this.pos.y, bulletDirection);
        this.scene.add(bullet);
    }
}

export { Player };
