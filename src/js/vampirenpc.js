import { Actor, Vector } from "excalibur";
import { Resources } from "./resources.js";

class Vampire extends Actor {
  constructor(x, y) {
    super({
      pos: new Vector(x, y),
      width: 120,
      height: 180,
    });
    console.log("Vampire constructor called");
    this.graphics.use(Resources.Vampire.toSprite()); // Using a placeholder image for Vampire
    this.startPosition = new Vector(x, y);
    this.targetPosition = new Vector(x + 150, y); // Move 150 pixels to the right initially
    this.movingToTarget = false; // Start by moving to the start position first (left)
  }

  onInitialize(engine) {
    console.log("Vampire onInitialize called");
    this.engine = engine;
    this.moveDuration = 4000; // Move for 4 seconds to cover 150 pixels at 37.5 pixels per second
    this.timeSinceLastMove = 0;
    this.updateVelocity();
  }

  updateVelocity() {
    if (this.movingToTarget) {
      this.vel = this.targetPosition.sub(this.pos).normalize().scale(37.5); // 37.5 pixels per second
    } else {
      this.vel = this.startPosition.sub(this.pos).normalize().scale(37.5); // 37.5 pixels per second
    }
  }

  onPreUpdate(engine, delta) {
    this.timeSinceLastMove += delta;

    if (this.timeSinceLastMove > this.moveDuration) {
      this.timeSinceLastMove = 0; // Reset the move timer
      this.movingToTarget = !this.movingToTarget; // Toggle the direction
      this.updateVelocity();
    }

    // If the Vampire has reached its destination, snap to it and reverse direction
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

export { Vampire };
