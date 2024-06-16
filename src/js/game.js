import {DisplayMode, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.mjs';
import { MainCharacter } from './MainCharacter';
import { NPC } from './npc';

export class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 900,
            displayMode: DisplayMode.FitScreen
        });
        
        this.start(ResourceLoader).then(() => this.onInitialize());
    }

    onInitialize() {
        console.log('Game initialized');

        // Initialize the player
        const player = new MainCharacter(this.drawWidth / 2, this.drawHeight / 2);
        console.log('Player created');
        this.add(player);

        // Initialize and add the NPC
        const npc = new NPC(this.drawWidth / 2 + 100, this.drawHeight / 2 + 100); // Position NPC near the player
        console.log('NPC created and added to the game');
        this.add(npc);
    }
}

new Game();