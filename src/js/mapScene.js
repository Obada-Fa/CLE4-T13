import { Scene, Actor, Vector, Sprite } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./Player.js";
import {
  Bench,
  Tree,
  BlueTable,
  LimeTable,
  PinkTable,
  PurpleTable,
  RedTable,
  Shop,
  Cafe,
  Fountain,
  MarketBlue,
  MarketRed,
} from "./mapdecoration.js";
import { NPC } from "./npc.js";
import { Vampire } from "./vampirenpc.js";
import { TrashMonster } from "./trashmonster.js";

class MapScene extends Scene {
  onInitialize(engine) {
    console.log("MapScene onInitialize called");

    // Load the map
    const map = new Actor({
      pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
      width: Resources.Map.width,
      height: Resources.Map.height,
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
    const zoom = Math.min(zoomX, zoomY) * 7; // Adjust the multiplier as needed

    // engine.currentScene.camera.zoom = zoom;

    // Add map decorations
    const benchPositions = [
      { x: 350, y: 345 },
      { x: 540, y: 345 },
      { x: 625, y: 345 },
      { x: 825, y: 345 },
      { x: 925, y: 345 },
      { x: 350, y: 1100 },
      { x: 590, y: 1100 },
      { x: 1150, y: 1100 },
      { x: 1025, y: 1100 },
      { x: 850, y: 1100 },
      { x: 1000, y: 925 },
      { x: 1310, y: 925 },
      { x: 1405, y: 925 },
      { x: 1000, y: 750 },
      { x: 1150, y: 750 },
    ];

    benchPositions.forEach((pos) => {
      const bench = new Bench(pos.x, pos.y);
      this.add(bench);
    });

    const treePositions = [
      { x: 440, y: 300 },
      { x: 720, y: 300 },
      { x: 1000, y: 300 },
      { x: 133, y: 380 },
      { x: 110, y: 620 },
      { x: 110, y: 795 },
      { x: 300, y: 765 },
      { x: 520, y: 1050 },
      { x: 935, y: 1050 },
      { x: 1225, y: 1050 },
      { x: 1600, y: 1050 },
      { x: 1480, y: 835 },
      { x: 1310, y: 835 },
      { x: 1480, y: 580 },
      { x: 1310, y: 580 },
      { x: 635, y: 675 },
      { x: 905, y: 460 },
      { x: 1220, y: 50 },
      { x: 1480, y: 835 },
      { x: 1495, y: -50 },
      { x: 1600, y: 110 },
      { x: -55, y: 33 },
      { x: -150, y: 365 },
      { x: -150, y: 595 },
      { x: -200, y: 1000 },
      { x: -10, y: 1050 },
    ];

    treePositions.forEach((pos) => {
      const tree = new Tree(pos.x, pos.y);
      this.add(tree);
    });

    const blueTablePositions = [
      { x: 400, y: 20 },
      { x: 900, y: -45 },
    ];

    blueTablePositions.forEach((pos) => {
      const blueTable = new BlueTable(pos.x, pos.y);
      this.add(blueTable);
    });

    const limeTablePositions = [
      { x: 535, y: -45 },
      { x: 850, y: 20 },
    ];

    limeTablePositions.forEach((pos) => {
      const limeTable = new LimeTable(pos.x, pos.y);
      this.add(limeTable);
    });

    const purpleTablePositions = [
      { x: 440, y: -45 },
      { x: 1040, y: 20 },
    ];

    purpleTablePositions.forEach((pos) => {
      const purpleTable = new PurpleTable(pos.x, pos.y);
      this.add(purpleTable);
    });

    const pinkTablePositions = [
      { x: 500, y: 20 },
      { x: 950, y: 20 },
      { x: 800, y: -45 },
    ];

    pinkTablePositions.forEach((pos) => {
      const pinkTable = new PinkTable(pos.x, pos.y);
      this.add(pinkTable);
    });

    const redMarketPositions = [
      { x: 360, y: 595 },
      { x: 710, y: 240 },
      { x: 825, y: 240 },
      { x: 865, y: 750 },
      { x: 855, y: 930 },
      { x: 400, y: 930 },
      { x: 265, y: 930 },
    ];

    redMarketPositions.forEach((pos) => {
      const redMarket = new MarketRed(pos.x, pos.y);
      this.add(redMarket);
    });

    const blueMarketPositions = [
      { x: 470, y: 595 },
      { x: 520, y: 240 },
      { x: 620, y: 240 },
      { x: 720, y: 750 },
      { x: 755, y: 930 },
      { x: 665, y: 930 },
      { x: 570, y: 930 },
    ];

    blueMarketPositions.forEach((pos) => {
      const blueMarket = new MarketBlue(pos.x, pos.y);
      this.add(blueMarket);
    });

    const redTable = new RedTable(985, -45);
    this.add(redTable);

    const shop = new Shop(975, -350);
    this.add(shop);

    const cafe = new Cafe(570, -310);
    this.add(cafe);

    const fountain = new Fountain(1400, 730);
    this.add(fountain);

    // Add NPC
    const npc = new NPC(1280, 210);
    this.add(npc);

    const vampire = new Vampire(85, 165);
    this.add(vampire);
    // Add TrashMonster
    const trashMonster = new TrashMonster(175, 885);
    this.add(trashMonster);

    let collidedWithTrashMonster = false;
    let collidedWithNPC = false;
    let collidedWithVampire = false;
    // Collision detection between player and TrashMonster
    this.player.on("collisionstart", (event) => {
      if (event.other === trashMonster) {
        collidedWithTrashMonster = true;
      } else if (event.other === npc) {
        collidedWithNPC = true;
      } else if (event.other === vampire) {
        collidedWithVampire = true;
      }
    });

    engine.input.keyboard.on("press", (evt) => {
      if (collidedWithTrashMonster) {
        // Transition to fight scene for TrashMonster
        engine.goToScene("fight");
      } else if (collidedWithNPC) {
        // Transition to interaction with NPC (assuming "interaction" scene)
        engine.goToScene("fight");
      } else if (collidedWithVampire) {
        // Transition to interaction with NPC (assuming "interaction" scene)
        engine.goToScene("fight");
      }
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
