let gameConfig = {
    type: Phaser.AUTO,
    width: 1400,
    height:  800,
    backgroundColor: '#ffffff',
    parent: 'game',
    physics: {

        default: 'arcade',
        arcade: {
            gravity: { y: 986},
            debug : false,
            fps : 160
        }
    },
    scene: [Tableau1]
};
let game = new Phaser.Game(gameConfig);
