import "./phaser.js";

export default class Player {
    scene = null;
    sprite = null;
    cursors = null;

    constructor(scene, x, y) {
        this.scene = scene;


        this.sprite = scene.physics.add
            .sprite(x, y, "archer2", "Front - Idle/Front - Idle_000")
            .setSize(60, 80)
            .setOffset(30, 20);

        let anims = scene.anims;
        anims.create({
            key: "IdleBottom",
            frames: anims.generateFrameNames("archer2", { prefix: "Front - Idle/Front - Idle_", start: 0, end: 11, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "WalkBottom",
            frames: anims.generateFrameNames("archer2", { prefix: "Front - Walking/Front - Walking_", start: 0, end: 17, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "IdleLeft",
            frames: anims.generateFrameNames("archer2", { prefix: "Left - Idle/Left - Idle_", start: 0, end: 11, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "WalkLeft",
            frames: anims.generateFrameNames("archer2", { prefix: "Left - Walking/Left - Walking_", start: 0, end: 17, zeroPad: 3}),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: "IdleRight",
            frames: anims.generateFrameNames("archer2", { prefix: "Right - Idle/Right - Idle_", start: 0, end: 11, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "WalkRight",
            frames: anims.generateFrameNames("archer2", { prefix: "Right - Walking/Right - Walking_", start: 0, end: 17, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });


        anims.create({
            key: "IdleTop",
            frames: anims.generateFrameNames("archer2", { prefix: "Back - Idle/Back - Idle_", start: 0, end: 11, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "WalkTop",
            frames: anims.generateFrameNames("archer2", { prefix: "Back - Walking/Back - Walking_", start: 0, end: 17, zeroPad: 3 }),
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
            this.sprite.anims.play("WalkLeft", true);
        } else if (this.cursors.right.isDown) {
            this.sprite.anims.play("WalkRight", true);
        } else if (this.cursors.up.isDown) {
            this.sprite.anims.play("WalkTop", true);
        } else if (this.cursors.down.isDown) {
            this.sprite.anims.play("WalkBottom", true);
        } else {
            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.sprite.anims.play("IdleLeft", true);
            else if (prevVelocity.x > 0) this.sprite.anims.play("IdleRight", true);
            else if (prevVelocity.y < 0) this.sprite.anims.play("IdleTop", true);
            else if (prevVelocity.y > 0) this.sprite.anims.play("IdleBottom", true);
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}

