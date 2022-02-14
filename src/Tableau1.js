class Tableau1 extends Phaser.Scene {

    preload() {
        // le preload des images
        this.load.image('Idle','assets/Perso/Idle.png');
        this.load.image('platform','assets/square.png');
        this.load.image('circle','assets/circle.png');
        this.load.image('circleG','assets/circleG.png');

        for (let i = 0; i < 5; i++) {
            this.load.image('w'+i,'assets/Perso/w'+i+'.png');
        }

    }


    create() {
        let me = this;
        let keyD;
        let keyQ;
        let keyE;

        this.timerLife = 0

        this.perso = this.physics.add.sprite(500, 0, 'w').setOrigin(0, 0);
        this.anims.create({
            key: 'walk',
            frames: this.getFrames("w", 4),
            frameRate: 16,
            repeat: -1,
        });
        this.perso.play('walk');
        this.perso.setDisplaySize(20,30);
        this.perso.body.setAllowGravity(true);
        this.perso.setVisible(false);

        //Mur bas
        this.bas = this.physics.add.sprite(0, 500-19,'platform').setOrigin(0, 0);
        this.bas.setDisplaySize(1000,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);


        this.persoObject = this.physics.add.sprite(500, 0,'circle').setOrigin(0, 0);
        this.persoObject.setDisplaySize(20,20);
        this.persoObject.setVisible(true);

        this.pile = this.physics.add.sprite(600, 0,'circleG').setOrigin(0, 0);
        this.pile.setDisplaySize(20,20);
        this.pile.setVisible(false);

        //    Collision
        this.physics.add.collider(this.perso,this.bas);
        this.physics.add.collider(this.persoObject,this.bas);
        this.physics.add.collider(this.pile,this.bas);

        // this.physics.add.overlap(this.perso, this.pile);

        this.initKeyboard();
    }

    getFrames(prefix, length) {
        let frames = [];
        for (let i = 1; i <= length; i++) {
            frames.push({key: prefix + i});
        }
        return frames;

    }

    checkCollider(Objet1x,Objet1y,Object1Tx,Object1Ty,Objet2x,Objet2y,Objet2Tx,Objet2Ty){
        if (Objet1x + Object1Tx > Objet2x && Objet1x < Objet2x + Objet2Tx && Objet1y + Object1Ty > Objet2y && Objet1y < Objet2y + Objet2Ty) {
            return true
        }
    }

    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:


                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.persoObject.setVelocityX(0)
                    me.perso.setVelocityX(0)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.persoObject.setVelocityX(0)
                    me.perso.setVelocityX(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:


                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if(me.perso.visible === false) {
                        me.persoObject.setVelocityX(-200)
                    }else {
                        me.perso.setVelocityX(-300)
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:



                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    if(me.perso.visible === false) {
                        me.persoObject.setVelocityX(200)
                    }else {
                        me.perso.setVelocityX(300)
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:
                    if(me.perso.visible === false) {
                        me.pile.setVisible(true)
                        // me.pile.disableBody(true)
                        me.pile.x = me.persoObject.x
                        me.pile.y = me.persoObject.y
                        me.perso.x = me.persoObject.x
                        me.perso.y = me.persoObject.y -20
                        me.persoObject.setVisible(false)
                        me.perso.setVisible(true)

                    }else {
                        if (me.checkCollider(me.perso.x,me.perso.y,20,30,me.pile.x,me.pile.y,20,20) === true) {
                            me.persoObject.x = me.pile.x
                            me.persoObject.y = me.pile.y

                            me.persoObject.setVisible(true)
                            me.perso.setVisible(false)
                            me.pile.setVisible(false)
                            // me.pile.disableBody(false)
                            this.timerLife = 0

                        }
                    }

                    break;
            }
        })
    }

    update() {

        if(this.timerLife === 30){
            console.log("mort mdr")
            this.timerLife = 0
        }

        if (this.perso.visible === true) {
            this.timerLife += 1
        }else{
            this.timerLife = 0
        }
    }
}