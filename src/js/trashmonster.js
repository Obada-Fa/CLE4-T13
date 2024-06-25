import {
  Actor,
  Vector,
  Animation,
  SpriteSheet,
  CollisionType,
  range,
} from "excalibur";
import { Resources } from "./resources.js";
import { Player } from "./Player.js"; // Assuming the Player class is imported correctly

class TrashMonster extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      width: 128,
      height: 128,
    });
    console.log("TrashMonster constructor called");
    this.z = 25;
    this.scale.setTo(0.5, 0.5);
    // Define the sprite sheet for the TrashMonster
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TrashMonster,
      grid: {
        rows: 1,
        columns: 4,
        spriteWidth: Resources.TrashMonster.width / 4,
        spriteHeight: Resources.TrashMonster.height,
      },
    });

    // Create an animation from the sprite sheet
    const walkAnimation = Animation.fromSpriteSheet(
      spriteSheet,
      range(0, 3),
      200
    );

    // Use the animation for the TrashMonster
    this.walkAnimation = walkAnimation;
    this.graphics.use(walkAnimation);

    this.startPosition = new Vector(x, y);
    this.targetPosition = new Vector(x + 50, y); // 50 pixels to the right
    this.movingToTarget = true;

    // Set collision type for the TrashMonster
    this.collisionType = CollisionType.Passive; // Passive type, does not trigger events itself
  }

  onInitialize(engine) {
    console.log("TrashMonster onInitialize called");
    this.engine = engine;
    this.moveDuration = 2000; // Move for 2 seconds to cover 50 pixels at 25 pixels per second
    this.timeSinceLastMove = 0;
    this.updateVelocity();
  }

  updateVelocity() {
    if (this.movingToTarget) {
      this.vel = this.targetPosition.sub(this.pos).normalize().scale(25); // 25 pixels per second
      this.graphics.use(this.walkAnimation);
      this.graphics.current.scale = new Vector(-1, 1); // Flipped horizontally
    } else {
      this.vel = this.startPosition.sub(this.pos).normalize().scale(25); // 25 pixels per second
      this.graphics.use(this.walkAnimation);
      this.graphics.current.scale = new Vector(1, 1); // Normal scale
    }
  }

  onPreUpdate(engine, delta) {
    this.timeSinceLastMove += delta;

    if (this.timeSinceLastMove > this.moveDuration) {
      this.timeSinceLastMove = 0; // Reset the move timer
      this.movingToTarget = !this.movingToTarget; // Toggle the direction
      this.updateVelocity();
    }

    // If the TrashMonster has reached its destination, snap to it and reverse direction
    if (this.movingToTarget && this.pos.distance(this.targetPosition) < 1) {
      this.pos = this.targetPosition.clone();
      this.movingToTarget = false;
      this.updateVelocity();
    } else if (
      !this.movingToTarget &&
      this.pos.distance(this.startPosition) < 1
    ) {
      this.pos = this.startPosition.clone();
      this.movingToTarget = true;
      this.updateVelocity();
    }
  }

  onPostUpdate(engine, delta) {
    // Update position based on velocity
    this.pos = this.pos.add(this.vel.scale(delta / 1000));
  }

  // Override onCollision method to handle collision events
  onCollision(event) {
    if (event.other instanceof Player) {
      // Handle collision with the Player
      console.log("TrashMonster collided with Player!");
      // Perform actions like initiating combat, decreasing health, etc.
    }
  }
}

export { TrashMonster };
