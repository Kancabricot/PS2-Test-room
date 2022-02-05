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
        this.perso = this.physics.add.sprite(500, 0, 'w').setOrigin(0, 0);
        this.anims.create({
            key: 'walk',
            frames: this.getFrames("w", 4),
            frameRate: 16,
            repeat: -1,
        });
        this.perso.play('walk');
        this.perso.scale=1;
        this.perso.body.setAllowGravity(true);


        //Mur bas
        this.bas = this.physics.add.sprite(0, 500-19,'platform').setOrigin(0, 0);
        this.bas.setDisplaySize(1000,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        let me = this;


        this.persoObject = this.physics.add.sprite(500, 0,'circle').setOrigin(0, 0);
        this.persoObject.setDisplaySize(20,20);
        this.persoObject.setVisible(false);

        this.pile = this.physics.add.sprite(600, 0,'circleG').setOrigin(0, 0);
        this.pile.setDisplaySize(20,20);
        this.pile.setVisible(true);

        //    Collision
        this.physics.add.collider(this.perso,this.bas);
        this.physics.add.collider(this.persoObject,this.bas);
        this.physics.add.collider(this.pile,this.bas);

        this.physics.add.overlap(this.perso, this.pile);

        this.initKeyboard();
    }


    getFrames(prefix, length) {
        let frames = [];
        for (let i = 1; i <= length; i++) {
            frames.push({key: prefix + i});
        }
        return frames;

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

                    me.persoObject.setVelocityX(-300)
                    me.perso.setVelocityX(-300)
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:



                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.persoObject.setVelocityX(300)
                    me.perso.setVelocityX(300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                    if(me.perso.body.touching.none) {
                        if (me.perso.visible == true) {

                            me.persoObject.setVisible(true)
                            me.perso.setVisible(false)

                        } else {

                            me.persoObject.setVisible(false)
                            me.perso.setVisible(true)

                        }
                    }


                    break;
            }
        })
    }
    update() {

        if (this.perso.visible == true) {
            console.log("mort mdr")

        }
    }
}