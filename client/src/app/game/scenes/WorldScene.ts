import { Scene, GameObjects, Tilemaps } from "phaser";
import { Direction, GridEngine, GridEngineConfig } from "grid-engine";

import { Sprites, Layers, Tilesets, Maps, Objects } from "../../../lib/constants/assets";
import {
  convertObjectPositionToTilePosition,
  getObjectUnderPlayer,
  handleBicycle,
  handleClickOnNpcIfAny,
  handleClickOnObjectIfAny,
  handleOverlappableObject,
  removeObject,
  spawnNPCs,
} from "../../../lib/utils/object";
import { playClick } from "../../../lib/utils/audio";
import { getStartPosition, savePlayerPosition } from "../../../lib/utils/map";
import {
  isMenuOpen,
  isUIOpen,
  toggleMenu,
  triggerUIDown,
  triggerUIExit,
  triggerUILeft,
  triggerUINextStep,
  triggerUIRight,
  triggerUIUp,
} from "../../../lib/utils/ui";
import { useUserDataStore } from "../../../lib/stores/userData";
import { useUIStore } from "../../../lib/stores/ui";
import { moves } from "../../../lib/constants/moves";
import { generateNounSvg } from "../../../lib/nouns";
import { Socket, io } from "socket.io-client"
import axios from "axios";
import { Svg } from "matter";

export interface WorldReceivedData {
  facingDirection: Direction;
  startPosition: {
    x: number;
    y: number;
  };
}

export default class WorldScene extends Scene {
  gridEngine: GridEngine;

  currentSprite: GameObjects.Sprite;
  player: GameObjects.Sprite;
  bicycle: GameObjects.Sprite;
  speed: number;

  tilemap: Tilemaps.Tilemap;

  map: Maps = Maps.PALLET_TOWN;
  daylightOverlay: GameObjects.Graphics;

  receivedData: Partial<WorldReceivedData>;
  pokemons: { pokemon: string; moves: (string | number)[][]; hp: number; maxHp: number; pokedex: number; }[];
  grassWidth: number;
  grassHeight: number;
  grassScale: number;
  pokemonEncounterChance: number;
  moving: boolean;
  menuOn: boolean;
  selectedMenu: null;
  isMainScene: boolean;
  pokedexData: any;
  pokemon_rarity_tiers: number[];
  pokemon_rarity_cumulative: any;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  enterKey: Phaser.Input.Keyboard.Key;
  yesKey: Phaser.Input.Keyboard.Key;
  noKey: Phaser.Input.Keyboard.Key;
  isUpPress: boolean;
  isDownPress: boolean;
  isLeftPress: boolean;
  isRightPress: boolean;
  isYesPress: boolean;
  isNoPress: boolean;
  isEnterPress: boolean;
  tempMoves: any;
  moves: {};
  numMoves: any;
  typeMoves: {};
  socket: any;
  otherPlayers: Phaser.Physics.Arcade.Group;

  constructor() {
    super("World");
  }

  init(data: Partial<WorldReceivedData>) {
    this.receivedData = data;

    const daylightOverlay = this.add.graphics();
    daylightOverlay.setDepth(1000);
    daylightOverlay.fillRect(0, 0, this.scale.width, this.scale.height);
    daylightOverlay.setScrollFactor(0);

    this.daylightOverlay = daylightOverlay;
    console.log(Object.keys(moves));
  }

  preload() {
 
    // #endregion
  }

