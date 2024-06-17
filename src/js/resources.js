import {ImageSource, Loader} from 'excalibur';

const Resources = {
    Mia: new ImageSource('../../public/images/Mia.png'),
    Player: new ImageSource('../../public/images/Spritesheet_player.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };