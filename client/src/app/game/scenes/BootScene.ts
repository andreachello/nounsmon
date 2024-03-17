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

    // Main scene assets
    this.load.image("grass", "assets/FRLG_Grass.png");
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
    // https://pkmn.net/?action=content&page=viewpage&id=8628&parentsection=87
    for (let i = 1; i < 152; i++) {
      this.load.image('pokemon-back' + i, 'assets/nouns/back/' + i.toString() + '.svg');
    }
    // https://pkmn.net/?action=content&page=viewpage&id=8594&parentsection=223
    for (let i = 1; i < 152; i++) {
      this.load.image('pokemon' + i, 'assets/nouns/front/' + i.toString() + '.svg');
    }
    this.load.json('movesData', 'data/moves.json');
    this.load.json('pokedexData', 'data/pokedex.json');

    // Pokemon scene assets
    this.load.image('background', 'assets/pokemon-menu-background.png');
    this.load.image('pokeball', 'assets/pokemon-menu-pokeball2.png');
    this.load.image('selected-cancel', 'assets/selected-cancel.png');

    this.load.image('party-0', 'assets/party-0.png');
    this.load.image('party-0-highlighted', 'assets/party-0-highlighted.png');
    this.load.image('party-0-blank', 'assets/party-0-blank.png');

    this.load.image('party', 'assets/party.png');
    this.load.image('party-highlighted', 'assets/party-highlighted.png');
    this.load.image('party-blank', 'assets/party-blank.png');

    this.load.image('hp-bar', 'assets/hp_bar.png');

    // Battle scene assets
    this.load.image('battle-background', 'assets/battle-background3.png');
    this.load.image('battle-bar', 'assets/battle-bar.png');
    this.load.image('opponent-battle-bar', 'assets/opponent-battle-bar.png');
    this.load.spritesheet('pokeball_animation', 'assets/pokeball_animation.png', { frameWidth: 40, frameHeight: 40 });

    // Bag scene assets
    this.load.image('bag-background', 'assets/bag-background.png');

    // #region Loading...
    const loading_background = this.add.graphics();
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    // progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(140, 275, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      } as any
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      } as any
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      } as any
    });

    assetText.setOrigin(0.5, 0.5);

    // loading_background.fillStyle(0x000000, 1);
    // loading_background.fillRect(0, 0, 600, 600);

    // this.load.on('progress', function (value: number) {
    //   percentText.setText(parseInt(String(value * 100)) + '%');
    //   progressBar.clear();
    //   progressBar.fillStyle(0xffffff, 1);
    //   progressBar.fillRect(150, 285, 300 * value, 30);
    // });

    // this.load.on('fileprogress', function (file: { key: string; }) {
    //   assetText.setText('Loading asset: ' + file.key);
    // });

    // this.load.on('complete', function () {
    //   progressBar.destroy();
    //   progressBox.destroy();
    //   loadingText.destroy();
    //   percentText.destroy();
    //   assetText.destroy();
    //   loading_background.destroy();
    // });
  }

  loadImages(): void {
    // UI
    this.load.image("logo", "assets/images/ui/Slide 16_9 - 1.png");
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