  create(): void {

    const spawnNoun = async () => {
      const { data } = await axios.get("http://localhost:4090/api/nouns/mint")
      console.log("RES", data);

      const { nounId, nounTrait } = data.data

      const { data: nounSvgData } = await axios.get(`http://localhost:4090/api/nouns/svg/${nounId}`)

      console.log('nounSvgData', nounSvgData);
      
      const { image } = nounSvgData.data

      console.log("NOUNSVG", image);

      useUserDataStore.getState().initPokemon({
        pokemon: `Noun #${nounId}`,
        moves: [['Growl', 2], ['Tackle', 13], ['Vine Whip', 10], ['Leech Seed', 3]],
        hp: 100,
        maxHp: 100,
        pokedex: nounId,
        sprite: image
      })

      return {
        image,
        nounId
      }

    }

    spawnNoun()

    const PORT = "4090"
    const socket = io('http://localhost:4090')
    this.socket = socket

    // Variables
    this.grassWidth = 16;
    this.grassHeight = 16
    this.grassScale = 2.0;
    this.pokemonEncounterChance = 1.0;
    this.moving = false;
    this.menuOn = false;
    this.selectedMenu = null;
    this.isMainScene = true;
    this.pokedexData = this.cache.json.get('pokedexData');
    this.pokemon_rarity_tiers = [9, 10, 10, 9, 10, 10, 9, 10, 10, 1, 2, 4, 1, 2, 4, 1, 1, 10, 1, 1, 1, 1, 1, 2, 5, 5, 9, 1, 1, 1, 1, 10, 1, 1, 10, 3, 7, 3, 10, 1, 4, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 4, 10, 1, 4, 5, 5, 4, 10, 1, 1, 4, 1, 1, 3, 1, 1, 1, 1, 10, 4, 6, 1, 1, 1, 2, 3, 1, 1, 1, 2, 1, 3, 7, 7, 3, 4, 10, 3, 1, 2, 1, 2, 1, 2, 4, 10, 5, 5, 8, 8, 5, 2, 5, 4, 5, 8, 2, 8, 1, 3, 1, 2, 6, 10, 8, 8, 6, 9, 8, 8, 5, 1, 1, 9, 7, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 10, 10, 10, 8, 8, 10, 10, 10];
    let temp = 0;
    this.pokemon_rarity_cumulative = this.pokemon_rarity_tiers.map(function (x) {
      temp += x;
      return temp;
    });

    this.cursors = this.input?.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
    this.enterKey = this.input?.keyboard?.addKey('ENTER') as Phaser.Input.Keyboard.Key;
    this.yesKey = this.input?.keyboard?.addKey('A') as Phaser.Input.Keyboard.Key;
    this.noKey = this.input?.keyboard?.addKey('B') as Phaser.Input.Keyboard.Key;
    this.isUpPress = false;
    this.isDownPress = false;
    this.isLeftPress = false;
    this.isRightPress = false;
    this.isYesPress = false;
    this.isNoPress = false;
    this.isEnterPress = false;

    // const noun = generateNounSvg()
    // console.log("noun", noun);


    // // Max number of pokemon is 6. At least 1 pokemon.
    // useUserDataStore.getState().initPokemon({
    //   pokemon: 'NOUN #123',
    //   moves: [['Growl', 2], ['Tackle', 13], ['Vine Whip', 10], ['Leech Seed', 3]],
    //   hp: 100,
    //   maxHp: 100,
    //   pokedex: 1
    // })
    // this.pokemons = [{
    //   pokemon: 'NOUN #123',
    //   moves: [['Growl', 2], ['Tackle', 13], ['Vine Whip', 10], ['Leech Seed', 3]],
    //   hp: 100,
    //   maxHp: 100,
    //   pokedex: 1
    // },
    // ];

    // Convert move.json into a dictionary
    this.tempMoves = this.cache.json.get('movesData');
    this.moves = {};
    this.numMoves = this.tempMoves?.length;
    for (let i = 0; i < this.numMoves; i++) {
      this.moves[this.tempMoves[i]["ename"]] = this.tempMoves[i];
    }

    // Convert move.json into dictionary by type
    this.typeMoves = {};
    for (let i = 0; i < this.numMoves; i++) {
      if (this.tempMoves[i]["type"] in this.typeMoves) {
        this.typeMoves[this.tempMoves[i]["type"]].push(this.tempMoves[i]);
      } else {
        this.typeMoves[this.tempMoves[i]["type"]] = [this.tempMoves[i]];
      }
    }
    this.initializePlayer();

    this.initializeSockets()


    this.applyUserDataBeforeRender();
    this.initializeTilemap();

    this.initializeCamera();
    this.initializeGrid();
    this.initializeNPCs();
    this.listenKeyboardControl();
    this.applyUserDataAfterRender();

    this.gridEngine.positionChangeFinished().subscribe((observer) => {
      if (observer.charId === Sprites.PLAYER) {
        savePlayerPosition(this);
        this.handleObjectsOverlap();
      }
    });
  }

  // Method to update other players' positions in the game
  updateOtherPlayerPosition(playerData: any) {
    // Update the position of the corresponding player in the game
  }

  // Method to send player position updates to the server
  sendPlayerPosition() {
    // const { x, y } = this.player.position;
    // this.socket.emit('playerPositionUpdate', { x, y });
  }

