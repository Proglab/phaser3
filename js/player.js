import "./phaser.js";

export default class Player {
    scene = null;
    sprite = null;
    cursors = null;

    preload() {
        this.scene.load.atlas("atlas", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json");
    }

    constructor(scene, x, y) {
        this.scene = scene;


        this.sprite = scene.physics.add
            .sprite(x, y, "atlas", "misa-front")
            .setSize(30, 40)
            .setOffset(0, 24);

        let anims = scene.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        const speed = 400;
        const prevVelocity = this.sprite.body.velocity.clone();
        this.sprite.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.sprite.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.sprite.body.setVelocityX(speed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.sprite.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.sprite.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.sprite.body.velocity.normalize().scale(speed);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
            this.sprite.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
            this.sprite.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
            this.sprite.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
            this.sprite.anims.play("misa-front-walk", true);
        } else {
            this.sprite.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.sprite.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.sprite.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.sprite.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.sprite.setTexture("atlas", "misa-front");
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}

