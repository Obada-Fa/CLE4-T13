import { Actor, Sprite, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { FightScene } from './fightscene.js';
import { Player } from './Player.js';

class SewerFightScene extends FightScene {
    constructor(engine, playerStartPos, enemyClass, enemyStartPos) {
        super(engine, playerStartPos, enemyClass, enemyStartPos);
    }

    setupBackground(engine) {
        const sewer = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight
        });
        const sewerSprite = Sprite.from(Resources.Sewer);
        sewer.graphics.use(sewerSprite);
        this.add(sewer);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        // Override player movement logic for jumping
        const player = this.actors.find(actor => actor instanceof Player);
        if (player) {
            player.isInFightScene = true; // Set the flag to indicate the player is in a fighting scene
        }
    }
}

export { SewerFightScene };
