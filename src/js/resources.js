import {ImageSource, Loader} from 'excalibur';
import { Helmet } from './Inventory';

const Resources = {
    Mia: new ImageSource('/images/Mia.png'),
    Player: new ImageSource('/images/Spritesheet_player.png'),
    Boss: new ImageSource('/images/Trash_monster_spritesheet.png'),
    Helmet: new ImageSource('/images/helmet.png'),
    Map: new ImageSource('/map/map.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };