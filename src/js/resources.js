import {ImageSource, Loader} from 'excalibur';

const Resources = {
    Mia: new ImageSource('../../public/images/Mia.png'),
    Player: new ImageSource('../../public/images/Spritesheet_player.png'),
    Boss: new ImageSource('../../public/images/Trash_monster_spritesheet.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };