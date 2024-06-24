import { MapContents } from "./mapcontents";
import { Resources } from "./resources";

export class Bench extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.Bench.toSprite());
  }
}

export class BlueTable extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.BlueTable.toSprite());
  }
}

export class LimeTable extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.LimeTable.toSprite());
  }
}
