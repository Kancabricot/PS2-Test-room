let gameConfig = {
    type: Phaser.AUTO,
    width: 1400,
    height:  800,
    backgroundColor: '#ffffff',
    parent: 'game',
    pixelArt: true,
    physics: {

        default: 'arcade',
        arcade: {
            gravity: { y: 986},
            debug : true,
            fps : 160
        }
    },
    scene: [Tableau1,UI]
};
let game = new Phaser.Game(gameConfig);

