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
        this.chargeMax = 999999999999999;
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

        // Création de la pile
        this.cam = this.physics.add.sprite(0, 0,'pile').setOrigin(0, 0);
        this.cam.setDisplaySize(1,1);
        this.cam.body.setAllowGravity(false);
        this.cam.setImmovable(false);

        // Création de la target pour la camera
        this.pile = this.physics.add.sprite(150, 900,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(32,32);
        this.pile.body.setAllowGravity(true);
        this.pile.setImmovable(true);

       // platforme mouvante de base
        this.platmove = this.physics.add.sprite(1984, 1504,'pile').setOrigin(0, 0);
        this.platmove.setDisplaySize(32*6,32);
        this.platmove.body.setAllowGravity(false);
        this.platmove.setImmovable(true);

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

        this.tweens.add({
            targets: this.platmove,
            y: 600,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // const hitbox_fer = map.createLayer(
        //     "Hitbox_Fer",
        //     tileset
        // );



        this.platforms.setCollisionByExclusion(-1, true);

        //platfer.setCollisionByExclusion(-1, true);

        // Creation des collision
        this.physics.add.collider(this.player.player, this.platforms);
        this.physics.add.collider(this.player.player, this.door1);
        this.physics.add.collider(this.player.player, this.door2);
        this.physics.add.collider(this.player.player, this.platmove);
        this.physics.add.collider(this.pile, this.platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200, 10000);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200, 10000);

        this.cameras.main.startFollow(this.cam, false, 1, 1);

        this.initKeyboard();

    }

    initKeyboard() {
        let me = this;-

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
            console.log(this.open1)
        }else if(this.physics.overlap(player, this.levier2)===true ){
            this.open2 = this.open2 === false;
            this.FunctionDoor(this.door2,this.open2);
            console.log(this.open2)
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

    Gestioncam(){
        // les tableau sont donnée comme des coordonnée soit x puis y
        // tableau 1.1
        if(this.player.player.x < 1400 && this.player.player.y < 800){
            this.cam.x = 700;
            this.cam.y = 400;
        }
        //tableau 2.-1
        else if(this.player.player.x < 1400*2 && this.player.player.y < 0){
            this.cam.x = (700*3)-22;
            this.cam.y = -400;

        }
        // tableau 2.1
        else if(this.player.player.x < 1400*2 && this.player.player.y < 800){
            this.cam.x = (700*3)-22;
            this.cam.y = 400;

        }
        // tableau 1.2
        else if(this.player.player.x < 1400 && this.player.player.y < 800*2){
            this.cam.x = 700;
            this.cam.y = (400*3)-32;
        }
        // tableau 2.2
        else if(this.player.player.x < 1400*2 && this.player.player.y < 800*2) {
            this.cam.x = (700 * 3) - 22;
            this.cam.y = (400 * 3) - 32;
        }
        //console.log("checkmap")
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

        this.Gestioncam();

        // console.log(this.player.player.x)
        // console.log(this.player.player.y)

        this.player.updateListrik();
    }

    // fin du programme
}