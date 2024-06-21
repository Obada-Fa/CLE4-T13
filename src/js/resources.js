import { ImageSource, Loader, Resource } from 'excalibur';
import { Helmet } from './Inventory';

const Resources = {
    Mia: new ImageSource('../../public/images/Mia.png'),
    Player: new ImageSource('../../public/images/Spritesheet_player.png'),
    Boss: new ImageSource('../../public/images/Trash_monster_spritesheet.png'),
    Helmet: new ImageSource('../../public/images/helmet.png'),
    TilemapXML: new Resource('../../public/map/CLE-Games-Tilemap.tmx'), // Remove the response type
    TilledDirt: new ImageSource('../../public/map/Tilled_Dirt.png')
    // Add other images as needed
};

const ResourceLoader = new Loader(Object.values(Resources));

export { Resources, ResourceLoader };
