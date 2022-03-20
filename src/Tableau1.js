class Tableau1 extends Phaser.Scene {


    preload() {
        // Je preload les images autres que Tiled
        this.load.image('circle','assets/circle.png');
        this.load.image('circleG','assets/circleG.png');

        this.load.image('platform','assets/square.png');

        // chargement tilemap
        this.load.image("tilemap", "assets/tiles_packed.png");

        // chargement de la map en json
        this.load.tilemapTiledJSON("map", "assets/MapBasique.json");
    }


    create() {

        // Création du personnage de base
        this.perso = this.physics.add.sprite(500, 0, 'circle').setOrigin(0, 0);
        this.perso.setDisplaySize(30,30);
        this.perso.body.setAllowGravity(true);
        this.perso.setVisible(true);

        // Création du personnage armé
        this.persoA = this.physics.add.sprite(500, 0, 'circleG').setOrigin(0, 0);
        this.persoA.setDisplaySize(30,30);
        this.persoA.body.setAllowGravity(true);
        this.persoA.setVisible(false);

        // Création de l'arme qui sera au sol
        this.arme = this.physics.add.sprite(150, 0,'platform').setOrigin(0, 0);
        this.arme.setDisplaySize(15,15);
        this.arme.body.setAllowGravity(true);
        this.arme.setImmovable(true);



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

        this.physics.add.collider(this.perso, platforms);
        this.physics.add.collider(this.persoA, platforms);
        this.physics.add.collider(this.arme, platforms);

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

                    me.perso.setVelocityX(0)
                    me.persoA.setVelocityX(0)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                    me.perso.setVelocityX(0)
                    me.persoA.setVelocityX(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {

                case Phaser.Input.Keyboard.KeyCodes.Q:


                        me.perso.setVelocityX(-300)
                        me.persoA.setVelocityX(-300)

                    break;

                case Phaser.Input.Keyboard.KeyCodes.D:

                        me.perso.setVelocityX(300)
                        me.persoA.setVelocityX(300)

                    break;

                case Phaser.Input.Keyboard.KeyCodes.E:

                        if (me.checkCollider(me.perso.x,me.perso.y,20,30,me.arme.x,me.arme.y,15,15)
                            ===
                            true) {
                           me.arme.setVisible(false);
                           me.perso.setVisible(false);
                            me.persoA.x = me.perso.x
                            me.persoA.y = me.perso.y
                           me.persoA.setVisible(true)

                        }
                    break;
            }
        })
    }


    // fin du programme
}