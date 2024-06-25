import { ImageSource, Loader } from "excalibur";
import { Helmet } from "./Inventory";
import { TrashMonster } from "./trashmonster";

const Resources = {
  TrashMonster: new ImageSource("/images/Trash_monster_spritesheet.png"),
  Wolf: new ImageSource("/images/wolfnpc.png"),
  Vampire: new ImageSource("/images/vampir.png"),

  Player: new ImageSource("/images/Spritesheet_player.png"),
  Boss: new ImageSource("/images/Trash_monster_spritesheet.png"),
  Helmet: new ImageSource("/images/helmet.png"),
  Map: new ImageSource("/map/map.png"),
  Bench: new ImageSource("/map/bench.png"),
  BlueTable: new ImageSource("/map/bluetable.png"),
  LimeTable: new ImageSource("/map/limetable.png"),
  PinkTable: new ImageSource("/map/pinktable.png"),
  PurpleTable: new ImageSource("/map/purpletable.png"),
  RedTable: new ImageSource("/map/redtable.png"),
  Tree: new ImageSource("/map/tree.png"),
  Sewer: new ImageSource("/images/sewerBG.png"),
  Cafe: new ImageSource("/map/coffeeshop.png"),
  DoubleLamp: new ImageSource("/map/double lamp.png"),
  Fountain: new ImageSource("/map/fountain.png"),
  BendLamp: new ImageSource("/map/gay lamp.png"),
  LampLeft: new ImageSource("/map/lamp left.png"),
  LampRight: new ImageSource("/map/lamp right.png"),
  MarketBlue: new ImageSource("/map/market-blue.png"),
  MarketRed: new ImageSource("/map/market-red.png"),
  Shop: new ImageSource("/map/shop1.png"),
  TitleBackground: new ImageSource("/images/Titlescreen.png"),
};

const ResourceLoader = new Loader();
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res);
}

export { Resources, ResourceLoader };
