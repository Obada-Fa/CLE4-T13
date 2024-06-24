import { DisplayMode, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './Player.js';
import { Helmet, Gun, ItemActor } from './Inventory.js';
import { Boss } from './boss.js';
import { NPC } from './npc';

export class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 760,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader)
    }

    onInitialize() {
        console.log('Game onInitialize called');
        const player = new Player(this.drawWidth / 2, this.drawHeight / 2);
        this.add(player);

        // Spawn a single boss monster at a random location
        const bossX = Math.random() * this.drawWidth;
        const bossY = Math.random() * this.drawHeight;
        const boss = new Boss(bossX, bossY);
        this.add(boss);

        // Spawn items randomly around the map
        const helmet = new Helmet('Steel Helmet', 10);
        const gun = new Gun('Laser Gun', 50);

        const helmetActor = helmet.toActor(Math.random() * this.drawWidth, Math.random() * this.drawHeight);
        const gunActor = gun.toActor(Math.random() * this.drawWidth, Math.random() * this.drawHeight);

        this.add(helmetActor);
        this.add(gunActor);
    }
}

new Game();
