import { MapContents } from "./mapcontents";
import { Resources } from "./resources";

export class Bench extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.scale.setTo(0.85, 0.85);
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

export class PinkTable extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.PinkTable.toSprite());
  }
}

export class PurpleTable extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.PurpleTable.toSprite());
  }
}

export class RedTable extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.RedTable.toSprite());
  }
}

export class Tree extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.scale.setTo(2, 2);
    this.graphics.use(Resources.Tree.toSprite());
  }
}

export class DoubleLamp extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.DoubleLamp.toSprite());
  }
}

export class Fountain extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.Fountain.toSprite());
  }
}
export class BendLamp extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.BendLamp.toSprite());
  }
}
export class LampLeft extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.LampLeft.toSprite());
  }
}

export class LampRight extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.LampRight.toSprite());
  }
}

export class MarketBlue extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.MarketBlue.toSprite());
  }
}

export class MarketRed extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.MarketRed.toSprite());
  }
}

export class Shop extends MapContents {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine) {
    super.onInitialize(engine);
    this.graphics.use(Resources.Shop.toSprite());
  }
}
