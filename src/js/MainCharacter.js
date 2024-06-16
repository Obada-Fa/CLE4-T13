import { Actor, Vector, Input, Keys } from 'excalibur';
import { Resources } from './resources.mjs';

class MainCharacter extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 40,
            height: 40
        });
        this.graphics.use(Resources.Mia.toSprite());
    }

    onInitialize(engine) {
        this.engine = engine;
    }

    onPreUpdate(engine, delta) {
        this.vel.setTo(0, 0);

        if (engine.input.keyboard.isHeld(Input.Keys.W) || (engine.input.keyboard.isHeld(Input.Keys.ArrowUp))) {
            this.vel.y = -100;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.S) || (engine.input.keyboard.isHeld(Input.Keys.ArrowDown))) {
            this.vel.y = 100;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.A) || (engine.input.keyboard.isHeld(Input.Keys.ArrowLeft))) {
            this.vel.x = -100;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.D) || (engine.input.keyboard.isHeld(Input.Keys.ArrowRight))){
            this.vel.x = 100;
        }
    }
}

export { MainCharacter };
