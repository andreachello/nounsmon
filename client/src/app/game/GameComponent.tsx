'use client'

import { AUTO, Scale, Game as PhaserGame } from "phaser";
import TextTypingPlugin from "phaser3-rex-plugins/plugins/texttyping-plugin";
import { useState, useEffect } from "react";

import GridEngine from "grid-engine";
import BootScene from "./scenes/BootScene";
import TestScene from "./scenes/TestScene";
import { bagScene } from "./scenes/bagScene";
import { battleScene } from "./scenes/battleScene";
import { pokemonScene } from "./scenes/pokemonScene";
import WorldScene from "./scenes/WorldScene";

const GameComponent = () => {
    const [game, setGame] = useState<PhaserGame>();

    useEffect(() => {
        setGame(
            new PhaserGame({
                parent: "game",
                type: AUTO,
                backgroundColor: '#b8e8d0', // The background color (blue)
                width: 1280,
                height: 720,
                scale: {
                    mode: Scale.FIT,
                    autoCenter: Scale.CENTER_BOTH,
                },
                scene: [
                    BootScene,
                    WorldScene,
                    // mainScene,
                    battleScene,
                    pokemonScene,
                    bagScene
                ],
                physics: {
                    default: "arcade",
                    arcade: {
                        debug: false,
                    },
                },
                plugins: {
                    scene: [
                        {
                            key: "gridEngine",
                            plugin: GridEngine,
                            mapping: "gridEngine",
                        },
                    ],
                    global: [{
                        key: 'rexTextTyping',
                        plugin: TextTypingPlugin,
                        start: true
                    }]
                },
                pixelArt: true,
            }),
        );
    }, []);

    if (!game) {
        return null;
    }

    return (
        <>
            <div id="game" />
        </>
    );
};

export default GameComponent