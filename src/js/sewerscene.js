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
            width: 1024, // Use the actual dimensions of your sewer background image
            height: 1024, // Use the actual dimensions of your sewer background image
        });
        const sewerSprite = Sprite.from(Resources.Sewer);
        sewer.graphics.use(sewerSprite);
        this.add(sewer);
    }

    onInitialize(engine) {
        super.onInitialize(engine);

        // Set camera zoom level
        this.setCameraZoom(engine);

        // Define sewer map boundaries
        const minX = 250;
        const minY = 100;
        const maxX = 1200;
        const maxY = 650;

        const player = this.actors.find(actor => actor instanceof Player);
        if (player) {
            player.isInFightScene = true;
            player.pos.y = engine.drawHeight / 2; // Align y position
            player.maxY = maxY; // Set maxY to the ground level

            // Set player boundaries
            player.minX = minX;
            player.minY = minY;
            player.maxX = maxX;

            // Set camera to follow the player but constrain within background
            engine.currentScene.camera.strategy.lockToActor(player);
            engine.currentScene.camera.strategy.elasticToActor(player, 0.5, 0.5);

            // Prevent the camera from showing outside the map
            engine.currentScene.camera.strategy.limitCameraBounds({
                left: minX,
                right: maxX,
                top: minY,
                bottom: maxY,
            });
        }

        const enemy = this.actors.find(actor => actor instanceof this.enemyClass);
        if (enemy) {
            enemy.pos.y = engine.drawHeight / 2; // Align y position
            enemy.pos.x = engine.drawWidth - player.pos.x; // Opposite x position
        }
    }

    setCameraZoom(engine) {
        // Set the zoom level (e.g., 2.0 for 2x zoom)
        engine.currentScene.camera.zoom = 1.7; // Adjust zoom level as needed
    }
}

export { SewerFightScene };
