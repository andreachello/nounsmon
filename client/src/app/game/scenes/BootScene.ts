import { Scene, GameObjects } from "phaser";
import { PLAYER_SIZE } from "../../../lib/constants/game";
import { Maps, Sprites } from "../../../lib/constants/assets";
import { Tilesets } from "../../../lib/constants/assets";
import { useUserDataStore } from "../../../lib/stores/userData";
import { UIEvents } from "../../../lib/constants/events";
import { dispatch } from "../../../lib/utils/ui";
import { useUIStore } from "../../../lib/stores/ui";

export default class BootScene extends Scene {
  text: GameObjects.Text;

  constructor() {
    super("Boot");
  }

  launchGame(): void {
    const userSettings = useUserDataStore.getState().settings;

    this.sound.pauseOnBlur = false;

    this.scene.switch("World");
  }

  preload(): void {
    this.load.on("progress", (value: number) => {
      dispatch<number>(UIEvents.LOADING_PROGRESS, value);
    });

    this.load.on("complete", () => {
      useUIStore.getState().setLoading(false);
      this.launchGame();
    });

    this.loadImages();
    this.loadSpriteSheets();
    this.loadMaps();
  }

  loadImages(): void {
    // UI
    this.load.image("logo", "assets/images/ui/logo.png");
    this.load.image(
      "title_background",
      "assets/images/ui/title_background.png",
    );

    // Battle
    this.load.image("battle_background", "assets/images/ui/bb_background.png");
    this.load.image("battle_grass", "assets/images/ui/bb_grass.png");
    this.load.image("trainer_back", "assets/images/battle/trainer.png");

    Array.from({ length: 151 }, (_, i) => {
      this.load.image(
        `pokemon_${i + 1}_front`,
        `assets/images/pokemons/front/${i + 1}.png`,
      );

      this.load.image(
        `pokemon_${i + 1}_front_shiny`,
        `assets/images/pokemons/front/shiny/${i + 1}.png`,
      );
    });

    Array.from({ length: 151 }, (_, i) => {
      this.load.image(
        `pokemon_${i + 1}_back`,
        `assets/images/pokemons/back/${i + 1}.png`,
      );

      this.load.image(
        `pokemon_${i + 1}_back_shiny`,
        `assets/images/pokemons/back/shiny/${i + 1}.png`,
      );
    });

    // Tilesets
    Object.values(Tilesets).forEach((tileset) => {
      this.load.image(tileset, `assets/images/tilesets/${tileset}.png`);
    });

    // Audios
    // Object.values(Audios).forEach((audio) => {
    //   this.load.audio(audio, `assets/audio/${audio}.ogg`);
    // });

    // Objects
    this.load.image("object_pokeball", "assets/images/objects/pokeball.png");
    this.load.image("object_star", "assets/images/objects/star.png");
    this.load.image("object_leaf", "assets/images/objects/leaf.png");
  }

  loadMaps(): void {
    const maps = Object.values(Maps);

    for (const map of maps) {
      this.load.tilemapTiledJSON(map, `assets/maps/${map}.json`);
    }
  }

  loadSpriteSheets(): void {
    const sprites = Object.values(Sprites);

    sprites.forEach((sprite) => {
      this.load.spritesheet(sprite, `assets/images/characters/${sprite}.png`, {
        frameWidth: PLAYER_SIZE.width,
        frameHeight: PLAYER_SIZE.height,
      });
    });
  }
}
