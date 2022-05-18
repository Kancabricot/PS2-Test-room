let gameConfig = {
    type: Phaser.AUTO,
    width: 1400,
    height:  800,
    backgroundColor: '#ffffff',
    parent: 'game',
    physics: {

        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug : true,
            fps : 144
        }
    },
    scene: [Tableau1]
};
let game = new Phaser.Game(gameConfig);
