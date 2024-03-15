'use client'

import { AUTO, Scale, Game as PhaserGame } from "phaser";
import TextTypingPlugin from "phaser3-rex-plugins/plugins/texttyping-plugin";
import { useState, useEffect } from "react";
import { mainScene } from "./scenes/MainScene";
import { battleScene } from "./scenes/battleScene";
import { pokemonScene } from "./scenes/pokemonScene";
import { bagScene } from "./scenes/bagScene";

const GameComponent = () => {
    const [game, setGame] = useState<PhaserGame>();

    useEffect(() => {
        setGame(
            new PhaserGame({
                parent: "game",
                type: AUTO,
                backgroundColor: '#b8e8d0', // The background color (blue)
                width: 1024,
                height: 768,
                scale: {
                    mode: Scale.FIT,
                    autoCenter: Scale.CENTER_BOTH,
                },
                scene: [
                    mainScene,
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
                    global: [{
                        key: 'rexTextTyping',
                        plugin: TextTypingPlugin,
                        start: true
                    }]
                },
                // pixelArt: true,
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