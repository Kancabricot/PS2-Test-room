class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled!

        this.load.image('pile','assets/Pile.png');
        this.load.image('cube','assets/squareY.png');

        this.load.image('bg','assets/images/background.png');

        this.load.atlas('Listrik', 'assets/Listrikanimation.png', 'assets/Listrikanimation.json');

        // chargement tilemap
        this.load.image("tilemap", "assets/Map_TR/TestroomTiled.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/Map_TR/TestRoom.json");
    }


    create() {
        this.takeBat = false;
        this.chargeMax = 9999999999;
        this.Battery = this.chargeMax;
        this.recharge = false;
        this.turn = false;
        this.taillePile = 32;
        this.coorDoorx = 0;
        this.genup = false;


        this.door1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        // a voir si faire un container serai pas mieux pour l'icone baterry
        //this.Listrik = this.add.container(0, 0);

        this.bg = this.physics.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.bg.setDisplaySize( 80000, 450);
        this.bg.body.setAllowGravity(false);
        this.bg.setVisible(true);
        this.bg.setVelocityY(0);

        // Création de la target pour la camera
        this.pile = this.physics.add.sprite(150, 900,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(32,32);
        this.pile.body.setAllowGravity(true);
        this.pile.setImmovable(true);

        this.iconbat = this.add.rectangle(0,0,8,12,0x00ff00);

        this.player = new Player(this);

        // Création de l'arme qui sera au sol
        /*this.platfer = this.physics.add.sprite(200, 150,'platfer').setOrigin(0, 0);
        this.platfer.setDisplaySize(200,10);
        this.platfer.body.setAllowGravity(true);
        this.platfer.setImmovable(true);*/

        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "TestroomTiled",
            "tilemap"
        );

        this.platforms = map.createLayer(
            "PLatforme",
            tileset
        );

        const objectsLayer = map.getObjectLayer('Objet')
        objectsLayer.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case 'porte1': {
                    this.door1 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.door1.setDisplaySize(32,32*4);
                    this.door1.body.setAllowGravity(false);
                    this.door1.setImmovable(true);
                    break;
                }
                case 'porte2': {
                    this.door2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.door2.setDisplaySize(32,32*4);
                    this.door2.body.setAllowGravity(false);
                    this.door2.setImmovable(true);
                    break;
                }
                case 'porte3': {
                    this.door3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.door3.setDisplaySize(32,32*4);
                    this.door3.body.setAllowGravity(false);
                    this.door3.setImmovable(true);
                    break;
                }
                case 'levier1': {
                    this.levier1 = this.physics.add.sprite(x,y-32,"cube").setOrigin(0,0)
                    this.levier1.setDisplaySize(32,32);
                    this.levier1.body.setAllowGravity(false);
                    this.levier1.setImmovable(true);
                    break;
                }
                case 'levier2': {
                    this.levier2 = this.physics.add.sprite(x,y-32,"cube").setOrigin(0,0)
                    this.levier2.setDisplaySize(32,32);
                    this.levier2.body.setAllowGravity(false);
                    this.levier2.setImmovable(true);
                    break;
                }
                case 'levier3': {
                    this.levier3 = this.physics.add.sprite(x,y-32,"cube").setOrigin(0,0)
                    this.levier3.setDisplaySize(32,32);
                    this.levier3.body.setAllowGravity(false);
                    this.levier3.setImmovable(true);
                    break;
                }
                case 'platmove1': {
                    this.platmove1 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove1.setDisplaySize(32,32);
                    this.platmove1.setDisplaySize(32*6,32);
                    this.platmove1.body.setAllowGravity(false);
                    this.platmove1.setImmovable(true);
                    break;
                }
                case 'platmove2': {
                    this.platmove2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove2.setDisplaySize(32,32);
                    this.platmove2.setDisplaySize(32*6,32);
                    this.platmove2.body.setAllowGravity(false);
                    this.platmove2.setImmovable(true);
                    break;
                }
                case 'platmove3': {
                    this.platmove3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove3.setDisplaySize(32,32);
                    this.platmove3.setDisplaySize(32*6,32);
                    this.platmove3.body.setAllowGravity(false);
                    this.platmove3.setImmovable(true);
                    break;
                }
            }
        })

        const cam = map.getObjectLayer('cam')
        cam.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case '1-2': {
                    this.cam1 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam1.setDisplaySize(1344,704);
                    this.cam1.setVisible(false)
                    this.cam1.setImmovable(true);
                    this.cam1.body.setAllowGravity(false);
                    break;
                }
                case '2-1': {
                    this.cam2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam2.setDisplaySize(1344,704);
                    this.cam2.setVisible(false)
                    this.cam2.setImmovable(true);
                    this.cam2.body.setAllowGravity(false);
                    break;
                }
                case '2-2': {
                    this.cam3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam3.setDisplaySize(1344,704);
                    this.cam3.setVisible(false)
                    this.cam3.setImmovable(true);
                    this.cam3.body.setAllowGravity(false);
                    break;
                }
                case '3-1': {
                    this.cam4 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam4.setDisplaySize(1344,704);
                    this.cam4.setVisible(false)
                    this.cam4.setImmovable(true);
                    this.cam4.body.setAllowGravity(false);
                    break;
                }
                case '3-2': {
                    this.cam7 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam7.setDisplaySize(1344,704);
                    this.cam7.setVisible(false)
                    this.cam7.setImmovable(true);
                    this.cam7.body.setAllowGravity(false);
                    break;
                }
                case '4-1': {
                    this.cam5 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam5.setDisplaySize(1344,704);
                    this.cam5.setVisible(false)
                    this.cam5.setImmovable(true);
                    this.cam5.body.setAllowGravity(false);
                    break;
                }
                case '4-2': {
                    this.cam6 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cam6.setDisplaySize(1344,704);
                    this.cam6.setVisible(false)
                    this.cam6.setImmovable(true);
                    this.cam6.body.setAllowGravity(false);
                    break;
                }
                case 'cam1-2': {
                    this.cs1 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs1.setDisplaySize(1,1);
                    this.cs1.setVisible(false)
                    this.cs1.setImmovable(true);
                    this.cs1.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-2': {
                    this.cs3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs3.setDisplaySize(1,1);
                    this.cs3.setVisible(false)
                    this.cs3.setImmovable(true);
                    this.cs3.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-2': {
                    this.cs7 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs7.setDisplaySize(1,1);
                    this.cs7.setVisible(false)
                    this.cs7.setImmovable(true);
                    this.cs7.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-1': {
                    this.cs2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs2.setDisplaySize(1,1);
                    this.cs2.setVisible(false)
                    this.cs2.setImmovable(true);
                    this.cs2.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-1': {
                    this.cs4 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs4.setDisplaySize(1,1);
                    this.cs4.setVisible(false)
                    this.cs4.setImmovable(true);
                    this.cs4.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-1': {
                    this.cs5 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs5.setDisplaySize(1,1);
                    this.cs5.setVisible(false)
                    this.cs5.setImmovable(true);
                    this.cs5.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-2': {
                    this.cs6 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.cs6.setDisplaySize(1,1);
                    this.cs6.setVisible(false)
                    this.cs6.setImmovable(true);
                    this.cs6.body.setAllowGravity(false);
                    break;
                }
            }
        })

        // this.platmove = this.physics.add.group({
        //     immovable : false,
        //     allowGravity: false,
        // });


        // map.getObjectLayer('Platforme_move').objects.forEach((move)=>{
        //     const platmove = this.platmove.create(move.x,move.y    - move.height, 'cube').setOrigin(0);
        //     this.platmove.add(platmove)
        // })

        //tween.stop("");
        // tween.play();

        // const hitbox_fer = map.createLayer(
        //     "Hitbox_Fer",
        //     tileset
        // );



        this.platforms.setCollisionByExclusion(-1, true);

        //platfer.setCollisionByExclusion(-1, true);

        // Creation des collision
        //this.physics.add.collider(this.player.player, this.platforms);
        this.physics.add.collider(this.player.player, this.door1);
        this.physics.add.collider(this.player.player, this.door2);
        this.physics.add.collider(this.player.player, this.platmove1);
        this.physics.add.collider(this.player.player, this.platmove2);
        this.physics.add.collider(this.player.player, this.platmove3);
        this.physics.add.collider(this.pile, this.platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200000, 1000000);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200000, 1000000);

        this.initKeyboard();
        this.Gestioncam(this.player.player);
        this.Tweengestion()
    }

    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.player.stop();
                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.player.stop();

                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.turn = true;
                        me.player.moveLeft();

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:
                        me.turn = false;
                        me.player.moveRight();

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                    me.player.jump();

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                    me.GestionEvent(me.player.player);

                    break;
            }
        })
    }

    GestionEvent(player){
        if (this.physics.overlap(player, this.pile)){
            this.pile.setVisible(false);
            this.takeBat = true;
            this.pile.x = 7.50;
            this.pile.y = 7.50;

        }else if(this.physics.overlap(player, this.levier1)===true ){
            this.open1 = this.open1 === false;
            this.FunctionDoor(this.door1,this.open1);

        }else if(this.physics.overlap(player, this.levier2)===true ){
            this.open2 = this.open2 === false;
            this.FunctionDoor(this.door2,this.open2);
            console.log(this.open2)

        }else if(this.physics.overlap(player, this.levier3)===true ){
            this.open3 = this.open3 === false;
            this.FunctionDoor(this.door3,this.open3);
            console.log(this.open3)

        }else if (this.physics.overlap(player, this.gen)===true){
            this.genup = this.genup !== true;
            console.log("change de mode")

        }else if (this.takeBat === true) {
            this.pile.x = player.x + 7.50;
            this.pile.y = player.y + 7.50;

            this.pile.setVisible(true);
            this.takeBat = false;
        }
    }

    Gestioncam(player){
        let me = this;
        // les tableau sont donnée comme des coordonnée soit x puis y
        // tableau 1.2
        this.physics.add.overlap(player, this.cam1, function () {
            me.cameras.main.startFollow(me.cs1, false, 1, 1);
        })
        //tableau 2.2
        this.physics.add.overlap(player, this.cam3, function () {
            me.cameras.main.startFollow(me.cs3, false, 1, 1);
        })
        // tableau 2.1
        this.physics.add.overlap(player, this.cam2, function () {
            me.cameras.main.startFollow(me.cs2, false, 1, 1);
        })
        // tableau 3-1
        this.physics.add.overlap(player, this.cam4, function () {
            me.cameras.main.startFollow(me.cs4, false, 1, 1);
        })
        // tableau 4-1
        this.physics.add.overlap(player, this.cam5, function () {
            me.cameras.main.startFollow(me.cs5, false, 1, 1);
        })
        // tableau 4-2
        this.physics.add.overlap(player, this.cam6, function () {
            me.cameras.main.startFollow(me.cs6, false, 1, 1);
        })
        // tableau 3-2
        this.physics.add.overlap(player, this.cam7, function () {
            me.cameras.main.startFollow(me.cs7, false, 1, 1);

        })
    }

    Tweengestion(){
        this.tweens.add({
            name: "platmove1",
            targets: this.platmove1,
            y: 600,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            name: "platmove2",
            targets: this.platmove2,
            y: 730,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        this.tweens.add({
            name: "platmove3",
            targets: this.platmove3,
            y: 730,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
    }

    FunctionDoor(door,open){
        if(open === true){
            door.x = this.coorDoorx;
        }else{
            this.coorDoorx = door.x;
            door.x = 10000;
        }
    }

    update(){
        // console.log(this.player.player.x)
        // console.log(this.player.player.y)
        this.player.updateListrik();
    }

    // fin du programme
}