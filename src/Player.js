class Player {

    constructor(scene) {
        this.scene=scene
        this.cameras=scene
        this.player = this.scene.physics.add.sprite(150, 900, 'Listrik');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.chargeMax = 9999999999;
        this.Battery = this.chargeMax;
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
            this.player.setVelocityY(-220);

        }else{
            this.player.setVelocityY(-420);
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

    updateListrik(){
        if(this.Battery < this.chargeMax / 3){
            this.scene.iconbat.fillColor = 0xff0000;
        }else  if(this.Battery < (this.chargeMax / 3)*2){
            this.scene.iconbat.fillColor = 0xff9f00;
        }else{
            this.scene.iconbat.fillColor = 0x00ff00;
        }

        if(this.scene.turn === true){
            this.scene.iconbat.x = this.player.x +7;
            this.scene.iconbat.y = this.player.y +10;
        }else{
            this.scene.iconbat.x = this.player.x -7;
            this.scene.iconbat.y = this.player.y +10;
        }

        if(this.scene.genup === true && this.scene.pile.visible === false){
            this.scene.recharge = false;
        }else{
            this.scene.recharge = this.scene.takeBat !== false;
        }

        if(this.scene.recharge === true){
            this.Battery = this.scene.chargeMax;
        }else{
            this.Battery -= 1;
            console.log("perd de la battery")
        }

        if(this.Battery  < 0){
            this.player.player.destroy();
            console.log("Je suis mort");
        }
    }

}