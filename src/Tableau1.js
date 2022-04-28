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
        this.chargeMax = 2500;
        this.Battery = this.chargeMax;
        this.recharge = false;
        this.turn = false;
        this.taillePile = 32;
        this.open = false;
        this.coorDoorx = 0;

        // a voir si faire un container serai pas mieux pour l'icone baterry
        //this.Listrik = this.add.container(0, 0);

        this.bg = this.physics.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.bg.setDisplaySize( 80000, 450);
        this.bg.body.setAllowGravity(false);
        this.bg.setVisible(true);
        this.bg.setVelocityY(0);

        // Création de l'arme qui sera au sol
        this.pile = this.physics.add.sprite(150, -0,'pile').setOrigin(0, 0);
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

        // chargement du calque décors
        this.decors = map.createLayer(
            "Interactable",
            tileset
        );

        // chargement du calque décors
        this.door = map.createLayer(
            "Porte",
            tileset
        );

        this.coorDoorx = this.door.x;

        this.fer = this.physics.add.group({
            immovable : false,
            allowGravity: false,
        });

        map.getObjectLayer('Hitbox_Fer').objects.forEach((Fer)=>{
            const collider = this.add.rectangle(Fer.x+(Fer.width*0.5),Fer.y,Fer.width,Fer.height)
            this.fer.add(collider)

        });

        this.levier = this.physics.add.group({
            immovable : false,
            allowGravity: false,
        });

        map.getObjectLayer('Levier').objects.forEach((Levier)=>{
            const collider = this.add.rectangle(Levier.x+(Levier.width*0.5),Levier.y,Levier.width,Levier.height)
            this.levier.add(collider)
        });

        this.platmove = this.physics.add.group({
            immovable : false,
            allowGravity: false,
        });


        // map.getObjectLayer('Platforme_move').objects.forEach((move)=>{
        //     const platmove = this.platmove.create(move.x,move.y    - move.height, 'cube').setOrigin(0);
        //     this.platmove.add(platmove)
        // })

        this.tweens.add({
            targets: this.platmove,
            y: 200,
            duration: 4000,
            repeat: -1,
            yoyo: true
        });

        // const hitbox_fer = map.createLayer(
        //     "Hitbox_Fer",
        //     tileset
        // );



        this.platforms.setCollisionByExclusion(-1, true);
        this.door.setCollisionByExclusion(-1, true);

        //platfer.setCollisionByExclusion(-1, true);

        // Creation des collision
        this.physics.add.collider(this.player.player, this.platforms);
        this.physics.add.collider(this.player.player, this.door);
        this.physics.add.collider(this.pile, this.platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200, 640);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200, 640);

        this.cameras.main.startFollow(this.player.player, true, 1, 1);


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

                        if (me.physics.overlap(me.player.player, me.pile)){
                           me.pile.setVisible(false);
                            me.takeBat = true;
                            me.pile.x = 7.50;
                            me.pile.y = 7.50;
                        }else if(me.physics.overlap(me.player.player, me.levier)===true){
                            me.open = me.open === false;
                        }
                        break;

                        // une action qui pose l'arme que on as en main.

                case Phaser.Input.Keyboard.KeyCodes.A:



                    if (me.takeBat === true) {

                        me.pile.x = me.player.player.x + 7.50;
                        me.pile.y = me.player.player.y + 7.50;

                        me.pile.setVisible(true);
                        me.takeBat = false;

                    }
                    break;
            }
        })
    }

    FunctionDoor(door){
        if(this.open === false){
            door.x = this.coorDoorx;
            door.setVisible(true);
        }else{
            door.x = 10000;
            door.setVisible(false);
        }
    }

    update(){

        this.FunctionDoor(this.door);

        if(this.Battery < this.chargeMax / 3){
            this.iconbat.fillColor = 0xff0000;
        }else  if(this.Battery < (this.chargeMax / 3)*2){
            this.iconbat.fillColor = 0xff9f00;
        }else{
            this.iconbat.fillColor = 0x00ff00;
        }

        if(this.turn === true){
            this.iconbat.x = this.player.player.x +7;
            this.iconbat.y = this.player.player.y +10;
        }else{
            this.iconbat.x = this.player.player.x -7;
            this.iconbat.y = this.player.player.y +10;
        }

        if(this.physics.overlap(this.player.player, this.fer)===true && this.physics.overlap(this.pile, this.fer)){
            this.recharge = true;
        }else {
            this.recharge = this.takeBat !== false;
        }

        if(this.recharge === true){
            this.Battery = this.chargeMax;
        }else{
            this.Battery -= 1;
        }

        if(this.Battery  < 0){
            this.player.player.destroy();
            console.log("Je suis mort");
        }

        this.initKeyboard();

    }

    // fin du programme
}