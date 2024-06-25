import { Actor, Vector, CollisionType, Shape } from "excalibur";

export class MapContents extends Actor {
  constructor(x, y, width, height) {
    super({
      pos: new Vector(x, y),
      width: width,
      height: height,
      collisionType: CollisionType.Fixed,
    });
    this.resourceWidth = width;
    this.resourceHeight = height;
  }

  onInitialize(engine) {
    this.z = 2;
    const collider = Shape.Box(this.resourceWidth, this.resourceHeight);
    this.collider.set(collider);
  }
}
