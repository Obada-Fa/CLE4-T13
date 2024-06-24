import { Scene, Actor, Vector, Sprite } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./Player.js";
import { Bench, BlueTable, LimeTable } from "./mapdecoration.js";

class MapScene extends Scene {
  onInitialize(engine) {
    console.log("MapScene onInitialize called");

    // Load the map
    const map = new Actor({
      pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
      width: 3840,
      height: 3968,
    });
    const mapSprite = Sprite.from(Resources.Map);
    map.graphics.use(mapSprite);
    this.add(map);

    // Define map boundaries
    const minX = 0;
    const minY = 0;
    const maxX = map.width;
    const maxY = map.height;

    // Spawn the player
    this.player = new Player(
      engine.drawWidth / 2,
      engine.drawHeight / 2,
      minX,
      minY,
      maxX,
      maxY
    );
    this.add(this.player);

    // Adjust camera to follow the player
    engine.currentScene.camera.strategy.lockToActor(this.player);
    engine.currentScene.camera.strategy.elasticToActor(this.player, 0.5, 0.5);

    // Prevent the camera from showing outside the map
    engine.currentScene.camera.strategy.limitCameraBounds({
      left: minX,
      right: maxX,
      top: minY,
      bottom: maxY,
    });

    // Adjust the camera zoom level based on the map size and screen size
    const zoomX = engine.drawWidth / map.width;
    const zoomY = engine.drawHeight / map.height;
    const zoom = Math.min(zoomX, zoomY) * 2; // Adjust the multiplier as needed

    engine.currentScene.camera.zoom = zoom;

    // Add map decorations
    const benchPositions = [
      { x: 530, y: 750 },
      { x: 990, y: 750 },
      { x: 449, y: 421 },
      { x: 695, y: 375 },
      { x: 1000, y: 300 },
    ];

    benchPositions.forEach((pos) => {
      const bench = new Bench(pos.x, pos.y);
      this.add(bench);
    });

    const blueTablePositions = [
      { x: 300, y: 400 },
      { x: 600, y: 800 },
    ];

    blueTablePositions.forEach((pos) => {
      const blueTable = new BlueTable(pos.x, pos.y);
      this.add(blueTable);
    });

    const limeTablePositions = [
      { x: 150, y: 500 },
      { x: 450, y: 650 },
    ];

    limeTablePositions.forEach((pos) => {
      const limeTable = new LimeTable(pos.x, pos.y);
      this.add(limeTable);
    });
  }

  onPreUpdate(engine, delta) {
    // Check if the player has reached the target position
    const targetPosition = new Vector(90, 1000);
    const distance = this.player.pos.distance(targetPosition);

    if (distance < 50) {
      // Allow some tolerance for the position
      // Switch to the fighting scene
      engine.goToScene("fight");
    }
  }

  onActivate(ctx) {
    console.log("MapScene activated");
  }
}

export { MapScene };
