import { Actor, Vector, CollisionType, Shape } from "excalibur";

export class MapContents extends Actor {
  constructor(x, y, width = 50, height = 50) {
    super({
      pos: new Vector(x, y),
      width: width,
      height: height,
      collisionType: CollisionType.Fixed, // Set collision type to Fixed
    });
  }

  onInitialize(engine) {
    this.z = 2;
    const collider = Shape.Box(this.width, this.height);
    this.collider.set(collider);
  }
}
