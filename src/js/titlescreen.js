import { Scene, Actor, Vector, Label, Color, GraphicsGroup, Sprite } from 'excalibur';
import { Resources } from './resources.js';

export class TitleScreen extends Scene {
    onInitialize(engine) {
        // Create the background actor with the PNG image
        const background = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight,
        });

        // Create a sprite from the ImageSource
        const sprite = Sprite.from(Resources.TitleBackground);
        background.graphics.use(sprite);

        this.add(background);

        // Add a label
        const label = new Label({
            text: 'Click to Start',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight - 50),
            color: Color.White,
            fontSize: 30,
            textAlign: 'center',
            baseAlign: 'middle'
        });

        this.add(label);

        // Add click event to skip the intro
        engine.input.pointers.primary.on('down', () => {
            engine.goToScene('map');  // Assuming 'map' is your main game scene
        });

        
    }
}

