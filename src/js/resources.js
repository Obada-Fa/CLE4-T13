import {ImageSource, Loader} from 'excalibur';

const Resources = {
    Mia: new ImageSource('../../public/images/Mia.png'),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };