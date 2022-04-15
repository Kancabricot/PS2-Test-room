class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled!
        this.load.image('listrik','assets/LISTRIK_PXL.png');
        this.load.image('ListrikP','assets/LISTRIK_PXL_P.png');

        this.load.image('pile','assets/Pile.png');
        this.load.image('platfer','assets/squareY.png');

        this.load.image('bg','assets/images/background.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/Map_TR/TestroomTiled.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/Map_TR/TestRoom.json");
    }


    create() {

        this.Battery = 2500;
        this.recharge = false;
        this.turn = false;
        this.tailleListrik = 64;
        this.taillePile = 32;


        this.bg = this.physics.add.sprite(0, 0, 'bg').setOrigin(0, 0);
        this.bg.setDisplaySize( 80000, 450);
        this.bg.body.setAllowGravity(false);
        this.bg.setVisible(true);
        this.bg.setVelocityY(0);

        // Création du personnage de base
        this.Listrik = this.physics.add.sprite(100, 450, 'listrik').setOrigin(0, 0);
        this.Listrik.setDisplaySize( this.tailleListrik, this.tailleListrik);
        this.Listrik.body.setAllowGravity(true);
        this.Listrik.setVisible(true);
        this.Listrik.setVelocityY(0);

        // Création du personnage armé
        this.ListrikP = this.physics.add.sprite(500, 0, 'ListrikP').setOrigin(0, 0);
        this.ListrikP.setDisplaySize( this.tailleListrik, this.tailleListrik);
        this.ListrikP.body.setAllowGravity(true);
        this.ListrikP.setVisible(false);

        // Création de l'arme qui sera au sol
        this.pile = this.physics.add.sprite(150, -0,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(32,32);
        this.pile.body.setAllowGravity(true);
        this.pile.setImmovable(true);

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


        map.getObjectLayer('Platforme_move').objects.forEach((move)=>{
            const platmove = this.platmove.create(move.x,move.y    - move.height, 'listrik').setOrigin(0);
            this.platmove.add(platmove)
        })

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
        // this.physics.add.collider(this.Listrik, platfer);
        // this.physics.add.collider(this.ListrikP, platfer);
        this.physics.add.collider(this.Listrik, this.platmove);
        this.physics.add.collider(this.Listrik, platforms);
        this.physics.add.collider(this.ListrikP, platforms);
        // this.physics.add.collider(this.platfer, platforms);

        this.physics.add.collider(this.pile, platforms);


        // redimentionnement du monde avec les dimensions calculées via tiled
                this.physics.world.setBounds(0, 0, 3200, 640);
        //  ajout du champs de la caméra de taille identique à celle du monde
                this.cameras.main.setBounds(0, 0, 3200, 640);



        this.initKeyboard();
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

    test(){
        this.recharge = true;
    }

    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.Listrik.setVelocityX(0);
                    me.ListrikP.setVelocityX(0);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.Listrik.setVelocityX(0);
                    me.ListrikP.setVelocityX(0);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                        me.Listrik.setVelocityX(-300);
                        me.ListrikP.setVelocityX(-150);
                        me.turn = true;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.Listrik.setVelocityX(300);
                        me.ListrikP.setVelocityX(150);
                        me.turn = false;

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                    me.Listrik.setVelocityY(-350);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                        if (me.checkCollider(me.Listrik.x,me.Listrik.y, me.tailleListrik, me.tailleListrik,me.pile.x,me.pile.y,30,15)
                            ===
                            true) {
                           me.pile.setVisible(false);

                           me.Listrik.setVisible(false);

                           // Pour être sur que le Personnage Armé soit au bonne endroit on lui met les bonne coordonné au cas où
                            me.ListrikP.x = me.Listrik.x;
                            me.ListrikP.y = me.Listrik.y;
                            me.ListrikP.setVisible(true);
                        }
                        break;

                        // une action qui pose l'arme que on as en main.

                case Phaser.Input.Keyboard.KeyCodes.A:

                    if (me.ListrikP.visible === true) {
                        me.ListrikP.setVisible(false);

                        // Pour être sur que le Personnage et l'arme soit au bonne endroit on lui met les bonne coordonné au cas où
                        me.Listrik.x = me.ListrikP.x;
                        me.Listrik.y = me.ListrikP.y;
                        me.Listrik.setVisible(true)

                        me.pile.x = me.ListrikP.x + 7.50;
                        me.pile.y = me.ListrikP.y + 7.50;
                        me.pile.setVisible(true)

                    }
                    break;
            }
        })
    }

    update(){

        this.Listrik.flipX = this.turn === true;
        this.ListrikP.flipX = this.turn === true;

        console.log(this.Battery)

        if(this.physics.overlap(this.Listrik, this.fer)===true && this.physics.overlap(this.pile, this.fer)){
            this.recharge = true;
        }else {
            this.recharge = this.ListrikP.visible !== false;
        }

        if (this.ListrikP.visible === true) {
            this.cameras.main.startFollow(this.ListrikP, true, 1, 1);
        }else{
            this.cameras.main.startFollow(this.Listrik, true, 1, 1);
        }

        if(this.recharge === true){
            this.Battery = 2500;
        }else{
            this.Battery -= 1;
        }

        if(this.Battery  < 0){
            this.Listrik.destroy();
            console.log("Je suis mort");
        }
    }

    // fin du programme
}