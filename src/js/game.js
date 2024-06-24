import { Engine, DisplayMode, TileMap, Tile, vec } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { loadTilemap } from './tilemapLoader.js';
import { Player } from './Player.js';

export class Game extends Engine {
    constructor() {
        super({
            width: 1440,
            height: 760,
            displayMode: DisplayMode.FitScreen
        });

        this.start(ResourceLoader).then(() => this.onInitialize());
    }

    async onInitialize() {
        try {
            const tilemapData = await loadTilemap('../../public/map/CLE-Games-Tilemap.tmx');

            const tilemap = new TileMap({
                pos: vec(0, 0),
                cellWidth: tilemapData.tileWidth,
                cellHeight: tilemapData.tileHeight,
                rows: tilemapData.height,
                cols: tilemapData.width
            });

            for (let row = 0; row < tilemapData.height; row++) {
                for (let col = 0; col < tilemapData.width; col++) {
                    const tileIndex = tilemapData.tiles[row * tilemapData.width + col];
                    if (tileIndex > 0) {
                        const tile = new Tile({
                            x: col * tilemapData.tileWidth,
                            y: row * tilemapData.tileHeight,
                            width: tilemapData.tileWidth,
                            height: tilemapData.tileHeight
                        });
                        const tileGraphic = Resources.TilledDirt.toSprite();
                        tile.addGraphic(tileGraphic);
                        tilemap.addTile(tile);
                    }
                }
            }

            this.add(tilemap);

            const player = new Player(this.drawWidth / 2, this.drawHeight / 2);
            this.add(player);
        } catch (error) {
            console.error('Error initializing g ame:', error);
        }
    }
}

new Game();
