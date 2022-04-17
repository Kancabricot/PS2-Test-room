class Player {

    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        // this.scene.physics.add.collider(this.player, this.scene.platforms);


        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 'Nobatdie 0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'player', frame: ''}],
            frameRate: 10,
            repeat:-1,

        });

    }

    jump(){
        this.player.setVelocityY(-420);
        this.player.play('jump', true);
    }
    moveRight(){
        this.player.setVelocityX(300);
        this.player.setFlipX(false);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
    }
    moveLeft(){
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
            this.player.play('walk', true)}
        this.player.setFlipX(true);
    }
    stop(){
        this.player.setVelocityX(0);
        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        }
    }

}