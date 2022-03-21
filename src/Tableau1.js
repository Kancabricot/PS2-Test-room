class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled
        this.load.image('circle','assets/circle.png');
        this.load.image('circleG','assets/circleG.png');

        this.load.image('pile','assets/square.png');
        this.load.image('platfer','assets/squareY.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {
        this.Battery = 2500;
        this.recharge = false;

        // Création du personnage de base
        this.persosanspile = this.physics.add.sprite(500, 0, 'circle').setOrigin(0, 0);
        this.persosanspile.setDisplaySize(30,30);
        this.persosanspile.body.setAllowGravity(true);
        this.persosanspile.setVisible(true);
        this.persosanspile.setVelocityY(0);

        // Création du personnage armé
        this.persoavecpile = this.physics.add.sprite(500, 0, 'circleG').setOrigin(0, 0);
        this.persoavecpile.setDisplaySize(30,30);
        this.persoavecpile.body.setAllowGravity(true);
        this.persoavecpile.setVisible(false);

        // Création de l'arme qui sera au sol
        this.pile = this.physics.add.sprite(150, 0,'pile').setOrigin(0, 0);
        this.pile.setDisplaySize(30,15);
        this.pile.body.setAllowGravity(true);
        this.pile.setImmovable(true);

        // Création de l'arme qui sera au sol
        this.platfer = this.physics.add.sprite(200, 150,'platfer').setOrigin(0, 0);
        this.platfer.setDisplaySize(200,10);
        this.platfer.body.setAllowGravity(true);
        this.platfer.setImmovable(true);



        // chargement de la map
        const map = this.add.tilemap("map");
        // chargement du tileset
        const tileset = map.addTilesetImage(
            "game_tile",
            "tilemap"
        );

        // chargement du calque plateformes
        const platforms = map.createLayer(
            "calque_plateformes",
            tileset
        );

        platforms.setCollisionByExclusion(-1, true);

        // Creation des collision

        this.physics.add.collider(this.persosanspile, platforms);
        this.physics.add.collider(this.persoavecpile, platforms);
        this.physics.add.collider(this.platfer, platforms);
        this.physics.add.collider(this.pile, platforms);

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


    initKeyboard() {
        let me = this;

        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:

                    me.persosanspile.setVelocityX(0);
                    me.persoavecpile.setVelocityX(0);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.persosanspile.setVelocityX(0);
                    me.persoavecpile.setVelocityX(0);
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                        me.persosanspile.setVelocityX(-500);
                        me.persoavecpile.setVelocityX(-300);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.persosanspile.setVelocityX(500);
                        me.persoavecpile.setVelocityX(300);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                    me.persosanspile.setVelocityY(-350);

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                        if (me.checkCollider(me.persosanspile.x,me.persosanspile.y,30,30,me.pile.x,me.pile.y,30,15)
                            ===
                            true) {
                           me.pile.setVisible(false);

                           me.persosanspile.setVisible(false);

                           // Pour être sur que le Personnage Armé soit au bonne endroit on lui met les bonne coordonné au cas où
                            me.persoavecpile.x = me.persosanspile.x;
                            me.persoavecpile.y = me.persosanspile.y;
                            me.persoavecpile.setVisible(true);
                        }
                        break;

                        // une action qui pose l'arme que on as en main.

                case Phaser.Input.Keyboard.KeyCodes.A:

                    if (me.persoavecpile.visible === true) {
                        me.persoavecpile.setVisible(false);

                        // Pour être sur que le Personnage et l'arme soit au bonne endroit on lui met les bonne coordonné au cas où
                        me.persosanspile.x = me.persoavecpile.x;
                        me.persosanspile.y = me.persoavecpile.y;
                        me.persosanspile.setVisible(true)

                        me.pile.x = me.persoavecpile.x + 7.50;
                        me.pile.y = me.persoavecpile.y + 7.50;
                        me.pile.setVisible(true)

                    }
                    break;
            }
        })
    }

    update(){

        console.log(this.Battery)

        this.recharge = this.persoavecpile.visible !== false;

        if(this.checkCollider(this.pile.x,this.pile.y,30,15,this.platfer.x,this.platfer.y,200,10)
                                                                    &&
            this.checkCollider(this.persosanspile.x,this.persosanspile.y,30,30,this.platfer.x,this.platfer.y,200,10)){
            this.recharge = true;
        }

        if(this.recharge === true){
            this.Battery = 2500;
        }else{
            this.Battery -= 1;
        }

        if(this.Battery  < 0){
            this.persosanspile.destroy();
            console.log("Je suis mort")
        }
    }

    // fin du programme
}