import { Scene, Actor, Vector, Sprite } from 'excalibur';
import { Resources } from './resources.js';
import { Player } from './Player.js';

class MapScene extends Scene {
    onInitialize(engine) {
        console.log('MapScene onInitialize called');

        // Load the map
        const map = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 3840,
            height: 3968
        });
        const mapSprite = Sprite.from(Resources.Map);
        map.graphics.use(mapSprite);
        this.add(map);

        // Define map boundaries
        const minX = -50;
        const minY = -150;
        const maxX = 1600;
        const maxY = 1000;

        // Spawn the player
        const player = new Player(engine.drawWidth / 2, engine.drawHeight / 2, minX, minY, maxX, maxY);
        this.add(player);

        // Adjust camera to follow the player
        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.strategy.elasticToActor(player, 0.5, 0.5);

        // Prevent the camera from showing outside the map
        engine.currentScene.camera.strategy.limitCameraBounds({
            left: minX + engine.drawWidth / 2,
            right: maxX - engine.drawWidth / 2,
            top: minY + engine.drawHeight / 2,
            bottom: maxY - engine.drawHeight / 2,
        });

        // Adjust the camera zoom level based on the map size and screen size
        const zoomX = engine.drawWidth / map.width;
        const zoomY = engine.drawHeight / map.height;
        const zoom = Math.min(zoomX, zoomY) * 7; // Adjust the multiplier as needed

        engine.currentScene.camera.zoom = zoom;
    }

    onActivate(ctx) {
        console.log('MapScene activated');
    }
}

export { MapScene };
