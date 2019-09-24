import "./phaser.js";
import Scene1 from "./scene1.js";

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1280,
    parent: "game-container",
    pixelArt: false,
    backgroundColor: "#1d212d",
    scene: Scene1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);