  initializeSockets() {


    this.socket.on("connect", () => {
      console.log("this.socket connected");

    })

    // Handle receiving other players' positions
    this.socket.on('playerPositionUpdate', (playerData: any) => {
      // Update the position of other players in the game
      // playerData will contain information like player ID and position
      this.updateOtherPlayerPosition(playerData);
    });



    this.socket.on('currentPlayers', (players: any) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          console.log("Own player", players);
          // addPlayer(self, players[id])
        } else {
          console.log("new player", players);
          this.initializeOtherPlayer();

          // addOtherPlayers(self, players[id])
        }
      })
    })

    this.socket.on('newPlayer', (playerInfo) => {
      console.log("new player", playerInfo);
      // addOtherPlayers(self, playerInfo)
    })

    this.otherPlayers = this.physics.add.group();

    // this.socket.on("currentPlayers", function (players) {
    //   Object.keys(players).forEach(function (id) {
    //     if (players[id].playerId === self.socket.id) {
    //       addPlayer(self, players[id]);
    //     } else {
    //       addOtherPlayers(self, players[id]);
    //     }
    //     console.log("inside add players");
    //   });
    // });

    // this.socket.on("newPlayer", function (playerInfo) {
    //   addOtherPlayers(self, playerInfo);
    // });

    // this.socket.on("disconnected", function (playerId) {
    //   self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    //     if (playerId === otherPlayer.playerId) {
    //       otherPlayer.destroy();
    //     }
    //   });
    // });

    // this.socket.on("playerMoved", function (playerInfo) {
    //   self.otherPlayers.getChildren().forEach(function (otherPlayer) {
    //     if (playerInfo.playerId === otherPlayer.playerId) {
    //       otherPlayer.setRotation(playerInfo.rotation);
    //       otherPlayer.setPosition(playerInfo.x, playerInfo.y);
    //     }
    //   });
    // });

    // this.cursors = this.input.keyboard.createCursorKeys();

  }

  update(time): void {

    if (!isMenuOpen()) {
      // Example: Send player position updates every frame
      this.sendPlayerPosition();
    }

    if (isUIOpen()) {
      return;
    }

    if (time % 5000 === 0) {
      this.applyDaylight();
    }

    this.listenMoves();
  }

  initializeTilemap(): void {
    this.tilemap = this.make.tilemap({ key: this.map });

    const all_tilesets = Object.values(Tilesets).reduce(
      (acc: Tilemaps.Tileset[], value: Tilesets) => {
        if (this.tilemap.tilesets.find(({ name }) => name === value)) {
          const tileset = this.tilemap.addTilesetImage(value);

          if (tileset) {
            acc = [...acc, tileset];
          }
        }

        return acc;
      },
      [],
    );

    Object.values(Layers)
      .filter((layer) => layer !== Layers.OBJECTS)
      .forEach((layer) => {
        this.tilemap.createLayer(layer, all_tilesets);
      });
  }

  handleObjectsOverlap(): void {

    const objectUnderPlayer = getObjectUnderPlayer(this);

    if (objectUnderPlayer) {
      switch (objectUnderPlayer.name) {
        case Objects.DOOR:
          // handleDoor(scene, object);
          break;
        case Objects.GRASS:
          this.game.scene.sleep('World');
          this.game.scene.run('battleScene', this);
          // handleMoveOnGrass(scene, object);
          break;
      }

      // handleOverlappableObject(this, objectUnderPlayer);
    }
  }

  initializePlayer() {
    const onBicycle = useUserDataStore.getState().onBicycle;

    this.player = this.add.sprite(0, 0, Sprites.PLAYER);
    this.bicycle = this.add.sprite(0, 0, Sprites.BICYCLE);

    [this.player, this.bicycle].forEach((sprite) => {
      sprite.setOrigin(0.5, 0.5);
      sprite.setDepth(1);
    });

    this.currentSprite = onBicycle ? this.bicycle : this.player;
    this.speed = onBicycle ? 10 : 5;
  }

  initializeOtherPlayer() {
    const onBicycle = useUserDataStore.getState().onBicycle;

    this.player = this.add.sprite(0, 0, Sprites.PLAYER);
    this.bicycle = this.add.sprite(0, 0, Sprites.BICYCLE);

    [this.player, this.bicycle].forEach((sprite) => {
      sprite.setOrigin(0.5, 0.5);
      sprite.setDepth(1);
    });

    spawnNPCs(this)

    // this.game.scene.gridEngine.addCharacter({
    //   id: name,
    //   sprite: Sprites.PLAYER,
    //   walkingAnimationMapping: 0,
    //   startPosition: { x, y },
    //   speed: 5,
    //   facingDirection,
    // });
  }

  initializeGrid(): void {
    const { startPosition, facingDirection } = getStartPosition(this) ?? {};

    const gridEngineConfig = {
      collisionTilePropertyName: "collides",
      characters: [
        {
          id: Sprites.PLAYER,
          sprite: this.currentSprite,
          walkingAnimationMapping: 0,
          startPosition,
          charLayer: Layers.WORLD2,
          facingDirection,
          speed: this.speed,
        },
      ],
    } as GridEngineConfig;

    this.gridEngine.create(this.tilemap, gridEngineConfig);
  }

  initializeNPCs() {
    spawnNPCs(this);
  }

  initializeCamera(): void {
    this.cameras.roundPixels = true;
    this.cameras.main.setZoom(1);
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
      true,
    );
    // const vignette = this.cameras.main.postFX.addVignette();
    // vignette.radius = 0.8;
    this.followWithCamera(this.currentSprite);
  }

  applyDaylight(): void {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = hour + minutes / 60 + seconds / 3600;

    const alpha = Math.abs(0.5 - time / 24);
    this.daylightOverlay.fillStyle(0x000033, alpha);
  }

  followWithCamera(sprite: GameObjects.Sprite): void {
    this.cameras.main.startFollow(sprite, true);
    this.cameras.main.setFollowOffset(-sprite.width / 2, -sprite.height / 2);
  }

  listenKeyboardControl(): void {
    this.input.keyboard?.on("keyup", (event: KeyboardEvent) => {
      const uiStore = useUIStore.getState();
      const isUIOpen = uiStore.menu.isOpen || uiStore.dialog.isOpen;

      if (this.data.get("battleStarted")) {
        return;
      }

      switch (event.key.toUpperCase()) {
        case "M":
          this.sound.mute = !this.sound.mute;
          break;
        case "E":
        case "ENTER":
          if (isUIOpen) {
            playClick(this);
            triggerUINextStep();
          } else {
            handleClickOnObjectIfAny(this);
            handleClickOnNpcIfAny(this);
          }
          break;
        case "ESCAPE":
          playClick(this);
          if (!isMenuOpen()) {
            toggleMenu();
          } else {
            triggerUIExit();
          }
          break;
        case " ":
          handleBicycle(this);
          break;
        case "ARROWDOWN":
        case "S":
          if (isUIOpen) {
            playClick(this);
            triggerUIDown();
          }
          break;
        case "ARROWUP":
        case "W":
          if (isUIOpen) {
            playClick(this);
            triggerUIUp();
          }
          break;
        case "ARROWLEFT":
        case "A":
          if (isUIOpen) {
            playClick(this);
            triggerUILeft();
          }
          break;
        case "ARROWRIGHT":
        case "D":
          if (isUIOpen) {
            playClick(this);
            triggerUIRight();
          }
          break;
      }
    });

    // On tile click, move player to that tile
    this.input.on("pointerup", (pointer) => {
      if (isUIOpen()) {
        return;
      }

      const tile = this.tilemap.getTileAtWorldXY(
        pointer.worldX,
        pointer.worldY,
        true,
      );

      if (tile) {
        const tilePosition = {
          x: tile.x,
          y: tile.y,
        };

        const collides = this.tilemap.layers.some((layer) => {
          const tile = layer.data[tilePosition.y]?.[tilePosition.x];
          return !!tile?.properties?.collides;
        });

        if (!collides) {
          this.gridEngine.setPosition(
            Sprites.PLAYER,
            tilePosition,
            Layers.WORLD2,
          );
        }
      }
    });
  }

  listenMoves(): void {
    if (
      this.input.keyboard &&
      !isUIOpen() &&
      !this.gridEngine.isMoving(Sprites.PLAYER)
    ) {
      const cursors = this.input.keyboard.createCursorKeys();
      const keys = this.input.keyboard.addKeys("W,S,A,D") as Record<
        string,
        { isDown: boolean }
      >;

      if (cursors.left.isDown || keys.A.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.LEFT);
      } else if (cursors.right.isDown || keys.D.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.RIGHT);
      } else if (cursors.up.isDown || keys.W.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.UP);
      } else if (cursors.down.isDown || keys.S.isDown) {
        this.gridEngine.move(Sprites.PLAYER, Direction.DOWN);
      }
    }
  }

  applyUserDataBeforeRender(): void {
    const position = useUserDataStore.getState().position;

    if (position?.map) {
      this.map = position.map;
    }
  }

  applyUserDataAfterRender(): void {
    const inventory = useUserDataStore.getState().inventory;

    // Remove objects that has been already taken
    this.tilemap.objects?.[0].objects.forEach((object) => {
      if (
        inventory.find(
          ({ objectId, collectedMap }) =>
            objectId === object.id && collectedMap === this.map,
        )
      ) {
        removeObject(this, convertObjectPositionToTilePosition(object));
      }
    });
  }
}
