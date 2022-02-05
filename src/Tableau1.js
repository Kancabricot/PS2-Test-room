class Tableau1 extends Phaser.Scene {
    preload() {
        // le preload des images
        this.load.image('Idle','assets/Perso/Idle.png');
        this.load.image('platform','assets/square.png');

        for (let i = 0; i < 5; i++) {
            this.load.image('w'+i,'assets/Perso/w'+i+'.png');
        }

    }


    create() {
        this.walk = this.physics.add.sprite(500, 0, 'w').setOrigin(0, 0);
        this.anims.create({
            key: 'walk',
            frames: this.getFrames("w", 4),
            frameRate: 16,
            repeat: -1,
        });
        this.walk.play('walk');
        this.walk.scale=1;
        this.walk.body.setAllowGravity(true);


        //Mur bas
        this.bas = this.physics.add.sprite(0, 500-19,'platform').setOrigin(0, 0);
        this.bas.setDisplaySize(1000,20);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);

        let me = this;

        //    Collision
        this.physics.add.collider(this.walk,this.bas);


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
                case Phaser.Input.Keyboard.KeyCodes.S:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:

                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:



                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:



                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:



                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:



                    break;
            }
        })
    }
    update() {

    }
}