import { Actor, Vector, Animation, SpriteSheet } from 'excalibur';
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
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onPreUpdate(engine, delta) {
    }
}

export { Boss };
