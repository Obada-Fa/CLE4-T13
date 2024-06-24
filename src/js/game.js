import { DisplayMode, Engine } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { MapScene } from './mapScene.js';

class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 760,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => this.goToScene('map'));
    }

    onInitialize() {
        this.add('map', new MapScene());
    }
}

new Game();
