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

        this.iconbat = this.add.rectangle(0,0,8,12,0x00ff00)

        this.player = new Player(this)

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

        const platforms = map.createLayer(
            "PLatforme",
            tileset
        );
        // chargement du calque décors
        const decors = map.createLayer(
            "Interactable",
            tileset
        );

        this.fer = this.physics.add.group({
            immovable : false,
            allowGravity: false,
        })

        map.getObjectLayer('Hitbox_Fer').objects.forEach((Fer)=>{
            const collider = this.add.rectangle(Fer.x+(Fer.width*0.5),Fer.y,Fer.width,Fer.height)
            this.fer.add(collider)

        })

        this.platmove = this.physics.add.group({
            immovable : false,
            allowGravity: false,
        })


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



        platforms.setCollisionByExclusion(-1, true);
        //platfer.setCollisionByExclusion(-1, true);

        // Creation des collision
        this.physics.add.collider(this.player.player, platforms);
        // this.physics.add.collider(this.platfer, platforms);

        this.physics.add.collider(this.pile, platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200, 640);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200, 640);

        this.cameras.main.startFollow(this.player.player, true, 1, 1);


    }

    // fonction pour faire regarder s'il y a un overlaps donc deux objets qui se touche pour l'utilisé plus facilement.

    checkCollider(Objet1x,Objet1y,Object1TailleLargeur,Object1TailleHauteur,Objet2x,Objet2y,Objet2TaileLargeur,Objet2TailleHauteur){
        if (Objet1x + Object1TailleLargeur > Objet2x && Objet1x < Objet2x + Objet2TaileLargeur
                                            &&
            Objet1y + Object1TailleHauteur > Objet2y && Objet1y < Objet2y + Objet2TailleHauteur) {
            // Si toutes les conditons sont vrais alors il y a bien un overlaps, on renvoie donc true/vrai a notre foncion sinon on ne renvoie rien
            return true
        }
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
                    me.player.jump()

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                        if (me.physics.overlap(me.player.player, me.pile)===true){
                           me.pile.setVisible(false);
                            me.takeBat = true;
                        }
                        break;

                        // une action qui pose l'arme que on as en main.

                case Phaser.Input.Keyboard.KeyCodes.A:

                    if (me.takeBat === true) {

                        me.pile.x = me.player.player.x + 7.50;
                        me.pile.y = me.player.player.y + 7.50;

                        me.pile.setVisible(true)
                        me.takeBat = false;

                    }
                    break;
            }
        })
    }

    update(){

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