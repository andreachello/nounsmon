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
import { io } from "socket.io-client";
import { useUIStore } from "../../lib/stores/ui";
import { Loading } from "./ui/components/Loading";
import { UI } from "./ui/UI";

const GameComponent = () => {
    const [game, setGame] = useState<PhaserGame>();
    const { loading } = useUIStore();
    useEffect(() => {
        setGame(
            new PhaserGame({
                parent: "game",
                type: AUTO,
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
            {loading && <Loading />}
            <UI game={game} />
            <div id="game" />
        </>
    );
};

export default GameComponent