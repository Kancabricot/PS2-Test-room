class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled!

        this.load.image('pile','assets/Pile.png');
        this.load.image('cube','assets/squareY.png');

        this.load.image('bg','assets/images/background.png');
        this.load.image('ListrikP','assets/ListrikP.png');
        this.load.image('grab','assets/grab.png');

        this.load.atlas('Listrik', 'assets/Listrikanimation.png', 'assets/Listrikanimation.json');

        // chargement tilemap
        this.load.image("tilemap", "assets/Map_TR/TestroomTiled.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/Map_TR/TestRoom.json");
    }


    create() {
        this.currentSaveX = 150;
        this.currentSaveY = 900;
        this.takeBat = false;
        this.recharge = false;
        this.turn = false;
        this.taillePile = 32;
        this.coorDoorx = 0;
        this.genup = false;
        this.isgrab = false;
        this.upgradeL = false;


        this.door1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


        // Création de la target pour la camera
        this.pile = this.physics.add.sprite(150, 900,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(32,32);
        this.pile.body.setAllowGravity(true);
        this.pile.setImmovable(true);

        // Création de la target pour la camera
        this.target = this.physics.add.sprite(150, 900,'cube').setOrigin(0, 0);
        this.target.setDisplaySize(1,1);
        this.target.body.setAllowGravity(false);
        this.target.setImmovable(true);
        this.target.setVisible(false);

        this.iconbat = this.add.rectangle(0,0,8,12,0x00ff00);

        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "TestroomTiled",
            "tilemap"
        );



        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Collide').objects.forEach((collide) => {
            this.collideSprite = this.physics.add.sprite(collide.x + (collide.width * 0.5), collide.y + (collide.height * 0.5)).setSize(collide.width, collide.height).setDepth(1);
            this.collide.add(this.collideSprite)
        });

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
                    this.platmove1.setDisplaySize(32*6,32);
                    this.platmove1.body.setAllowGravity(false);
                    this.platmove1.setImmovable(true);
                    break;
                }
                case 'platmove2': {
                    this.platmove2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove2.setDisplaySize(32*6,32);
                    this.platmove2.body.setAllowGravity(false);
                    this.platmove2.setImmovable(true);
                    break;
                }
                case 'platmove3': {
                    this.platmove3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove3.setDisplaySize(32*12,32);
                    this.platmove3.body.setAllowGravity(false);
                    this.platmove3.setImmovable(true);
                    break;
                }
                case 'platmove4': {
                    this.platmove4 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove4.setDisplaySize(32*6,32);
                    this.platmove4.body.setAllowGravity(false);
                    this.platmove4.setImmovable(true);
                    break;
                }
                case 'platmove5': {
                    this.platmove5 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove5.setDisplaySize(32*6,32);
                    this.platmove5.body.setAllowGravity(false);
                    this.platmove5.setImmovable(true);
                    break;
                }
                case 'platmove6': {
                    this.platmove6 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.platmove6.setDisplaySize(32*3,32);
                    this.platmove6.body.setAllowGravity(false);
                    this.platmove6.setImmovable(true);
                    break;
                }
                case 'Act': {
                    this.act1 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.act1.setDisplaySize(32,32);
                    this.act1.body.setAllowGravity(false);
                    this.act1.setImmovable(true);
                    break;
                }case 'Act2': {
                    this.act2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.act2.setDisplaySize(32,32);
                    this.act2.body.setAllowGravity(false);
                    this.act2.setImmovable(true);
                    break;
                }case 'Act4': {
                    this.act4 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.act4.setDisplaySize(32,32);
                    this.act4.body.setAllowGravity(false);
                    this.act4.setImmovable(true);
                    break;
                }case 'Act5': {
                    this.act5 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.act5.setDisplaySize(32,32);
                    this.act5.body.setAllowGravity(false);
                    this.act5.setImmovable(true);
                    break;
                }case 'sologen': {
                    this.act3 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.act3.setDisplaySize(32,32);
                    this.act3.body.setAllowGravity(false);
                    this.act3.setImmovable(true);
                    break;
                }
                case 'upgrade': {
                    this.up = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.up.setDisplaySize(64,64);
                    this.up.body.setAllowGravity(false);
                    this.up.setImmovable(true);
                    break;
                }
                case 'moveto1': {
                    this.movetarget = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.movetarget.setDisplaySize(64,64);
                    this.movetarget.body.setAllowGravity(false);
                    this.movetarget.setImmovable(true);
                    this.movetarget.setVisible(false);
                    break;
                }
                case 'moveto2': {
                    this.movetarget2 = this.physics.add.sprite(x,y,"cube").setOrigin(0,0)
                    this.movetarget2.setDisplaySize(64,64);
                    this.movetarget2.body.setAllowGravity(false);
                    this.movetarget2.setImmovable(true);
                    this.movetarget2.setVisible(false);
                    break;
                }
            }
        })

        const cam = map.getObjectLayer('cam')
        cam.objects.forEach(objData=> {
            const {x = 0, y = 0, name} = objData

            switch (name) {
                case '1-2': {
                    this.cam1 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam1.setDisplaySize(1344, 704);
                    this.cam1.setVisible(false)
                    this.cam1.setImmovable(true);
                    this.cam1.body.setAllowGravity(false);
                    break;
                }
                case '2-1': {
                    this.cam2 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam2.setDisplaySize(1344, 704);
                    this.cam2.setVisible(false)
                    this.cam2.setImmovable(true);
                    this.cam2.body.setAllowGravity(false);
                    break;
                }
                case '2-2': {
                    this.cam3 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam3.setDisplaySize(1344, 704);
                    this.cam3.setVisible(false)
                    this.cam3.setImmovable(true);
                    this.cam3.body.setAllowGravity(false);
                    break;
                }
                case '3-1': {
                    this.cam4 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam4.setDisplaySize(1344, 704);
                    this.cam4.setVisible(false)
                    this.cam4.setImmovable(true);
                    this.cam4.body.setAllowGravity(false);
                    break;
                }
                case '3-2': {
                    this.cam7 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam7.setDisplaySize(1344, 704);
                    this.cam7.setVisible(false)
                    this.cam7.setImmovable(true);
                    this.cam7.body.setAllowGravity(false);
                    break;
                }
                case '4-1': {
                    this.cam5 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam5.setDisplaySize(1344, 704);
                    this.cam5.setVisible(false)
                    this.cam5.setImmovable(true);
                    this.cam5.body.setAllowGravity(false);
                    break;
                }
                case '4-2': {
                    this.cam6 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam6.setDisplaySize(1344, 704);
                    this.cam6.setVisible(false)
                    this.cam6.setImmovable(true);
                    this.cam6.body.setAllowGravity(false);
                    break;
                }
                case '5-2': {
                    this.cam8 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam8.setDisplaySize(650, 704);
                    this.cam8.setVisible(false)
                    this.cam8.setImmovable(true);
                    this.cam8.body.setAllowGravity(false);
                    break;
                }
                case '5-2-1': {
                    this.cam81 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam81.setDisplaySize(1, 704);
                    this.cam81.setVisible(false)
                    this.cam81.setImmovable(true);
                    this.cam81.body.setAllowGravity(false);
                    break;
                }
                case '5-2-2': {
                    this.cam82 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam82.setDisplaySize(1, 704);
                    this.cam82.setVisible(false)
                    this.cam82.setImmovable(true);
                    this.cam82.body.setAllowGravity(false);
                    break;
                }
                case '7-3': {
                    this.cam9 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cam9.setDisplaySize(1344, 704);
                    this.cam9.setVisible(false)
                    this.cam9.setImmovable(true);
                    this.cam9.body.setAllowGravity(false);
                    break;
                }
                case 'cam1-2': {
                    this.cs1 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs1.setDisplaySize(1, 1);
                    this.cs1.setVisible(false)
                    this.cs1.setImmovable(true);
                    this.cs1.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-2': {
                    this.cs3 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs3.setDisplaySize(1, 1);
                    this.cs3.setVisible(false)
                    this.cs3.setImmovable(true);
                    this.cs3.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-2': {
                    this.cs7 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs7.setDisplaySize(1, 1);
                    this.cs7.setVisible(false)
                    this.cs7.setImmovable(true);
                    this.cs7.body.setAllowGravity(false);
                    break;
                }
                case 'cam2-1': {
                    this.cs2 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs2.setDisplaySize(1, 1);
                    this.cs2.setVisible(false)
                    this.cs2.setImmovable(true);
                    this.cs2.body.setAllowGravity(false);
                    break;
                }
                case 'cam3-1': {
                    this.cs4 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs4.setDisplaySize(1, 1);
                    this.cs4.setVisible(false)
                    this.cs4.setImmovable(true);
                    this.cs4.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-1': {
                    this.cs5 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs5.setDisplaySize(1, 1);
                    this.cs5.setVisible(false)
                    this.cs5.setImmovable(true);
                    this.cs5.body.setAllowGravity(false);
                    break;
                }
                case 'cam4-2': {
                    this.cs6 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs6.setDisplaySize(1, 1);
                    this.cs6.setVisible(false)
                    this.cs6.setImmovable(true);
                    this.cs6.body.setAllowGravity(false);
                    break;
                }
                case 'cam5-2': {
                    this.cs8 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs8.setDisplaySize(1, 1);
                    this.cs8.setVisible(false)
                    this.cs8.setImmovable(true);
                    this.cs8.body.setAllowGravity(false);
                    break;
                }
                case 'cam5-2-1': {
                    this.cs82 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs82.setDisplaySize(1, 1);
                    this.cs82.setVisible(false)
                    this.cs82.setImmovable(true);
                    this.cs82.body.setAllowGravity(false);
                    break;
                }
                case 'cam7-3': {
                    this.cs9 = this.physics.add.sprite(x, y, "cube").setOrigin(0, 0)
                    this.cs9.setDisplaySize(1, 1);
                    this.cs9.setVisible(false)
                    this.cs9.setImmovable(true);
                    this.cs9.body.setAllowGravity(false);
                    break;
                }
            }
        })

        this.grab = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.platforms = map.createLayer(
            "PLatforme",
            tileset
        );
        map.getObjectLayer('grab').objects.forEach((grab) => {
            this.grab.create(grab.x, grab.y- grab.height, 'grab').setOrigin(0);
        });

        this.deadzone = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('DeathZone').objects.forEach((trigger) => {
            this.deadzone.create(trigger.x + (trigger.width * 0.5), trigger.y + (trigger.height * 0.5)).setSize(trigger.width, trigger.height).setOrigin(0).setVisible(false);
        });

        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('Save').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y- save.height, 'save').setOrigin(0).setPipeline('Light2D').setVisible(false);
        });


        this.player = new Player(this);

        this.platforms.setCollisionByExclusion(-1, true);

        // Création du grappin
        this.grappin = this.physics.add.sprite(150, 900,'cube').setOrigin(0, 0);
        this.grappin.setDisplaySize(16,16);
        this.grappin.body.setAllowGravity(false);
        this.grappin.setImmovable(true);

        // Creation des collision
        this.physics.add.collider(this.player.player, this.platforms);
        this.physics.add.collider(this.player.player, this.door1);
        this.physics.add.collider(this.player.player, this.door2);
        this.physics.add.collider(this.player.player, this.platmove1);
        this.physics.add.collider(this.player.player, this.platmove2);
        this.physics.add.collider(this.player.player, this.platmove3);
        this.physics.add.collider(this.player.player, this.platmove4);
        this.physics.add.collider(this.player.player, this.platmove5);
        this.physics.add.collider(this.player.player, this.platmove6);
        this.physics.add.collider(this.pile, this.platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200000, 1000000);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200000, 1000000);

        this.physics.add.overlap(this.grab, this.grappin, this.actiongrab,  null, this)
        this.physics.add.overlap(this.collide, this.grappin, this.miss,  null, this)
        this.physics.add.overlap(this.grappin, this.player.player, this.gravite,  null, this)
        this.physics.add.overlap(this.up, this.player.player,function (up) {
            this.upgradeL = true;
            up.setVisible(false);
        })
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this)
        this.physics.add.overlap(this.player.player, this.deadzone, this.KillBox, null, this)


        this.initKeyboard();
        this.Gestioncam(this.player.player);
        this.Tweengestion()

        this.cameras.main.setRoundPixels(true);
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
                        if(me.isgrab === false) {
                            me.turn = true;
                            me.player.moveLeft();
                        }
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.D:
                        if(me.isgrab === false) {
                            me.turn = false;
                            me.player.moveRight();
                        }
                        break;

                        case Phaser.Input.Keyboard.KeyCodes.F:
                        me.pile.x = me.player.player.x
                        me.pile.y = me.player.player.y
                            me.player.player.x = 6150
                        break;

                    case Phaser.Input.Keyboard.KeyCodes.SPACE:

                        if(me.isgrab === false){
                            me.player.jump();
                        }else{
                            me.isgrab = false;
                        }

                        break;

                    case Phaser.Input.Keyboard.KeyCodes.E:
                        if(me.isgrab === false) {
                            me.GestionEvent(me.player.player);
                        }
                        break;
                }
            })
    }

    sauvegarde(player, saves) {
        console.log("current", this.currentSaveX, this.currentSaveY)
        this.currentSaveX = saves.x
        this.currentSaveY = saves.y-50
        saves.body.enable = false;
    }
    KillBox(){
        this.player.player.x = this.currentSaveX;
        this.player.player.y = this.currentSaveY;
        this.pile.X = this.currentSaveX;
        this.pile.y = this.currentSaveY;
        this.Battery = this.chargeMax;
        this.pile.setVisible(true);
    }
    actiongrab(grappin,grab){
        let me = this;
        grappin.setVelocity(0);
        grappin.x = grab.x +8;
        grappin.y = grab.y +16;

        this.player.player.body.setAllowGravity(false);
        me.physics.moveToObject(me.player.player, grappin, 400);
    }

    miss(){
        this.isgrab = false;
        this.grappin.setVelocity(0);
        this.grappin.setVisible(false);
        this.grappin.body.setEnable(false);
    }

    gravite(){
        if(this.isgrab === true){
            this.player.player.setVelocity(0)
        }else{
            this.player.player.setVelocity(0)
            this.grappin.body.setEnable(false,false)
            this.player.player.body.setAllowGravity(true);
        }
    }

    GestionEvent(player){
        if(this.takeBat === true){
            if (this.physics.overlap(player, this.act1)===true){
                this.platweens.play();
                this.genmove.play();
                this.genup = true;
                this.takeBat = false;

            }else if (this.physics.overlap(player, this.act2)===true){
                this.platweens2.play();
                this.platweens6.play()
                this.genup = true;
                this.takeBat = false;

            }else if (this.physics.overlap(player, this.act3)===true){
                this.platweens3.play();
                this.genup = true;
                this.takeBat = false;
            }else if (this.physics.overlap(player, this.act4)===true){
                this.platweens4.play();
                this.genup = true;
                this.takeBat = false;
                this.genmove2.play();
            }else if (this.physics.overlap(player, this.act5)===true){
                this.genup = true;
                this.takeBat = false;
                this.physics.moveToObject(this.act5, this.movetarget2, 100);
                this.physics.moveToObject(this.platmove5, this.movetarget, 100);
            }else{
                this.pile.x = player.x + 7.50;
                this.pile.y = player.y + 7.50;
                this.takeBat = false;
            }
        }




        else if (this.physics.overlap(player, this.pile)){
            this.takeBat = true;
            this.pile.x = 7.50;
            this.pile.y = 7.50;

        }else if (this.physics.overlap(player, this.act1)===true){
            this.platweens.pause();
            this.genup = false;
            this.takeBat = true;
        }else if (this.physics.overlap(player, this.act2)===true){
            this.platweens2.pause();
            this.genup = false;
            this.takeBat = true;
        }else if (this.physics.overlap(player, this.act3)===true){
            this.platweens3.pause();
            this.genup = false;
            this.takeBat = true;
        }else if (this.physics.overlap(player, this.act4)===true){
            this.platweens4.pause();
            this.genmove2.pause();
            this.genup = false;
            this.takeBat = true;
        }else if (this.physics.overlap(player, this.act5)===true){
            this.platmove5.setVelocity(0);
            this.act5.setVelocity(0);
            this.genup = false;
            this.takeBat = true;
        }


        else if(this.physics.overlap(player, this.levier1)===true ){
            this.open1 = this.open1 === false;
            this.FunctionDoor(this.door1,this.open1);
        }else if(this.physics.overlap(player, this.levier2)===true ){
            this.open2 = this.open2 === false;
            this.FunctionDoor(this.door2,this.open2);


        }else if(this.physics.overlap(player, this.levier3)===true ){
            this.open3 = this.open3 === false;
            this.FunctionDoor(this.door3,this.open3);

        }

    }

    Gestioncam(player){
        let me = this;
        // les tableau sont donnée comme des coordonnée soit x puis y
        // tableau 1.2
        this.physics.add.overlap(player, this.cam1, function () {
            me.cameras.main.startFollow(me.cs1,true, 1, 1);
        })
        //tableau 2.2
        this.physics.add.overlap(player, this.cam3, function () {
            me.cameras.main.startFollow(me.cs3, true, 1, 1);
        })
        // tableau 2.1
        this.physics.add.overlap(player, this.cam2, function () {
            me.cameras.main.startFollow(me.cs2, true, 1, 1);
        })
        // tableau 3-1
        this.physics.add.overlap(player, this.cam4, function () {
            me.cameras.main.startFollow(me.cs4, true, 1, 1);
        })
        // tableau 4-1
        this.physics.add.overlap(player, this.cam5, function () {
            me.cameras.main.startFollow(me.cs5, true, 1, 1);
        })
        // tableau 4-2
        this.physics.add.overlap(player, this.cam6, function () {
            me.cameras.main.startFollow(me.cs6, true, 1, 1);
        })
        // tableau 3-2
        this.physics.add.overlap(player, this.cam7, function () {
            me.cameras.main.startFollow(me.cs7, true, 1, 1);

        })
        // tableau 5-2
        this.physics.add.overlap(player, this.cam8, function () {
            me.cameras.main.startFollow(me.cs8, true, 1, 1);

        })// continuité du tableau 5-2
        this.physics.add.overlap(player, this.cam82, function () {
            me.cameras.main.startFollow(me.cs82, true, 1, 1);

        })//fin du tableau 5-2
        this.physics.add.overlap(player, this.cam81, function () {
            me.cameras.main.startFollow(me.player.player, true, 1, 0,0,143).setDeadzone(undefined,1000 );
        })// tableau 6-3
        this.physics.add.overlap(player, this.cam9, function () {
            console.log("jgldshgdkrflsgfs")
            me.cameras.main.startFollow(me.cs9, true, 1, 1);
        })
    }

    Tweengestion(){
        this.platweens = this.tweens.add({
            targets: this.platmove1,
            y: 735,
            duration: 10000,
            ease: 'Sine.easeInOut',
            repeat: 0,
        });
        this.platweens.pause();

        this.genmove = this.tweens.add({
            targets: this.act1,
            y: 735-32,
            duration: 10000,
            ease: 'Sine.easeInOut',
            repeat: 0,
        });
        this.genmove.pause();

        this.platweens2 = this.tweens.add({
            targets: this.platmove2,
            y: 735,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        this.platweens2.pause()

        this.platweens3 = this.tweens.add({
            targets: this.platmove3,
            y: 478,
            duration: 8000,
            ease: 'Sine.easeInOut',
            repeat: 0,
        });
        this.platweens3.pause()

        this.platweens6 = this.tweens.add({
            targets: this.platmove6,
            y: 478,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });

        this.platweens4 = this.tweens.add({
            targets: this.platmove4,
            y: 928,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        this.platweens4.pause()

        this.genmove2 = this.tweens.add({
            targets: this.act4,
            y: 928-32,
            duration: 8000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        this.genmove2.pause()

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
        this.dist = Phaser.Math.Distance.BetweenPoints(this.player.player, this.grappin);

        if(game.input.activePointer.leftButtonDown() === true){
            if(this.up.visible === false) {
                this.isgrab = true
                this.grappin.setVelocity(0);
                this.grappin.setVisible(true);
                this.grappin.x = this.player.player.x;
                this.grappin.y = this.player.player.y;
                this.grappin.body.setEnable(true);
                this.physics.moveToObject(this.grappin, this.target, 400);


            }


        }
        this.target.y = game.input.mousePointer.worldY;
        this.target.x = game.input.mousePointer.worldX;

        if(this.dist > 300){
            this.isgrab = false;
            this.grappin.setVelocity(0);
            this.grappin.setVisible(false);
            this.grappin.x = this.player.player.x;
            this.grappin.y = this.player.player.y;
            this.grappin.body.setEnable(false);
        }

        if(this.takeBat === false && this.genup === false){
            this.pile.setVisible(true)
        }else{
            this.pile.setVisible(false)
        }

        //console.log(this.player.player.x)
        // console.log(this.player.player.y)
        this.player.updateListrik();

    }

    // fin du programme
}
