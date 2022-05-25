class Player {

    constructor(scene) {
        this.scene = scene
        this.cameras = scene
        this.player = this.scene.physics.add.sprite(150, 900, 'ListrikP');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(false);
        this.chargeMax = 1800;
        this.Battery = this.chargeMax;
        // this.scene.physics.add.collider(this.player, this.scene.platforms);

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('ListrikWalk', {
                start: 0,
                end: 10,
            }),
            frameRate: 10,
            repeat: -1
        });
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
                 if (this.player.body.onFloor()) {
                 this.player.play('walk', true);
                 this.player.setOffset(16,0);
                 }
        }
    }
    moveLeft(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(-200);
            this.player.setFlipX(true);


        }else{
            this.player.setVelocityX(-300);
            this.player.setFlipX(true);
            if (this.player.body.onFloor()) {
                this.player.play('walk',true);
                this.player.setOffset(16,0);
            }
        }

    }
    stop(){
        if(this.scene.takeBat === true){
            this.player.setVelocityX(0);

        }else{
            this.player.setVelocityX(0);

        }

    }

    logo(){
        if(this.Battery < 45){
            this.scene.icon.setTexture('icon-40');
        }else  if(this.Battery < 90){
            this.scene.icon.setTexture('icon-39');
        }else  if(this.Battery < 135){
            this.scene.icon.setTexture('icon-38');
        }else  if(this.Battery < 180){
            this.scene.icon.setTexture('icon-37');
        }else  if(this.Battery < 225){
            this.scene.icon.setTexture('icon-36');
        }else  if(this.Battery < 270){
            this.scene.icon.setTexture('icon-35');
        }else  if(this.Battery < 315){
            this.scene.icon.setTexture('icon-34');
        }else  if(this.Battery < 360){
            this.scene.icon.setTexture('icon-33');
        }else  if(this.Battery < 405){
            this.scene.icon.setTexture('icon-32');
        }else  if(this.Battery < 450){
            this.scene.icon.setTexture('icon-31');
        }else  if(this.Battery < 495){
            this.scene.icon.setTexture('icon-30');
        }else  if(this.Battery < 540){
            this.scene.icon.setTexture('icon-29');
        }else  if(this.Battery < 585){
            this.scene.icon.setTexture('icon-28');
        }else  if(this.Battery < 630){
            this.scene.icon.setTexture('icon-27');
        }else  if(this.Battery < 675){
            this.scene.icon.setTexture('icon-26');
        }else  if(this.Battery < 720){
            this.scene.icon.setTexture('icon-25');
        }else  if(this.Battery < 765){
            this.scene.icon.setTexture('icon-24');
        }else  if(this.Battery < 810){
            this.scene.icon.setTexture('icon-23');
        }else  if(this.Battery < 855){
            this.scene.icon.setTexture('icon-22');
        }else  if(this.Battery < 900){
            this.scene.icon.setTexture('icon-21');
        }else  if(this.Battery < 945){
            this.scene.icon.setTexture('icon-20');
        }else  if(this.Battery < 990){
            this.scene.icon.setTexture('icon-19');
        }else  if(this.Battery < 1035){
            this.scene.icon.setTexture('icon-18');
        }else  if(this.Battery < 1080){
            this.scene.icon.setTexture('icon-17');
        }else  if(this.Battery < 1125){
            this.scene.icon.setTexture('icon-16');
        }else  if(this.Battery < 1170){
            this.scene.icon.setTexture('icon-15');
        }else  if(this.Battery < 1215){
            this.scene.icon.setTexture('icon-14');
        }else  if(this.Battery < 1260){
            this.scene.icon.setTexture('icon-13');
        }else  if(this.Battery < 1305){
            this.scene.icon.setTexture('icon-12');
        }else  if(this.Battery < 1350){
            this.scene.icon.setTexture('icon-11');
        }else  if(this.Battery < 1395){
            this.scene.icon.setTexture('icon-10');
        }else  if(this.Battery < 1440){
            this.scene.icon.setTexture('icon-9');
        }else  if(this.Battery < 1485){
            this.scene.icon.setTexture('icon-8');
        }else  if(this.Battery < 1530){
            this.scene.icon.setTexture('icon-7');
        }else  if(this.Battery < 1575){
            this.scene.icon.setTexture('icon-6');
        }else  if(this.Battery < 1620){
            this.scene.icon.setTexture('icon-5');
        }else  if(this.Battery < 1665){
            this.scene.icon.setTexture('icon-4');
        }else  if(this.Battery < 1710){
            this.scene.icon.setTexture('icon-3');
        }else  if(this.Battery < 1755){
            this.scene.icon.setTexture('icon-2');
        }else{
            this.scene.icon.setTexture('icon-1');
        }
    }

    updateListrik(){

        this.logo();

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