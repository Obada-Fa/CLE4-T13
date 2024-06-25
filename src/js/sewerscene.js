import { Actor, Sprite, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { FightScene } from './fightscene.js';
import { Player } from './Player.js';
import { Helmet, Gun, ItemActor } from './Inventory.js'; // Import necessary classes
import { Boss } from './boss.js'; // Import the Boss class

class SewerFightScene extends FightScene {
    constructor(engine, playerStartPos, enemyClass, enemyStartPos) {
        super(engine, playerStartPos, enemyClass, enemyStartPos);
        this.bossDefeated = false; // Flag to track if the boss is defeated
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

        // Check if the boss is defeated before proceeding
        if (this.isBossDefeated(engine)) {
            this.transitionToMainMap(engine);
            return; // Exit initialization if the boss is defeated
        }

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

        // Ensure a single boss instance
        this.boss = this.actors.find(actor => actor instanceof Boss);
        if (!this.boss) {
            this.boss = new Boss(1000, 650); // Initialize the boss at the given position
            this.add(this.boss);
        } else {
            // Ensure the boss is at the correct position
            this.boss.pos.x = 1000;
            this.boss.pos.y = 650;
        }

        // Spawn items
        this.spawnItems(engine);
    }

    isBossDefeated(engine) {
        // Check if a boss instance exists and if it is defeated
        const boss = engine.currentScene.actors.find(actor => actor instanceof Boss);
        return boss ? boss.isDefeated : false;
    }

    setCameraZoom(engine) {
        // Set the zoom level (e.g., 2.0 for 2x zoom)
        engine.currentScene.camera.zoom = 1.7; // Adjust zoom level as needed
    }

    spawnItems(engine) {
        const helmet = new Helmet('Steel Helmet', 5);
        const gun = new Gun('Pistol', 10);

        const helmetActor = helmet.toActor(300, 650); // Adjust x position as needed
        const gunActor = gun.toActor(600, 650); // Adjust x position as needed

        this.add(helmetActor);
        this.add(gunActor);
    }

    update(engine, delta) {
        super.update(engine, delta);

        // Check if the boss is defeated
        if (this.boss && this.boss.isDefeated) {
            this.transitionToMainMap(engine);
        }
    }

    transitionToMainMap(engine) {
        // Ensure this logic is executed only once
        if (this.bossDefeated) return;

        this.bossDefeated = true;
        engine.goToScene('map');
    }
}

export { SewerFightScene };
