import "../node_modules/phaser/dist/phaser.min.js";
import Player from "./player.js";

/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class PlatformerScene extends Phaser.Scene {

    preload() {
        this.load.image('tiles', './assets/tilesets/DungeonColor2@64x64.png');

        this.load.tilemapTiledJSON('map1', './assets/tilemaps/map1.json');

        this.load.multiatlas('archer2', './persos/heroes/Archer2/anims.json', './persos/heroes/Archer2/anims/');
    }

    create() {

        const map = this.make.tilemap({ key: "map1" });
        const tileset = map.addTilesetImage("DungeonColor2@64x64", "tiles");

        this.generalLayer = map.createDynamicLayer("murssols", tileset, 0, 0);
        this.murLayer = map.createDynamicLayer("objetsonmur", tileset, 0, 0);
        this.solLayer = map.createDynamicLayer("objetsonsol", tileset, 0, 0);
        this.lightsLayer = map.createDynamicLayer("lights", tileset, 0, 0);

        this.generalLayer.setCollisionByProperty({ collides: "1" });
        this.solLayer.setCollisionByProperty({ collides: "1" });
        if (debug == true)
        {
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            this.generalLayer.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });

            this.solLayer.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        }

        const spawnPoint = map.findObject(
            "Objects",
            obj => obj.name === "SpawnPoint"
        );
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        this.generalLayer.setCollisionByProperty({ collides: "1" });
        this.physics.world.addCollider(this.player.sprite, this.generalLayer);


        this.solLayer.setCollisionByProperty({ collides: "1" });
        this.physics.world.addCollider(this.player.sprite, this.solLayer);



    }

    update(time, delta) {
        this.player.update();

    }
}
