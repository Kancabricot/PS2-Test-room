class Player {

    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        this.player = this.scene.physics.add.sprite(150, 900, 'ListrikP');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.chargeMax = 180000000/2;
        this.Battery = this.chargeMax;
        // this.scene.physics.add.collider(this.player, this.scene.platforms);
    }

    jump(){
        if(this.scene.takeBat === true){

        }
        else{
            if(this.player)
            this.player.setVelocityY(-520);
            //this.player.play('jump', true);
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

        if(this.scene.genup === true && this.scene.pile.visible === false){
            this.scene.recharge = false;
        }else{
            this.scene.recharge = this.scene.takeBat !== false;
        }

        if(this.scene.pile.visible === false && this.scene.genup === false){
            this.Battery = this.chargeMax;
        }else{
            this.Battery -= 1;
            //console.log("perd de la battery  "+this.Battery)
        }

        if(this.Battery  < 0){
            this.player.x = this.scene.currentSaveX;
            this.player.y = this.scene.currentSaveY;
            this.scene.pile.X = this.scene.currentSaveX;
            this.scene.pile.y = this.scene.currentSaveY;
            this.Battery = this.chargeMax;
            this.scene.pile.setVisible(true);
        }
    }

}