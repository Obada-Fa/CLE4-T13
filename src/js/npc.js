import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

export class NPC extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      width: 100,
      height: 150,
    });
    console.log("NPC constructor called");
    this.graphics.use(Resources.Wolf.toSprite()); // Using the same placeholder image
    this.startPosition = new Vector(x, y);
    this.targetPosition = new Vector(x + 120, y); // 50 pixels to the right
    this.movingToTarget = false; // Start by moving to the start position first (left)
  }

  onInitialize(engine) {
    console.log("NPC onInitialize called");
    this.engine = engine;
    this.moveDuration = 3000; // Move for 2 seconds to cover 50 pixels at 25 pixels per second
    this.timeSinceLastMove = 0;
    this.updateVelocity();
  }

  updateVelocity() {
    if (this.movingToTarget) {
      this.vel = this.targetPosition.sub(this.pos).normalize().scale(40); // 25 pixels per second
    } else {
      this.vel = this.startPosition.sub(this.pos).normalize().scale(40); // 25 pixels per second
    }
  }

  onPreUpdate(engine, delta) {
    this.timeSinceLastMove += delta;

    if (this.timeSinceLastMove > this.moveDuration) {
      this.timeSinceLastMove = 0; // Reset the move timer
      this.movingToTarget = !this.movingToTarget; // Toggle the direction
      this.updateVelocity();
    }

    // If the NPC has reached its destination, snap to it and reverse direction
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
}
