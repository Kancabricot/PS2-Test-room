class Player {

    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(50, 300, 'Listrik');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);

        // this.scene.physics.add.collider(this.player, this.scene.platforms);

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('Listrik', {
                prefix: 'Nobatdie_',
                start: 38,
                end: 47,
            }),
            frameRate: 100,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'Listrik', frame: 'Nobatdie_0'}],
            frameRate: 10,

        });
        this.scene.anims.create({
            key: 'jump',
            frames: [{key: 'Listrik', frame: 'Nobatdie_0'}],
            frameRate: 10,
            repeat:-1,

        });

    }

    jump(){
        if(this.scene.takeBat === true){
            this.player.setVelocityY(-100);

        }else{
            this.player.setVelocityY(-320);
            this.player.play('jump', true);
        }

    }
    moveRight() {
        if (this.scene.takeBat === true) {
            this.player.setVelocityX(200);
            this.player.setFlipX(false);

        } else {
            this.player.setVelocityX(300);
            this.player.setFlipX(false);
            //     if (this.player.body.onFloor()) {
            //     this.player.play('walk', true)}
            // }

        }
    }
    moveLeft(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(-200);
            this.player.setFlipX(true);


        }else{
            this.player.setVelocityX(-300);
            this.player.setFlipX(true);
            // if (this.player.body.onFloor()) {
            //     this.player.play('walk',true)
            // }
        }

    }
    stop(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(0);

        }else{
            this.player.setVelocityX(0);

        }

    }

}